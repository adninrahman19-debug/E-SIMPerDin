
import React from 'react';
import { Users, FileText, Clock, Wallet, ShieldCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', sppd: 45 }, { name: 'Feb', sppd: 52 }, { name: 'Mar', sppd: 48 }, { name: 'Apr', sppd: 61 },
];

const AdminInstansiDashboard = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-3 bg-blue-900 text-white rounded-xl w-fit mb-4"><Users /></div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Pegawai</p>
        <h3 className="text-2xl font-black">24 Akun</h3>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-3 bg-indigo-600 text-white rounded-xl w-fit mb-4"><FileText /></div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">SPPD Bulan Ini</p>
        <h3 className="text-2xl font-black">48 Dok</h3>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-3 bg-amber-500 text-white rounded-xl w-fit mb-4"><Clock /></div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pending Review</p>
        <h3 className="text-2xl font-black text-amber-600">12 Dok</h3>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-3 bg-emerald-600 text-white rounded-xl w-fit mb-4"><Wallet /></div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Biaya Terserap</p>
        <h3 className="text-2xl font-black text-emerald-600">Rp 154Jt</h3>
      </div>
    </div>
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <h4 className="text-xl font-black mb-8">Statistik Dinas</h4>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 700}} />
            <Tooltip />
            <Bar dataKey="sppd" fill="#1e3a8a" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default AdminInstansiDashboard;
