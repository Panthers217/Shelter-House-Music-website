import React from 'react';
import { Info } from 'lucide-react';

/**
 * Small inline demo badge for use within components
 * Example: Next to page titles, product prices, artist names, etc.
 */
const DemoBadge = ({ 
  text = 'Demo',
  tooltip = 'This is demo content for portfolio purposes',
  variant = 'default' // 'default', 'subtle', 'outline'
}) => {
  const variants = {
    default: 'bg-blue-100 text-blue-700 border-blue-200',
    subtle: 'bg-gray-100 text-gray-600 border-gray-200',
    outline: 'bg-transparent text-blue-600 border-blue-400'
  };

  return (
    <span 
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${variants[variant]}`}
      title={tooltip}
    >
      <Info className="w-3 h-3" />
      {text}
    </span>
  );
};

export default DemoBadge;
