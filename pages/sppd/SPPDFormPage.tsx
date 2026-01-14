
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../../App';
import { SubscriptionStatus, UserRole } from '../../types';
import { MOCK_USERS } from '../../constants';
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
  Lock
} from 'lucide-react';

const SPPDFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, subscription } = useAuth();
  const { id } = useParams();
  const isEdit = !!id;
  const isPegawai = user?.role === UserRole.PEGAWAI;

  const [formData, setFormData] = useState({
    employeeId: isPegawai ? user?.id : '',
    purpose: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    transportation: 'Pesawat Terbang',
    estimatedCost: 0,
    templateId: 'tmpl-1',
    attachments: [] as File[],
    itineraryNotes: '' 
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
    if (!formData.destination) {
      alert('Harap masukkan Kota Tujuan terlebih dahulu.');
      return;
    }
    setIsCalculating(true);
    setTimeout(() => {
      setFormData(prev => ({ ...prev, estimatedCost: 3450000 }));
      setIsCalculating(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent, status: 'DRAFT' | 'SUBMIT') => {
    e.preventDefault();
    if (isExpired) return;

    if (status === 'SUBMIT' && (!formData.purpose || !formData.destination || !formData.departureDate)) {
      alert('Mohon lengkapi rencana perjalanan Anda sebelum mengirim.');
      return;
    }

    alert(status === 'DRAFT' ? 'Rencana Berhasil Disimpan!' : 'Pengajuan Berhasil Dikirim!');
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
          Masa aktif langganan institusi Anda telah berakhir. Harap hubungi Admin.
        </p>
        <Link to="/sppd" className="px-6 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl">Kembali</Link>
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
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">{isEdit ? 'Ubah Rencana Dinas' : 'Buat Rencana Perjalanan'}</h2>
            <p className="text-gray-500 text-sm font-medium">Pastikan data yang Anda input sesuai dengan kebutuhan penugasan.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center">
                <Users size={20} />
              </div>
              <h4 className="text-lg font-black text-gray-900">Pelaksana Tugas</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Identitas Pegawai</label>
                  {isPegawai ? (
                    <div className="w-full px-4 py-3.5 bg-blue-50 border border-blue-100 rounded-2xl font-bold text-blue-900 flex items-center space-x-3">
                       <CheckCircle2 size={18} className="text-blue-600" />
                       <span>{user?.name} - {user?.nip || 'User ID'}</span>
                    </div>
                  ) : (
                    <select 
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 font-bold"
                      value={formData.employeeId}
                      onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                    >
                      <option value="">-- Pilih Pegawai --</option>
                      {MOCK_USERS.map(u => (
                        <option key={u.id} value={u.id}>{u.name} - {u.nip}</option>
                      ))}
                    </select>
                  )}
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Alat Transportasi</label>
                  <select 
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold"
                    value={formData.transportation}
                    onChange={(e) => setFormData({...formData, transportation: e.target.value})}
                  >
                    <option>Pesawat Terbang</option>
                    <option>Kereta Api</option>
                    <option>Mobil Dinas</option>
                    <option>Bus Umum</option>
                  </select>
               </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 space-y-10">
            <div className="space-y-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <h4 className="text-lg font-black text-gray-900">Maksud & Tujuan Perjalanan</h4>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Maksud / Keperluan</label>
                  <textarea 
                    rows={2} 
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-3xl outline-none focus:ring-2 font-medium text-gray-700 resize-none"
                    placeholder="Contoh: Menghadiri rapat koordinasi teknis di kantor pusat..."
                    value={formData.purpose}
                    onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Kota Tujuan</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold" 
                      placeholder="Bandung, Surabaya, dsb." 
                      value={formData.destination} 
                      onChange={(e) => setFormData({...formData, destination: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Berangkat</label>
                    <input type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold" value={formData.departureDate} onChange={(e) => setFormData({...formData, departureDate: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Kembali</label>
                    <input type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold" value={formData.returnDate} onChange={(e) => setFormData({...formData, returnDate: e.target.value})} />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-gray-50 space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                    <Paperclip size={20} />
                  </div>
                  <h4 className="text-lg font-black text-gray-900">Lampiran Dokumen</h4>
                </div>
              </div>

              <div className="space-y-6">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-100 rounded-[2rem] bg-gray-50/50 hover:bg-gray-50 hover:border-blue-900/20 transition-all cursor-pointer group">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload size={24} className="text-gray-300 group-hover:text-blue-900 mb-2" />
                    <p className="text-xs font-bold text-gray-400 group-hover:text-gray-600 uppercase tracking-widest">Tarik berkas PDF/JPG undangan ke sini</p>
                  </div>
                  <input type="file" className="hidden" multiple onChange={handleFileChange} />
                </label>

                {formData.attachments.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.attachments.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-white rounded-xl shadow-sm text-blue-900">
                            <FileText size={16} />
                          </div>
                          <p className="text-xs font-bold text-gray-700 truncate max-w-[150px]">{file.name}</p>
                        </div>
                        <button onClick={() => removeFile(idx)} className="p-2 text-gray-300 hover:text-red-600 transition-all">
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

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center">
              <ClipboardList size={14} className="mr-2" /> Aksi Rencana
            </h5>
            
            <div className="space-y-3">
              <button 
                onClick={(e) => handleSubmit(e, 'SUBMIT')}
                className="w-full py-4 bg-blue-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl flex items-center justify-center space-x-2"
              >
                <Send size={16} />
                <span>Ajukan Sekarang</span>
              </button>
              <button 
                onClick={(e) => handleSubmit(e, 'DRAFT')}
                className="w-full py-4 bg-white border border-gray-100 text-gray-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center space-x-2 shadow-sm"
              >
                <Save size={16} />
                <span>Simpan Draft</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center">
                <Calculator size={14} className="mr-2" /> Kalkulasi Biaya (SBM)
              </h5>
              <button 
                onClick={calculateCost}
                disabled={isCalculating}
                className="p-2 bg-blue-50 text-blue-900 rounded-xl hover:bg-blue-100 transition-all"
              >
                <RefreshCw size={14} className={isCalculating ? 'animate-spin' : ''} />
              </button>
            </div>
            
            <div className="text-center p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 relative group overflow-hidden">
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Estimasi Plafon Biaya</p>
               <h4 className="text-3xl font-black text-gray-900 tracking-tight">Rp {formData.estimatedCost.toLocaleString('id-ID')}</h4>
               
               {/* Lock Indicator khusus Pegawai */}
               {isPegawai && (
                 <div className="mt-4 flex items-center justify-center space-x-2 py-2 px-4 bg-amber-50 rounded-xl border border-amber-100 text-amber-700 animate-in fade-in zoom-in duration-700">
                    <Lock size={12} className="shrink-0" />
                    <span className="text-[9px] font-black uppercase tracking-tighter">Biaya Terkunci oleh SBM</span>
                 </div>
               )}
            </div>

            <div className="space-y-4 pt-4">
               <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                  <span className="flex items-center"><Map size={14} className="mr-2" /> Jalur Angkutan</span>
                  <span className="text-gray-900">{formData.transportation}</span>
               </div>
            </div>
          </div>

          <div className="p-8 bg-indigo-900 text-white rounded-[2.5rem] shadow-xl relative overflow-hidden">
             <div className="relative z-10">
                <ShieldCheck size={32} className="text-amber-400 mb-6" />
                <h4 className="text-lg font-black mb-2">Integritas Data</h4>
                <p className="text-indigo-100 text-[10px] font-bold uppercase leading-relaxed tracking-tight opacity-80">
                  Perubahan biaya hanya dapat dilakukan oleh Admin melalui pengaturan "Standar Biaya Masukan" global guna menjamin kepatuhan audit.
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
