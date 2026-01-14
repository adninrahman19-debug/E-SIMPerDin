
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Save, Send, Calculator, MapPin, Calendar, Users, Plane } from 'lucide-react';

const SPPDForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    purpose: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    transportation: 'Pesawat',
    estimatedCost: 0
  });

  const handleSubmit = (e: React.FormEvent, status: 'DRAFT' | 'SUBMIT') => {
    e.preventDefault();
    // Simulate API call
    alert(status === 'DRAFT' ? 'Draft tersimpan!' : 'Pengajuan telah dikirim untuk persetujuan!');
    navigate('/sppd');
  };

  const calculateCost = () => {
    // Dummy calculation logic
    setFormData(prev => ({ ...prev, estimatedCost: 2500000 }));
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center space-x-4 mb-6">
        <button onClick={() => navigate('/sppd')} className="p-2 hover:bg-gray-100 rounded-full transition-all">
          <ChevronLeft size={24} />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{isEdit ? 'Ubah SPPD' : 'Buat Pengajuan SPPD Baru'}</h2>
          <p className="text-gray-500 text-sm">Lengkapi formulir di bawah ini dengan informasi yang valid.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <form className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
            <section>
              <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3 text-blue-900"><Plane size={18} /></div>
                Informasi Perjalanan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Maksud / Keperluan Perjalanan Dinas</label>
                  <textarea 
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 transition-all"
                    placeholder="Contoh: Koordinasi teknis implementasi sistem informasi di wilayah Bandung..."
                    value={formData.purpose}
                    onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tempat Tujuan</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 transition-all"
                      placeholder="Kab/Kota Tujuan"
                      value={formData.destination}
                      onChange={(e) => setFormData({...formData, destination: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Alat Angkutan</label>
                  <select 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 transition-all"
                    value={formData.transportation}
                    onChange={(e) => setFormData({...formData, transportation: e.target.value})}
                  >
                    <option>Pesawat Terbang</option>
                    <option>Kereta Api</option>
                    <option>Kendaraan Dinas (Mobil)</option>
                    <option>Bus / Angkutan Umum</option>
                    <option>Kapal Laut</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal Berangkat</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="date" 
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 transition-all"
                      value={formData.departureDate}
                      onChange={(e) => setFormData({...formData, departureDate: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal Kembali</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="date" 
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 transition-all"
                      value={formData.returnDate}
                      onChange={(e) => setFormData({...formData, returnDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-blue-900 flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center mr-3 text-emerald-700"><Calculator size={18} /></div>
                  Estimasi Biaya
                </h3>
                <button 
                  type="button" 
                  onClick={calculateCost}
                  className="text-sm font-bold text-blue-800 hover:text-blue-900 flex items-center"
                >
                  <Calculator size={16} className="mr-1" /> Hitung Otomatis
                </button>
              </div>
              <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Total Biaya Estimasi</p>
                  <p className="text-2xl font-extrabold text-blue-900">Rp {formData.estimatedCost.toLocaleString('id-ID')}</p>
                </div>
                <div className="md:col-span-2 text-sm text-gray-600">
                  <p>Perhitungan didasarkan pada standar biaya masukan (SBM) Tahun 2024 yang berlaku di institusi Anda.</p>
                </div>
              </div>
            </section>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-bold text-gray-800 mb-4">Aksi Pengajuan</h4>
            <div className="space-y-3">
              <button 
                onClick={(e) => handleSubmit(e, 'SUBMIT')}
                className="w-full flex items-center justify-center space-x-2 bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-all shadow-md font-bold"
              >
                <Send size={18} />
                <span>Kirim Pengajuan</span>
              </button>
              <button 
                onClick={(e) => handleSubmit(e, 'DRAFT')}
                className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-all font-bold"
              >
                <Save size={18} />
                <span>Simpan Draft</span>
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center italic">
              Dengan menekan "Kirim", Anda menyatakan data yang diinput benar dan dapat dipertanggungjawabkan.
            </p>
          </div>

          <div className="bg-indigo-900 text-white rounded-xl shadow-lg p-6 relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-bold mb-2 flex items-center">
                <Users size={18} className="mr-2" /> Alur Persetujuan
              </h4>
              <div className="space-y-4 mt-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">1</div>
                  <div>
                    <p className="text-sm font-semibold">Verifikasi Admin</p>
                    <p className="text-xs text-indigo-200">Pemeriksaan kelengkapan dokumen</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 opacity-50">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">2</div>
                  <div>
                    <p className="text-sm font-semibold">Pejabat Penyetuju</p>
                    <p className="text-xs text-indigo-200">Validasi substantif dan anggaran</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 opacity-50">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">3</div>
                  <div>
                    <p className="text-sm font-semibold">Terbit SPPD</p>
                    <p className="text-xs text-indigo-200">Dokumen siap diunduh</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SPPDForm;
