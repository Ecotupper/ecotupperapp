import React from 'react';
import type { CartItem } from '../../types';
import { TrashIcon, ShoppingCartIcon } from '../common/Icon';

interface CartViewProps {
    cartItems: CartItem[];
    onQuantityChange: (itemId: number, newQuantity: number) => void;
    onRemoveItem: (itemId: number) => void;
    onCheckout: () => void;
    navigateToHome: () => void;
}

const CartItemRow: React.FC<{ item: CartItem; onQuantityChange: (id: number, q: number) => void; onRemove: (id: number) => void; }> = ({ item, onQuantityChange, onRemove }) => {
    return (
        <div className="flex items-center space-x-4 bg-white p-3 rounded-lg border border-gray-200">
            <img src={item.imageUrl} alt={item.title} className="w-20 h-20 rounded-md object-cover flex-shrink-0" />
            <div className="flex-grow">
                <h3 className="font-bold text-gray-800 leading-tight">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.seller.name}</p>
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                        <button onClick={() => onQuantityChange(item.id, item.quantity - 1)} className="w-7 h-7 bg-gray-200 rounded-full font-bold text-gray-700 hover:bg-gray-300">-</button>
                        <span className="font-bold w-6 text-center text-naranja-fuerte">{item.quantity}</span>
                        <button onClick={() => onQuantityChange(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock} className="w-7 h-7 bg-gray-200 rounded-full font-bold text-gray-700 hover:bg-gray-300 disabled:opacity-50">+</button>
                    </div>
                    <p className="font-bold text-lg text-verde-med">€{(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
            <button onClick={() => onRemove(item.id)} className="flex-shrink-0 p-2 text-gray-400 hover:text-rojo-tomate transition-colors">
                <TrashIcon className="w-5 h-5" />
            </button>
        </div>
    );
};


const CartView: React.FC<CartViewProps> = ({ cartItems, onQuantityChange, onRemoveItem, onCheckout, navigateToHome }) => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const serviceFee = 0.50; // Example service fee
    const total = subtotal + serviceFee;

    const handleCheckout = () => {
        alert('Compra finalizada con éxito. ¡Gracias por rescatar comida!');
        onCheckout();
        navigateToHome();
    };

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Mi Carrito</h1>
                <p className="text-gray-600">Revisa tu pedido antes de finalizar la compra.</p>
            </header>

            {cartItems.length > 0 ? (
                <div className="space-y-4">
                    <div className="space-y-3">
                        {cartItems.map(item => (
                            <CartItemRow key={item.id} item={item} onQuantityChange={onQuantityChange} onRemove={onRemoveItem} />
                        ))}
                    </div>

                    <div className="bg-white p-5 rounded-lg border border-gray-200">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-3">Resumen del Pedido</h2>
                        <div className="space-y-3 text-gray-700">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>€{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tarifa de servicio</span>
                                <span>€{serviceFee.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between pt-3 border-t font-bold text-gray-900 text-xl">
                                <span>Total</span>
                                <span>€{total.toFixed(2)}</span>
                            </div>
                        </div>
                         <button 
                            onClick={handleCheckout}
                            className="mt-6 w-full bg-rojo-tomate text-white font-bold py-3 rounded-xl text-lg hover:bg-opacity-90 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-rojo-tomate/50"
                        >
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center py-16 flex flex-col items-center">
                    <ShoppingCartIcon className="h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Tu carrito está vacío</h3>
                    <p className="mt-1 text-sm text-gray-500">¡Añade algunos packs para empezar a rescatar!</p>
                    <button onClick={navigateToHome} className="mt-6 bg-verde-med text-white font-bold py-3 px-8 rounded-xl text-lg hover:bg-opacity-90 transition-all">
                        Explorar
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartView;