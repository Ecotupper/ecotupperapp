import React, { useState, useEffect } from 'react';
import { getItems } from '../../services/mockApi';
import type { SurplusItem } from '../../types';
import SurplusItemCard from '../SurplusItemCard';
import { HeartIcon } from '../common/Icon';

interface FavoritesViewProps {
  favoriteIds: number[];
  navigateToDetail: (id: number) => void;
}

const FavoritesView: React.FC<FavoritesViewProps> = ({ favoriteIds, navigateToDetail }) => {
  const [allItems, setAllItems] = useState<SurplusItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const data = await getItems();
      setAllItems(data);
      setLoading(false);
    };
    fetchItems();
  }, []);

  const favoriteItems = allItems.filter(item => favoriteIds.includes(item.id));

  return (
    <div className="p-4 min-h-screen">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mis Favoritos</h1>
        <p className="text-gray-600">Tus packs preferidos, guardados para ti.</p>
      </header>

      {loading ? (
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white/50 rounded-xl shadow-md h-64 animate-pulse w-full" />
          ))}
        </div>
      ) : favoriteItems.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {favoriteItems.map(item => (
            <SurplusItemCard key={item.id} item={item} onClick={() => navigateToDetail(item.id)} variant="grid" />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 flex flex-col items-center">
          <HeartIcon className="h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Sin favoritos</h3>
          <p className="mt-1 text-sm text-gray-500">Pulsa el corazón en un producto para guardarlo aquí.</p>
        </div>
      )}
    </div>
  );
};

export default FavoritesView;