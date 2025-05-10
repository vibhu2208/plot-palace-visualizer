
import React, { useRef } from 'react';
import { Button } from '../components/ui/button';
import PlotGrid from '../components/PlotGrid';
import BlockFilter from '../components/BlockFilter';
import { plots } from '../data/plotData';
import { BlockId } from '../types';
import Layout from '../components/Layout';
import { MapPin, Clock, Check, ArrowDown, ChevronDown, Users } from 'lucide-react';
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
      {/* Hero Section with improved design */}
      <div className="relative min-h-[90vh] flex items-center">
        {/* Background image or pattern */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1472224371017-08207f84aaae?q=80&w=2070')" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent mix-blend-multiply"></div>
        </div>
        
        {/* Content overlay */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              Find Your Perfect Plot, Effortlessly
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-xl animate-fade-in">
              Discover premium land plots in prime locations designed for your dream home. 
              Our interactive booking system makes finding the perfect space simple.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg transition-all duration-300 animate-scale-in group"
                onClick={scrollToPlots}
              >
                Explore Plots
                <ChevronDown className="ml-1 h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/20 font-medium animate-scale-in"
              >
                How It Works
              </Button>
            </div>
            
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                onClick={scrollToPlots}
              >
                <ArrowDown className="h-5 w-5 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Plots</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer premium plots with full legal documentation, excellent connectivity, 
              and a seamless booking process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-primary/10 p-4 rounded-full inline-block mb-4">
                <MapPin className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Prime Locations</h3>
              <p className="text-gray-600">
                All our plots are situated in strategic areas with excellent connectivity to 
                major roads, schools, hospitals, and shopping centers.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-primary/10 p-4 rounded-full inline-block mb-4">
                <Clock className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quick Process</h3>
              <p className="text-gray-600">
                Our streamlined booking process ensures you can secure your plot quickly with 
                minimal paperwork and hassle.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-primary/10 p-4 rounded-full inline-block mb-4">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
              <p className="text-gray-600">
                Our team of real estate experts is always available to guide you through the 
                process and answer any questions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Plot Section */}
      <div ref={plotSectionRef} className="py-20 bg-[#F7FCFA]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            Browse Available Plots
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Explore our selection of premium plots across different blocks. Filter by block and click on any plot to see detailed information.
          </p>
          
          <div className="mb-8">
            <BlockFilter 
              activeBlock={selectedBlock} 
              onSelect={setSelectedBlock} 
            />
          </div>
          
          <Card className="border-gray-200 shadow-lg bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden">
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

      {/* Testimonial or CTA section */}
      <div className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Find Your Perfect Plot?</h2>
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-semibold"
            onClick={scrollToPlots}
          >
            View Available Plots
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
