
import React, { useState } from 'react';
import { 
  Plus, MapPin, Info, DollarSign, Plane, Hotel, Edit3, Trash2, RefreshCcw, Settings2, ShieldCheck, AlertTriangle, ToggleRight, ToggleLeft, Save, Search, History
} from 'lucide-react';

const CostStandardsPage: React.FC = () => {
  const [allowOverride, setAllowOverride] = useState(false);
  const [useGlobalSbm, setUseGlobalSbm] = useState(true);
  const [standards, setStandards] = useState([
    { id: '1', destination: 'Dalam Provinsi', perDiem: 370000, lodging: 500000, transport: 150000 },
    { id: '2', destination: 'Luar Provinsi (Jawa)', perDiem: 530000, lodging: 1200000, transport: 500000 },
    { id: '3', destination: 'Luar Provinsi (Luar Jawa)', perDiem: 650000, lodging: 1500000, transport: 1200000 },
    { id: '4', destination: 'Ibukota Negara (Jakarta)', perDiem: 750000, lodging: 2200000, transport: 800000 },
  ]);

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Manajemen SBM Unit</h2>
          <p className="text-gray-500 text-sm font-medium">Pengaturan plafon biaya operasional institusi lokal.</p>
        </div>
        <button className="bg-blue-900 text-white px-5 py-2.5 rounded-xl flex items-center space-x-2 hover:bg-blue-800 transition-all font-bold shadow-lg">
          <Plus size={18} />
          <span>Tambah Wilayah</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {standards.map((item) => (
              <div key={item.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center shadow-inner"><MapPin /></div>
                    <h4 className="text-lg font-black text-gray-900 leading-tight">{item.destination}</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Harian</span>
                      <span className="text-sm font-black text-gray-900">Rp {item.perDiem.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Hotel</span>
                      <span className="text-sm font-black text-gray-900">Rp {item.lodging.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>
                <button className="w-full py-4 bg-gray-50 border-t border-gray-100 text-[10px] font-black text-blue-900 uppercase hover:bg-blue-900 hover:text-white transition-all">Atur Detail</button>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
            <h4 className="text-xl font-black text-gray-900 flex items-center"><Settings2 className="mr-2" /> Kebijakan Lokal</h4>
            <div className="flex items-start justify-between">
              <span className="text-sm font-black text-gray-800">Gunakan SBM Global</span>
              <button onClick={() => setUseGlobalSbm(!useGlobalSbm)} className={useGlobalSbm ? 'text-blue-900' : 'text-gray-300'}>
                {useGlobalSbm ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
              </button>
            </div>
            <button className="w-full py-4 bg-blue-900 text-white rounded-2xl font-black text-xs uppercase shadow-xl hover:bg-blue-800 transition-all flex items-center justify-center space-x-2">
              <Save size={16} /> <span>Simpan Policy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostStandardsPage;
