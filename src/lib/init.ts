// Initialize localStorage with default data if empty
export function initializeLocalStorage() {
  try {
    console.log('Initializing localStorage...');
    
    // Check if scootys exist, if not create default ones
    const existingScootys = localStorage.getItem('sunride_scootys');
    if (!existingScootys) {
      console.log('Creating default scootys...');
      const defaultScootys = [
        {
          id: Math.random().toString(36).substr(2, 9),
          name: 'Honda Activa 6G',
          category: 'scooter',
          pricePerDay: 350,
          image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop',
          description: 'India\'s most trusted scooter with reliable performance and excellent fuel efficiency.',
          features: ['ESP Technology', 'Silent Start', 'External Fuel Filling', 'Telescopic Suspension'],
          specs: {
            engine: '109.51 cc',
            power: '7.79 PS',
            mileage: '45 km/l',
            fuelCapacity: '5.3 L',
          },
          available: true,
        },
        {
          id: Math.random().toString(36).substr(2, 9),
          name: 'Suzuki Access 125',
          category: 'scooter',
          pricePerDay: 380,
          image: 'https://images.unsplash.com/photo-1589216532372-1c2a367900d9?w=800&auto=format&fit=crop',
          description: 'Premium scooter with elegant design and refined performance.',
          features: ['LED Headlamp', 'Digital Instrument Cluster', 'External Fuel Cap', 'Large Under-seat Storage'],
          specs: {
            engine: '124 cc',
            power: '8.7 PS',
            mileage: '48 km/l',
            fuelCapacity: '5 L',
          },
          available: true,
        },
        {
          id: Math.random().toString(36).substr(2, 9),
          name: 'TVS Jupiter',
          category: 'scooter',
          pricePerDay: 360,
          image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop',
          description: 'Comfortable and feature-rich scooter for daily commuting.',
          features: ['iTouch Start', 'Eco Throttle', 'External Fuel Filling', 'LED Headlamp'],
          specs: {
            engine: '109.7 cc',
            power: '7.88 PS',
            mileage: '50 km/l',
            fuelCapacity: '6 L',
          },
          available: true,
        },
        {
          id: Math.random().toString(36).substr(2, 9),
          name: 'Hero Maestro Edge',
          category: 'scooter',
          pricePerDay: 340,
          image: 'https://images.unsplash.com/photo-1589216532372-1c2a367900d9?w=800&auto=format&fit=crop',
          description: 'Stylish scooter with advanced features and smooth performance.',
          features: ['BS6 Engine', 'Mobile Charging', 'LED DRLs', 'Side Stand Indicator'],
          specs: {
            engine: '110.9 cc',
            power: '8.05 PS',
            mileage: '47 km/l',
            fuelCapacity: '5 L',
          },
          available: true,
        },
        {
          id: Math.random().toString(36).substr(2, 9),
          name: 'Honda Dio',
          category: 'scooter',
          pricePerDay: 370,
          image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop',
          description: 'Sporty and stylish scooter for the young generation.',
          features: ['LED Headlamp', 'Digital Meter', 'External Fuel Filling', 'Telescopic Suspension'],
          specs: {
            engine: '109.51 cc',
            power: '7.79 PS',
            mileage: '48 km/l',
            fuelCapacity: '5.3 L',
          },
          available: true,
        },
      ];

      localStorage.setItem('sunride_scootys', JSON.stringify(defaultScootys));
      console.log('Default scootys created successfully');
    }

    // Initialize empty bookings array if it doesn't exist
    const existingBookings = localStorage.getItem('sunride_bookings');
    if (!existingBookings) {
      localStorage.setItem('sunride_bookings', JSON.stringify([]));
    }

    console.log('localStorage initialization completed');
  } catch (error) {
    console.error('Error initializing localStorage:', error);
  }
}

// Initialize localStorage when the app starts
initializeLocalStorage();
