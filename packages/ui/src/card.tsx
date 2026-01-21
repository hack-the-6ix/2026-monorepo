import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
}) => {
  const hoverStyles =
    hover ?
      'hover:shadow-lg hover:-translate-y-1 transition-all duration-300'
    : '';

  return (
    <div
      className={`bg-blue-200 rounded-xl shadow-md p-6 ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
};
