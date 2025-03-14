// components/ui/DataTable.tsx
import React, { ReactNode } from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

export default function DataTable<T>({ 
  columns, 
  data, 
  keyExtractor, 
  onRowClick,
  emptyMessage = "No data available"
}: DataTableProps<T>) {
  return (
    <div className="w-full bg-gray-800 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-900 text-gray-400 text-left">
              {columns.map((column, index) => (
                <th 
                  key={index} 
                  className="px-6 py-3 text-xs font-medium uppercase tracking-wider"
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-700">
            {data.length > 0 ? (
              data.map((item) => (
                <tr 
                  key={keyExtractor(item)} 
                  className="hover:bg-gray-750 transition-colors duration-150 cursor-pointer"
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {columns.map((column, index) => (
                    <td key={index} className="px-6 py-4 whitespace-nowrap">
                      {typeof column.accessor === 'function' 
                        ? column.accessor(item)
                        : item[column.accessor] as ReactNode}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length} 
                  className="px-6 py-8 text-center text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}