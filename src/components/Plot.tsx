
import React from 'react';
import { PlotData } from '../types';

interface PlotProps {
  plot: PlotData;
  onClick: (plot: PlotData) => void;
}

const Plot: React.FC<PlotProps> = ({ plot, onClick }) => {
  const isAvailable = plot.status === 'Available';
  
  return (
    <div 
      className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center 
                 border transition-all duration-200 cursor-pointer relative
                 ${isAvailable ? 'bg-[#F2FCE2] hover:bg-[#D8F2C0]' : 'bg-red-100 hover:bg-red-200 border-red-300'}
                 rounded-md m-1`}
      onClick={() => onClick(plot)}
      title={plot.bookingInfo ? `Booked by ${plot.bookingInfo.bookedBy}` : undefined}
    >
      <span className="text-xs md:text-sm font-medium">
        {plot.number}
      </span>
      
      {!isAvailable && plot.bookingInfo && (
        <div className="absolute -bottom-1 left-0 right-0 bg-red-500 rounded-b-md">
          <span className="text-[8px] text-white px-1 truncate block">
            {plot.bookingInfo.bookedBy}
          </span>
        </div>
      )}
    </div>
  );
};

export default Plot;
