// components/Navbar.tsx
'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { RegisterLink,LoginLink } from '@kinde-oss/kinde-auth-nextjs';


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check for dark mode preference
    if (typeof window !== 'undefined') {
      const darkModePreference = window.localStorage.getItem('darkMode') === 'true' ||
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
      
      setIsDarkMode(darkModePreference);
      
      if (darkModePreference) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (typeof window !== 'undefined') {
      if (!isDarkMode) {
        document.documentElement.classList.add('dark');
        window.localStorage.setItem('darkMode', 'true');
      } else {
        document.documentElement.classList.remove('dark');
        window.localStorage.setItem('darkMode', 'false');
      }
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition duration-300 ${
      isScrolled 
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md'
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                SubSplitter
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link href="#features" className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition duration-150">
                Features
              </Link>
              <Link href="#how-it-works" className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition duration-150">
                How It Works
              </Link>
              <Link href="#pricing" className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition duration-150">
                Pricing
              </Link>
              <Link href="#faq" className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition duration-150">
                FAQ
              </Link>
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <LoginLink postLoginRedirectURL="/dashboard"
                
                className="px-4 py-2 border border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition duration-150"
              >
                Sign in
              </LoginLink>

              <RegisterLink 
                 
                className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-150"
              >
                Sign up
              </RegisterLink>
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleDarkMode}
              className="p-2 mr-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white dark:bg-gray-900 shadow-lg`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            href="#features" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Features
          </Link>
          <Link 
            href="#how-it-works" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            How It Works
          </Link>
          <Link 
            href="#pricing" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Pricing
          </Link>
          <Link 
            href="#faq" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            FAQ
          </Link>
          <div className="flex space-x-2 px-3 py-2">
            <LoginLink postLoginRedirectURL="/dashboard"  
              className="flex-1 px-4 py-2 text-center border border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 font-medium rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Sign in
            </LoginLink>
            <RegisterLink
              
              className="flex-1 px-4 py-2 text-center bg-indigo-600 text-white font-medium rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Sign up
            </RegisterLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;