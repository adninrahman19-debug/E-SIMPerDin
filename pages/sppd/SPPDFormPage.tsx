
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
  FileCode
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

  // Load data if in Edit Mode (CRUD: Read for Update)
  useEffect(() => {
    if (isEdit && id) {
      // Simulation of fetching data from mock state
      // In a real app, this would be an API call
      const mockData = [
        { id: '3', employeeId: 'u-5', purpose: 'Survey Lokasi Halte Trans Metro', destination: 'Yogyakarta', departureDate: '2024-05-25', returnDate: '2024-05-27', transportation: 'Bus Umum', estimatedCost: 1800000 },
        { id: '4', employeeId: 'u-5', purpose: 'Rapat Koordinasi Lintas Sektoral', destination: 'Medan', departureDate: '2024-06-01', returnDate: '2024-06-03', transportation: 'Pesawat Terbang', estimatedCost: 5500000 },
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
      alert("Harap masukkan poin-poin maksud perjalanan minimal 5 karakter agar AI dapat membantu.");
      return;
    }

    setIsAiDrafting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Ubahlah kalimat berikut menjadi maksud perjalanan dinas yang formal, profesional, dan sesuai tata naskah dinas pemerintah Indonesia: "${formData.purpose}". Berikan hanya satu kalimat hasil akhir tanpa penjelasan tambahan.`,
      });
      
      if (response.text) {
        setFormData(prev => ({ ...prev, purpose: response.text.trim() }));
      }
    } catch (error) {
      console.error("AI Error:", error);
      alert("Gagal menghubungi AI. Pastikan koneksi internet stabil.");
    } finally {
      setIsAiDrafting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, attachments: [...prev.attachments, ...newFiles] }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const calculateCost = () => {
    if (!formData.destination) {
      alert('Harap masukkan Kota Tujuan terlebih dahulu agar sistem dapat mencocokkan SBM.');
      return;
    }
    setIsCalculating(true);
    // Simulasi integrasi SBM API
    setTimeout(() => {
      // Logika simulasi: Biaya berbeda jika Medan (Luar Jawa)
      const baseCost = formData.destination.toLowerCase() === 'medan' ? 5500000 : 2500000;
      setFormData(prev => ({ ...prev, estimatedCost: baseCost }));
      setIsCalculating(false);
      alert('Biaya berhasil dikalkulasi otomatis berdasarkan Standar Biaya Masukan terbaru.');
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent, status: 'DRAFT' | 'SUBMIT') => {
    e.preventDefault();
    if (isExpired) return;

    if (status === 'SUBMIT') {
      if (!formData.employeeId) { alert('Harap pilih pegawai pelaksana tugas.'); return; }
      if (!formData.purpose || formData.purpose.length < 10) { alert('Harap isi maksud perjalanan dinas dengan jelas.'); return; }
      if (!formData.destination) { alert('Harap isi tujuan perjalanan.'); return; }
      if (!formData.departureDate) { alert('Harap pilih tanggal keberangkatan.'); return; }
    }

    const msg = status === 'DRAFT' 
      ? `Data SPPD #${id || 'BARU'} berhasil disimpan sebagai draft.` 
      : `Pengajuan SPPD #${id || 'BARU'} telah dikirimkan ke meja Pimpinan untuk persetujuan.`;
    
    alert(msg);
    navigate('/sppd');
  };

  if (isExpired && !isEdit) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-white rounded-2xl border border-red-100 shadow-sm">
        <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Masa Aktif Habis</h2>
        <p className="text-gray-500 max-w-md mb-8">
          Instansi Anda tidak dapat membuat pengajuan baru. Harap hubungi Admin Instansi untuk perpanjangan langganan.
        </p>
        <Link to="/sppd" className="px-6 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl">Kembali ke Daftar</Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/sppd')} className="p-3 bg-white border border-gray-100 hover:bg-gray-50 rounded-2xl transition-all shadow-sm">
            <ChevronLeft size={24} className="text-gray-400" />
          </button>
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">{isEdit ? 'Ubah Berkas SPPD' : 'Buat SPPD Pegawai'}</h2>
            <p className="text-gray-500 text-sm font-medium">Lengkapi rincian perjalanan dinas sesuai format regulasi.</p>
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
              <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight">Personel & Transportasi</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pelaksana Tugas (Pegawai)</label>
                  {isPegawai ? (
                    <div className="w-full px-5 py-4 bg-blue-50 border border-blue-100 rounded-2xl font-black text-blue-900 flex items-center space-x-3 shadow-inner">
                       <CheckCircle2 size={18} className="text-blue-600" />
                       <span>{user?.name} - {user?.nip || 'NIP N/A'}</span>
                    </div>
                  ) : (
                    <div className="relative">
                       <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                       <select 
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold appearance-none cursor-pointer"
                        value={formData.employeeId}
                        onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                       >
                        <option value="">-- Pilih Pegawai Pelaksana --</option>
                        {myInstitutionUsers.map(u => (
                          <option key={u.id} value={u.id}>{u.name} ({u.nip || 'No NIP'})</option>
                        ))}
                       </select>
                    </div>
                  )}
                  <p className="text-[8px] text-gray-400 font-bold uppercase ml-2 italic">Pegawai hanya dapat mengajukan perjalanan untuk diri sendiri.</p>
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
                      <option value="Kapal Laut">Kapal Laut</option>
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
                  <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight">Uraian & Lokasi Tugas</h4>
                </div>
                <button 
                  type="button"
                  onClick={handleAiDraft}
                  disabled={isAiDrafting}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-900 to-indigo-800 text-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {isAiDrafting ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} className="text-amber-400" />}
                  <span>{isAiDrafting ? 'Formalisasi AI...' : 'Smart Narasi'}</span>
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Maksud Perjalanan Dinas</label>
                  <textarea 
                    rows={2} 
                    className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-[2rem] outline-none focus:ring-2 focus:ring-blue-900/10 font-medium text-gray-700 resize-none shadow-inner"
                    placeholder="Masukkan maksud penugasan Anda..."
                    value={formData.purpose}
                    onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Kab/Kota Tujuan</label>
                    <div className="relative">
                       <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                       <input 
                        type="text" 
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold focus:ring-2 focus:ring-blue-900/10" 
                        placeholder="E.g. Yogyakarta" 
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

            {/* Lampiran Upload */}
            <div className="pt-10 border-t border-gray-50 space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                    <Paperclip size={20} />
                  </div>
                  <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight">Unggah Lampiran Pendukung</h4>
                </div>
              </div>

              <div className="space-y-6">
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-100 rounded-[2.5rem] bg-gray-50/50 hover:bg-gray-50 hover:border-blue-900/20 transition-all cursor-pointer group shadow-inner">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                      <Upload size={24} className="text-gray-300 group-hover:text-blue-900" />
                    </div>
                    <p className="text-[10px] font-black text-gray-400 group-hover:text-gray-600 uppercase tracking-widest">Klik atau Tarik Berkas ke Sini</p>
                    <p className="text-[9px] text-gray-300 mt-2 font-bold uppercase tracking-tighter">Undangan / ST / Nota Dinas (Max 5MB)</p>
                  </div>
                  <input type="file" className="hidden" multiple onChange={handleFileChange} />
                </label>

                {formData.attachments.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.attachments.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-red-200 transition-all">
                        <div className="flex items-center space-x-4">
                          <div className="p-2.5 bg-white rounded-xl shadow-sm text-blue-900 group-hover:text-red-500 transition-colors">
                            <FileText size={18} />
                          </div>
                          <div>
                            <p className="text-xs font-black text-gray-800 truncate max-w-[180px]">{file.name}</p>
                            <p className="text-[9px] text-gray-400 font-bold uppercase">{(file.size / 1024).toFixed(1)} KB</p>
                          </div>
                        </div>
                        <button onClick={() => removeFile(idx)} className="p-2 text-gray-300 hover:text-red-600 transition-all bg-white rounded-lg shadow-sm">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Actions & Template Selector */}
        <div className="space-y-8">
          {/* Submit Action */}
          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
            <div className="flex items-center space-x-3 ml-1">
              <ClipboardList size={18} className="text-blue-900" />
              <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Opsi Penyimpanan</h5>
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
                <span>Simpan Sebagai Draft</span>
              </button>
            </div>
            
            <p className="text-[10px] text-gray-400 text-center font-medium italic">
               *Pastikan seluruh data sudah benar sebelum mengirim ke antrean pimpinan.
            </p>
          </div>

          {/* Template Selection */}
          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between ml-1">
              <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center">
                <FileCode size={16} className="mr-2" /> Format Dokumen
              </h5>
            </div>
            
            <div className="space-y-3">
              {availableTemplates.map(t => (
                <label key={t.id} className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${formData.templateId === t.id ? 'border-blue-900 bg-blue-50/50' : 'border-gray-50 hover:border-blue-100'}`}>
                   <div className="flex items-center space-x-3">
                      <input 
                        type="radio" 
                        name="template" 
                        className="w-4 h-4 accent-blue-900" 
                        checked={formData.templateId === t.id}
                        onChange={() => setFormData({...formData, templateId: t.id})}
                      />
                      <div>
                        <p className="text-xs font-black text-gray-800">{t.name}</p>
                        <p className="text-[9px] font-bold text-gray-400 uppercase">Ver v{t.version}.0</p>
                      </div>
                   </div>
                   {t.institutionId === 'GLOBAL' && <Globe size={14} className="text-blue-300" />}
                </label>
              ))}
            </div>
          </div>

          {/* Automatic Cost Calculation */}
          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center ml-1">
                <Calculator size={14} className="mr-2" /> Kalkulasi Plafon (SBM)
              </h5>
              <button 
                onClick={calculateCost}
                disabled={isCalculating}
                className="p-2.5 bg-blue-50 text-blue-900 rounded-xl hover:bg-blue-100 transition-all shadow-sm"
              >
                <RefreshCw size={16} className={isCalculating ? 'animate-spin' : ''} />
              </button>
            </div>
            
            <div className="text-center p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 relative group overflow-hidden shadow-inner">
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Estimasi Pagu Biaya</p>
               <h4 className="text-3xl font-black text-gray-900 tracking-tight">Rp {formData.estimatedCost.toLocaleString('id-ID')}</h4>
               
               <div className="mt-6 flex items-center justify-center space-x-2 py-2 px-4 bg-amber-50 rounded-xl border border-amber-100 text-amber-700">
                  <Lock size={12} className="shrink-0" />
                  <span className="text-[9px] font-black uppercase tracking-tighter">SBM Policy Enabled</span>
               </div>
               
               <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform">
                  <Calculator size={120} />
               </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-start space-x-3">
               <Info size={16} className="text-blue-900 shrink-0 mt-0.5" />
               <p className="text-[9px] text-blue-900 font-bold uppercase leading-relaxed tracking-tight">
                  Perhitungan didasarkan pada Jabatan Anda dan standar biaya wilayah tujuan sesuai regulasi instansi.
               </p>
            </div>
          </div>

          <div className="p-10 bg-indigo-900 text-white rounded-[3rem] shadow-2xl relative overflow-hidden group">
             <div className="relative z-10">
                <ShieldCheck size={40} className="text-amber-400 mb-8" />
                <h4 className="text-xl font-black mb-2 tracking-tight">Security Hash Protection</h4>
                <p className="text-blue-200 text-[10px] font-bold uppercase leading-relaxed tracking-tight opacity-80">
                  Seluruh data pengajuan ini dilindungi oleh enkripsi AES-256 dan hanya dapat diakses oleh Anda, Admin, dan Penyetuju terkait.
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
