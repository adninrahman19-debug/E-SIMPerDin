
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../../App';
import { SubscriptionStatus, UserRole, TemplateCategory, SPPDStatus } from '../../types';
import { MOCK_USERS, MOCK_TEMPLATES } from '../../constants';
import { GoogleGenAI } from "@google/genai";
import { 
  ChevronLeft, 
  Save, 
  Send, 
  Calculator, 
  MapPin, 
  Calendar, 
  Users, 
  Plane, 
  AlertTriangle,
  Upload,
  FileText,
  X,
  Plus,
  Info,
  CheckCircle2,
  Paperclip,
  Trash2,
  Settings,
  Layout,
  RefreshCw,
  Globe,
  Map,
  ClipboardList,
  ShieldCheck,
  Lock,
  Sparkles,
  Zap,
  FileCode,
  UserCheck,
  UserPlus
} from 'lucide-react';

const SPPDFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, subscription } = useAuth();
  const { id } = useParams();
  const isEdit = !!id;
  
  const isAdmin = user?.role === UserRole.ADMIN_INSTANSI;
  const isOperator = user?.role === UserRole.OPERATOR;
  const isPegawai = user?.role === UserRole.PEGAWAI;

  const myInstitutionUsers = MOCK_USERS.filter(u => u.institutionId === user?.institutionId);
  const availableTemplates = MOCK_TEMPLATES.filter(t => 
    t.category === TemplateCategory.SPPD && 
    (t.institutionId === 'GLOBAL' || t.institutionId === user?.institutionId)
  );

  const [formData, setFormData] = useState({
    employeeId: isPegawai ? user?.id : '',
    purpose: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    transportation: 'Pesawat Terbang',
    estimatedCost: 0,
    templateId: availableTemplates.find(t => t.isDefault)?.id || availableTemplates[0]?.id || '',
    attachments: [] as File[],
    itineraryNotes: '' 
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [isAiDrafting, setIsAiDrafting] = useState(false);
  const isExpired = subscription?.status === SubscriptionStatus.EXPIRED;

  // READ logic for Update: Memuat data SPPD jika dalam mode Edit
  useEffect(() => {
    if (isEdit && id) {
      // Simulasi fetch data dari "database" mock
      const mockData = [
        { id: '1', employeeId: 'u-5', purpose: 'Koordinasi Penataan Jalur Sepeda Sudirman', destination: 'Bandung', departureDate: '2024-05-20', returnDate: '2024-05-22', transportation: 'Kereta Api', estimatedCost: 2500000 },
        { id: '2', employeeId: 'u-2', purpose: 'Konsultasi Perizinan Trayek AKAP', destination: 'Surabaya', departureDate: '2024-05-22', returnDate: '2024-05-24', transportation: 'Pesawat Terbang', estimatedCost: 4200000 },
        { id: '3', employeeId: 'u-x', purpose: 'Survey Lokasi Halte Trans Metro', destination: 'Yogyakarta', departureDate: '2024-05-25', returnDate: '2024-05-27', transportation: 'Bus Umum', estimatedCost: 1800000 },
      ].find(s => s.id === id);

      if (mockData) {
        setFormData(prev => ({
          ...prev,
          employeeId: mockData.employeeId,
          purpose: mockData.purpose,
          destination: mockData.destination,
          departureDate: mockData.departureDate,
          returnDate: mockData.returnDate,
          transportation: mockData.transportation,
          estimatedCost: mockData.estimatedCost
        }));
      }
    }
  }, [isEdit, id]);

  const handleAiDraft = async () => {
    if (!formData.purpose || formData.purpose.length < 5) {
      alert("Harap masukkan poin maksud perjalanan.");
      return;
    }

    setIsAiDrafting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Ubahlah kalimat berikut menjadi maksud perjalanan dinas yang formal dan profesional sesuai tata naskah dinas Indonesia: "${formData.purpose}".`,
      });
      
      if (response.text) {
        setFormData(prev => ({ ...prev, purpose: response.text.trim() }));
      }
    } catch (error) {
      alert("AI Assistant tidak merespon. Silakan isi secara manual.");
    } finally {
      setIsAiDrafting(false);
    }
  };

  const calculateCost = () => {
    if (!formData.destination) {
      alert('Harap masukkan Kota Tujuan untuk kalkulasi SBM.');
      return;
    }
    setIsCalculating(true);
    // Simulasi delay engine kalkulasi
    setTimeout(() => {
      const baseCost = formData.destination.toLowerCase().includes('jakarta') ? 7500000 : 3500000;
      setFormData(prev => ({ ...prev, estimatedCost: baseCost }));
      setIsCalculating(false);
      alert('Kalkulasi SBM Selesai! Nilai estimasi biaya berhasil diperbarui.');
    }, 1200);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, attachments: [...prev.attachments, ...newFiles] }));
    }
  };

  const handleSubmit = (e: React.FormEvent, status: 'DRAFT' | 'SUBMIT') => {
    e.preventDefault();
    if (isExpired) return;

    if (status === 'SUBMIT') {
      if (!formData.employeeId) { alert('Pilih pegawai pelaksana tugas.'); return; }
      if (!formData.purpose) { alert('Isi maksud perjalanan.'); return; }
      if (!formData.destination) { alert('Isi tujuan perjalanan.'); return; }
    }

    const actionText = isEdit ? 'diperbarui' : 'dibuat';
    const msg = status === 'DRAFT' 
      ? `Data SPPD #${id || 'BARU'} berhasil ${actionText} sebagai Draft.` 
      : `Pengajuan SPPD #${id || 'BARU'} telah berhasil dikirim ke antrean pimpinan.`;
    
    alert(msg);
    navigate('/sppd');
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/sppd')} className="p-3 bg-white border border-gray-100 hover:bg-gray-50 rounded-2xl transition-all shadow-sm">
            <ChevronLeft size={24} className="text-gray-400" />
          </button>
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
               {isEdit ? 'Ubah Berkas SPPD' : isOperator ? 'Input SPPD Pegawai' : 'Buat SPPD Baru'}
            </h2>
            <p className="text-gray-500 text-sm font-medium">Lengkapi rincian perjalanan dinas sesuai regulasi instansi.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Pegawai & Transport */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center">
                <Users size={20} />
              </div>
              <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight">Identitas Pelaksana & Alat Angkut</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pelaksana Tugas</label>
                  <div className="relative">
                    <UserCheck size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                    {isPegawai ? (
                      <div className="w-full pl-12 pr-4 py-4 bg-blue-50 border border-blue-100 rounded-2xl font-black text-blue-900 flex items-center shadow-inner">
                        {user?.name} (Anda)
                      </div>
                    ) : (
                      <select 
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold appearance-none cursor-pointer"
                        value={formData.employeeId}
                        onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                      >
                        <option value="">-- Pilih Pegawai --</option>
                        {myInstitutionUsers.map(u => (
                          <option key={u.id} value={u.id}>{u.name} ({u.nip || 'No NIP'})</option>
                        ))}
                      </select>
                    )}
                  </div>
                  {!isPegawai && (
                    <p className="text-[8px] text-blue-500 font-bold uppercase ml-2 italic">Sebagai Operator, Anda dapat memilih seluruh pegawai di unit kerja.</p>
                  )}
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Alat Angkutan</label>
                  <div className="relative">
                    <Plane size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                    <select 
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold appearance-none cursor-pointer focus:ring-2 focus:ring-blue-900/10"
                      value={formData.transportation}
                      onChange={(e) => setFormData({...formData, transportation: e.target.value})}
                    >
                      <option value="Pesawat Terbang">Pesawat Terbang</option>
                      <option value="Kereta Api">Kereta Api</option>
                      <option value="Mobil Dinas (Operasional)">Mobil Dinas (Operasional)</option>
                      <option value="Bus Umum / Travel">Bus Umum / Travel</option>
                    </select>
                  </div>
               </div>
            </div>
          </div>

          {/* Maksud & Tujuan */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 space-y-10">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                    <MapPin size={20} />
                  </div>
                  <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight">Rincian Perjalanan</h4>
                </div>
                <button 
                  type="button"
                  onClick={handleAiDraft}
                  disabled={isAiDrafting}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-900 to-indigo-800 text-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {isAiDrafting ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} className="text-amber-400" />}
                  <span>{isAiDrafting ? 'AI Working...' : 'AI Smart Narasi'}</span>
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Maksud Perjalanan Dinas</label>
                  <textarea 
                    rows={2} 
                    className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-[2rem] outline-none focus:ring-2 focus:ring-blue-900/10 font-medium text-gray-700 resize-none shadow-inner"
                    placeholder="Contoh: Menghadiri rapat koordinasi sinkronisasi data..."
                    value={formData.purpose}
                    onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Kota Tujuan</label>
                    <div className="relative">
                       <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                       <input 
                        type="text" 
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold focus:ring-2 focus:ring-blue-900/10" 
                        placeholder="E.g. Surabaya" 
                        value={formData.destination} 
                        onChange={(e) => setFormData({...formData, destination: e.target.value})} 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Tgl Berangkat</label>
                    <input type="date" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold focus:ring-2 focus:ring-blue-900/10" value={formData.departureDate} onChange={(e) => setFormData({...formData, departureDate: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Tgl Kembali</label>
                    <input type="date" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold focus:ring-2 focus:ring-blue-900/10" value={formData.returnDate} onChange={(e) => setFormData({...formData, returnDate: e.target.value})} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
            <div className="flex items-center space-x-3 ml-1">
              <ShieldCheck size={18} className="text-blue-900" />
              <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Pusat Kontrol</h5>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={(e) => handleSubmit(e, 'SUBMIT')}
                className="w-full py-5 bg-blue-900 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-all shadow-2xl shadow-blue-900/30 flex items-center justify-center space-x-3"
              >
                <Send size={18} />
                <span>Kirim Ke Pimpinan</span>
              </button>
              <button 
                onClick={(e) => handleSubmit(e, 'DRAFT')}
                className="w-full py-5 bg-white border border-gray-100 text-gray-700 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center space-x-3 shadow-sm"
              >
                <Save size={18} />
                <span>Simpan Draft</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center ml-1">
                <Calculator size={14} className="mr-2" /> Kalkulasi SBM
              </h5>
              <button 
                onClick={calculateCost}
                disabled={isCalculating}
                className="p-2.5 bg-blue-50 text-blue-900 rounded-xl hover:bg-blue-100 transition-all shadow-sm disabled:opacity-50"
              >
                <RefreshCw size={16} className={isCalculating ? 'animate-spin' : ''} />
              </button>
            </div>
            
            <div className="text-center p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 relative group overflow-hidden shadow-inner">
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Estimasi Anggaran</p>
               <h4 className="text-3xl font-black text-gray-900 tracking-tight">Rp {formData.estimatedCost.toLocaleString('id-ID')}</h4>
               
               <div className="mt-6 flex items-center justify-center space-x-2 py-2 px-4 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-700">
                  <Lock size={12} className="shrink-0" />
                  <span className="text-[9px] font-black uppercase">Verified Standards</span>
               </div>
            </div>
          </div>

          <div className="p-10 bg-indigo-900 text-white rounded-[3rem] shadow-2xl relative overflow-hidden group">
             <div className="relative z-10">
                <ShieldCheck size={40} className="text-amber-400 mb-8" />
                <h4 className="text-xl font-black mb-2">Audit Compliance</h4>
                <p className="text-blue-200 text-[10px] font-bold uppercase leading-relaxed tracking-tight opacity-80">
                  Seluruh data input Operator divalidasi silang dengan standar biaya wilayah dan golongan pegawai untuk meminimalisir temuan audit.
                </p>
             </div>
             <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SPPDFormPage;
