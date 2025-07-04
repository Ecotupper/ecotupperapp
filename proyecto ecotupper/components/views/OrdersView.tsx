import React, { useState, useEffect } from 'react';
import type { Order } from '../../types';
import { getOrders } from '../../services/mockApi';

interface OrdersViewProps {
  navigateToOrderDetail: (id: string) => void;
}

const OrderCard: React.FC<{ order: Order, onClick: () => void }> = ({ order, onClick }) => {
  const statusStyles = {
    active: { bg: 'bg-amarillo-suave/30', text: 'text-amber-800', label: 'Activo' },
    completed: { bg: 'bg-verde-med/20', text: 'text-verde-med', label: 'Completado' },
    cancelled: { bg: 'bg-rojo-tomate/20', text: 'text-rojo-tomate', label: 'Cancelado' },
  };
  const currentStatus = statusStyles[order.status];

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 flex space-x-4 hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <img src={order.item.imageUrl} alt={order.item.title} className="w-24 h-24 rounded-md object-cover" />
      <div className="flex-1">
        <div className="flex justify-between items-start">
            <h3 className="font-bold text-gray-800">{order.item.title}</h3>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${currentStatus.bg} ${currentStatus.text}`}>
                {currentStatus.label}
            </span>
        </div>
        <p className="text-sm text-gray-600">{order.item.seller.name}</p>
        <p className="text-sm text-gray-500 mt-1">Pedido el {new Date(order.purchaseDate).toLocaleDateString('es-ES')}</p>
        <p className="mt-2 font-bold text-verde-med text-lg">€{order.item.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

const OrdersView: React.FC<OrdersViewProps> = ({ navigateToOrderDetail }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            const data = await getOrders();
            setOrders(data);
            setLoading(false);
        };
        fetchOrders();
    }, []);

    return (
        <div className="p-4">
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Mis Pedidos</h1>
                <p className="text-gray-600">Aquí tienes un historial de tus rescates.</p>
            </header>
            
            {loading ? (
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white/50 rounded-lg h-32 animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.length > 0 ? (
                        orders.map(order => (
                            <OrderCard key={order.id} order={order} onClick={() => navigateToOrderDetail(order.id)} />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-10">Todavía no has rescatado ninguna comida.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default OrdersView;