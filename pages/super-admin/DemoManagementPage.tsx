import React, { useState } from 'react';
import { 
  MOCK_DEMO_SESSIONS, 
  MOCK_DEMO_USAGE 
} from '../../constants';
import { 
  Zap, 
  Play, 
  Target, 
  Clock, 
  Users, 
  Trash2, 
  RefreshCw, 
  BarChart3, 
  ShieldCheck,
  MousePointer2,
  CheckCircle2,
  Plus,
  ArrowUpRight,
  Database,
  Lock,
  UserCheck,
  Sparkles,
  Search,
  X,
  ChevronRight,
  TrendingUp,
  Fingerprint,
  // Added AlertCircle to imports
  AlertCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { DemoSession } from '../../types';

const DemoManagementPage: React.FC = () => {
  const [sessions, setSessions] = useState<DemoSession[]>(MOCK_DEMO_SESSIONS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [autoResetEnabled, setAutoResetEnabled] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // New Demo Form State
  const [newDemo, setNewDemo] = useState({
    name: '',
    lead: '',
    duration: '24'
  });

  const handleGenerate = () => {
    if (!newDemo.name || !newDemo.lead) {
      alert('Harap isi Nama Instansi dan Nama Calon Klien.');
      return;
    }
    setIsGenerating(true);
    // Simulasi pembuatan database terisolasi dan provisioning akun
    setTimeout(() => {
      const suite: DemoSession = {
        id: `ds-${Date.now()}`,
        institutionName: `${newDemo.name} (Demo)`,
        leadName: newDemo.lead,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + parseInt(newDemo.duration) * 60 * 60 * 1000).toISOString(),
        usageCount: 0,
        status: 'ACTIVE'
      };
      setSessions([suite, ...sessions]);
      setIsGenerating(false);
      setNewDemo({ name: '', lead: '', duration: '24' });
      alert('Demo Suite Berhasil Diterbitkan!\nKredensial untuk 5 Role (Admin s/d Pegawai) telah dikirim ke email Sales.');
    }, 2500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-emerald-50 text-emerald-600 border-emerald-100 animate-pulse';
      case 'EXPIRED': return 'bg-gray-100 text-gray-400 border-gray-200';
      case 'CONVERTED': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-gray-50 text-gray-400';
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      {/* Header & Global Config */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight flex items-center">
            Demo & Sales Support <Sparkles className="ml-3 text-amber-400" size={32} />
          </h2>
          <p className="text-gray-500 text-sm font-medium mt-1">Pusat kendali provisioning sandbox untuk kebutuhan pemasaran platform.</p>
        </div>
        <div className="flex bg-white p-2 rounded-2xl border border-gray-100 shadow-sm items-center space-x-4">
           <div className="flex items-center space-x-2 px-3 border-r border-gray-100">
              <div className={`w-3 h-3 rounded-full ${autoResetEnabled ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Auto-Reset Mode</span>
           </div>
           <button 
            onClick={() => setAutoResetEnabled(!autoResetEnabled)}
            className={`w-12 h-6 rounded-full transition-all relative ${autoResetEnabled ? 'bg-blue-900' : 'bg-gray-200'}`}
           >
             <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${autoResetEnabled ? 'right-1' : 'left-1'}`}></div>
           </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
         <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Sandbox Aktif</p>
            <div className="flex items-end justify-between">
               <h3 className="text-3xl font-black text-gray-900">{sessions.filter(s => s.status === 'ACTIVE').length}</h3>
               <Target size={24} className="text-blue-900 mb-1" />
            </div>
         </div>
         <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Login Demo (24h)</p>
            <div className="flex items-end justify-between">
               <h3 className="text-3xl font-black text-gray-900">142</h3>
               <MousePointer2 size={24} className="text-emerald-500 mb-1" />
            </div>
         </div>
         <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Conversion Rate</p>
            <div className="flex items-end justify-between">
               <h3 className="text-3xl font-black text-gray-900">12.4%</h3>
               <TrendingUp size={24} className="text-indigo-600 mb-1" />
            </div>
         </div>
         <div className="bg-indigo-900 p-6 rounded-[2.5rem] shadow-xl text-white">
            <p className="text-[9px] font-black uppercase opacity-70 mb-2">Total Data Cleared</p>
            <div className="flex items-end justify-between">
               <h3 className="text-3xl font-black">4.2 TB</h3>
               <Trash2 size={24} className="text-blue-300 mb-1" />
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Generator Form */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-8 animate-in slide-in-from-left-4">
              <div className="flex items-center space-x-4">
                 <div className="w-14 h-14 bg-blue-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-blue-900/20">
                    <Zap size={28} className="fill-amber-400 text-amber-400" />
                 </div>
                 <div>
                    <h4 className="text-xl font-black text-gray-900">Suite Generator</h4>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Provisioning Sandbox</p>
                 </div>
              </div>

              <div className="space-y-5">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Instansi Prospect</label>
                    <input 
                      type="text" 
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold"
                      placeholder="Contoh: Bappeda Kota Bandung"
                      value={newDemo.name}
                      onChange={(e) => setNewDemo({...newDemo, name: e.target.value})}
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Calon Klien (Lead)</label>
                    <input 
                      type="text" 
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold"
                      placeholder="Contoh: Bapak Hendrawan"
                      value={newDemo.lead}
                      onChange={(e) => setNewDemo({...newDemo, lead: e.target.value})}
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Masa Berlaku Sandbox</label>
                    <select 
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-sm appearance-none"
                      value={newDemo.duration}
                      onChange={(e) => setNewDemo({...newDemo, duration: e.target.value})}
                    >
                      <option value="2">2 Jam (Presentasi Cepat)</option>
                      <option value="24">24 Jam (Trial Mandiri)</option>
                      <option value="168">7 Hari (Evaluasi Mendalam)</option>
                    </select>
                 </div>

                 <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100">
                    <h6 className="text-[10px] font-black text-blue-900 uppercase mb-4 flex items-center">
                       <CheckCircle2 size={12} className="mr-2" /> Paket Otomatisasi:
                    </h6>
                    <ul className="space-y-3">
                       {[
                         { icon: Users, label: '5 User Accounts (All Roles)' },
                         { icon: Database, label: 'Dummy Data: 12 SPPD' },
                         { icon: Fingerprint, label: 'Pre-configured SBM 2024' },
                         { icon: Lock, label: 'Isolated Database Storage' }
                       ].map((item, i) => (
                         <li key={i} className="flex items-center text-[10px] font-bold text-blue-700 uppercase">
                            <item.icon size={14} className="mr-3 text-blue-400" /> {item.label}
                         </li>
                       ))}
                    </ul>
                 </div>

                 <button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full py-5 bg-blue-900 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-all shadow-2xl shadow-blue-900/30 flex items-center justify-center space-x-3 disabled:opacity-50"
                 >
                   {isGenerating ? <RefreshCw size={20} className="animate-spin" /> : <Play size={20} />}
                   <span>{isGenerating ? 'Deploying Suite...' : 'Generate Sandbox Suite'}</span>
                 </button>
              </div>
           </div>

           <div className="bg-amber-50 p-8 rounded-[2.5rem] border border-amber-100 flex items-start space-x-5">
              {/* Corrected missing AlertCircle import */}
              <AlertCircle size={32} className="text-amber-600 shrink-0 mt-1" />
              <div>
                 <h5 className="text-sm font-black text-amber-900 uppercase">Perhatian Data</h5>
                 <p className="text-[10px] text-amber-800 font-bold leading-relaxed uppercase tracking-tight">
                   Mode demo menggunakan klaster database terpisah. Seluruh data simulasi akan dihapus permanen oleh sistem setelah masa berlaku habis tanpa pemberitahuan lanjut.
                 </p>
              </div>
           </div>
        </div>

        {/* Analytics & Active Sessions */}
        <div className="lg:col-span-2 space-y-8 animate-in slide-in-from-right-4">
           {/* Engagement Chart */}
           <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                 <div>
                    <h4 className="text-xl font-black text-gray-900">Sales Engagement Track</h4>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Tren Pembuatan Suite Baru (7 Hari)</p>
                 </div>
                 <div className="flex items-center space-x-4">
                    <div className="flex items-center text-[10px] font-black text-blue-900 uppercase">
                       <div className="w-2.5 h-2.5 bg-blue-900 rounded-full mr-2"></div> Logins
                    </div>
                    <div className="flex items-center text-[10px] font-black text-amber-500 uppercase">
                       <div className="w-2.5 h-2.5 bg-amber-500 rounded-full mr-2"></div> New Suite
                    </div>
                 </div>
              </div>
              <div className="h-64">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={MOCK_DEMO_USAGE}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                       <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} dy={10} />
                       <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} />
                       <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                       <Bar dataKey="activeLogins" fill="#1e3a8a" radius={[6, 6, 0, 0]} barSize={24} />
                       <Bar dataKey="generations" fill="#f59e0b" radius={[6, 6, 0, 0]} barSize={24} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Sessions Table */}
           <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
              <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                 <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white text-blue-900 rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
                       <Target size={24} />
                    </div>
                    <div>
                       <h4 className="text-xl font-black text-gray-900">Active Environments</h4>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Live Sandbox Monitoring</p>
                    </div>
                 </div>
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      className="pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold outline-none w-48 shadow-sm focus:ring-2 focus:ring-blue-900/10" 
                      placeholder="Cari prospek..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                 </div>
              </div>

              <div className="overflow-x-auto flex-1">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] border-b border-gray-50 bg-gray-50/10">
                          <th className="px-8 py-6">Institusi & Prospek</th>
                          <th className="px-6 py-6">Masa Berlaku</th>
                          <th className="px-6 py-6">Status</th>
                          <th className="px-6 py-6 text-center">Engagement</th>
                          <th className="px-8 py-6 text-right">Aksi</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                       {sessions.filter(s => s.institutionName.toLowerCase().includes(searchTerm.toLowerCase())).map((session) => (
                         <tr key={session.id} className="group hover:bg-blue-50/30 transition-all duration-300">
                            <td className="px-8 py-6">
                               <p className="text-sm font-black text-gray-900 leading-none">{session.institutionName}</p>
                               <p className="text-[10px] text-blue-500 font-bold uppercase mt-1.5 flex items-center">
                                  <UserCheck size={10} className="mr-1.5" /> PIC: {session.leadName}
                               </p>
                            </td>
                            <td className="px-6 py-6">
                               <div className="flex items-center text-xs font-bold text-gray-500">
                                  <Clock size={14} className="mr-2 text-gray-300" />
                                  {new Date(session.expiresAt).toLocaleDateString('id-ID')}
                               </div>
                            </td>
                            <td className="px-6 py-6">
                               <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusBadge(session.status)}`}>
                                  {session.status}
                               </span>
                            </td>
                            <td className="px-6 py-6 text-center">
                               <div className="inline-flex flex-col items-center bg-gray-50 px-3 py-1 rounded-xl border border-gray-100 group-hover:bg-white transition-all">
                                  <p className="text-xs font-black text-gray-900">{session.usageCount}</p>
                                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">Activity Hits</p>
                               </div>
                            </td>
                            <td className="px-8 py-6 text-right" onClick={(e) => e.stopPropagation()}>
                               <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                                  <button className="p-2.5 text-gray-400 hover:text-blue-900 bg-white border border-gray-100 rounded-xl hover:shadow-sm" title="Login As Admin Demo">
                                    <ArrowUpRight size={18} />
                                  </button>
                                  <button className="p-2.5 text-gray-400 hover:text-amber-600 bg-white border border-gray-100 rounded-xl hover:shadow-sm" title="Reset Simulation Data">
                                    <RefreshCw size={18} />
                                  </button>
                                  <button className="p-2.5 text-gray-400 hover:text-red-600 bg-white border border-gray-100 rounded-xl hover:shadow-sm">
                                    <Trash2 size={18} />
                                  </button>
                               </div>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
              
              <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center">
                    <ShieldCheck size={16} className="mr-2 text-blue-900" /> Sales Engine v2.4 Operational
                 </p>
                 <button className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline flex items-center">
                    Clear All Expired Suites <ChevronRight size={14} className="ml-1" />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DemoManagementPage;