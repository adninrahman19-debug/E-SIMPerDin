
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
  DollarSign
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

  const handleOpenEdit = (cost: CostStandard) => {
    setSelectedCost(cost);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCost(null);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Standar Biaya Global (SBM)</h2>
          <p className="text-gray-500 text-sm font-medium">Manajemen referensi biaya nasional untuk seluruh tenant platform.</p>
        </div>
        <button className="bg-blue-900 text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:bg-blue-800 transition-all font-bold shadow-lg shadow-blue-900/20">
          <Plus size={18} />
          <span>Tambah Wilayah</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
            <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Kebijakan Platform</h5>
            
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-900 uppercase">Override Opsi</span>
                {isOverrideAllowed ? <Unlock size={16} className="text-emerald-500" /> : <Lock size={16} className="text-red-500" />}
              </div>
              <p className="text-[10px] text-blue-800 font-bold leading-relaxed uppercase tracking-tight">
                Tentukan apakah Admin Instansi diizinkan menyesuaikan standar biaya mereka sendiri.
              </p>
              <label className="relative inline-flex items-center cursor-pointer pt-2">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={isOverrideAllowed} 
                  onChange={() => setIsOverrideAllowed(!isOverrideAllowed)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
                <span className="ml-3 text-xs font-bold text-gray-600">{isOverrideAllowed ? 'Diizinkan' : 'Dilarang'}</span>
              </label>
            </div>

            <div className="space-y-4">
               <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                 <input 
                  type="text" 
                  placeholder="Cari Provinsi..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-900/10 outline-none text-xs font-bold"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                 />
               </div>
               <button className="w-full flex items-center justify-center space-x-2 p-2.5 bg-gray-50 text-gray-500 hover:text-blue-900 rounded-xl border border-gray-100 transition-all font-bold text-xs uppercase tracking-widest">
                 <Filter size={14} />
                 <span>Filter Lanjutan</span>
               </button>
            </div>
          </div>

          <div className="p-6 bg-amber-50 rounded-[2rem] border border-amber-100 flex items-start space-x-3">
            <Info size={20} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[10px] text-amber-800 font-bold leading-relaxed uppercase">
              Perubahan pada standar biaya global akan langsung mempengaruhi perhitungan estimasi pada instansi yang tidak melakukan override.
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCosts.map((cost) => (
            <div key={cost.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl hover:border-blue-100 transition-all duration-300">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-gray-900">{cost.destination}</h4>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Wilayah SBM</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button 
                      onClick={() => handleOpenEdit(cost)}
                      className="p-2.5 text-gray-400 hover:text-blue-900 bg-gray-50 rounded-xl transition-all"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button className="p-2.5 text-gray-400 hover:text-red-600 bg-gray-50 rounded-xl transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group-hover:bg-white transition-colors">
                    <div className="flex items-center space-x-3">
                      <DollarSign size={16} className="text-emerald-600" />
                      <span className="text-xs font-bold text-gray-500 uppercase">Uang Harian</span>
                    </div>
                    <span className="text-sm font-black text-gray-900">Rp {cost.perDiem.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group-hover:bg-white transition-colors">
                    <div className="flex items-center space-x-3">
                      <Building size={16} className="text-amber-600" />
                      <span className="text-xs font-bold text-gray-500 uppercase">Penginapan (Max)</span>
                    </div>
                    <span className="text-sm font-black text-gray-900">Rp {cost.lodging.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group-hover:bg-white transition-colors">
                    <div className="flex items-center space-x-3">
                      <Plane size={16} className="text-blue-600" />
                      <span className="text-xs font-bold text-gray-500 uppercase">Transport Dasar</span>
                    </div>
                    <span className="text-sm font-black text-gray-900">Rp {cost.transportBase.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>

              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Update Terakhir: 12/05/2024</span>
                <button className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline">Lihat Detail</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && selectedCost && (
        <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="text-2xl font-black text-gray-900">Edit Standar Wilayah</h4>
                <p className="text-sm text-gray-500 font-medium">{selectedCost.destination}</p>
              </div>
              <button onClick={closeModal} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-gray-400 transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nama Wilayah / Provinsi</label>
                  <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-medium" defaultValue={selectedCost.destination} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Uang Harian (IDR)</label>
                  <input type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold" defaultValue={selectedCost.perDiem} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Penginapan Maksimum (IDR)</label>
                  <input type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold" defaultValue={selectedCost.lodging} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Transportasi Dasar (IDR)</label>
                  <input type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold" defaultValue={selectedCost.transportBase} />
                </div>
              </div>

              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start space-x-3">
                 <Globe size={20} className="text-blue-900 shrink-0 mt-0.5" />
                 <p className="text-[11px] text-blue-900 leading-relaxed font-bold uppercase tracking-tight">
                    Standard ini akan otomatis diterapkan pada modul SPPD seluruh instansi yang menggunakan referensi Global.
                 </p>
              </div>
            </div>

            <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-end space-x-3">
              <button onClick={closeModal} className="px-6 py-2.5 font-bold text-gray-500 hover:text-gray-700">Batal</button>
              <button className="bg-blue-900 text-white px-8 py-2.5 rounded-xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center space-x-2">
                <Save size={18} />
                <span>Update SBM</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalCostStandardsPage;
