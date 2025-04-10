import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search cars by brand or model..."
        className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-0 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-400"
      />
    </div>
  );
}