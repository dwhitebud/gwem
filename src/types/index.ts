// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'advisor' | 'legal';
}

// Asset Types
export interface Asset {
  id: string;
  name: string;
  type: 'real_estate' | 'stock' | 'bond' | 'trust' | 'corporate' | 'other';
  value: number;
  currency: string;
  ownership: OwnershipStructure;
}

export interface OwnershipStructure {
  type: 'direct' | 'trust' | 'corporate';
  details: {
    name: string;
    percentage: number;
    beneficiaries?: string[];
  };
}

// Portfolio Types
export interface Portfolio {
  id: string;
  userId: string;
  assets: Asset[];
  totalValue: number;
  lastUpdated: Date;
}

// Dashboard Types
export interface DashboardMetrics {
  totalAssets: number;
  assetAllocation: {
    [key: string]: number;
  };
  performanceMetrics: {
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  };
}
