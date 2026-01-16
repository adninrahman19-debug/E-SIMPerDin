
import React from 'react';
import { useAuth } from '../../App';
import { MOCK_USERS, MOCK_PLANS } from '../../constants';
// Added missing 'Settings' import to fix the error on line 287
import { 
  Users, 
  FileText, 
  Clock, 
  Wallet, 
  ShieldCheck, 
  TrendingUp, 
  Calendar, 
  Zap, 
  AlertTriangle,
  Bell,
  ChevronRight,
  Info,
  ArrowUpRight,
  Activity,
  CreditCard,
  Briefcase,
  Settings
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell, PieChart, Pie 
} from 'recharts';

const dataPerformance = [
  { name: 'Jan', sppd: 32, cost: 42000000 },
  { name: 'Feb', sppd: 45, cost: 58000000 },
  { name: 'Mar', sppd: 38, cost: 49000000 },
  { name: 'Apr', sppd: 51, cost: 72000000 },
  { name: 'Mei', sppd: 48, cost: 65000000 },
  { name: 'Jun', sppd: 42, cost: 55000000 },
];

const StatCard = ({ title, value, icon: Icon, color, subText, trend }: any) => (
  <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-2xl ${color} text-white shadow-lg`}>
        <Icon size={24} />
      </div>
      {trend && (
        <div className={`flex items-center px-2 py-1 rounded-lg text-[10px] font-black ${trend.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
          {trend.up ? <TrendingUp size={14} className="mr-1" /> : <Activity size={14} className="mr-1" />}
          {trend.val}
        </div>
      )}
    </div>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1">{title}</p>
    <h3 className="text-2xl font-black text-gray-900 leading-none">{value}</h3>
    <p className="text-[10px] font-bold text-gray-400 mt-3 uppercase tracking-tighter">{subText}</p>
  </div>
);

