
import React, { useState } from 'react';
import PlotGrid from '../components/PlotGrid';
import BlockFilter from '../components/BlockFilter';
import { BlockId } from '../types';
import { plots } from '../data/plotData';
import Layout from '../components/Layout';
import { MapPin } from 'lucide-react';

const Plots = () => {
  const [selectedBlock, setSelectedBlock] = useState<BlockId | 'All'>('All');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Plot Visualizer</h1>
          </div>
          <p className="text-gray-600">
            Browse and book available plots with our interactive visualization tool.
            Filter by block and click on any plot for more details.
          </p>
        </div>
        
        <div className="mb-8">
          <BlockFilter 
            activeBlock={selectedBlock} 
            onSelect={setSelectedBlock} 
          />
        </div>
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6">
            <PlotGrid 
              plots={plots} 
              selectedBlock={selectedBlock}
            />
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 bg-gray-50 inline-block px-4 py-2 rounded-full">
            Click on any plot to see detailed information or book it
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Plots;
