
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN_INSTANSI = 'ADMIN_INSTANSI',
  OPERATOR = 'OPERATOR',
  PEJABAT_PENYETUJU = 'PEJABAT_PENYETUJU',
  PEGAWAI = 'PEGAWAI'
}

export enum SPPDStatus {
  DRAFT = 'DRAFT',
  PENDING = 'MENUNGGU_PERSETUJUAN',
  REVISION = 'REVISI',
  APPROVED = 'DISETUJUI',
  REJECTED = 'DITOLAK',
  ARCHIVED = 'DIARSIPKAN'
}

export enum SubscriptionStatus {
  TRIAL = 'TRIAL',
  ACTIVE = 'AKTIF',
  EXPIRED = 'KADALUWARSA',
  /* Added SUSPENDED status */
  SUSPENDED = 'SUSPENDED'
}

/* Added TemplateCategory enum */
export enum TemplateCategory {
  SPPD = 'SPPD',
  SURAT_TUGAS = 'SURAT_TUGAS',
  KWITANSI = 'KWITANSI',
  LAPORAN = 'LAPORAN'
}

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  institutionId?: string;
  email: string;
  /* Added optional active property */
  active?: boolean;
  nip?: string;
  position?: string;
}

/* Added WorkUnit interface */
export interface WorkUnit {
  id: string;
  name: string;
  code: string;
  headName: string;
  employeeCount: number;
}

/* Added Institution interface */
export interface Institution {
  id: string;
  name: string;
  code: string;
  address: string;
  active: boolean;
  phone?: string;
  email?: string;
  website?: string;
  letterheadHtml?: string;
  letterhead?: string;
  workUnits?: WorkUnit[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  userLimit: number;
  sppdLimit: number;
  features: string[];
  /* Added missing limitation and feature properties */
  hasCustomTemplates?: boolean;
  approvalLevels?: number;
  storageGb?: number;
}

// Added Subscription interface to fix import error in App.tsx
export interface Subscription {
  institutionId: string;
  planId: string;
  status: SubscriptionStatus;
  endDate: string;
}

/* Added TransactionStatus enum */
export enum TransactionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

/* Added Transaction interface */
export interface Transaction {
  id: string;
  institutionId: string;
  planId: string;
  amount: number;
  status: TransactionStatus;
  createdAt: string;
}

/* Added CostStandard interface */
export interface CostStandard {
  id: string;
  destination: string;
  perDiem: number;
  lodging: number;
  transportBase: number;
}

/* Added LogCategory enum */
export enum LogCategory {
  ADMIN_ACTION = 'ADMIN_ACTION',
  SUBSCRIPTION = 'SUBSCRIPTION',
  SECURITY = 'SECURITY',
  TECHNICAL = 'TECHNICAL'
}

/* Added SystemLogEntry interface */
export interface SystemLogEntry {
  id: string;
  timestamp: string;
  category: LogCategory;
  userName: string;
  ipAddress: string;
  action: string;
  details: string;
  status: 'SUCCESS' | 'WARNING' | 'ERROR';
}

/* Added BackupEntry interface */
export interface BackupEntry {
  id: string;
  timestamp: string;
  sizeMb: number;
  type: 'MANUAL' | 'AUTOMATIC';
  status: 'COMPLETED' | 'FAILED' | 'IN_PROGRESS';
  createdBy: string;
  fileName: string;
}

/* Added BroadcastMessage interface */
export interface BroadcastMessage {
  id: string;
  subject: string;
  content: string;
  target: 'ALL' | 'ACTIVE_ONLY' | 'TRIAL_ONLY';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  createdAt: string;
  sentBy: string;
  readCount: number;
}

/* Added EmailTemplate interface */
export interface EmailTemplate {
  id: string;
  type: string;
  subject: string;
  body: string;
  lastUpdated: string;
}

/* Added SystemConfig interface */
export interface SystemConfig {
  appName: string;
  version: string;
  footerText: string;
  legalText: string;
  defaultLanguage: 'ID' | 'EN';
  dateFormat: string;
  timezone: string;
  numberFormat: string;
}

/* Added DemoSession interface */
export interface DemoSession {
  id: string;
  institutionName: string;
  leadName: string;
  createdAt: string;
  expiresAt: string;
  usageCount: number;
  status: 'ACTIVE' | 'EXPIRED' | 'CONVERTED';
}

/* Added SupportTicket interface */
export interface SupportTicket {
  id: string;
  institutionName: string;
  subject: string;
  category: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  slaDeadline: string;
}

/* Added FAQItem interface */
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

/* Added HelpDoc interface */
export interface HelpDoc {
  id: string;
  title: string;
  type: 'VIDEO' | 'ARTICLE';
  views: number;
  category: string;
  lastUpdated: string;
}

/* Added SPPDTemplate interface */
export interface SPPDTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  isDefault: boolean;
  isLocked?: boolean;
  version: number;
  institutionId: string;
  createdAt?: string;
}
