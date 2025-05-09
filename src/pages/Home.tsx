
import React, { useRef } from 'react';
import { Button } from '../components/ui/button';
import PlotGrid from '../components/PlotGrid';
import BlockFilter from '../components/BlockFilter';
import { plots } from '../data/plotData';
import { BlockId } from '../types';
import Layout from '../components/Layout';

const Home = () => {
  const [selectedBlock, setSelectedBlock] = React.useState<BlockId | 'All'>('All');
  const plotSectionRef = useRef<HTMLDivElement>(null);
  
  const scrollToPlots = () => {
    if (plotSectionRef.current) {
      plotSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/90 to-primary py-16 md:py-24">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Welcome to Plot Palace Visualizer
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Find and book your perfect plot with our interactive plot booking system. Browse available plots, view details, and secure your dream location.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90"
            onClick={scrollToPlots}
          >
            View Plots
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Why Choose Our Plot Booking System?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
              <p className="text-gray-600">Browse plots visually with our interactive map system to find the perfect location.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Updates</h3>
              <p className="text-gray-600">Get real-time updates on plot availability to make informed decisions.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Simple Booking</h3>
              <p className="text-gray-600">Book your plot in minutes with our streamlined booking process.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Plot Section */}
      <div ref={plotSectionRef} className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Browse Available Plots</h2>
          
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
      </div>
    </Layout>
  );
};

export default Home;
