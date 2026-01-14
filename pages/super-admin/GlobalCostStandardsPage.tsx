
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

  const filteredCosts = costs.filter(c => 
    c.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Standar Biaya Nasional (SBM)</h2>
          <p className="text-gray-500 text-sm font-medium">Referensi biaya perjalanan dinas global untuk seluruh tenant.</p>
        </div>
        <button className="bg-blue-900 text-white px-6 py-3 rounded-xl flex items-center space-x-2 font-bold shadow-lg">
          <Plus size={18} />
          <span>Tambah Master Wilayah</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
            <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Platform Policy</h5>
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-900 uppercase">Izin Custom SBM</span>
                {isOverrideAllowed ? <Unlock size={16} className="text-emerald-500" /> : <Lock size={16} className="text-red-500" />}
              </div>
              <p className="text-[9px] text-blue-800 font-bold uppercase leading-relaxed">
                Izinkan Admin Instansi menentukan standar biaya lokal mereka sendiri.
              </p>
              <button 
                onClick={() => setIsOverrideAllowed(!isOverrideAllowed)}
                className={`w-full py-2 rounded-lg text-[10px] font-black uppercase transition-all ${isOverrideAllowed ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-500'}`}
              >
                {isOverrideAllowed ? 'Akses Terbuka' : 'Terkunci (Hard-Limit)'}
              </button>
            </div>
            <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
               <input 
                type="text" 
                placeholder="Cari Wilayah..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none text-xs font-bold"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCosts.map((cost) => (
            <div key={cost.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center"><MapPin size={24} /></div>
                    <h4 className="text-lg font-black text-gray-900">{cost.destination}</h4>
                  </div>
                  <div className="flex space-x-1">
                    <button className="p-2 text-gray-400 hover:text-blue-900"><Edit3 size={18} /></button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-[10px] font-black text-gray-400 uppercase">Harian</span>
                    <span className="text-xs font-black">Rp {cost.perDiem.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-[10px] font-black text-gray-400 uppercase">Hotel</span>
                    <span className="text-xs font-black">Rp {cost.lodging.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalCostStandardsPage;
