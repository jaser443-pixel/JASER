
import React from 'react';

type View = 'dashboard' | 'employees' | 'reports';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: 'dashboard', label: 'اللوحة الرئيسية' },
    { id: 'employees', label: 'الموظفين' },
    { id: 'reports', label: 'التقرير الشهري' },
  ];

  const getNavItemClass = (view: View) => {
    return `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      currentView === view
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 hover:bg-blue-100 hover:text-blue-700'
    }`;
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
             <div className="flex-shrink-0 text-xl font-bold text-blue-600">
                شركة أوزون السعودية
            </div>
          </div>
          <nav className="hidden md:flex items-center space-s-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as View)}
                className={getNavItemClass(item.id as View)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
