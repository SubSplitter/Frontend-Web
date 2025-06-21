// components/layout/Sidebar.tsx
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, UsersIcon, UserIcon, CreditCardIcon, SettingsIcon, X } from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  closeSidebar: () => void;
}

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, closeSidebar }: SidebarProps) {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Subscriptions', href: '/subscriptions', icon: CreditCardIcon },
    { name: 'Pools', href: '/pools', icon: UsersIcon },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
  ];

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const handleLinkClick = () => {
    closeSidebar();
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className={`hidden lg:flex bg-gray-900 ${collapsed ? 'w-20' : 'w-64'} flex-shrink-0 border-r border-gray-800 h-full transition-all duration-300 ease-in-out flex-col`}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-800">
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start pl-6'}`}>
            <div className="text-purple-500 font-bold text-xl">
              {collapsed ? 'SS' : 'SubSplitter'}
            </div>
          </div>
        </div>

        <nav className="mt-6 flex-1">
          <ul className="space-y-2 px-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} passHref>
                  <div
                    className={`flex items-center px-3 py-3 rounded-md transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'bg-purple-600 bg-opacity-20 text-purple-400'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <item.icon size={20} />
                    {!collapsed && <span className="ml-4">{item.name}</span>}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center p-2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside 
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col`}
      >
        <div className="flex items-center justify-between h-14 sm:h-16 border-b border-gray-800 px-4">
          <div className="text-purple-500 font-bold text-xl">
            SubSplitter
          </div>
          <button
            onClick={closeSidebar}
            className="text-gray-400 hover:text-white p-1"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-6 flex-1">
          <ul className="space-y-2 px-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} passHref>
                  <div
                    onClick={handleLinkClick}
                    className={`flex items-center px-3 py-3 rounded-md transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'bg-purple-600 bg-opacity-20 text-purple-400'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="ml-4">{item.name}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="text-xs text-gray-500 text-center">
            SubSplitter © 2025
          </div>
        </div>
      </aside>
    </>
  );
}