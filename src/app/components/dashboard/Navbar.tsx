// components/Navbar.tsx
'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="font-bold text-xl">Sub Spitller</Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === '/' ? 'bg-gray-900' : 'hover:bg-gray-700'}`}>
                  Home
                </Link>
                <Link href="/dashboard" className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === '/dashboard' ? 'bg-gray-900' : 'hover:bg-gray-700'}`}>
                  Dashboard
                </Link>
                <Link href="/subscriptions" className={`px-3 py-2 rounded-md text-sm font-medium ${pathname.startsWith('/subscriptions') ? 'bg-gray-900' : 'hover:bg-gray-700'}`}>
                  Subscriptions
                </Link>
                <Link href="/pools" className={`px-3 py-2 rounded-md text-sm font-medium ${pathname.startsWith('/pools') ? 'bg-gray-900' : 'hover:bg-gray-700'}`}>
                  Pools
                </Link>
                <Link href="/profile" className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === '/profile' ? 'bg-gray-900' : 'hover:bg-gray-700'}`}>
                  Profile
                </Link>
                <LogoutLink>Log out</LogoutLink>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === '/' ? 'bg-gray-900' : 'hover:bg-gray-700'}`}>
              Home
            </Link>
            <Link href="/dashboard" className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === '/dashboard' ? 'bg-gray-900' : 'hover:bg-gray-700'}`}>
              Dashboard
            </Link>
            <Link href="/subscriptions" className={`block px-3 py-2 rounded-md text-base font-medium ${pathname.startsWith('/subscriptions') ? 'bg-gray-900' : 'hover:bg-gray-700'}`}>
              Subscriptions
            </Link>
            <Link href="/pools" className={`block px-3 py-2 rounded-md text-base font-medium ${pathname.startsWith('/pools') ? 'bg-gray-900' : 'hover:bg-gray-700'}`}>
              Pools
            </Link>
            <Link href="/profile" className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === '/profile' ? 'bg-gray-900' : 'hover:bg-gray-700'}`}>
              Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
