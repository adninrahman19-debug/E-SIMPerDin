
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
  SUSPENDED = 'DITANGGUHKAN'
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  APPROVED = 'DISETUJUI',
  REJECTED = 'DITOLAK'
}

export enum TemplateCategory {
  SPPD = 'SPPD',
  KWITANSI = 'KWITANSI',
  LAPORAN = 'LAPORAN',
  SURAT_TUGAS = 'SURAT_TUGAS'
}

export enum LogCategory {
  ADMIN_ACTION = 'ADMIN_ACTION',
  SUBSCRIPTION = 'SUBSCRIPTION',
  SECURITY = 'SECURITY',
  TECHNICAL = 'TECHNICAL'
}

export interface SupportTicket {
  id: string;
  institutionName: string;
  subject: string;
  message: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  createdAt: string;
  slaDeadline: string;
  category: 'BILLING' | 'TECHNICAL' | 'FEATURE_REQUEST' | 'SECURITY';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  isPublished: boolean;
}

export interface HelpDoc {
  id: string;
  title: string;
  category: string;
  views: number;
  lastUpdated: string;
  type: 'ARTICLE' | 'VIDEO';
}

export interface DemoSession {
  id: string;
  institutionName: string;
  leadName: string;
  createdAt: string;
  expiresAt: string;
  usageCount: number;
  status: 'ACTIVE' | 'EXPIRED' | 'CONVERTED';
}

export interface DemoUsageStats {
  date: string;
  generations: number;
  activeLogins: number;
}

export interface SystemConfig {
  appName: string;
  appLogoUrl: string;
  footerText: string;
  legalText: string;
  version: string;
  defaultLanguage: 'ID' | 'EN';
  timezone: string;
  dateFormat: string;
  numberFormat: string;
}

export interface SystemLogEntry {
  id: string;
  timestamp: string;
  category: LogCategory;
  userId: string;
  userName: string;
  action: string;
  details: string;
  ipAddress: string;
  status: 'SUCCESS' | 'WARNING' | 'ERROR';
}

export interface BackupEntry {
  id: string;
  timestamp: string;
  sizeMb: number;
  type: 'AUTOMATIC' | 'MANUAL';
  status: 'COMPLETED' | 'FAILED' | 'IN_PROGRESS';
  createdBy: string;
  fileName: string;
}

export interface BroadcastMessage {
  id: string;
  subject: string;
  content: string;
  target: 'ALL' | 'ACTIVE_ONLY' | 'TRIAL_ONLY' | 'SPECIFIC';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  createdAt: string;
  sentBy: string;
  readCount: number;
}

export interface EmailTemplate {
  id: string;
  type: 'ACTIVATION' | 'EXPIRED_REMINDER' | 'PASSWORD_RESET' | 'PAYMENT_CONFIRMED';
  subject: string;
  body: string;
  lastUpdated: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  userLimit: number;
  sppdLimit: number;
  approvalLevels: number;
  storageGb: number;
  features: string[];
  durationDays: number;
  hasCustomTemplates: boolean;
}

export interface Subscription {
  id: string;
  institutionId: string;
  planId: string;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  trialStartedAt: string;
}

export interface Transaction {
  id: string;
  institutionId: string;
  planId: string;
  amount: number;
  paymentProofUrl?: string;
  status: TransactionStatus;
  createdAt: string;
  notes?: string;
}

export interface Institution {
  id: string;
  name: string;
  code: string;
  address: string;
  logoUrl?: string;
  active: boolean;
  subscriptionId?: string;
}

export interface SPPDTemplate {
  id: string;
  institutionId: string | 'GLOBAL';
  category: TemplateCategory;
  name: string;
  description: string;
  content: string; 
  headerHtml?: string;
  footerHtml?: string;
  isDefault: boolean;
  isLocked: boolean;
  version: number;
  isActive: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  institutionId?: string;
  position?: string;
  nip?: string;
  email: string;
}

export interface SPPD {
  id: string;
  sppdNumber: string;
  requesterId: string;
  institutionId: string;
  purpose: string;
  departureDate: string;
  returnDate: string;
  destination: string;
  transportation: string;
  estimatedCost: number;
  status: SPPDStatus;
  createdAt: string;
  logs: ActivityLog[];
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  userId: string;
  action: string;
  notes?: string;
}

export interface CostStandard {
  id: string;
  institutionId: string;
  destination: string;
  perDiem: number;
  lodging: number;
  transportBase: number;
}
