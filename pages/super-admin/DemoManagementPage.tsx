
import React, { useState } from 'react';
import { MOCK_DEMO_SESSIONS, MOCK_DEMO_USAGE } from '../../constants';
import { Zap, Play, Target, Clock, Users, Trash2, RefreshCw, BarChart3, ShieldCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DemoManagementPage: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Sales & Demo Center</h2>
          <p className="text-gray-500 text-sm font-medium">Pembuatan sandbox instansi untuk kebutuhan presentasi dan pemasaran.</p>
        </div>
        <button className="bg-blue-900 text-white px-6 py-3 rounded-xl flex items-center space-x-2 font-bold shadow-lg">
          <Zap size={18} />
          <span>Generate New Suite</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
              <h4 className="font-black text-lg text-gray-900 flex items-center"><Target className="mr-2" size={20} /> Active Sessions</h4>
              <div className="space-y-4">
                 {MOCK_DEMO_SESSIONS.map((session) => (
                    <div key={session.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-blue-900/20 transition-all">
                       <div className="flex justify-between items-start mb-2">
                          <h5 className="text-xs font-black text-gray-900">{session.institutionName}</h5>
                          <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${session.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'}`}>{session.status}</span>
                       </div>
                       <p className="text-[10px] text-gray-400 font-bold uppercase">Lead: {session.leadName}</p>
                       <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center text-[9px] font-bold text-gray-500"><Clock size={10} className="mr-1" /> {new Date(session.expiresAt).toLocaleDateString('id-ID')}</div>
                          <button className="p-1.5 text-gray-300 hover:text-red-600"><Trash2 size={14} /></button>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <h4 className="text-xl font-black mb-8 flex items-center"><BarChart3 className="mr-2" /> Engagement Metrics</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MOCK_DEMO_USAGE}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="date" hide />
                    <Tooltip />
                    <Bar dataKey="activeLogins" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="generations" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
           </div>
           <div className="bg-emerald-900 text-white p-8 rounded-[2.5rem] shadow-xl flex items-center justify-between">
              <div className="max-w-md">
                 <h4 className="text-lg font-black mb-2">Auto-Clean Activated</h4>
                 <p className="text-emerald-100 text-[10px] font-bold uppercase opacity-80 leading-relaxed">Seluruh database demo yang kedaluwarsa akan dihapus secara otomatis setiap pukul 00:00 WIB.</p>
              </div>
              <ShieldCheck size={40} className="text-emerald-400" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default DemoManagementPage;
