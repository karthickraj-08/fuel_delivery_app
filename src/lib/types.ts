
export type UserRole = 'admin' | 'station' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  address?: string;
}

export interface GasStation {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  inventory: {
    petrol: number;
    diesel: number;
  };
  prices: {
    petrol: number;
    diesel: number;
  };
  managerId: string;
}

export type FuelType = 'petrol' | 'diesel';

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'processing' 
  | 'delivering' 
  | 'delivered'
  | 'cancelled';

export interface Order {
  id: string;
  userId: string;
  stationId: string;
  fuelType: FuelType;
  quantity: number;
  totalPrice: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}
