'use client'
import React, { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className={`flex h-screen bg-gray-950 text-white ${inter.className}`}>
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header sidebarCollapsed={sidebarCollapsed} toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-900 to-gray-950">
          {children}
        </main>
      </div>
    </div>
  );
}