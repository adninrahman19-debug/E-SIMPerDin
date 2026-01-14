
import React, { useState } from 'react';
import { MOCK_SYSTEM_LOGS, MOCK_TECHNICAL_METRICS } from '../../constants';
import { Activity, Server, Database, ShieldCheck, Cpu, Network, Search, Download, Terminal, UserCheck, ShieldAlert, PackageCheck, Bug } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { LogCategory } from '../../types';

const SystemMonitoringPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'METRICS' | 'LOGS'>('METRICS');

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">System Health & Audit</h2>
          <p className="text-gray-500 text-sm font-medium">Monitoring real-time infrastruktur cloud dan jejak audit global.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
          <button onClick={() => setActiveTab('METRICS')} className={`px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'METRICS' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500'}`}>Metrics</button>
          <button onClick={() => setActiveTab('LOGS')} className={`px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'LOGS' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500'}`}>Logs</button>
        </div>
      </div>

      {activeTab === 'METRICS' ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
              <Database className="text-emerald-500" size={32} />
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase">DB Cluster</p>
                <h4 className="text-xl font-black">99.9% Healthy</h4>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
              <Server className="text-blue-500" size={32} />
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase">API Node</p>
                <h4 className="text-xl font-black">Active (2 Nodes)</h4>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
              <ShieldCheck className="text-indigo-500" size={32} />
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase">Security</p>
                <h4 className="text-xl font-black">WAF Filtering</h4>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
             <h4 className="text-xl font-black mb-8 flex items-center"><Cpu className="mr-2" /> Server Resource Load</h4>
             <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_TECHNICAL_METRICS}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="time" hide />
                    <YAxis hide />
                    <Tooltip />
                    <Area type="monotone" dataKey="cpu" stroke="#1e3a8a" fill="#1e3a8a" fillOpacity={0.1} strokeWidth={3} />
                    <Area type="monotone" dataKey="ram" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.05} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
           <div className="p-6 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between">
              <h4 className="font-black uppercase text-xs tracking-widest">Global Activity Log</h4>
              <Search size={18} className="text-gray-400" />
           </div>
           <div className="p-20 text-center text-gray-300 font-bold uppercase text-xs tracking-widest">Audit trail sedang dimuat...</div>
        </div>
      )}
    </div>
  );
};

export default SystemMonitoringPage;
