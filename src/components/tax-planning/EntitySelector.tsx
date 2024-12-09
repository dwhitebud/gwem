'use client';

import { TaxEntity } from '../../types/tax';

interface EntitySelectorProps {
  selectedEntities: TaxEntity[];
  onEntityChange: (entities: TaxEntity[]) => void;
}

export default function EntitySelector({ selectedEntities, onEntityChange }: EntitySelectorProps) {
  const entityTypes = [
    { id: 'personal', name: 'Personal Account', type: 'personal' },
    { id: 'business', name: 'Business Entity', type: 'business' },
    { id: 'trust', name: 'Trust', type: 'trust' },
  ];

  const toggleEntity = (entity: TaxEntity) => {
    const isSelected = selectedEntities.some(e => e.id === entity.id);
    if (isSelected) {
      onEntityChange(selectedEntities.filter(e => e.id !== entity.id));
    } else {
      onEntityChange([...selectedEntities, entity]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Select Entities</h3>
      <div className="space-y-3">
        {entityTypes.map((entity) => (
          <div key={entity.id} className="flex items-center">
            <input
              type="checkbox"
              id={entity.id}
              checked={selectedEntities.some(e => e.id === entity.id)}
              onChange={() => toggleEntity(entity as TaxEntity)}
              className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
            />
            <label htmlFor={entity.id} className="ml-3 text-sm font-medium text-gray-700">
              {entity.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
