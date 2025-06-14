
import React, { useState } from 'react';
import PlotGrid from '../components/PlotGrid';
import BlockFilter from '../components/BlockFilter';
import { BlockId } from '../types';
import { plots } from '../data/plotData';
import { Toaster } from '../components/ui/toaster';
import Layout from '../components/Layout';

const Index = () => {
  const [selectedBlock, setSelectedBlock] = useState<BlockId | 'All'>('All');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Home Hunts</h1>
        
        <div className="mb-6">
          <BlockFilter 
            activeBlock={selectedBlock} 
            onSelect={setSelectedBlock} 
          />
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <PlotGrid 
            plots={plots} 
            selectedBlock={selectedBlock}
          />
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Click on any plot to see detailed information or book it</p>
        </div>
      </div>
      <Toaster />
    </Layout>
  );
};

export default Index;
