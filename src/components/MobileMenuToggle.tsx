
import React, { useEffect } from 'react';

const MobileMenuToggle: React.FC = () => {
  useEffect(() => {
    const menuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuButton && mobileMenu) {
      const toggleMenu = () => {
        mobileMenu.classList.toggle('hidden');
      };
      
      menuButton.addEventListener('click', toggleMenu);
      
      // Clean up the event listener when the component unmounts
      return () => {
        menuButton.removeEventListener('click', toggleMenu);
      };
    }
  }, []);
  
  return null;
};

export default MobileMenuToggle;
