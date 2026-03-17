export interface Scooty {
  id: string;
  name: string;
  category: 'scooter';
  pricePerDay: number;
  image: string;
  description: string;
  features: string[];
  specs: {
    engine: string;
    power: string;
    mileage: string;
    fuelCapacity: string;
  };
  available: boolean;
}

export interface Bike {
  id: string;
  name: string;
  category: 'scooter' | 'motorcycle' | 'sports' | 'cruiser';
  pricePerDay: number;
  image: string;
  description: string;
  features: string[];
  specs: {
    engine: string;
    power: string;
    mileage: string;
    fuelCapacity: string;
  };
  available: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  bikeId: string;
  bike: Bike;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentMethod?: string;
  createdAt: Date;
}
