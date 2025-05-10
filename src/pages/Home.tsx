
import React, { useRef } from 'react';
import { Button } from '../components/ui/button';
import PlotGrid from '../components/PlotGrid';
import BlockFilter from '../components/BlockFilter';
import { plots } from '../data/plotData';
import { BlockId } from '../types';
import Layout from '../components/Layout';
import { MapPin, Clock, Check, ArrowDown } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

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
      <div className="bg-gradient-to-br from-[#D3F3E1] to-[#ECF8F3] py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto text-center px-4 relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Find Your Perfect Plot
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Browse and book premium plots with our interactive visualization tool. Secure your ideal location with just a few clicks.
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white group"
            onClick={scrollToPlots}
          >
            View Available Plots
            <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
          </Button>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl shadow-md border border-gray-100 flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
              <p className="text-gray-600 text-center">Visually explore available plots with our intuitive interface.</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl shadow-md border border-gray-100 flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-Time Updates</h3>
              <p className="text-gray-600 text-center">Get instant updates on plot availability and bookings.</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl shadow-md border border-gray-100 flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Simple Booking</h3>
              <p className="text-gray-600 text-center">Book your plot with a streamlined, user-friendly process.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Plot Section */}
      <div ref={plotSectionRef} className="py-16 bg-[#F7FCFA]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            Browse Available Plots
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Explore our selection of premium plots across different blocks. Filter by block and click on any plot to see detailed information.
          </p>
          
          <div className="mb-6">
            <BlockFilter 
              activeBlock={selectedBlock} 
              onSelect={setSelectedBlock} 
            />
          </div>
          
          <Card className="border-gray-200 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <PlotGrid 
                plots={plots} 
                selectedBlock={selectedBlock}
              />
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 bg-gray-50 inline-block px-4 py-2 rounded-full">
              Click on any plot to see detailed information or book it
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
