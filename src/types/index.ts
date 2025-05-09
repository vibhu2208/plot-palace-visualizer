
export type BlockId = 'A' | 'B' | 'C';

export interface PlotData {
  id: string;
  block: BlockId;
  number: number;
  size: number;
  status: 'Available' | 'Booked';
}
