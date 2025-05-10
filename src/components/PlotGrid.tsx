
import React, { useState, useEffect, useMemo } from 'react';
import { BlockId, PlotData, PlotBooking } from '../types';
import Plot from './Plot';
import PlotInfoCard from './PlotInfoCard';
import BookingModal from './BookingModal';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast';
import { Loader2, MapPin, AlertCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';

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
            status: 'Booked' as const, // Explicitly type as 'Booked' literal
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
        <div key={`${blockId}-row-${i}`} className="flex justify-center flex-wrap">
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
      <Card key={blockId} className="mb-8 overflow-hidden shadow-md border-gray-200 glassmorphism">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold flex items-center justify-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span>Block {blockId}</span>
          </h2>
        </div>
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            {rows}
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 glassmorphism flex items-center justify-center z-10 rounded-lg">
          <div className="bg-white p-4 rounded-xl shadow-lg flex items-center gap-3">
            <Loader2 className="h-6 w-6 text-primary animate-spin" />
            <p className="text-lg font-medium">Loading plots...</p>
          </div>
        </div>
      )}
      
      {filteredPlots.length === 0 && !isLoading && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex items-center gap-3 mb-4">
          <AlertCircle className="h-5 w-5 text-yellow-500" />
          <p>No plots found for the selected filter.</p>
        </div>
      )}
      
      <div className="overflow-x-auto pb-24">
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
