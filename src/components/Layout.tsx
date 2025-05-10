
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MapPin, Mail, FileText, Linkedin, Instagram, Phone } from 'lucide-react';
import MobileMenuToggle from './MobileMenuToggle';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-accent text-accent-foreground' : '';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation Bar */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-bold text-primary flex items-center gap-2">
              <MapPin className="h-6 w-6" />
              <span>Home Hunts</span>
            </Link>
            
            <nav className="hidden md:flex space-x-1">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition ${isActive('/')}`}
              >
                <span className="flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </span>
              </Link>
              <Link 
                to="/plots" 
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition ${isActive('/plots')}`}
              >
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>Plot Booking</span>
                </span>
              </Link>
              <Link 
                to="/contact" 
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition ${isActive('/contact')}`}
              >
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span>Contact</span>
                </span>
              </Link>
              <Link 
                to="/privacy" 
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition ${isActive('/privacy')}`}
              >
                <span className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span>Privacy Policy</span>
                </span>
              </Link>
            </nav>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="mobile-menu-button p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                <span className="sr-only">Open main menu</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          <div className="hidden md:hidden mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
              >
                <span className="flex items-center gap-1">
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </span>
              </Link>
              <Link 
                to="/plots" 
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
              >
                <span className="flex items-center gap-1">
                  <MapPin className="h-5 w-5" />
                  <span>Plot Booking</span>
                </span>
              </Link>
              <Link 
                to="/contact" 
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
              >
                <span className="flex items-center gap-1">
                  <Mail className="h-5 w-5" />
                  <span>Contact</span>
                </span>
              </Link>
              <Link 
                to="/privacy" 
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
              >
                <span className="flex items-center gap-1">
                  <FileText className="h-5 w-5" />
                  <span>Privacy Policy</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Add the mobile menu toggle component */}
        <MobileMenuToggle />
      </header>
      
      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Redesigned Footer */}
      <footer className="bg-[#1A1F2C] text-white">
        <div className="container mx-auto px-4 py-12">
          {/* Footer content grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <Link to="/" className="inline-flex items-center gap-2 mb-4">
                <MapPin className="h-7 w-7 text-primary" />
                <span className="text-2xl font-bold">Home Hunts</span>
              </Link>
              <p className="text-gray-400 mt-2 mb-6 max-w-xs">
                Building Dreams, One Plot at a Time. Find your perfect plot with our 
                streamlined and transparent booking process.
              </p>
              <div className="flex space-x-4">
                <a href="https://linkedin.com" className="hover:text-primary transition-colors" aria-label="LinkedIn">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="https://instagram.com" className="hover:text-primary transition-colors" aria-label="Instagram">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="https://wa.me/1234567890" className="hover:text-primary transition-colors" aria-label="WhatsApp">
                  <Phone className="h-6 w-6" />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
              <nav className="flex flex-col space-y-2">
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors">Home</Link>
                <Link to="/plots" className="text-gray-400 hover:text-primary transition-colors">Available Plots</Link>
                <Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact Us</Link>
                <Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors">FAQ</Link>
              </nav>
            </div>
            
            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
              <address className="not-italic text-gray-400 space-y-2">
                <p className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                  <span>123 Plot Avenue<br />Land District<br />Property City, PC 12345</span>
                </p>
                <p className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-primary" />
                  <a href="mailto:info@homehunts.com" className="hover:text-primary transition-colors">
                    info@homehunts.com
                  </a>
                </p>
                <p className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-primary" />
                  <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                    (123) 456-7890
                  </a>
                </p>
              </address>
            </div>
          </div>
          
          {/* Copyright line */}
          <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Home Hunts. All Rights Reserved.</p>
            <p className="mt-2 font-serif italic">Building Dreams, One Plot at a Time</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
