// components/layout/Sidebar.tsx
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, UsersIcon, UserIcon, CreditCardIcon, SettingsIcon } from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Subscriptions', href: '/subscriptions', icon: CreditCardIcon },
    { name: 'Pools', href: '/pools', icon: UsersIcon },
    { name: 'Profile', href: '/profile', icon: UserIcon },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
  ];

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <aside 
      className={`bg-gray-900 ${collapsed ? 'w-20' : 'w-64'} flex-shrink-0 border-r border-gray-800 h-full transition-all duration-300 ease-in-out flex flex-col`}
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
  );
}