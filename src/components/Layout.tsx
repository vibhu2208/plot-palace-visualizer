
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MapPin, Mail, FileText } from 'lucide-react';
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
      
      {/* Footer */}
      <footer className="bg-white shadow-inner py-8">
        <div className="container mx-auto px-4">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center">
                <MapPin className="h-8 w-8 text-primary" />
                <span className="ml-2 text-xl font-bold text-gray-900">Plot Palace</span>
              </Link>
              <p className="mt-2 text-sm text-gray-600 max-w-md">
                Find and book your perfect plot easily with our interactive plot booking system.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="mb-4 text-sm font-semibold text-gray-900 uppercase">Quick Links</h3>
                <ul className="text-gray-600">
                  <li className="mb-2">
                    <Link to="/" className="hover:underline">Home</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/plots" className="hover:underline">Plot Booking</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/contact" className="hover:underline">Contact</Link>
                  </li>
                  <li>
                    <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <hr className="my-6 border-gray-200 sm:mx-auto" />
          
          <div className="text-center text-sm text-gray-600">
            <span>© {new Date().getFullYear()} Plot Palace. All Rights Reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
