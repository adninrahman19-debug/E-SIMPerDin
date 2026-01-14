
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Clock, 
  ShieldAlert, 
  Fingerprint, 
  Smartphone, 
  Globe, 
  Plus, 
  Trash2, 
  Save, 
  Info,
  Shield,
  Eye,
  Key,
  Ban,
  MonitorCheck
} from 'lucide-react';

const SecurityControlPage: React.FC = () => {
  // Mock State for Security Settings
  const [config, setConfig] = useState({
    minPasswordLength: 8,
    requireNumbers: true,
    requireSymbols: true,
    passwordExpiryDays: 90,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    lockoutDuration: 60,
    enable2FA: false,
    enableCaptcha: true,
    ipRestriction: false,
    whitelistedIPs: ['114.125.10.12', '103.21.44.5']
  });

  const [newIp, setNewIp] = useState('');

  const handleAddIp = () => {
    if (newIp && !config.whitelistedIPs.includes(newIp)) {
      setConfig({ ...config, whitelistedIPs: [...config.whitelistedIPs, newIp] });
      setNewIp('');
    }
  };

  const handleRemoveIp = (ip: string) => {
    setConfig({ ...config, whitelistedIPs: config.whitelistedIPs.filter(i => i !== ip) });
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Keamanan & Akses Sistem</h2>
          <p className="text-gray-500 text-sm font-medium">Konfigurasi kebijakan proteksi global dan parameter otentikasi platform.</p>
        </div>
        <button className="bg-blue-900 text-white px-8 py-3 rounded-xl flex items-center space-x-2 hover:bg-blue-800 transition-all font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-900/20">
          <Save size={18} />
          <span>Simpan Kebijakan</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Password & Session */}
        <div className="lg:col-span-2 space-y-8">
          {/* Password Policy Card */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center">
                  <Key size={24} />
                </div>
                <h4 className="text-xl font-black text-gray-900">Kebijakan Password Global</h4>
              </div>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Panjang Minimum Karakter</label>
                <input 
                  type="number" 
                  value={config.minPasswordLength}
                  onChange={(e) => setConfig({...config, minPasswordLength: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold" 
                />
              </div>
              <div className="space-y-4">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Kadaluwarsa Password (Hari)</label>
                <input 
                  type="number" 
                  value={config.passwordExpiryDays}
                  onChange={(e) => setConfig({...config, passwordExpiryDays: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold" 
                />
              </div>
              <div className="md:col-span-2 flex flex-col space-y-4">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative">
                    <input type="checkbox" className="sr-only peer" checked={config.requireNumbers} onChange={() => setConfig({...config, requireNumbers: !config.requireNumbers})} />
                    <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-900 transition-all"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:left-5"></div>
                  </div>
                  <span className="text-sm font-bold text-gray-700 group-hover:text-blue-900">Wajib menggunakan angka (0-9)</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative">
                    <input type="checkbox" className="sr-only peer" checked={config.requireSymbols} onChange={() => setConfig({...config, requireSymbols: !config.requireSymbols})} />
                    <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-900 transition-all"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:left-5"></div>
                  </div>
                  <span className="text-sm font-bold text-gray-700 group-hover:text-blue-900">Wajib menggunakan karakter spesial (!@#$%^&*)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Session & Login Security Card */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                  <Clock size={24} />
                </div>
                <h4 className="text-xl font-black text-gray-900">Sesi & Otoritas Login</h4>
              </div>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Session Timeout (Menit)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={config.sessionTimeout}
                    onChange={(e) => setConfig({...config, sessionTimeout: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold" 
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400">MIN</span>
                </div>
              </div>
              <div className="space-y-4">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Batas Percobaan Login</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={config.maxLoginAttempts}
                    onChange={(e) => setConfig({...config, maxLoginAttempts: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/10 font-bold" 
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400">KALI</span>
                </div>
              </div>
              <div className="md:col-span-2 p-6 bg-amber-50 rounded-2xl border border-amber-100 flex items-start space-x-3">
                <ShieldAlert size={20} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[10px] text-amber-800 font-bold leading-relaxed uppercase tracking-tight">
                  Jika pengguna melebihi batas percobaan login, akun akan dikunci secara otomatis selama {config.lockoutDuration} menit untuk mencegah serangan Brute-Force.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Advanced Security */}
        <div className="space-y-8">
          {/* MFA & Captcha Toggle */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Otentikasi Berlapis</h5>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
               <div className="flex items-center space-x-3">
                 <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                   <Smartphone size={20} />
                 </div>
                 <div>
                   <p className="text-xs font-black text-gray-900 uppercase">Wajib 2FA</p>
                   <p className="text-[10px] text-gray-400 font-bold italic">Email / App OTP</p>
                 </div>
               </div>
               <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={config.enable2FA} onChange={() => setConfig({...config, enable2FA: !config.enable2FA})} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
               <div className="flex items-center space-x-3">
                 <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                   <MonitorCheck size={20} />
                 </div>
                 <div>
                   <p className="text-xs font-black text-gray-900 uppercase">Proteksi CAPTCHA</p>
                   <p className="text-[10px] text-gray-400 font-bold italic">Bot Prevention</p>
                 </div>
               </div>
               <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={config.enableCaptcha} onChange={() => setConfig({...config, enableCaptcha: !config.enableCaptcha})} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
              </label>
            </div>
          </div>

          {/* IP Restriction Card */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">IP Restriction</h5>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={config.ipRestriction} onChange={() => setConfig({...config, ipRestriction: !config.ipRestriction})} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
              </label>
            </div>

            <div className={`space-y-4 transition-all duration-300 ${config.ipRestriction ? 'opacity-100' : 'opacity-40 pointer-events-none grayscale'}`}>
              <div className="flex items-center space-x-2">
                <input 
                  type="text" 
                  placeholder="Tambah IP (e.g. 192.168.1.1)" 
                  className="flex-1 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-900/10"
                  value={newIp}
                  onChange={(e) => setNewIp(e.target.value)}
                />
                <button 
                  onClick={handleAddIp}
                  className="p-2 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition-all"
                >
                  <Plus size={18} />
                </button>
              </div>

              <div className="max-h-48 overflow-y-auto space-y-2 custom-scrollbar pr-1">
                {config.whitelistedIPs.map((ip) => (
                  <div key={ip} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-xl group hover:border-blue-900/20 transition-all">
                    <div className="flex items-center space-x-2">
                      <Globe size={14} className="text-gray-400" />
                      <span className="text-xs font-black text-gray-700 font-mono">{ip}</span>
                    </div>
                    <button 
                      onClick={() => handleRemoveIp(ip)}
                      className="text-gray-400 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              {config.whitelistedIPs.length === 0 && (
                <p className="text-center text-[10px] font-bold text-gray-400 uppercase py-4">Belum ada IP terdaftar</p>
              )}
            </div>
          </div>

          <div className="p-8 bg-blue-900 text-white rounded-[2.5rem] shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <ShieldCheck size={32} className="text-amber-400 mb-6" />
              <h4 className="text-xl font-black mb-2">Proteksi Terjamin</h4>
              <p className="text-blue-100 text-xs leading-relaxed font-bold uppercase tracking-tight opacity-80">
                Arsitektur keamanan E-SIMPerDin memenuhi standar ISO 27001 dan regulasi perlindungan data kearsipan digital nasional.
              </p>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityControlPage;
