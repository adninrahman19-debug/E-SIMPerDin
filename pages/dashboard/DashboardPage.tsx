
import React from 'react';
import { useAuth } from '../../App';
import { UserRole } from '../../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell, PieChart, Pie
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
  DollarSign
} from 'lucide-react';

const StatCard: React.FC<{ title: string, value: string | number, icon: React.ReactNode, color: string, trend?: { value: string, up: boolean } }> = ({ title, value, icon, color, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-lg ${color} text-white`}>
        {icon}
      </div>
      {trend && (
        <div className={`flex items-center text-sm font-medium ${trend.up ? 'text-green-600' : 'text-red-600'}`}>
          {trend.up ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
          {trend.value}
        </div>
      )}
    </div>
    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
    <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
  </div>
);

const revenueData = [
  { name: 'Jan', revenue: 45000000 },
  { name: 'Feb', revenue: 52000000 },
  { name: 'Mar', revenue: 48000000 },
  { name: 'Apr', revenue: 61000000 },
  { name: 'Mei', revenue: 85000000 },
  { name: 'Jun', revenue: 92000000 },
];

const planDistribution = [
  { name: 'Basic', value: 45 },
  { name: 'Professional', value: 35 },
  { name: 'Enterprise', value: 20 },
];

const COLORS = ['#1e3a8a', '#3b82f6', '#10b981'];

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const renderSuperAdminDash = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Estimasi Pendapatan" value="Rp 333,4 JT" icon={<DollarSign size={24} />} color="bg-emerald-600" trend={{ value: '15%', up: true }} />
        <StatCard title="Langganan Aktif" value="124" icon={<CreditCard size={24} />} color="bg-blue-600" trend={{ value: '8%', up: true }} />
        <StatCard title="Total Institusi" value="156" icon={<Building size={24} />} color="bg-indigo-600" />
        <StatCard title="Pengguna Aktif" value="3,421" icon={<Users size={24} />} color="bg-amber-600" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-lg font-bold text-gray-800">Tren Pendapatan Bulanan (IDR)</h4>
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              <TrendingUp size={14} />
              <span>+24.5% vs Semester Lalu</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} tickFormatter={(value) => `Rp${value/1000000}jt`} />
                <Tooltip formatter={(value: number) => `Rp ${value.toLocaleString('id-ID')}`} />
                <Area type="monotone" dataKey="revenue" stroke="#1e3a8a" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="text-lg font-bold text-gray-800 mb-8">Distribusi Paket</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={planDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {planDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
            {planDistribution.map((entry, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-3" style={{backgroundColor: COLORS[index]}}></div>
                  <span className="text-sm font-medium text-gray-600">{entry.name}</span>
                </div>
                <span className="text-sm font-bold">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h4 className="text-lg font-bold text-gray-800">Langganan Segera Berakhir</h4>
          <button className="text-blue-900 text-sm font-bold hover:underline">Lihat Semua</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-[10px] text-gray-500 uppercase font-bold tracking-widest">
              <tr>
                <th className="px-6 py-4">Institusi</th>
                <th className="px-6 py-4">Paket</th>
                <th className="px-6 py-4">Tgl Berakhir</th>
                <th className="px-6 py-4">Sisa Hari</th>
                <th className="px-6 py-4">Status Tagihan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {[1, 2, 3].map((i) => (
                <tr key={i} className="hover:bg-blue-50/10 transition-all">
                  <td className="px-6 py-4 font-bold text-gray-900">Dinas Kesehatan Kab. {i}</td>
                  <td className="px-6 py-4 text-blue-900 font-medium">Professional</td>
                  <td className="px-6 py-4 text-gray-500">20 Mei 2024</td>
                  <td className="px-6 py-4">
                    <span className="text-red-600 font-bold bg-red-50 px-2 py-1 rounded">3 Hari</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded">Menunggu Bukti Bayar</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderStandardDash = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Pengajuan" value="48" icon={<Briefcase size={24} />} color="bg-blue-900" />
        <StatCard title="Menunggu Persetujuan" value="12" icon={<Clock size={24} />} color="bg-amber-500" />
        <StatCard title="Disetujui" value="32" icon={<CheckCircle2 size={24} />} color="bg-green-600" />
        <StatCard title="Ditolak/Revisi" value="4" icon={<AlertTriangle size={24} />} color="bg-red-600" />
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-bold text-gray-800">Realisasi Anggaran Perjalanan Dinas (Rp)</h4>
          <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 text-sm outline-none">
            <option>Tahun 2024</option>
            <option>Tahun 2023</option>
          </select>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
              <Tooltip formatter={(value: number) => `Rp ${value.toLocaleString('id-ID')}`} />
              <Bar dataKey="revenue" fill="#1e3a8a" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Halo, {user?.name}</h2>
        <p className="text-gray-500">Berikut ringkasan manajemen sistem perjalanan dinas hari ini.</p>
      </div>
      {user?.role === UserRole.SUPER_ADMIN ? renderSuperAdminDash() : renderStandardDash()}
    </div>
  );
};

export default DashboardPage;
