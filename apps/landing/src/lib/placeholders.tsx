import React from 'react';

interface PlaceholderProps {
  width: number;
  height: number;
  className?: string;
  name?: string;
}

export function Placeholder({ width, height, className = '', name = 'Asset' }: PlaceholderProps) {
  return (
    <div
      className={`bg-purple-900/20 border border-purple-500/30 rounded ${className}`}
      style={{ width, height }}
      aria-label={`Placeholder for ${name}`}
    >
      <div className="w-full h-full flex items-center justify-center text-purple-300/50 text-xs">
        {name}
      </div>
    </div>
  );
}
