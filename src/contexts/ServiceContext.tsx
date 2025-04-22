
import React, { createContext, useState, useContext } from 'react';
import { Order, FuelType, GasStation } from '@/lib/types';

// Mock data for demo
const MOCK_STATIONS: GasStation[] = [
  {
    id: 'gs1',
    name: 'City Fuel Station',
    location: {
      lat: 12.9716,
      lng: 77.5946,
      address: '123 Main Street, City Center',
    },
    inventory: {
      petrol: 5000,
      diesel: 3000,
    },
    prices: {
      petrol: 88.5,
      diesel: 80.2,
    },
    managerId: 'station-1',
  },
  {
    id: 'gs2',
    name: 'Highway Fuel Point',
    location: {
      lat: 12.9352,
      lng: 77.6245,
      address: '456 Highway Road, Suburb',
    },
    inventory: {
      petrol: 7000,
      diesel: 5000,
    },
    prices: {
      petrol: 87.9,
      diesel: 79.8,
    },
    managerId: 'station-2',
  },
];

const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    userId: 'user-1',
    stationId: 'gs1',
    fuelType: 'petrol',
    quantity: 15,
    totalPrice: 1327.5,
    location: {
      lat: 12.9716,
      lng: 77.5946,
      address: '123 User Address',
    },
    status: 'delivered',
    createdAt: new Date('2023-04-21T10:30:00'),
    updatedAt: new Date('2023-04-21T11:45:00'),
  },
];

interface ServiceContextType {
  stations: GasStation[];
  orders: Order[];
  placeOrder: (userId: string, stationId: string, fuelType: FuelType, quantity: number, location: { lat: number; lng: number; address: string }) => Promise<Order>;
  cancelOrder: (orderId: string) => Promise<boolean>;
  getOrdersByUserId: (userId: string) => Order[];
  getOrdersByStationId: (stationId: string) => Order[];
  getAllOrders: () => Order[];
  getStationById: (stationId: string) => GasStation | undefined;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider = ({ children }: { children: React.ReactNode }) => {
  const [stations, setStations] = useState<GasStation[]>(MOCK_STATIONS);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  const placeOrder = async (
    userId: string,
    stationId: string,
    fuelType: FuelType,
    quantity: number,
    location: { lat: number; lng: number; address: string }
  ): Promise<Order> => {
    const station = stations.find((s) => s.id === stationId);
    
    if (!station) {
      throw new Error('Station not found');
    }
    
    const totalPrice = station.prices[fuelType] * quantity;
    
    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      userId,
      stationId,
      fuelType,
      quantity,
      totalPrice,
      location,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setOrders([...orders, newOrder]);
    return newOrder;
  };

  const cancelOrder = async (orderId: string): Promise<boolean> => {
    const orderIndex = orders.findIndex((o) => o.id === orderId);
    
    if (orderIndex === -1) {
      return false;
    }
    
    const updatedOrders = [...orders];
    updatedOrders[orderIndex] = {
      ...updatedOrders[orderIndex],
      status: 'cancelled',
      updatedAt: new Date(),
    };
    
    setOrders(updatedOrders);
    return true;
  };

  const getOrdersByUserId = (userId: string): Order[] => {
    return orders.filter((o) => o.userId === userId);
  };

  const getOrdersByStationId = (stationId: string): Order[] => {
    return orders.filter((o) => o.stationId === stationId);
  };

  const getAllOrders = (): Order[] => {
    return orders;
  };

  const getStationById = (stationId: string): GasStation | undefined => {
    return stations.find((s) => s.id === stationId);
  };

  return (
    <ServiceContext.Provider
      value={{
        stations,
        orders,
        placeOrder,
        cancelOrder,
        getOrdersByUserId,
        getOrdersByStationId,
        getAllOrders,
        getStationById,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  const context = useContext(ServiceContext);
  
  if (context === undefined) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  
  return context;
};
