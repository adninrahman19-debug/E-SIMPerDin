
import { UserRole, Institution, User, SPPDStatus, SubscriptionPlan, SubscriptionStatus, Subscription, Transaction, TransactionStatus, SPPDTemplate, TemplateCategory, CostStandard, LogCategory, SystemLogEntry, BackupEntry, BroadcastMessage, EmailTemplate } from './types';

export const MOCK_BROADCASTS: BroadcastMessage[] = [
  {
    id: 'msg-1',
    subject: 'Pemberitahuan Maintenance Rutin',
    content: 'Kami akan melakukan pemeliharaan server pada hari Minggu, 19 Mei 2024 mulai pukul 00:00 - 04:00 WIB.',
    target: 'ALL',
    priority: 'HIGH',
    createdAt: '2024-05-13T10:00:00Z',
    sentBy: 'Super Administrator',
    readCount: 1240
  },
  {
    id: 'msg-2',
    subject: 'Update Fitur Laporan Realisasi',
    content: 'Tersedia format laporan baru untuk rekapitulasi anggaran bulanan instansi. Silakan cek di menu Laporan.',
    target: 'ACTIVE_ONLY',
    priority: 'MEDIUM',
    createdAt: '2024-05-12T14:30:00Z',
    sentBy: 'Product Team',
    readCount: 856
  }
];

export const MOCK_EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'et-1',
    type: 'ACTIVATION',
    subject: 'Selamat Datang di E-SIMPerDin - Aktivasi Akun Anda',
    body: 'Halo {{NAME}},\n\nAkun instansi Anda telah berhasil didaftarkan. Silakan klik tautan berikut untuk melakukan aktivasi: {{LINK}}',
    lastUpdated: '2024-01-10'
  },
  {
    id: 'et-2',
    type: 'EXPIRED_REMINDER',
    subject: 'Peringatan: Masa Aktif Langganan Segera Berakhir',
    body: 'Halo Admin {{INSTITUTION}},\n\nKami menginformasikan bahwa paket {{PLAN}} Anda akan berakhir dalam {{DAYS}} hari. Segera lakukan perpanjangan.',
    lastUpdated: '2024-03-05'
  },
  {
    id: 'et-3',
    type: 'PASSWORD_RESET',
    subject: 'Permintaan Atur Ulang Kata Sandi',
    body: 'Kami menerima permintaan reset password untuk akun {{USERNAME}}. Kode verifikasi Anda adalah: {{CODE}}',
    lastUpdated: '2024-02-20'
  }
];

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

export const MOCK_GLOBAL_COSTS: CostStandard[] = [
  { id: 'gc-1', institutionId: 'GLOBAL', destination: 'DKI Jakarta', perDiem: 530000, lodging: 1500000, transportBase: 250000 },
  { id: 'gc-2', institutionId: 'GLOBAL', destination: 'Jawa Barat', perDiem: 430000, lodging: 1200000, transportBase: 150000 },
  { id: 'gc-3', institutionId: 'GLOBAL', destination: 'Bali', perDiem: 480000, lodging: 1350000, transportBase: 400000 },
  { id: 'gc-4', institutionId: 'GLOBAL', destination: 'Papua', perDiem: 580000, lodging: 1800000, transportBase: 1200000 },
];

