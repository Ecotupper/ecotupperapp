import React, { useState, useEffect } from 'react';
import { getOrderById } from '../../services/mockApi';
import type { Order } from '../../types';
import { ArrowLeftIcon } from '../common/Icon';

interface OrderDetailViewProps {
  orderId: string;
  navigateBack: () => void;
}

const OrderDetailView: React.FC<OrderDetailViewProps> = ({ orderId, navigateBack }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      const data = await getOrderById(orderId);
      if (data) {
        setOrder(data);
      }
      setLoading(false);
    };
    fetchOrder();
  }, [orderId]);
  
  const statusStyles = {
    active: { bg: 'bg-amarillo-suave/30', text: 'text-amber-800', label: 'Activo' },
    completed: { bg: 'bg-verde-med/20', text: 'text-verde-med', label: 'Completado' },
    cancelled: { bg: 'bg-rojo-tomate/20', text: 'text-rojo-tomate', label: 'Cancelado' },
  };


  if (loading) {
    return (
        <div className="p-4 space-y-4 animate-pulse">
            <div className="flex items-center space-x-4 mb-4">
                <div className="bg-gray-300/50 h-8 w-8 rounded-full"></div>
                <div className="bg-gray-300/50 h-8 w-1/2 rounded"></div>
            </div>
            <div className="bg-white/50 p-4 rounded-lg h-32"></div>
            <div className="bg-white/50 p-4 rounded-lg h-48"></div>
        </div>
    );
  }

  if (!order) {
    return (
        <div className="p-4">
            <header className="flex items-center mb-6">
                <button onClick={navigateBack} className="p-2 mr-2 -ml-2 rounded-full hover:bg-gray-200 transition-colors">
                    <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
                </button>
                <h1 className="text-2xl font-bold text-gray-800">Detalle del Pedido</h1>
            </header>
            <p className="text-center text-gray-600 py-10">Pedido no encontrado.</p>
        </div>
    );
  }
  
  const currentStatus = statusStyles[order.status];

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="flex items-center p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
        <button onClick={navigateBack} className="p-2 mr-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Detalle del Pedido</h1>
      </header>
      
      <div className="p-4 space-y-6">
        {/* Order Summary Card */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex space-x-4">
          <img src={order.item.imageUrl} alt={order.item.title} className="w-24 h-24 rounded-md object-cover" />
          <div className="flex-1">
            <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-800 flex-1 pr-2">{order.item.title}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${currentStatus.bg} ${currentStatus.text}`}>
                    {currentStatus.label}
                </span>
            </div>
            <p className="text-sm text-gray-600">{order.item.seller.name}</p>
            <p className="text-sm text-gray-500 mt-1">Pedido el {new Date(order.purchaseDate).toLocaleDateString('es-ES')}</p>
            <p className="mt-2 font-bold text-verde-med text-lg">€{order.item.price.toFixed(2)}</p>
          </div>
        </div>

        {/* Invoice Card */}
        <div className="bg-white p-5 rounded-lg border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-3">Factura</h2>
            <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>€{order.invoice.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Tarifa de servicio</span>
                    <span>€{order.invoice.serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t font-bold text-gray-900">
                    <span>Total</span>
                    <span>€{order.invoice.total.toFixed(2)}</span>
                </div>
            </div>
        </div>
        
        {/* Help section */}
         <div className="text-center text-sm text-gray-500 pt-4">
            <p>¿Problemas con tu pedido?</p>
            <a href="#" className="text-verde-med font-semibold hover:underline">Contacta con Soporte</a>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailView;
