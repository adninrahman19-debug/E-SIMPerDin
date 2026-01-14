
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
  name: string;
  description: string;
  content: string; // HTML-like string with placeholders
  headerHtml?: string;
  footerHtml?: string;
  isDefault: boolean;
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
