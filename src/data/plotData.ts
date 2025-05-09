
import { PlotData } from "../types";

// Function to generate plot data for a block
const generatePlots = (blockId: 'A' | 'B' | 'C', count: number): PlotData[] => {
  return Array.from({ length: count }, (_, i) => {
    const number = i + 1;
    return {
      id: `${blockId}-${number}`,
      block: blockId,
      number,
      size: 100, // Default size
      status: 'Available' // All plots are initially available
    };
  });
};

// Generate plot data for each block
const blockAPlots = generatePlots('A', 125);
const blockBPlots = generatePlots('B', 231);
const blockCPlots = generatePlots('C', 231);

// Combine all plots
export const plots: PlotData[] = [
  ...blockAPlots,
  ...blockBPlots,
  ...blockCPlots
];

// Function to get plots by block
export const getPlotsByBlock = (blockId: 'A' | 'B' | 'C'): PlotData[] => {
  return plots.filter(plot => plot.block === blockId);
};
