
import React, { useState } from 'react';
import { useAuth } from '../../App';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Image as ImageIcon, 
  FileText, 
  Save, 
  Plus, 
  Trash2, 
  Users, 
  ShieldCheck, 
  ChevronRight,
  Edit3,
  Camera,
  Info,
  Layout,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { Institution, WorkUnit } from '../../types';

const InstitutionProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'GENERAL' | 'STRUCTURE' | 'BRANDING'>('GENERAL');
  
  // Mock State - In real app this would fetch from API based on user.institutionId
  const [profile, setProfile] = useState<Partial<Institution>>({
    name: 'Dinas Perhubungan Provinsi',
    code: 'DISHUB-PROV',
    address: 'Jl. Merdeka No. 1, Kompleks Perkantoran Gubernur, Jakarta Pusat, 10110',
    phone: '(021) 1234-5678',
    email: 'kontak@dishub.go.id',
    website: 'https://dishub.prov.go.id',
    letterheadHtml: 'PEMERINTAH PROVINSI DKI JAKARTA\nDINAS PERHUBUNGAN\nJl. Merdeka No. 1 Jakarta Pusat',
    workUnits: [
      { id: 'wu-1', name: 'Sekretariat', code: 'SEK', headName: 'Ir. Ahmad Yani', employeeCount: 12 },
      { id: 'wu-2', name: 'Bidang Angkutan Jalan', code: 'BAJ', headName: 'Siti Sarah, M.Si', employeeCount: 24 },
      { id: 'wu-3', name: 'Bidang Lalu Lintas', code: 'BLL', headName: 'Budi Hartono, S.T.', employeeCount: 18 },
    ]
  });

  const handleSave = () => {
    alert('Profil instansi berhasil diperbarui!');
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Profil Instansi</h2>
          <p className="text-gray-500 text-sm font-medium">Kelola identitas, branding dokumen, dan struktur organisasi internal.</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-blue-900 text-white px-8 py-3 rounded-xl flex items-center space-x-2 hover:bg-blue-800 transition-all font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-900/20"
        >
          <Save size={18} />
          <span>Simpan Perubahan</span>
        </button>
      </div>

      <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm mb-8 w-fit">
        <button 
          onClick={() => setActiveTab('GENERAL')}
          className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center space-x-2 ${activeTab === 'GENERAL' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500 hover:text-blue-900'}`}
        >
          <Building2 size={16} />
          <span>Identitas & Kontak</span>
        </button>
        <button 
          onClick={() => setActiveTab('STRUCTURE')}
          className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center space-x-2 ${activeTab === 'STRUCTURE' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500 hover:text-blue-900'}`}
        >
          <Layers size={16} />
          <span>Struktur & Unit</span>
        </button>
        <button 
          onClick={() => setActiveTab('BRANDING')}
          className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center space-x-2 ${activeTab === 'BRANDING' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500 hover:text-blue-900'}`}
        >
          <ImageIcon size={16} />
          <span>Branding & Kop</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {activeTab === 'GENERAL' && (
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden animate-in slide-in-from-left-4">
              <div className="p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Resmi Instansi</label>
                    <div className="relative">
                      <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                      <input 
                        type="text" 
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold text-gray-800"
                        defaultValue={profile.name}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Kode Satker / ID</label>
                    <div className="relative">
                      <ShieldCheck size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                      <input 
                        type="text" 
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-mono text-blue-900 font-bold uppercase"
                        defaultValue={profile.code}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Alamat Kantor Lengkap</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-4 top-4 text-gray-300" />
                    <textarea 
                      rows={3}
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-medium text-gray-700 resize-none"
                      defaultValue={profile.address}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Telepon</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                      <input type="text" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-gray-700" defaultValue={profile.phone} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Dinas</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                      <input type="email" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-gray-700" defaultValue={profile.email} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Website</label>
                    <div className="relative">
                      <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                      <input type="text" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-gray-700" defaultValue={profile.website} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'STRUCTURE' && (
            <div className="space-y-6 animate-in slide-in-from-left-4">
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                   <h4 className="text-xl font-black text-gray-900">Unit Kerja & Bidang</h4>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Daftar bagian internal instansi</p>
                </div>
                <button className="bg-blue-900 text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-blue-900/10 hover:bg-blue-800 transition-all">
                  <Plus size={16} />
                  <span>Tambah Unit</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {profile.workUnits?.map((unit) => (
                  <div key={unit.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-900/20 transition-all">
                    <div className="flex items-center space-x-5">
                      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                        <Users size={20} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                           <h5 className="font-black text-gray-900">{unit.name}</h5>
                           <span className="text-[9px] font-black bg-gray-100 text-gray-500 px-2 py-0.5 rounded uppercase">{unit.code}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 font-medium italic">Kepala: {unit.headName || 'Belum diatur'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-8">
                       <div className="text-right">
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Pegawai</p>
                          <p className="text-sm font-black text-gray-900">{unit.employeeCount}</p>
                       </div>
                       <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                          <button className="p-2 text-gray-400 hover:text-blue-900 hover:bg-gray-50 rounded-xl"><Edit3 size={18} /></button>
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl"><Trash2 size={18} /></button>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'BRANDING' && (
            <div className="space-y-8 animate-in slide-in-from-left-4">
              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-10 space-y-10">
                  <div className="flex flex-col md:flex-row items-start gap-10">
                     <div className="flex flex-col items-center">
                        <div className="w-32 h-32 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2rem] flex items-center justify-center relative group overflow-hidden">
                           <ImageIcon size={40} className="text-gray-200 group-hover:scale-110 transition-transform" />
                           <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center text-white cursor-pointer">
                              <Camera size={24} />
                              <span className="text-[9px] font-black uppercase mt-1">Upload Logo</span>
                           </div>
                        </div>
                        <p className="text-[9px] text-gray-400 font-bold uppercase mt-4 text-center">Format: PNG/SVG<br/>Max 2MB</p>
                     </div>
                     <div className="flex-1 space-y-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Kop Surat (Header Dokumen)</label>
                           <textarea 
                             rows={5}
                             className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[2rem] outline-none focus:ring-2 focus:ring-blue-900/10 font-bold text-gray-700 text-center uppercase tracking-tight leading-relaxed"
                             defaultValue={profile.letterheadHtml}
                             placeholder="E.g. PEMERINTAH PROVINSI...\nDINAS..."
                           />
                        </div>
                        <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start space-x-3">
                           <Layout size={20} className="text-blue-900 shrink-0 mt-0.5" />
                           <p className="text-[10px] text-blue-900 font-bold leading-relaxed uppercase tracking-tight">
                              Teks di atas akan otomatis digunakan sebagai KOP SURAT pada setiap output PDF (SPPD, Kwitansi, Laporan). Gunakan tombol ENTER untuk baris baru.
                           </p>
                        </div>
                     </div>
                  </div>
                </div>
              </div>

              {/* Preview Section */}
              <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                 <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Pratinjau Kop Dokumen Resmi</h4>
                 <div className="border-2 border-gray-100 rounded-xl p-8 max-w-2xl mx-auto shadow-inner bg-gray-50/30">
                    <div className="flex flex-col items-center border-b-2 border-gray-900 pb-4">
                       <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold mb-4">LOGO</div>
                       <div className="text-center">
                          {profile.letterheadHtml?.split('\n').map((line, i) => (
                            <p key={i} className={`font-black uppercase tracking-tight leading-none ${i === 0 ? 'text-sm' : i === 1 ? 'text-lg text-blue-900' : 'text-[10px] text-gray-500'}`}>
                              {line}
                            </p>
                          ))}
                       </div>
                    </div>
                    <div className="h-32 flex flex-col items-center justify-center">
                       <p className="text-[10px] text-gray-300 font-bold italic uppercase tracking-widest">Konten Dokumen Dinamis...</p>
                    </div>
                 </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
           <div className="bg-blue-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                 <ShieldCheck size={32} className="text-amber-400 mb-6" />
                 <h4 className="text-lg font-black mb-2 leading-tight">Keamanan Data Profil</h4>
                 <p className="text-blue-100 text-[10px] font-bold uppercase leading-relaxed tracking-tight opacity-80">
                   Profil ini digunakan oleh sistem untuk memverifikasi keabsahan dokumen digital. Perubahan nama instansi memerlukan re-verifikasi tanda tangan elektronik jika tersedia.
                 </p>
              </div>
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
           </div>

           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
              <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Data Statistik</h5>
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 transition-all hover:bg-white hover:border-blue-900/10">
                    <div className="flex items-center space-x-3">
                       <Users size={16} className="text-blue-900" />
                       <span className="text-[10px] font-black text-gray-500 uppercase">Unit Aktif</span>
                    </div>
                    <span className="text-sm font-black text-gray-900">{profile.workUnits?.length || 0}</span>
                 </div>
                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 transition-all hover:bg-white hover:border-blue-900/10">
                    <div className="flex items-center space-x-3">
                       <FileText size={16} className="text-emerald-600" />
                       <span className="text-[10px] font-black text-gray-500 uppercase">Template Dinas</span>
                    </div>
                    <span className="text-sm font-black text-gray-900">12 Dok</span>
                 </div>
              </div>
              <button className="w-full flex items-center justify-center space-x-2 py-3 text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline transition-all">
                 <span>Lihat Analitik Lengkap</span>
                 <ArrowUpRight size={14} />
              </button>
           </div>

           <div className="p-6 bg-amber-50 rounded-[2rem] border border-amber-100 flex items-start space-x-3">
             <Info size={20} className="text-amber-600 shrink-0 mt-0.5" />
             <p className="text-[9px] text-amber-800 font-bold leading-relaxed uppercase">
               Unit kerja yang dihapus tidak akan menghapus riwayat SPPD, namun unit tersebut tidak dapat dipilih lagi untuk pengajuan baru.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionProfilePage;
