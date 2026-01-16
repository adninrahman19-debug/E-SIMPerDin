
import { 
  SubscriptionPlan, 
  User, 
  UserRole, 
  Institution, 
  SPPDTemplate, 
  TemplateCategory, 
  Transaction, 
  TransactionStatus, 
  CostStandard,
  SystemLogEntry,
  LogCategory,
  BackupEntry,
  BroadcastMessage,
  EmailTemplate,
  SystemConfig,
  DemoSession,
  SupportTicket,
  FAQItem,
  HelpDoc,
  SubscriptionStatus
} from './types';

export const MOCK_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan-trial',
    name: 'Free Trial',
    price: 0,
    userLimit: 5,
    sppdLimit: 10,
    features: ['Dasar SPPD Digital', '1 Level Approval', 'Template Standar', 'Akses Mobile Browser'],
    hasCustomTemplates: false,
    approvalLevels: 1,
    storageGb: 1
  },
  {
    id: 'plan-pro',
    name: 'Professional',
    price: 3500000,
    userLimit: 50,
    sppdLimit: 500,
    features: ['Otomatisasi SBM Lokal', 'Multi-level Approval', 'Custom Kop Surat', 'Laporan Rekapitulasi Tahunan', 'Prioritas Dukungan'],
    hasCustomTemplates: true,
    approvalLevels: 3,
    storageGb: 10
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise',
    price: 15000000,
    userLimit: 9999,
    sppdLimit: 9999,
    features: ['White-label Branding', 'Integrasi API', 'Dedicated Server Option', 'Audit Log Ekstensif', 'On-site Training'],
    hasCustomTemplates: true,
    approvalLevels: 5,
    storageGb: 50
  }
];

export const LOGIN_DEMO_INFO = [
  { role: 'Super Admin', user: 'superadmin', pass: 'admin123' },
  { role: 'Admin Instansi', user: 'admin_dishub', pass: 'admin123' },
  { role: 'Operator', user: 'operator_sample', pass: 'admin123' },
  { role: 'Penyetuju', user: 'pejabat_sample', pass: 'admin123' },
  { role: 'Pegawai', user: 'pegawai_sample', pass: 'admin123' }
];

export const MOCK_USERS: User[] = [
  { id: '1', username: 'superadmin', name: 'Super Administrator', role: UserRole.SUPER_ADMIN, email: 'admin@simperdin.id', active: true },
  { id: '2', username: 'admin_dishub', name: 'Admin Dishub Provinsi', role: UserRole.ADMIN_INSTANSI, institutionId: 'inst-1', email: 'admin@dishub.go.id', active: true, nip: '198001012005011001', position: 'Kepala Bagian Umum' },
  { id: '3', username: 'operator_sample', name: 'Siti Operator', role: UserRole.OPERATOR, institutionId: 'inst-1', email: 'siti@dishub.go.id', active: true, nip: '199001012015012001', position: 'Staf Administrasi' },
  { id: '4', username: 'pejabat_sample', name: 'Drs. H. Mulyadi', role: UserRole.PEJABAT_PENYETUJU, institutionId: 'inst-1', email: 'mulyadi@dishub.go.id', active: true, nip: '197001011995011001', position: 'Kepala Bidang' },
  { id: 'u-5', username: 'pegawai_sample', name: 'Andi Pratama', role: UserRole.PEGAWAI, institutionId: 'inst-1', email: 'andi@dishub.go.id', active: true, nip: '199503032018031003', position: 'Staf Pelaksana' }
];

export const MOCK_INSTITUTIONS: Institution[] = [
  { id: 'inst-1', name: 'Dinas Perhubungan Provinsi', code: 'DISHUB-PROV', address: 'Jl. Merdeka No. 1, Jakarta', active: true }
];

export const MOCK_TEMPLATES: SPPDTemplate[] = [
  { id: 'tmpl-1', name: 'Standard Nasional (PMK)', category: TemplateCategory.SPPD, description: 'Format SPPD sesuai PMK.', isDefault: true, version: 1, institutionId: 'GLOBAL' }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'trx-1', institutionId: 'inst-1', planId: 'plan-pro', amount: 3500000, status: TransactionStatus.APPROVED, createdAt: new Date().toISOString() }
];

export const MOCK_GLOBAL_COSTS: CostStandard[] = [
  { id: '1', destination: 'Jakarta', perDiem: 750000, lodging: 2000000, transportBase: 800000 }
];

export const MOCK_SYSTEM_LOGS: SystemLogEntry[] = [
  { id: 'log-1', timestamp: new Date().toISOString(), category: LogCategory.TECHNICAL, userName: 'System', ipAddress: '127.0.0.1', action: 'System Startup', details: 'Core services started successfully', status: 'SUCCESS' }
];

export const MOCK_TECHNICAL_METRICS = [
  { time: '10:00', cpu: 20, ram: 40, req: 100, error: 0 },
  { time: '10:05', cpu: 25, ram: 42, req: 120, error: 1 }
];

export const MOCK_BACKUPS: BackupEntry[] = [
  { id: 'bak-1', timestamp: new Date().toISOString(), sizeMb: 1200, type: 'AUTOMATIC', status: 'COMPLETED', createdBy: 'System', fileName: 'daily_backup.sql' }
];

export const MOCK_BROADCASTS: BroadcastMessage[] = [
  { id: 'bc-1', subject: 'Welcome', content: 'Welcome to E-SIMPerDin', target: 'ALL', priority: 'LOW', createdAt: new Date().toISOString(), sentBy: 'Super Admin', readCount: 156 }
];

export const MOCK_EMAIL_TEMPLATES: EmailTemplate[] = [
  { id: 'et-1', type: 'Welcome Email', subject: 'Welcome', body: 'Hello {{NAME}}', lastUpdated: '2024-05-12' }
];

export const DEFAULT_SYSTEM_CONFIG: SystemConfig = {
  appName: 'E-SIMPerDin',
  version: '2.5.0',
  footerText: '© 2024 E-SIMPerDin',
  legalText: 'All rights reserved.',
  defaultLanguage: 'ID',
  dateFormat: 'DD/MM/YYYY',
  timezone: 'Asia/Jakarta (WIB)',
  numberFormat: 'IDR (Rp)'
};

export const MOCK_DEMO_SESSIONS: DemoSession[] = [
  { id: 'ds-1', institutionName: 'Bappeda Demo', leadName: 'John Doe', createdAt: new Date().toISOString(), expiresAt: new Date().toISOString(), usageCount: 5, status: 'ACTIVE' }
];

export const MOCK_DEMO_USAGE = [
  { date: '2024-05-10', activeLogins: 10, generations: 2 }
];

export const MOCK_TICKETS: SupportTicket[] = [
  { id: 't-1', institutionName: 'Dishub', subject: 'Login issue', category: 'Technical', priority: 'HIGH', status: 'OPEN', slaDeadline: new Date().toISOString() }
];

export const MOCK_FAQS: FAQItem[] = [
  { id: 'f-1', question: 'How to login?', answer: 'Use your credentials.', category: 'Account' }
];

export const MOCK_HELPDOCS: HelpDoc[] = [
  { id: 'hd-1', title: 'User Guide', type: 'ARTICLE', views: 100, category: 'General', lastUpdated: '2024-05-12' }
];

export const MOCK_SUBSCRIPTIONS = [
  { institutionId: 'inst-1', planId: 'plan-pro', status: SubscriptionStatus.ACTIVE, endDate: '2024-12-31' }
];
