export interface Asset {
  id: string;
  name: string;
  type: 'real_estate' | 'financial' | 'business' | 'other';
  value: number;
  description?: string;
  dateAcquired: string;
  documents?: string[];
}

export interface Entity {
  id: string;
  name: string;
  type: 'trust' | 'corporation' | 'llc' | 'partnership' | 'other';
  dateEstablished: string;
  description?: string;
  assets: Asset[];
  parentEntities: string[]; // IDs of entities that own this entity
  childEntities: string[]; // IDs of entities owned by this entity
  ownership: {
    entityId: string;
    percentage: number;
  }[];
  documents?: string[];
  metadata?: Record<string, any>;
}

export interface EntityRelationship {
  sourceId: string;
  targetId: string;
  type: 'owns' | 'manages' | 'benefits';
  percentage?: number;
  details?: string;
}
