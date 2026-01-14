
import React, { useState } from 'react';
import { 
  DEFAULT_SYSTEM_CONFIG 
} from '../../constants';
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
  Info
} from 'lucide-react';
import { SystemConfig } from '../../types';

const SystemSettingsPage: React.FC = () => {
  const [config, setConfig] = useState<SystemConfig>(DEFAULT_SYSTEM_CONFIG);
  const [activeTab, setActiveTab] = useState<'BRANDING' | 'SYSTEM'>('BRANDING');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulasi proses penyimpanan
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Pengaturan Platform</h2>
          <p className="text-gray-500 text-sm font-medium">Kustomisasi identitas visual dan konfigurasi parameter teknis global.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`bg-blue-900 text-white px-8 py-3 rounded-xl flex items-center space-x-2 hover:bg-blue-800 transition-all font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-900/20 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSaving ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
            <span>{isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center space-x-3 animate-in slide-in-from-top-2">
          <CheckCircle2 size={20} className="text-emerald-600" />
          <p className="text-sm font-black text-emerald-800 uppercase tracking-tight">Konfigurasi sistem berhasil diperbarui!</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-3">
          <button 
            onClick={() => setActiveTab('BRANDING')}
            className={`w-full flex items-center space-x-3 p-4 rounded-2xl font-bold text-sm transition-all ${activeTab === 'BRANDING' ? 'bg-blue-900 text-white shadow-xl' : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'}`}
          >
            <Palette size={20} />
            <span>Visual & Branding</span>
          </button>
          <button 
            onClick={() => setActiveTab('SYSTEM')}
            className={`w-full flex items-center space-x-3 p-4 rounded-2xl font-bold text-sm transition-all ${activeTab === 'SYSTEM' ? 'bg-blue-900 text-white shadow-xl' : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'}`}
          >
            <Monitor size={20} />
            <span>Sistem & Lokalisasi</span>
          </button>

          <div className="mt-10 p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 relative overflow-hidden">
             <div className="relative z-10">
               <Zap size={24} className="text-blue-900 mb-4" />
               <h4 className="text-sm font-black text-blue-900 uppercase leading-tight mb-2">Pembaruan Versi</h4>
               <p className="text-[10px] text-blue-700 font-bold uppercase tracking-tight opacity-80">Gunakan fitur "Update Sistem" pada modul Maintenance untuk memperbarui kode dasar aplikasi.</p>
             </div>
             <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {activeTab === 'BRANDING' ? (
            <div className="space-y-8 animate-in slide-in-from-right-4">
              {/* Branding Section */}
              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex items-center space-x-4">
                   <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center">
                     <ImageIcon size={24} />
                   </div>
                   <div>
                     <h4 className="text-xl font-black text-gray-900">Identitas Aplikasi</h4>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Logo & Penamaan Global</p>
                   </div>
                </div>
                <div className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                       <div>
                         <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Nama Aplikasi</label>
                         <div className="relative">
                            <Type size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                              type="text" 
                              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold"
                              value={config.appName}
                              onChange={(e) => setConfig({...config, appName: e.target.value})}
                            />
                         </div>
                       </div>
                       <div>
                         <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Versi Aplikasi (Internal Label)</label>
                         <div className="relative">
                            <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                              type="text" 
                              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-mono text-xs font-bold"
                              value={config.version}
                              onChange={(e) => setConfig({...config, version: e.target.value})}
                            />
                         </div>
                       </div>
                    </div>
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-[2rem] p-8 bg-gray-50/30 group hover:border-blue-900/20 transition-all">
                       <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-blue-900 mb-4 border border-gray-100 group-hover:scale-110 transition-transform">
                         <span className="text-4xl font-black">{config.appName.charAt(0)}</span>
                       </div>
                       <button className="flex items-center space-x-2 text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline">
                         <Camera size={14} />
                         <span>Upload Logo Baru</span>
                       </button>
                       <p className="text-[9px] text-gray-400 mt-2 font-bold uppercase">PNG/SVG Max 2MB (256x256)</p>
                    </div>
                  </div>

                  <div className="space-y-6 pt-6 border-t border-gray-50">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Teks Footer (Main)</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold text-sm"
                        value={config.footerText}
                        onChange={(e) => setConfig({...config, footerText: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Legal & Disclaimer Text</label>
                      <textarea 
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-medium text-xs resize-none"
                        value={config.legalText}
                        onChange={(e) => setConfig({...config, legalText: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 p-6 rounded-[2.5rem] border border-amber-100 flex items-start space-x-3">
                <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[10px] text-amber-800 font-bold leading-relaxed uppercase tracking-tight">
                  Perubahan branding akan berdampak pada seluruh dashboard (Landing Page, Sidebar, & Login Page). Harap verifikasi logo baru sebelum menyimpan.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in slide-in-from-right-4">
               {/* Localization Section */}
               <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex items-center space-x-4">
                   <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                     <Globe size={24} />
                   </div>
                   <div>
                     <h4 className="text-xl font-black text-gray-900">Lokalisasi & Regional</h4>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Standarisasi Format Global</p>
                   </div>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Bahasa Default Sistem</label>
                      <div className="relative">
                         <Languages size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                         <select 
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold appearance-none"
                          value={config.defaultLanguage}
                          onChange={(e) => setConfig({...config, defaultLanguage: e.target.value as any})}
                         >
                            <option value="ID">Bahasa Indonesia (ID)</option>
                            <option value="EN">English (EN)</option>
                         </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Format Tanggal</label>
                      <div className="relative">
                         <FileText size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                         <select 
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold appearance-none"
                          value={config.dateFormat}
                          onChange={(e) => setConfig({...config, dateFormat: e.target.value})}
                         >
                            <option value="DD/MM/YYYY">DD/MM/YYYY (31/12/2024)</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD (2024-12-31)</option>
                            <option value="MM/DD/YYYY">MM/DD/YYYY (12/31/2024)</option>
                         </select>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Zona Waktu (Timezone)</label>
                      <div className="relative">
                         <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                         <select 
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold appearance-none"
                          value={config.timezone}
                          onChange={(e) => setConfig({...config, timezone: e.target.value})}
                         >
                            <option value="Asia/Jakarta (WIB)">Asia/Jakarta (WIB) - GMT+7</option>
                            <option value="Asia/Makassar (WITA)">Asia/Makassar (WITA) - GMT+8</option>
                            <option value="Asia/Jayapura (WIT)">Asia/Jayapura (WIT) - GMT+9</option>
                         </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Mata Uang & Angka</label>
                      <div className="relative">
                         <Type size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                         <select 
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold appearance-none"
                          value={config.numberFormat}
                          onChange={(e) => setConfig({...config, numberFormat: e.target.value})}
                         >
                            <option value="IDR (Rp)">IDR (Rp 1.000,00)</option>
                            <option value="USD ($)">USD ($ 1,000.00)</option>
                         </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                   <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                     <ShieldCheck size={14} className="mr-2" /> Pengaturan ini akan menimpa preferensi regional bagi institusi baru.
                   </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-900 text-white rounded-2xl flex items-center justify-center">
                    <Info size={24} />
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-gray-900 uppercase">Status Lisensi Inti</h5>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Layanan E-SIMPerDin Terpusat</p>
                  </div>
                </div>
                <div className="text-right">
                   <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                     SaaS Operational
                   </span>
                   <p className="text-[9px] text-gray-400 font-bold mt-2 uppercase">Valid Until: 2029</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemSettingsPage;
