
import React, { useState } from 'react';
import { 
  Settings, 
  Palette, 
  Globe, 
  Clock, 
  Save, 
  AlertCircle, 
  CheckCircle2, 
  Image as ImageIcon, 
  Type, 
  Hash, 
  Languages, 
  FileText, 
  ShieldCheck, 
  Monitor, 
  Zap, 
  ChevronRight,
  RefreshCw,
  Camera,
  Info,
  Layout,
  Layers,
  Coins
} from 'lucide-react';
import { DEFAULT_SYSTEM_CONFIG } from '../../constants';

const SystemSettingsPage: React.FC = () => {
  const [config, setConfig] = useState(DEFAULT_SYSTEM_CONFIG);
  const [activeTab, setActiveTab] = useState<'BRANDING' | 'SYSTEM'>('BRANDING');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulasi proses sinkronisasi ke server
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Platform Master Configuration</h2>
          <p className="text-gray-500 text-sm font-medium mt-1">Kelola identitas global, parameter lokalisasi, dan standar operasional inti.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-900 text-white px-10 py-4 rounded-[1.5rem] flex items-center space-x-3 hover:bg-blue-800 transition-all font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-900/30 disabled:opacity-50"
        >
          {isSaving ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
          <span>{isSaving ? 'Synchronizing...' : 'Simpan & Terapkan Global'}</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="mb-8 p-5 bg-emerald-50 border border-emerald-100 rounded-[1.5rem] flex items-center space-x-4 animate-in slide-in-from-top-4 duration-500">
          <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-sm font-black text-emerald-900 uppercase tracking-tight">Konfigurasi Berhasil Diperbarui</p>
            <p className="text-[11px] text-emerald-700 font-bold uppercase opacity-80">Perubahan identitas dan lokalisasi telah direplikasi ke seluruh tenant.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-3 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-1">
            <button 
              onClick={() => setActiveTab('BRANDING')}
              className={`w-full flex items-center justify-between p-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'BRANDING' ? 'bg-blue-900 text-white shadow-xl' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <div className="flex items-center space-x-4">
                <Palette size={20} />
                <span>Visual & Branding</span>
              </div>
              <ChevronRight size={16} className={activeTab === 'BRANDING' ? 'opacity-100' : 'opacity-20'} />
            </button>
            <button 
              onClick={() => setActiveTab('SYSTEM')}
              className={`w-full flex items-center justify-between p-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'SYSTEM' ? 'bg-blue-900 text-white shadow-xl' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <div className="flex items-center space-x-4">
                <Monitor size={20} />
                <span>Regional & Sistem</span>
              </div>
              <ChevronRight size={16} className={activeTab === 'SYSTEM' ? 'opacity-100' : 'opacity-20'} />
            </button>
          </div>

          <div className="p-8 bg-indigo-900 text-white rounded-[2.5rem] shadow-xl relative overflow-hidden group">
             <div className="relative z-10">
                <Zap size={32} className="text-amber-400 mb-6 group-hover:rotate-12 transition-transform duration-500" />
                <h4 className="text-lg font-black mb-2 tracking-tight">Core License</h4>
                <p className="text-indigo-100 text-[10px] font-bold uppercase leading-relaxed tracking-tight opacity-80 mb-8">
                  Instalasi ini beroperasi di bawah lisensi Enterprise E-SIMPerDin Cluster. Status: <span className="text-emerald-400">UNLIMITED TENANTS</span>.
                </p>
                <div className="flex items-center space-x-3 text-[9px] font-black uppercase text-blue-300">
                   <ShieldCheck size={14} />
                   <span>Security Hash: v2.5-STABLE-2024</span>
                </div>
             </div>
             <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {activeTab === 'BRANDING' ? (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              {/* Branding Card */}
              <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500">
                <div className="p-8 border-b border-gray-50 flex items-center space-x-4 bg-gray-50/30">
                   <div className="w-14 h-14 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                     <Palette size={28} />
                   </div>
                   <div>
                     <h4 className="text-xl font-black text-gray-900">Identitas & Branding Global</h4>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Kustomisasi Wajah Platform</p>
                   </div>
                </div>
                
                <div className="p-10 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                       <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Platform Aplikasi</label>
                         <div className="relative">
                            <Type size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                            <input 
                              type="text" 
                              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-black text-gray-900"
                              value={config.appName}
                              onChange={(e) => setConfig({...config, appName: e.target.value})}
                            />
                         </div>
                       </div>
                       <div className="space-y-2">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Label Versi Aktif</label>
                         <div className="relative">
                            <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                            <input 
                              type="text" 
                              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-mono text-xs font-bold"
                              value={config.version}
                              onChange={(e) => setConfig({...config, version: e.target.value})}
                            />
                         </div>
                       </div>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center p-8 bg-gray-50/50 border-2 border-dashed border-gray-100 rounded-[2.5rem] group/logo hover:border-blue-900/20 transition-all">
                       <div className="w-24 h-24 bg-white rounded-[2rem] shadow-sm flex items-center justify-center text-blue-900 mb-6 border border-gray-50 relative overflow-hidden group-hover/logo:scale-105 transition-transform">
                          <span className="text-4xl font-black">{config.appName.charAt(0)}</span>
                          <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover/logo:opacity-100 transition-all flex items-center justify-center">
                             <Camera size={24} className="text-white" />
                          </div>
                       </div>
                       <button className="text-[10px] font-black text-blue-900 uppercase tracking-[0.2em] hover:underline">Ganti Logo Utama</button>
                       <p className="text-[9px] text-gray-400 font-bold uppercase mt-2">Recommended: SVG or PNG (256x256)</p>
                    </div>
                  </div>

                  <div className="space-y-8 pt-10 border-t border-gray-50">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Teks Footer Aplikasi</label>
                      <div className="relative">
                         <Layout size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                         <input 
                           type="text" 
                           className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold text-sm"
                           value={config.footerText}
                           onChange={(e) => setConfig({...config, footerText: e.target.value})}
                         />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Legal Notice & Disclaimer</label>
                      <textarea 
                        rows={3}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[2rem] outline-none focus:ring-2 focus:ring-blue-900/10 font-medium text-xs resize-none"
                        value={config.legalText}
                        onChange={(e) => setConfig({...config, legalText: e.target.value})}
                        placeholder="Contoh: Seluruh hak cipta dilindungi oleh peraturan perundang-undangan RI..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-amber-50 rounded-[3rem] border border-amber-100 flex items-start space-x-6">
                <AlertCircle size={32} className="text-amber-600 shrink-0 mt-1" />
                <div>
                   <h5 className="text-sm font-black text-amber-900 uppercase mb-2">Peringatan Visual</h5>
                   <p className="text-[10px] text-amber-800 font-bold leading-relaxed uppercase tracking-tight">
                     Setiap perubahan pada Nama Platform dan Logo akan langsung terlihat pada halaman login seluruh instansi. Pastikan aset visual sudah sesuai dengan standar panduan branding perusahaan.
                   </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
               {/* Localization Section */}
               <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500">
                <div className="p-8 border-b border-gray-50 flex items-center space-x-4 bg-gray-50/30">
                   <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                     <Globe size={28} />
                   </div>
                   <div>
                     <h4 className="text-xl font-black text-gray-900">Regional & Standar Sistem</h4>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Konfigurasi Parameter Global</p>
                   </div>
                </div>
                
                <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Bahasa Default Platform</label>
                      <div className="relative">
                         <Languages size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                         <select 
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold appearance-none cursor-pointer"
                          value={config.defaultLanguage}
                          onChange={(e) => setConfig({...config, defaultLanguage: e.target.value as any})}
                         >
                            <option value="ID">Bahasa Indonesia (ID)</option>
                            <option value="EN">English Global (EN)</option>
                         </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Zona Waktu (Global Timezone)</label>
                      <div className="relative">
                         <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                         <select 
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold appearance-none cursor-pointer"
                          value={config.timezone}
                          onChange={(e) => setConfig({...config, timezone: e.target.value})}
                         >
                            <option value="Asia/Jakarta (WIB)">Asia/Jakarta (WIB) - GMT+7</option>
                            <option value="Asia/Makassar (WITA)">Asia/Makassar (WITA) - GMT+8</option>
                            <option value="Asia/Jayapura (WIT)">Asia/Jayapura (WIT) - GMT+9</option>
                         </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Format Tanggal Laporan</label>
                      <div className="relative">
                         <FileText size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                         <select 
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold appearance-none cursor-pointer"
                          value={config.dateFormat}
                          onChange={(e) => setConfig({...config, dateFormat: e.target.value})}
                         >
                            <option value="DD/MM/YYYY">DD/MM/YYYY (E.g. 31/12/2024)</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD (E.g. 2024-12-31)</option>
                            <option value="MM/DD/YYYY">MM/DD/YYYY (E.g. 12/31/2024)</option>
                         </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mata Uang & Format Angka</label>
                      <div className="relative">
                         <Coins size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                         <select 
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold appearance-none cursor-pointer"
                          value={config.numberFormat}
                          onChange={(e) => setConfig({...config, numberFormat: e.target.value})}
                         >
                            <option value="IDR (Rp)">Rupiah (Rp 1.000,00)</option>
                            <option value="USD ($)">Dollar ($ 1,000.00)</option>
                         </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-10 py-6 bg-gray-50 border-t border-gray-100 flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center text-blue-900">
                    <Info size={18} />
                  </div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight leading-relaxed">
                    Pengaturan Regional ini akan menjadi nilai bawaan (*default values*) bagi seluruh Instansi baru yang didaftarkan ke platform.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-indigo-950 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                 <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                    <div className="max-w-xl">
                       <h4 className="text-2xl font-black mb-4 tracking-tight leading-tight">Sinkronisasi Metadata Global</h4>
                       <p className="text-indigo-100 text-[11px] font-bold uppercase leading-relaxed tracking-tight opacity-90 italic">
                         "Pastikan zona waktu sesuai dengan lokasi server utama agar proses backup terjadwal dan log aktivitas terekam secara presisi sesuai waktu lokal."
                       </p>
                    </div>
                    <button className="bg-white text-indigo-900 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-xl whitespace-nowrap">
                       Update System Vitals
                    </button>
                 </div>
                 <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemSettingsPage;
