
import React from 'react';
import { PlotData } from '../types';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin } from 'lucide-react';

interface PlotInfoCardProps {
  plot: PlotData | null;
}

const PlotInfoCard: React.FC<PlotInfoCardProps> = ({ plot }) => {
  if (!plot) return null;
  
  const isAvailable = plot.status === 'Available';
  
  return (
    <div className="absolute right-4 bottom-4 md:right-8 md:bottom-8 w-72 glassmorphism rounded-xl overflow-hidden shadow-lg border border-white/30 transition-all duration-300">
      <Card className="bg-transparent border-none shadow-none">
        <CardHeader className="pb-2 pt-4 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary" />
              <h3 className="text-lg font-semibold">Plot {plot.number}</h3>
            </div>
            <Badge variant={isAvailable ? "outline" : "destructive"} className={isAvailable ? "bg-green-50 text-green-700 hover:bg-green-100 border-green-200" : ""}>
              {plot.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-black/5 p-2 rounded-md">
                <p className="text-xs text-gray-500">Block</p>
                <p className="font-medium">{plot.block}</p>
              </div>
              <div className="bg-black/5 p-2 rounded-md">
                <p className="text-xs text-gray-500">Size</p>
                <p className="font-medium">{plot.size} sq. yd</p>
              </div>
            </div>
            
            {plot.status === 'Booked' && plot.bookingInfo && (
              <div className="border-t border-gray-200 pt-3 mt-2">
                <h4 className="text-sm font-medium mb-2">Booking Information</h4>
                <div className="bg-black/5 p-2 rounded-md mb-2">
                  <p className="text-xs text-gray-500">Booked By</p>
                  <p className="font-medium">{plot.bookingInfo.bookedBy}</p>
                </div>
                <div className="bg-black/5 p-2 rounded-md">
                  <p className="text-xs text-gray-500">Booking Date</p>
                  <p className="font-medium">
                    {format(new Date(plot.bookingInfo.bookedAt), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlotInfoCard;
