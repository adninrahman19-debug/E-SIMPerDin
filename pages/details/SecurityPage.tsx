
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Lock, 
  ShieldCheck, 
  Cloud, 
  Database, 
  ChevronLeft,
  Key,
  Server,
  AlertCircle,
  EyeOff
} from 'lucide-react';

const SecurityBlock = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="flex space-x-6">
    <div className="w-16 h-16 bg-blue-900 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
      <Icon size={32} />
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-black text-gray-900">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

const SecurityPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold">E</div>
            <span className="text-lg font-black text-blue-900 uppercase">E-SIMPerDin</span>
          </Link>
          <Link to="/" className="text-sm font-bold text-gray-500 hover:text-blue-900 flex items-center">
            <ChevronLeft size={16} className="mr-1" /> Kembali
          </Link>
        </div>
      </nav>

      <header className="pt-32 pb-20 bg-gray-900 px-6 text-center text-white">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <ShieldCheck size={48} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight">Keamanan Tanpa Kompromi</h1>
          <p className="text-xl text-gray-400">Arsitektur sistem kami dibangun di atas standar keamanan tingkat tinggi untuk melindungi kerahasiaan data instansi Anda.</p>
        </div>
      </header>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <SecurityBlock 
            icon={Key}
            title="Enkripsi End-to-End"
            description="Seluruh data sensitif seperti NIP, rincian biaya, dan lampiran dokumen dienkripsi menggunakan standar AES-256 baik saat transit (SSL/TLS) maupun saat disimpan di database."
          />
          <SecurityBlock 
            icon={Database}
            title="Isolasi Data Multi-Tenant"
            description="Setiap instansi memiliki ruang lingkup data yang terisolasi secara logis. Hal ini menjamin tidak ada kebocoran data antar lembaga atau kementerian dalam satu platform."
          />
          <SecurityBlock 
            icon={Cloud}
            title="Backup Harian Otomatis"
            description="Kami melakukan pencadangan data secara otomatis setiap 24 jam ke beberapa zona server yang berbeda (off-site backup) untuk menjamin kelangsungan bisnis Anda."
          />
          <SecurityBlock 
            icon={EyeOff}
            title="Privasi & Anonimitas"
            description="Kami tidak pernah membagikan data perjalanan dinas kepada pihak ketiga. Seluruh akses internal sistem dipantau melalui audit log yang tidak dapat dihapus."
          />
          <SecurityBlock 
            icon={Server}
            title="Infrastruktur Cloud Handal"
            description="Dihosting di penyedia layanan cloud kelas dunia dengan jaminan uptime 99.9% dan sistem deteksi intrusi otomatis (IDS/IPS)."
          />
          <SecurityBlock 
            icon={AlertCircle}
            title="Pencegahan Fraud"
            description="Sistem validasi silang antara pengajuan, bukti transportasi, dan anggaran untuk mendeteksi potensi penyimpangan dana perjalanan dinas secara dini."
          />
        </div>
      </section>

      <section className="py-24 bg-blue-50 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h2 className="text-3xl font-black text-gray-900">Kepatuhan Regulasi</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <p className="text-2xl font-black text-blue-900 mb-1">ISO</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase">27001 Certified</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <p className="text-2xl font-black text-blue-900 mb-1">SSL</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase">A+ Rating</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <p className="text-2xl font-black text-blue-900 mb-1">PTE</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase">Pentested Yearly</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <p className="text-2xl font-black text-blue-900 mb-1">GDPR</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase">Compliant</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-gray-100 text-center text-xs text-gray-400 font-bold uppercase tracking-widest">
        © 2024 E-SIMPerDin Indonesia • Secure & Private Platform
      </footer>
    </div>
  );
};

export default SecurityPage;
