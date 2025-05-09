
import React, { useState, useMemo } from 'react';
import { BlockId, PlotData } from '../types';
import Plot from './Plot';
import PlotInfoCard from './PlotInfoCard';

interface PlotGridProps {
  plots: PlotData[];
  selectedBlock: BlockId | 'All';
}

const PlotGrid: React.FC<PlotGridProps> = ({ plots, selectedBlock }) => {
  const [selectedPlot, setSelectedPlot] = useState<PlotData | null>(null);
  
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
  
  const handlePlotClick = (plot: PlotData) => {
    setSelectedPlot(prevPlot => prevPlot?.id === plot.id ? null : plot);
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
      <div className="overflow-x-auto pb-20">
        {Object.entries(blockGroups).map(([blockId, blockPlots]) => 
          renderBlock(blockId as BlockId, blockPlots)
        )}
      </div>
      <PlotInfoCard plot={selectedPlot} />
    </div>
  );
};

export default PlotGrid;
