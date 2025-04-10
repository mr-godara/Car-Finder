import React from 'react';
import { Heart } from 'lucide-react';
import { Car } from '../types/car';

interface CarCardProps {
  car: Car;
  isWishlisted: boolean;
  onWishlist: (car: Car) => void;
  onClick: (car: Car) => void;
}

export function CarCard({ car, isWishlisted, onWishlist, onClick }: CarCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg card-hover">
      <div className="relative">
        <img
          src={car.imageUrl}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onWishlist(car);
          }}
          className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
        >
          <Heart
            className={`w-6 h-6 ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-white'
            }`}
          />
        </button>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold dark:text-white mb-2">
            {car.brand} {car.model}
          </h3>
          <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
            ₹{car.price.toLocaleString()}
          </p>
        </div>
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
            <span>Fuel Type</span>
            <span className="font-medium">{car.fuelType}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
            <span>Seating</span>
            <span className="font-medium">{car.seating} seats</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
            <span>Year</span>
            <span className="font-medium">{car.year}</span>
          </div>
        </div>
        <button
          onClick={() => onClick(car)}
          className="w-full btn-primary"
        >
          View Details
        </button>
      </div>
    </div>
  );
}