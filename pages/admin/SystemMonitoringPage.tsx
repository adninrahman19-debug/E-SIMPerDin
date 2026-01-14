
import React, { useState } from 'react';
import { 
  MOCK_SYSTEM_LOGS, 
  MOCK_TECHNICAL_METRICS 
} from '../../constants';
import { 
  Activity, 
  ShieldAlert, 
  History, 
  Server, 
  Database, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Cpu, 
  HardDrive, 
  Network, 
  Terminal,
  Search,
  Download,
  Filter,
  ArrowUpRight,
  ShieldCheck,
  PackageCheck,
  UserCheck,
  Bug
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { LogCategory, SystemLogEntry } from '../../types';

const SystemMonitoringPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'LOGS' | 'METRICS'>('METRICS');
  const [logFilter, setLogFilter] = useState<LogCategory | 'ALL'>('ALL');

  const filteredLogs = MOCK_SYSTEM_LOGS.filter(log => 
    logFilter === 'ALL' || log.category === logFilter
  );

  const getLogIcon = (cat: LogCategory) => {
    switch (cat) {
      case LogCategory.ADMIN_ACTION: return <UserCheck size={16} />;
      case LogCategory.SUBSCRIPTION: return <PackageCheck size={16} />;
      case LogCategory.SECURITY: return <ShieldAlert size={16} />;
      case LogCategory.TECHNICAL: return <Terminal size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS': return 'text-emerald-600 bg-emerald-50';
      case 'WARNING': return 'text-amber-600 bg-amber-50';
      case 'ERROR': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-indigo-700">
            Monitoring & Audit Sistem
          </h2>
          <p className="text-gray-500 text-sm font-medium">Pengawasan infrastruktur, jejak audit aktivitas, dan deteksi anomali real-time.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
          <button 
            onClick={() => setActiveTab('METRICS')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'METRICS' ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/20' : 'text-gray-500 hover:text-blue-900'}`}
          >
            Vitals & Metrik
          </button>
          <button 
            onClick={() => setActiveTab('LOGS')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'LOGS' ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/20' : 'text-gray-500 hover:text-blue-900'}`}
          >
            Audit Logs
          </button>
        </div>
      </div>

      {activeTab === 'METRICS' ? (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
          {/* Status Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                <Database size={24} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Database Cluster</p>
                <h4 className="text-lg font-black text-gray-900 mt-1">Operational</h4>
                <div className="mt-1 flex items-center text-[10px] font-bold text-emerald-600">
                  <CheckCircle2 size={12} className="mr-1" /> Healthy
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <Server size={24} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">API Service</p>
                <h4 className="text-lg font-black text-gray-900 mt-1">99.98% Uptime</h4>
                <p className="text-[10px] font-bold text-blue-400 mt-1 uppercase">Load: 24% Avg</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Security Filter</p>
                <h4 className="text-lg font-black text-gray-900 mt-1">WAF Active</h4>
                <p className="text-[10px] font-bold text-indigo-400 mt-1 uppercase">Blocked: 12 (1h)</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                <HardDrive size={24} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">S3 Storage</p>
                <h4 className="text-lg font-black text-gray-900 mt-1">42% Capacity</h4>
                <p className="text-[10px] font-bold text-amber-500 mt-1 uppercase">842 GB Free</p>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h4 className="text-lg font-black text-gray-900 flex items-center">
                    <Cpu size={20} className="mr-2 text-blue-900" /> Beban Resource Server
                  </h4>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Real-time Utilization</p>
                </div>
                <div className="flex space-x-4">
                   <div className="flex items-center text-[10px] font-black text-blue-600 uppercase">
                     <div className="w-2.5 h-2.5 bg-blue-600 rounded-full mr-1.5"></div> CPU
                   </div>
                   <div className="flex items-center text-[10px] font-black text-indigo-600 uppercase">
                     <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full mr-1.5"></div> RAM
                   </div>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_TECHNICAL_METRICS}>
                    <defs>
                      <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} unit="%" />
                    <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                    <Area type="monotone" dataKey="cpu" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorCpu)" />
                    <Area type="monotone" dataKey="ram" stroke="#4f46e5" strokeWidth={3} fillOpacity={0} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h4 className="text-lg font-black text-gray-900 flex items-center">
                    <Network size={20} className="mr-2 text-emerald-600" /> Trafik & Error Rate
                  </h4>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">System Requests (req/min)</p>
                </div>
                <div className="flex space-x-4">
                   <div className="flex items-center text-[10px] font-black text-emerald-600 uppercase">
                     <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full mr-1.5"></div> RPS
                   </div>
                   <div className="flex items-center text-[10px] font-black text-red-600 uppercase">
                     <div className="w-2.5 h-2.5 bg-red-600 rounded-full mr-1.5"></div> Errors
                   </div>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={MOCK_TECHNICAL_METRICS}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} />
                    <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                    <Line type="stepAfter" dataKey="req" stroke="#10b981" strokeWidth={4} dot={false} />
                    <Line type="monotone" dataKey="error" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={true} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Technical Exceptions */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
             <div className="flex items-center justify-between mb-8">
               <h4 className="text-lg font-black text-gray-900 flex items-center">
                 <Bug size={20} className="mr-2 text-red-600" /> Exception & Error Stack
               </h4>
               <button className="text-xs font-black text-blue-900 uppercase tracking-widest hover:underline">Download Stackdump</button>
             </div>
             <div className="space-y-4">
               {[
                 { time: '10:11:02', code: '500 Internal Error', message: 'Failed to generate PDF for SPPD-102: Buffer Overflow', source: 'PDF_ENGINE_V2' },
                 { time: '09:45:12', code: '403 Forbidden', message: 'Unauthorized access attempt to /api/v1/system/backup', source: 'AUTH_GATEWAY' },
                 { time: '08:12:44', code: 'Memory Warning', message: 'RAM utilization exceeded 85% for more than 5 minutes', source: 'K8S_NODE_01' },
               ].map((err, i) => (
                 <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-gray-50 border border-gray-100 rounded-2xl group hover:border-red-200 transition-all">
                    <div className="flex items-center space-x-4">
                      <div className="px-3 py-1 bg-red-100 text-red-700 text-[10px] font-black uppercase rounded-lg">
                        {err.code}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800 leading-tight">{err.message}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Source: {err.source} • Time: {err.time}</p>
                      </div>
                    </div>
                    <button className="mt-4 md:mt-0 p-2 text-gray-400 hover:text-blue-900 transition-all">
                      <ArrowUpRight size={18} />
                    </button>
                 </div>
               ))}
             </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
             <div className="flex flex-wrap gap-2">
                {(['ALL', ...Object.values(LogCategory)] as const).map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setLogFilter(cat)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                      logFilter === cat 
                      ? 'bg-blue-900 text-white border-blue-900 shadow-lg shadow-blue-900/10' 
                      : 'bg-white text-gray-400 border-gray-100 hover:border-blue-900/20'
                    }`}
                  >
                    {cat.replace('_', ' ')}
                  </button>
                ))}
             </div>
             <div className="flex items-center space-x-3">
                <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                   <input 
                    type="text" 
                    placeholder="Cari log..." 
                    className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none text-xs font-bold focus:ring-2 focus:ring-blue-900/10 transition-all w-64" 
                   />
                </div>
                <button className="p-2.5 bg-gray-50 text-gray-500 rounded-xl border border-gray-100 hover:text-blue-900 transition-all">
                  <Download size={18} />
                </button>
             </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead>
                   <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] bg-gray-50/50 border-b border-gray-100">
                     <th className="px-8 py-5">Timestamp</th>
                     <th className="px-6 py-5">Kategori</th>
                     <th className="px-6 py-5">Pelaku & IP</th>
                     <th className="px-6 py-5">Aksi / Event</th>
                     <th className="px-6 py-5">Detail Keterangan</th>
                     <th className="px-8 py-5 text-right">Status</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                   {filteredLogs.map((log) => (
                     <tr key={log.id} className="group hover:bg-blue-50/30 transition-all duration-300">
                        <td className="px-8 py-6">
                           <p className="text-xs font-black text-gray-900 leading-none">
                            {new Date(log.timestamp).toLocaleDateString('id-ID')}
                           </p>
                           <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tighter">
                            {new Date(log.timestamp).toLocaleTimeString('id-ID')} WIB
                           </p>
                        </td>
                        <td className="px-6 py-6">
                           <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-lg text-[10px] font-black uppercase text-gray-600">
                             {getLogIcon(log.category)}
                             <span>{log.category.replace('_', ' ')}</span>
                           </div>
                        </td>
                        <td className="px-6 py-6">
                           <p className="text-xs font-black text-gray-900 leading-none">{log.userName}</p>
                           <p className="text-[10px] text-blue-500 font-bold mt-1 tracking-tight">IP: {log.ipAddress}</p>
                        </td>
                        <td className="px-6 py-6 font-bold text-gray-700 text-xs">
                           {log.action}
                        </td>
                        <td className="px-6 py-6 max-w-xs">
                           <p className="text-xs text-gray-500 leading-relaxed font-medium line-clamp-2 italic">
                            "{log.details}"
                           </p>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(log.status)}`}>
                             {log.status}
                           </span>
                        </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
             <div className="px-8 py-5 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
               <span>Menampilkan {filteredLogs.length} Aktivitas Terkini</span>
               <div className="flex space-x-4">
                 <button className="hover:text-blue-900">Sebelumnya</button>
                 <button className="hover:text-blue-900">Berikutnya</button>
               </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemMonitoringPage;
