
import React, { useState, useEffect, useMemo } from 'react';
import { BlockId, PlotData, PlotBooking } from '../types';
import Plot from './Plot';
import PlotInfoCard from './PlotInfoCard';
import BookingModal from './BookingModal';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast';

interface PlotGridProps {
  plots: PlotData[];
  selectedBlock: BlockId | 'All';
}

const PlotGrid: React.FC<PlotGridProps> = ({ plots: initialPlots, selectedBlock }) => {
  const [plots, setPlots] = useState<PlotData[]>(initialPlots);
  const [selectedPlot, setSelectedPlot] = useState<PlotData | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const filteredPlots = useMemo(() => {
    if (selectedBlock === 'All') {
      return plots;
    }
    return plots.filter(plot => plot.block === selectedBlock);
  }, [plots, selectedBlock]);
  
  const blockGroups = useMemo(() => {
    const groups: Record<string, PlotData[]> = {};
    
    filteredPlots.forEach(plot => {
      if (!groups[plot.block]) {
        groups[plot.block] = [];
      }
      groups[plot.block].push(plot);
    });
    
    return groups;
  }, [filteredPlots]);
  
  useEffect(() => {
    fetchBookings();
    
    // Set up real-time subscription for new bookings
    const channel = supabase
      .channel('public:plot_bookings')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'plot_bookings' }, 
        () => {
          fetchBookings();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  
  const fetchBookings = async () => {
    setIsLoading(true);
    
    try {
      const { data: bookings, error } = await supabase
        .from('plot_bookings')
        .select('*');
        
      if (error) throw error;
      
      // Update plots with booking information
      const updatedPlots = initialPlots.map(plot => {
        const booking = bookings?.find(b => b.plot_id === plot.id);
        
        if (booking) {
          return {
            ...plot,
            status: 'Booked',
            bookingInfo: {
              bookedBy: booking.booked_by,
              bookedAt: booking.booked_at
            }
          };
        }
        
        return plot;
      });
      
      setPlots(updatedPlots);
    } catch (error: any) {
      toast({
        title: 'Error fetching bookings',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePlotClick = (plot: PlotData) => {
    setSelectedPlot(plot);
    
    if (plot.status === 'Available') {
      setIsBookingModalOpen(true);
    }
  };
  
  const handleBookingComplete = () => {
    fetchBookings();
  };
  
  const renderBlock = (blockId: BlockId, blockPlots: PlotData[]) => {
    // Calculate the number of plots per row based on the block
    const plotsPerRow = blockId === 'A' ? 10 : 12; 
    
    // Calculate the number of rows needed
    const numberOfRows = Math.ceil(blockPlots.length / plotsPerRow);
    
    // Create rows with plots
    const rows = [];
    for (let i = 0; i < numberOfRows; i++) {
      const rowPlots = blockPlots.slice(i * plotsPerRow, (i + 1) * plotsPerRow);
      rows.push(
        <div key={`${blockId}-row-${i}`} className="flex justify-center">
          {rowPlots.map(plot => (
            <Plot
              key={plot.id}
              plot={plot}
              onClick={handlePlotClick}
            />
          ))}
        </div>
      );
    }
    
    return (
      <div key={blockId} className="mb-8">
        <h2 className="text-xl font-bold mb-3 text-center">Block {blockId}</h2>
        <div className="flex flex-col items-center">
          {rows}
        </div>
      </div>
    );
  };
  
  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
          <p className="text-lg font-medium">Loading plots...</p>
        </div>
      )}
      <div className="overflow-x-auto pb-20">
        {Object.entries(blockGroups).map(([blockId, blockPlots]) => 
          renderBlock(blockId as BlockId, blockPlots)
        )}
      </div>
      {selectedPlot && !isBookingModalOpen && <PlotInfoCard plot={selectedPlot} />}
      <BookingModal 
        plot={selectedPlot}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onBookingComplete={handleBookingComplete}
      />
    </div>
  );
};

export default PlotGrid;
