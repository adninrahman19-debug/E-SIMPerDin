
import React from 'react';
import { useAuth } from '../App';
import { UserRole } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area 
} from 'recharts';
import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Users, 
  Building,
  TrendingUp,
  TrendingDown
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

const data = [
  { name: 'Jan', sppd: 12, cost: 4500000 },
  { name: 'Feb', sppd: 19, cost: 8200000 },
  { name: 'Mar', sppd: 15, cost: 6100000 },
  { name: 'Apr', sppd: 22, cost: 11000000 },
  { name: 'Mei', sppd: 30, cost: 15400000 },
  { name: 'Jun', sppd: 25, cost: 12100000 },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const renderSuperAdminDash = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Institusi" value="124" icon={<Building size={24} />} color="bg-blue-600" trend={{ value: '8%', up: true }} />
        <StatCard title="Pengguna Aktif" value="3,421" icon={<Users size={24} />} color="bg-indigo-600" trend={{ value: '12%', up: true }} />
        <StatCard title="Total Transaksi SPPD" value="15,204" icon={<Briefcase size={24} />} color="bg-emerald-600" />
        <StatCard title="Keamanan Sistem" value="99.9%" icon={<CheckCircle2 size={24} />} color="bg-amber-600" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="text-lg font-bold text-gray-800 mb-6">Pertumbuhan Institusi (6 Bulan Terakhir)</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  {/* Fix: removed duplicate x1 attribute */}
                  <linearGradient id="colorSppd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="sppd" stroke="#1e3a8a" fillOpacity={1} fill="url(#colorSppd)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <h4 className="text-lg font-bold text-gray-800 mb-6">Log Aktivitas Sistem</h4>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center space-x-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-900 font-bold">A</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Admin Instansi "Dinas Perhubungan" Terdaftar</p>
                  <p className="text-xs text-gray-500">2 menit yang lalu</p>
                </div>
              </div>
            ))}
          </div>
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
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
              <Tooltip formatter={(value: number) => `Rp ${value.toLocaleString('id-ID')}`} />
              <Bar dataKey="cost" fill="#1e3a8a" radius={[4, 4, 0, 0]} barSize={40} />
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

export default Dashboard;
