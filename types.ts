
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

export interface Institution {
  id: string;
  name: string;
  code: string;
  address: string;
  logoUrl?: string;
  active: boolean;
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
