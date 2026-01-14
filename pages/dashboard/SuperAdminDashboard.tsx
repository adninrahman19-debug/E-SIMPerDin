
import React from 'react';
import { Building, Users, Briefcase, DollarSign, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', instansi: 80 }, { month: 'Feb', instansi: 95 }, { month: 'Mar', instansi: 110 },
  { month: 'Apr', instansi: 135 }, { month: 'Mei', instansi: 156 }, { month: 'Jun', instansi: 178 },
];

const SuperAdminDashboard = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-3 bg-blue-900 text-white rounded-xl w-fit mb-4"><Building /></div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Instansi Aktif</p>
        <h3 className="text-2xl font-black">156 Tenant</h3>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-3 bg-indigo-600 text-white rounded-xl w-fit mb-4"><Users /></div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">User Global</p>
        <h3 className="text-2xl font-black">3,421 Akun</h3>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-3 bg-emerald-600 text-white rounded-xl w-fit mb-4"><Briefcase /></div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total SPPD</p>
        <h3 className="text-2xl font-black">15,204 Dok</h3>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-3 bg-amber-600 text-white rounded-xl w-fit mb-4"><DollarSign /></div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Revenue YTD</p>
        <h3 className="text-2xl font-black">Rp 1.42 M</h3>
      </div>
    </div>
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <h4 className="text-xl font-black mb-8">Pertumbuhan Platform</h4>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 700}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 700}} />
            <Tooltip />
            <Area type="monotone" dataKey="instansi" stroke="#1e3a8a" fill="#1e3a8a" fillOpacity={0.1} strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default SuperAdminDashboard;
