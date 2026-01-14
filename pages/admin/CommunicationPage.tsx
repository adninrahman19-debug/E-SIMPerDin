
import React, { useState } from 'react';
import { 
  MOCK_BROADCASTS, 
  MOCK_EMAIL_TEMPLATES 
} from '../../constants';
import { 
  Megaphone, 
  Mail, 
  Zap, 
  Send, 
  History, 
  Eye, 
  FileEdit, 
  Users, 
  Building2, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  ChevronRight, 
  Layout, 
  Code,
  Globe,
  Bell,
  Trash2,
  Save,
  Rocket
} from 'lucide-react';
import { BroadcastMessage, EmailTemplate } from '../../types';

const CommunicationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'BROADCAST' | 'EMAIL_TEMPLATES' | 'UPDATES'>('BROADCAST');
  const [broadcasts, setBroadcasts] = useState<BroadcastMessage[]>(MOCK_BROADCASTS);
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>(MOCK_EMAIL_TEMPLATES);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);

  // Broadcast Form State
  const [newBroadcast, setNewBroadcast] = useState({
    subject: '',
    target: 'ALL',
    priority: 'MEDIUM',
    content: ''
  });

  const handleSendBroadcast = () => {
    if (!newBroadcast.subject || !newBroadcast.content) {
      alert('Harap lengkapi subjek dan konten broadcast.');
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
    alert('Broadcast berhasil dikirim ke instansi target.');
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'bg-red-100 text-red-600';
      case 'HIGH': return 'bg-amber-100 text-amber-600';
      case 'MEDIUM': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Notifikasi & Komunikasi</h2>
          <p className="text-gray-500 text-sm font-medium">Pusat distribusi informasi, broadcast instansi, dan manajemen email sistem.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
          <button 
            onClick={() => setActiveTab('BROADCAST')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'BROADCAST' ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/20' : 'text-gray-500 hover:text-blue-900'}`}
          >
            Broadcast
          </button>
          <button 
            onClick={() => setActiveTab('EMAIL_TEMPLATES')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'EMAIL_TEMPLATES' ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/20' : 'text-gray-500 hover:text-blue-900'}`}
          >
            Email Sistem
          </button>
          <button 
            onClick={() => setActiveTab('UPDATES')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'UPDATES' ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/20' : 'text-gray-500 hover:text-blue-900'}`}
          >
            Update Log
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {activeTab === 'BROADCAST' && (
          <>
            {/* Left: Broadcast Form */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center">
                    <Megaphone size={20} />
                  </div>
                  <h4 className="text-lg font-black text-gray-900">Buat Broadcast</h4>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Subjek Pesan</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold"
                      value={newBroadcast.subject}
                      onChange={(e) => setNewBroadcast({...newBroadcast, subject: e.target.value})}
                      placeholder="E.g. Jadwal Maintenance"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Target</label>
                      <select 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-xs"
                        value={newBroadcast.target}
                        onChange={(e) => setNewBroadcast({...newBroadcast, target: e.target.value})}
                      >
                        <option value="ALL">Semua Instansi</option>
                        <option value="ACTIVE_ONLY">Hanya Aktif</option>
                        <option value="TRIAL_ONLY">Hanya Trial</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Prioritas</label>
                      <select 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-xs"
                        value={newBroadcast.priority}
                        onChange={(e) => setNewBroadcast({...newBroadcast, priority: e.target.value})}
                      >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                        <option value="URGENT">Urgent</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Konten Pengumuman</label>
                    <textarea 
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 text-sm font-medium resize-none"
                      value={newBroadcast.content}
                      onChange={(e) => setNewBroadcast({...newBroadcast, content: e.target.value})}
                      placeholder="Tulis detail pengumuman di sini..."
                    />
                  </div>
                  <button 
                    onClick={handleSendBroadcast}
                    className="w-full py-4 bg-blue-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center space-x-2"
                  >
                    <Send size={16} />
                    <span>Kirim Sekarang</span>
                  </button>
                </div>
              </div>

              <div className="bg-amber-50 p-6 rounded-[2.5rem] border border-amber-100 flex items-start space-x-3">
                <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[10px] text-amber-800 font-bold leading-relaxed uppercase tracking-tight">
                  Pesan broadcast akan muncul sebagai popup notifikasi dan banner di dashboard Admin Instansi yang menjadi target.
                </p>
              </div>
            </div>

            {/* Right: Broadcast History */}
            <div className="lg:col-span-2 space-y-6">
               <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                 <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center">
                        <History size={24} />
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-gray-900">Riwayat Pengiriman</h4>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Daftar Komunikasi Terakhir</p>
                      </div>
                    </div>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] bg-gray-50/50 border-b border-gray-100">
                          <th className="px-8 py-5">Info Broadcast</th>
                          <th className="px-6 py-5">Target & Priotitas</th>
                          <th className="px-6 py-5">Status Baca</th>
                          <th className="px-8 py-5 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {broadcasts.map((bc) => (
                          <tr key={bc.id} className="group hover:bg-blue-50/30 transition-all duration-300">
                            <td className="px-8 py-6">
                              <p className="text-xs font-black text-gray-900 leading-tight mb-1">{bc.subject}</p>
                              <p className="text-[10px] text-gray-400 font-bold">{new Date(bc.createdAt).toLocaleDateString('id-ID')} • {bc.sentBy}</p>
                            </td>
                            <td className="px-6 py-6">
                              <div className="flex flex-col space-y-1">
                                <span className="text-[9px] font-black text-blue-900 uppercase tracking-widest">{bc.target.replace('_', ' ')}</span>
                                <span className={`inline-flex w-max items-center px-2 py-0.5 rounded text-[8px] font-black uppercase ${getPriorityBadge(bc.priority)}`}>
                                  {bc.priority}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-6">
                               <div className="flex items-center space-x-2">
                                  <Users size={14} className="text-gray-300" />
                                  <span className="text-xs font-black text-gray-700">{bc.readCount}</span>
                               </div>
                            </td>
                            <td className="px-8 py-6 text-right">
                               <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                                  <button className="p-2 text-gray-400 hover:text-blue-900 transition-all"><Eye size={18} /></button>
                                  <button className="p-2 text-gray-400 hover:text-red-600 transition-all"><Trash2 size={18} /></button>
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

        {activeTab === 'EMAIL_TEMPLATES' && (
          <>
            <div className="lg:col-span-1 space-y-6">
               <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-4">
                  <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Pilih Template Email</h5>
                  <div className="space-y-3">
                    {emailTemplates.map((template) => (
                      <button 
                        key={template.id}
                        onClick={() => setSelectedTemplate(template)}
                        className={`w-full p-4 rounded-2xl border text-left transition-all ${selectedTemplate?.id === template.id ? 'bg-blue-900 text-white border-blue-900 shadow-lg' : 'bg-gray-50 border-gray-100 text-gray-600 hover:border-blue-200'}`}
                      >
                         <p className="text-xs font-black uppercase tracking-tight leading-none mb-1">{template.type.replace('_', ' ')}</p>
                         <p className={`text-[10px] font-bold ${selectedTemplate?.id === template.id ? 'text-blue-100' : 'text-gray-400'}`}>Update: {template.lastUpdated}</p>
                      </button>
                    ))}
                  </div>
               </div>
               
               <div className="p-8 bg-blue-900 text-white rounded-[2.5rem] shadow-xl relative overflow-hidden">
                  <div className="relative z-10">
                    <Code size={32} className="text-blue-300 mb-6" />
                    <h4 className="text-lg font-black mb-2 tracking-tight">Dynamic Tagging</h4>
                    <p className="text-blue-100 text-xs leading-relaxed font-bold uppercase tracking-tight opacity-80">
                      Gunakan tag seperti {'{{NAME}}'}, {'{{LINK}}'}, atau {'{{INSTITUTION}}'} untuk personalisasi email sistem secara otomatis.
                    </p>
                  </div>
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
               </div>
            </div>

            <div className="lg:col-span-2">
               {selectedTemplate ? (
                 <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full min-h-[600px]">
                    <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                       <div className="flex items-center space-x-3">
                         <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                           <FileEdit size={20} />
                         </div>
                         <h4 className="text-lg font-black text-gray-900">Editor: {selectedTemplate.type.replace('_', ' ')}</h4>
                       </div>
                       <button className="bg-blue-900 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 transition-all flex items-center space-x-2">
                         <Save size={14} />
                         <span>Simpan Template</span>
                       </button>
                    </div>
                    <div className="p-8 flex-1 space-y-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Subject</label>
                          <input 
                            type="text" 
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-sm"
                            value={selectedTemplate.subject}
                          />
                       </div>
                       <div className="flex-1 space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Body (Plain Text/HTML)</label>
                          <textarea 
                            className="w-full h-80 px-6 py-6 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-mono text-xs leading-relaxed"
                            value={selectedTemplate.body}
                          />
                       </div>
                    </div>
                    <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sent From: noreply@simperdin.id</span>
                       <button className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline">Test Send to My Email</button>
                    </div>
                 </div>
               ) : (
                 <div className="h-full min-h-[600px] flex flex-col items-center justify-center bg-gray-50/50 rounded-[2.5rem] border border-dashed border-gray-200">
                    <Mail size={48} className="text-gray-200 mb-4" />
                    <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Pilih template di sisi kiri untuk mulai mengedit</p>
                 </div>
               )}
            </div>
          </>
        )}

        {activeTab === 'UPDATES' && (
           <div className="lg:col-span-3 space-y-6">
              <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                 <div className="relative z-10">
                    <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                      <Rocket size={12} className="mr-2" /> New Version Ready
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 mb-4">Umumkan Pembaruan Sistem</h3>
                    <p className="text-gray-500 text-sm max-w-lg mb-6 leading-relaxed font-medium italic">
                      "Tingkatkan *user experience* dengan menginformasikan fitur baru kepada seluruh pegawai instansi. Pengumuman ini akan muncul di sidebar dashboard pengguna."
                    </p>
                    <button className="bg-blue-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20">
                       Rilis Change Log Baru
                    </button>
                 </div>
                 <div className="w-64 h-64 bg-blue-50 rounded-full flex items-center justify-center relative">
                    <Zap size={100} className="text-blue-900" />
                    <div className="absolute top-0 right-0 w-20 h-20 bg-amber-400 rounded-full border-8 border-white shadow-lg animate-bounce"></div>
                 </div>
              </div>

              <div className="space-y-4">
                 <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Arsip Update Log</h5>
                 {[
                   { ver: 'v2.5.0', date: '12 Mei 2024', desc: 'Implementasi generator PDF v2 dan integrasi SBM Nasional 2024.', type: 'MAJOR' },
                   { ver: 'v2.4.2', date: '01 Mei 2024', desc: 'Patch keamanan untuk otentikasi 2FA dan perbaikan bug export excel.', type: 'PATCH' },
                   { ver: 'v2.4.0', date: '15 April 2024', desc: 'Penambahan modul verifikasi pembayaran otomatis untuk Super Admin.', type: 'FEATURE' }
                 ].map((log, i) => (
                   <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-900/20 transition-all">
                      <div className="flex items-center space-x-6">
                         <div className="text-center w-20">
                            <p className="text-lg font-black text-gray-900">{log.ver}</p>
                            <p className="text-[9px] font-black text-gray-400 uppercase">{log.date}</p>
                         </div>
                         <div className="h-10 w-px bg-gray-100"></div>
                         <div>
                            <p className="text-sm font-bold text-gray-700">{log.desc}</p>
                            <span className={`text-[8px] font-black px-2 py-0.5 rounded mt-2 inline-block uppercase tracking-widest ${log.type === 'MAJOR' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                               {log.type}
                            </span>
                         </div>
                      </div>
                      <button className="p-2 text-gray-300 group-hover:text-blue-900 transition-all">
                         <FileEdit size={20} />
                      </button>
                   </div>
                 ))}
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default CommunicationPage;
