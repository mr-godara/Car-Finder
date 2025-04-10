export interface Car {
  id: string;
  brand: string;
  model: string;
  price: number;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  seating: number;
  year: number;
  mileage: number;
  imageUrl: string;
  description: string;
}

export interface Filters {
  brand: string;
  minPrice: number;
  maxPrice: number;
  fuelType: string;
  seating: number;
}