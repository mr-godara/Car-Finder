import React from 'react';
import { X } from 'lucide-react';
import { Car } from '../types/car';

interface WishlistPanelProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Car[];
  onRemove: (car: Car) => void;
  onViewDetails: (car: Car) => void;
}

export function WishlistPanel({
  isOpen,
  onClose,
  wishlist,
  onRemove,
  onViewDetails,
}: WishlistPanelProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
      
      {/* Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold dark:text-white">Wishlist</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-6 h-6 dark:text-white" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {wishlist.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Your wishlist is empty
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlist.map((car) => (
                  <div
                    key={car.id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 animate-fade-in"
                  >
                    <div className="flex gap-4">
                      <img
                        src={car.imageUrl}
                        alt={`${car.brand} ${car.model}`}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold dark:text-white">
                              {car.brand} {car.model}
                            </h3>
                            <p className="text-blue-600 dark:text-blue-400 font-medium">
                              ₹{car.price.toLocaleString()}
                            </p>
                          </div>
                          <button
                            onClick={() => onRemove(car)}
                            className="text-red-500 hover:text-red-600 p-1"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <button
                          onClick={() => onViewDetails(car)}
                          className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
