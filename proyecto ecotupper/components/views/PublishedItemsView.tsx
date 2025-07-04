import React, { useState, useEffect } from 'react';
import { getItems } from '../../services/mockApi';
import type { SurplusItem } from '../../types';
import { ArrowLeftIcon } from '../common/Icon';

interface PublishedItemsViewProps {
  navigateBack: () => void;
}

const PublishedItemCard: React.FC<{ item: SurplusItem }> = ({ item }) => (
  <div className="bg-white p-3 rounded-lg border border-gray-200 flex space-x-3">
    <img src={item.imageUrl} alt={item.title} className="w-20 h-20 rounded-md object-cover" />
    <div className="flex-1">
      <h3 className="font-bold text-gray-800">{item.title}</h3>
      <p className="text-sm text-gray-500">{item.stock} unidad(es) restantes</p>
      <div className="flex items-center justify-between mt-2">
        <p className="font-bold text-verde-med text-base">€{item.price.toFixed(2)}</p>
        <button className="text-sm text-verde-med font-semibold hover:underline">Editar</button>
      </div>
    </div>
  </div>
);

const PublishedItemsView: React.FC<PublishedItemsViewProps> = ({ navigateBack }) => {
  const [items, setItems] = useState<SurplusItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      // In a real app, we would fetch items for the current collaborator
      const data = await getItems(); 
      setItems(data);
      setLoading(false);
    };
    fetchItems();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="flex items-center p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
        <button onClick={navigateBack} className="p-2 mr-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Mis Publicaciones</h1>
      </header>
      
      <div className="p-4 space-y-3">
        {loading ? (
            [...Array(4)].map((_, i) => (
                <div key={i} className="bg-white/50 rounded-lg h-28 animate-pulse"></div>
            ))
        ) : items.length > 0 ? (
          items.map(item => <PublishedItemCard key={item.id} item={item} />)
        ) : (
          <p className="text-center text-gray-500 py-10">No has publicado ningún excedente todavía.</p>
        )}
      </div>
    </div>
  );
};

export default PublishedItemsView;