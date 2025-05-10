
import React from 'react';
import { BlockId } from '../types';
import { Map, Filter, Grid3X3 } from 'lucide-react';

interface BlockFilterProps {
  activeBlock: BlockId | 'All';
  onSelect: (block: BlockId | 'All') => void;
}

const BlockFilter: React.FC<BlockFilterProps> = ({ activeBlock, onSelect }) => {
  const blocks: (BlockId | 'All')[] = ['All', 'A', 'B', 'C'];
  
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Filter by Block</h3>
      </div>
      
      <div className="flex justify-center gap-3">
        {blocks.map((block) => (
          <button
            key={block}
            className={`px-4 py-2.5 rounded-full flex items-center gap-2 transition-all duration-300 ${
              activeBlock === block 
                ? 'bg-primary text-white shadow-md shadow-primary/20' 
                : 'bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => onSelect(block)}
          >
            {block === 'All' ? (
              <>
                <Map className="h-4 w-4" />
                <span>All Blocks</span>
              </>
            ) : (
              <>
                <Grid3X3 className="h-4 w-4" />
                <span>Block {block}</span>
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlockFilter;
