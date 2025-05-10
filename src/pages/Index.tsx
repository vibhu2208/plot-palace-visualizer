
import React, { useState } from 'react';
import PlotGrid from '../components/PlotGrid';
import BlockFilter from '../components/BlockFilter';
import { BlockId } from '../types';
import { plots } from '../data/plotData';
import { Toaster } from '../components/ui/toaster';
import Layout from '../components/Layout';

const Index = () => {
  const [selectedBlock, setSelectedBlock] = useState<BlockId | 'All'>('All');

  const scrollToHowItWorks = () => {
    const section = document.getElementById('how-it-works');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

        {/* How It Works Section */}
        <div id="how-it-works" className="mt-24 mb-16">
          <h2 className="text-2xl font-bold text-center mb-6">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-lg">1</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Browse Available Plots</h3>
              <p className="text-gray-600">Explore our selection of premium plots across different blocks.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-lg">2</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Select Your Perfect Plot</h3>
              <p className="text-gray-600">Click on a plot to view detailed information and check availability.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-lg">3</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Book Your Visit</h3>
              <p className="text-gray-600">Complete the booking form to schedule a visit and secure your plot.</p>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </Layout>
  );
};

export default Index;
