
import React, { useState } from 'react';
import { Building2, MapPin, Phone, Mail, Globe, Image as ImageIcon, Save, Camera, Info, Layers } from 'lucide-react';

const InstitutionProfilePage = () => {
  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Profil Lembaga</h2>
          <p className="text-gray-500 text-sm font-medium">Konfigurasi identitas resmi dan atribut institusi.</p>
        </div>
        <button className="bg-blue-900 text-white px-8 py-3 rounded-xl flex items-center space-x-2 hover:bg-blue-800 transition-all font-black text-sm uppercase shadow-xl">
          <Save size={18} />
          <span>Update Profil</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Instansi</label>
                <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold" defaultValue="Dinas Perhubungan Provinsi" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Kode Satker</label>
                <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-mono text-blue-900 font-bold" defaultValue="DISHUB-PROV" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Alamat Resmi</label>
              <textarea rows={3} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-medium text-gray-700" defaultValue="Jl. Merdeka No. 1, Jakarta Pusat" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold" defaultValue="admin@dishub.go.id" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Website</label>
                <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold" defaultValue="dishub.prov.go.id" />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="w-32 h-32 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2rem] flex items-center justify-center relative group overflow-hidden cursor-pointer">
                 <ImageIcon size={40} className="text-gray-200" />
                 <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center text-white">
                    <Camera size={24} />
                    <span className="text-[9px] font-black uppercase mt-1">Ganti Logo</span>
                 </div>
              </div>
              <h5 className="font-black mt-4">Logo Institusi</h5>
              <p className="text-[9px] text-gray-400 uppercase">PNG/SVG Max 2MB</p>
           </div>
           <div className="p-6 bg-amber-50 rounded-[2rem] border border-amber-100 flex items-start space-x-3">
             <Info size={20} className="text-amber-600 shrink-0" />
             <p className="text-[9px] text-amber-800 font-bold uppercase">Data profil digunakan sebagai header pada seluruh output dokumen PDF resmi.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionProfilePage;
