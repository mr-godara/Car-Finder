import React from 'react';
import { X } from 'lucide-react';
import { Filters } from '../types/car';

interface FiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  brands: string[];
  onClose: () => void;
}

export function FiltersPanel({ filters, onFilterChange, brands, onClose }: FiltersProps) {
  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Brand
          </label>
          <select
            value={filters.brand}
            onChange={(e) => onFilterChange({ ...filters, brand: e.target.value })}
            className="input-primary"
          >
            <option value="">All Brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Price Range
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              value={filters.minPrice || ''}
              onChange={(e) =>
                onFilterChange({ ...filters, minPrice: Number(e.target.value) })
              }
              placeholder="Min"
              className="input-primary"
            />
            <input
              type="number"
              value={filters.maxPrice || ''}
              onChange={(e) =>
                onFilterChange({ ...filters, maxPrice: Number(e.target.value) })
              }
              placeholder="Max"
              className="input-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Fuel Type
          </label>
          <select
            value={filters.fuelType}
            onChange={(e) => onFilterChange({ ...filters, fuelType: e.target.value })}
            className="input-primary"
          >
            <option value="">All Types</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Seating
          </label>
          <select
            value={filters.seating || ''}
            onChange={(e) =>
              onFilterChange({ ...filters, seating: Number(e.target.value) })
            }
            className="input-primary"
          >
            <option value="">Any</option>
            <option value="2">2 seats</option>
            <option value="4">4 seats</option>
            <option value="5">5 seats</option>
            <option value="7">7 seats</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={() => {
            onFilterChange({
              brand: '',
              minPrice: 0,
              maxPrice: 0,
              fuelType: '',
              seating: 0,
            });
            onClose();
          }}
          className="btn-secondary mr-3"
        >
          Reset Filters
        </button>
        <button onClick={onClose} className="btn-primary">
          Apply Filters
        </button>
      </div>

      <button
        onClick={onClose}
        className="absolute -top-2 -right-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
      >
        <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </button>
    </div>
  );
}