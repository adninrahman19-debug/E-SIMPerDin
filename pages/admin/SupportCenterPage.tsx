
import React, { useState } from 'react';
import { 
  MOCK_TICKETS, 
  MOCK_FAQS, 
  MOCK_HELPDOCS 
} from '../../constants';
import { 
  LifeBuoy, 
  MessageSquare, 
  HelpCircle, 
  BookOpen, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  Search, 
  Filter, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  ArrowUpRight, 
  ShieldCheck, 
  Video, 
  FileText, 
  ChevronRight,
  TrendingUp,
  BarChart,
  X
} from 'lucide-react';
import { SupportTicket, FAQItem, HelpDoc } from '../../types';

const SupportCenterPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'TICKETS' | 'FAQ' | 'DOCS'>('TICKETS');
  const [searchTerm, setSearchTerm] = useState('');

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'bg-red-50 text-red-600 border-red-100';
      case 'HIGH': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'MEDIUM': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-gray-50 text-gray-500 border-gray-100';
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-emerald-50 text-emerald-600';
      case 'IN_PROGRESS': return 'bg-amber-50 text-amber-600';
      case 'RESOLVED': return 'bg-blue-50 text-blue-600';
      default: return 'bg-gray-100 text-gray-400';
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Support & Documentation</h2>
          <p className="text-gray-500 text-sm font-medium">Kelola bantuan teknis, tiket instansi, dan pusat bantuan global.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
          <button 
            onClick={() => setActiveTab('TICKETS')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'TICKETS' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500 hover:text-blue-900'}`}
          >
            Tiket Masuk
          </button>
          <button 
            onClick={() => setActiveTab('FAQ')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'FAQ' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500 hover:text-blue-900'}`}
          >
            FAQ Global
          </button>
          <button 
            onClick={() => setActiveTab('DOCS')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'DOCS' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500 hover:text-blue-900'}`}
          >
            Knowledge Base
          </button>
        </div>
      </div>

      {/* SLA & Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center">
               <MessageSquare size={24} />
            </div>
            <div>
               <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Tiket Aktif</p>
               <h4 className="text-xl font-black text-gray-900">12 Tiket</h4>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
               <ShieldCheck size={24} />
            </div>
            <div>
               <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">SLA Achievement</p>
               <h4 className="text-xl font-black text-emerald-600">98.4%</h4>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
               <Clock size={24} />
            </div>
            <div>
               <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Avg Response</p>
               <h4 className="text-xl font-black text-gray-900">42m</h4>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
               <TrendingUp size={24} />
            </div>
            <div>
               <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Help Center Views</p>
               <h4 className="text-xl font-black text-gray-900">5.2K</h4>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left: Content Filter & Quick Search */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
              <div>
                 <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Pencarian Cepat</label>
                 <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Cari ID tiket atau topik..." 
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-xs"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                 </div>
              </div>

              <div className="space-y-3">
                 <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kategori Populer</h5>
                 {['Technical Support', 'Billing & Plans', 'Feature Requests', 'Account Security'].map((cat, i) => (
                    <button key={i} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-xs font-bold text-gray-600 transition-all border border-transparent hover:border-gray-100">
                       <span>{cat}</span>
                       <ChevronRight size={14} className="text-gray-300" />
                    </button>
                 ))}
              </div>
           </div>

           <div className="bg-blue-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                 <LifeBuoy size={32} className="text-amber-400 mb-6" />
                 <h4 className="text-lg font-black mb-2 leading-tight">SLA Support Policy</h4>
                 <p className="text-blue-100 text-[10px] font-bold uppercase leading-relaxed tracking-tight opacity-80">
                   Prioritas URGENT wajib dijawab dalam 2 jam. MEDIUM maksimal 24 jam. Pastikan antrean tiket selalu di bawah 15 tiket/hari.
                 </p>
              </div>
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
           </div>
        </div>

        {/* Right: Main Content Lists */}
        <div className="lg:col-span-3 space-y-8">
           {activeTab === 'TICKETS' && (
              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                 <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                       <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center">
                          <MessageSquare size={24} />
                       </div>
                       <div>
                          <h4 className="text-xl font-black text-gray-900">Antrean Tiket Masuk</h4>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Daftar Keluhan & Pertanyaan Tenant</p>
                       </div>
                    </div>
                    <button className="text-[10px] font-black text-blue-900 uppercase bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-all">Export Report</button>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] bg-gray-50/50 border-b border-gray-100">
                             <th className="px-8 py-5">Tiket & Pengirim</th>
                             <th className="px-6 py-5">Subjek & Kategori</th>
                             <th className="px-6 py-5">Prioritas</th>
                             <th className="px-6 py-5">SLA Deadline</th>
                             <th className="px-8 py-5 text-right">Aksi</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-50">
                          {MOCK_TICKETS.map((ticket) => (
                             <tr key={ticket.id} className="group hover:bg-blue-50/30 transition-all duration-300">
                                <td className="px-8 py-6">
                                   <div className="flex flex-col">
                                      <span className="text-xs font-black text-gray-900 leading-none mb-1">#{ticket.id}</span>
                                      <span className="text-[10px] text-blue-500 font-bold uppercase tracking-tighter">{ticket.institutionName}</span>
                                   </div>
                                </td>
                                <td className="px-6 py-6">
                                   <p className="text-xs font-black text-gray-700 leading-none">{ticket.subject}</p>
                                   <p className="text-[9px] text-gray-400 font-bold uppercase mt-1">{ticket.category}</p>
                                </td>
                                <td className="px-6 py-6">
                                   <span className={`inline-flex items-center px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${getPriorityStyle(ticket.priority)}`}>
                                      {ticket.priority}
                                   </span>
                                </td>
                                <td className="px-6 py-6">
                                   <div className="flex items-center text-[10px] font-bold text-gray-500">
                                      <Clock size={12} className="mr-1.5" />
                                      {new Date(ticket.slaDeadline).toLocaleTimeString('id-ID')} WIB
                                   </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                   <div className="flex items-center justify-end space-x-2">
                                      <button className="p-2 text-gray-400 hover:text-blue-900 bg-white rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-all"><Edit3 size={16} /></button>
                                      <button className="p-2 text-gray-400 hover:text-emerald-600 bg-white rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-all"><CheckCircle2 size={16} /></button>
                                   </div>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           )}

           {activeTab === 'FAQ' && (
              <div className="space-y-6">
                 <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-black text-gray-900">Manajemen FAQ Global</h4>
                    <button className="bg-blue-900 text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-blue-900/20">
                       <Plus size={16} />
                       <span>Buat FAQ Baru</span>
                    </button>
                 </div>
                 <div className="grid grid-cols-1 gap-4">
                    {MOCK_FAQS.map((faq) => (
                       <div key={faq.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-start justify-between group hover:border-blue-900/20 transition-all">
                          <div className="flex space-x-4">
                             <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                                <HelpCircle size={20} />
                             </div>
                             <div>
                                <h5 className="text-sm font-black text-gray-900">{faq.question}</h5>
                                <p className="text-xs text-gray-500 mt-2 leading-relaxed">{faq.answer}</p>
                                <div className="mt-4 flex items-center space-x-3">
                                   <span className="text-[9px] font-black text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded uppercase">{faq.category}</span>
                                   <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center">
                                      <CheckCircle2 size={10} className="mr-1 text-emerald-500" /> Published
                                   </span>
                                </div>
                             </div>
                          </div>
                          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-all">
                             <button className="p-2 text-gray-400 hover:text-blue-900"><Edit3 size={16} /></button>
                             <button className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           )}

           {activeTab === 'DOCS' && (
              <div className="space-y-6">
                 <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-black text-gray-900">Knowledge Base Articles</h4>
                    <button className="bg-blue-900 text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center space-x-2 shadow-lg shadow-blue-900/20">
                       <Plus size={16} />
                       <span>Tambah Panduan</span>
                    </button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {MOCK_HELPDOCS.map((doc) => (
                       <div key={doc.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl transition-all">
                          <div className="p-6 flex-1">
                             <div className="flex items-center justify-between mb-6">
                                <div className={`p-3 rounded-2xl ${doc.type === 'VIDEO' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-900'}`}>
                                   {doc.type === 'VIDEO' ? <Video size={20} /> : <FileText size={20} />}
                                </div>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center">
                                   <Eye size={12} className="mr-1.5" /> {doc.views} Views
                                </span>
                             </div>
                             <h5 className="text-lg font-black text-gray-900 leading-tight mb-2 group-hover:text-blue-900 transition-colors">{doc.title}</h5>
                             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Category: {doc.category}</p>
                          </div>
                          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                             <span className="text-[9px] font-black text-gray-400 uppercase">Update: {doc.lastUpdated}</span>
                             <button className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline flex items-center">
                                Edit Content <ArrowUpRight size={12} className="ml-1" />
                             </button>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default SupportCenterPage;
