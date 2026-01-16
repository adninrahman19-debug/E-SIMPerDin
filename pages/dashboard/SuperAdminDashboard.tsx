
import React, { useState } from 'react';
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
  Clock,
  AlertTriangle,
  CheckCircle2,
  Bell,
  HardDrive,
  Cpu
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  LineChart,
  Line,
  Cell
} from 'recharts';

// Mock Data for Global Overview
const dataGrowth = [
  { month: 'Jan', tenants: 80, users: 1200, sppd: 4200 }, 
  { month: 'Feb', tenants: 95, users: 1500, sppd: 5800 }, 
  { month: 'Mar', tenants: 110, users: 1800, sppd: 6100 },
  { month: 'Apr', tenants: 135, users: 2400, sppd: 9500 }, 
  { month: 'Mei', tenants: 156, users: 3421, sppd: 15204 }, 
];

const dataRevenue = [
  { month: 'Jan', amount: 420 }, { month: 'Feb', amount: 580 }, 
  { month: 'Mar', amount: 710 }, { month: 'Apr', amount: 950 }, 
  { month: 'Mei', amount: 1420 },
];

const StatCard = ({ title, value, icon: Icon, color, subText, trend }: any) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-6">
        <div className={`p-4 rounded-2xl ${color} text-white shadow-lg`}>
          <Icon size={28} />
        </div>
        {trend && (
          <div className={`flex items-center px-2 py-1 rounded-lg text-[10px] font-black ${trend.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
            {trend.up ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
            {trend.val}
          </div>
        )}
      </div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{title}</p>
      <h3 className="text-3xl font-black text-gray-900 leading-none">{value}</h3>
      <div className="mt-4 pt-4 border-t border-gray-50">
        <p className="text-[10px] font-bold text-gray-500 uppercase leading-relaxed">{subText}</p>
      </div>
    </div>
    <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
      <Icon size={120} />
    </div>
  </div>
);

const SuperAdminDashboard = () => {
  const [activeChart, setActiveChart] = useState<'GROWTH' | 'REVENUE'>('GROWTH');

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      {/* 1. KPI Cluster (Top Matrix) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Instansi Terdaftar" 
          value="156" 
          icon={Building2} 
          color="bg-blue-900" 
          subText="148 Aktif • 8 Trial • 0 Expired"
          trend={{ up: true, val: "12.5%" }}
        />
        <StatCard 
          title="User Global" 
          value="3,421" 
          icon={Users} 
          color="bg-indigo-600" 
          subText="84% Login aktif dalam 7 hari"
          trend={{ up: true, val: "8.2%" }}
        />
        <StatCard 
          title="Total SPPD Global" 
          value="15,204" 
          icon={Briefcase} 
          color="bg-emerald-600" 
          subText="Agregat dokumen seluruh tenant"
          trend={{ up: true, val: "24.1%" }}
        />
        <StatCard 
          title="Pendapatan Bulanan" 
          value="Rp 1.42 M" 
          icon={DollarSign} 
          color="bg-amber-600" 
          subText="Proyeksi Tahunan: Rp 16.4 M"
          trend={{ up: true, val: "15.0%" }}
        />
      </div>

      {/* 2. System Status & Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Charts Area */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
             <div>
                <h4 className="text-2xl font-black text-gray-900 tracking-tight">Performa Platform</h4>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Data Agregat 5 Bulan Terakhir</p>
             </div>
             <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-200">
                <button 
                  onClick={() => setActiveChart('GROWTH')}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeChart === 'GROWTH' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-400 hover:text-blue-900'}`}
                >
                  Tenants & Users
                </button>
                <button 
                  onClick={() => setActiveChart('REVENUE')}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeChart === 'REVENUE' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-400 hover:text-blue-900'}`}
                >
                  Revenue Trends
                </button>
             </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {activeChart === 'GROWTH' ? (
                <AreaChart data={dataGrowth}>
                  <defs>
                    <linearGradient id="colorTenants" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 700}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 700}} />
                  <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                  <Area type="monotone" dataKey="tenants" stroke="#1e3a8a" strokeWidth={4} fillOpacity={1} fill="url(#colorTenants)" />
                  <Area type="monotone" dataKey="users" stroke="#4f46e5" strokeWidth={2} fillOpacity={0} strokeDasharray="5 5" />
                </AreaChart>
              ) : (
                <BarChart data={dataRevenue}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 700}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 700}} />
                  <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                  <Bar dataKey="amount" fill="#1e3a8a" radius={[10, 10, 0, 0]} barSize={40} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Health Sidebar */}
        <div className="space-y-6">
          <div className="bg-gray-900 text-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                  <Server size={32} className="text-blue-400" />
                </div>
                <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30">
                  <CheckCircle2 size={12} />
                  <span className="text-[10px] font-black uppercase">Normal</span>
                </div>
              </div>
              <h4 className="text-2xl font-black mb-2 tracking-tight">System Status</h4>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-8">Uptime: 99.98% (30D)</p>
              
              <div className="space-y-6">
                 <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase">
                       <span className="text-gray-400">API Latency</span>
                       <span className="text-emerald-400">42ms</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 w-[15%]"></div>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase">
                       <span className="text-gray-400">DB Load</span>
                       <span className="text-blue-400">24%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-500 w-[24%]"></div>
                    </div>
                 </div>
              </div>

              <button className="w-full mt-10 bg-white/10 border border-white/10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center">
                 <Activity size={16} className="mr-2" /> Monitor Vitals
              </button>
            </div>
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
             <div className="flex items-center space-x-3 mb-6">
                <ShieldCheck className="text-blue-900" size={24} />
                <h5 className="text-sm font-black text-gray-900 uppercase">Security Audit</h5>
             </div>
             <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                   <span className="text-[10px] font-bold text-gray-500 uppercase">Login Attempts</span>
                   <span className="text-xs font-black text-gray-900">1,242</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                   <span className="text-[10px] font-bold text-gray-500 uppercase">Blocked Attack</span>
                   <span className="text-xs font-black text-emerald-600">0 Active</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* 3. Global Usage & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Usage Trend */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-xl font-black text-gray-900 flex items-center">
              <Zap size={20} className="mr-2 text-blue-900" /> Penggunaan Sistem Global
            </h4>
            <div className="flex items-center space-x-2">
               <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
               <span className="text-[10px] font-black text-gray-400 uppercase">Live Processing</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataGrowth}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} dy={10} />
                <Tooltip contentStyle={{borderRadius: '20px', border: 'none'}} />
                <Line type="monotone" dataKey="sppd" stroke="#10b981" strokeWidth={4} dot={{r: 6, fill: '#10b981', strokeWidth: 3, stroke: '#fff'}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-6">
             <div className="text-center">
                <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Avg Request/Sec</p>
                <p className="text-lg font-black text-gray-900">142</p>
             </div>
             <div className="text-center">
                <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Total Payload</p>
                <p className="text-lg font-black text-gray-900">4.2 TB</p>
             </div>
             <div className="text-center">
                <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Active DB Conn</p>
                <p className="text-lg font-black text-gray-900">1,024</p>
             </div>
          </div>
        </div>

        {/* System Notifications */}
        <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-lg font-black text-gray-900 flex items-center">
              <Bell size={20} className="mr-2 text-amber-500" /> System Alerts
            </h4>
            <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">3 Urgent</span>
          </div>
          
          <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-1">
            <div className="p-5 bg-red-50 border border-red-100 rounded-2xl group cursor-pointer hover:bg-red-100 transition-all">
               <div className="flex items-start space-x-3">
                  <AlertTriangle size={18} className="text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-black text-red-900 leading-tight">Backup Database Gagal</p>
                    <p className="text-[10px] text-red-700 mt-1 font-bold uppercase tracking-tighter">10 Menit yang lalu • Error S3-403</p>
                  </div>
               </div>
            </div>
            
            <div className="p-5 bg-amber-50 border border-amber-100 rounded-2xl group cursor-pointer hover:bg-amber-100 transition-all">
               <div className="flex items-start space-x-3">
                  <Clock size={18} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-black text-amber-900 leading-tight">12 Billing Verification Pending</p>
                    <p className="text-[10px] text-amber-700 mt-1 font-bold uppercase tracking-tighter">Instansi: Dishub Prov, Kemenkumham...</p>
                  </div>
               </div>
            </div>

            <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl group cursor-pointer hover:bg-blue-100 transition-all">
               <div className="flex items-start space-x-3">
                  <Zap size={18} className="text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-black text-blue-900 leading-tight">Patch Keamanan v2.5.2 Deploy</p>
                    <p className="text-[10px] text-blue-700 mt-1 font-bold uppercase tracking-tighter">Hari ini, 08:00 WIB • Success</p>
                  </div>
               </div>
            </div>
          </div>

          <button className="w-full mt-8 py-3 text-[10px] font-black text-blue-900 uppercase tracking-[0.2em] border border-blue-900/10 rounded-xl hover:bg-blue-50 transition-all">
             Lihat Semua Log Notifikasi
          </button>
        </div>

      </div>
    </div>
  );
};

export default SuperAdminDashboard;
