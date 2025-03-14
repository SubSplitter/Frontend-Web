// components/ui/Notifications.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, X, AlertTriangle, Info, AlertCircle } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

export default function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Payment successful',
      message: 'Your Netflix pool payment has been processed.',
      time: '2 hours ago',
      read: false,
      type: 'success'
    },
    {
      id: '2',
      title: 'Pool invitation',
      message: 'Alice invited you to join their Disney+ pool.',
      time: '1 day ago',
      read: false,
      type: 'info'
    },
    {
      id: '3',
      title: 'Payment reminder',
      message: 'Your Spotify pool payment is due in 3 days.',
      time: '2 days ago',
      read: true,
      type: 'warning'
    }
  ]);
  
  const menuRef = useRef<HTMLDivElement>(null);
  
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

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <Check size={16} className="text-green-400" />;
      case 'warning': return <AlertTriangle size={16} className="text-yellow-400" />;
      case 'error': return <AlertCircle size={16} className="text-red-400" />;
      default: return <Info size={16} className="text-blue-400" />;
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-gray-400 hover:text-white transition-colors duration-200"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-purple-500 rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {unreadCount}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-md shadow-lg py-1 z-10">
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
            <h3 className="font-medium">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs text-purple-400 hover:text-purple-300"
              >
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`px-4 py-3 border-b border-gray-700 last:border-b-0 ${
                    !notification.read ? 'bg-gray-750' : ''
                  }`}
                >
                  <div className="flex">
                    <div className="flex-shrink-0 mt-0.5 mr-3">
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{notification.title}</p>
                        {!notification.read && (
                          <button 
                            onClick={() => markAsRead(notification.id)}
                            className="text-gray-400 hover:text-white"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-gray-400 text-sm">
                No notifications
              </div>
            )}
          </div>
          
          <div className="px-4 py-2 border-t border-gray-700">
            <button className="text-xs text-center w-full text-purple-400 hover:text-purple-300">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}