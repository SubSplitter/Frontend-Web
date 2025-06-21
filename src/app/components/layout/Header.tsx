// components/layout/Header.tsx
import React, { useState, useEffect } from 'react';
import { Bell, Search, Menu, X } from 'lucide-react';
import UserMenu from '../ui/UserMenu';

interface HeaderProps {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export default function Header({ sidebarCollapsed, toggleSidebar }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    setIsDesktop(window.innerWidth >= 768);
    
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="h-14 sm:h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center">
        {/* Mobile menu button */}
        <button
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white mr-3 sm:mr-4 lg:hidden p-1"
        >
          <Menu size={20} />
        </button>
        
        {/* Brand name for mobile */}
        <div className="text-purple-500 font-bold text-lg sm:text-xl lg:hidden">
          SubSplitter
        </div>
      </div>
      
      <div className="flex items-center space-x-3 sm:space-x-4">
        <UserMenu />
      </div>
    </header>
  );
}