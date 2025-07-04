import React, { useState, useEffect, useMemo } from 'react';
import { getItems } from '../../services/mockApi';
import type { SurplusItem, ItemFilterType } from '../../types';
import SurplusItemCard from '../SurplusItemCard';
import { EcotupperLogo, QueueListIcon, MapIcon, ChevronDownIcon, MapPinIcon } from '../common/Icon';
import MapView from './MapView';

interface HomeViewProps {
  navigateToDetail: (id: number) => void;
  navigateToAllItems: (filter: ItemFilterType) => void;
  location: string;
  navigateToSelectLocation: () => void;
}

interface ItemsCarouselProps {
  title: string;
  items: SurplusItem[];
  onItemSelected: (id: number) => void;
  onViewAll: () => void;
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


const ItemsCarousel: React.FC<ItemsCarouselProps> = ({ title, items, onItemSelected, onViewAll }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-3 px-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <button onClick={onViewAll} className="text-sm font-semibold text-verde-med hover:underline">
          Ver todo
        </button>
      </div>
      <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`
              ${index === 0 ? 'ml-4' : ''}
              ${index === items.length - 1 ? 'mr-4' : ''}
            `}
          >
            <SurplusItemCard item={item} onClick={() => onItemSelected(item.id)} />
          </div>
        ))}
      </div>
    </section>
  );
};

const HomeView: React.FC<HomeViewProps> = ({ navigateToDetail, navigateToAllItems, location, navigateToSelectLocation }) => {
  const [items, setItems] = useState<SurplusItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const data = await getItems();
      setItems(data);
      setLoading(false);
    };
    fetchItems();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.seller.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  const recentlyAddedItems = useMemo(() => {
    return [...filteredItems].reverse();
  }, [filteredItems]);

  const nearbyItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
        const distA = parseFloat(a.distance);
        const distB = parseFloat(b.distance);
        return distA - distB;
    });
  }, [filteredItems]);
  
  const preparedItems = useMemo(() => {
    return filteredItems.filter(item => item.tags.includes('Comida preparada'));
  }, [filteredItems]);

  const endingSoonItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
        const timeA = parsePickupTime(a.pickupTime);
        const timeB = parsePickupTime(b.pickupTime);
        return timeA - timeB;
    });
  }, [filteredItems]);
  
  const bakeryItems = useMemo(() => {
    return filteredItems.filter(item => item.tags.includes('Panadería'));
  }, [filteredItems]);

  const ListView = () => (
    <div className="pt-4">
      {loading ? (
        <div className="px-4">
          <div className="bg-gray-300/50 h-8 w-1/2 rounded mb-3 animate-pulse"></div>
          <div className="flex space-x-4"><div className="bg-white/50 rounded-xl h-72 w-72 flex-shrink-0 animate-pulse" /><div className="bg-white/50 rounded-xl h-72 w-72 flex-shrink-0 animate-pulse" /></div>
        </div>
      ) : (
        <>
          <ItemsCarousel title="Recién Añadido" items={recentlyAddedItems} onItemSelected={navigateToDetail} onViewAll={() => navigateToAllItems('recent')} />
          <ItemsCarousel title="Cerca de Ti" items={nearbyItems} onItemSelected={navigateToDetail} onViewAll={() => navigateToAllItems('nearby')} />
          <ItemsCarousel title="Preparados" items={preparedItems} onItemSelected={navigateToDetail} onViewAll={() => navigateToAllItems('prepared')} />
          <ItemsCarousel title="Apunto de acabar" items={endingSoonItems} onItemSelected={navigateToDetail} onViewAll={() => navigateToAllItems('endingSoon')} />
          <ItemsCarousel title="Bollería y panadería" items={bakeryItems} onItemSelected={navigateToDetail} onViewAll={() => navigateToAllItems('bakery')} />
          
          {filteredItems.length === 0 && !loading && (
            <div className="text-center py-10 px-4">
              <p className="text-gray-600">No se encontraron resultados.</p>
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className="h-full flex flex-col">
        {/* Header */}
        <header className="p-4 bg-fondo-neutro/95 backdrop-blur-md border-b border-gray-200/80 sticky top-0 z-20">
            <div className="flex justify-between items-center mb-4">
                <EcotupperLogo className="h-8 w-auto" />
                <button onClick={navigateToSelectLocation} className="flex items-center text-sm font-semibold text-gray-700 hover:text-verde-med transition-colors">
                    <MapPinIcon className="w-5 h-5 text-gray-600 mr-1" />
                    {location}
                    <ChevronDownIcon className="w-4 h-4 ml-1" />
                </button>
            </div>
            <div className="flex gap-2">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Busca por plato o restaurante..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-verde-med focus:border-transparent transition-shadow bg-white"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </div>
                <div className="flex items-center bg-gray-200 rounded-full p-0.5">
                    <button onClick={() => setViewMode('list')} className={`p-2 rounded-full transition-colors ${viewMode === 'list' ? 'bg-white shadow' : 'text-gray-600'}`}>
                        <QueueListIcon className="w-5 h-5" />
                    </button>
                     <button onClick={() => setViewMode('map')} className={`p-2 rounded-full transition-colors ${viewMode === 'map' ? 'bg-white shadow' : 'text-gray-600'}`}>
                        <MapIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>

        {/* Content */}
        <div className="flex-grow overflow-y-auto">
            {viewMode === 'list' ? <ListView /> : <MapView items={filteredItems} navigateToDetail={navigateToDetail} />}
        </div>
    </div>
  );
};

export default HomeView;