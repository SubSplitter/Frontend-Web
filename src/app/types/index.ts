// types.ts
export interface Member {
    id: string;
    name: string;
    avatar?: string;
    isPrimary?: boolean;
  }
  
  export interface Pool {
    id: string;
    serviceName: string;
    serviceLogo: string;
    serviceColor: string;
    plan?: string;
    totalCost: number;
    splitCost: number;
    members: Member[];
    capacity: number;
    expiresAt: string;
    status: 'active' | 'pending' | 'expired';
    lastPayment?: string;
  }