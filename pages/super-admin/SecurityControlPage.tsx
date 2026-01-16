
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Globe, 
  Plus, 
  Trash2, 
  Save, 
  Fingerprint, 
  ShieldAlert, 
  Clock, 
  Smartphone, 
  Shield, 
  Eye, 
  Ban, 
  MonitorCheck,
  Info,
  Zap,
  AlertTriangle,
  RefreshCw,
  ToggleRight,
  ChevronRight
} from 'lucide-react';

const SecurityControlPage: React.FC = () => {
  // Global Security Config State
  const [config, setConfig] = useState({
    minPasswordLength: 8,
    requireNumbers: true,
    requireSymbols: true,
    passwordExpiryDays: 90,
    sessionTimeout: 30, // Menit
    maxLoginAttempts: 5,
    lockoutDuration: 60, // Menit
    enable2FA: false,
    enableCaptcha: true,
    ipRestriction: false,
    whitelistedIPs: ['114.125.10.12', '103.21.44.5']
  });

  const [newIp, setNewIp] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleAddIp = () => {
    if (newIp && !config.whitelistedIPs.includes(newIp)) {
      setConfig({ ...config, whitelistedIPs: [...config.whitelistedIPs, newIp] });
      setNewIp('');
    }
  };

  const handleRemoveIp = (ip: string) => {
    setConfig({ ...config, whitelistedIPs: config.whitelistedIPs.filter(i => i !== ip) });
  };

  const handleSavePolicy = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Kebijakan Keamanan Global Berhasil Diterapkan ke Seluruh Tenant.");
    }, 1500);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Security & Access Control</h2>
          <p className="text-gray-500 text-sm font-medium mt-1">Konfigurasi standar keamanan tertinggi untuk integritas data platform.</p>
        </div>
        <button 
          onClick={handleSavePolicy}
          disabled={isSaving}
          className="bg-blue-900 text-white px-10 py-4 rounded-[1.5rem] flex items-center space-x-3 hover:bg-blue-800 transition-all font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-900/30 disabled:opacity-50"
        >
          {isSaving ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
          <span>{isSaving ? 'Applying Policy...' : 'Simpan & Terapkan Global'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Password & Session */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Password Policy Card */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                  <Key size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-black text-gray-900">Kebijakan Password Platform</h4>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Standar Kompleksitas Akses</p>
                </div>
              </div>
            </div>
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Minimal Karakter</label>
                <div className="relative">
                   <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                   <input 
                    type="number" 
                    value={config.minPasswordLength}
                    onChange={(e) => setConfig({...config, minPasswordLength: parseInt(e.target.value)})}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-black text-gray-900" 
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Kadaluwarsa Password (Hari)</label>
                <div className="relative">
                   <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                   <input 
                    type="number" 
                    value={config.passwordExpiryDays}
                    onChange={(e) => setConfig({...config, passwordExpiryDays: parseInt(e.target.value)})}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-black text-gray-900" 
                  />
                </div>
              </div>
              <div className="md:col-span-2 space-y-4">
                <label className="flex items-center justify-between p-5 bg-gray-50 rounded-[1.5rem] border border-gray-100 cursor-pointer hover:bg-white hover:border-blue-900/20 transition-all group">
                   <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-900 shadow-sm font-black italic">123</div>
                      <div>
                        <p className="text-sm font-black text-gray-800">Wajib Karakter Angka</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Minimal terdapat 1 angka (0-9)</p>
                      </div>
                   </div>
                   <input 
                    type="checkbox" 
                    className="w-6 h-6 accent-blue-900 rounded-lg" 
                    checked={config.requireNumbers} 
                    onChange={() => setConfig({...config, requireNumbers: !config.requireNumbers})} 
                  />
                </label>
                <label className="flex items-center justify-between p-5 bg-gray-50 rounded-[1.5rem] border border-gray-100 cursor-pointer hover:bg-white hover:border-blue-900/20 transition-all group">
                   <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-900 shadow-sm font-black italic">!@#</div>
                      <div>
                        <p className="text-sm font-black text-gray-800">Wajib Simbol / Spesial</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Minimal terdapat 1 karakter (!@#$%^&*)</p>
                      </div>
                   </div>
                   <input 
                    type="checkbox" 
                    className="w-6 h-6 accent-blue-900 rounded-lg" 
                    checked={config.requireSymbols} 
                    onChange={() => setConfig({...config, requireSymbols: !config.requireSymbols})} 
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Session & Login Shield */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                  <ShieldAlert size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-black text-gray-900">Sesi & Proteksi Login</h4>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Kontrol Akses User Aktif</p>
                </div>
              </div>
            </div>
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Session Inactivity Timeout</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={config.sessionTimeout}
                    onChange={(e) => setConfig({...config, sessionTimeout: parseInt(e.target.value)})}
                    className="w-full pl-6 pr-16 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-black text-gray-900" 
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400 uppercase">Menit</span>
                </div>
              </div>
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Limit Percobaan Login</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={config.maxLoginAttempts}
                    onChange={(e) => setConfig({...config, maxLoginAttempts: parseInt(e.target.value)})}
                    className="w-full pl-6 pr-16 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-black text-gray-900" 
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400 uppercase">Kali</span>
                </div>
              </div>
              <div className="md:col-span-2 p-8 bg-amber-50 rounded-[2rem] border border-amber-100 flex items-start space-x-5">
                <AlertTriangle size={32} className="text-amber-600 shrink-0 mt-1" />
                <div>
                   <p className="text-xs font-black text-amber-900 uppercase tracking-tight mb-2">Peringatan Keamanan</p>
                   <p className="text-[11px] text-amber-800 font-bold leading-relaxed uppercase tracking-tight">
                     Akun akan dikunci otomatis selama {config.lockoutDuration} menit jika login gagal melebihi batas. Super Admin dapat melakukan "Force Unlock" melalui manajemen user.
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Advanced Security Toggles & IP Whitelist */}
        <div className="space-y-8">
          
          {/* Advanced Toggles */}
          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
            <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Autentikasi Lanjutan</h5>
            
            <div className="flex items-center justify-between p-5 bg-gray-50 rounded-[1.5rem] border border-gray-100">
               <div className="flex items-center space-x-4">
                 <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                   <Smartphone size={20} />
                 </div>
                 <div>
                   <p className="text-xs font-black text-gray-900 uppercase">Multi-Factor (2FA)</p>
                   <p className="text-[9px] text-gray-400 font-bold uppercase italic">Wajib OTP Email</p>
                 </div>
               </div>
               <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={config.enable2FA} onChange={() => setConfig({...config, enable2FA: !config.enable2FA})} />
                <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-900"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-5 bg-gray-50 rounded-[1.5rem] border border-gray-100">
               <div className="flex items-center space-x-4">
                 <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                   <MonitorCheck size={20} />
                 </div>
                 <div>
                   <p className="text-xs font-black text-gray-900 uppercase">Captcha Gateway</p>
                   <p className="text-[9px] text-gray-400 font-bold uppercase italic">Bot Protection</p>
                 </div>
               </div>
               <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={config.enableCaptcha} onChange={() => setConfig({...config, enableCaptcha: !config.enableCaptcha})} />
                <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-900"></div>
              </label>
            </div>
          </div>

          {/* IP Whitelist Section */}
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">IP Restriction (WhiteList)</h5>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={config.ipRestriction} onChange={() => setConfig({...config, ipRestriction: !config.ipRestriction})} />
                <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-900"></div>
              </label>
            </div>

            <div className={`space-y-6 transition-all duration-500 ${config.ipRestriction ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  placeholder="Input IP Adress..." 
                  className="flex-1 px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-900/10 font-mono text-xs font-bold"
                  value={newIp}
                  onChange={(e) => setNewIp(e.target.value)}
                />
                <button 
                  onClick={handleAddIp}
                  className="p-3.5 bg-blue-900 text-white rounded-2xl hover:bg-blue-800 shadow-lg shadow-blue-900/20 transition-all"
                >
                  <Plus size={20} />
                </button>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto custom-scrollbar pr-2">
                {config.whitelistedIPs.map((ip) => (
                  <div key={ip} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl group hover:border-red-200 transition-all">
                    <div className="flex items-center space-x-3">
                      <Globe size={16} className="text-gray-400 group-hover:text-blue-900 transition-colors" />
                      <span className="text-xs font-black text-gray-700 font-mono">{ip}</span>
                    </div>
                    <button 
                      onClick={() => handleRemoveIp(ip)}
                      className="p-2 text-gray-300 hover:text-red-600 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Infrastructure Guard Info */}
          <div className="bg-gradient-to-br from-gray-900 to-blue-950 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                 <ShieldCheck size={48} className="text-amber-400 mb-8 group-hover:rotate-12 transition-transform duration-500" />
                 <h4 className="text-2xl font-black mb-4 tracking-tight leading-tight">Enkripsi Data Negara</h4>
                 <p className="text-blue-200 text-[11px] font-bold uppercase leading-relaxed tracking-tight opacity-90 mb-8">
                   Seluruh data kearsipan digital (SPPD & Bukti Riil) dienkripsi menggunakan standar AES-256 dan protokol SSL/TLS 1.3 terbaru.
                 </p>
                 <div className="flex items-center space-x-3 text-[9px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-4 py-2 rounded-xl border border-emerald-400/20">
                    <Zap size={14} className="fill-emerald-400" />
                    <span>Compliance: ISO 27001</span>
                 </div>
              </div>
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityControlPage;
