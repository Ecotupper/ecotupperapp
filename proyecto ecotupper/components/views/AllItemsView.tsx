import React, { useState, useEffect, useMemo } from 'react';
import { getItems } from '../../services/mockApi';
import type { SurplusItem, ItemFilterType } from '../../types';
import SurplusItemCard from '../SurplusItemCard';
import { ArrowLeftIcon } from '../common/Icon';

interface AllItemsViewProps {
  filterType: ItemFilterType;
  navigateToDetail: (id: number) => void;
  navigateBack: () => void;
}

// Helper to parse time from "Recoger antes de las HH:MM"
const parsePickupTime = (timeStr: string): number => {
    const match = timeStr.match(/(\d{2}):(\d{2})/);
    if (match) {
        const hours = parseInt(match[1], 10);
        const minutes = parseInt(match[2], 10);
        return hours * 60 + minutes;
    }
    return 24 * 60; // Default to end of day if format is unexpected
};

const AllItemsView: React.FC<AllItemsViewProps> = ({ filterType, navigateToDetail, navigateBack }) => {
  const [items, setItems] = useState<SurplusItem[]>([]);
  const [loading, setLoading] = useState(true);

  const viewTitle = useMemo(() => {
    switch(filterType) {
        case 'recent': return 'Recién Añadido';
        case 'nearby': return 'Cerca de Ti';
        case 'prepared': return 'Preparados';
        case 'endingSoon': return 'Apunto de acabar';
        case 'bakery': return 'Bollería y panadería';
        default: return 'Todos los artículos';
    }
  }, [filterType]);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const data = await getItems();
      setItems(data);
      setLoading(false);
    };
    fetchItems();
  }, []);

  const sortedItems = useMemo(() => {
    switch(filterType) {
        case 'recent':
            return [...items].reverse();
        case 'nearby':
            return [...items].sort((a, b) => {
                const distA = parseFloat(a.distance);
                const distB = parseFloat(b.distance);
                return distA - distB;
            });
        case 'prepared':
            return items.filter(item => item.tags.includes('Comida preparada'));
        case 'endingSoon':
            return [...items].sort((a, b) => {
                const timeA = parsePickupTime(a.pickupTime);
                const timeB = parsePickupTime(b.pickupTime);
                return timeA - timeB;
            });
        case 'bakery':
            return items.filter(item => item.tags.includes('Panadería'));
        default:
            return items;
    }
  }, [items, filterType]);

  return (
    <div>
      <header className="flex items-center p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
        <button onClick={navigateBack} className="p-2 mr-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">{viewTitle}</h1>
      </header>
      
      <div className="p-4">
        {loading ? (
          <div className="grid grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/50 rounded-xl shadow-md h-64 animate-pulse w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {sortedItems.map(item => (
              <SurplusItemCard key={item.id} item={item} onClick={() => navigateToDetail(item.id)} variant="grid" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllItemsView;