
import React from 'react';
import { useAuth } from '../../App';
import { UserRole } from '../../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell, PieChart, Pie, LineChart, Line, Legend
} from 'recharts';
import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Users, 
  Building,
  TrendingUp,
  TrendingDown,
  CreditCard,
  DollarSign,
  Activity,
  ShieldCheck,
  Globe,
  Server,
  Zap
} from 'lucide-react';

const StatCard: React.FC<{ 
  title: string, 
  value: string | number, 
  icon: React.ReactNode, 
  color: string, 
  trend?: { value: string, up: boolean },
  subtitle?: string
}> = ({ title, value, icon, color, trend, subtitle }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color} text-white shadow-lg shadow-current/10`}>
        {icon}
      </div>
      {trend && (
        <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${trend.up ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
          {trend.up ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
          {trend.value}
        </div>
      )}
    </div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</p>
      <h3 className="text-2xl font-black text-gray-900 mt-1">{value}</h3>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  </div>
);

const SystemStatusIndicator: React.FC<{ status: 'Normal' | 'Warning' | 'Down' }> = ({ status }) => {
  const config = {
    Normal: { color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <CheckCircle2 size={14} />, label: 'Operasional' },
    Warning: { color: 'text-amber-600', bg: 'bg-amber-50', icon: <AlertTriangle size={14} />, label: 'Gangguan Ringan' },
    Down: { color: 'text-red-600', bg: 'bg-red-50', icon: <Activity size={14} />, label: 'Sistem Terhenti' }
  };
  const { color, bg, icon, label } = config[status];
  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full border border-current/10 ${color} ${bg} text-[10px] font-black uppercase tracking-wider`}>
      <span className="mr-2">{icon}</span>
      {label}
    </div>
  );
};

// Mock Data Lanjutan
const growthData = [
  { month: 'Jan', instansi: 80, users: 1200, revenue: 120 },
  { month: 'Feb', instansi: 95, users: 1500, revenue: 145 },
  { month: 'Mar', instansi: 110, users: 1800, revenue: 160 },
  { month: 'Apr', instansi: 135, users: 2400, revenue: 210 },
  { month: 'Mei', instansi: 156, users: 3421, revenue: 280 },
  { month: 'Jun', instansi: 178, users: 3900, revenue: 333 },
];

const usageData = [
  { name: 'Minggu 1', sppd: 450, login: 3200 },
  { name: 'Minggu 2', sppd: 520, login: 3800 },
  { name: 'Minggu 3', sppd: 480, login: 3500 },
  { name: 'Minggu 4', sppd: 610, login: 4200 },
];

const instansiStatusData = [
  { name: 'Aktif', value: 98, color: '#10b981' },
  { name: 'Trial', value: 42, color: '#3b82f6' },
  { name: 'Expired', value: 12, color: '#f59e0b' },
  { name: 'Suspended', value: 4, color: '#ef4444' },
];

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const renderSuperAdminDash = () => (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Instansi" 
          value="156" 
          icon={<Building size={24} />} 
          color="bg-blue-900" 
          trend={{ value: '12%', up: true }}
          subtitle="98 Aktif • 42 Trial"
        />
        <StatCard 
          title="Total User Global" 
          value="3.421" 
          icon={<Users size={24} />} 
          color="bg-indigo-600" 
          trend={{ value: '24%', up: true }}
          subtitle="Agregat seluruh tenant"
        />
        <StatCard 
          title="Total SPPD Global" 
          value="15.204" 
          icon={<Briefcase size={24} />} 
          color="bg-emerald-600" 
          trend={{ value: '8%', up: true }}
          subtitle="Bulan ini: 2.105 terbit"
        />
        <StatCard 
          title="Pendapatan (YTD)" 
          value="Rp 1.42M" 
          icon={<DollarSign size={24} />} 
          color="bg-amber-600" 
          trend={{ value: '18%', up: true }}
          subtitle="Target: Rp 2.0M"
        />
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Growth Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-lg font-black text-gray-800">Pertumbuhan Platform</h4>
              <p className="text-xs text-gray-400 font-medium">Monitoring instansi & pendapatan (6 bulan terakhir)</p>
            </div>
            <div className="flex items-center space-x-4">
               <div className="flex items-center">
                 <div className="w-3 h-3 bg-blue-900 rounded-full mr-2"></div>
                 <span className="text-[10px] font-bold text-gray-500 uppercase">Instansi</span>
               </div>
               <div className="flex items-center">
                 <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                 <span className="text-[10px] font-bold text-gray-500 uppercase">Revenue (jt)</span>
               </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorInst" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 700}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="instansi" stroke="#1e3a8a" strokeWidth={3} fillOpacity={1} fill="url(#colorInst)" />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <h4 className="text-lg font-black text-gray-800 mb-6">Status Tenant</h4>
          <div className="flex-1 min-h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={instansiStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {instansiStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-gray-900">156</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Tenant</span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {instansiStatusData.map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-2.5 h-2.5 rounded-full mr-3" style={{backgroundColor: entry.color}}></div>
                  <span className="text-xs font-bold text-gray-600">{entry.name}</span>
                </div>
                <span className="text-xs font-black text-gray-900">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Usage & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Usage Trend */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-lg font-black text-gray-800">Intensitas Penggunaan Sistem</h4>
            <div className="text-xs font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Real-time Traffic
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 700}} />
                <Tooltip 
                  cursor={{fill: '#f9fafb'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="sppd" fill="#1e3a8a" radius={[6, 6, 0, 0]} barSize={30} />
                <Bar dataKey="login" fill="#cbd5e1" radius={[6, 6, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-center space-x-12">
             <div className="flex items-center">
               <div className="w-3 h-3 bg-blue-900 rounded-sm mr-2"></div>
               <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">SPPD Diterbitkan</span>
             </div>
             <div className="flex items-center">
               <div className="w-3 h-3 bg-gray-300 rounded-sm mr-2"></div>
               <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">User Logins</span>
             </div>
          </div>
        </div>

        {/* System Health & Notifications */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Status Infrastruktur</h4>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Server size={18} className="text-gray-400 mr-3" />
                  <span className="text-sm font-bold text-gray-700">Server Cluster</span>
                </div>
                <SystemStatusIndicator status="Normal" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Globe size={18} className="text-gray-400 mr-3" />
                  <span className="text-sm font-bold text-gray-700">Network Latency</span>
                </div>
                <span className="text-xs font-black text-emerald-600">24ms</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ShieldCheck size={18} className="text-gray-400 mr-3" />
                  <span className="text-sm font-bold text-gray-700">Security Scans</span>
                </div>
                <span className="text-[10px] font-black bg-blue-50 text-blue-900 px-2 py-0.5 rounded uppercase">Passed</span>
              </div>
            </div>
            <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
               <div className="flex items-center justify-between mb-2">
                 <span className="text-[10px] font-black text-gray-400 uppercase">Uptime 30 Hari</span>
                 <span className="text-xs font-black text-gray-800">99.98%</span>
               </div>
               <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                 <div className="h-full bg-blue-900 w-[99.98%] rounded-full"></div>
               </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-900 to-blue-900 p-8 rounded-2xl text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <Zap size={24} className="text-amber-400 mb-4" />
              <h4 className="text-lg font-black mb-2">Peringatan Penting</h4>
              <div className="space-y-3 mt-4">
                 <div className="flex items-start space-x-3 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></div>
                    <p className="opacity-80">12 Tenant akan segera berakhir dalam 7 hari kedepan.</p>
                 </div>
                 <div className="flex items-start space-x-3 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></div>
                    <p className="opacity-80">Rencana maintenance rutin Minggu besok pukul 02:00 WIB.</p>
                 </div>
              </div>
              <button className="w-full mt-6 bg-white/10 hover:bg-white/20 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-colors border border-white/10">
                Lihat Semua Notifikasi
              </button>
            </div>
            <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStandardDash = () => (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Pengajuan" value="48" icon={<Briefcase size={24} />} color="bg-blue-900" />
        <StatCard title="Menunggu Persetujuan" value="12" icon={<Clock size={24} />} color="bg-amber-500" />
        <StatCard title="Disetujui" value="32" icon={<CheckCircle2 size={24} />} color="bg-green-600" />
        <StatCard title="Ditolak/Revisi" value="4" icon={<AlertTriangle size={24} />} color="bg-red-600" />
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h4 className="text-lg font-black text-gray-800">Realisasi Anggaran Perjalanan Dinas (Rp)</h4>
            <p className="text-xs text-gray-400 font-medium">Berdasarkan SPPD yang diterbitkan per bulan</p>
          </div>
          <select className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm font-bold text-gray-600 outline-none focus:ring-2 focus:ring-blue-900/10">
            <option>Tahun 2024</option>
            <option>Tahun 2023</option>
          </select>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 700}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 700}} />
              <Tooltip 
                cursor={{fill: '#f9fafb'}}
                formatter={(value: number) => `Rp ${value.toLocaleString('id-ID')}jt`} 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="revenue" fill="#1e3a8a" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Halo, {user?.name}</h2>
          <p className="text-gray-500 font-medium mt-1">
            {user?.role === UserRole.SUPER_ADMIN 
              ? 'Selamat datang di pusat kendali platform E-SIMPerDin.' 
              : 'Berikut ringkasan manajemen perjalanan dinas instansi Anda.'}
          </p>
        </div>
        <div className="flex items-center space-x-3 text-xs font-bold text-gray-400 bg-white px-4 py-2 rounded-xl border border-gray-100">
           <Clock size={14} className="text-blue-900" />
           <span>Terakhir diperbarui: {new Date().toLocaleTimeString('id-ID')} WIB</span>
        </div>
      </div>

      {user?.role === UserRole.SUPER_ADMIN ? renderSuperAdminDash() : renderStandardDash()}
    </div>
  );
};

export default DashboardPage;
