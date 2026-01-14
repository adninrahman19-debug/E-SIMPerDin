
import React, { useState } from 'react';
import { MOCK_TICKETS, MOCK_FAQS, MOCK_HELPDOCS } from '../../constants';
import { LifeBuoy, MessageSquare, HelpCircle, BookOpen, Clock, CheckCircle2, ChevronRight, Search, FileEdit, Trash2 } from 'lucide-react';

const SupportCenterPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'TICKETS' | 'DOCS'>('TICKETS');

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Platform Support</h2>
          <p className="text-gray-500 text-sm font-medium">Pusat bantuan teknis dan kearsipan dokumentasi panduan tenant.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
          <button onClick={() => setActiveTab('TICKETS')} className={`px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'TICKETS' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500'}`}>Tiket</button>
          <button onClick={() => setActiveTab('DOCS')} className={`px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'DOCS' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500'}`}>Panduan</button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        {activeTab === 'TICKETS' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] text-gray-400 uppercase font-black tracking-widest border-b border-gray-50">
                  <th className="px-8 py-5">Tiket & Instansi</th>
                  <th className="px-6 py-5">Kategori</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {MOCK_TICKETS.map((t) => (
                  <tr key={t.id} className="hover:bg-blue-50/20 transition-all">
                    <td className="px-8 py-6">
                      <p className="text-xs font-black text-gray-900 mb-1">{t.subject}</p>
                      <p className="text-[9px] text-blue-500 font-bold uppercase">{t.institutionName}</p>
                    </td>
                    <td className="px-6 py-6 font-bold text-[10px] uppercase text-gray-500">{t.category}</td>
                    <td className="px-6 py-6">
                       <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase ${t.status === 'OPEN' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>{t.status}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <button className="p-2 text-gray-400 hover:text-blue-900"><ChevronRight size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-20 text-center text-gray-300 font-bold uppercase text-xs tracking-widest">Modul dokumentasi sedang diperbarui...</div>
        )}
      </div>
    </div>
  );
};

export default SupportCenterPage;
