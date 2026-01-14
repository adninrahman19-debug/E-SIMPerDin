
import React from 'react';
import { useAuth } from '../../App';
import { MOCK_USERS } from '../../constants';
import { UserRole } from '../../types';
import { UserPlus, Search, MoreVertical, Shield, ShieldAlert, Mail, MapPin } from 'lucide-react';

const UserManagement: React.FC = () => {
  const { user } = useAuth();

  const getRoleIcon = (role: UserRole) => {
    switch(role) {
      case UserRole.SUPER_ADMIN: return <ShieldAlert className="text-red-600" size={18} />;
      case UserRole.ADMIN_INSTANSI: return <Shield className="text-blue-900" size={18} />;
      default: return <Shield className="text-gray-400" size={18} />;
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manajemen Pengguna</h2>
          <p className="text-gray-500">Kelola akses dan akun pegawai di lingkungan institusi.</p>
        </div>
        <button className="bg-blue-900 text-white px-5 py-2.5 rounded-lg flex items-center space-x-2 hover:bg-blue-800 transition-all font-bold shadow-md">
          <UserPlus size={18} />
          <span>Tambah Pengguna</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {MOCK_USERS.filter(u => user?.role === UserRole.SUPER_ADMIN || u.institutionId === user?.institutionId).map((u) => (
          <div key={u.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden group hover:border-blue-200 hover:shadow-md transition-all">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center font-bold text-xl border border-blue-100">
                  {u.name.charAt(0)}
                </div>
                <div className="flex flex-col items-end">
                  <div className="bg-blue-900/5 text-blue-900 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest flex items-center">
                    {getRoleIcon(u.role)}
                    <span className="ml-1.5">{u.role.replace('_', ' ')}</span>
                  </div>
                  <button className="mt-4 text-gray-400 hover:text-blue-900 transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">{u.name}</h3>
                <p className="text-sm text-blue-800 font-medium mt-0.5">{u.position || 'Akses Sistem'}</p>
                <p className="text-xs text-gray-400 mt-1">NIP: {u.nip || '-'}</p>
              </div>

              <div className="mt-6 space-y-3 pt-6 border-t border-gray-50">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail size={16} className="mr-3 text-gray-400" />
                  {u.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={16} className="mr-3 text-gray-400" />
                  Jakarta, Indonesia
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-green-600 flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-600 mr-2"></div>
                Aktif
              </span>
              <button className="text-xs font-bold text-blue-900 hover:underline">Edit Detail</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