export const MOCK_SYSTEM_LOGS: SystemLogEntry[] = [
  {
    id: 'log-1',
    timestamp: '2024-05-13T10:15:00Z',
    category: LogCategory.ADMIN_ACTION,
    userId: 'u-1',
    userName: 'Super Administrator',
    action: 'Update Template Global',
    details: 'Merubah format footer pada template SPPD Nasional v3.0',
    ipAddress: '114.125.10.12',
    status: 'SUCCESS'
  },
  {
    id: 'log-2',
    timestamp: '2024-05-13T09:30:00Z',
    category: LogCategory.SUBSCRIPTION,
    userId: 'u-1',
    userName: 'Super Administrator',
    action: 'Verifikasi Pembayaran',
    details: 'Approve transaksi TRX-1029 (Dinas Perhubungan Prov)',
    ipAddress: '114.125.10.12',
    status: 'SUCCESS'
  },
  {
    id: 'log-3',
    timestamp: '2024-05-13T03:45:00Z',
    category: LogCategory.SECURITY,
    userId: 'UNKNOWN',
    userName: 'Guest',
    action: 'Failed Login Attempt',
    details: 'Percobaan login berkali-kali pada akun: admin_dishub',
    ipAddress: '182.253.44.18',
    status: 'ERROR'
  },
  {
    id: 'log-4',
    timestamp: '2024-05-12T22:10:00Z',
    category: LogCategory.TECHNICAL,
    userId: 'SYSTEM',
    userName: 'Automatic Engine',
    action: 'Database Backup',
    details: 'Berhasil melakukan snapshot database harian (1.2GB)',
    ipAddress: '127.0.0.1',
    status: 'SUCCESS'
  }
];

export const MOCK_BACKUPS: BackupEntry[] = [
  {
    id: 'bak-001',
    timestamp: '2024-05-13T00:00:00Z',
    sizeMb: 1240.5,
    type: 'AUTOMATIC',
    status: 'COMPLETED',
    createdBy: 'SYSTEM',
    fileName: 'simperdin_prod_20240513_daily.sql.gz'
  },
  {
    id: 'bak-002',
    timestamp: '2024-05-12T00:00:00Z',
    sizeMb: 1238.2,
    type: 'AUTOMATIC',
    status: 'COMPLETED',
    createdBy: 'SYSTEM',
    fileName: 'simperdin_prod_20240512_daily.sql.gz'
  },
  {
    id: 'bak-003',
    timestamp: '2024-05-11T14:30:00Z',
    sizeMb: 1235.0,
    type: 'MANUAL',
    status: 'COMPLETED',
    createdBy: 'Super Administrator',
    fileName: 'simperdin_pre_update_v2.5.sql.gz'
  },
  {
    id: 'bak-004',
    timestamp: '2024-05-10T00:00:00Z',
    sizeMb: 1230.1,
    type: 'AUTOMATIC',
    status: 'FAILED',
    createdBy: 'SYSTEM',
    fileName: 'simperdin_prod_20240510_daily.sql.gz'
  }
];

export const MOCK_TECHNICAL_METRICS = [
  { time: '10:00', cpu: 24, ram: 42, req: 120, error: 2 },
  { time: '10:05', cpu: 28, ram: 44, req: 145, error: 0 },
  { time: '10:10', cpu: 45, ram: 48, req: 280, error: 5 },
  { time: '10:15', cpu: 32, ram: 46, req: 190, error: 1 },
  { time: '10:20', cpu: 22, ram: 43, req: 110, error: 0 },
  { time: '10:25', cpu: 18, ram: 41, req: 95, error: 0 },
];

export const MOCK_TEMPLATES: SPPDTemplate[] = [
  {
    id: 'tmpl-1',
    institutionId: 'GLOBAL',
    category: TemplateCategory.SPPD,
    name: 'Format Standar Nasional',
    description: 'Template SPPD standar sesuai Peraturan Menteri Keuangan.',
    content: '<h1>SURAT PERINTAH PERJALANAN DINAS (SPPD)</h1><p>Nomor: {{NOMOR_SPPD}}</p>',
    isDefault: true,
    isLocked: true,
    version: 1,
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: 'tmpl-2',
    institutionId: 'inst-1',
    category: TemplateCategory.SPPD,
    name: 'Template Internal Dishub',
    description: 'Format khusus dengan logo instansi dan kolom paraf tambahan.',
    content: '<h1>DISHUB - SURAT TUGAS</h1><p>Nama: {{NAMA_PEGAWAI}}</p>',
    isDefault: false,
    isLocked: false,
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
