
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
  RefreshCcw, 
  Settings2, 
  ShieldCheck, 
  AlertTriangle,
  ToggleRight,
  ToggleLeft,
  Save,
  Search,
  ChevronRight,
  History
} from 'lucide-react';

const CostStandardsPage: React.FC = () => {
  // Policy States
  const [allowOverride, setAllowOverride] = useState(false);
  const [useGlobalSbm, setUseGlobalSbm] = useState(true);

  // Mock Data Standards
  const [standards, setStandards] = useState([
    { id: '1', destination: 'Dalam Provinsi', perDiem: 370000, lodging: 500000, transport: 150000 },
    { id: '2', destination: 'Luar Provinsi (Jawa)', perDiem: 530000, lodging: 1200000, transport: 500000 },
    { id: '3', destination: 'Luar Provinsi (Luar Jawa)', perDiem: 650000, lodging: 1500000, transport: 1200000 },
    { id: '4', destination: 'Ibukota Negara (Jakarta)', perDiem: 750000, lodging: 2200000, transport: 800000 },
  ]);

  const handleToggleOverride = () => {
    setAllowOverride(!allowOverride);
    const msg = !allowOverride 
      ? "Peringatan: User kini diizinkan merubah estimasi biaya secara manual. Pastikan pengawasan anggaran tetap ketat."
      : "Kebijakan Diperbarui: User wajib mengikuti angka standar sistem.";
    alert(msg);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Manajemen Standar Biaya</h2>
          <p className="text-gray-500 text-sm font-medium">Atur plafon biaya harian, penginapan, dan transportasi sesuai regulasi instansi.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all font-bold text-sm flex items-center space-x-2 shadow-sm">
            <History size={18} />
            <span>Riwayat Perubahan</span>
          </button>
          <button className="bg-blue-900 text-white px-5 py-2.5 rounded-xl flex items-center space-x-2 hover:bg-blue-800 transition-all font-bold shadow-lg shadow-blue-900/20">
            <Plus size={18} />
            <span>Tambah Wilayah</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Cost Grid */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Cari wilayah..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl outline-none text-xs font-bold" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Urutkan:</span>
              <select className="bg-transparent text-xs font-bold text-gray-700 outline-none">
                <option>Nama Wilayah</option>
                <option>Biaya Tertinggi</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {standards.map((item) => (
              <div key={item.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl hover:border-blue-100 transition-all duration-300">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center shadow-inner">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-gray-900 leading-tight">{item.destination}</h4>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Status: Aktif</p>
                      </div>
                    </div>
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2 text-gray-400 hover:text-blue-900 bg-gray-50 rounded-xl transition-all"><Edit3 size={16} /></button>
                      <button className="p-2 text-gray-400 hover:text-red-600 bg-gray-50 rounded-xl transition-all"><Trash2 size={16} /></button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group-hover:bg-white transition-colors">
                      <div className="flex items-center space-x-3">
                        <DollarSign size={16} className="text-emerald-600" />
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Uang Harian</span>
                      </div>
                      <span className="text-sm font-black text-gray-900">Rp {item.perDiem.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group-hover:bg-white transition-colors">
                      <div className="flex items-center space-x-3">
                        <Hotel size={16} className="text-amber-600" />
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Penginapan (Max)</span>
                      </div>
                      <span className="text-sm font-black text-gray-900">Rp {item.lodging.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group-hover:bg-white transition-colors">
                      <div className="flex items-center space-x-3">
                        <Plane size={16} className="text-blue-600" />
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Transport Dasar</span>
                      </div>
                      <span className="text-sm font-black text-gray-900">Rp {item.transport.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>
                <button className="w-full py-4 bg-gray-50 border-t border-gray-100 text-[10px] font-black text-blue-900 uppercase tracking-widest hover:bg-blue-900 hover:text-white transition-all">
                  Sesuaikan Detail Biaya
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Policies & Settings */}
        <div className="space-y-8">
          {/* Policy Panel */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
            <div className="flex items-center space-x-3">
              <Settings2 size={24} className="text-blue-900" />
              <h4 className="text-xl font-black text-gray-900">Kebijakan Instansi</h4>
            </div>

            <div className="space-y-6">
              <div className="flex items-start justify-between group">
                <div className="flex-1 pr-4">
                  <h5 className="text-sm font-black text-gray-800 uppercase tracking-tight">Izin Override Biaya</h5>
                  <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase mt-1">
                    Izinkan Operator/Pegawai merubah jumlah estimasi biaya sistem per dokumen SPPD.
                  </p>
                </div>
                <button 
                  onClick={handleToggleOverride}
                  className={`shrink-0 transition-all ${allowOverride ? 'text-emerald-500' : 'text-gray-300'}`}
                >
                  {allowOverride ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
                </button>
              </div>

              <div className="flex items-start justify-between group">
                <div className="flex-1 pr-4">
                  <h5 className="text-sm font-black text-gray-800 uppercase tracking-tight">Gunakan SBM Global</h5>
                  <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase mt-1">
                    Selalu sinkronkan data biaya dengan Standar Biaya Masukan (SBM) Nasional terbaru.
                  </p>
                </div>
                <button 
                  onClick={() => setUseGlobalSbm(!useGlobalSbm)}
                  className={`shrink-0 transition-all ${useGlobalSbm ? 'text-blue-900' : 'text-gray-300'}`}
                >
                  {useGlobalSbm ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
                </button>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border transition-all ${allowOverride ? 'bg-amber-50 border-amber-100' : 'bg-emerald-50 border-emerald-100'}`}>
               <div className="flex items-start space-x-3">
                 {allowOverride ? <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" /> : <ShieldCheck size={18} className="text-emerald-600 shrink-0 mt-0.5" />}
                 <p className={`text-[10px] font-bold leading-relaxed uppercase tracking-tight ${allowOverride ? 'text-amber-800' : 'text-emerald-800'}`}>
                   {allowOverride 
                    ? 'Mode Fleksibel: Perubahan biaya manual akan dicatat dalam audit log untuk setiap SPPD.' 
                    : 'Mode Aman: Biaya terkunci sesuai standar. Mencegah penyimpangan input anggaran.'}
                 </p>
               </div>
            </div>

            <button className="w-full py-4 bg-blue-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center space-x-2">
              <Save size={16} />
              <span>Simpan Pengaturan</span>
            </button>
          </div>

          {/* Sync SBM Section */}
          <div className="bg-blue-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <RefreshCcw size={32} className="text-amber-400 mb-6 group-hover:rotate-180 transition-transform duration-700" />
              <h4 className="text-lg font-black mb-2 leading-tight">Sinkronisasi SBM Nasional</h4>
              <p className="text-blue-100 text-[10px] font-bold uppercase leading-relaxed tracking-tight opacity-80 mb-6">
                Ambil data standar biaya terbaru dari Pusat (Super Admin) untuk tahun anggaran 2024.
              </p>
              <button className="w-full bg-white text-blue-900 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all">
                Update Sekarang
              </button>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          </div>

          <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 flex items-start space-x-3">
            <Info size={20} className="text-gray-400 shrink-0 mt-0.5" />
            <p className="text-[9px] text-gray-500 font-bold leading-relaxed uppercase">
              Perubahan standar biaya tidak akan mempengaruhi SPPD yang sudah disetujui atau sudah selesai (arsip) untuk menjaga validitas laporan keuangan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostStandardsPage;
