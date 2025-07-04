import React from 'react';
import type { SurplusItem } from '../types';
import { StarIcon } from './common/Icon';

interface SurplusItemCardProps {
  item: SurplusItem;
  onClick: () => void;
  variant?: 'carousel' | 'grid';
}

const SurplusItemCard: React.FC<SurplusItemCardProps> = ({ item, onClick, variant = 'carousel' }) => {
  const containerClasses = 
    variant === 'carousel'
    ? "bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer w-72 flex-shrink-0"
    : "bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer w-full";

  return (
    <div 
      className={containerClasses}
      onClick={onClick}
    >
      <div className="relative">
        <img className="h-40 w-full object-cover" src={item.imageUrl} alt={item.title} />
        <div className="absolute top-2 left-2 bg-naranja-fuerte text-white text-xs font-bold px-2 py-1 rounded-full">
          {item.distance}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 truncate">{item.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{item.seller.name}</p>
        <div className="flex items-center mt-2 text-sm text-gray-500">
           <StarIcon className="w-4 h-4 text-amarillo-suave mr-1" />
           <span>{item.seller.rating} ({item.seller.reviewsCount} reseñas)</span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-bold text-verde-med">€{item.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500 line-through">€{item.originalPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default SurplusItemCard;