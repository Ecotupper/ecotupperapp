import React from 'react';
import { NAVIGATION_ITEMS } from '../../constants';
import type { View, UserRole } from '../../types';

interface BottomNavProps {
  currentView: View;
  setView: (view: View) => void;
  userRole: UserRole;
  cartItemCount: number;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView, userRole, cartItemCount }) => {
  const clientViews = ['home', 'orders', 'favorites', 'cart', 'profile'];
  const collaboratorViews = ['home', 'orders', 'post', 'profile'];

  const navItems = NAVIGATION_ITEMS.filter(item => {
    if (userRole === 'client') {
      return clientViews.includes(item.id);
    }
    return collaboratorViews.includes(item.id);
  });

  return (
    <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-20 bg-white/80 backdrop-blur-md border-t border-gray-200/80">
      <nav className="h-full">
        <ul className="flex justify-around items-center h-full">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <li key={item.id} className="h-full">
                <button
                  onClick={() => setView(item.id)}
                  className={`relative flex flex-col items-center justify-center h-full w-20 transition-colors duration-200 ${
                    isActive ? 'text-verde-med' : 'text-gray-500 hover:text-verde-med'
                  }`}
                >
                  <item.icon className="h-7 w-7 mb-0.5" />
                  <span className="text-xs font-semibold">{item.label}</span>
                  {item.id === 'cart' && cartItemCount > 0 && (
                     <span className="absolute top-1 right-3.5 flex items-center justify-center w-5 h-5 bg-rojo-tomate text-white text-xs font-bold rounded-full">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </footer>
  );
};

export default BottomNav;