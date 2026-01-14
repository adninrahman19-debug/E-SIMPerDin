
import React, { useState } from 'react';
import { 
  MOCK_DEMO_SESSIONS, 
  MOCK_DEMO_USAGE 
} from '../../constants';
import { 
  Zap, 
  RefreshCw, 
  Trash2, 
  UserCheck, 
  BarChart3, 
  Building2, 
  Clock, 
  ArrowUpRight, 
  ShieldCheck, 
  Play, 
  Lock, 
  Users, 
  CheckCircle2, 
  AlertCircle,
  BarChart,
  Target,
  FileSearch,
  MousePointer2,
  X
} from 'lucide-react';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { DemoSession } from '../../types';

const DemoManagementPage: React.FC = () => {
  const [sessions, setSessions] = useState<DemoSession[]>(MOCK_DEMO_SESSIONS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [autoResetEnabled, setAutoResetEnabled] = useState(true);

  // Form State for new demo
  const [newDemo, setNewDemo] = useState({
    name: '',
    lead: '',
    durationHours: '24'
  });

  const handleGenerate = () => {
    if (!newDemo.name) {
      alert('Harap masukkan nama instansi simulasi.');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      const suite: DemoSession = {
        id: `ds-${Date.now()}`,
        institutionName: `${newDemo.name} (Demo)`,
        leadName: newDemo.lead || 'Prospect Client',
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + parseInt(newDemo.durationHours) * 60 * 60 * 1000).toISOString(),
        usageCount: 0,
        status: 'ACTIVE'
      };
      setSessions([suite, ...sessions]);
      setIsGenerating(false);
      setNewDemo({ name: '', lead: '', durationHours: '24' });
      alert('Demo Suite Berhasil Dibuat! Link akses telah dikirim ke log aktivitas.');
    }, 2000);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'EXPIRED': return 'bg-gray-100 text-gray-500 border-gray-200';
      case 'CONVERTED': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-gray-50 text-gray-400';
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Demo Center & Sales Support</h2>
          <p className="text-gray-500 text-sm font-medium">Pusat kendali pembuatan sandbox instansi untuk kebutuhan presentasi sales.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
           <div className="px-4 py-2 flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${autoResetEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`}></div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Auto-Reset: {autoResetEnabled ? 'ON' : 'OFF'}</span>
              <button 
                onClick={() => setAutoResetEnabled(!autoResetEnabled)}
                className="text-[10px] font-black text-blue-900 uppercase underline ml-2"
              >
                Toggle
              </button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Generator Form */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-blue-900 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                  <Zap size={20} />
                </div>
                <h4 className="text-lg font-black text-gray-900">Generate Demo Suite</h4>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Nama Instansi Simulasi</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold"
                    placeholder="E.g. Bappeda Kota Bandung"
                    value={newDemo.name}
                    onChange={(e) => setNewDemo({...newDemo, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Nama Calon Klien (Lead)</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold"
                    placeholder="E.g. Bapak Hendrawan"
                    value={newDemo.lead}
                    onChange={(e) => setNewDemo({...newDemo, lead: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Durasi Sandbox</label>
                  <select 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-xs"
                    value={newDemo.durationHours}
                    onChange={(e) => setNewDemo({...newDemo, durationHours: e.target.value})}
                  >
                    <option value="2">2 Jam (Presentasi)</option>
                    <option value="24">24 Jam (Uji Coba Mandiri)</option>
                    <option value="168">7 Hari (POC)</option>
                  </select>
                </div>

                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                   <h5 className="text-[10px] font-black text-blue-900 uppercase mb-2 flex items-center">
                     <ShieldCheck size={12} className="mr-1" /> Suite akan berisi:
                   </h5>
                   <ul className="grid grid-cols-2 gap-y-1">
                      {['5 User Account', 'Data SBM 2024', '10 Dummy SPPD', 'Template Dinas', 'Dashboard Admin', 'Pejabat Penyetuju'].map((item, i) => (
                        <li key={i} className="text-[9px] font-bold text-blue-700 flex items-center">
                          <CheckCircle2 size={10} className="mr-1.5 shrink-0" /> {item}
                        </li>
                      ))}
                   </ul>
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full py-4 bg-blue-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center space-x-2"
                >
                  {isGenerating ? <RefreshCw size={16} className="animate-spin" /> : <Play size={16} />}
                  <span>{isGenerating ? 'Generating Suite...' : 'Mulai Sekarang'}</span>
                </button>
              </div>
           </div>

           <div className="bg-amber-50 p-6 rounded-[2.5rem] border border-amber-100 flex items-start space-x-3">
             <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
             <p className="text-[10px] text-amber-800 font-bold leading-relaxed uppercase tracking-tight">
               Mode demo menggunakan database terpisah. Data simulasi akan dihapus otomatis setelah masa aktif habis untuk efisiensi resource.
             </p>
           </div>
        </div>

        {/* Right: Stats & Sessions */}
        <div className="lg:col-span-2 space-y-8">
           {/* Summary Stats */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                 <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Sandbox Aktif</p>
                 <div className="flex items-end justify-between">
                    <h3 className="text-3xl font-black text-gray-900">12</h3>
                    <Target size={24} className="text-blue-900 mb-1" />
                 </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                 <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Dibuat Hari Ini</p>
                 <div className="flex items-end justify-between">
                    <h3 className="text-3xl font-black text-gray-900">7</h3>
                    <Zap size={24} className="text-amber-500 mb-1" />
                 </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                 <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Login Rate (Demo)</p>
                 <div className="flex items-end justify-between">
                    <h3 className="text-3xl font-black text-gray-900">84%</h3>
                    <MousePointer2 size={24} className="text-emerald-500 mb-1" />
                 </div>
              </div>
           </div>

           {/* Charts */}
           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                 <div>
                    <h4 className="text-lg font-black text-gray-900">Statistik Penggunaan Demo</h4>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Sales Engagement Trend</p>
                 </div>
                 <div className="flex items-center space-x-4">
                    <div className="flex items-center text-[10px] font-black text-blue-900 uppercase">
                       <div className="w-2.5 h-2.5 bg-blue-900 rounded-full mr-1.5"></div> Logins
                    </div>
                    <div className="flex items-center text-[10px] font-black text-amber-500 uppercase">
                       <div className="w-2.5 h-2.5 bg-amber-500 rounded-full mr-1.5"></div> New Suite
                    </div>
                 </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={MOCK_DEMO_USAGE}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} />
                    <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                    <Bar dataKey="activeLogins" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="generations" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
           </div>

           {/* Active Sessions List */}
           <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center">
                    <FileSearch size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-gray-900">Active Environments</h4>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Monitoring Sandbox Client</p>
                  </div>
                </div>
                <button className="text-[10px] font-black text-blue-900 uppercase bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-all">Clear All Expired</button>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] bg-gray-50/50 border-b border-gray-100">
                        <th className="px-8 py-5">Institusi & Lead</th>
                        <th className="px-6 py-5">Dibuat Pada</th>
                        <th className="px-6 py-5">Expired</th>
                        <th className="px-6 py-5 text-center">Engagement</th>
                        <th className="px-8 py-5 text-right">Aksi</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50">
                      {sessions.map((session) => (
                        <tr key={session.id} className="group hover:bg-blue-50/30 transition-all duration-300">
                           <td className="px-8 py-6">
                              <p className="text-xs font-black text-gray-900 leading-none">{session.institutionName}</p>
                              <p className="text-[10px] text-blue-500 font-bold mt-1 tracking-tight">PIC: {session.leadName}</p>
                           </td>
                           <td className="px-6 py-6">
                              <div className="flex items-center text-xs font-bold text-gray-400">
                                <Clock size={12} className="mr-1.5" />
                                {new Date(session.createdAt).toLocaleDateString('id-ID')}
                              </div>
                           </td>
                           <td className="px-6 py-6">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border ${getStatusStyle(session.status)}`}>
                                 {session.status}
                              </span>
                           </td>
                           <td className="px-6 py-6 text-center">
                              <p className="text-xs font-black text-gray-700">{session.usageCount} <span className="text-[9px] text-gray-400">Hits</span></p>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                                 <button className="p-2 text-gray-400 hover:text-blue-900" title="Login as Admin Demo"><Users size={16} /></button>
                                 <button className="p-2 text-gray-400 hover:text-amber-600" title="Reset Data Demo"><RefreshCw size={16} /></button>
                                 <button className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                              </div>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                 </table>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DemoManagementPage;
