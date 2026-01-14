
import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../../App';
import { SubscriptionStatus, UserRole } from '../../types';
import { MOCK_USERS } from '../../constants';
// Added missing RefreshCw and Globe icons
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
  Globe
} from 'lucide-react';

const SPPDFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, subscription } = useAuth();
  const { id } = useParams();
  const isEdit = !!id;
  const isOperator = user?.role === UserRole.OPERATOR;

  const [formData, setFormData] = useState({
    employeeId: '',
    purpose: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    transportation: 'Pesawat',
    estimatedCost: 0,
    templateId: 'tmpl-1',
    attachments: [] as File[]
  });

  const [isCalculating, setIsCalculating] = useState(false);

  const isExpired = subscription?.status === SubscriptionStatus.EXPIRED;

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
    setIsCalculating(true);
    setTimeout(() => {
      // Mock calculation based on typical SBM
      setFormData(prev => ({ ...prev, estimatedCost: 3450000 }));
      setIsCalculating(false);
    }, 8000);
  };

  const handleSubmit = (e: React.FormEvent, status: 'DRAFT' | 'SUBMIT') => {
    e.preventDefault();
    if (isExpired) return;
    alert(status === 'DRAFT' ? 'Draft SPPD Berhasil Disimpan!' : 'SPPD Berhasil Dikirim ke Antrean Persetujuan!');
    navigate('/sppd');
  };

  if (isExpired && !isEdit) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-white rounded-2xl border border-red-100 shadow-sm">
        <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Akses Terbatas</h2>
        <p className="text-gray-500 max-w-md mb-8">
          Masa aktif langganan institusi Anda telah berakhir. Harap perbarui paket untuk membuat pengajuan baru.
        </p>
        <div className="flex space-x-4">
          <Link to="/sppd" className="px-6 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl">Kembali ke Daftar</Link>
          <Link to="/langganan" className="px-6 py-2.5 bg-blue-900 text-white font-bold rounded-xl shadow-lg">Perbarui Paket</Link>
        </div>
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
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">{isEdit ? 'Ubah Data SPPD' : 'Input SPPD Baru'}</h2>
            <p className="text-gray-500 text-sm font-medium">Lengkapi rincian penugasan untuk diteruskan ke pimpinan.</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
           <button 
             onClick={(e) => handleSubmit(e, 'DRAFT')}
             className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm shadow-sm"
           >
             Simpan Draft
           </button>
           <button 
             onClick={(e) => handleSubmit(e, 'SUBMIT')}
             className="bg-blue-900 text-white px-8 py-3 rounded-2xl hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 font-black text-xs uppercase tracking-widest flex items-center space-x-2"
           >
             <Send size={18} />
             <span>Kirim Pengajuan</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Section 1: Pelaksana & Tujuan */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 space-y-10">
            <div className="space-y-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center">
                  <Users size={20} />
                </div>
                <h4 className="text-lg font-black text-gray-900">Identitas Pelaksana</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pilih Pegawai (Pelaksana)</label>
                  <select 
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold"
                    value={formData.employeeId}
                    onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                  >
                    <option value="">-- Pilih Pegawai --</option>
                    {MOCK_USERS.filter(u => u.role === UserRole.PEGAWAI || u.role === UserRole.PEJABAT_PENYETUJU).map(u => (
                      <option key={u.id} value={u.id}>{u.name} - {u.nip}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Alat Transportasi</label>
                  <select 
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold"
                    value={formData.transportation}
                    onChange={(e) => setFormData({...formData, transportation: e.target.value})}
                  >
                    <option>Pesawat Terbang</option>
                    <option>Kereta Api</option>
                    <option>Kendaraan Dinas (Mobil)</option>
                    <option>Bus Umum</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Maksud / Keperluan Perjalanan</label>
                  <textarea 
                    rows={3} 
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-3xl outline-none focus:ring-2 focus:ring-blue-900/10 font-medium text-gray-700 resize-none"
                    placeholder="Contoh: Menghadiri rapat koordinasi teknis tentang sistem informasi..."
                    value={formData.purpose}
                    onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-gray-50 space-y-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <h4 className="text-lg font-black text-gray-900">Waktu & Tempat</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Kota Tujuan</label>
                  <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold" placeholder="E.g. Bandung" value={formData.destination} onChange={(e) => setFormData({...formData, destination: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Tgl Berangkat</label>
                  <input type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold" value={formData.departureDate} onChange={(e) => setFormData({...formData, departureDate: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Tgl Kembali</label>
                  <input type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold" value={formData.returnDate} onChange={(e) => setFormData({...formData, returnDate: e.target.value})} />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Upload Lampiran */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                  <Paperclip size={20} />
                </div>
                <h4 className="text-lg font-black text-gray-900">Lampiran Dokumen</h4>
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Max 5MB/file</p>
            </div>

            <div className="space-y-6">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-100 rounded-[2rem] bg-gray-50/50 hover:bg-gray-50 hover:border-blue-900/20 transition-all cursor-pointer group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload size={24} className="text-gray-300 group-hover:text-blue-900 mb-2" />
                  <p className="text-xs font-bold text-gray-400 group-hover:text-gray-600 uppercase tracking-widest">Klik atau tarik file ke sini</p>
                </div>
                <input type="file" className="hidden" multiple onChange={handleFileChange} />
              </label>

              {formData.attachments.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.attachments.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white rounded-xl shadow-sm text-blue-900">
                          <FileText size={16} />
                        </div>
                        <div className="max-w-[140px]">
                           <p className="text-xs font-bold text-gray-700 truncate">{file.name}</p>
                           <p className="text-[9px] text-gray-400 uppercase font-black tracking-tighter">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      <button onClick={() => removeFile(idx)} className="p-2 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar: Cost & Template */}
        <div className="space-y-8">
          {/* Kalkulator Section */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center">
              <Calculator size={14} className="mr-2" /> Estimasi Anggaran
            </h5>
            
            <div className="p-6 bg-blue-900 text-white rounded-3xl shadow-xl shadow-blue-900/20 relative overflow-hidden group">
               <div className="relative z-10">
                  <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-1">Total Biaya (Otomatis)</p>
                  <h4 className="text-3xl font-black">Rp {formData.estimatedCost.toLocaleString('id-ID')}</h4>
                  <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                     <span className="text-[9px] font-bold text-blue-200 uppercase">Berdasarkan SBM 2024</span>
                     <button 
                       onClick={calculateCost}
                       disabled={isCalculating}
                       className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
                     >
                       {/* Fixed: Added missing RefreshCw import */}
                       <RefreshCw size={16} className={isCalculating ? 'animate-spin' : ''} />
                     </button>
                  </div>
               </div>
               <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            </div>

            <div className="space-y-3">
               <div className="flex items-center justify-between text-xs font-bold text-gray-500 px-2">
                 <span>Uang Harian</span>
                 <span className="text-gray-900">Rp 1.050.000</span>
               </div>
               <div className="flex items-center justify-between text-xs font-bold text-gray-500 px-2">
                 <span>Biaya Hotel</span>
                 <span className="text-gray-900">Rp 1.200.000</span>
               </div>
               <div className="flex items-center justify-between text-xs font-bold text-gray-500 px-2">
                 <span>Tiket PP</span>
                 <span className="text-gray-900">Rp 1.200.000</span>
               </div>
            </div>
            
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start space-x-3">
               <Info size={16} className="text-amber-600 shrink-0 mt-0.5" />
               <p className="text-[9px] text-amber-800 font-bold leading-relaxed uppercase tracking-tight">
                 Standar biaya dikunci oleh Admin Instansi. Hubungi Bagian Keuangan jika ada penyesuaian khusus.
               </p>
            </div>
          </div>

          {/* Template Selection */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center">
              <Layout size={14} className="mr-2" /> Desain Dokumen
            </h5>
            
            <div className="space-y-3">
               {[
                 /* Fixed: Added missing Globe import */
                 { id: 'tmpl-1', name: 'Format Nasional', icon: <Globe size={14}/> },
                 { id: 'tmpl-2', name: 'Kop Surat Instansi', icon: <FileText size={14}/> },
               ].map((tmpl) => (
                 <button 
                  key={tmpl.id}
                  onClick={() => setFormData({...formData, templateId: tmpl.id})}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${formData.templateId === tmpl.id ? 'bg-indigo-50 border-indigo-200 text-indigo-900' : 'bg-gray-50 border-gray-100 text-gray-500 hover:border-gray-200'}`}
                 >
                   <div className="flex items-center space-x-3 font-bold text-xs uppercase">
                     {tmpl.icon}
                     <span>{tmpl.name}</span>
                   </div>
                   {formData.templateId === tmpl.id && <CheckCircle2 size={16} className="text-indigo-600" />}
                 </button>
               ))}
            </div>
          </div>

          <div className="p-8 bg-emerald-900 text-white rounded-[2.5rem] shadow-xl relative overflow-hidden">
             <div className="relative z-10">
                <CheckCircle2 size={32} className="text-emerald-400 mb-6" />
                <h4 className="text-lg font-black mb-2">Validasi Otomatis</h4>
                <p className="text-emerald-100 text-[10px] font-bold uppercase leading-relaxed tracking-tight opacity-80">
                  Sistem telah memverifikasi ketersediaan pagu anggaran untuk kegiatan ini. Dokumen siap diproses ke tahap persetujuan.
                </p>
             </div>
             <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SPPDFormPage;
