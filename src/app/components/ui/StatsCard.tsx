// components/ui/StatsCard.tsx
import React, { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatsCard({ title, value, description, icon, trend }: StatsCardProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      
      <div className="flex items-baseline space-x-2">
        <div className="text-2xl font-bold">{value}</div>
        
        {trend && (
          <div className={`text-sm ${trend.isPositive ? 'text-green-400' : 'text-red-400'} flex items-center`}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      
      {description && <p className="text-gray-400 text-xs mt-1">{description}</p>}
    </div>
  );
}
