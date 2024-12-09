'use client';

import { useState } from 'react';
import TaxProjections from '../../components/tax-planning/TaxProjections';
import EntitySelector from '../../components/tax-planning/EntitySelector';
import { TaxEntity } from '../../types/tax';

export default function TaxPlanningPage() {
  const [selectedEntities, setSelectedEntities] = useState<TaxEntity[]>([]);
  const [projectionYears, setProjectionYears] = useState<number>(5);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Tax Planning</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left sidebar for entity selection */}
        <div className="lg:col-span-3">
          <EntitySelector 
            selectedEntities={selectedEntities}
            onEntityChange={setSelectedEntities}
          />
        </div>

        {/* Main content area */}
        <div className="lg:col-span-9">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Multi-Year Tax Projections</h2>
              <select
                value={projectionYears}
                onChange={(e) => setProjectionYears(Number(e.target.value))}
                className="rounded-md border border-gray-300 px-3 py-2"
              >
                <option value={3}>3 Years</option>
                <option value={5}>5 Years</option>
                <option value={10}>10 Years</option>
              </select>
            </div>
            
            <TaxProjections 
              entities={selectedEntities}
              years={projectionYears}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
