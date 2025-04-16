"use client";
import React from 'react';
import Navbar from './navBar';

import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  // Color palette - soft greens and browns
  const colors = {
    offWhite: '#F8F7F4'
  };

  return (
    <div style={{ backgroundColor: colors.offWhite, minHeight: "100vh" }}>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-8">
        {children}
      </main>
      <footer className="bg-gray-100 py-6 mt-20">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Alexandra Descoteaux. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;