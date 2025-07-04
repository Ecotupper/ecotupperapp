import React, { useState, useEffect } from 'react';
import { getItemById } from '../../services/mockApi';
import type { SurplusItem } from '../../types';
import { ArrowLeftIcon, StarIcon, HeartIcon } from '../common/Icon';

interface ItemDetailViewProps {
  itemId: number;
  navigateBack: () => void;
  favoriteIds: Set<number>;
  toggleFavorite: (id: number) => void;
  addToCart: (item: SurplusItem, quantity: number) => void;
}

const ItemDetailView: React.FC<ItemDetailViewProps> = ({ itemId, navigateBack, favoriteIds, toggleFavorite, addToCart }) => {
  const [item, setItem] = useState<SurplusItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      const data = await getItemById(itemId);
      if (data) {
        setItem(data);
      }
      setQuantity(1); // Reset quantity on new item
      setAddedToCart(false); // Reset added to cart status
      setLoading(false);
    };
    fetchItem();
  }, [itemId]);

  const handleQuantityChange = (newQuantity: number) => {
    if (item && newQuantity >= 1 && newQuantity <= item.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (item) {
        addToCart(item, quantity);
        setAddedToCart(true);
        setTimeout(() => {
            setAddedToCart(false);
        }, 2000); // Reset after 2 seconds
    }
  };
  
  if (loading) {
    return (
        <div className="p-4 space-y-4">
            <div className="bg-gray-300/50 h-60 w-full rounded-lg animate-pulse"></div>
            <div className="bg-gray-300/50 h-8 w-3/4 rounded animate-pulse"></div>
            <div className="bg-gray-300/50 h-6 w-1/2 rounded animate-pulse"></div>
            <div className="space-y-2">
                <div className="bg-gray-300/50 h-4 w-full rounded animate-pulse"></div>
                <div className="bg-gray-300/50 h-4 w-full rounded animate-pulse"></div>
                <div className="bg-gray-300/50 h-4 w-5/6 rounded animate-pulse"></div>
            </div>
        </div>
    );
  }

  if (!item) {
    return <div className="p-4 text-center text-gray-600">Producto no encontrado.</div>;
  }
  
  const isFavorite = favoriteIds.has(item.id);
  const totalPrice = item.price * quantity;

  return (
    <div className="bg-white">
      <div className="relative">
        <img src={item.imageUrl} alt={item.title} className="w-full h-60 object-cover" />
        <button onClick={navigateBack} className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-800 hover:bg-white/90 transition-colors">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <button 
          onClick={() => toggleFavorite(item.id)} 
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full text-rojo-tomate hover:bg-white/90 transition-colors"
        >
          <HeartIcon className="w-6 h-6" filled={isFavorite} />
        </button>
      </div>

      <div className="p-5">
        <h1 className="text-3xl font-bold text-gray-900">{item.title}</h1>
        <div className="mt-2 flex items-center justify-between">
            <p className="text-gray-700 text-lg">{item.seller.name}</p>
            <div className="flex items-center text-sm">
                <StarIcon className="w-5 h-5 text-amarillo-suave mr-1" />
                <span className="font-bold">{item.seller.rating}</span>
                <span className="text-gray-600 ml-1">({item.seller.reviewsCount})</span>
            </div>
        </div>
        
        <p className="mt-4 text-gray-600 leading-relaxed">{item.description}</p>

        <div className="mt-6 space-y-3">
          <div className="flex items-center">
            <span className="font-semibold w-24 text-gray-800">Recogida:</span>
            <span className="text-verde-med font-bold bg-verde-med/20 px-3 py-1 rounded-full text-sm">{item.pickupTime}</span>
          </div>
          {item.dietaryInfo.length > 0 && (
            <div className="flex items-start">
              <span className="font-semibold w-24 mt-1 text-gray-800">Etiquetas:</span>
              <div className="flex flex-wrap gap-2">
                {item.dietaryInfo.map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm border border-gray-200">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {item.stock > 1 && (
          <div className="mt-6">
            <label className="block text-lg font-semibold text-gray-800 mb-2">Cantidad</label>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="w-10 h-10 bg-gray-200 rounded-full text-2xl font-bold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
              >
                -
              </button>
              <span className="text-xl font-bold w-12 text-center text-naranja-fuerte">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= item.stock}
                className="w-10 h-10 bg-gray-200 rounded-full text-2xl font-bold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
              >
                +
              </button>
              <span className="text-sm text-gray-500">
                ({item.stock} disponibles)
              </span>
            </div>
          </div>
        )}
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
             <div>
                <p className="text-sm text-gray-500">Total a pagar</p>
                <p className="text-4xl font-extrabold text-verde-med">€{totalPrice.toFixed(2)}</p>
             </div>
             <p className="text-lg text-gray-500 line-through">€{(item.originalPrice * quantity).toFixed(2)}</p>
          </div>
          <button 
            onClick={handleAddToCart}
            disabled={addedToCart}
            className={`mt-4 w-full text-white font-bold py-4 rounded-xl text-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-4 ${
              addedToCart
                ? 'bg-verde-med focus:ring-verde-med/50'
                : 'bg-rojo-tomate hover:bg-opacity-90 focus:ring-rojo-tomate/50'
            }`}
          >
            {addedToCart ? '¡Añadido!' : `Añadir (${quantity}) al Carrito`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailView;