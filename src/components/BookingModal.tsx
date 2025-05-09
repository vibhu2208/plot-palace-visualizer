
import React from 'react';
import { useState } from 'react';
import { PlotData } from '../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useToast } from '../hooks/use-toast';
import { supabase } from '../integrations/supabase/client';

interface BookingModalProps {
  plot: PlotData | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ plot, isOpen, onClose, onBookingComplete }) => {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!plot) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('plot_bookings')
        .insert({
          plot_id: plot.id,
          block_id: plot.block,
          plot_number: plot.number,
          booked_by: name,
          contact_info: contactInfo,
          note: note
        });
      
      if (error) throw error;

      toast({
        title: 'Success!',
        description: `Plot ${plot.id} has been booked successfully.`,
      });
      
      onBookingComplete();
      onClose();
      resetForm();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to book plot. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setContactInfo('');
    setNote('');
  };

  if (!plot) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Plot {plot.id}</DialogTitle>
          <DialogDescription>
            Enter your details to book this plot. Fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-medium">Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactInfo" className="font-medium">Contact Information</Label>
            <Input
              id="contactInfo"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              placeholder="Phone number or email (optional)"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="note" className="font-medium">Note</Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Any additional information (optional)"
              className="h-24"
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name || isLoading}>
              {isLoading ? 'Booking...' : 'Book Now'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
