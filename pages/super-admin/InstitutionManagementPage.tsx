
import React, { useState } from 'react';
import { MOCK_INSTITUTIONS, MOCK_PLANS, MOCK_USERS } from '../../constants';
import { Institution, UserRole, User } from '../../types';
import { 
  Building2, 
  Plus, 
  Search, 
  X, 
  Edit3, 
  Trash2, 
  Power, 
  RefreshCw, 
  ChevronRight,
  Filter,
  Mail,
  Zap,
  ShieldCheck,
  History,
  Database,
  Save,
  MapPin,
  Download,
  Users,
  FileText,
  UserPlus,
  KeyRound,
  ShieldAlert,
  UserCheck,
  MoreHorizontal,
  Shield,
  Layout,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

const InstitutionManagementPage: React.FC = () => {
  // --- STATE MANAGEMENT (Simulated Database) ---
  const [localInstitutions, setLocalInstitutions] = useState<Institution[]>(MOCK_INSTITUTIONS);
  const [localUsers, setLocalUsers] = useState<User[]>(MOCK_USERS);
  
  // UI States
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInst, setSelectedInst] = useState<Institution | null>(null);
  const [viewMode, setViewMode] = useState<'LIST' | 'EDIT' | 'ADD' | 'DETAIL'>('LIST');
  const [activeDetailTab, setActiveDetailTab] = useState<'INFO' | 'USERS' | 'LOGS'>('INFO');

  // --- LOGIC HELPER ---
  const filteredInstitutions = localInstitutions.filter(i => 
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInstitutionUsers = (id: string) => localUsers.filter(u => u.institutionId === id);

  // --- CRUD HANDLERS (TENANT) ---
  const handleOpenAdd = () => {
    setSelectedInst(null);
    setViewMode('ADD');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (e: React.MouseEvent, inst: Institution) => {
    e.stopPropagation();
    setSelectedInst(inst);
    setViewMode('EDIT');
    setIsModalOpen(true);
  };

  const handleOpenDetail = (inst: Institution) => {
    setSelectedInst(inst);
    setViewMode('DETAIL');
    setActiveDetailTab('INFO');
    setIsModalOpen(true);
  };

  const handleSaveTenant = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get('name') as string;
    const code = formData.get('code') as string;
    const address = formData.get('address') as string;

    if (viewMode === 'ADD') {
      const newInst: Institution = {
        id: `inst-${Date.now()}`,
        name,
        code,
        address,
        active: true
      };
      setLocalInstitutions([newInst, ...localInstitutions]);
      alert(`Sukses: Tenant "${name}" telah berhasil didaftarkan.`);
    } else if (selectedInst) {
      const updated = localInstitutions.map(inst => 
        inst.id === selectedInst.id ? { ...inst, name, code, address } : inst
      );
      setLocalInstitutions(updated);
      alert(`Sukses: Informasi "${name}" telah diperbarui.`);
    }
    setIsModalOpen(false);
  };

  const handleDeleteTenant = (e: React.MouseEvent, inst: Institution) => {
    e.stopPropagation();
    if (confirm(`HAPUS PERMANEN: Apakah Anda yakin ingin menghapus "${inst.name}"? Semua data user dan SPPD terkait akan dimusnahkan.`)) {
      setLocalInstitutions(localInstitutions.filter(i => i.id !== inst.id));
      setLocalUsers(localUsers.filter(u => u.institutionId !== inst.id));
      alert(`Tenant "${inst.name}" telah dihapus.`);
    }
  };

  const toggleTenantStatus = (e: React.MouseEvent, inst: Institution) => {
    e.stopPropagation();
    const action = inst.active ? 'Menonaktifkan' : 'Mengaktifkan';
    if (confirm(`${action} Akses: Lanjutkan proses perubahan status untuk "${inst.name}"?`)) {
      setLocalInstitutions(localInstitutions.map(i => 
        i.id === inst.id ? { ...i, active: !inst.active } : i
      ));
    }
  };

  // --- CRUD HANDLERS (USER PER-INSTANSI) ---
  const handleProvisionAdmin = () => {
    if (!selectedInst) return;
    const name = prompt("Nama Lengkap User:");
    const username = prompt("Username Login:");
    const email = prompt("Email Dinas:");

    if (name && username && email) {
      const newUser: User = {
        id: `u-${Date.now()}`,
        name,
        username,
        email,
        role: UserRole.ADMIN_INSTANSI, // Default role untuk provisioning tenant
        institutionId: selectedInst.id,
        active: true
      };
      setLocalUsers([...localUsers, newUser]);
      alert(`Akun Admin untuk "${selectedInst.name}" berhasil dibuat.`);
    }
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    if (confirm(`Hapus akses user "${userName}"?`)) {
      setLocalUsers(localUsers.filter(u => u.id !== userId));
    }
  };

  return (
    <div className="animate-in fade-in duration-700 pb-20">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight flex items-center">
            Tenant Management <Building2 className="ml-3 text-blue-900" size={32} />
          </h2>
          <p className="text-gray-500 text-sm font-medium mt-1 uppercase tracking-widest">Platform Administration & Ecosystem Control</p>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={() => alert("Menjalankan prosedur audit database global...")} className="bg-white border border-gray-200 text-gray-700 px-6 py-4 rounded-2xl hover:bg-gray-50 transition-all font-black text-[10px] uppercase tracking-widest shadow-sm flex items-center space-x-2">
            <RefreshCw size={16} />
            <span>Health Check</span>
          </button>
          <button 
            onClick={handleOpenAdd} 
            className="bg-blue-900 text-white px-8 py-4 rounded-2xl flex items-center space-x-3 hover:bg-blue-800 transition-all font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-900/30"
          >
            <Plus size={20} />
            <span>Registrasi Tenant</span>
          </button>
        </div>
      </div>

      {/* Stats Summary Area */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-5">
            <div className="w-14 h-14 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center shadow-inner"><Building2 size={24} /></div>
            <div>
               <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Total Tenants</p>
               <h4 className="text-2xl font-black text-gray-900">{localInstitutions.length}</h4>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-5">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner"><Zap size={24} /></div>
            <div>
               <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Active Clients</p>
               <h4 className="text-2xl font-black text-emerald-600">{localInstitutions.filter(i => i.active).length}</h4>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-5">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shadow-inner"><Users size={24} /></div>
            <div>
               <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Total Accounts</p>
               <h4 className="text-2xl font-black text-gray-900">{localUsers.length}</h4>
            </div>
         </div>
         <div className="bg-blue-900 p-6 rounded-3xl text-white shadow-xl flex items-center justify-between">
            <div>
               <p className="text-[9px] font-black uppercase opacity-70 mb-1">Platform Stability</p>
               <h4 className="text-2xl font-black">99.9%</h4>
            </div>
            <ShieldCheck size={32} className="text-blue-300" />
         </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gray-50/30">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari Nama Institusi atau Kode Satker..." 
              className="w-full pl-12 pr-6 py-4 bg-white border border-gray-200 rounded-[1.5rem] focus:ring-4 focus:ring-blue-900/5 outline-none transition-all font-bold text-sm shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-3">
             <button className="p-3.5 bg-white border border-gray-200 text-gray-400 rounded-2xl hover:text-blue-900 shadow-sm"><Filter size={20} /></button>
             <button className="flex items-center space-x-2 bg-gray-900 text-white px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all">
               <Download size={16} />
               <span>Export Directory</span>
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] border-b border-gray-50 bg-gray-50/10">
                <th className="px-10 py-6">Informasi Tenant</th>
                <th className="px-6 py-6 text-center">User Terdaftar</th>
                <th className="px-6 py-6 text-center">Status Layanan</th>
                <th className="px-10 py-6 text-right">Opsi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredInstitutions.length > 0 ? filteredInstitutions.map((inst) => (
                <tr key={inst.id} className="group hover:bg-blue-50/30 transition-all duration-500 cursor-pointer" onClick={() => handleOpenDetail(inst)}>
                  <td className="px-10 py-8">
                    <div className="flex items-center space-x-5">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${inst.active ? 'from-blue-900 to-indigo-950' : 'from-gray-400 to-gray-600'} flex items-center justify-center text-white font-black text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                        {inst.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-gray-900 tracking-tight text-lg leading-none">{inst.name}</p>
                        <p className="text-[10px] font-mono font-bold text-blue-900 mt-2 bg-blue-50 px-2 py-0.5 rounded w-fit uppercase">{inst.code}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-8 text-center">
                    <div className="inline-flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                       <Users size={16} className="text-blue-900" />
                       <span className="text-sm font-black text-gray-900">{getInstitutionUsers(inst.id).length}</span>
                    </div>
                  </td>
                  <td className="px-6 py-8 text-center">
                     <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm ${inst.active ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                       <div className={`w-1.5 h-1.5 rounded-full mr-2 ${inst.active ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
                       {inst.active ? 'Active' : 'Suspended'}
                     </span>
                  </td>
                  <td className="px-10 py-8 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={(e) => handleOpenEdit(e, inst)} className="p-3 text-gray-400 hover:text-blue-900 bg-white border border-gray-100 rounded-2xl shadow-sm transition-all" title="Edit Profil"><Edit3 size={18} /></button>
                      <button onClick={(e) => toggleTenantStatus(e, inst)} className={`p-3 border border-gray-100 rounded-2xl shadow-sm transition-all ${inst.active ? 'text-amber-500 hover:bg-amber-50' : 'text-emerald-500 hover:bg-emerald-50'}`} title={inst.active ? "Tangguhkan" : "Aktifkan"}>
                        <Power size={18} />
                      </button>
                      <button onClick={(e) => handleDeleteTenant(e, inst)} className="p-3 text-gray-400 hover:text-red-600 bg-white border border-gray-100 rounded-2xl shadow-sm transition-all" title="Hapus Permanen"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                   <td colSpan={4} className="py-40 text-center">
                      <div className="flex flex-col items-center">
                         <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <Search size={40} className="text-gray-200" />
                         </div>
                         <h5 className="text-lg font-black text-gray-900 uppercase">Tenant Tidak Ditemukan</h5>
                         <p className="text-sm text-gray-400 font-medium">Coba gunakan kata kunci lain atau registrasikan tenant baru.</p>
                      </div>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CRUD & DETAIL MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-10 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
              <div className="flex items-center space-x-6">
                 <div className="w-16 h-16 bg-blue-900 text-white rounded-3xl flex items-center justify-center shadow-2xl">
                    <Shield size={32} />
                 </div>
                 <div>
                    <h4 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
                       {viewMode === 'ADD' ? 'Registrasi Partner Baru' : 
                        viewMode === 'EDIT' ? 'Ubah Konfigurasi Tenant' : 
                        selectedInst?.name}
                    </h4>
                    <p className="text-sm text-gray-500 font-medium mt-2 uppercase tracking-[0.2em]">Tenant Otorisasi Control Panel</p>
                 </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-4 bg-gray-100 hover:bg-red-50 hover:text-red-600 rounded-3xl text-gray-400 transition-all">
                <X size={24} />
              </button>
            </div>

            {/* Modal Navigation (Only for DETAIL) */}
            {viewMode === 'DETAIL' && (
               <div className="flex border-b border-gray-100 px-10 bg-white">
                  {[
                    { id: 'INFO', label: 'Profil Institusi', icon: Building2 },
                    { id: 'USERS', label: 'Manajemen Pengguna', icon: Users },
                    { id: 'LOGS', label: 'Log Aktivitas', icon: History }
                  ].map(tab => (
                    <button 
                      key={tab.id}
                      onClick={() => setActiveDetailTab(tab.id as any)}
                      className={`px-8 py-6 text-[10px] font-black uppercase tracking-widest border-b-4 transition-all flex items-center space-x-2 ${activeDetailTab === tab.id ? 'border-blue-900 text-blue-900' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                    >
                      <tab.icon size={14} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
               </div>
            )}

            {/* Modal Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
              
              {/* Form View (ADD / EDIT) */}
              {(viewMode === 'ADD' || viewMode === 'EDIT') ? (
                <form id="tenantForm" onSubmit={handleSaveTenant} className="space-y-10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-8">
                         <h5 className="text-[10px] font-black text-blue-900 uppercase tracking-widest border-l-4 border-blue-900 pl-4">Identitas Resmi</h5>
                         <div className="space-y-6">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Lengkap Institusi</label>
                               <input name="name" required type="text" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-900/5 font-black text-gray-800 shadow-inner" placeholder="E.g. Kementerian Hukum & HAM" defaultValue={selectedInst?.name} />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                               <div className="space-y-2">
                                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Kode Satker / ID</label>
                                  <input name="code" required type="text" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-mono font-black text-blue-900 uppercase shadow-inner" placeholder="KEMEN-01" defaultValue={selectedInst?.code} />
                               </div>
                               <div className="space-y-2">
                                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Jenis Instansi</label>
                                  <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-xs appearance-none cursor-pointer">
                                     <option>Pemerintah Pusat</option>
                                     <option>Pemerintah Daerah</option>
                                     <option>Lembaga Tinggi Negara</option>
                                     <option>Sektor Swasta / BUMN</option>
                                  </select>
                               </div>
                            </div>
                         </div>
                      </div>

                      <div className="space-y-8">
                         <h5 className="text-[10px] font-black text-blue-900 uppercase tracking-widest border-l-4 border-blue-900 pl-4">Alamat & Operasional</h5>
                         <div className="space-y-6">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Lokasi Kantor Pusat</label>
                               <textarea name="address" rows={3} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[2rem] outline-none font-medium text-gray-700 resize-none shadow-inner" defaultValue={selectedInst?.address} placeholder="Alamat lengkap instansi..." />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Paket Subscription</label>
                               <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-black text-blue-900 appearance-none shadow-inner">
                                  {MOCK_PLANS.map(p => <option key={p.id}>{p.name} Suite</option>)}
                               </select>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 flex items-start space-x-6">
                      <ShieldAlert size={32} className="text-blue-900 shrink-0 mt-1" />
                      <div>
                         <p className="text-sm font-black text-blue-900 uppercase leading-none mb-2">Legal Compliance Verification</p>
                         <p className="text-[11px] text-blue-800 font-bold uppercase leading-relaxed tracking-tight">
                            Setiap pendaftaran tenant baru akan secara otomatis mengaktifkan modul enkripsi data Multi-Tenancy. Pastikan alamat email dinas yang diinput adalah alamat resmi untuk korespondensi billing.
                         </p>
                      </div>
                   </div>
                </form>
              ) : selectedInst ? (
                /* Detail View (INFO / USERS / LOGS) */
                <div className="animate-in fade-in duration-500">
                   
                   {activeDetailTab === 'INFO' && (
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="md:col-span-1 space-y-6">
                           <div className="p-10 bg-gray-50 rounded-[3rem] border border-gray-100 text-center relative overflow-hidden group">
                              <div className="w-24 h-24 bg-blue-900 text-white rounded-[2rem] flex items-center justify-center text-4xl font-black mx-auto mb-6 shadow-2xl transition-transform group-hover:scale-105">
                                 {selectedInst.name.charAt(0)}
                              </div>
                              <h5 className="text-2xl font-black text-gray-900 tracking-tight">{selectedInst.name}</h5>
                              <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest mt-2 bg-blue-100 px-3 py-1 rounded-full w-fit mx-auto">{selectedInst.code}</p>
                              <div className="mt-8 pt-8 border-t border-gray-200">
                                 <div className="flex items-center justify-center space-x-3 text-xs font-black text-gray-400 uppercase">
                                    <MapPin size={14} className="text-blue-900" />
                                    <span>Jakarta, Indonesia</span>
                                 </div>
                              </div>
                           </div>
                           <button onClick={() => setViewMode('EDIT')} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-lg flex items-center justify-center space-x-2">
                             <Edit3 size={16} />
                             <span>Edit Profil Tenant</span>
                           </button>
                        </div>
                        <div className="md:col-span-2 space-y-10">
                           <section className="space-y-6">
                              <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center">
                                 <Layout size={14} className="mr-2" /> Detail Operasional Tenant
                              </h6>
                              <div className="grid grid-cols-2 gap-6">
                                 <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
                                    <p className="text-[9px] font-black text-gray-400 uppercase mb-2">Platform Service</p>
                                    <p className="text-sm font-black text-blue-900">Enterprise Cloud v2.5</p>
                                 </div>
                                 <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
                                    <p className="text-[9px] font-black text-gray-400 uppercase mb-2">Data Storage (S3)</p>
                                    <p className="text-sm font-black text-emerald-600">12.4 GB / 50 GB</p>
                                 </div>
                              </div>
                              <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                                 <p className="text-[9px] font-black text-gray-400 uppercase mb-3">Alamat Surat Menyurat</p>
                                 <p className="text-sm font-bold text-gray-700 leading-relaxed italic">"{selectedInst.address}"</p>
                              </div>
                           </section>
                        </div>
                     </div>
                   )}

                   {activeDetailTab === 'USERS' && (
                     <div className="space-y-10 animate-in fade-in duration-500">
                        <div className="flex items-center justify-between">
                           <div>
                              <h5 className="text-xl font-black text-gray-900 tracking-tight">Provisioning & Akses Tenant</h5>
                              <p className="text-sm text-gray-400 font-medium">Manajemen user administratif untuk instansi "{selectedInst.name}"</p>
                           </div>
                           <button 
                             onClick={handleProvisionAdmin}
                             className="bg-blue-900 text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl flex items-center space-x-3 shadow-blue-900/20"
                           >
                              <UserPlus size={18} />
                              <span>Tambah Admin Tenant</span>
                           </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {getInstitutionUsers(selectedInst.id).map(u => (
                             <div key={u.id} className="p-6 bg-white border border-gray-100 rounded-[2rem] flex items-center justify-between group hover:shadow-xl hover:border-blue-900/10 transition-all duration-300">
                                <div className="flex items-center space-x-4">
                                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black shadow-lg ${u.role === UserRole.ADMIN_INSTANSI ? 'bg-indigo-600' : 'bg-blue-900'}`}>{u.name.charAt(0)}</div>
                                   <div>
                                      <p className="text-sm font-black text-gray-900 leading-none">{u.name}</p>
                                      <div className="flex items-center space-x-2 mt-1.5">
                                         <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-tighter ${u.role === UserRole.ADMIN_INSTANSI ? 'bg-indigo-50 text-indigo-700' : 'bg-blue-50 text-blue-700'}`}>
                                            {u.role.replace('_', ' ')}
                                         </span>
                                         <span className="text-[10px] text-gray-400 font-bold">@{u.username}</span>
                                      </div>
                                   </div>
                                </div>
                                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all">
                                   <button className="p-2 text-gray-400 hover:text-amber-600" title="Reset Credentials" onClick={() => alert("Reset password dikirim ke email user.")}><KeyRound size={16} /></button>
                                   <button className="p-2 text-gray-400 hover:text-red-600" title="Hapus Akun" onClick={() => handleDeleteUser(u.id, u.name)}><Trash2 size={16} /></button>
                                </div>
                             </div>
                           ))}
                           {getInstitutionUsers(selectedInst.id).length === 0 && (
                             <div className="md:col-span-2 py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200 text-center flex flex-col items-center">
                                <Users size={48} className="text-gray-300 mb-4" />
                                <p className="text-gray-400 font-black uppercase text-xs tracking-widest">Belum ada akun terdaftar</p>
                                <p className="text-[10px] text-gray-400 font-bold mt-2 uppercase">Gunakan tombol di atas untuk membuat akun pimpinan/admin tenant.</p>
                             </div>
                           )}
                        </div>

                        <div className="p-8 bg-amber-50 rounded-[2.5rem] border border-amber-100 flex items-start space-x-5">
                          <ShieldAlert size={32} className="text-amber-600 shrink-0 mt-1" />
                          <div>
                            <h6 className="text-sm font-black text-amber-900 uppercase">Peran Super Admin</h6>
                            <p className="text-[11px] text-amber-800 font-bold leading-relaxed uppercase mt-1">
                              Sebagai Super Admin, Anda hanya disarankan membuat **Akun Admin Utama** (Akun Induk) untuk setiap instansi. Selanjutnya, Admin Instansi tersebut akan mengelola pegawai mereka sendiri secara mandiri.
                            </p>
                          </div>
                        </div>
                     </div>
                   )}

                   {activeDetailTab === 'LOGS' && (
                     <div className="space-y-6">
                        {[
                          { action: 'Provisioning Akun Admin', user: 'Super Admin', time: '12 Mei, 10:15' },
                          { action: 'Update Konfigurasi SBM', user: 'Admin Dishub', time: '12 Mei, 09:30' },
                          { action: 'Registrasi Tenant Selesai', user: 'System', time: '10 Mei, 08:00' }
                        ].map((log, i) => (
                          <div key={i} className="flex items-center justify-between p-6 bg-white border border-gray-100 rounded-3xl">
                             <div className="flex items-center space-x-6">
                                <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center shadow-inner"><History size={20} /></div>
                                <div>
                                   <p className="text-sm font-black text-gray-800 leading-none mb-1.5">{log.action}</p>
                                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Oleh: {log.user} • {log.time}</p>
                                </div>
                             </div>
                             <span className="text-[9px] font-black text-blue-900 bg-blue-50 px-3 py-1 rounded-lg uppercase tracking-widest">Logged</span>
                          </div>
                        ))}
                     </div>
                   )}

                </div>
              ) : null}
            </div>

            {/* Modal Footer Area */}
            <div className="p-10 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
               <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <Database size={18} className="mr-2 text-blue-900" />
                  Isolated Multi-Tenant v2.5 Secured
               </div>
               <div className="flex space-x-4">
                  <button onClick={() => setIsModalOpen(false)} className="px-10 py-4 font-black text-[10px] uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all">Batalkan</button>
                  {viewMode !== 'DETAIL' && (
                    <button 
                      form="tenantForm"
                      type="submit" 
                      className="bg-blue-900 text-white px-12 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center space-x-2"
                    >
                       <Save size={18} />
                       <span>{viewMode === 'ADD' ? 'Register Tenant' : 'Simpan Perubahan'}</span>
                    </button>
                  )}
               </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default InstitutionManagementPage;
