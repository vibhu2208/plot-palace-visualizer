
import React from 'react';
import { BlockId } from '../types';

interface BlockFilterProps {
  activeBlock: BlockId | 'All';
  onSelect: (block: BlockId | 'All') => void;
}

const BlockFilter: React.FC<BlockFilterProps> = ({ activeBlock, onSelect }) => {
  const blocks: (BlockId | 'All')[] = ['All', 'A', 'B', 'C'];
  
  return (
    <div className="flex justify-center mb-6 space-x-2">
      {blocks.map((block) => (
        <button
          key={block}
          className={`px-4 py-2 rounded-md transition-all ${
            activeBlock === block 
              ? 'bg-primary text-white' 
              : 'bg-secondary/10 hover:bg-secondary/20'
          }`}
          onClick={() => onSelect(block)}
        >
          {block === 'All' ? 'All Blocks' : `Block ${block}`}
        </button>
      ))}
    </div>
  );
};

export default BlockFilter;
