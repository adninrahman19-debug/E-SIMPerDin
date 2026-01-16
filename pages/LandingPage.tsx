
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  FileText, 
  Settings, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  BarChart3, 
  Globe, 
  Lock, 
  Mail,
  Zap,
  Printer,
  Clock,
  ShieldAlert,
  Search,
  ChevronRight,
  Info
} from 'lucide-react';
import { MOCK_PLANS } from '../constants';

const FeatureCard = ({ icon: Icon, title, description, to }: { icon: any, title: string, description: string, to: string }) => (
  <Link to={to} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
    <div className="w-14 h-14 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-900 group-hover:text-white transition-all duration-500">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">{description}</p>
    <div className="flex items-center text-[10px] font-black text-blue-900 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
      Pelajari Selengkapnya <ChevronRight size={14} className="ml-1" />
    </div>
  </Link>
);

const LandingPage: React.FC = () => {
  const scrollToPricing = () => {
    const element = document.getElementById('harga');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-h-screen selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 py-5">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-blue-900 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl shadow-blue-900/20 group-hover:rotate-6 transition-transform">E</div>
            <span className="text-2xl font-black tracking-tighter text-blue-900 uppercase">SIMPerDin</span>
          </Link>
          <div className="hidden lg:flex items-center space-x-10 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
            <Link to="/features" className="hover:text-blue-900 transition-colors">Fitur Utama</Link>
            <Link to="/roles" className="hover:text-blue-900 transition-colors">Akses Peran</Link>
            <Link to="/pricing" className="hover:text-blue-900 transition-colors">Harga & Paket</Link>
            <Link to="/security" className="hover:text-blue-900 transition-colors">Keamanan</Link>
          </div>
          <div className="flex items-center space-x-4">
             <Link to="/login" className="px-8 py-3.5 bg-blue-900 text-white rounded-[1.25rem] font-black text-[10px] uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20">
               Masuk Sistem
             </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-48 pb-24 px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 relative z-10 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-100">
              <ShieldCheck size={14} className="mr-2" /> Digital Governance Platform
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-gray-900 leading-[1.05] tracking-tighter">
              Birokrasi Cerdas, <span className="text-blue-900 italic">Tanpa Batas.</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed max-w-lg font-medium">
              Ekosistem manajemen perjalanan dinas elektronik paling aman di Indonesia. Kelola SPPD secara otomatis, transparan, dan akuntabel.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button 
                onClick={scrollToPricing}
                className="bg-blue-900 text-white px-10 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-all shadow-2xl shadow-blue-900/40 flex items-center justify-center group"
              >
                Lihat Penawaran <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={18} />
              </button>
              <Link to="/login" className="bg-white text-gray-900 border-2 border-gray-100 px-10 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center">
                Mulai Trial Gratis
              </Link>
            </div>
          </div>
          <div className="relative animate-in fade-in zoom-in duration-1000 delay-300">
            <div className="bg-blue-900/5 absolute -inset-10 rounded-[4rem] -rotate-3 blur-3xl"></div>
            <div className="relative">
               <img 
                 src="https://images.unsplash.com/photo-1551288049-bbbda546697a?auto=format&fit=crop&q=80&w=1200" 
                 alt="Dashboard Interface" 
                 className="relative rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-white"
               />
               <div className="absolute -bottom-10 -left-10 p-8 bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 max-w-[240px] animate-bounce-slow">
                  <div className="flex items-center space-x-3 mb-4">
                     <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg"><CheckCircle size={20} /></div>
                     <span className="text-xs font-black uppercase text-gray-900">SPPD Disetujui</span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase tracking-tighter">Otorisasi Kepala Dinas Selesai Secara Real-time.</p>
               </div>
            </div>
          </div>
        </div>
        <div className="absolute -right-40 -top-40 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] opacity-60"></div>
      </header>

      {/* Problem Section */}
      <section className="py-32 bg-gray-50 px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <p className="text-[10px] font-black text-blue-900 uppercase tracking-[0.3em]">Masalah Klasik</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">Mengapa Anda Harus Segera Berpindah Ke Digital?</h2>
            <p className="text-lg text-gray-500 font-medium">Sistem manual menghambat efisiensi organisasi dan rawan terhadap temuan audit.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: AlertCircle, title: 'Inakurasi Anggaran', desc: 'Perhitungan SBM manual seringkali melampaui plafon yang ditetapkan di DIPA.', color: 'text-red-500 bg-red-50' },
              { icon: Clock, title: 'Approval Lambat', desc: 'Berkas fisik sering tertahan di meja pimpinan tanpa kejelasan status pengajuan.', color: 'text-amber-500 bg-amber-50' },
              { icon: Search, title: 'Data Sulit Diaudit', desc: 'Mencari riwayat perjalanan tahun lalu membutuhkan waktu berhari-hari di gudang arsip.', color: 'text-indigo-500 bg-indigo-50' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-8 shadow-inner`}>
                  <item.icon size={32} />
                </div>
                <h4 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Preview Section */}
      <section id="fitur" className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl space-y-6">
              <p className="text-[10px] font-black text-blue-900 uppercase tracking-[0.3em]">Fitur Platform</p>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-none">Inovasi Terpadu dalam Satu Dashboard</h2>
              <p className="text-lg text-gray-500 font-medium">E-SIMPerDin mengintegrasikan seluruh proses administrasi ke dalam alur kerja digital yang cerdas.</p>
            </div>
            <Link to="/features" className="group flex items-center space-x-3 text-blue-900 font-black text-sm uppercase tracking-widest hover:underline">
              <span>Eksplor Seluruh Fitur</span> <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard 
              icon={Globe} 
              title="Multi-Tenant Isolation" 
              description="Data antar instansi terisolasi secara aman. Privasi dan kerahasiaan lembaga terjamin sepenuhnya."
              to="/security"
            />
            <FeatureCard 
              icon={Settings} 
              title="Kalkulasi SBM Otomatis" 
              description="Sistem menghitung uang harian, hotel, dan transport sesuai regulasi PMK/SBM terbaru secara instan."
              to="/features"
            />
            <FeatureCard 
              icon={Users} 
              title="RBAC Security" 
              description="Manajemen peran yang ketat dari Super Admin hingga Pegawai guna mencegah penyalahgunaan data."
              to="/roles"
            />
            <FeatureCard 
              icon={Printer} 
              title="Custom Layouting" 
              description="Sesuaikan format cetak PDF dengan tata naskah dinas resmi dan kop surat instansi Anda."
              to="/features"
            />
            <FeatureCard 
              icon={BarChart3} 
              title="Real-time Reporting" 
              description="Dapatkan rekapitulasi realisasi anggaran dan intensitas perjalanan dinas secara kolektif."
              to="/features"
            />
            <FeatureCard 
              icon={Lock} 
              title="Data Integrity" 
              description="Setiap dokumen memiliki sidik jari digital (Hash) unik untuk menjamin keaslian arsip permanen."
              to="/security"
            />
          </div>
        </div>
      </section>

      {/* Role-Based Section (Short) */}
      <section id="peran" className="py-32 bg-blue-900 text-white px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <p className="text-[10px] font-black text-blue-300 uppercase tracking-[0.4em] mb-8">Personalized Experience</p>
          <h2 className="text-4xl md:text-6xl font-black mb-20 tracking-tight">Pengalaman Sesuai Tanggung Jawab</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
            {[
              { role: 'Super Admin', icon: Globe },
              { role: 'Admin Instansi', icon: ShieldCheck },
              { role: 'Operator', icon: Settings },
              { role: 'Penyetuju', icon: FileText },
              { role: 'Pegawai', icon: Users }
            ].map((item, idx) => (
              <div key={idx} className="space-y-6 group">
                <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto border border-white/10 group-hover:bg-white group-hover:text-blue-900 transition-all duration-500 shadow-2xl">
                  <item.icon size={32} />
                </div>
                <h4 className="font-black text-sm uppercase tracking-widest">{item.role}</h4>
              </div>
            ))}
          </div>
          <Link to="/roles" className="mt-20 inline-flex items-center space-x-3 bg-white text-blue-900 px-10 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all">
             <span>Pelajari Matriks Hak Akses</span> <ChevronRight size={18} />
          </Link>
        </div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px]"></div>
      </section>

      {/* Subscription Section */}
      <section id="harga" className="py-32 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
             <p className="text-[10px] font-black text-blue-900 uppercase tracking-[0.3em]">Transparent Pricing</p>
             <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">Investasi Terbaik Untuk Transparansi Lembaga</h2>
             <p className="text-lg text-gray-500 font-medium">Pilih paket yang sesuai dengan volume perjalanan dinas instansi Anda.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {MOCK_PLANS.map((plan) => (
              <div key={plan.id} className={`p-12 rounded-[3.5rem] border flex flex-col transition-all duration-500 relative group ${plan.id === 'plan-pro' ? 'border-blue-900 shadow-[0_40px_80px_-15px_rgba(30,58,138,0.2)] scale-105 z-10' : 'border-gray-100 shadow-sm hover:border-blue-900/30'}`}>
                {plan.id === 'plan-pro' && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-900 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">Paling Populer</div>
                )}
                <div className="mb-12">
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-2 uppercase">{plan.name}</h3>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-5xl font-black text-gray-900 tracking-tighter">Rp {(plan.price / 1000).toLocaleString('id-ID')}K</span>
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">/ Bulan</span>
                  </div>
                </div>
                <ul className="space-y-6 mb-12 flex-1">
                  <li className="flex items-center text-sm font-bold text-gray-700">
                    <CheckCircle className="text-emerald-500 mr-3 shrink-0" size={20} /> Hingga {plan.userLimit === 9999 ? 'Unlimited' : plan.userLimit} Users
                  </li>
                  <li className="flex items-center text-sm font-bold text-gray-700">
                    <CheckCircle className="text-emerald-500 mr-3 shrink-0" size={20} /> {plan.sppdLimit === 9999 ? 'Unlimited' : plan.sppdLimit} SPPD / Bulan
                  </li>
                  {plan.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-500 font-medium">
                      <CheckCircle className="text-emerald-500 mr-3 shrink-0 mt-0.5" size={20} /> {f}
                    </li>
                  ))}
                </ul>
                <div className="pt-8 border-t border-gray-50 space-y-4">
                  <Link to="/pricing" className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline block text-center mb-4">Lihat Detail Paket & Limitasi</Link>
                  <Link to="/login" className={`w-full py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest text-center transition-all ${plan.id === 'plan-pro' ? 'bg-blue-900 text-white hover:bg-blue-800 shadow-xl' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                    Pilih Paket {plan.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Final CTA */}
      <section className="py-24 bg-gray-900 text-white px-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-16 text-center md:text-left">
          <div className="w-32 h-32 bg-blue-600 rounded-[2.5rem] flex items-center justify-center shrink-0 shadow-2xl shadow-blue-600/30">
            <ShieldCheck size={64} />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Kedaulatan Data Instansi adalah Prioritas Utama</h2>
            <p className="text-gray-400 leading-relaxed font-medium text-lg">
              E-SIMPerDin menjamin integritas data perjalanan dinas dengan standar keamanan tingkat tinggi yang telah teruji pada puluhan instansi di Indonesia.
            </p>
            <div className="flex justify-center md:justify-start">
               <Link to="/security" className="text-blue-400 font-black text-xs uppercase tracking-[0.2em] flex items-center hover:text-white transition-colors">
                  Lihat Sertifikasi & Kebijakan <ChevronRight size={18} className="ml-1" />
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-gray-100 px-8 bg-gray-50/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-900 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl">E</div>
              <span className="text-2xl font-black tracking-tighter text-blue-900 uppercase">SIMPerDin</span>
            </div>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed font-medium italic">"Membangun masa depan administrasi pemerintahan yang modern, transparan, dan dapat dipertanggungjawabkan."</p>
            <div className="flex items-center space-x-4">
               <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:bg-blue-50 transition-all"><Mail size={20} className="text-blue-900" /></div>
               <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:bg-blue-50 transition-all"><Globe size={20} className="text-blue-900" /></div>
            </div>
          </div>
          <div className="space-y-6">
            <h5 className="font-black text-gray-900 uppercase text-xs tracking-widest">Akses Informasi</h5>
            <ul className="space-y-4 text-sm font-bold text-gray-400 uppercase tracking-tighter">
              <li><Link to="/features" className="hover:text-blue-900 transition-colors">Daftar Fitur</Link></li>
              <li><Link to="/roles" className="hover:text-blue-900 transition-colors">Hak Akses Role</Link></li>
              <li><Link to="/pricing" className="hover:text-blue-900 transition-colors">FAQ Langganan</Link></li>
              <li><Link to="/security" className="hover:text-blue-900 transition-colors">Infrastruktur Data</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h5 className="font-black text-gray-900 uppercase text-xs tracking-widest">Hubungi Kami</h5>
            <div className="space-y-5">
               <div className="flex items-center group">
                  <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center mr-4 group-hover:bg-blue-50 transition-all"><Mail size={14} className="text-blue-900" /></div>
                  <span className="text-xs font-bold text-gray-500">sales@simperdin.id</span>
               </div>
               <div className="flex items-center group">
                  <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center mr-4 group-hover:bg-blue-50 transition-all"><Globe size={14} className="text-blue-900" /></div>
                  <span className="text-xs font-bold text-gray-500">Jakarta, Indonesia</span>
               </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest italic opacity-60">© 2024 E-SIMPerDin Indonesia. Seluruh hak cipta dilindungi.</p>
          <div className="flex space-x-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">
             <span className="hover:text-blue-900 cursor-pointer transition-colors">Sitemap</span>
             <span className="hover:text-blue-900 cursor-pointer transition-colors">Privacy Policy</span>
             <span className="hover:text-blue-900 cursor-pointer transition-colors">Term Of Services</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const AlertCircle = ({ size, className }: any) => <ShieldAlert size={size} className={className} />;
const FileSearch = ({ size, className }: any) => <FileText size={size} className={className} />;

export default LandingPage;
