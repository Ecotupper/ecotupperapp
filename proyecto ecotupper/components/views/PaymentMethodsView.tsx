import React from 'react';
import { ArrowLeftIcon, CreditCardIcon, PlusCircleIcon } from '../common/Icon';

interface PaymentMethodsViewProps {
  navigateBack: () => void;
}

const PaymentMethodsView: React.FC<PaymentMethodsViewProps> = ({ navigateBack }) => {

  const Card: React.FC<{ brand: string, last4: string, expiry: string }> = ({ brand, last4, expiry }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
            <CreditCardIcon className="w-8 h-8 text-verde-med" />
            <div className="ml-4">
                <p className="font-semibold text-gray-800">{brand} terminada en {last4}</p>
                <p className="text-sm text-gray-500">Expira {expiry}</p>
            </div>
        </div>
        <button className="text-sm text-rojo-tomate font-semibold hover:underline">Eliminar</button>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="flex items-center p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
        <button onClick={navigateBack} className="p-2 mr-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Métodos de Pago</h1>
      </header>
      
      <div className="p-4 space-y-4">
        <p className="text-sm text-gray-600">Aquí puedes gestionar tus métodos de pago guardados.</p>
        
        <Card brand="Visa" last4="4242" expiry="12/26" />
        <Card brand="Mastercard" last4="5588" expiry="08/25" />

        <button className="w-full flex items-center justify-center gap-2 mt-4 px-4 py-3 border-2 border-dashed border-gray-300 text-gray-600 font-semibold rounded-lg hover:bg-gray-100 hover:border-gray-400 transition">
            <PlusCircleIcon className="w-6 h-6" />
            Añadir nuevo método de pago
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodsView;