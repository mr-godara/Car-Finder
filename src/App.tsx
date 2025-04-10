import React, { useState, useMemo, useEffect } from 'react';
import { Sun, Moon, Heart, Search, ChevronDown, Filter } from 'lucide-react';
import { Car, Filters } from './types/car';
import { cars } from './data/cars';
import { CarCard } from './components/CarCard';
import { CarModal } from './components/CarModal';
import { FiltersPanel } from './components/Filters';
import { SearchBar } from './components/SearchBar';
import { WishlistPanel } from './components/WishlistPanel';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', false);
  
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Wishlist state
  const [wishlist, setWishlist] = useLocalStorage<Car[]>('wishlist', []);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // UI state
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    brand: '',
    minPrice: 0,
    maxPrice: 0,
    fuelType: '',
    seating: 0,
  });
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Derive unique brands for filter dropdown
  const brands = useMemo(() => {
    return Array.from(new Set(cars.map((car) => car.brand))).sort();
  }, []);

  // Filter and sort cars
  const filteredCars = useMemo(() => {
    return cars
      .filter((car) => {
        if (
          searchQuery &&
          !`${car.brand} ${car.model}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        ) {
          return false;
        }
        if (filters.brand && car.brand !== filters.brand) return false;
        if (filters.minPrice && car.price < filters.minPrice) return false;
        if (filters.maxPrice && car.price > filters.maxPrice) return false;
        if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
        if (filters.seating && car.seating !== filters.seating) return false;
        return true;
      })
      .sort((a, b) =>
        sortOrder === 'asc' ? a.price - b.price : b.price - a.price
      );
  }, [filters, sortOrder, searchQuery]);

  // Pagination
  const carsPerPage = 10; // Changed from 9 to 10
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * carsPerPage,
    currentPage * carsPerPage
  );

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchQuery, sortOrder]);

  // Wishlist handlers
  const toggleWishlist = (car: Car) => {
    setWishlist((prev) =>
      prev.some((c) => c.id === car.id)
        ? prev.filter((c) => c.id !== car.id)
        : [...prev, car]
    );
  };

  // Theme handler
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Car Finder</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
            >
              <Filter className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              {Object.values(filters).some(value => value !== '' && value !== 0) && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  ●
                </span>
              )}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isDarkMode ? (
                <Sun className="w-6 h-6 text-yellow-500" />
              ) : (
                <Moon className="w-6 h-6 text-gray-600" />
              )}
            </button>
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative"
            >
              <Heart className={`w-6 h-6 ${wishlist.length > 0 ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Filters Panel - Absolute positioned below header */}
      {showFilters && (
        <div className="fixed top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-20 animate-slide-down">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <FiltersPanel
              filters={filters}
              onFilterChange={setFilters}
              brands={brands}
              onClose={() => setShowFilters(false)}
            />
          </div>
        </div>
      )}

      {/* Hero Section - Adjusted margin for fixed header */}
      <div className="hero-pattern h-[500px] relative flex items-center justify-center mt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 animate-fade-in">
            Find Your Perfect Ride
          </h1>
          <div className="max-w-2xl mx-auto">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {paginatedCars.length} of {filteredCars.length} cars
          </p>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="input-primary max-w-[200px]"
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-6">
          {paginatedCars.map((car, index) => (
            <div
              key={car.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CarCard
                car={car}
                isWishlisted={wishlist.some((c) => c.id === car.id)}
                onWishlist={toggleWishlist}
                onClick={setSelectedCar}
              />
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-2">
            {/* Previous Page Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Page Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Car Details Modal */}
      <CarModal car={selectedCar} onClose={() => setSelectedCar(null)} />

      {/* Wishlist Panel */}
      <WishlistPanel
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemove={toggleWishlist}
        onViewDetails={(car) => {
          setSelectedCar(car);
          setIsWishlistOpen(false);
        }}
      />
    </div>
  );
}

export default App;