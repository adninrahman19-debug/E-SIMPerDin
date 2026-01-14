
import React, { useState } from 'react';
import { 
  MOCK_BACKUPS 
} from '../../constants';
import { 
  Database, 
  RefreshCw, 
  Download, 
  History, 
  Settings2, 
  AlertTriangle, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  Server, 
  Save, 
  Trash2, 
  Play, 
  RotateCcw,
  Zap,
  Info,
  ChevronRight,
  MonitorOff,
  Bell,
  CheckCircle2,
  X
} from 'lucide-react';
import { BackupEntry } from '../../types';

const BackupMaintenancePage: React.FC = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [backupSchedule, setBackupSchedule] = useState('DAILY');
  const [downtimeMessage, setDowntimeMessage] = useState('Sistem sedang dalam pemeliharaan rutin. Harap kembali dalam beberapa saat.');
  const [backups, setBackups] = useState<BackupEntry[]>(MOCK_BACKUPS);
  const [isBackupInProgress, setIsBackupInProgress] = useState(false);

  const handleManualBackup = () => {
    setIsBackupInProgress(true);
    // Simulasi proses backup
    setTimeout(() => {
      const newBackup: BackupEntry = {
        id: `bak-${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date().toISOString(),
        sizeMb: 1245.2,
        type: 'MANUAL',
        status: 'COMPLETED',
        createdBy: 'Super Administrator',
        fileName: `simperdin_manual_${new Date().toISOString().split('T')[0]}.sql.gz`
      };
      setBackups([newBackup, ...backups]);
      setIsBackupInProgress(false);
    }, 3000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'text-emerald-600 bg-emerald-50';
      case 'FAILED': return 'text-red-600 bg-red-50';
      case 'IN_PROGRESS': return 'text-blue-600 bg-blue-50 animate-pulse';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Backup & Pemeliharaan</h2>
          <p className="text-gray-500 text-sm font-medium">Pengelolaan integritas data, snapshot sistem, dan jendela maintenance global.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            disabled={isBackupInProgress}
            onClick={handleManualBackup}
            className={`bg-blue-900 text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:bg-blue-800 transition-all font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-900/20 ${isBackupInProgress ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isBackupInProgress ? <RefreshCw size={18} className="animate-spin" /> : <Play size={18} />}
            <span>{isBackupInProgress ? 'Proses Backup...' : 'Mulai Backup Manual'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Backup History */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center">
                  <History size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-black text-gray-900">Riwayat Snapshot</h4>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Daftar Backup Tersedia di Cloud Storage</p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-blue-900 transition-all">
                <RefreshCw size={20} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] bg-gray-50/50 border-b border-gray-100">
                    <th className="px-8 py-5">Timestamp & File</th>
                    <th className="px-6 py-5">Tipe & Ukuran</th>
                    <th className="px-6 py-5">Status</th>
                    <th className="px-8 py-5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {backups.map((bak) => (
                    <tr key={bak.id} className="group hover:bg-blue-50/30 transition-all duration-300">
                      <td className="px-8 py-6">
                        <p className="text-xs font-black text-gray-900 leading-none">
                          {new Date(bak.timestamp).toLocaleDateString('id-ID')} {new Date(bak.timestamp).toLocaleTimeString('id-ID')}
                        </p>
                        <p className="text-[10px] text-gray-400 font-bold mt-1 tracking-tight truncate max-w-[200px]">
                          {bak.fileName}
                        </p>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex flex-col">
                          <span className={`text-[9px] font-black uppercase tracking-widest ${bak.type === 'AUTOMATIC' ? 'text-indigo-600' : 'text-amber-600'}`}>
                            {bak.type}
                          </span>
                          <span className="text-[10px] font-bold text-gray-500 mt-1">{(bak.sizeMb / 1024).toFixed(2)} GB</span>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusBadge(bak.status)}`}>
                          {bak.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="p-2 text-gray-400 hover:text-blue-900 hover:bg-white rounded-xl transition-all" title="Unduh">
                            <Download size={18} />
                          </button>
                          <button 
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-white rounded-xl transition-all" 
                            title="Restore"
                            onClick={() => alert(`Memulai proses restore dari: ${bak.fileName}. Seluruh data saat ini akan digantikan. Lanjutkan?`)}
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
            <div className="px-8 py-5 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
               <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                 <Server size={14} className="mr-2" /> Storage Terpakai: 4.8 GB / 50 GB
               </div>
               <button className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline">Lihat Pengaturan Retensi</button>
            </div>
          </div>

          <div className="bg-blue-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-md">
                <div className="flex items-center space-x-3 mb-4">
                  <Zap size={24} className="text-amber-400" />
                  <h4 className="text-xl font-black">Sistem Update: v2.5.2</h4>
                </div>
                <p className="text-blue-100 text-xs leading-relaxed font-bold uppercase tracking-tight opacity-80">
                  Update terakhir dilakukan pada 12 Mei 2024. Termasuk patch keamanan SSL dan optimasi mesin generator PDF.
                </p>
              </div>
              <button className="bg-white text-blue-900 px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center space-x-2">
                <RefreshCw size={18} />
                <span>Cek Pembaruan</span>
              </button>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          </div>
        </div>

        {/* Right Column: Maintenance & Config */}
        <div className="space-y-8">
          {/* Maintenance Mode Toggle */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${maintenanceMode ? 'bg-red-50 text-red-600 shadow-lg shadow-red-600/10' : 'bg-emerald-50 text-emerald-600'}`}>
                  <MonitorOff size={24} />
                </div>
                <div>
                  <h5 className="text-sm font-black text-gray-900 uppercase">Mode Maintenance</h5>
                  <p className="text-[10px] text-gray-400 font-bold tracking-widest">{maintenanceMode ? 'SISTEM DIKUNCI' : 'SISTEM ONLINE'}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={maintenanceMode} 
                  onChange={() => setMaintenanceMode(!maintenanceMode)} 
                />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Bell size={16} className="text-gray-400" />
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pesan Downtime Pengguna</label>
              </div>
              <textarea 
                value={downtimeMessage}
                onChange={(e) => setDowntimeMessage(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none text-xs font-bold focus:ring-2 focus:ring-blue-900/10 transition-all min-h-[100px]" 
              />
              <button className="w-full py-2.5 bg-gray-100 text-gray-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center justify-center space-x-2">
                <Save size={14} />
                <span>Simpan Konfigurasi</span>
              </button>
            </div>
            
            <div className={`p-4 rounded-2xl border transition-all ${maintenanceMode ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'}`}>
               <div className="flex items-start space-x-3">
                 <AlertTriangle size={18} className={maintenanceMode ? 'text-red-600' : 'text-emerald-600'} />
                 <p className={`text-[10px] font-bold leading-relaxed uppercase tracking-tight ${maintenanceMode ? 'text-red-800' : 'text-emerald-800'}`}>
                   {maintenanceMode 
                    ? 'Saat mode ini aktif, seluruh pengguna (kecuali Super Admin) akan dialihkan ke halaman maintenance.' 
                    : 'Sistem saat ini dapat diakses secara penuh oleh seluruh institusi dan pegawai.'}
                 </p>
               </div>
            </div>
          </div>

          {/* Backup Scheduler */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Penjadwalan Otomatis</h5>
            <div className="space-y-4">
               <div className="grid grid-cols-3 gap-2">
                 {['DAILY', 'WEEKLY', 'MONTHLY'].map((freq) => (
                   <button 
                    key={freq}
                    onClick={() => setBackupSchedule(freq)}
                    className={`px-2 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${backupSchedule === freq ? 'bg-blue-900 text-white border-blue-900 shadow-lg shadow-blue-900/10' : 'bg-gray-50 text-gray-400 border-gray-100'}`}
                   >
                    {freq}
                   </button>
                 ))}
               </div>
               
               <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-3">
                 <div className="flex items-center justify-between text-[10px] font-black text-gray-500">
                    <span className="uppercase">Retensi Snapshot</span>
                    <span className="text-blue-900">30 Hari</span>
                 </div>
                 <div className="flex items-center justify-between text-[10px] font-black text-gray-500">
                    <span className="uppercase">Waktu Eksekusi</span>
                    <span className="text-blue-900">00:00 WIB</span>
                 </div>
               </div>
               
               <button className="w-full py-4 bg-blue-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/10">
                 Simpan Jadwal
               </button>
            </div>
          </div>

          <div className="bg-emerald-50 p-8 rounded-[2.5rem] border border-emerald-100 flex items-center space-x-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h4 className="text-sm font-black text-emerald-900 uppercase">Verifikasi Data</h4>
              <p className="text-[10px] text-emerald-700 font-bold leading-tight mt-1">Status Integritas: VALID<br/>Checksum Match: 100%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackupMaintenancePage;