const AdminInstansiDashboard: React.FC = () => {
  const { user, subscription } = useAuth();
  
  const currentPlan = MOCK_PLANS.find(p => p.id === subscription?.planId) || MOCK_PLANS[1];
  const institutionUsers = MOCK_USERS.filter(u => u.institutionId === user?.institutionId);

  // Hitung sisa hari (mock)
  const remainingDays = 214; 

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* 1. KPI Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Pegawai" 
          value={`${institutionUsers.length} Akun`}
          icon={Users} 
          color="bg-blue-900" 
          subText="84% Akun Aktif Sistem"
          trend={{ up: true, val: "2 Baru" }}
        />
        <StatCard 
          title="SPPD Bulan Ini" 
          value="48 Dokumen" 
          icon={FileText} 
          color="bg-indigo-600" 
          subText="Mei 2024"
          trend={{ up: true, val: "12%" }}
        />
        <StatCard 
          title="Menunggu Review" 
          value="12 Pengajuan" 
          icon={Clock} 
          color="bg-amber-500" 
          subText="Antrean Approval"
        />
        <StatCard 
          title="Total Biaya (YTD)" 
          value="Rp 284.5 Jt" 
          icon={Wallet} 
          color="bg-emerald-600" 
          subText="Serapan Pagu Anggaran"
          trend={{ up: false, val: "Budget Safe" }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 2. Main Analytics Charts */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
             <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                <div>
                  <h4 className="text-xl font-black text-gray-900">Analisis Perjalanan Dinas</h4>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Frekuensi vs Realisasi Biaya</p>
                </div>
                <div className="flex items-center space-x-3 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                   <div className="flex items-center px-3 py-1 bg-white rounded-lg shadow-sm border border-gray-100 text-[10px] font-black text-blue-900 uppercase">
                      <div className="w-2 h-2 bg-blue-900 rounded-full mr-2"></div> SPPD
                   </div>
                   <div className="flex items-center px-3 py-1 text-[10px] font-black text-gray-400 uppercase">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div> BIAYA
                   </div>
                </div>
             </div>
             <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={dataPerformance}>
                      <defs>
                        <linearGradient id="colorSppd" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} />
                      <Tooltip 
                        contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}}
                        formatter={(value: any, name: string) => name === 'cost' ? [`Rp ${value.toLocaleString()}`, 'Biaya'] : [value, 'Total SPPD']}
                      />
                      <Area type="monotone" dataKey="sppd" stroke="#1e3a8a" strokeWidth={4} fillOpacity={1} fill="url(#colorSppd)" />
                      <Area type="monotone" dataKey="cost" stroke="#10b981" strokeWidth={2} fillOpacity={0} strokeDasharray="5 5" />
                   </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-6">
                   <h5 className="font-black text-gray-900 uppercase text-xs tracking-widest">Kepatuhan SBM</h5>
                   <ShieldCheck className="text-emerald-500" size={20} />
                </div>
                <div className="flex items-end justify-between">
                   <div className="space-y-1">
                      <p className="text-3xl font-black text-gray-900">98.2%</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Input Sesuai Standar</p>
                   </div>
                   <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center border-4 border-white shadow-inner">
                      <Zap size={24} className="text-emerald-600" />
                   </div>
                </div>
             </div>
             <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-6">
                   <h5 className="font-black text-gray-900 uppercase text-xs tracking-widest">Waktu Approval</h5>
                   <Clock className="text-blue-900" size={20} />
                </div>
                <div className="flex items-end justify-between">
                   <div className="space-y-1">
                      <p className="text-3xl font-black text-gray-900">4.2 Jam</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Rerata Persetujuan</p>
                   </div>
                   <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center border-4 border-white shadow-inner">
                      <TrendingUp size={24} className="text-blue-900" />
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* 3. Subscription & Sidebar Info */}
        <div className="space-y-8">
          {/* Subscription Status Card */}
          <div className="bg-gray-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                 <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                    <CreditCard size={32} className="text-amber-400" />
                 </div>
                 <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {subscription?.status || 'AKTIF'}
                 </span>
              </div>
              <h4 className="text-2xl font-black mb-1 tracking-tight">{currentPlan.name} Plan</h4>
              <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-10">Paket Layanan Institusi</p>
              
              <div className="space-y-6">
                 <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                       <span className="text-gray-400">Sisa Masa Aktif</span>
                       <span className="text-amber-400">{remainingDays} Hari Lagi</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-amber-500 w-[65%]"></div>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                       <span className="text-gray-400">Quota User</span>
                       <span className="text-blue-400">{institutionUsers.length} / {currentPlan.userLimit}</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-500 w-[40%]"></div>
                    </div>
                 </div>
              </div>

              <button className="w-full mt-10 py-4 bg-white text-blue-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl flex items-center justify-center">
                 Tingkatkan Paket <ArrowUpRight size={16} className="ml-2" />
              </button>
            </div>
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
          </div>

          {/* System Notifications Feed */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h5 className="font-black text-gray-900 uppercase text-xs tracking-widest flex items-center">
                  <Bell className="mr-2 text-blue-900" size={18} /> Notifikasi Sistem
               </h5>
               <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            </div>
            
            <div className="space-y-4">
               <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl group cursor-pointer hover:bg-blue-100 transition-all">
                  <div className="flex items-start space-x-3">
                     <AlertTriangle size={16} className="text-blue-600 shrink-0 mt-0.5" />
                     <div>
                        <p className="text-xs font-black text-blue-900">Update SBM 2024</p>
                        <p className="text-[10px] text-blue-700 font-bold uppercase mt-1">Hari ini, 09:00 • Sistem</p>
                     </div>
                  </div>
               </div>
               <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl group cursor-pointer hover:bg-white hover:border-blue-900/20 transition-all">
                  <div className="flex items-start space-x-3">
                     <Zap size={16} className="text-amber-500 shrink-0 mt-0.5" />
                     <div>
                        <p className="text-xs font-black text-gray-800">Maintenance Server</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">19 Mei 2024 • 00:00 WIB</p>
                     </div>
                  </div>
               </div>
               <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl group cursor-pointer hover:bg-white hover:border-blue-900/20 transition-all">
                  <div className="flex items-start space-x-3">
                     <Info size={16} className="text-gray-400 shrink-0 mt-0.5" />
                     <div>
                        <p className="text-xs font-black text-gray-800">Template SPPD v3.2 Ready</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Kemarin • Super Admin</p>
                     </div>
                  </div>
               </div>
            </div>

            <button className="w-full mt-6 py-3 text-[9px] font-black text-blue-900 uppercase tracking-widest border border-blue-900/10 rounded-xl hover:bg-blue-50 transition-all">
               Lihat Semua Pengumuman
            </button>
          </div>
        </div>

      </div>

      {/* 4. Quick Quick Actions Bottom */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-900/20 transition-all cursor-pointer">
            <div className="flex items-center space-x-5">
               <div className="w-12 h-12 bg-gray-50 text-blue-900 rounded-2xl flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition-all">
                  <Briefcase size={24} />
               </div>
               <div>
                  <h6 className="font-black text-gray-900">Master Data SBM</h6>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Update Plafon Biaya</p>
               </div>
            </div>
            <ChevronRight size={20} className="text-gray-300 group-hover:text-blue-900 group-hover:translate-x-1 transition-all" />
         </div>
         <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-900/20 transition-all cursor-pointer">
            <div className="flex items-center space-x-5">
               <div className="w-12 h-12 bg-gray-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <Settings size={24} />
               </div>
               <div>
                  <h6 className="font-black text-gray-900">Konfigurasi Alur</h6>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Setting Hirarki Approval</p>
               </div>
            </div>
            <ChevronRight size={20} className="text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
         </div>
         <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-900/20 transition-all cursor-pointer">
            <div className="flex items-center space-x-5">
               <div className="w-12 h-12 bg-gray-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <ShieldCheck size={24} />
               </div>
               <div>
                  <h6 className="font-black text-gray-900">Audit Log Unit</h6>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Monitor Jejak Digital</p>
               </div>
            </div>
            <ChevronRight size={20} className="text-gray-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
         </div>
      </div>
    </div>
  );
};

export default AdminInstansiDashboard;
