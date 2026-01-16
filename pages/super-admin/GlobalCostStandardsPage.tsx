
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
  ChevronRight,
  Target,
  FileCheck
} from 'lucide-react';
import { CostStandard } from '../../types';

const GlobalCostStandardsPage: React.FC = () => {
  const [costs, setCosts] = useState<CostStandard[]>(MOCK_GLOBAL_COSTS);
  const [isOverrideAllowed, setIsOverrideAllowed] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCost, setSelectedCost] = useState<CostStandard | null>(null);
  const [modalMode, setModalMode] = useState<'ADD' | 'EDIT'>('ADD');

  const filteredCosts = costs.filter(c => 
    c.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenEdit = (cost: CostStandard) => {
    setSelectedCost(cost);
    setModalMode('EDIT');
    setIsModalOpen(true);
  };

  const handleOpenAdd = () => {
    setSelectedCost(null);
    setModalMode('ADD');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCost(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const destination = formData.get('destination') as string;
    const perDiem = parseInt(formData.get('perDiem') as string);
    const lodging = parseInt(formData.get('lodging') as string);
    const transportBase = parseInt(formData.get('transportBase') as string);

    if (modalMode === 'ADD') {
      const newCost: CostStandard = {
        id: `c-${Date.now()}`,
        destination,
        perDiem,
        lodging,
        transportBase
      };
      setCosts([...costs, newCost]);
      alert("Parameter wilayah nasional baru berhasil diterbitkan.");
    } else if (selectedCost) {
      setCosts(costs.map(c => c.id === selectedCost.id ? { ...c, destination, perDiem, lodging, transportBase } : c));
      alert(`Standar biaya untuk ${destination} telah diperbarui secara global.`);
    }
    closeModal();
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Yakin ingin menghapus standar biaya wilayah '${name}'? Seluruh tenant yang menggunakan referensi global untuk wilayah ini akan kehilangan data kalkulasi otomatis.`)) {
      setCosts(costs.filter(c => c.id !== id));
      alert("Data wilayah berhasil dihapus.");
    }
  };

  const handleToggleOverride = () => {
    const status = !isOverrideAllowed ? 'DIIZINKAN' : 'DILARANG';
    if(confirm(`Apakah Anda yakin ingin mengubah kebijakan platform? Jika ${status}, maka seluruh instansi akan ${!isOverrideAllowed ? 'bebas mengatur SBM lokal' : 'terkunci pada standar pusat (Strict Compliance)'}.`)) {
      setIsOverrideAllowed(!isOverrideAllowed);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">National Cost Standards (SBM)</h2>
          <p className="text-gray-500 text-sm font-medium mt-1">Konfigurasi pusat plafon biaya perjalanan dinas global versi TA 2024.</p>
        </div>
        <div className="flex space-x-3">
          <button onClick={() => alert("Sinkronisasi kurs valuta asing & PMK terbaru selesai.")} className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-2xl hover:bg-gray-50 transition-all font-black text-[10px] uppercase tracking-widest shadow-sm flex items-center space-x-2">
            <RefreshCw size={18} />
            <span>Sync PMK terbaru</span>
          </button>
          <button 
            onClick={handleOpenAdd}
            className="bg-blue-900 text-white px-8 py-3 rounded-2xl flex items-center space-x-3 hover:bg-blue-800 transition-all font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-900/30"
          >
            <Plus size={20} />
            <span>Tambah Master Wilayah</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-10 animate-in slide-in-from-left-4">
            <div>
               <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8">Platform Governance</h5>
               
               <div className={`p-8 rounded-[2.5rem] border-2 transition-all duration-500 ${isOverrideAllowed ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isOverrideAllowed ? 'text-emerald-700' : 'text-red-700'}`}>
                      {isOverrideAllowed ? 'Policy: Flexible' : 'Policy: Rigid'}
                    </span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isOverrideAllowed ? 'bg-white text-emerald-500' : 'bg-white text-red-500'} shadow-sm`}>
                       {isOverrideAllowed ? <Unlock size={20} /> : <Lock size={20} />}
                    </div>
                  </div>
                  <p className={`text-[11px] font-bold leading-relaxed uppercase tracking-tight mb-8 ${isOverrideAllowed ? 'text-emerald-800' : 'text-red-800'}`}>
                    {isOverrideAllowed 
                      ? 'Instansi diizinkan menentukan standar biaya lokal sendiri (Custom Override).' 
                      : 'Tenant dipaksa menggunakan standar pusat. Tidak ada kustomisasi biaya lokal.'}
                  </p>
                  <button 
                    onClick={handleToggleOverride}
                    className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl ${isOverrideAllowed ? 'bg-white text-emerald-700 hover:bg-emerald-100' : 'bg-red-600 text-white shadow-red-600/30 hover:bg-red-700'}`}
                  >
                    {isOverrideAllowed ? 'Lock Platform' : 'Open Flexibility'}
                  </button>
               </div>
            </div>

            <div className="space-y-5">
               <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                 <input 
                  type="text" 
                  placeholder="Cari Provinsi / Area..."
                  className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-900/5 transition-all font-bold text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                 />
               </div>
               <button className="w-full flex items-center justify-between p-5 bg-gray-50 text-gray-600 hover:text-blue-900 rounded-[1.5rem] transition-all border border-transparent hover:border-blue-900/20">
                  <span className="text-[10px] font-black uppercase tracking-widest">Filter Lanjutan</span>
                  <Filter size={18} />
               </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-blue-950 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
             <div className="relative z-10">
                <Settings2 size={40} className="text-amber-400 mb-8 group-hover:rotate-12 transition-transform duration-700" />
                <h4 className="text-2xl font-black mb-4 tracking-tight leading-tight">Master Sync Engine</h4>
                <p className="text-blue-100 text-[11px] font-bold uppercase leading-relaxed tracking-tight opacity-90 mb-10 italic">
                  "Seluruh perubahan standar biaya akan segera direplikasi ke 156 instansi aktif guna menjamin akurasi perhitungan SPPD."
                </p>
                <div className="flex items-center text-[10px] font-black uppercase text-emerald-400 bg-emerald-400/10 w-fit px-5 py-2.5 rounded-xl border border-emerald-400/20">
                   <TrendingUp size={16} className="mr-2" /> Global Compliance: 100%
                </div>
             </div>
             <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-right-4">
          {filteredCosts.length > 0 ? filteredCosts.map((cost) => (
            <div key={cost.id} className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-2xl hover:border-blue-900/20 transition-all duration-500 flex flex-col">
              <div className="p-10 flex-1">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center space-x-5">
                    <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-[1.5rem] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                      <MapPin size={32} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-gray-900 tracking-tight leading-none">{cost.destination}</h4>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Wilayah SBM Global</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button 
                      onClick={() => handleOpenEdit(cost)}
                      className="p-3 text-gray-400 hover:text-blue-900 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all"
                    >
                      <Edit3 size={20} />
                    </button>
                    <button 
                      onClick={() => handleDelete(cost.id, cost.destination)}
                      className="p-3 text-gray-400 hover:text-red-600 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  <div className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem] border border-gray-100 group-hover:bg-white group-hover:border-emerald-100 transition-all">
                    <div className="flex items-center space-x-4">
                      <div className="p-2.5 bg-white rounded-xl shadow-sm text-emerald-600"><DollarSign size={20} /></div>
                      <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Uang Harian</span>
                    </div>
                    <span className="text-lg font-black text-gray-900">Rp {cost.perDiem.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem] border border-gray-100 group-hover:bg-white group-hover:border-amber-100 transition-all">
                    <div className="flex items-center space-x-4">
                      <div className="p-2.5 bg-white rounded-xl shadow-sm text-amber-600"><Building size={20} /></div>
                      <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Hotel (Max)</span>
                    </div>
                    <span className="text-lg font-black text-gray-900">Rp {cost.lodging.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem] border border-gray-100 group-hover:bg-white group-hover:border-blue-100 transition-all">
                    <div className="flex items-center space-x-4">
                      <div className="p-2.5 bg-white rounded-xl shadow-sm text-blue-600"><Plane size={20} /></div>
                      <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Transport Dasar</span>
                    </div>
                    <span className="text-lg font-black text-gray-900">Rp {cost.transportBase.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>

              <div className="px-10 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                   <ShieldCheck size={18} className="text-emerald-500" />
                   <span>Authorized Standard</span>
                </div>
                <button className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline flex items-center group">
                   Analitik Wilayah <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )) : (
            <div className="col-span-2 py-40 text-center flex flex-col items-center">
               <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8">
                  <Search size={48} className="text-gray-200" />
               </div>
               <h4 className="text-2xl font-black text-gray-900 uppercase">Wilayah Tidak Terdaftar</h4>
               <p className="text-gray-400 text-sm mt-2 max-w-sm mx-auto">Silakan tambahkan wilayah baru atau periksa filter pencarian Anda.</p>
            </div>
          )}
        </div>
      </div>

      {/* CRUD MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-blue-900/60 backdrop-blur-md flex items-center justify-center z-[110] p-4">
          <div className="bg-white w-full max-w-3xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[95vh]">
            <form onSubmit={handleSave} className="flex flex-col h-full">
               <div className="p-10 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                  <div className="flex items-center space-x-5">
                     <div className="w-16 h-16 bg-blue-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-blue-900/20">
                        <Target size={32} />
                     </div>
                     <div>
                        <h4 className="text-2xl font-black text-gray-900 tracking-tight">
                           {modalMode === 'EDIT' ? `Update SBM: ${selectedCost?.destination}` : 'Daftarkan Master Wilayah'}
                        </h4>
                        <p className="text-sm text-gray-500 font-medium uppercase tracking-widest leading-none mt-1">Platform Global Reference</p>
                     </div>
                  </div>
                  <button type="button" onClick={closeModal} className="p-4 bg-gray-100 hover:bg-red-50 hover:text-red-600 rounded-3xl text-gray-400 transition-all">
                     <X size={24} />
                  </button>
               </div>

               <div className="p-10 space-y-10 overflow-y-auto custom-scrollbar">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Nama Provinsi / Area Nasional</label>
                     <div className="relative">
                        <MapPin size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                        <input 
                         required
                         name="destination"
                         type="text" 
                         className="w-full pl-16 pr-8 py-5 bg-gray-50 border border-gray-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-blue-900/5 font-black text-gray-900 text-xl" 
                         placeholder="Contoh: Kepulauan Riau"
                         defaultValue={selectedCost?.destination}
                        />
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 flex items-center">
                           <DollarSign size={14} className="mr-1 text-emerald-600" /> Uang Harian
                        </label>
                        <input name="perDiem" required type="number" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-900/5 font-black text-emerald-600 text-lg" defaultValue={selectedCost?.perDiem} />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 flex items-center">
                           <Building size={14} className="mr-1 text-amber-600" /> Hotel (Max)
                        </label>
                        <input name="lodging" required type="number" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-900/5 font-black text-amber-600 text-lg" defaultValue={selectedCost?.lodging} />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 flex items-center">
                           <Plane size={14} className="mr-1 text-blue-600" /> Transport
                        </label>
                        <input name="transportBase" required type="number" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-900/5 font-black text-blue-600 text-lg" defaultValue={selectedCost?.transportBase} />
                     </div>
                  </div>

                  <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 flex items-start space-x-6">
                     <Info size={32} className="text-blue-900 shrink-0 mt-1" />
                     <p className="text-xs text-blue-900 font-bold leading-relaxed uppercase tracking-tight">
                       Peringatan: Setiap perubahan akan langsung merubah kalkulasi estimasi anggaran pada seluruh instansi yang menggunakan standar global. Pastikan angka sesuai dengan PMK Tahun Anggaran berjalan.
                     </p>
                  </div>
               </div>

               <div className="p-10 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                     <ShieldCheck size={20} className="mr-3 text-blue-900" /> Data integrity v2.4 verified
                  </div>
                  <div className="flex space-x-4">
                     <button type="button" onClick={closeModal} className="px-10 py-4 font-black text-[10px] uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all">Batalkan</button>
                     <button type="submit" className="bg-blue-900 text-white px-12 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center space-x-3">
                        <Save size={18} />
                        <span>{selectedCost ? 'Commit Global Update' : 'Publish Master SBM'}</span>
                     </button>
                  </div>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalCostStandardsPage;
