const mongoose = require('mongoose');

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

let isConnected = false;

const connectDB = async () => {
  if (!isConnected && MONGO_URI) {
    try {
      await mongoose.connect(MONGO_URI);
      isConnected = true;
      console.log('✅ MongoDB Connected');
    } catch (error) {
      console.error('❌ MongoDB Connection Error:', error);
      return false;
    }
  }
  return isConnected;
};

// Vehicle Schema
const VehicleSchema = new mongoose.Schema({
  id: String,
  name: String,
  category: String,
  pricePerDay: Number,
  image: String,
  description: String,
  features: [String],
  specs: {
    engine: String,
    power: String,
    mileage: String,
    fuelCapacity: String,
  },
  available: { type: Boolean, default: true },
  riderPricePerDay: Number,
  createdAt: { type: Date, default: Date.now },
});

const Vehicle = mongoose.model('Vehicle', VehicleSchema);

exports.handler = async (event, context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };
  
  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }
  
  try {
    const dbConnected = await connectDB();
    
    // Handle GET request - Get all vehicles
    if (event.httpMethod === 'GET') {
      if (!dbConnected) {
        // Return sample vehicle data if MongoDB not connected
        console.log('📝 Returning sample vehicles (no MongoDB connection)');
        const sampleVehicles = [
          {
            id: 'scooty-001',
            name: 'Honda Activa 6G',
            category: 'scooter',
            pricePerDay: 380,
            image: 'https://images.unsplash.com/photo-1589216532372-1c2a367900d9?w=800&auto=format&fit=crop',
            description: 'Premium scooter with elegant design and refined performance.',
            features: ['LED Headlamp', 'Digital Instrument Cluster', 'External Fuel Cap', 'Large Under-seat Storage'],
            specs: {
              engine: '124 cc',
              power: '8.8 PS',
              mileage: '55 kmpl',
              fuelCapacity: '5.3 L'
            },
            available: true,
            riderPricePerDay: 450,
            createdAt: new Date('2024-03-15T10:30:00Z')
          },
          {
            id: 'bike-001',
            name: 'Royal Enfield Classic 350',
            category: 'bike',
            pricePerDay: 760,
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
            description: 'Classic motorcycle with timeless design and powerful performance.',
            features: ['Classic Design', 'ABS', 'USB Charging', 'Digital Console'],
            specs: {
              engine: '349 cc',
              power: '20.2 PS',
              mileage: '35 kmpl',
              fuelCapacity: '13 L'
            },
            available: true,
            riderPricePerDay: 900,
            createdAt: new Date('2024-03-15T11:00:00Z')
          },
          {
            id: 'scooty-002',
            name: 'TVS Jupiter',
            category: 'scooter',
            pricePerDay: 320,
            image: 'https://images.unsplash.com/photo-1606276580517-3b6b4f3a0a1d?w=800&auto=format&fit=crop',
            description: 'Comfortable and fuel-efficient scooter for daily commuting.',
            features: ['EcoThrust Fuel Injection', 'LED Lights', 'Mobile Charging Port', 'External Fuel Fill'],
            specs: {
              engine: '109.7 cc',
              power: '7.9 PS',
              mileage: '64 kmpl',
              fuelCapacity: '6 L'
            },
            available: false,
            riderPricePerDay: 380,
            createdAt: new Date('2024-03-15T11:30:00Z')
          }
        ];
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(sampleVehicles, null, 2),
        };
      }
      
      // Get real vehicles from MongoDB
      console.log('🔍 Fetching real vehicles from MongoDB');
      const vehicles = await Vehicle.find().lean();
      console.log(`✅ Found ${vehicles.length} vehicles in database`);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(vehicles, null, 2),
      };
    }
    
    // Handle POST request - Create new vehicle
    if (event.httpMethod === 'POST') {
      const vehicleData = JSON.parse(event.body);
      
      if (!dbConnected) {
        // Return mock response if MongoDB not connected
        console.log('📝 Creating vehicle (mock - no MongoDB)');
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            ...vehicleData,
            id: vehicleData.id || `vehicle_${Date.now()}`,
            createdAt: new Date().toISOString(),
            available: vehicleData.available !== undefined ? vehicleData.available : true
          }, null, 2),
        };
      }
      
      // Create vehicle in MongoDB
      const vehicle = new Vehicle({
        ...vehicleData,
        createdAt: new Date(),
      });
      
      await vehicle.save();
      console.log('✅ Vehicle created in MongoDB:', vehicle.id);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(vehicle.toObject(), null, 2),
      };
    }
    
    // Handle PUT request - Update vehicle
    if (event.httpMethod === 'PUT') {
      const vehicleData = JSON.parse(event.body);
      
      if (!dbConnected) {
        // Return mock response if MongoDB not connected
        console.log('📝 Updating vehicle (mock - no MongoDB)');
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            ...vehicleData,
            updatedAt: new Date().toISOString()
          }, null, 2),
        };
      }
      
      // Update vehicle in MongoDB
      const vehicle = await Vehicle.findOneAndUpdate(
        { id: vehicleData.id },
        vehicleData,
        { new: true, upsert: false }
      );
      
      if (!vehicle) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Vehicle not found' }),
        };
      }
      
      console.log('✅ Vehicle updated in MongoDB:', vehicle.id);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(vehicle.toObject(), null, 2),
      };
    }
    
    // Handle DELETE request - Delete vehicle
    if (event.httpMethod === 'DELETE') {
      const vehicleId = event.pathParameters?.vehicleId || 
                       event.path?.split('/').pop();
      
      if (!dbConnected) {
        // Return mock response if MongoDB not connected
        console.log('📝 Deleting vehicle (mock - no MongoDB)');
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ 
            message: 'Vehicle deleted successfully (mock)',
            id: vehicleId
          }, null, 2),
        };
      }
      
      // Delete vehicle from MongoDB
      const result = await Vehicle.deleteOne({ id: vehicleId });
      
      if (result.deletedCount === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Vehicle not found' }),
        };
      }
      
      console.log('✅ Vehicle deleted from MongoDB:', vehicleId);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          message: 'Vehicle deleted successfully',
          id: vehicleId
        }, null, 2),
      };
    }
    
    // Handle unsupported methods
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  } catch (error) {
    console.error('❌ Error in vehicles function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error.message,
        stack: error.stack 
      }),
    };
  }
};
