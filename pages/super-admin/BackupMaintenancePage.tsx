
import React, { useState } from 'react';
import { MOCK_BACKUPS } from '../../constants';
import { Database, RefreshCw, Download, RotateCcw, MonitorOff, Save, Play, Clock, History, AlertTriangle } from 'lucide-react';

const BackupMaintenancePage: React.FC = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">System Continuity</h2>
          <p className="text-gray-500 text-sm font-medium">Snapshot database harian dan pengaturan pemeliharaan platform.</p>
        </div>
        <button className="bg-blue-900 text-white px-6 py-3 rounded-xl flex items-center space-x-2 font-bold shadow-lg">
          <Play size={18} />
          <span>Mulai Backup Manual</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
               <h4 className="font-black text-gray-900 flex items-center"><History className="mr-2" size={18} /> Snapshot Terbaru</h4>
               <span className="text-[10px] font-black text-gray-400 uppercase">Retention: 30 Days</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] text-gray-400 uppercase font-black tracking-widest border-b border-gray-50">
                    <th className="px-8 py-5">Tanggal & File</th>
                    <th className="px-6 py-5">Ukuran</th>
                    <th className="px-8 py-5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {MOCK_BACKUPS.map((bak) => (
                    <tr key={bak.id} className="hover:bg-blue-50/20 transition-all">
                      <td className="px-8 py-6">
                        <p className="text-xs font-black text-gray-900">{new Date(bak.timestamp).toLocaleDateString('id-ID')}</p>
                        <p className="text-[9px] text-gray-400 font-mono mt-1 uppercase">{bak.fileName}</p>
                      </td>
                      <td className="px-6 py-6 font-bold text-xs">{(bak.sizeMb / 1024).toFixed(2)} GB</td>
                      <td className="px-8 py-6 text-right">
                         <div className="flex justify-end space-x-2">
                           <button className="p-2 text-gray-400 hover:text-blue-900"><Download size={18} /></button>
                           <button className="p-2 text-gray-400 hover:text-red-600"><RotateCcw size={18} /></button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
             <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-2xl ${maintenanceMode ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}><MonitorOff size={24} /></div>
                  <h5 className="font-black text-sm uppercase">Maintenance Mode</h5>
                </div>
                <button onClick={() => setMaintenanceMode(!maintenanceMode)} className={`w-12 h-6 rounded-full transition-all relative ${maintenanceMode ? 'bg-red-600' : 'bg-gray-200'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${maintenanceMode ? 'right-1' : 'left-1'}`}></div>
                </button>
             </div>
             <p className="text-[10px] font-bold text-gray-400 uppercase">Saat aktif, seluruh tenant kecuali Super Admin tidak akan dapat mengakses aplikasi.</p>
             <textarea className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-xs outline-none focus:ring-2 focus:ring-blue-900/10" rows={3} placeholder="Pesan untuk pengguna..." />
             <button className="w-full py-4 bg-blue-900 text-white rounded-2xl font-black text-[10px] uppercase shadow-xl">Simpan Status</button>
          </div>
          <div className="p-6 bg-amber-50 rounded-[2rem] border border-amber-100 flex items-start space-x-3">
             <AlertTriangle className="text-amber-600 shrink-0" size={20} />
             <p className="text-[9px] text-amber-800 font-bold uppercase">Proses restore data akan menghapus seluruh data transaksi hari ini. Lakukan dengan hati-hati.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackupMaintenancePage;
