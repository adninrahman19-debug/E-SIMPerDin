
import React from 'react';
import { Wallet, Plus, Search, MapPin, Calculator, Info } from 'lucide-react';

const CostStandards: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Standar Biaya Masukan (SBM)</h2>
          <p className="text-gray-500 text-sm">Atur besaran biaya perjalanan dinas sesuai regulasi yang berlaku.</p>
        </div>
        <button className="bg-blue-900 text-white px-5 py-2.5 rounded-lg flex items-center space-x-2 hover:bg-blue-800 transition-all font-bold shadow-md">
          <Plus size={18} />
          <span>Tambah Standar</span>
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-8 flex items-start space-x-4">
        <div className="bg-blue-200 p-2 rounded-lg text-blue-900"><Info size={20} /></div>
        <div>
          <p className="font-bold text-blue-900 text-sm">Informasi Regulasi</p>
          <p className="text-blue-800 text-sm">Data ini akan digunakan oleh sistem untuk menghitung estimasi biaya secara otomatis saat pegawai membuat pengajuan SPPD.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { destination: 'Dalam Provinsi', perDiem: 370000, lodging: 500000 },
          { destination: 'Luar Provinsi (Jawa)', perDiem: 530000, lodging: 1200000 },
          { destination: 'Luar Provinsi (Luar Jawa)', perDiem: 650000, lodging: 1500000 },
          { destination: 'Ibukota Negara (Jakarta)', perDiem: 750000, lodging: 2000000 },
        ].map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <h4 className="font-bold text-gray-900">{item.destination}</h4>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Uang Harian</span>
                <span className="text-sm font-bold text-blue-900">Rp {item.perDiem.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Biaya Penginapan (Max)</span>
                <span className="text-sm font-bold text-blue-900">Rp {item.lodging.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Uang Representasi</span>
                <span className="text-sm font-bold text-gray-400">N/A</span>
              </div>
            </div>

            <button className="w-full mt-6 py-2 border border-blue-900 text-blue-900 rounded-lg text-xs font-bold hover:bg-blue-900 hover:text-white transition-all uppercase tracking-wider">
              Ubah Parameter
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CostStandards;
