
import React, { useState } from 'react';
import { 
  MOCK_BROADCASTS, 
  MOCK_EMAIL_TEMPLATES 
} from '../../constants';
import { 
  Megaphone, 
  Mail, 
  Send, 
  History, 
  Edit3, 
  Trash2, 
  Globe, 
  Bell, 
  Zap, 
  Save, 
  ChevronRight, 
  Layout, 
  Code,
  Users,
  AlertCircle,
  CheckCircle2,
  Rocket,
  Plus,
  Eye,
  RefreshCw,
  Search,
  Filter
} from 'lucide-react';
import { BroadcastMessage, EmailTemplate } from '../../types';

const CommunicationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'BROADCAST' | 'EMAIL' | 'UPDATES'>('BROADCAST');
  const [broadcasts, setBroadcasts] = useState<BroadcastMessage[]>(MOCK_BROADCASTS);
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>(MOCK_EMAIL_TEMPLATES);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);

  // Form State for Broadcast
  const [newBroadcast, setNewBroadcast] = useState({
    subject: '',
    target: 'ALL',
    priority: 'MEDIUM',
    content: ''
  });

  const handleSendBroadcast = () => {
    if (!newBroadcast.subject || !newBroadcast.content) {
      alert('Harap lengkapi subjek dan isi pesan.');
      return;
    }
    const msg: BroadcastMessage = {
      id: `msg-${Date.now()}`,
      subject: newBroadcast.subject,
      content: newBroadcast.content,
      target: newBroadcast.target as any,
      priority: newBroadcast.priority as any,
      createdAt: new Date().toISOString(),
      sentBy: 'Super Administrator',
      readCount: 0
    };
    setBroadcasts([msg, ...broadcasts]);
    setNewBroadcast({ subject: '', target: 'ALL', priority: 'MEDIUM', content: '' });
    alert('Broadcast berhasil dikirim ke seluruh tenant target.');
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'bg-red-100 text-red-600 border-red-200';
      case 'HIGH': return 'bg-amber-100 text-amber-600 border-amber-200';
      case 'MEDIUM': return 'bg-blue-100 text-blue-600 border-blue-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Communication Hub</h2>
          <p className="text-gray-500 text-sm font-medium mt-1">Kelola distribusi informasi, email otomatis, dan pengumuman platform.</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <button 
            onClick={() => setActiveTab('BROADCAST')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center space-x-2 ${activeTab === 'BROADCAST' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500 hover:text-blue-900'}`}
          >
            <Megaphone size={16} />
            <span>Broadcast</span>
          </button>
          <button 
            onClick={() => setActiveTab('EMAIL')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center space-x-2 ${activeTab === 'EMAIL' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500 hover:text-blue-900'}`}
          >
            <Mail size={16} />
            <span>Email Sistem</span>
          </button>
          <button 
            onClick={() => setActiveTab('UPDATES')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center space-x-2 ${activeTab === 'UPDATES' ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500 hover:text-blue-900'}`}
          >
            <Rocket size={16} />
            <span>Updates</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {activeTab === 'BROADCAST' && (
          <>
            {/* Left: Compose Broadcast */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-8 animate-in slide-in-from-left-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-12 h-12 bg-blue-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-blue-900/20">
                    <Send size={24} />
                  </div>
                  <h4 className="text-xl font-black text-gray-900">Push Notification</h4>
                </div>
                
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Subjek Pengumuman</label>
                    <input 
                      type="text" 
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold"
                      value={newBroadcast.subject}
                      onChange={(e) => setNewBroadcast({...newBroadcast, subject: e.target.value})}
                      placeholder="Contoh: Jadwal Maintenance..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Target</label>
                       <select 
                         className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-xs appearance-none"
                         value={newBroadcast.target}
                         onChange={(e) => setNewBroadcast({...newBroadcast, target: e.target.value})}
                       >
                         <option value="ALL">Semua Instansi</option>
                         <option value="ACTIVE_ONLY">Hanya Aktif</option>
                         <option value="TRIAL_ONLY">Hanya Trial</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Prioritas</label>
                       <select 
                         className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-xs appearance-none"
                         value={newBroadcast.priority}
                         onChange={(e) => setNewBroadcast({...newBroadcast, priority: e.target.value})}
                       >
                         <option value="MEDIUM">Medium</option>
                         <option value="HIGH">High</option>
                         <option value="URGENT">Urgent</option>
                       </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Isi Pesan</label>
                    <textarea 
                      rows={5}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[2rem] outline-none focus:ring-2 focus:ring-blue-900/10 text-sm font-medium resize-none"
                      value={newBroadcast.content}
                      onChange={(e) => setNewBroadcast({...newBroadcast, content: e.target.value})}
                      placeholder="Tuliskan detail informasi yang ingin disampaikan..."
                    />
                  </div>
                  <button 
                    onClick={handleSendBroadcast}
                    className="w-full py-4 bg-blue-900 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/30 flex items-center justify-center space-x-3"
                  >
                    <Zap size={18} className="fill-amber-400 text-amber-400" />
                    <span>Broadcast Sekarang</span>
                  </button>
                </div>
              </div>

              <div className="p-8 bg-gray-900 text-white rounded-[3rem] shadow-xl relative overflow-hidden group">
                <div className="relative z-10">
                   <AlertCircle size={32} className="text-amber-400 mb-6" />
                   <h4 className="text-lg font-black mb-2">Peringatan Etika</h4>
                   <p className="text-gray-400 text-[10px] font-bold uppercase leading-relaxed tracking-tight opacity-90">
                     Gunakan fitur broadcast hanya untuk informasi krusial. Penggunaan berlebihan dapat mengganggu produktivitas operasional instansi klien.
                   </p>
                </div>
                <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
              </div>
            </div>

            {/* Right: Broadcast History */}
            <div className="lg:col-span-2 space-y-6 animate-in slide-in-from-right-4">
              <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white text-blue-900 rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
                      <History size={24} />
                    </div>
                    <div>
                       <h4 className="text-xl font-black text-gray-900">Sent Announcements</h4>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Daftar riwayat broadcast terbaru</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                     <button className="p-3 bg-white border border-gray-100 text-gray-400 hover:text-blue-900 rounded-xl transition-all shadow-sm"><RefreshCw size={18} /></button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                     <thead>
                       <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] bg-gray-50/50 border-b border-gray-100">
                         <th className="px-10 py-6">Timestamp & Author</th>
                         <th className="px-6 py-6">Subjek Pesan</th>
                         <th className="px-6 py-6">Target & Priority</th>
                         <th className="px-6 py-6 text-center">Read Status</th>
                         <th className="px-10 py-6 text-right">Aksi</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                       {broadcasts.map((bc) => (
                         <tr key={bc.id} className="group hover:bg-blue-50/30 transition-all duration-300">
                           <td className="px-10 py-8">
                              <p className="text-xs font-black text-gray-900 leading-none">{new Date(bc.createdAt).toLocaleDateString('id-ID')}</p>
                              <p className="text-[10px] text-gray-400 font-bold uppercase mt-1.5">{bc.sentBy}</p>
                           </td>
                           <td className="px-6 py-8">
                              <p className="text-sm font-black text-gray-700 leading-tight">{bc.subject}</p>
                              <p className="text-[10px] text-gray-400 font-medium italic mt-1 line-clamp-1">"{bc.content}"</p>
                           </td>
                           <td className="px-6 py-8">
                              <div className="flex flex-col space-y-2">
                                <span className="text-[9px] font-black text-blue-900 uppercase bg-blue-50 px-2 py-0.5 rounded w-fit">{bc.target}</span>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[8px] font-black uppercase border w-fit ${getPriorityStyle(bc.priority)}`}>
                                   {bc.priority}
                                </span>
                              </div>
                           </td>
                           <td className="px-6 py-8 text-center">
                              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gray-50 rounded-xl border border-gray-100">
                                 <Users size={12} className="text-gray-400" />
                                 <span className="text-xs font-black text-gray-900">{bc.readCount}</span>
                              </div>
                           </td>
                           <td className="px-10 py-8 text-right">
                              <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                                 <button className="p-2.5 text-gray-400 hover:text-blue-900 bg-white border border-gray-100 rounded-xl hover:shadow-sm transition-all" title="View Full Message"><Eye size={18} /></button>
                                 <button className="p-2.5 text-gray-400 hover:text-red-600 bg-white border border-gray-100 rounded-xl hover:shadow-sm transition-all"><Trash2 size={18} /></button>
                              </div>
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'EMAIL' && (
          <>
            <div className="lg:col-span-1 space-y-6 animate-in slide-in-from-left-4">
               <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
                  <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Pilih Template Email</h5>
                  <div className="space-y-3">
                    {emailTemplates.map((template) => (
                      <button 
                        key={template.id}
                        onClick={() => setSelectedTemplate(template)}
                        className={`w-full p-5 rounded-2xl border text-left transition-all group ${selectedTemplate?.id === template.id ? 'bg-blue-900 text-white border-blue-900 shadow-xl' : 'bg-gray-50 border-gray-100 text-gray-600 hover:border-blue-900/20'}`}
                      >
                         <p className="text-xs font-black uppercase tracking-tight leading-none mb-1.5">{template.type.replace('_', ' ')}</p>
                         <p className={`text-[9px] font-bold uppercase tracking-tighter ${selectedTemplate?.id === template.id ? 'text-blue-200' : 'text-gray-400'}`}>Last Edit: {template.lastUpdated}</p>
                         <div className="mt-4 flex items-center justify-between">
                            <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${selectedTemplate?.id === template.id ? 'bg-white/10 text-white' : 'bg-gray-200 text-gray-500'}`}>Active</span>
                            <ChevronRight size={14} className={selectedTemplate?.id === template.id ? 'opacity-100' : 'opacity-20'} />
                         </div>
                      </button>
                    ))}
                  </div>
               </div>

               <div className="bg-indigo-900 text-white p-8 rounded-[3rem] shadow-xl relative overflow-hidden">
                  <div className="relative z-10">
                     <Code size={32} className="text-blue-300 mb-6" />
                     <h4 className="text-lg font-black mb-2 leading-tight">SMTP Information</h4>
                     <p className="text-indigo-100 text-[10px] font-bold uppercase leading-relaxed tracking-tight opacity-80">
                        Email dikirim melalui cluster AWS SES. Status deliverability: <span className="text-emerald-400">99.2% Healthy</span>.
                     </p>
                  </div>
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
               </div>
            </div>

            <div className="lg:col-span-2 animate-in slide-in-from-right-4">
               {selectedTemplate ? (
                 <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full min-h-[650px]">
                    <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                       <div className="flex items-center space-x-4">
                         <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100">
                           <Edit3 size={24} />
                         </div>
                         <div>
                            <h4 className="text-xl font-black text-gray-900">Editor: {selectedTemplate.type.replace('_', ' ')}</h4>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Konfigurasi Pengiriman Otomatis</p>
                         </div>
                       </div>
                       <button className="bg-blue-900 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 transition-all flex items-center space-x-2 shadow-lg shadow-blue-900/20">
                         <Save size={16} />
                         <span>Save Changes</span>
                       </button>
                    </div>
                    <div className="p-10 flex-1 space-y-8">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Subject</label>
                          <input 
                            type="text" 
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold text-sm"
                            value={selectedTemplate.subject}
                            onChange={(e) => setSelectedTemplate({...selectedTemplate, subject: e.target.value})}
                          />
                       </div>
                       <div className="flex-1 space-y-3 flex flex-col h-full min-h-[400px]">
                          <div className="flex items-center justify-between ml-1">
                             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Content (HTML Supported)</label>
                             <div className="flex items-center space-x-2">
                                <span className="text-[8px] font-black text-blue-900 bg-blue-50 px-2 py-0.5 rounded uppercase">Variables</span>
                                <div className="flex space-x-1">
                                   {['{{NAME}}', '{{LINK}}', '{{EXPIRY}}'].map(tag => (
                                     <button key={tag} className="text-[8px] font-mono font-bold bg-gray-100 hover:bg-gray-200 p-1 rounded transition-colors">{tag}</button>
                                   ))}
                                </div>
                             </div>
                          </div>
                          <textarea 
                            className="flex-1 w-full p-8 bg-gray-900 border border-gray-800 rounded-[2.5rem] outline-none font-mono text-xs text-blue-100 leading-relaxed custom-scrollbar"
                            value={selectedTemplate.body}
                            onChange={(e) => setSelectedTemplate({...selectedTemplate, body: e.target.value})}
                          />
                       </div>
                    </div>
                    <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                       <div className="flex items-center space-x-3">
                          <Layout size={20} className="text-gray-300" />
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sender ID: noreply@simperdin.id</span>
                       </div>
                       <button className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline flex items-center">
                          Send Test Email <ChevronRight size={14} className="ml-1" />
                       </button>
                    </div>
                 </div>
               ) : (
                 <div className="h-full min-h-[650px] flex flex-col items-center justify-center bg-gray-50/50 rounded-[3rem] border-4 border-dashed border-gray-200">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-inner mb-6">
                       <Mail size={48} className="text-gray-200" />
                    </div>
                    <p className="text-gray-400 font-black uppercase text-xs tracking-widest">Pilih template di sisi kiri untuk mulai melakukan perubahan</p>
                 </div>
               )}
            </div>
          </>
        )}

        {activeTab === 'UPDATES' && (
           <div className="lg:col-span-3 space-y-8 animate-in zoom-in-95 duration-500">
              <div className="bg-white p-12 rounded-[4rem] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
                 <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-900 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                      <Zap size={14} className="mr-2 text-amber-500 fill-amber-500" /> System Engine Ready
                    </div>
                    <h3 className="text-4xl font-black text-gray-900 mb-6 tracking-tight leading-none">Umumkan Pembaruan Global</h3>
                    <p className="text-gray-500 text-lg mb-10 leading-relaxed font-medium">
                      Informasikan fitur baru, peningkatan performa, atau patch keamanan kepada seluruh pengguna platform. Pengumuman ini akan muncul di banner utama dashboard instansi.
                    </p>
                    <button className="bg-blue-900 text-white px-10 py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-blue-800 transition-all shadow-2xl shadow-blue-900/30 flex items-center space-x-4 group">
                       <Plus size={20} />
                       <span>Buat Pengumuman Update</span>
                       <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                 </div>
                 <div className="w-72 h-72 bg-blue-50 rounded-[3rem] flex items-center justify-center relative shadow-inner group-hover:rotate-6 transition-transform duration-1000">
                    <RefreshCw size={120} className="text-blue-900 opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Rocket size={80} className="text-blue-900" />
                    </div>
                 </div>
                 <div className="absolute -left-20 -top-20 w-80 h-80 bg-blue-900/5 rounded-full blur-3xl"></div>
              </div>

              <div className="space-y-6">
                 <div className="flex items-center justify-between px-4">
                    <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Historical Patch Notes</h5>
                    <button className="text-[10px] font-black text-blue-900 uppercase hover:underline">View All Logs</button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { ver: 'v2.6.0 Stable', date: '22 Mei 2024', desc: 'Implementasi generator PDF v2 dan integrasi SBM Nasional 2024.', type: 'MAJOR', status: 'PUBLISHED' },
                      { ver: 'v2.5.8 Patch', date: '15 Mei 2024', desc: 'Perbaikan bug pada kalkulasi biaya penginapan di wilayah Papua.', type: 'PATCH', status: 'PUBLISHED' }
                    ].map((log, i) => (
                      <div key={i} className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm flex items-start justify-between group hover:border-blue-900/20 transition-all duration-500">
                         <div className="flex items-center space-x-6">
                            <div className="text-center bg-gray-50 p-4 rounded-[1.5rem] min-w-[100px] shadow-inner group-hover:bg-blue-50 transition-colors">
                               <p className="text-lg font-black text-gray-900 group-hover:text-blue-900 transition-colors">{log.ver.split(' ')[0]}</p>
                               <p className="text-[9px] font-black text-gray-400 uppercase mt-1 tracking-tighter">{log.date}</p>
                            </div>
                            <div>
                               <h6 className="text-sm font-black text-gray-800 leading-tight mb-2 uppercase tracking-tight">{log.ver}</h6>
                               <p className="text-xs text-gray-500 font-medium leading-relaxed italic line-clamp-2">"{log.desc}"</p>
                               <div className="flex items-center space-x-3 mt-4">
                                  <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${log.type === 'MAJOR' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-gray-100 text-gray-500'}`}>
                                     {log.type}
                                  </span>
                                  <span className="text-[8px] font-bold text-emerald-600 flex items-center">
                                     <CheckCircle2 size={10} className="mr-1" /> {log.status}
                                  </span>
                               </div>
                            </div>
                         </div>
                         <button className="p-3 text-gray-300 hover:text-blue-900 hover:bg-gray-50 rounded-2xl transition-all">
                            <Edit3 size={20} />
                         </button>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default CommunicationPage;
