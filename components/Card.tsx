
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-700">{title}</h3>
        {icon && <div className="text-blue-500">{icon}</div>}
      </div>
      <div className="text-gray-800">
        {children}
      </div>
    </div>
  );
};
