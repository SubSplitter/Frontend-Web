import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { AuthProvider } from "./components/AuthProvider";
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SubSplitter - Manage Group Subscriptions Effortlessly',
  description: 'Split costs, track payments, and manage shared subscriptions in one place. No more awkward money talks with friends.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}>
        {children}
      </body>
    </html>
    </AuthProvider>
  );
}
