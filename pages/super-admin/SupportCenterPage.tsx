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
  X,
  History,
  Info,
  ExternalLink,
  Save,
  Zap,
  Download,
  ShieldAlert,
  Settings,
  Share2,
  // Added missing Activity icon
  Activity
} from 'lucide-react';
import { SupportTicket, FAQItem, HelpDoc } from '../../types';

const SupportCenterPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'TICKETS' | 'FAQ' | 'DOCS' | 'SLA'>('TICKETS');
  const [searchTerm, setSearchTerm] = useState('');
  const [tickets, setTickets] = useState<SupportTicket[]>(MOCK_TICKETS);
  const [faqs, setFaqs] = useState<FAQItem[]>(MOCK_FAQS);
  const [docs, setDocs] = useState<HelpDoc[]>(MOCK_HELPDOCS);

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'bg-red-50 text-red-600 border-red-100';
      case 'HIGH': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'MEDIUM': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-gray-50 text-gray-500 border-gray-100';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'IN_PROGRESS': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'RESOLVED': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'CLOSED': return 'bg-gray-100 text-gray-500 border-gray-200';
      default: return 'bg-gray-50 text-gray-400';
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20 h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight flex items-center">
            Help & Support <LifeBuoy className="ml-3 text-blue-900" size={32} />
          </h2>
          <p className="text-gray-500 text-sm font-medium mt-1">Pusat bantuan teknis, manajemen basis pengetahuan, dan monitoring kepatuhan SLA.</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm overflow-x-auto max-w-full">
          {[
            { id: 'TICKETS', icon: MessageSquare, label: 'Tiket Support' },
            { id: 'FAQ', icon: HelpCircle, label: 'FAQ Global' },
            { id: 'DOCS', icon: BookOpen, label: 'Dokumentasi' },
            { id: 'SLA', icon: ShieldCheck, label: 'SLA History' },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center space-x-2 whitespace-nowrap ${activeTab === tab.id ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500 hover:text-blue-900'}`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
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
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-3 block">Cari di Support</label>
                 <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold text-sm shadow-inner"
                      placeholder="Tiket ID / Topik..."
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

           <div className="bg-blue-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
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
              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden animate-in slide-in-from-right-4 duration-500 min-h-[600px] flex flex-col">
                 <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                    <div className="flex items-center space-x-4">
                       <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
                          <MessageSquare size={24} />
                       </div>
                       <div>
                          <h4 className="text-xl font-black text-gray-900">Antrean Tiket Masuk</h4>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Daftar Keluhan & Pertanyaan Tenant</p>
                       </div>
                    </div>
                    <button className="text-[10px] font-black text-blue-900 uppercase bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-all">Export Report</button>
                 </div>
                 <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left border-collapse">
                       <thead>
                          <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] border-b border-gray-100 bg-gray-50/10">
                             <th className="px-10 py-6">ID & Instansi</th>
                             <th className="px-6 py-6">Topik Masalah</th>
                             <th className="px-6 py-6 text-center">Prioritas</th>
                             <th className="px-6 py-6">Status</th>
                             <th className="px-10 py-6 text-right">Aksi</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-50">
                          {tickets.map((t) => (
                             <tr key={t.id} className="group hover:bg-blue-50/30 transition-all duration-300">
                                <td className="px-10 py-8">
                                   <div className="flex flex-col">
                                      <span className="text-xs font-black text-gray-900 leading-none mb-1">#{t.id}</span>
                                      <span className="text-[10px] text-blue-500 font-bold uppercase tracking-tighter">{t.institutionName}</span>
                                   </div>
                                </td>
                                <td className="px-6 py-8">
                                   <p className="text-sm font-black text-gray-800 leading-tight">{t.subject}</p>
                                   <div className="flex items-center mt-2 space-x-2 text-[9px] font-bold text-gray-400 uppercase">
                                      <Clock size={10} />
                                      <span>Deadline: {new Date(t.slaDeadline).toLocaleTimeString('id-ID')} WIB</span>
                                   </div>
                                </td>
                                <td className="px-6 py-8 text-center">
                                   <span className={`inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getPriorityStyle(t.priority)}`}>
                                      {t.priority}
                                   </span>
                                </td>
                                <td className="px-6 py-8">
                                   <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusBadge(t.status)}`}>
                                      {t.status.replace('_', ' ')}
                                   </span>
                                </td>
                                <td className="px-10 py-8 text-right">
                                   <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                                      <button className="p-2.5 text-gray-400 hover:text-blue-900 bg-white border border-gray-100 rounded-xl shadow-sm hover:scale-110 transition-all" title="Review Tiket"><Eye size={18} /></button>
                                      <button className="p-2.5 text-gray-400 hover:text-emerald-600 bg-white border border-gray-100 rounded-xl shadow-sm hover:scale-110 transition-all" title="Tandai Selesai"><CheckCircle2 size={18} /></button>
                                      <button className="p-2.5 text-gray-400 hover:text-indigo-600 bg-white border border-gray-100 rounded-xl shadow-sm hover:scale-110 transition-all"><Share2 size={18} /></button>
                                   </div>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
                 <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Menampilkan {tickets.length} Tiket Menunggu Respon</p>
                    <button className="text-[10px] font-black text-blue-900 uppercase tracking-[0.2em] hover:underline flex items-center group">
                       Lihat Seluruh Arsip Tiket <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                 </div>
              </div>
           )}

           {activeTab === 'FAQ' && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                 <div className="flex items-center justify-between px-4">
                    <div>
                       <h4 className="text-2xl font-black text-gray-900 tracking-tight uppercase tracking-[0.1em]">Management FAQ Global</h4>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Pusat tanya jawab mandiri untuk seluruh tenant</p>
                    </div>
                    <button className="bg-blue-900 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 flex items-center space-x-2">
                       <Plus size={18} />
                       <span>Tambah FAQ</span>
                    </button>
                 </div>

                 <div className="grid grid-cols-1 gap-6">
                    {faqs.map((faq) => (
                       <div key={faq.id} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex items-start justify-between group hover:border-blue-900/20 transition-all duration-500">
                          <div className="flex space-x-8">
                             <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-inner group-hover:rotate-6 group-hover:scale-110 transition-transform">
                                <HelpCircle size={32} />
                             </div>
                             <div>
                                <div className="flex items-center space-x-4 mb-4">
                                   <h5 className="text-xl font-black text-gray-900">{faq.question}</h5>
                                   <span className="px-4 py-1 bg-gray-100 text-gray-500 rounded-full text-[9px] font-black uppercase tracking-widest border border-gray-200">{faq.category}</span>
                                </div>
                                <p className="text-base text-gray-500 leading-relaxed font-medium mb-8 max-w-2xl italic">"{faq.answer}"</p>
                                <div className="flex items-center space-x-6">
                                   <div className="flex items-center text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                                      <CheckCircle2 size={14} className="mr-2" /> Terbit ke Seluruh Tenant
                                   </div>
                                   <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                      <Activity size={14} className="mr-2" /> High Helpfulness (94%)
                                   </div>
                                </div>
                             </div>
                          </div>
                          <div className="flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all">
                             <button className="p-3 bg-gray-50 text-gray-400 hover:text-blue-900 rounded-2xl transition-all shadow-sm"><Edit3 size={20} /></button>
                             <button className="p-3 bg-gray-50 text-gray-400 hover:text-red-600 rounded-2xl transition-all shadow-sm"><Trash2 size={20} /></button>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           )}

           {activeTab === 'DOCS' && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                 <div className="bg-gradient-to-br from-blue-950 to-indigo-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
                    <div className="relative z-10 max-w-2xl">
                       <div className="flex items-center space-x-4 mb-8">
                          <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
                             <Zap size={24} className="text-amber-400 fill-amber-400" />
                          </div>
                          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-300">Content Management System</span>
                       </div>
                       <h3 className="text-4xl font-black mb-6 tracking-tight leading-none">Pusat Edukasi Platform</h3>
                       <p className="text-indigo-100 text-lg leading-relaxed opacity-80 mb-10 font-medium italic">
                          "Kelola materi tutorial video dan panduan naskah untuk meminimalisir beban tiket bantuan teknis secara preventif."
                       </p>
                       <div className="flex flex-wrap gap-8 pt-6 border-t border-white/10">
                          <div>
                             <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-1">Total Artikel</p>
                             <p className="text-3xl font-black">124</p>
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-1">Total Tutorial</p>
                             <p className="text-3xl font-black">18</p>
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-1">Engagement Rate</p>
                             <p className="text-3xl font-black">82%</p>
                          </div>
                       </div>
                    </div>
                    <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {docs.map((doc) => (
                       <div key={doc.id} className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl hover:border-blue-900/20 transition-all duration-500">
                          <div className="p-10 flex-1">
                             <div className="flex items-center justify-between mb-8">
                                <div className={`p-5 rounded-[1.5rem] ${doc.type === 'VIDEO' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-blue-50 text-blue-900 border-blue-100'} shadow-inner group-hover:scale-110 transition-transform border`}>
                                   {doc.type === 'VIDEO' ? <Video size={32} /> : <FileText size={32} />}
                                </div>
                                <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100 shadow-sm">
                                   <Eye size={12} className="mr-2 text-blue-500" /> {doc.views} Hits
                                </div>
                             </div>
                             <h5 className="text-2xl font-black text-gray-900 leading-tight mb-4 group-hover:text-blue-900 transition-colors">{doc.title}</h5>
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-10">Kategori: {doc.category}</p>
                             <div className="flex items-center justify-between pt-8 border-t border-gray-50">
                                <div className="flex items-center text-[11px] font-bold text-gray-500 uppercase tracking-tighter">
                                   <Clock size={14} className="mr-2 text-gray-300" /> Terakhir Update: {doc.lastUpdated}
                                </div>
                                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-all">
                                   <button className="p-2.5 text-gray-400 hover:text-blue-900 transition-all"><Edit3 size={18} /></button>
                                   <button className="p-2.5 text-gray-400 hover:text-red-600 transition-all"><Trash2 size={18} /></button>
                                </div>
                             </div>
                          </div>
                          <button className="w-full py-5 bg-gray-900 text-white font-black text-[11px] uppercase tracking-[0.2em] hover:bg-black transition-all flex items-center justify-center space-x-3">
                             <span>Preview Content</span>
                             <ExternalLink size={16} />
                          </button>
                       </div>
                    ))}
                    
                    <button className="border-4 border-dashed border-gray-100 rounded-[3rem] p-12 flex flex-col items-center justify-center text-gray-300 hover:text-blue-900 hover:border-blue-900/20 transition-all group">
                       <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-50 transition-colors">
                          <Plus size={40} />
                       </div>
                       <span className="text-sm font-black uppercase tracking-[0.2em]">Tambah Dokumentasi Baru</span>
                    </button>
                 </div>
              </div>
           )}

           {activeTab === 'SLA' && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 min-h-[600px]">
                 <div className="flex items-center justify-between px-4">
                    <div>
                       <h4 className="text-2xl font-black text-gray-900 tracking-tight uppercase tracking-[0.1em]">SLA Achievement Log</h4>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Riwayat kepatuhan waktu pelayanan tim support</p>
                    </div>
                    <button className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm flex items-center space-x-2">
                       <Settings size={16} />
                       <span>Konfigurasi SLA</span>
                    </button>
                 </div>

                 <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-20 text-center flex flex-col items-center">
                       <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                          <ShieldCheck size={48} className="text-blue-900" />
                       </div>
                       <h5 className="text-2xl font-black text-gray-900">Platform Performance is Nominal</h5>
                       <p className="text-gray-500 text-sm max-w-md mt-2 font-medium">98.2% tiket dalam 30 hari terakhir diselesaikan tepat waktu sesuai ambang batas SLA yang ditentukan.</p>
                       <button className="mt-10 px-10 py-4 bg-blue-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl">Unduh Laporan Kinerja Bulanan</button>
                    </div>
                 </div>
              </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default SupportCenterPage;