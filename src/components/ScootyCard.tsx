import type { VehicleData } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Fuel, Gauge } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { BookingDialog } from './BookingDialog';
import { useState } from 'react';

interface ScootyCardProps {
  scooty: VehicleData;
}

export function ScootyCard({ scooty }: ScootyCardProps) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const isRider = user?.isRider || false;
  const displayPrice = isRider && scooty.riderPricePerDay 
    ? scooty.riderPricePerDay 
    : scooty.pricePerDay;

  const handleBookClick = () => {
    if (isAuthenticated) {
      setIsBookingOpen(true);
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-1 bg-white border-4 border-black transform hover:scale-105 animate-fadeInUp">
        <CardHeader className="p-0">
          <div className="relative">
            <img
              src={scooty.image}
              alt={scooty.name}
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute top-2 right-2">
              <Badge className="bg-blue-600 text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black">
                {isRider && scooty.riderPricePerDay ? (
                  <span>
                    <span className="line-through text-blue-200 text-xs">₹{scooty.pricePerDay}</span>
                    <span className="text-yellow-300 ml-1">₹{scooty.riderPricePerDay}/day</span>
                  </span>
                ) : (
                  `₹${scooty.pricePerDay}/day`
                )}
              </Badge>
            </div>
            {isRider && (
              <div className="absolute top-2 left-2">
                <Badge className="bg-green-500 text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black animate-pulse">RIDER PRICE</Badge>
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-4">
          <CardTitle className="text-lg mb-2 font-black text-black transition-colors duration-300 hover:text-blue-600">{scooty.name}</CardTitle>
          <p className="text-black font-bold text-sm mb-4 bg-blue-100 p-2 border-2 border-black">
            {scooty.description}
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm bg-blue-200 p-2 border-2 border-black">
              <div className="w-8 h-8 bg-blue-600 border-2 border-black flex items-center justify-center">
                <Gauge className="h-4 w-4 text-white" />
              </div>
              <span className="font-black text-black">{scooty.specs.engine}</span>
            </div>
            <div className="flex items-center gap-2 text-sm bg-blue-200 p-2 border-2 border-black">
              <div className="w-8 h-8 bg-blue-600 border-2 border-black flex items-center justify-center">
                <Fuel className="h-4 w-4 text-white" />
              </div>
              <span className="font-black text-black">{scooty.specs.mileage}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-black text-blue-600">
                ₹{displayPrice}
              </span>
              {isRider && scooty.riderPricePerDay && (
                <span className="text-xs text-green-600 font-black bg-green-100 px-2 py-1 border-2 border-black inline-block">RIDER DISCOUNT!</span>
              )}
            </div>
            <Badge className={`${scooty.available ? 'bg-blue-300 text-black' : 'bg-red-100 text-red-600'} border-4 border-black font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
              {scooty.available ? 'AVAILABLE' : 'UNAVAILABLE'}
            </Badge>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button 
            onClick={handleBookClick}
            disabled={!scooty.available}
            className={`w-full font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-300 transform hover:scale-105 uppercase ${
              scooty.available 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
          >
            {scooty.available ? 'BOOK NOW' : 'UNAVAILABLE'}
          </Button>
        </CardFooter>
      </Card>
      
      <BookingDialog 
        bike={{...scooty, pricePerDay: displayPrice}} 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </>
  );
}
