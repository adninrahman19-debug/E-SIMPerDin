
import React, { useState } from 'react';
import { MOCK_BROADCASTS, MOCK_EMAIL_TEMPLATES } from '../../constants';
import { Megaphone, Mail, Send, History, Edit3, Trash2, Globe, Bell, Zap, Save, ChevronRight, Layout } from 'lucide-react';

const CommunicationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'BROADCAST' | 'EMAIL'>('BROADCAST');

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Hub Komunikasi</h2>
          <p className="text-gray-500 text-sm font-medium">Kirim pengumuman massal dan kelola sistem notifikasi email global.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
          <button onClick={() => setActiveTab('BROADCAST')} className={`px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'BROADCAST' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500'}`}>Broadcast</button>
          <button onClick={() => setActiveTab('EMAIL')} className={`px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'EMAIL' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500'}`}>Email</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
              <h4 className="font-black text-lg text-gray-900 flex items-center"><Megaphone className="mr-2" size={20} /> Buat Broadcast</h4>
              <div className="space-y-4">
                 <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Pilih Target</label>
                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-xs">
                       <option>Seluruh Instansi</option>
                       <option>Hanya Professional</option>
                       <option>Hanya Trial</option>
                    </select>
                 </div>
                 <textarea className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none resize-none" rows={4} placeholder="Tulis pengumuman sistem..." />
                 <button className="w-full py-4 bg-blue-900 text-white rounded-2xl font-black text-xs uppercase flex items-center justify-center space-x-2 shadow-xl shadow-blue-900/20">
                    <Send size={16} /> <span>Kirim Pengumuman</span>
                 </button>
              </div>
           </div>
        </div>

        <div className="lg:col-span-2">
           <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                 <h4 className="font-black text-gray-900 flex items-center"><History className="mr-2" size={18} /> Riwayat Broadcast</h4>
              </div>
              <div className="divide-y divide-gray-50">
                 {MOCK_BROADCASTS.map((bc) => (
                    <div key={bc.id} className="p-8 hover:bg-blue-50/20 transition-all group">
                       <div className="flex justify-between items-start mb-4">
                          <div>
                             <h5 className="font-black text-gray-900">{bc.subject}</h5>
                             <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{new Date(bc.createdAt).toLocaleDateString('id-ID')} • {bc.sentBy}</p>
                          </div>
                          <span className="text-[8px] font-black bg-blue-100 text-blue-900 px-2 py-0.5 rounded uppercase">{bc.target}</span>
                       </div>
                       <p className="text-sm text-gray-600 leading-relaxed italic line-clamp-2">"{bc.content}"</p>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationPage;
