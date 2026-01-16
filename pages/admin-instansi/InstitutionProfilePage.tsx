import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Image as ImageIcon, 
  Save, 
  Camera, 
  Info, 
  Layers, 
  Plus, 
  Trash2, 
  Edit3, 
  FileText, 
  CheckCircle2, 
  ChevronRight,
  Layout,
  Briefcase,
  // Added missing ShieldCheck and X imports from lucide-react
  ShieldCheck,
  X
} from 'lucide-react';
import { WorkUnit } from '../../types';

const InstitutionProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'IDENTITY' | 'BRANDING' | 'STRUCTURE'>('IDENTITY');
  
  // Local state for simulation
  const [institution, setInstitution] = useState({
    name: 'Dinas Perhubungan Provinsi',
    code: 'DISHUB-PROV',
    address: 'Jl. Merdeka No. 1, Kompleks Perkantoran Gubernur, Jakarta Pusat, 10110',
    phone: '(021) 1234-5678',
    email: 'admin@dishub.go.id',
    website: 'www.dishub.prov.go.id',
    letterhead: 'PEMERINTAH PROVINSI DKI JAKARTA\nDINAS PERHUBUNGAN\nJl. Merdeka No. 1 Jakarta Pusat, Telp (021) 12345678'
  });

  const [workUnits, setWorkUnits] = useState<WorkUnit[]>([
    { id: 'wu-1', name: 'Sekretariat', code: 'SEK', headName: 'Ir. Ahmad Yani', employeeCount: 12 },
    { id: 'wu-2', name: 'Bidang Angkutan Jalan', code: 'BAJ', headName: 'Siti Sarah, M.Si', employeeCount: 24 },
    { id: 'wu-3', name: 'Bidang Lalu Lintas', code: 'BLL', headName: 'Budi Hartono, S.T.', employeeCount: 18 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUnit, setNewUnit] = useState({ name: '', code: '', headName: '' });

  const handleSaveProfile = () => {
    alert('Profil Instansi berhasil diperbarui dan disinkronkan dengan sistem kearsipan!');
  };

  const handleAddUnit = () => {
    if (!newUnit.name || !newUnit.code) return;
    const unit: WorkUnit = {
      id: `wu-${Date.now()}`,
      name: newUnit.name,
      code: newUnit.code,
      headName: newUnit.headName,
      employeeCount: 0
    };
    setWorkUnits([...workUnits, unit]);
    setNewUnit({ name: '', code: '', headName: '' });
    setIsModalOpen(false);
  };

  const removeUnit = (id: string) => {
    if(confirm('Apakah Anda yakin ingin menghapus unit kerja ini?')) {
      setWorkUnits(workUnits.filter(u => u.id !== id));
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight flex items-center">
            Manajemen Profil <Building2 className="ml-3 text-blue-900" size={32} />
          </h2>
          <p className="text-gray-500 text-sm font-medium mt-1">Konfigurasi identitas resmi, branding dokumen (Kop Surat), dan struktur organisasi.</p>
        </div>
        <button 
          onClick={handleSaveProfile}
          className="bg-blue-900 text-white px-8 py-4 rounded-2xl flex items-center space-x-3 hover:bg-blue-800 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20"
        >
          <Save size={18} />
          <span>Simpan Perubahan</span>
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm mb-10 w-fit overflow-x-auto max-w-full">
        {[
          { id: 'IDENTITY', icon: Building2, label: 'Identitas & Kontak' },
          { id: 'BRANDING', icon: ImageIcon, label: 'Kop Surat & Logo' },
          { id: 'STRUCTURE', icon: Layers, label: 'Struktur & Unit Kerja' },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center space-x-2 whitespace-nowrap ${activeTab === tab.id ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500 hover:text-blue-900'}`}
          >
            <tab.icon size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {activeTab === 'IDENTITY' && (
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden animate-in slide-in-from-left-4 duration-500">
               <div className="p-10 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Resmi Instansi</label>
                       <input 
                         type="text" 
                         className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold text-gray-800"
                         value={institution.name}
                         onChange={(e) => setInstitution({...institution, name: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Kode Satker (Internal)</label>
                       <input 
                         type="text" 
                         className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-mono font-bold text-blue-900 uppercase"
                         value={institution.code}
                         onChange={(e) => setInstitution({...institution, code: e.target.value})}
                       />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Alamat Kantor Lengkap</label>
                    <textarea 
                      rows={3}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[2rem] outline-none focus:ring-2 focus:ring-blue-900/10 font-medium text-gray-700 resize-none"
                      value={institution.address}
                      onChange={(e) => setInstitution({...institution, address: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Telepon</label>
                       <div className="relative">
                          <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                          <input type="text" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold" value={institution.phone} onChange={(e) => setInstitution({...institution, phone: e.target.value})} />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Dinas</label>
                       <div className="relative">
                          <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                          <input type="email" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold" value={institution.email} onChange={(e) => setInstitution({...institution, email: e.target.value})} />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Website Resmi</label>
                       <div className="relative">
                          <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                          <input type="text" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold" value={institution.website} onChange={(e) => setInstitution({...institution, website: e.target.value})} />
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'BRANDING' && (
            <div className="space-y-8 animate-in slide-in-from-left-4 duration-500">
               <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden p-10">
                  <div className="flex flex-col md:flex-row items-start gap-12">
                     <div className="flex flex-col items-center">
                        <div className="w-40 h-40 bg-gray-50 border-4 border-dashed border-gray-200 rounded-[3rem] flex items-center justify-center relative group overflow-hidden cursor-pointer shadow-inner">
                           <ImageIcon size={48} className="text-gray-200 group-hover:scale-110 transition-transform" />
                           <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center text-white">
                              <Camera size={28} />
                              <span className="text-[10px] font-black uppercase mt-2">Ganti Logo</span>
                           </div>
                        </div>
                        <p className="text-[9px] text-gray-400 font-bold uppercase mt-6 text-center tracking-widest">Logo PNG/SVG<br/>Max Size: 2MB</p>
                     </div>

                     <div className="flex-1 space-y-8 w-full">
                        <div className="space-y-4">
                           <div className="flex items-center space-x-2 ml-1">
                              <Layout size={18} className="text-blue-900" />
                              <h5 className="text-sm font-black text-gray-900 uppercase tracking-tight">Kop Surat (Header Dokumen)</h5>
                           </div>
                           <textarea 
                             rows={6}
                             className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-[2.5rem] outline-none focus:ring-2 focus:ring-blue-900/10 font-bold text-gray-800 text-center uppercase tracking-tight leading-relaxed shadow-inner"
                             value={institution.letterhead}
                             onChange={(e) => setInstitution({...institution, letterhead: e.target.value})}
                             placeholder="Contoh: PEMERINTAH PROVINSI...\nDINAS..."
                           />
                        </div>
                        
                        <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100 flex items-start space-x-4">
                           <Info size={24} className="text-blue-900 shrink-0 mt-0.5" />
                           <p className="text-[10px] text-blue-900 font-bold leading-relaxed uppercase tracking-tight">
                              Teks di atas akan otomatis digunakan sebagai KEPALA SURAT pada setiap output SPPD, Surat Tugas, dan Kwitansi digital. Gunakan tombol 'Enter' untuk baris baru.
                           </p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Live Preview Kop */}
               <div className="bg-gray-900 p-1 rounded-[3.5rem] shadow-2xl">
                  <div className="bg-white m-3 rounded-[2.5rem] p-12 border border-gray-100 shadow-inner">
                     <h6 className="text-[9px] font-black text-gray-300 uppercase tracking-[0.3em] mb-8 text-center">Preview Output Dokumen Resmi</h6>
                     <div className="max-w-2xl mx-auto border-b-2 border-black pb-6 mb-10 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-blue-900 rounded-2xl flex items-center justify-center text-white font-black mb-4 shadow-lg">LOGO</div>
                        <div className="space-y-1">
                           {institution.letterhead.split('\n').map((line, i) => (
                             <p key={i} className={`font-black uppercase leading-tight ${i === 1 ? 'text-xl text-blue-900' : 'text-xs text-gray-800'}`}>
                               {line}
                             </p>
                           ))}
                        </div>
                     </div>
                     <div className="h-40 flex flex-col items-center justify-center space-y-4 border border-dashed border-gray-100 rounded-3xl">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest italic animate-pulse">Konten Dokumen Dinamis (SPPD/ST)</p>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'STRUCTURE' && (
            <div className="space-y-8 animate-in slide-in-from-left-4 duration-500">
               <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h4 className="text-2xl font-black text-gray-900 tracking-tight">Struktur Unit Kerja</h4>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Daftar Bagian & Bidang Internal Lembaga</p>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-900 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center space-x-3 shadow-xl hover:bg-blue-800 transition-all"
                  >
                    <Plus size={20} />
                    <span>Unit Baru</span>
                  </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {workUnits.map((unit) => (
                   <div key={unit.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all duration-500">
                      <div className="flex items-start justify-between mb-8">
                         <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                            <Layers size={28} />
                         </div>
                         <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-all">
                            <button className="p-2.5 text-gray-400 hover:text-blue-900 bg-gray-50 rounded-xl transition-all"><Edit3 size={18} /></button>
                            <button onClick={() => removeUnit(unit.id)} className="p-2.5 text-gray-400 hover:text-red-600 bg-gray-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                         </div>
                      </div>

                      <div className="space-y-2">
                         <div className="flex items-center space-x-3">
                            <h5 className="text-xl font-black text-gray-900 leading-tight">{unit.name}</h5>
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-900 rounded-lg text-[10px] font-black font-mono">{unit.code}</span>
                         </div>
                         <p className="text-sm font-bold text-gray-500 flex items-center italic">
                            <Briefcase size={14} className="mr-2 text-gray-300" /> Kepala: {unit.headName || 'Belum diatur'}
                         </p>
                      </div>

                      <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                         <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            <CheckCircle2 size={12} className="mr-2 text-emerald-500" /> Terdaftar {unit.employeeCount} Pegawai
                         </div>
                         <button className="p-2 text-gray-400 hover:text-blue-900 transition-all"><ChevronRight size={20} /></button>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          )}

        </div>

        {/* Sidebar Otoritas & Bantuan */}
        <div className="space-y-8">
           <div className="bg-blue-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                 {/* Added missing ShieldCheck to lucide-react imports */}
                 <ShieldCheck size={40} className="text-amber-400 mb-8 group-hover:rotate-12 transition-transform duration-500" />
                 <h4 className="text-2xl font-black mb-4 tracking-tight leading-tight">Otoritas Institusi</h4>
                 <p className="text-blue-100 text-sm leading-relaxed opacity-80 mb-8 font-medium">
                   Data profil dan struktur unit adalah kunci otomatisasi RBAC (Role Based Access Control). Pastikan Unit Kerja sesuai dengan DIPA instansi Anda.
                 </p>
                 <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-1">Status Verifikasi</p>
                    <div className="flex items-center text-xs font-bold text-emerald-400">
                       <CheckCircle2 size={14} className="mr-2" /> DATA TERVALIDASI PUSAT
                    </div>
                 </div>
              </div>
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
           </div>

           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
              <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center">
                 <Info size={16} className="mr-2 text-blue-900" /> Tips Konfigurasi
              </h5>
              <div className="space-y-4">
                 <div className="p-4 bg-gray-50 rounded-2xl group hover:bg-blue-50 transition-colors">
                    <p className="text-xs font-black text-gray-700 leading-relaxed uppercase">Unit Kerja Minimal Satu</p>
                    <p className="text-[10px] text-gray-400 mt-1">Sistem mewajibkan minimal satu unit utama agar penomoran otomatis {institution.code} dapat berfungsi.</p>
                 </div>
                 <div className="p-4 bg-gray-50 rounded-2xl group hover:bg-blue-50 transition-colors">
                    <p className="text-xs font-black text-gray-700 leading-relaxed uppercase">Singkatan Satker</p>
                    <p className="text-[10px] text-gray-400 mt-1">Gunakan singkatan resmi (DISHUB, BAPPEDA, dsb) untuk mempermudah identifikasi dalam audit log platform.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Modal Add Work Unit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-blue-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
           <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
              <div className="p-10 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                 <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-900 text-white rounded-2xl flex items-center justify-center shadow-lg"><Layers size={24} /></div>
                    <h4 className="text-2xl font-black text-gray-900 tracking-tight">Tambah Unit</h4>
                 </div>
                 {/* X is now imported from lucide-react */}
                 <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-red-600 transition-colors"><X size={24} /></button>
              </div>
              <div className="p-10 space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Unit / Bidang</label>
                    <input 
                      type="text" 
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold"
                      placeholder="E.g. Bagian Umum & Kepegawaian"
                      value={newUnit.name}
                      onChange={(e) => setNewUnit({...newUnit, name: e.target.value})}
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Kode Singkat</label>
                       <input 
                         type="text" 
                         className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold uppercase"
                         placeholder="E.g. UMPEG"
                         value={newUnit.code}
                         onChange={(e) => setNewUnit({...newUnit, code: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Kepala Unit</label>
                       <input 
                         type="text" 
                         className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold"
                         placeholder="E.g. Dr. Sudrajat"
                         value={newUnit.headName}
                         onChange={(e) => setNewUnit({...newUnit, headName: e.target.value})}
                       />
                    </div>
                 </div>
              </div>
              <div className="p-10 bg-gray-50 border-t border-gray-100 flex gap-4">
                 <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 text-gray-500 font-black text-xs uppercase tracking-widest hover:text-gray-800 transition-all">Batal</button>
                 <button 
                   onClick={handleAddUnit}
                   className="flex-[2] py-4 bg-blue-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20"
                  >
                   Registrasi Unit
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default InstitutionProfilePage;
