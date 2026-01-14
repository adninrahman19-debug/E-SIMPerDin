
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Calculator, 
  Users, 
  ShieldCheck, 
  BarChart3, 
  Printer, 
  History, 
  CheckCircle2, 
  ChevronLeft,
  Mail,
  Zap,
  Globe,
  Settings
} from 'lucide-react';

const DetailedFeature = ({ icon: Icon, title, description, points }: { icon: any, title: string, description: string, points: string[] }) => (
  <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
    <div className="w-20 h-20 bg-blue-50 text-blue-900 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-blue-900 group-hover:text-white transition-all duration-500">
      <Icon size={40} />
    </div>
    <h3 className="text-2xl font-black text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-500 mb-8 leading-relaxed">{description}</p>
    <ul className="space-y-4">
      {points.map((p, i) => (
        <li key={i} className="flex items-start text-sm text-gray-700 font-medium">
          <CheckCircle2 size={18} className="text-blue-900 mr-3 shrink-0" />
          {p}
        </li>
      ))}
    </ul>
  </div>
);

const FeaturesPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Navbar Simple */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold">E</div>
            <span className="text-lg font-black text-blue-900 uppercase tracking-tighter">E-SIMPerDin</span>
          </Link>
          <Link to="/" className="text-sm font-bold text-gray-500 hover:text-blue-900 flex items-center">
            <ChevronLeft size={16} className="mr-1" /> Kembali
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-32 pb-20 bg-gray-50 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-black uppercase tracking-widest">
            Fitur Lengkap
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">Solusi Total Manajemen Perjalanan Dinas</h1>
          <p className="text-xl text-gray-500">Platform kami dirancang untuk memodernisasi seluruh aspek birokrasi perjalanan dinas, dari pengajuan hingga pengarsipan.</p>
        </div>
      </header>

      {/* Feature Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <DetailedFeature 
            icon={Calculator}
            title="Otomatisasi Biaya (SBM)"
            description="Lupakan perhitungan manual yang melelahkan dan rawan kesalahan. Sistem kami secara otomatis menyesuaikan anggaran dengan standar yang berlaku."
            points={[
              "Integrasi otomatis SBM Nasional & Regional terbaru.",
              "Kalkulasi uang harian, penginapan, dan transportasi instan.",
              "Validasi ketersediaan pagu anggaran secara real-time.",
              "Penyesuaian biaya berdasarkan eselon dan golongan."
            ]}
          />
          <DetailedFeature 
            icon={Users}
            title="Workflow Persetujuan Berlapis"
            description="Alur persetujuan yang transparan dan dapat dilacak, menjamin setiap perjalanan memiliki dasar hukum yang kuat."
            points={[
              "Hingga 5 level persetujuan (multi-level approval).",
              "Notifikasi email dan push notification untuk penyetuju.",
              "Fitur 'Request Revision' dengan catatan tertulis.",
              "Audit log lengkap untuk setiap aksi dalam alur kerja."
            ]}
          />
          <DetailedFeature 
            icon={Printer}
            title="Dokumen Auto-Generator"
            description="Hasilkan dokumen SPPD, Surat Tugas, dan Rincian Biaya dalam hitungan detik dengan format resmi yang presisi."
            points={[
              "Output PDF standar naskah dinas pemerintah.",
              "Nomor surat otomatis sesuai pola penomoran instansi.",
              "Dukungan QR-Code untuk validasi keaslian dokumen.",
              "Generator laporan perjalanan dinas siap pakai."
            ]}
          />
          <DetailedFeature 
            icon={BarChart3}
            title="Reporting & Analytics"
            description="Dapatkan wawasan mendalam tentang efisiensi anggaran perjalanan dinas melalui dashboard visual yang informatif."
            points={[
              "Visualisasi realisasi anggaran per departemen.",
              "Export rekapitulasi ke Excel/CSV untuk pelaporan.",
              "Identifikasi tren perjalanan dinas tahunan.",
              "Laporan sisa anggaran dinas secara real-time."
            ]}
          />
        </div>
      </section>

      {/* Secondary Features */}
      <section className="py-24 bg-gray-900 text-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <History size={40} className="text-blue-400" />
              <h4 className="text-xl font-bold">Arsip Digital Abadi</h4>
              <p className="text-sm text-gray-400 leading-relaxed">Seluruh data perjalanan dinas dari tahun ke tahun tersimpan aman di cloud dan dapat diakses kapan saja untuk kebutuhan audit atau referensi.</p>
            </div>
            <div className="space-y-4">
              <Settings size={40} className="text-blue-400" />
              <h4 className="text-xl font-bold">Kustomisasi Template</h4>
              <p className="text-sm text-gray-400 leading-relaxed">Gunakan editor template kami untuk menyesuaikan logo, kop surat, dan posisi tanda tangan agar sesuai dengan aturan internal instansi Anda.</p>
            </div>
            <div className="space-y-4">
              <Globe size={40} className="text-blue-400" />
              <h4 className="text-xl font-bold">Akses Multi-Device</h4>
              <p className="text-sm text-gray-400 leading-relaxed">Pengajuan SPPD dapat dilakukan melalui smartphone, tablet, maupun desktop tanpa perlu instalasi aplikasi tambahan (PWA Ready).</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900">Mulai Digitalisasi Sekarang</h2>
          <p className="text-lg text-gray-500">Bergabunglah dengan institusi modern yang telah beralih ke E-SIMPerDin untuk manajemen perjalanan yang lebih cerdas.</p>
          <div className="flex justify-center space-x-4">
            <Link to="/login" className="bg-blue-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-800 shadow-xl transition-all">Coba Sekarang</Link>
          </div>
        </div>
      </section>

      {/* Footer Simple */}
      <footer className="py-12 border-t border-gray-100 text-center text-xs text-gray-400 font-bold uppercase tracking-widest">
        © 2024 E-SIMPerDin Indonesia • Enterprise Edition 2.5
      </footer>
    </div>
  );
};

export default FeaturesPage;
