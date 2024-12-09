'use client';

import React, { useState, useEffect } from 'react';
import EntityGraph from '@/components/EntityGraph';
import { Entity, EntityRelationship } from '@/types/entities';

export default function TrustAndCorporatePage() {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [relationships, setRelationships] = useState<EntityRelationship[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);

  // TODO: Replace with actual API calls
  useEffect(() => {
    // Mock data for demonstration
    const mockEntities: Entity[] = [
      {
        id: '1',
        name: 'Family Trust',
        type: 'trust',
        dateEstablished: '2020-01-01',
        assets: [],
        parentEntities: [],
        childEntities: ['2', '3'],
        ownership: []
      },
      {
        id: '2',
        name: 'Real Estate LLC',
        type: 'llc',
        dateEstablished: '2020-02-01',
        assets: [],
        parentEntities: ['1'],
        childEntities: [],
        ownership: [{ entityId: '1', percentage: 100 }]
      },
      {
        id: '3',
        name: 'Investment Corp',
        type: 'corporation',
        dateEstablished: '2020-03-01',
        assets: [],
        parentEntities: ['1'],
        childEntities: [],
        ownership: [{ entityId: '1', percentage: 100 }]
      }
    ];

    const mockRelationships: EntityRelationship[] = [
      {
        sourceId: '1',
        targetId: '2',
        type: 'owns',
        percentage: 100
      },
      {
        sourceId: '1',
        targetId: '3',
        type: 'owns',
        percentage: 100
      }
    ];

    setEntities(mockEntities);
    setRelationships(mockRelationships);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1280px]">
      <h1 className="text-[#025584] text-3xl font-bold mb-8">Trust & Corporate Assets</h1>
      
      {/* Entity Visualization */}
      <div className="mb-8 h-[600px]">
        <h2 className="text-[#025584] text-2xl font-semibold mb-4">Entity Relationships</h2>
        <EntityGraph entities={entities} relationships={relationships} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Entity List */}
        <section className="bg-white p-6 rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
          <h2 className="text-[#025584] text-2xl font-semibold mb-4">Entities</h2>
          <div className="space-y-4">
            {entities.map(entity => (
              <div 
                key={entity.id}
                className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                onClick={() => setSelectedEntity(entity)}
              >
                <h3 className="text-[#025584] font-medium">{entity.name}</h3>
                <p className="text-[#025584CC] text-sm">Type: {entity.type}</p>
                <p className="text-[#025584CC] text-sm">Established: {new Date(entity.dateEstablished).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Entity Details */}
        <section className="bg-white p-6 rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
          <h2 className="text-[#025584] text-2xl font-semibold mb-4">Entity Details</h2>
          {selectedEntity ? (
            <div>
              <h3 className="text-[#025584] text-xl mb-2">{selectedEntity.name}</h3>
              <div className="space-y-2">
                <p className="text-[#025584CC]"><strong>Type:</strong> {selectedEntity.type}</p>
                <p className="text-[#025584CC]"><strong>Date Established:</strong> {new Date(selectedEntity.dateEstablished).toLocaleDateString()}</p>
                <p className="text-[#025584CC]"><strong>Ownership:</strong></p>
                <ul className="list-disc pl-5">
                  {selectedEntity.ownership.map(owner => (
                    <li key={owner.entityId} className="text-[#025584CC]">
                      {entities.find(e => e.id === owner.entityId)?.name} ({owner.percentage}%)
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-[#025584CC]">Select an entity to view details</p>
          )}
        </section>
      </div>
    </div>
  );
}
