
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
                 border transition-all duration-200 cursor-pointer
                 ${isAvailable ? 'bg-[#F2FCE2] hover:bg-[#D8F2C0]' : 'bg-gray-300 hover:bg-gray-400'}
                 rounded-md m-1`}
      onClick={() => onClick(plot)}
    >
      <span className="text-xs md:text-sm font-medium">
        {plot.number}
      </span>
    </div>
  );
};

export default Plot;
