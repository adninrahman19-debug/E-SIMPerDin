
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { BarChart3, Download, Printer, Table as TableIcon, Calendar, Search, Filter, Clock, AlertCircle, PieChart as PieIcon, TrendingUp } from 'lucide-react';

const dataMonthly = [
  { name: 'Jan', cost: 12400000 }, { name: 'Feb', cost: 15600000 }, { name: 'Mar', cost: 9800000 }, 
  { name: 'Apr', cost: 24500000 }, { name: 'Mei', cost: 18200000 }, { name: 'Jun', cost: 14000000 },
];

const dataDist = [
  { name: 'Dinas Luar Kota', value: 45 }, { name: 'Dalam Provinsi', value: 30 }, { name: 'Luar Negeri', value: 5 }, { name: 'Lainnya', value: 20 }
];

const COLORS = ['#1e3a8a', '#4f46e5', '#f59e0b', '#9ca3af'];

const ReportsPage = () => {
  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Analytical & Financial Reports</h2>
          <p className="text-gray-500 text-sm font-medium">Monitoring realisasi anggaran dan frekuensi perjalanan dinas instansi.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white border border-gray-200 text-emerald-700 px-5 py-2.5 rounded-xl font-bold text-sm flex items-center space-x-2"><TableIcon size={18} /><span>Excel</span></button>
          <button className="bg-blue-900 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center space-x-2 shadow-lg"><Printer size={18} /><span>Cetak PDF</span></button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Total SPPD</p>
          <h3 className="text-4xl font-black text-gray-900">48 <span className="text-xs text-gray-400 font-bold">Dok</span></h3>
          <BarChart3 size={60} className="absolute -right-4 -bottom-4 text-gray-50 group-hover:text-blue-50 transition-colors" />
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Realisasi Dana</p>
          <h3 className="text-4xl font-black text-blue-900">96.5<span className="text-sm font-bold">Jt</span></h3>
          <TrendingUp size={60} className="absolute -right-4 -bottom-4 text-gray-50 group-hover:text-emerald-50 transition-colors" />
        </div>
        <div className="md:col-span-2 bg-blue-900 p-8 rounded-[2.5rem] text-white shadow-xl flex items-center justify-between">
           <div>
              <p className="text-[10px] font-black uppercase opacity-70 mb-2">Budget Health</p>
              <h3 className="text-2xl font-black">Under Control</h3>
              <p className="text-xs font-bold text-blue-200 mt-2">Serapan 38% dari total pagu tahunan</p>
           </div>
           <div className="h-16 w-32 bg-white/10 rounded-xl border border-white/10"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
         <div className="lg:col-span-2 bg-white rounded-[3rem] border border-gray-100 shadow-sm p-10">
            <div className="flex items-center justify-between mb-10">
               <h4 className="text-xl font-black text-gray-900">Pengeluaran Bulanan</h4>
               <select className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-xs font-bold outline-none">
                  <option>Semester 1 - 2024</option>
                  <option>Tahun 2023</option>
               </select>
            </div>
            <div className="h-80">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataMonthly}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 700}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 700}} />
                    <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                    <Bar dataKey="cost" fill="#1e3a8a" radius={[6, 6, 0, 0]} barSize={40} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-10 flex flex-col">
            <h4 className="text-xl font-black text-gray-900 mb-8">Distribusi Tugas</h4>
            <div className="flex-1 h-64">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={dataDist} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                       {dataDist.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                       ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
               </ResponsiveContainer>
            </div>
            <div className="space-y-3 mt-4">
               {dataDist.map((item, i) => (
                 <div key={i} className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                    <div className="flex items-center space-x-2">
                       <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[i % COLORS.length]}}></div>
                       <span>{item.name}</span>
                    </div>
                    <span className="text-gray-900 font-black">{item.value}%</span>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default ReportsPage;
