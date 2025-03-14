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
  
  // Use useEffect to safely access window after component mounts
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
    <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white mr-4 lg:hidden"
        >
          {sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
        
        <div className={`relative ${searchOpen ? 'w-64' : 'w-auto'} md:w-64 transition-all duration-300`}>
          {/* Only render once component is mounted and either searchOpen is true or we're on desktop */}
          {isMounted && (searchOpen || isDesktop) ? (
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-800 text-gray-200 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
              />
              <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="text-gray-400 hover:text-white"
            >
              <Search size={20} />
            </button>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="relative text-gray-400 hover:text-white">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-purple-500 rounded-full w-4 h-4 flex items-center justify-center text-xs">
            2
          </span>
        </button>
        <UserMenu />
      </div>
    </header>
  );
}