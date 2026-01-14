
import { UserRole, Institution, User, SPPDStatus, SubscriptionPlan, SubscriptionStatus, Subscription, Transaction, TransactionStatus, SPPDTemplate } from './types';

export const MOCK_PLANS: SubscriptionPlan[] = [
  { 
    id: 'plan-basic', 
    name: 'Basic', 
    price: 1500000, 
    userLimit: 10, 
    sppdLimit: 50, 
    approvalLevels: 1, 
    storageGb: 2, 
    features: ['Dashboard Dasar', 'Cetak SPPD', 'Export Excel'],
    durationDays: 30,
    hasCustomTemplates: false
  },
  { 
    id: 'plan-pro', 
    name: 'Professional', 
    price: 3500000, 
    userLimit: 50, 
    sppdLimit: 500, 
    approvalLevels: 3, 
    storageGb: 10, 
    features: ['Multi-level Approval', 'Custom Template', 'Statistik Lanjutan', 'Export PDF/Excel'],
    durationDays: 30,
    hasCustomTemplates: true
  },
  { 
    id: 'plan-enterprise', 
    name: 'Enterprise', 
    price: 7500000, 
    userLimit: 9999, 
    sppdLimit: 9999, 
    approvalLevels: 5, 
    storageGb: 50, 
    features: ['Semua Fitur Pro', 'Prioritas Dukungan', 'Backup Harian', 'API Access'],
    durationDays: 30,
    hasCustomTemplates: true
  },
];

export const MOCK_TEMPLATES: SPPDTemplate[] = [
  {
    id: 'tmpl-1',
    institutionId: 'GLOBAL',
    name: 'Format Standar Nasional',
    description: 'Template SPPD standar sesuai Peraturan Menteri Keuangan.',
    content: '<h1>SURAT PERINTAH PERJALANAN DINAS (SPPD)</h1><p>Nomor: {{NOMOR_SPPD}}</p>',
    isDefault: true,
    version: 1,
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: 'tmpl-2',
    institutionId: 'inst-1',
    name: 'Template Internal Dishub',
    description: 'Format khusus dengan logo instansi dan kolom paraf tambahan.',
    content: '<h1>DISHUB - SURAT TUGAS</h1><p>Nama: {{NAMA_PEGAWAI}}</p>',
    isDefault: false,
    version: 2,
    isActive: true,
    createdAt: '2024-03-15'
  }
];

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: 'sub-1',
    institutionId: 'inst-1',
    planId: 'plan-pro',
    status: SubscriptionStatus.ACTIVE,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    trialStartedAt: '2023-12-01'
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'trx-1',
    institutionId: 'inst-1',
    planId: 'plan-pro',
    amount: 3500000,
    status: TransactionStatus.APPROVED,
    createdAt: '2024-01-01T10:00:00Z',
    paymentProofUrl: 'https://example.com/proof.jpg'
  }
];

export const MOCK_INSTITUTIONS: Institution[] = [
  { id: 'inst-1', name: 'Dinas Perhubungan Provinsi', code: 'DISHUB-PROV', address: 'Jl. Merdeka No. 1, Jakarta', active: true, subscriptionId: 'sub-1' },
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
