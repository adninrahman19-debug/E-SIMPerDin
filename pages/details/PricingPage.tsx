
import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_PLANS } from '../../constants';
import { CheckCircle2, ChevronLeft, HelpCircle } from 'lucide-react';

const PricingPage: React.FC = () => {
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

      <header className="pt-32 pb-20 bg-gray-50 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">Paket yang Fleksibel untuk Institusi Anda</h1>
          <p className="text-xl text-gray-500">Transparan, kompetitif, dan dirancang untuk membantu efisiensi anggaran pemerintah maupun swasta.</p>
        </div>
      </header>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_PLANS.map((plan) => (
            <div key={plan.id} className={`bg-white rounded-[2.5rem] p-10 border ${plan.id === 'plan-pro' ? 'border-blue-900 shadow-2xl scale-105 z-10' : 'border-gray-100 shadow-sm'} flex flex-col`}>
              <div className="mb-10 text-center">
                <h3 className="text-lg font-bold text-gray-400 uppercase tracking-widest mb-4">{plan.name}</h3>
                <div className="flex flex-col items-center">
                  <span className="text-5xl font-black text-gray-900 tracking-tighter">Rp {(plan.price / 1000).toLocaleString('id-ID')}K</span>
                  <span className="text-gray-400 text-sm mt-2 font-bold italic">per bulan / instansi</span>
                </div>
              </div>
              <ul className="space-y-5 mb-12 flex-1">
                <li className="flex items-center text-sm font-bold text-gray-700">
                  <CheckCircle2 size={18} className="text-emerald-500 mr-3 shrink-0" />
                  {plan.userLimit === 9999 ? 'User Tak Terbatas' : `Hingga ${plan.userLimit} Pengguna`}
                </li>
                <li className="flex items-center text-sm font-bold text-gray-700">
                  <CheckCircle2 size={18} className="text-emerald-500 mr-3 shrink-0" />
                  {plan.sppdLimit === 9999 ? 'SPPD Tak Terbatas' : `${plan.sppdLimit} SPPD / Bulan`}
                </li>
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-sm text-gray-500">
                    <CheckCircle2 size={18} className="text-emerald-500 mr-3 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/login" className={`w-full py-5 rounded-2xl font-black text-center transition-all ${plan.id === 'plan-pro' ? 'bg-blue-900 text-white hover:bg-blue-800' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                Pilih Paket
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-3xl font-black text-gray-900 text-center">Pertanyaan Umum (FAQ)</h2>
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm space-y-2">
              <h4 className="font-bold text-gray-900 flex items-center"><HelpCircle size={18} className="mr-3 text-blue-900" /> Apakah ada biaya instalasi?</h4>
              <p className="text-sm text-gray-500 ml-7">Tidak ada. E-SIMPerDin adalah platform SaaS (Software as a Service) yang siap digunakan segera setelah akun Anda diverifikasi.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm space-y-2">
              <h4 className="font-bold text-gray-900 flex items-center"><HelpCircle size={18} className="mr-3 text-blue-900" /> Bagaimana jika kami melebihi limit SPPD?</h4>
              <p className="text-sm text-gray-500 ml-7">Sistem akan memberikan notifikasi. Anda dapat melakukan add-on kuota atau melakukan upgrade paket ke level yang lebih tinggi.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm space-y-2">
              <h4 className="font-bold text-gray-900 flex items-center"><HelpCircle size={18} className="mr-3 text-blue-900" /> Apakah data kami aman jika langganan berhenti?</h4>
              <p className="text-sm text-gray-500 ml-7">Ya, data Anda akan diarsipkan selama 12 bulan setelah langganan berakhir dan Anda dapat mengunduh seluruh rekapitulasi data sebelum akun dinonaktifkan sepenuhnya.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-gray-100 text-center text-xs text-gray-400 font-bold uppercase tracking-widest">
        © 2024 E-SIMPerDin Indonesia • Pricing Transparency
      </footer>
    </div>
  );
};

export default PricingPage;
