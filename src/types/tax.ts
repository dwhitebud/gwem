export interface TaxEntity {
  id: string;
  name: string;
  type: 'personal' | 'business' | 'trust';
}

export interface TaxProjection {
  year: number;
  projectedTax: number;
  potentialSavings: number;
}
