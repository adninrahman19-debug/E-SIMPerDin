
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../App';
import { MOCK_PLANS } from '../constants';
import { 
  ShieldCheck, 
  FileText, 
  Settings, 
  Users, 
  CheckCircle, 
  CheckCircle2,
  ArrowRight, 
  BarChart3, 
  Globe, 
  Lock, 
  Mail,
  Zap,
  Printer,
  MousePointer2,
  ChevronRight
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
    <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-900 group-hover:text-white transition-all duration-300 shadow-inner">
      <Icon size={32} />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
  </div>
);

const LandingPage: React.FC = () => {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white min-h-screen selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-md border-b border-gray-100' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-3 focus:outline-none group"
          >
            <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:rotate-6 transition-transform">E</div>
            <div className="flex flex-col">
              <span className={`text-xl font-black tracking-tight transition-colors ${scrolled ? 'text-blue-900' : 'text-blue-900'}`}>E-SIMPerDin</span>
              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-gray-400">Official Travel Management</span>
            </div>
          </button>
          
          <div className="hidden lg:flex items-center space-x-10 text-sm font-bold text-gray-500">
            {['Fitur', 'Peran', 'Harga', 'Keamanan'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                onClick={(e) => handleNavClick(e, item.toLowerCase())}
                className="hover:text-blue-900 transition-colors relative group py-2"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-900 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <Link to="/dashboard" className="bg-blue-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg hover:shadow-blue-900/20 flex items-center">
                Dashboard <ChevronRight size={16} className="ml-1" />
              </Link>
            ) : (
              <>
                <Link to="/login" className="hidden sm:block text-blue-900 font-bold hover:text-blue-700 transition-colors px-4 py-2">Masuk</Link>
                <Link to="/login" className="bg-blue-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg hover:shadow-blue-900/20">
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-48 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-blue-200 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-200 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 animate-in slide-in-from-left-10 duration-1000">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-900 text-[10px] font-black uppercase tracking-[0.15em] border border-blue-100">
              <Zap size={14} className="mr-2 text-amber-500 fill-amber-500" /> Versi Enterprise 2.5
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight">
              Transformasi Digital <span className="text-blue-900">Perjalanan Dinas</span> Anda.
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed max-w-lg">
              Satu-satunya platform manajemen SPPD yang mengintegrasikan alur persetujuan, perhitungan biaya otomatis, dan kearsipan digital dalam satu ekosistem yang aman.
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/login" className="group w-full sm:w-auto bg-blue-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-800 transition-all shadow-2xl hover:shadow-blue-900/40 flex items-center justify-center">
                Mulai Uji Coba Gratis
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link 
                to="/fitur"
                className="w-full sm:w-auto text-blue-900 font-bold hover:text-blue-700 flex items-center justify-center py-3"
              >
                <MousePointer2 className="mr-2" size={20} /> Pelajari Fitur Selengkapnya
              </Link>
            </div>
          </div>

          <div className="relative animate-in zoom-in duration-1000 delay-200">
            <div className="relative z-10 bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] border border-gray-100 p-3 overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" 
                alt="E-SIMPerDin Interface" 
                className="w-full h-auto rounded-[2rem] shadow-sm"
              />
            </div>
            <div className="absolute -inset-10 bg-blue-900/5 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="fitur" className="py-32 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Fitur Unggulan untuk Produktivitas Maksimal.</h2>
              <p className="text-gray-500 text-lg">Platform kami mengkombinasikan kemudahan penggunaan dengan kontrol birokrasi yang ketat.</p>
            </div>
            <Link to="/fitur" className="text-blue-900 font-bold flex items-center group">
              Lihat seluruh fitur <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard icon={FileText} title="SPPD Digital Non-Stop" description="Akses pengajuan kapan saja dan di mana saja." />
            <FeatureCard icon={BarChart3} title="Kalkulator SBM Terintegrasi" description="Data SBM Nasional otomatis terupdate." />
            <FeatureCard icon={Printer} title="PDF Auto-Generator" description="Hasilkan dokumen standar pemerintah dalam sekejap." />
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section id="peran" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10 order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Akses Khusus Berdasarkan Tanggung Jawab.</h2>
            <div className="space-y-4">
              <p className="text-gray-500 mb-6">Kami menjamin akuntabilitas data melalui pembatasan hak akses yang presisi.</p>
              <Link to="/peran" className="bg-blue-900 text-white px-8 py-3 rounded-xl font-bold inline-flex items-center group">
                Pelajari Peran Pengguna <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
             <div className="bg-blue-900 rounded-[3rem] p-12 text-white shadow-3xl relative overflow-hidden group">
                <h3 className="text-3xl font-black mb-4">Keamanan Multi-Tenant</h3>
                <p className="text-blue-100">Data Anda terisolasi dengan aman.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Pricing Section (Restored to detailed cards) */}
      <section id="harga" className="py-32 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight uppercase">Investasi Efisiensi Institusi</h2>
            <p className="text-gray-500">Pilih paket yang paling sesuai dengan kebutuhan jumlah pegawai dan birokrasi Anda.</p>
            <Link to="/harga" className="text-blue-900 font-bold hover:underline inline-flex items-center">
              Lihat perbandingan paket lengkap <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_PLANS.map((plan) => (
              <div 
                key={plan.id} 
                className={`bg-white rounded-[2.5rem] p-10 border transition-all duration-300 ${
                  plan.id === 'plan-pro' 
                    ? 'border-blue-900 shadow-2xl scale-105 z-10' 
                    : 'border-gray-100 shadow-sm hover:shadow-xl'
                } flex flex-col relative`}
              >
                {plan.id === 'plan-pro' && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-900 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                    Rekomendasi Utama
                  </div>
                )}
                
                <div className="mb-10 text-center">
                  <h3 className="text-lg font-bold text-gray-400 uppercase tracking-widest mb-4">{plan.name}</h3>
                  <div className="flex flex-col items-center">
                    <span className="text-5xl font-black text-gray-900 tracking-tighter">
                      Rp {(plan.price / 1000).toLocaleString('id-ID')}K
                    </span>
                    <span className="text-gray-400 text-sm mt-2 font-bold italic">per bulan / instansi</span>
                  </div>
                </div>
                
                <div className="w-full h-px bg-gray-100 mb-10"></div>
                
                <ul className="space-y-5 mb-12 flex-1">
                  <li className="flex items-center text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-emerald-500 mr-3 shrink-0" />
                    {plan.userLimit === 9999 ? 'User Tak Terbatas' : `Hingga ${plan.userLimit} Pengguna`}
                  </li>
                  <li className="flex items-center text-sm font-bold text-gray-700">
                    <CheckCircle2 size={18} className="text-emerald-500 mr-3 shrink-0" />
                    {plan.sppdLimit === 9999 ? 'SPPD Tak Terbatas' : `${plan.sppdLimit} SPPD / Bulan`}
                  </li>
                  {plan.features.slice(0, 4).map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-500">
                      <CheckCircle2 size={18} className="text-emerald-500 mr-3 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to="/login" 
                  className={`w-full py-5 rounded-2xl font-black text-center transition-all ${
                    plan.id === 'plan-pro' 
                      ? 'bg-blue-900 text-white hover:bg-blue-800 shadow-xl' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Pilih Paket {plan.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Footer */}
      <section id="keamanan" className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-gray-900 rounded-[3rem] p-12 text-white text-center">
          <h2 className="text-3xl font-black mb-6">Privasi Data Institusi Anda Prioritas Kami</h2>
          <Link to="/keamanan" className="text-blue-400 font-bold hover:underline flex items-center justify-center">
            <ShieldCheck size={20} className="mr-2" /> Pelajari Infrastruktur Keamanan Kami
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-24 pb-12 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center text-white font-bold text-xl">E</div>
              <span className="text-2xl font-black tracking-tight text-blue-900">E-SIMPerDin</span>
            </div>
            <p className="text-gray-500 text-sm max-w-sm">Platform ERP modern untuk manajemen perjalanan dinas pemerintah Indonesia.</p>
          </div>
          <div>
            <h5 className="font-bold text-gray-900 mb-6 uppercase tracking-widest text-xs">Navigasi</h5>
            <ul className="space-y-4 text-sm text-gray-500 font-bold">
              <li><Link to="/fitur" className="hover:text-blue-900">Fitur Lengkap</Link></li>
              <li><Link to="/peran" className="hover:text-blue-900">Peran Pengguna</Link></li>
              <li><Link to="/harga" className="hover:text-blue-900">Harga Paket</Link></li>
              <li><Link to="/keamanan" className="hover:text-blue-900">Keamanan</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-gray-900 mb-6 uppercase tracking-widest text-xs">Kontak</h5>
            <p className="text-sm text-gray-500 flex items-center"><Mail size={16} className="mr-3" /> support@simperdin.id</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-100 text-center text-xs text-gray-400 font-bold uppercase tracking-widest">
          © 2024 E-SIMPerDin Indonesia. Seluruh hak cipta dilindungi.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
