
import React, { useState } from 'react';
import { MOCK_GLOBAL_COSTS } from '../../constants';
import { 
  Globe, 
  Plus, 
  MapPin, 
  Edit3, 
  Trash2, 
  Search, 
  Filter, 
  Info, 
  Lock, 
  Unlock, 
  Save, 
  X,
  Plane,
  Building,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  RefreshCw,
  AlertTriangle,
  Settings2,
  ChevronRight
} from 'lucide-react';
import { CostStandard } from '../../types';

const GlobalCostStandardsPage: React.FC = () => {
  const [costs, setCosts] = useState<CostStandard[]>(MOCK_GLOBAL_COSTS);
  const [isOverrideAllowed, setIsOverrideAllowed] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCost, setSelectedCost] = useState<CostStandard | null>(null);

  const filteredCosts = costs.filter(c => 
    c.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenEdit = (cost: CostStandard | null = null) => {
    setSelectedCost(cost);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCost(null);
  };

  const handleToggleOverride = () => {
    const status = !isOverrideAllowed ? 'DIIZINKAN' : 'DILARANG';
    if(confirm(`Apakah Anda yakin ingin mengubah kebijakan platform? Jika ${status}, maka seluruh instansi akan ${!isOverrideAllowed ? 'bebas mengatur SBM lokal' : 'terkunci pada standar pusat'}.`)) {
      setIsOverrideAllowed(!isOverrideAllowed);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Standar Biaya Nasional (SBM)</h2>
          <p className="text-gray-500 text-sm font-medium">Manajemen referensi plafon biaya perjalanan dinas global v2024.</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-all font-black text-[10px] uppercase tracking-widest shadow-sm flex items-center space-x-2">
            <RefreshCw size={16} />
            <span>Update Kurs</span>
          </button>
          <button 
            onClick={() => handleOpenEdit()}
            className="bg-blue-900 text-white px-6 py-2.5 rounded-xl flex items-center space-x-2 hover:bg-blue-800 transition-all font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-900/20"
          >
            <Plus size={18} />
            <span>Tambah Master Wilayah</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Policy & Config */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
            <div>
               <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Platform Policy</h5>
               
               <div className={`p-6 rounded-[2rem] border transition-all ${isOverrideAllowed ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isOverrideAllowed ? 'text-emerald-700' : 'text-red-700'}`}>
                      {isOverrideAllowed ? 'Override Open' : 'Override Locked'}
                    </span>
                    {isOverrideAllowed ? <Unlock size={16} className="text-emerald-500" /> : <Lock size={16} className="text-red-500" />}
                  </div>
                  <p className={`text-[10px] font-bold leading-relaxed uppercase tracking-tight mb-6 ${isOverrideAllowed ? 'text-emerald-800' : 'text-red-800'}`}>
                    {isOverrideAllowed 
                      ? 'Instansi diizinkan menentukan standar biaya lokal sendiri (Opsi Mandiri).' 
                      : 'Seluruh instansi dipaksa menggunakan standar pusat (Strict Compliance).'}
                  </p>
                  <button 
                    onClick={handleToggleOverride}
                    className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isOverrideAllowed ? 'bg-white text-emerald-700 border border-emerald-200' : 'bg-red-600 text-white shadow-lg shadow-red-600/20'}`}
                  >
                    {isOverrideAllowed ? 'Lock Override' : 'Allow Override'}
                  </button>
               </div>
            </div>

            <div className="space-y-4">
               <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                 <input 
                  type="text" 
                  placeholder="Cari Wilayah..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none text-xs font-bold focus:ring-2 focus:ring-blue-900/10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                 />
               </div>
               <button className="w-full flex items-center justify-between p-4 bg-gray-50 text-gray-500 hover:text-blue-900 rounded-2xl transition-all border border-transparent hover:border-gray-100">
                  <span className="text-[10px] font-black uppercase tracking-widest">Filter Lanjutan</span>
                  <Filter size={14} />
               </button>
            </div>
          </div>

          <div className="p-8 bg-blue-900 text-white rounded-[2.5rem] shadow-xl relative overflow-hidden group">
             <div className="relative z-10">
                <Settings2 size={32} className="text-amber-400 mb-6" />
                <h4 className="text-lg font-black mb-2">Sinkronisasi Pusat</h4>
                <p className="text-blue-100 text-[10px] font-bold uppercase leading-relaxed tracking-tight opacity-80 mb-8">
                  Data ini disinkronkan dengan Peraturan Menteri Keuangan (PMK) terbaru tentang Standar Biaya Masukan Tahun 2024.
                </p>
                <button className="w-full bg-white/10 border border-white/20 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center">
                   <TrendingUp size={14} className="mr-2" /> Analisis Kepatuhan
                </button>
             </div>
             <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          </div>
        </div>

        {/* Cost Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCosts.map((cost) => (
            <div key={cost.id} className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-2xl hover:border-blue-100 transition-all duration-500 flex flex-col">
              <div className="p-8 flex-1">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                      <MapPin size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-gray-900 leading-tight">{cost.destination}</h4>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Default Global SBM</p>
                    </div>
                  </div>
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-all">
                    <button 
                      onClick={() => handleOpenEdit(cost)}
                      className="p-2.5 text-gray-400 hover:text-blue-900 bg-gray-50 rounded-xl hover:bg-white hover:shadow-sm transition-all"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button className="p-2.5 text-gray-400 hover:text-red-600 bg-gray-50 rounded-xl hover:bg-white hover:shadow-sm transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center justify-between p-5 bg-gray-50 rounded-[1.5rem] border border-gray-100 group-hover:bg-white group-hover:border-emerald-100 transition-all">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm text-emerald-600"><DollarSign size={16} /></div>
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Uang Harian</span>
                    </div>
                    <span className="text-sm font-black text-gray-900">Rp {cost.perDiem.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex items-center justify-between p-5 bg-gray-50 rounded-[1.5rem] border border-gray-100 group-hover:bg-white group-hover:border-amber-100 transition-all">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm text-amber-600"><Building size={16} /></div>
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Penginapan Max</span>
                    </div>
                    <span className="text-sm font-black text-gray-900">Rp {cost.lodging.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex items-center justify-between p-5 bg-gray-50 rounded-[1.5rem] border border-gray-100 group-hover:bg-white group-hover:border-blue-100 transition-all">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600"><Plane size={16} /></div>
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Transport Dasar</span>
                    </div>
                    <span className="text-sm font-black text-gray-900">Rp {cost.transportBase.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>

              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                   <ShieldCheck size={14} className="text-emerald-500" />
                   <span>Verified Standards</span>
                </div>
                <button className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline flex items-center">
                   Log Update <ChevronRight size={12} className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CRUD MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-blue-900/60 backdrop-blur-md flex items-center justify-center z-[110] p-4">
          <div className="bg-white w-full max-w-3xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col">
            
            <div className="p-10 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
               <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-blue-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-blue-900/20">
                     <Settings2 size={28} />
                  </div>
                  <div>
                     <h4 className="text-2xl font-black text-gray-900 tracking-tight">
                        {selectedCost ? `Update SBM: ${selectedCost.destination}` : 'Input Standar Wilayah Baru'}
                     </h4>
                     <p className="text-sm text-gray-500 font-medium">Tentukan parameter biaya sesuai regulasi pemerintah terbaru.</p>
                  </div>
               </div>
               <button onClick={closeModal} className="p-4 bg-white border border-gray-100 hover:bg-gray-100 rounded-3xl text-gray-400 transition-all shadow-sm">
                  <X size={24} />
               </button>
            </div>

            <div className="p-10 space-y-10">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Provinsi / Nama Wilayah</label>
                  <div className="relative">
                     <MapPin size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" />
                     <input 
                      type="text" 
                      className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-black text-gray-900" 
                      placeholder="Contoh: Papua Barat Daya"
                      defaultValue={selectedCost?.destination}
                     />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center">
                        <DollarSign size={12} className="mr-1 text-emerald-600" /> Uang Harian
                     </label>
                     <input 
                        type="number" 
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold" 
                        defaultValue={selectedCost?.perDiem}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center">
                        <Building size={12} className="mr-1 text-amber-600" /> Hotel (Max)
                     </label>
                     <input 
                        type="number" 
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold" 
                        defaultValue={selectedCost?.lodging}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center">
                        <Plane size={12} className="mr-1 text-blue-600" /> Transport
                     </label>
                     <input 
                        type="number" 
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold" 
                        defaultValue={selectedCost?.transportBase}
                     />
                  </div>
               </div>

               <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100 flex items-start space-x-4">
                  <Info size={24} className="text-blue-900 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-blue-800 font-bold leading-relaxed uppercase tracking-tight">
                    Data standar ini akan otomatis digunakan oleh algoritma kalkulasi SPPD pada seluruh tenant instansi yang tidak melakukan kustomisasi lokal.
                  </p>
               </div>
            </div>

            <div className="p-10 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
               <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <AlertTriangle size={16} className="mr-2 text-amber-500" /> Audit Integrity v2.1
               </div>
               <div className="flex space-x-4">
                  <button onClick={closeModal} className="px-8 py-3.5 font-black text-[10px] uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-all">Batal</button>
                  <button className="bg-blue-900 text-white px-10 py-3.5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center">
                    <Save size={16} className="mr-2" />
                    <span>{selectedCost ? 'Simpan Perubahan' : 'Terbitkan SBM'}</span>
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalCostStandardsPage;
