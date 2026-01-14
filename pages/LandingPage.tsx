
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../App';
import { MOCK_PLANS } from '../constants';
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
  Printer
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
    <div className="w-14 h-14 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-900 group-hover:text-white transition-colors">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

const RoleCard = ({ role, description }: { role: string, description: string }) => (
  <div className="flex items-start space-x-4">
    <div className="mt-1">
      <CheckCircle size={20} className="text-blue-900" />
    </div>
    <div>
      <h4 className="font-bold text-gray-900">{role}</h4>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </div>
);

const LandingPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">E</div>
            <span className="text-2xl font-bold tracking-tight text-blue-900">E-SIMPerDin</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-gray-600">
            <a href="#fitur" className="hover:text-blue-900 transition-colors">Fitur</a>
            <a href="#peran" className="hover:text-blue-900 transition-colors">Peran</a>
            <a href="#harga" className="hover:text-blue-900 transition-colors">Harga</a>
            <a href="#keamanan" className="hover:text-blue-900 transition-colors">Keamanan</a>
          </div>
          <div>
            {user ? (
              <Link to="/dashboard" className="bg-blue-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl">
                Ke Dashboard
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-blue-900 font-bold hover:text-blue-800 transition-colors">Masuk</Link>
                <Link to="/login" className="bg-blue-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl">
                  Daftar Sekarang
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-900 text-xs font-bold uppercase tracking-widest">
              <Zap size={14} className="mr-2" /> Digitalisasi Masa Depan Perjalanan Dinas
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-[1.1]">
              Kelola Perjalanan Dinas <span className="text-blue-900">Lebih Cerdas & Transparan.</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              Solusi manajemen SPPD berbasis SaaS untuk instansi pemerintah dan swasta. Tingkatkan efisiensi, akuntabilitas, dan keamanan data dalam satu platform terpadu.
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/login" className="w-full sm:w-auto bg-blue-900 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-800 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center">
                Mulai Uji Coba Gratis
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <button className="w-full sm:w-auto text-blue-900 font-bold hover:underline flex items-center justify-center">
                Lihat Demo Produk
              </button>
            </div>
            <div className="flex items-center space-x-8 pt-4 grayscale opacity-50">
              <span className="text-sm font-bold text-gray-400">DIPERCAYA OLEH:</span>
              <div className="flex space-x-6 font-bold text-gray-400 italic">
                <span>DISHUB</span>
                <span>KESDM</span>
                <span>KEMENKEU</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-900/10 to-indigo-900/10 rounded-[3rem] blur-3xl -z-10"></div>
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform hover:-translate-y-2 transition-transform duration-500">
              <div className="bg-gray-50 h-8 flex items-center px-4 space-x-1.5 border-b border-gray-100">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000" 
                alt="Dashboard E-SIMPerDin" 
                className="w-full h-auto object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="fitur" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Lebih dari Sekedar Cetak SPPD</h2>
            <p className="text-gray-600">E-SIMPerDin dirancang untuk menyelesaikan kompleksitas birokrasi perjalanan dinas melalui otomatisasi dan keamanan tingkat tinggi.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={FileText} 
              title="Manajemen SPPD Digital" 
              description="Buat, verifikasi, dan kelola pengajuan SPPD secara paperless. Seluruh data tersimpan aman dan terstruktur."
            />
            <FeatureCard 
              icon={Settings} 
              title="Template Kustom Instansi" 
              description="Sesuaikan format output dokumen SPPD sesuai dengan tata naskah dinas internal institusi Anda."
            />
            <FeatureCard 
              icon={BarChart3} 
              title="Estimasi Biaya Otomatis" 
              description="Perhitungan biaya harian, penginapan, dan transport berdasarkan SBM (Standar Biaya Masukan) terkini."
            />
            <FeatureCard 
              icon={Users} 
              title="Workflow Persetujuan" 
              description="Alur persetujuan bertingkat yang transparan dengan notifikasi real-time kepada Pejabat Penyetuju."
            />
            <FeatureCard 
              icon={Globe} 
              title="Multi-Tenant Aman" 
              description="Isolasi data yang ketat antar instansi. Satu platform untuk ribuan lembaga dengan privasi terjamin."
            />
            <FeatureCard 
              icon={Printer} 
              title="Siap Cetak & Arsip" 
              description="Hasil generate dokumen dalam format PDF standar resmi yang siap cetak dan diarsipkan secara digital."
            />
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section id="peran" className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative order-2 lg:order-1">
             <div className="bg-blue-900 rounded-[2rem] p-12 text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10 space-y-8">
                  <h3 className="text-3xl font-bold">Akses Berbasis Peran (RBAC)</h3>
                  <p className="text-blue-100 leading-relaxed">Sistem menjamin tata kelola yang baik melalui pembatasan akses sesuai tanggung jawab masing-masing personel.</p>
                  <div className="space-y-6">
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 flex items-center space-x-4">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-900 font-bold">SA</div>
                      <div>
                        <p className="font-bold">Super Admin</p>
                        <p className="text-xs text-blue-200">Manajemen Platform & Billing</p>
                      </div>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 flex items-center space-x-4">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-900 font-bold">AI</div>
                      <div>
                        <p className="font-bold">Admin Instansi</p>
                        <p className="text-xs text-blue-200">Konfigurasi Struktur & Pegawai</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
             </div>
          </div>
          <div className="space-y-12 order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-snug">Satu Sistem untuk Seluruh Ekosistem Institusi.</h2>
            <div className="grid grid-cols-1 gap-8">
              <RoleCard 
                role="Pejabat Penyetuju" 
                description="Memberikan validasi, persetujuan, atau koreksi substantif terhadap pengajuan bawahan." 
              />
              <RoleCard 
                role="Operator / Staff" 
                description="Membantu verifikasi berkas, pencetakan, dan pengarsipan dokumen fisik jika diperlukan." 
              />
              <RoleCard 
                role="Pegawai" 
                description="Mengajukan perjalanan mandiri, melacak status, dan mengunduh SPPD yang telah disetujui." 
              />
            </div>
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm font-semibold text-gray-400 flex items-center italic">
                <ShieldCheck size={16} className="mr-2 text-emerald-500" />
                Seluruh aksi dicatat dalam Audit Log yang tidak dapat dimanipulasi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="harga" className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Paket Langganan Institusi</h2>
            <p className="text-gray-600">Pilih paket yang paling sesuai dengan kebutuhan jumlah pegawai dan kompleksitas birokrasi institusi Anda.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_PLANS.map((plan) => (
              <div key={plan.id} className={`bg-white rounded-3xl p-10 border ${plan.id === 'plan-pro' ? 'border-blue-900 shadow-xl scale-105' : 'border-gray-100 shadow-sm'} flex flex-col relative`}>
                {plan.id === 'plan-pro' && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-900 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">Paling Populer</div>
                )}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <div className="flex items-baseline mt-4">
                    <span className="text-4xl font-extrabold text-gray-900">Rp {(plan.price / 1000).toLocaleString('id-ID')}K</span>
                    <span className="text-gray-400 text-sm ml-2">/ bulan</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle size={16} className="text-emerald-500 mr-3 shrink-0" />
                    Hingga {plan.userLimit === 9999 ? 'Tak Terbatas' : plan.userLimit} Pengguna
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle size={16} className="text-emerald-500 mr-3 shrink-0" />
                    {plan.sppdLimit === 9999 ? 'SPPD Tak Terbatas' : `${plan.sppdLimit} SPPD / Bulan`}
                  </li>
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <CheckCircle size={16} className="text-emerald-500 mr-3 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/login" className={`w-full py-4 rounded-xl font-bold text-center transition-all ${plan.id === 'plan-pro' ? 'bg-blue-900 text-white hover:bg-blue-800 shadow-lg' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                  Mulai Sekarang
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section id="keamanan" className="py-24 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Keamanan Data Adalah Prioritas Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Kami menggunakan teknologi terkini untuk memastikan data institusi Anda tetap terjaga dan hanya dapat diakses oleh pihak yang berwenang.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center">
                <Lock size={32} />
              </div>
              <h4 className="font-bold">Enkripsi End-to-End</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Data sensitif seperti NIP dan detail biaya dienkripsi menggunakan standar industri.</p>
            </div>
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center">
                <CheckCircle size={32} />
              </div>
              <h4 className="font-bold">Audit Trail Lengkap</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Setiap aksi perubahan data terekam secara otomatis untuk kemudahan audit keuangan.</p>
            </div>
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center">
                <Globe size={32} />
              </div>
              <h4 className="font-bold">Isolasi Data</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Arsitektur multi-tenant kami menjamin data antar institusi tidak akan pernah tercampur.</p>
            </div>
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center">
                <ShieldCheck size={32} />
              </div>
              <h4 className="font-bold">Kepatuhan Regulasi</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Sistem disesuaikan dengan standar pelaporan perjalanan dinas pemerintah Indonesia.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-24 px-6 bg-blue-900">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">Siap Untuk Meningkatkan Efisiensi Instansi Anda?</h2>
          <p className="text-blue-100 text-lg">Bergabunglah dengan ratusan institusi yang telah mendigitalisasi manajemen perjalanan dinas mereka bersama E-SIMPerDin.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <Link to="/login" className="w-full sm:w-auto bg-white text-blue-900 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl">
              Coba Gratis 14 Hari
            </Link>
            <button className="w-full sm:w-auto bg-transparent border border-white/30 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
              Hubungi Tim Sales
            </button>
          </div>
          <p className="text-blue-300 text-xs font-medium uppercase tracking-widest pt-8">Tersedia Dukungan Onboarding & Demo Produk Langsung</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold text-lg">E</div>
              <span className="text-xl font-bold tracking-tight text-blue-900">E-SIMPerDin</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">Solusi ERP khusus untuk manajemen perjalanan dinas pemerintah dan perusahaan swasta di Indonesia.</p>
            <div className="flex space-x-4">
               {/* Social Icons Placeholder */}
            </div>
          </div>
          <div>
            <h5 className="font-bold text-gray-900 mb-6">Produk</h5>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><a href="#" className="hover:text-blue-900 transition-colors">Fitur Utama</a></li>
              <li><a href="#" className="hover:text-blue-900 transition-colors">Workflow Approval</a></li>
              <li><a href="#" className="hover:text-blue-900 transition-colors">Custom Template</a></li>
              <li><a href="#" className="hover:text-blue-900 transition-colors">Kalkulator Biaya</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-gray-900 mb-6">Perusahaan</h5>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><a href="#" className="hover:text-blue-900 transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-blue-900 transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-blue-900 transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-blue-900 transition-colors">Kontak Kami</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h5 className="font-bold text-gray-900 mb-6">Hubungi Kami</h5>
            <p className="text-sm text-gray-500 flex items-center"><Mail size={16} className="mr-3" /> support@simperdin.id</p>
            <p className="text-sm text-gray-500 flex items-center"><Globe size={16} className="mr-3" /> Jakarta, Indonesia</p>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <p className="text-xs font-bold text-blue-900 uppercase mb-2">Punya Pertanyaan?</p>
              <button className="text-sm font-bold text-blue-900 underline">Bicara dengan Ahli</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-100 text-center text-sm text-gray-400 font-medium">
          <p>© 2024 E-SIMPerDin Indonesia. Seluruh hak cipta dilindungi. Versi 2.1.0-Enterprise</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
