
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
  Bug,
  ChevronRight,
  Clock,
  RefreshCw
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
import { LogCategory } from '../../types';

const SystemMonitoringPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'METRICS' | 'LOGS'>('METRICS');
  const [logFilter, setLogFilter] = useState<LogCategory | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = MOCK_SYSTEM_LOGS.filter(log => {
    const matchesCategory = logFilter === 'ALL' || log.category === logFilter;
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
      case 'SUCCESS': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'WARNING': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'ERROR': return 'text-red-600 bg-red-50 border-red-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">System Monitoring & Audit</h2>
          <p className="text-gray-500 text-sm font-medium">Pengawasan infrastruktur teknis dan jejak digital otorisasi platform.</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <button 
            onClick={() => setActiveTab('METRICS')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center space-x-2 ${activeTab === 'METRICS' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500 hover:text-blue-900'}`}
          >
            <Activity size={16} />
            <span>Technical Vitals</span>
          </button>
          <button 
            onClick={() => setActiveTab('LOGS')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center space-x-2 ${activeTab === 'LOGS' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500 hover:text-blue-900'}`}
          >
            <History size={16} />
            <span>Audit Trail</span>
          </button>
        </div>
      </div>

      {activeTab === 'METRICS' ? (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
          {/* Real-time Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                <Database size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Database</p>
                <h4 className="text-lg font-black text-gray-900">Connected</h4>
                <div className="flex items-center text-[9px] font-bold text-emerald-600 mt-1 uppercase">
                   <CheckCircle2 size={10} className="mr-1" /> Latency: 4ms
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <Server size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Core API</p>
                <h4 className="text-lg font-black text-gray-900">Operational</h4>
                <div className="flex items-center text-[9px] font-bold text-blue-600 mt-1 uppercase">
                   <Zap size={10} className="mr-1" /> Uptime: 99.98%
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">WAF Filter</p>
                <h4 className="text-lg font-black text-gray-900">Active</h4>
                <div className="flex items-center text-[9px] font-bold text-indigo-600 mt-1 uppercase">
                   <ShieldAlert size={10} className="mr-1" /> 0 Attacks (1h)
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                <HardDrive size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cloud S3</p>
                <h4 className="text-lg font-black text-gray-900">42% Capacity</h4>
                <div className="flex items-center text-[9px] font-bold text-amber-600 mt-1 uppercase">
                   <AlertTriangle size={10} className="mr-1" /> 842 GB Free
                </div>
              </div>
            </div>
          </div>

          {/* Infrastructure Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <div>
                   <h4 className="text-xl font-black text-gray-900 flex items-center">
                     <Cpu size={20} className="mr-2 text-blue-900" /> Beban Resource Server
                   </h4>
                   <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">CPU & RAM Consumption</p>
                </div>
                <div className="flex space-x-4">
                   <div className="flex items-center text-[10px] font-black text-blue-600 uppercase">
                     <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div> CPU
                   </div>
                   <div className="flex items-center text-[10px] font-black text-indigo-500 uppercase">
                     <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div> RAM
                   </div>
                </div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_TECHNICAL_METRICS}>
                    <defs>
                      <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} unit="%" />
                    <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                    <Area type="monotone" dataKey="cpu" stroke="#1e3a8a" strokeWidth={4} fillOpacity={1} fill="url(#colorCpu)" />
                    <Area type="monotone" dataKey="ram" stroke="#6366f1" strokeWidth={2} fillOpacity={0} strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <div>
                   <h4 className="text-xl font-black text-gray-900 flex items-center">
                     <Network size={20} className="mr-2 text-emerald-600" /> Trafik & Error Rate
                   </h4>
                   <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">System Requests (RPS)</p>
                </div>
                <div className="flex space-x-4">
                   <div className="flex items-center text-[10px] font-black text-emerald-600 uppercase">
                     <div className="w-2 h-2 bg-emerald-600 rounded-full mr-2"></div> Success
                   </div>
                   <div className="flex items-center text-[10px] font-black text-red-500 uppercase">
                     <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div> Errors
                   </div>
                </div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={MOCK_TECHNICAL_METRICS}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} />
                    <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                    <Line type="stepAfter" dataKey="req" stroke="#10b981" strokeWidth={4} dot={false} />
                    <Line type="monotone" dataKey="error" stroke="#ef4444" strokeWidth={2} strokeDasharray="4 4" dot={true} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Exceptions & Errors Section */}
          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
             <div className="flex items-center justify-between mb-8">
                <h4 className="text-xl font-black text-gray-900 flex items-center"><Bug size={24} className="mr-3 text-red-600" /> Exception & Error Stack</h4>
                <button className="text-[10px] font-black text-blue-900 uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-all flex items-center">
                   <RefreshCw size={14} className="mr-2" /> Refresh State
                </button>
             </div>
             <div className="space-y-4">
                {[
                  { time: '14:12:05', code: '500 Internal Error', msg: 'Failed to generate PDF for SPPD-102: Buffer Overflow', module: 'PDF_ENGINE_V2' },
                  { time: '13:45:12', code: '403 Forbidden', msg: 'Unauthorized access attempt to /api/v1/billing/admin-panel', module: 'AUTH_GATEWAY' },
                  { time: '12:05:44', code: 'Memory Warning', msg: 'Database connection pool usage exceeded 90%', module: 'DB_CLUSTER_01' },
                ].map((err, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gray-50 border border-gray-100 rounded-3xl group hover:border-red-200 transition-all">
                    <div className="flex items-start space-x-5">
                       <div className="p-3 bg-red-100 text-red-700 rounded-2xl"><Terminal size={20} /></div>
                       <div>
                          <div className="flex items-center space-x-3">
                             <h5 className="font-black text-gray-900 text-sm uppercase">{err.code}</h5>
                             <span className="text-[9px] font-black bg-gray-200 text-gray-500 px-2 py-0.5 rounded uppercase">{err.module}</span>
                          </div>
                          <p className="text-xs text-gray-500 font-medium mt-1 leading-relaxed italic">"{err.msg}"</p>
                       </div>
                    </div>
                    <div className="text-right mt-4 md:mt-0 flex flex-col items-end">
                       <p className="text-[10px] font-black text-gray-400 uppercase">{err.time}</p>
                       <button className="text-[10px] font-black text-blue-900 uppercase tracking-widest mt-2 hover:underline">Lihat Detail Stack</button>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          {/* Log Controls */}
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
             <div className="flex flex-wrap gap-2">
                {(['ALL', ...Object.values(LogCategory)] as const).map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setLogFilter(cat)}
                    className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                      logFilter === cat 
                      ? 'bg-blue-900 text-white border-blue-900 shadow-lg' 
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
                    placeholder="Cari aktivitas, user, IP..." 
                    className="pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none text-xs font-bold focus:ring-2 focus:ring-blue-900/10 transition-all w-64" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                   />
                </div>
                <button className="p-3 bg-gray-50 text-gray-500 rounded-xl border border-gray-100 hover:text-blue-900 transition-all shadow-sm">
                  <Download size={20} />
                </button>
             </div>
          </div>

          {/* Log Table */}
          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead>
                   <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] bg-gray-50/50 border-b border-gray-100">
                     <th className="px-10 py-6">Timestamp</th>
                     <th className="px-6 py-6">Kategori</th>
                     <th className="px-6 py-6">User & Alamat IP</th>
                     <th className="px-6 py-6">Aksi / Event</th>
                     <th className="px-6 py-6">Detail Ringkas</th>
                     <th className="px-10 py-6 text-right">Status</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                   {filteredLogs.map((log) => (
                     <tr key={log.id} className="group hover:bg-blue-50/30 transition-all duration-300">
                        <td className="px-10 py-7">
                           <div className="flex items-center space-x-3">
                              <div className="w-1.5 h-8 bg-blue-900/10 rounded-full"></div>
                              <div>
                                 <p className="text-xs font-black text-gray-900 leading-none">
                                  {new Date(log.timestamp).toLocaleDateString('id-ID')}
                                 </p>
                                 <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tighter">
                                  {new Date(log.timestamp).toLocaleTimeString('id-ID')} WIB
                                 </p>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-7">
                           <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gray-100 rounded-xl text-[10px] font-black uppercase text-gray-600 border border-gray-200/50">
                             {getLogIcon(log.category)}
                             <span>{log.category.replace('_', ' ')}</span>
                           </div>
                        </td>
                        <td className="px-6 py-7">
                           <p className="text-xs font-black text-gray-900 leading-none">{log.userName}</p>
                           <p className="text-[10px] text-blue-500 font-bold mt-1 tracking-tight">IP: {log.ipAddress}</p>
                        </td>
                        <td className="px-6 py-7">
                           <span className="text-xs font-black text-gray-700">{log.action}</span>
                        </td>
                        <td className="px-6 py-7 max-w-xs">
                           <p className="text-xs text-gray-500 leading-relaxed font-medium line-clamp-2 italic">
                            "{log.details}"
                           </p>
                        </td>
                        <td className="px-10 py-7 text-right">
                           <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(log.status)}`}>
                             {log.status === 'SUCCESS' ? <CheckCircle2 size={10} className="mr-1" /> : <AlertTriangle size={10} className="mr-1" />}
                             {log.status}
                           </span>
                        </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
             <div className="px-10 py-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                   <Clock size={14} className="mr-2" /> Menampilkan {filteredLogs.length} Aktivitas Terbaru
                </div>
                <div className="flex items-center space-x-4">
                   <button className="text-[10px] font-black text-gray-400 uppercase hover:text-blue-900 transition-colors">Sebelumnya</button>
                   <div className="w-px h-4 bg-gray-200"></div>
                   <button className="text-[10px] font-black text-blue-900 uppercase hover:underline">Halaman Berikutnya</button>
                </div>
             </div>
          </div>

          <div className="p-8 bg-blue-900 text-white rounded-[3rem] shadow-xl relative overflow-hidden group">
             <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="max-w-xl">
                   <h4 className="text-2xl font-black mb-3">Retensi Data Audit</h4>
                   <p className="text-blue-100 text-sm leading-relaxed font-medium opacity-80 italic">
                     "Sesuai dengan regulasi keamanan data platform, seluruh log audit akan disimpan secara permanen selama 12 bulan di penyimpanan dingin (Cold Storage) sebelum diarsipkan."
                   </p>
                </div>
                <button className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center justify-center shadow-xl">
                   <ArrowUpRight size={18} className="mr-2" /> Konfigurasi Retensi
                </button>
             </div>
             <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemMonitoringPage;
