
import React from 'react';
import { PlotData } from '../types';
import { format } from 'date-fns';

interface PlotInfoCardProps {
  plot: PlotData | null;
}

const PlotInfoCard: React.FC<PlotInfoCardProps> = ({ plot }) => {
  if (!plot) return null;
  
  return (
    <div className="absolute right-4 bottom-4 md:right-8 md:bottom-8 bg-white p-4 rounded-lg shadow-lg border w-64">
      <h3 className="text-lg font-semibold mb-2">Plot {plot.id}</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Block:</span>
          <span className="font-medium">{plot.block}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Plot Number:</span>
          <span className="font-medium">{plot.number}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Size:</span>
          <span className="font-medium">{plot.size} sq. yd</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Status:</span>
          <span className={`font-medium ${plot.status === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
            {plot.status}
          </span>
        </div>
        
        {plot.status === 'Booked' && plot.bookingInfo && (
          <>
            <div className="pt-2 border-t border-gray-200 mt-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Booked By:</span>
                <span className="font-medium">{plot.bookingInfo.bookedBy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Booked On:</span>
                <span className="font-medium">
                  {format(new Date(plot.bookingInfo.bookedAt), 'MMM d, yyyy')}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlotInfoCard;
