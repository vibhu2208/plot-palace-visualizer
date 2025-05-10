
import React from 'react';
import { PlotData } from '../types';
import { CheckCircle2, XCircle } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { format } from 'date-fns';

interface PlotProps {
  plot: PlotData;
  onClick: (plot: PlotData) => void;
}

const Plot: React.FC<PlotProps> = ({ plot, onClick }) => {
  const isAvailable = plot.status === 'Available';
  
  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div 
          className={`w-14 h-14 md:w-16 md:h-16 flex flex-col items-center justify-center 
                     border-2 transition-all duration-300 cursor-pointer relative plot-hover
                     ${isAvailable 
                       ? 'bg-gradient-to-br from-[#E7F5ED] to-[#D3F3E1] hover:from-[#D3F3E1] hover:to-[#B3E9C7] border-[#A0D8B3]' 
                       : 'bg-gradient-to-br from-[#FFE5E5] to-[#FFC5C5] hover:from-[#FFC5C5] hover:to-[#FFA9A9] border-[#FF9B9B]'}
                     rounded-xl m-1.5 shadow-sm`}
          onClick={() => onClick(plot)}
          title={plot.bookingInfo ? `Booked by ${plot.bookingInfo.bookedBy}` : undefined}
        >
          <span className="text-base md:text-lg font-semibold">
            {plot.number}
          </span>
          
          <span className="text-xs mt-0.5">
            {plot.size} sq. yd
          </span>
          
          <div className="absolute -top-1.5 -right-1.5">
            {isAvailable ? (
              <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-green-500 bg-white rounded-full" />
            ) : (
              <XCircle className="h-4 w-4 md:h-5 md:w-5 text-red-500 bg-white rounded-full" />
            )}
          </div>
          
          {!isAvailable && plot.bookingInfo && (
            <div className="absolute -bottom-1 left-0 right-0 bg-red-400 rounded-b-xl h-4 overflow-hidden flex items-center justify-center">
              <span className="text-[8px] text-white px-1 truncate block font-medium">
                {plot.bookingInfo.bookedBy}
              </span>
            </div>
          )}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-64 p-0 glassmorphism border border-gray-200">
        <div className="p-4">
          <h4 className="text-sm font-semibold mb-2">Plot {plot.number}</h4>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Block:</span>
              <span className="font-medium">{plot.block}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Size:</span>
              <span className="font-medium">{plot.size} sq. yd</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status:</span>
              <span className={`font-medium ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                {plot.status}
              </span>
            </div>
            
            {!isAvailable && plot.bookingInfo && (
              <div className="pt-1 border-t border-gray-100 mt-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Booked By:</span>
                  <span className="font-medium">{plot.bookingInfo.bookedBy}</span>
                </div>
                {plot.bookingInfo.bookedAt && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date:</span>
                    <span className="font-medium">
                      {format(new Date(plot.bookingInfo.bookedAt), 'MMM d, yyyy')}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Plot;
