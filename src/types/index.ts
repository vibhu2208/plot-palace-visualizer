
export type BlockId = 'A' | 'B' | 'C';

export interface PlotData {
  id: string;
  block: BlockId;
  number: number;
  size: number;
  status: 'Available' | 'Booked';
  bookingInfo?: {
    bookedBy: string;
    bookedAt: string;
  };
}

export interface PlotBooking {
  id: number;
  plot_id: string;
  block_id: string;
  plot_number: number;
  booked_by: string;
  contact_info: string | null;
  phone: string | null;
  visit_date: string | null;
  booked_at: string;
  note: string | null;
}
