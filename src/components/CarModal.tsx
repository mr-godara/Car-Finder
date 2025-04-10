import React from 'react';
import { X } from 'lucide-react';
import { Car } from '../types/car';

interface CarModalProps {
  car: Car | null;
  onClose: () => void;
}

export function CarModal({ car, onClose }: CarModalProps) {
  if (!car) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full animate-fade-in overflow-hidden">
        <div className="relative">
          <img
            src={car.imageUrl}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/30 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        
        <div className="p-6">
          <h2 className="text-3xl font-bold dark:text-white mb-4">
            {car.brand} {car.model}
          </h2>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="space-y-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
              <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                ₹ {car.price.toLocaleString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">Year</p>
              <p className="text-2xl font-semibold dark:text-white">{car.year}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">Fuel Type</p>
              <p className="text-2xl font-semibold dark:text-white">{car.fuelType}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">Seating</p>
              <p className="text-2xl font-semibold dark:text-white">{car.seating} seats</p>
            </div>
          </div>
          
          <div className="border-t dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold dark:text-white mb-2">Description</h3>
            <p className="text-gray-600 dark:text-gray-300">{car.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}