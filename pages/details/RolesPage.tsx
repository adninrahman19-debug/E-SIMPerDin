
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  Shield, 
  UserCog, 
  UserCheck, 
  User, 
  Check, 
  X,
  ChevronLeft
} from 'lucide-react';

const RoleDetail = ({ icon: Icon, role, color, description, permissions }: { icon: any, role: string, color: string, description: string, permissions: string[] }) => (
  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
    <div className={`w-14 h-14 ${color} text-white rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight">{role}</h3>
    <p className="text-sm text-gray-500 mb-6 leading-relaxed">{description}</p>
    <div className="space-y-3">
      {permissions.map((p, i) => (
        <div key={i} className="flex items-center text-xs font-bold text-gray-700">
          <div className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mr-3 shrink-0">
            <Check size={12} />
          </div>
          {p}
        </div>
      ))}
    </div>
  </div>
);

const RolesPage: React.FC = () => {
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

      <header className="pt-32 pb-20 bg-blue-900 px-6 text-center text-white relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black leading-tight">Tata Kelola Akses Terstruktur</h1>
          <p className="text-xl text-blue-100">Manajemen peran yang ketat memastikan akuntabilitas dan keamanan data di setiap level organisasi.</p>
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </header>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <RoleDetail 
            icon={ShieldAlert}
            role="Super Admin"
            color="bg-red-600"
            description="Pemilik platform yang bertanggung jawab atas infrastruktur global."
            permissions={[
              "Membuat & Mengelola Institusi",
              "Manajemen Paket Langganan",
              "Monitoring Keamanan Global",
              "Verifikasi Bukti Pembayaran",
              "Manajemen Template Global"
            ]}
          />
          <RoleDetail 
            icon={Shield}
            role="Admin Instansi"
            color="bg-blue-900"
            description="Penanggung jawab sistem di level lembaga atau kementerian."
            permissions={[
              "Konfigurasi Struktur Organisasi",
              "Manajemen Pengguna Internal",
              "Setting Standar Biaya (SBM)",
              "Kustomisasi Template Dinas",
              "Akses Seluruh Laporan Internal"
            ]}
          />
          <RoleDetail 
            icon={UserCog}
            role="Operator Staff"
            color="bg-indigo-600"
            description="Staf administratif yang memproses data perjalanan harian."
            permissions={[
              "Input & Verifikasi SPPD Pegawai",
              "Manajemen Dokumen & Arsip",
              "Cetak Rekapitulasi Kolektif",
              "Monitoring Status Approval",
              "Bantuan Teknis Pegawai"
            ]}
          />
          <RoleDetail 
            icon={UserCheck}
            role="Pejabat Penyetuju"
            color="bg-amber-500"
            description="Pimpinan yang memberikan otorisasi resmi perjalanan."
            permissions={[
              "Persetujuan & Penolakan SPPD",
              "Memberikan Catatan Revisi",
              "Monitoring Anggaran Divisi",
              "Digital Signature Otoritas",
              "Audit Log Pengajuan"
            ]}
          />
          <RoleDetail 
            icon={User}
            role="Pegawai"
            color="bg-gray-700"
            description="Pengguna akhir yang melakukan perjalanan dinas."
            permissions={[
              "Pengajuan SPPD Mandiri",
              "Melacak Riwayat Perjalanan",
              "Download Dokumen Disetujui",
              "Update Laporan Hasil Tugas",
              "Estimasi Biaya Personal"
            ]}
          />
        </div>
      </section>

      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-4xl mx-auto bg-white p-12 rounded-[2.5rem] shadow-xl">
          <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">Matriks Hak Akses (RBAC)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                  <th className="px-4 py-6 text-left">Fitur Utama</th>
                  <th className="px-4 py-6 text-center">Admin</th>
                  <th className="px-4 py-6 text-center">Pejabat</th>
                  <th className="px-4 py-6 text-center">Pegawai</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Buat Pengajuan", true, false, true],
                  ["Setujui SPPD", false, true, false],
                  ["Kelola Anggaran", true, true, false],
                  ["Kelola User", true, false, false],
                  ["Download PDF", true, true, true]
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-5 font-bold text-gray-700">{row[0]}</td>
                    <td className="px-4 py-5 text-center">{row[1] ? <Check size={20} className="mx-auto text-emerald-500" /> : <X size={20} className="mx-auto text-red-300" />}</td>
                    <td className="px-4 py-5 text-center">{row[2] ? <Check size={20} className="mx-auto text-emerald-500" /> : <X size={20} className="mx-auto text-red-300" />}</td>
                    <td className="px-4 py-5 text-center">{row[3] ? <Check size={20} className="mx-auto text-emerald-500" /> : <X size={20} className="mx-auto text-red-300" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-gray-100 text-center text-xs text-gray-400 font-bold uppercase tracking-widest">
        © 2024 E-SIMPerDin Indonesia • Governance Standard v2.0
      </footer>
    </div>
  );
};

export default RolesPage;
