"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Color palette - soft greens and browns
  const colors = {
    darkGreen: '#5C6D63',
    mediumGreen: '#8BA888',
    lightGreen: '#C2D6C0',
    darkBrown: '#6D5C50',
    mediumBrown: '#A3917A',
    lightBrown: '#E0D6C8',
    offWhite: '#F8F7F4',
    darkText: '#333333'
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experiences' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav style={{ backgroundColor: colors.darkGreen, color: "white" }} className="px-6 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:opacity-90">
          Ally Descoteaux
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              className="hover:text-gray-200 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 px-4 space-y-3">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              className="block hover:text-gray-200 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;