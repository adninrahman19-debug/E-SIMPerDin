
import { UserRole, Institution, User, SPPDStatus } from './types';

export const MOCK_INSTITUTIONS: Institution[] = [
  { id: 'inst-1', name: 'Dinas Perhubungan Provinsi', code: 'DISHUB-PROV', address: 'Jl. Merdeka No. 1, Jakarta', active: true },
  { id: 'inst-2', name: 'Kementerian ESDM', code: 'ESDM-RI', address: 'Jl. Medan Merdeka, Jakarta', active: true },
];

export const MOCK_USERS: User[] = [
  { id: 'u-1', username: 'superadmin', name: 'Super Administrator', role: UserRole.SUPER_ADMIN, email: 'super@simperdin.id' },
  { id: 'u-2', username: 'admin_dishub', name: 'Admin Dishub', role: UserRole.ADMIN_INSTANSI, institutionId: 'inst-1', position: 'Kabag Umum', nip: '198001012005011001', email: 'admin@dishub.go.id' },
  { id: 'u-3', username: 'operator_dishub', name: 'Operator Staff', role: UserRole.OPERATOR, institutionId: 'inst-1', position: 'Staf Administrasi', nip: '199002022015022002', email: 'staff@dishub.go.id' },
  { id: 'u-4', username: 'pejabat_dishub', name: 'Budi Santoso', role: UserRole.PEJABAT_PENYETUJU, institutionId: 'inst-1', position: 'Kepala Dinas', nip: '197505051998011005', email: 'kadin@dishub.go.id' },
  { id: 'u-5', username: 'pegawai_dishub', name: 'Andi Pratama', role: UserRole.PEGAWAI, institutionId: 'inst-1', position: 'Analis Transportasi', nip: '199503032018031003', email: 'andi@dishub.go.id' },
];

export const APP_THEME = {
  primary: 'blue-900',
  primaryHover: 'blue-800',
  secondary: 'gray-200',
  accent: 'blue-600'
};

export const LOGIN_DEMO_INFO = [
  { role: 'Super Admin', user: 'superadmin', pass: 'admin123' },
  { role: 'Admin Instansi', user: 'admin_dishub', pass: 'admin123' },
  { role: 'Operator', user: 'operator_dishub', pass: 'admin123' },
  { role: 'Pejabat Penyetuju', user: 'pejabat_dishub', pass: 'admin123' },
  { role: 'Pegawai', user: 'pegawai_dishub', pass: 'admin123' },
];
