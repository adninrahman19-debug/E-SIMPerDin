import React, { useState } from 'react';
import { 
  Plus, 
  MapPin, 
  Info, 
  DollarSign, 
  Plane, 
  Hotel, 
  Edit3, 
  Trash2, 
  RefreshCw, 
  Settings2, 
  ShieldCheck, 
  AlertTriangle, 
  ToggleRight, 
  ToggleLeft, 
  Save, 
  Search, 
  History,
  ChevronRight,
  Database,
  X,
  Target,
  /* Add missing AlertCircle import */
  AlertCircle
} from 'lucide-react';

const CostStandardsPage: React.FC = () => {
  // Policy States
  const [allowOverride, setAllowOverride] = useState(false);
  const [useGlobalSbm, setUseGlobalSbm] = useState(true);
  
  // Data State
  const [standards, setStandards] = useState([
    { id: '1', destination: 'Dalam Provinsi', perDiem: 370000, lodging: 500000, transport: 150000, active: true },
    { id: '2', destination: 'Luar Provinsi (Jawa)', perDiem: 530000, lodging: 1200000, transport: 500000, active: true },
    { id: '3', destination: 'Luar Provinsi (Luar Jawa)', perDiem: 650000, lodging: 1500000, transport: 1200000, active: true },
    { id: '4', destination: 'Ibukota Negara (Jakarta)', perDiem: 750000, lodging: 2200000, transport: 800000, active: true },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStandard, setEditingStandard] = useState<any>(null);

  const handleOpenEdit = (standard: any) => {
    setEditingStandard(standard);
    setIsModalOpen(true);
  };

  const handleSaveStandard = () => {
    alert('Parameter standar biaya berhasil diperbarui dalam database instansi.');
    setIsModalOpen(false);
  };

  const handleToggleOverride = () => {
    const nextState = !allowOverride;
    if(confirm(`Apakah Anda yakin ingin ${nextState ? 'MENGIZINKAN' : 'MELARANG'} perubahan biaya manual pada setiap SPPD? Tindakan ini akan dicatat dalam audit log.`)) {
      setAllowOverride(nextState);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight flex items-center">
            Plafon & Standar Biaya <DollarSign className="ml-3 text-blue-900" size={32} />
          </h2>
          <p className="text-gray-500 text-sm font-medium mt-1">Konfigurasi otomatisasi kalkulasi biaya (SBM) sesuai regulasi dan kebijakan internal.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-3.5 bg-white border border-gray-100 text-gray-400 rounded-2xl shadow-sm hover:text-blue-900 transition-all"><History size={20} /></button>
          <button 
            onClick={() => { setEditingStandard(null); setIsModalOpen(true); }}
            className="bg-blue-900 text-white px-8 py-4 rounded-2xl flex items-center space-x-3 hover:bg-blue-800 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20"
          >
            <Plus size={20} />
            <span>Tambah Wilayah</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main Cost Standards Grid */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Cari nama wilayah atau kategori..." className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-sm" />
            </div>
            <div className="flex items-center space-x-2 text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
               <RefreshCw size={14} className="text-blue-900" />
               <span>Last Sync: Today, 09:00</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {standards.map((item) => (
              <div key={item.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-2xl hover:border-blue-900/10 transition-all duration-500 flex flex-col">
                <div className="p-8 flex-1">
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                        <MapPin size={28} />
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-gray-900 leading-tight">{item.destination}</h4>
                        <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest mt-1">Aktif Sesuai DIPA</p>
                      </div>
                    </div>
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => handleOpenEdit(item)} className="p-2.5 text-gray-400 hover:text-blue-900 bg-gray-50 rounded-xl transition-all shadow-sm"><Edit3 size={18} /></button>
                      <button className="p-2.5 text-gray-400 hover:text-red-600 bg-gray-50 rounded-xl transition-all shadow-sm"><Trash2 size={18} /></button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group-hover:bg-white transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm text-emerald-600"><DollarSign size={16} /></div>
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Uang Harian</span>
                      </div>
                      <span className="text-sm font-black text-gray-900">Rp {item.perDiem.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group-hover:bg-white transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm text-amber-600"><Hotel size={16} /></div>
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Hotel (Max)</span>
                      </div>
                      <span className="text-sm font-black text-gray-900">Rp {item.lodging.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group-hover:bg-white transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600"><Plane size={16} /></div>
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Transport</span>
                      </div>
                      <span className="text-sm font-black text-gray-900">Rp {item.transport.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => handleOpenEdit(item)}
                  className="w-full py-4 bg-gray-50 border-t border-gray-100 text-[10px] font-black text-blue-900 uppercase tracking-widest hover:bg-blue-900 hover:text-white transition-all flex items-center justify-center space-x-2"
                >
                  <span>Sesuaikan Plafon Anggaran</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Policies & Control */}
        <div className="space-y-8">
           <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-10">
              <div className="flex items-center space-x-4">
                 <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-[1.5rem] flex items-center justify-center">
                    <Settings2 size={28} />
                 </div>
                 <h4 className="text-2xl font-black text-gray-900 tracking-tight">Kebijakan Unit</h4>
              </div>

              <div className="space-y-8">
                 <div className="flex items-start justify-between group">
                    <div className="flex-1 pr-6">
                       <div className="flex items-center space-x-2 mb-1">
                          <h5 className="font-black text-gray-800 uppercase text-xs">Izinkan Override Manual</h5>
                          {allowOverride ? <ShieldCheck size={14} className="text-emerald-500" /> : <AlertTriangle size={14} className="text-amber-500" />}
                       </div>
                       <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase tracking-tighter">
                          Operator dapat merubah besaran biaya secara manual pada saat input pengajuan SPPD.
                       </p>
                    </div>
                    <button 
                      onClick={handleToggleOverride}
                      className={`shrink-0 transition-all ${allowOverride ? 'text-emerald-500' : 'text-gray-300'}`}
                    >
                      {allowOverride ? <ToggleRight size={44} /> : <ToggleLeft size={44} />}
                    </button>
                 </div>

                 <div className="flex items-start justify-between group">
                    <div className="flex-1 pr-6">
                       <h5 className="font-black text-gray-800 uppercase text-xs mb-1">Pakai SBM Global (Nasional)</h5>
                       <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase tracking-tighter">
                          Sinkronkan data biaya otomatis dengan Standar Biaya Masukan Nasional terbaru.
                       </p>
                    </div>
                    <button 
                      onClick={() => setUseGlobalSbm(!useGlobalSbm)}
                      className={`shrink-0 transition-all ${useGlobalSbm ? 'text-blue-900' : 'text-gray-300'}`}
                    >
                      {useGlobalSbm ? <ToggleRight size={44} /> : <ToggleLeft size={44} />}
                    </button>
                 </div>
              </div>

              <div className={`p-6 rounded-3xl border transition-all ${allowOverride ? 'bg-amber-50 border-amber-100' : 'bg-emerald-50 border-emerald-100'}`}>
                 <div className="flex items-start space-x-3">
                    <Info size={20} className={allowOverride ? 'text-amber-600' : 'text-emerald-600'} />
                    <p className={`text-[10px] font-bold leading-relaxed uppercase tracking-tight ${allowOverride ? 'text-amber-800' : 'text-emerald-800'}`}>
                       {allowOverride 
                         ? 'Mode Fleksibel: Disarankan untuk perjalanan dengan biaya riil yang fluktuatif (Contoh: Tiket Pesawat).' 
                         : 'Mode Terkunci: Memastikan anggaran tidak membengkak dan sesuai dengan plafon yang ditentukan.'}
                    </p>
                 </div>
              </div>

              <button className="w-full py-4 bg-blue-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center justify-center space-x-2">
                 <Save size={16} />
                 <span>Update Kebijakan</span>
              </button>
           </div>

           <div className="bg-blue-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                 <Database size={40} className="text-amber-400 mb-8 group-hover:rotate-12 transition-transform duration-500" />
                 <h4 className="text-2xl font-black mb-4 leading-tight">Sinkronisasi Data SBM Pusat</h4>
                 <p className="text-blue-100 text-sm leading-relaxed opacity-80 mb-10 font-medium">
                   Perbarui data wilayah dan besaran biaya sesuai regulasi PMK terbaru dari dashboard Super Admin.
                 </p>
                 <button className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl">
                    Sync Sekarang
                 </button>
              </div>
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
           </div>
        </div>
      </div>

      {/* Modal CRUD Cost Standard */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-blue-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
              <div className="p-10 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                 <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-blue-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-blue-900/20"><Target size={28} /></div>
                    <div>
                       <h4 className="text-2xl font-black text-gray-900 tracking-tight">{editingStandard ? 'Edit Plafon Biaya' : 'Tambah Wilayah Baru'}</h4>
                       <p className="text-sm text-gray-500 font-medium mt-1">Lengkapi parameter anggaran untuk wilayah ini.</p>
                    </div>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="p-4 bg-white border border-gray-100 hover:bg-gray-100 rounded-3xl text-gray-400 transition-all shadow-sm"><X size={24} /></button>
              </div>

              <div className="p-10 space-y-8 overflow-y-auto custom-scrollbar">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Wilayah / Kategori</label>
                    <div className="relative">
                       <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                       <input 
                        type="text" 
                        defaultValue={editingStandard?.destination}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold text-gray-800" 
                        placeholder="Contoh: Papua Pegawai Eselon II"
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Uang Harian (IDR)</label>
                       <div className="relative">
                          <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                          <input type="number" defaultValue={editingStandard?.perDiem} className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-black text-emerald-600" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Penginapan Max (IDR)</label>
                       <div className="relative">
                          <Hotel size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                          <input type="number" defaultValue={editingStandard?.lodging} className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-black text-amber-600" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Transport Dasar (IDR)</label>
                       <div className="relative">
                          <Plane size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                          <input type="number" defaultValue={editingStandard?.transport} className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-black text-blue-600" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Kode Akun Anggaran (Internal)</label>
                       <input type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-mono font-bold" placeholder="524111" />
                    </div>
                 </div>

                 <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100 flex items-start space-x-4">
                    {/* Fixed missing AlertCircle name error */}
                    <AlertCircle size={24} className="text-blue-900 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-blue-900 font-bold uppercase leading-relaxed tracking-tight">
                       Plafon ini akan otomatis terkunci jika opsi "Gunakan SBM Global" diaktifkan pada halaman kebijakan. Pastikan data sesuai dengan DIPA instansi Anda.
                    </p>
                 </div>
              </div>

              <div className="p-10 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                 <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <ShieldCheck size={18} className="mr-2 text-blue-900" /> Verifikasi Integritas Data v2.4
                 </div>
                 <div className="flex space-x-4">
                    <button onClick={() => setIsModalOpen(false)} className="px-8 py-4 font-black text-[10px] uppercase tracking-widest text-gray-400 hover:text-gray-800 transition-all">Batalkan</button>
                    <button 
                      onClick={handleSaveStandard}
                      className="bg-blue-900 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center space-x-2"
                    >
                       <Save size={16} />
                       <span>Simpan Master</span>
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default CostStandardsPage;
