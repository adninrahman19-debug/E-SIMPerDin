
import React from 'react';
import { 
  Building2, 
  Users, 
  Briefcase, 
  DollarSign, 
  Zap, 
  Activity, 
  ShieldCheck, 
  TrendingUp,
  Server,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const dataGrowth = [
  { month: 'Jan', revenue: 420, tenants: 80 }, 
  { month: 'Feb', revenue: 580, tenants: 95 }, 
  { month: 'Mar', revenue: 710, tenants: 110 },
  { month: 'Apr', revenue: 950, tenants: 135 }, 
  { month: 'Mei', revenue: 1240, tenants: 156 }, 
  { month: 'Jun', revenue: 1420, tenants: 178 },
];

const StatCard = ({ title, value, icon: Icon, color, trend, subValue }: { title: string, value: string, icon: any, color: string, trend?: { up: boolean, val: string }, subValue?: string }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-2xl ${color} text-white shadow-lg`}>
        <Icon size={24} />
      </div>
      {trend && (
        <div className={`flex items-center px-2 py-1 rounded-lg text-[10px] font-black ${trend.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
          {trend.up ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
          {trend.val}
        </div>
      )}
    </div>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
    <h3 className="text-2xl font-black text-gray-900">{value}</h3>
    {subValue && <p className="text-[10px] font-bold text-blue-600 uppercase mt-1">{subValue}</p>}
  </div>
);

const SuperAdminDashboard = () => (
  <div className="space-y-8 animate-in fade-in duration-700">
    {/* Top Row: Core Metrics */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Instansi Aktif" value="156" icon={Building2} color="bg-blue-900" trend={{ up: true, val: "12%" }} subValue="8 Trial, 148 Active" />
      <StatCard title="User Global" value="3,421" icon={Users} color="bg-indigo-600" trend={{ up: true, val: "8%" }} subValue="Across all tenants" />
      <StatCard title="Total SPPD" value="15,204" icon={Briefcase} color="bg-emerald-600" trend={{ up: true, val: "24%" }} subValue="Lifetime processed" />
      <StatCard title="Revenue Platform" value="Rp 1.42 M" icon={DollarSign} color="bg-amber-600" trend={{ up: true, val: "15%" }} subValue="Year-to-date" />
    </div>

    {/* Middle Row: Technical & Health */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden relative">
        <div className="flex items-center justify-between mb-8">
           <div>
              <h4 className="text-xl font-black text-gray-900">Pertumbuhan & Pendapatan</h4>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Growth Index 6 Bulan Terakhir</p>
           </div>
           <div className="flex items-center space-x-4">
              <div className="flex items-center text-[10px] font-black text-blue-900 uppercase">
                 <div className="w-2.5 h-2.5 bg-blue-900 rounded-full mr-1.5"></div> Revenue
              </div>
              <div className="flex items-center text-[10px] font-black text-indigo-400 uppercase">
                 <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full mr-1.5"></div> Tenants
              </div>
           </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dataGrowth}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 700}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 700}} />
              <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
              <Area type="monotone" dataKey="revenue" stroke="#1e3a8a" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
              <Area type="monotone" dataKey="tenants" stroke="#818cf8" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-6">
         <div className="bg-blue-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
               <div className="flex items-center justify-between mb-6">
                  <Server size={32} className="text-blue-300" />
                  <div className="px-3 py-1 bg-emerald-500 rounded-full text-[8px] font-black uppercase">Service Online</div>
               </div>
               <h4 className="text-2xl font-black mb-2 tracking-tight">System Health</h4>
               <p className="text-blue-100 text-[10px] font-bold uppercase leading-relaxed tracking-tight opacity-80 mb-6">
                 API Uptime: 99.98%<br/>Database Nodes: 3 Active<br/>Load Balancer: Optimal
               </p>
               <button className="w-full bg-white/10 text-white border border-white/20 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center">
                  <Activity size={16} className="mr-2" /> Cek Vitals
               </button>
            </div>
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
         </div>

         <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
               <ShieldCheck className="text-amber-500" size={24} />
               <h5 className="text-sm font-black text-gray-900 uppercase">Audit Keamanan</h5>
            </div>
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Login Attempts (1h)</span>
                  <span className="text-xs font-black text-gray-900">1,242</span>
               </div>
               <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Blocked Attacks</span>
                  <span className="text-xs font-black text-red-600">0</span>
               </div>
               <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[100%]"></div>
               </div>
            </div>
         </div>
      </div>
    </div>

    {/* Bottom Row: Recent Activities & Alerts */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm lg:col-span-1 flex flex-col">
          <div className="flex items-center justify-between mb-8">
             <h4 className="text-lg font-black text-gray-900 flex items-center">
                <Clock size={20} className="mr-2 text-blue-900" /> Antrean Billing
             </h4>
             <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[9px] font-black uppercase">12 Pending</span>
          </div>
          <div className="space-y-4 flex-1">
             {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group hover:bg-white transition-all border border-transparent hover:border-gray-100">
                   <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center font-black text-blue-900 text-xs">TRX</div>
                      <div>
                         <p className="text-xs font-black text-gray-900 leading-none">Dinas Kelautan Prov</p>
                         <p className="text-[9px] text-gray-400 font-bold uppercase mt-1">Rp 3.500.000</p>
                      </div>
                   </div>
                   <button className="p-2 text-gray-400 group-hover:text-blue-900 transition-all"><ArrowUpRight size={18} /></button>
                </div>
             ))}
          </div>
       </div>

       <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm lg:col-span-2 overflow-hidden">
          <div className="flex items-center justify-between mb-8">
             <h4 className="text-lg font-black text-gray-900 flex items-center">
                <Globe size={20} className="mr-2 text-blue-900" /> System Broadcast Log
             </h4>
             <button className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline">Lihat Semua</button>
          </div>
          <div className="space-y-6">
             {[
               { title: 'Maintenance Server Rutin', date: '20 Mei 2024', target: 'ALL' },
               { title: 'Update Modul Gemini AI v2', date: '18 Mei 2024', target: 'PRO ONLY' },
               { title: 'Patch Keamanan Billing Gateway', date: '15 Mei 2024', target: 'ADMINS' }
             ].map((log, i) => (
                <div key={i} className="flex items-center justify-between pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                   <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 rounded-full bg-blue-900"></div>
                      <div>
                         <p className="text-sm font-bold text-gray-800">{log.title}</p>
                         <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{log.date} • Target: {log.target}</p>
                      </div>
                   </div>
                   <div className="flex items-center text-[10px] font-black text-emerald-600 uppercase">
                      <Zap size={12} className="mr-1" /> Sent
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  </div>
);

export default SuperAdminDashboard;
