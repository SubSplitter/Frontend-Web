// components/ui/UserMenu.tsx
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { UserCircle, LogOut, Settings, CreditCard } from 'lucide-react';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useKindeBrowserClient();
  
  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.given_name) return "U";
    
    const names = [user.given_name, user.family_name].filter(Boolean);
    return names.map(name => name?.[0] || "").join("");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-medium">
          {user?.picture ? (
            <img 
              src={user.picture} 
              alt={user?.given_name || "User"} 
              className="w-8 h-8 rounded-full"
            />
          ) : (
            getUserInitials()
          )}
        </div>
        <span className="hidden md:block text-sm font-medium">
          {user?.given_name ? `${user.given_name} ${user.family_name || ''}` : 'Guest'}
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-md shadow-lg py-1 z-10">
          <div className="px-4 py-3 border-b border-gray-700">
            <p className="text-sm font-medium">
              {user?.given_name ? `${user.given_name} ${user.family_name || ''}` : 'Guest'}
            </p>
            <p className="text-xs text-gray-400 truncate">{user?.email || ''}</p>
          </div>
          
          <Link href="/profile" passHref>
            <div className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center">
              <UserCircle size={16} className="mr-2" />
              <span>Your Profile</span>
            </div>
          </Link>
          
          <Link href="/subscriptions" passHref>
            <div className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center">
              <CreditCard size={16} className="mr-2" />
              <span>Your Subscriptions</span>
            </div>
          </Link>
          
          <Link href="/settings" passHref>
            <div className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center">
              <Settings size={16} className="mr-2" />
              <span>Settings</span>
            </div>
          </Link>
          
          <div className="border-t border-gray-700 mt-1 pt-1">
            <button 
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center"
            >
              <LogOut size={16} className="mr-2" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}