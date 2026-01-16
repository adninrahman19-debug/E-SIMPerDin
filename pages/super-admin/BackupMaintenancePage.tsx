
import React, { useState } from 'react';
import { 
  MOCK_BACKUPS 
} from '../../constants';
import { 
  Database, 
  RefreshCw, 
  Download, 
  RotateCcw, 
  MonitorOff, 
  Save, 
  Play, 
  Clock, 
  History, 
  AlertTriangle,
  ShieldCheck,
  Zap,
  ChevronRight,
  Bell,
  CheckCircle2,
  X,
  FileCode,
  Calendar,
  CloudLightning,
  Settings2
} from 'lucide-react';
import { BackupEntry } from '../../types';

const BackupMaintenancePage: React.FC = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [backups, setBackups] = useState<BackupEntry[]>(MOCK_BACKUPS);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [activeSchedule, setActiveSchedule] = useState('DAILY');
  const [downtimeMsg, setDowntimeMsg] = useState('Sistem E-SIMPerDin sedang dalam pemeliharaan rutin untuk peningkatan performa. Harap kembali dalam 30 menit.');
  const [showRestoreModal, setShowRestoreModal] = useState<BackupEntry | null>(null);

  const handleManualBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      const newBackup: BackupEntry = {
        id: `bak-${Date.now()}`,
        timestamp: new Date().toISOString(),
        sizeMb: 1256.4,
        type: 'MANUAL',
        status: 'COMPLETED',
        createdBy: 'Super Admin',
        fileName: `manual_snapshot_${new Date().toISOString().split('T')[0]}.sql.gz`
      };
      setBackups([newBackup, ...backups]);
      setIsBackingUp(false);
      alert("Backup manual berhasil diselesaikan dan disimpan di Cloud Vault.");
    }, 2500);
  };

  const confirmRestore = () => {
    alert(`PROSES RESTORE DIMULAI: Mengembalikan sistem ke kondisi ${new Date(showRestoreModal!.timestamp).toLocaleString()}. Sesi pengguna akan direset.`);
    setShowRestoreModal(null);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">System Continuity & Backup</h2>
          <p className="text-gray-500 text-sm font-medium mt-1">Kelola integritas data jangka panjang dan ketersediaan infrastruktur platform.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleManualBackup}
            disabled={isBackingUp}
            className="bg-blue-900 text-white px-8 py-3 rounded-2xl flex items-center space-x-3 hover:bg-blue-800 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/30 disabled:opacity-50"
          >
            {isBackingUp ? <RefreshCw size={18} className="animate-spin" /> : <Play size={18} />}
            <span>{isBackingUp ? 'Processing...' : 'Execute Manual Backup'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Backup & Snapshot History */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
               <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center">
                    <History size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-gray-900">Cloud Snapshot Vault</h4>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Total Snapshot: {backups.length} | Retention: 30 Days</p>
                  </div>
               </div>
               <button className="p-3 bg-white border border-gray-100 text-gray-400 hover:text-blue-900 rounded-xl transition-all shadow-sm">
                  <RefreshCw size={18} />
               </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] border-b border-gray-50 bg-gray-50/10">
                    <th className="px-10 py-6">Timestamp & Filename</th>
                    <th className="px-6 py-6">Tipe</th>
                    <th className="px-6 py-6">Kapasitas</th>
                    <th className="px-6 py-6 text-center">Status</th>
                    <th className="px-10 py-6 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {backups.map((bak) => (
                    <tr key={bak.id} className="group hover:bg-blue-50/20 transition-all duration-300">
                      <td className="px-10 py-7">
                        <p className="text-xs font-black text-gray-900 leading-none">
                          {new Date(bak.timestamp).toLocaleDateString('id-ID')} - {new Date(bak.timestamp).toLocaleTimeString('id-ID')}
                        </p>
                        <p className="text-[10px] font-mono font-bold text-gray-400 mt-1 uppercase tracking-tighter truncate max-w-[220px]">
                          {bak.fileName}
                        </p>
                      </td>
                      <td className="px-6 py-7">
                        <span className={`text-[9px] font-black uppercase tracking-widest ${bak.type === 'AUTOMATIC' ? 'text-indigo-600' : 'text-amber-600'}`}>
                          {bak.type}
                        </span>
                      </td>
                      <td className="px-6 py-7">
                        <span className="text-xs font-bold text-gray-700">{(bak.sizeMb / 1024).toFixed(2)} GB</span>
                      </td>
                      <td className="px-6 py-7 text-center">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                           <CheckCircle2 size={10} className="mr-1" /> Completed
                        </div>
                      </td>
                      <td className="px-10 py-7 text-right">
                        <div className="flex items-center justify-end space-x-2">
                           <button className="p-2.5 text-gray-400 hover:text-blue-900 bg-white border border-gray-100 rounded-xl hover:shadow-sm transition-all" title="Download Snapshot">
                             <Download size={18} />
                           </button>
                           <button 
                             onClick={() => setShowRestoreModal(bak)}
                             className="p-2.5 text-gray-400 hover:text-red-600 bg-white border border-gray-100 rounded-xl hover:shadow-sm transition-all" 
                             title="Restore to this Point"
                            >
                             <RotateCcw size={18} />
                           </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
               <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <Database size={16} className="mr-2 text-blue-900" /> Storage Cloud: 4.8 TB / 10 TB
               </div>
               <button className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline">Kelola Kebijakan Retensi</button>
            </div>
          </div>

          <div className="p-10 bg-indigo-900 text-white rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
               <div className="max-w-xl">
                  <div className="flex items-center space-x-4 mb-4">
                     <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                        <Zap size={28} className="text-amber-400" />
                     </div>
                     <h4 className="text-2xl font-black tracking-tight">Global Patch Management</h4>
                  </div>
                  <p className="text-indigo-100 text-sm leading-relaxed opacity-90 font-medium">
                    Sistem mendeteksi adanya update baru <span className="text-amber-400 font-black">v2.6.0-stable</span>. Pembaruan mencakup integrasi modul Tanda Tangan Elektronik (TTE) BSRE dan perbaikan celah keamanan XSS.
                  </p>
                  <div className="mt-6 flex items-center space-x-4">
                     <span className="text-[10px] font-black bg-white/10 px-3 py-1 rounded-full uppercase tracking-widest">Status: Ready to Deploy</span>
                  </div>
               </div>
               <button className="bg-white text-indigo-900 px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-xl whitespace-nowrap">
                  Apply Update Global
               </button>
            </div>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
          </div>
        </div>

        {/* Maintenance & Config Sidebar */}
        <div className="space-y-8">
          {/* Maintenance Mode Control */}
          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
               <div className="flex items-center space-x-4">
                  <div className={`w-14 h-14 rounded-[1.5rem] flex items-center justify-center transition-all ${maintenanceMode ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-emerald-100 text-emerald-600'}`}>
                    <MonitorOff size={28} />
                  </div>
                  <div>
                    <h5 className="text-lg font-black text-gray-900">Maintenance</h5>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{maintenanceMode ? 'Platform Locked' : 'Platform Online'}</p>
                  </div>
               </div>
               <button 
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`w-16 h-8 rounded-full transition-all relative ${maintenanceMode ? 'bg-red-600' : 'bg-gray-200'}`}
               >
                 <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-md ${maintenanceMode ? 'right-1' : 'left-1'}`}></div>
               </button>
            </div>

            <div className="space-y-4">
               <div className="flex items-center space-x-2 text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  <Bell size={14} className="text-amber-500" />
                  <span>Downtime Notification</span>
               </div>
               <textarea 
                className="w-full p-6 bg-gray-50 border border-gray-100 rounded-[2rem] outline-none text-xs font-bold text-gray-700 leading-relaxed focus:ring-2 focus:ring-red-600/10 transition-all resize-none h-32"
                value={downtimeMsg}
                onChange={(e) => setDowntimeMsg(e.target.value)}
                placeholder="Tulis pesan pemeliharaan untuk seluruh tenant..."
               />
               <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-lg flex items-center justify-center space-x-2">
                  <Save size={16} />
                  <span>Update Notifikasi</span>
               </button>
            </div>

            <div className={`p-6 rounded-3xl border transition-all ${maintenanceMode ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'}`}>
               <div className="flex items-start space-x-4">
                  <AlertTriangle size={24} className={maintenanceMode ? 'text-red-600' : 'text-emerald-600'} />
                  <p className={`text-[10px] font-bold leading-relaxed uppercase tracking-tight ${maintenanceMode ? 'text-red-800' : 'text-emerald-800'}`}>
                    {maintenanceMode 
                      ? 'PERHATIAN: Platform sedang terkunci. Hanya Super Admin yang dapat mengakses Dashboard. Seluruh instansi tidak dapat login.' 
                      : 'Platform beroperasi normal. Pastikan pemberitahuan pemeliharaan diberikan minimal 1 jam sebelum aktivitas maintenance dimulai.'}
                  </p>
               </div>
            </div>
          </div>

          {/* Automatic Backup Scheduler */}
          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
             <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center shadow-inner">
                  <Settings2 size={24} />
                </div>
                <h5 className="text-lg font-black text-gray-900">Backup Scheduler</h5>
             </div>
             
             <div className="grid grid-cols-3 gap-2">
                {['DAILY', 'WEEKLY', 'MONTHLY'].map(freq => (
                  <button 
                    key={freq}
                    onClick={() => setActiveSchedule(freq)}
                    className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${activeSchedule === freq ? 'bg-blue-900 text-white border-blue-900 shadow-lg' : 'bg-gray-50 text-gray-400 border-gray-100 hover:bg-white'}`}
                  >
                    {freq}
                  </button>
                ))}
             </div>

             <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                   <div className="flex items-center space-x-3">
                      <Clock size={16} className="text-gray-400" />
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Execution Time</span>
                   </div>
                   <span className="text-xs font-black text-gray-900 font-mono">00:00 WIB</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                   <div className="flex items-center space-x-3">
                      <ShieldCheck size={16} className="text-gray-400" />
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Off-site Replication</span>
                   </div>
                   <span className="text-[10px] font-black text-emerald-600 uppercase">ENABLED</span>
                </div>
                <button className="w-full py-4 bg-white border border-blue-900 text-blue-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-900 hover:text-white transition-all">
                  Update Jadwal Backup
                </button>
             </div>
          </div>

          {/* Disaster Recovery Info */}
          <div className="p-8 bg-gradient-to-br from-gray-900 to-blue-950 text-white rounded-[3rem] shadow-2xl relative overflow-hidden group">
             <div className="relative z-10">
                <CloudLightning size={48} className="text-amber-400 mb-8 group-hover:rotate-12 transition-transform duration-500" />
                <h4 className="text-2xl font-black mb-4 leading-tight tracking-tight">Disaster Recovery (DRP)</h4>
                <p className="text-blue-200 text-[11px] font-bold uppercase leading-relaxed tracking-tight opacity-90 mb-10">
                  Seluruh data secara fisik direplikasi ke 3 zona ketersediaan (Availability Zones) yang berbeda di wilayah Indonesia untuk menjamin kedaulatan data.
                </p>
                <div className="flex items-center text-[10px] font-black uppercase text-emerald-400 tracking-[0.2em] bg-emerald-400/10 w-fit px-4 py-2 rounded-xl border border-emerald-400/20">
                   Reliability: 99.999%
                </div>
             </div>
             <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* RESTORE CONFIRMATION MODAL */}
      {showRestoreModal && (
        <div className="fixed inset-0 bg-red-900/60 backdrop-blur-md flex items-center justify-center z-[150] p-4">
           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
              <div className="p-10 text-center">
                 <div className="w-24 h-24 bg-red-50 text-red-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <RotateCcw size={48} className="animate-spin-slow" />
                 </div>
                 <h4 className="text-3xl font-black text-gray-900 tracking-tight">Restore Konfigurasi Sistem?</h4>
                 <p className="text-gray-500 text-sm mt-4 leading-relaxed font-medium">
                    Anda akan mengembalikan sistem ke snapshot tanggal <span className="text-red-600 font-black">{new Date(showRestoreModal.timestamp).toLocaleString('id-ID')}</span>. 
                    Seluruh data transaksi yang terjadi setelah waktu tersebut akan <span className="text-red-600 font-black">TERHAPUS PERMANEN</span>.
                 </p>
                 
                 <div className="mt-10 p-6 bg-red-50 rounded-[2rem] border border-red-100 flex items-start space-x-4 text-left">
                    <AlertTriangle size={24} className="text-red-600 shrink-0 mt-1" />
                    <div>
                       <p className="text-xs font-black text-red-900 uppercase">Warning: Tindakan Berisiko Tinggi</p>
                       <p className="text-[10px] text-red-800 font-bold leading-relaxed uppercase tracking-tight mt-1">Hanya lakukan tindakan ini jika terjadi kerusakan data masif atau kegagalan update sistem.</p>
                    </div>
                 </div>

                 <div className="mt-10 flex flex-col md:flex-row gap-4">
                    <button 
                      onClick={() => setShowRestoreModal(null)}
                      className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all"
                    >
                       Batalkan
                    </button>
                    <button 
                      onClick={confirmRestore}
                      className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-600/30"
                    >
                       Mulai Pemulihan Data
                    </button>
                 </div>
              </div>
              <div className="px-10 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Vault ID: {showRestoreModal.id}</span>
                 <ShieldCheck size={20} className="text-gray-300" />
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default BackupMaintenancePage;
