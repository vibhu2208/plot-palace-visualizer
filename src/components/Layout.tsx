
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const scrollToHowItWorks = () => {
    const section = document.getElementById('how-it-works');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">Home Hunts</Link>
          
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-700 hover:text-primary">Home</Link>
            <Link to="/plots" className="text-gray-700 hover:text-primary">Plots</Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary">Contact</Link>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-900 to-green-600 text-white py-20">
        <div className="absolute inset-0 bg-[url('/img/plot-hero.jpg')] bg-cover bg-center opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Plot, Effortlessly</h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">Discover premium land plots for your dream home in our exclusive communities.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/plots">
                <Button size="lg" className="font-medium">
                  Explore Plots
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={scrollToHowItWorks}
                className="bg-white text-green-800 hover:bg-green-50 border-white hover:border-green-100 font-medium"
              >
                How It Works
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-4">Home Hunts</h2>
              <p className="max-w-md mb-6">Building Dreams, One Plot at a Time. Find your perfect space with our premium selection of plots in desirable locations.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white">Home</Link></li>
                <li><Link to="/plots" className="hover:text-white">Plots</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li>123 Main Street</li>
                <li>City, Country</li>
                <li>contact@homehunts.com</li>
                <li>+1 (555) 123-4567</li>
              </ul>
              
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white" aria-label="LinkedIn">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white" aria-label="WhatsApp">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345z"></path>
                    <path d="M20.52 3.449c-2.377-2.375-5.531-3.678-8.895-3.678-6.928 0-12.555 5.626-12.555 12.554 0 2.211.567 4.368 1.646 6.279l-1.75 6.396 6.555-1.712c1.839.999 3.914 1.525 6.046 1.525h.006c6.926 0 12.554-5.626 12.554-12.553 0-3.364-1.302-6.517-3.676-8.895zm-8.896 19.32c-1.883 0-3.731-.505-5.338-1.453l-.382-.21-3.962 1.036 1.055-3.848-.23-.371c-1.039-1.651-1.587-3.561-1.587-5.539 0-5.722 4.656-10.378 10.378-10.378 2.774 0 5.379 1.08 7.337 3.039 1.95 1.959 3.025 4.557 3.025 7.335 0 5.722-4.656 10.378-10.379 10.378z" fillRule="nonzero"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white" aria-label="Instagram">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-6 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} Home Hunts. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
