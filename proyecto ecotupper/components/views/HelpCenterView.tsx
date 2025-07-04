import React, { useState } from 'react';
import { ArrowLeftIcon, ChevronDownIcon } from '../common/Icon';

interface HelpCenterViewProps {
  navigateBack: () => void;
}

const faqs = [
  { q: '¿Cómo funciona Ecotupper?', a: 'Ecotupper conecta a clientes con restaurantes y tiendas que tienen excedentes de comida. Puedes comprar comida deliciosa a un precio reducido y ayudar a combatir el desperdicio de alimentos.' },
  { q: '¿Cómo recojo mi pedido?', a: 'Una vez que reserves un pack, recibirás la dirección exacta del establecimiento y el horario de recogida. Simplemente ve a la tienda dentro del horario especificado, muestra tu confirmación de pedido en la app y recoge tu comida.' },
  { q: '¿Puedo cancelar un pedido?', a: 'Las políticas de cancelación dependen del establecimiento. Generalmente, los pedidos no son cancelables debido a la naturaleza de los productos perecederos. Consulta los detalles en la pantalla de tu pedido.' },
  { q: '¿Qué pasa si llego tarde a la recogida?', a: 'Es muy importante que llegues dentro del horario de recogida. Si llegas tarde, el establecimiento puede haber cerrado y podrías perder tu pack sin derecho a reembolso. ¡Planifica con antelación!' },
];

const AccordionItem: React.FC<{ q: string, a: string }> = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200 last:border-b-0">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left py-4 px-1">
                <span className="font-semibold text-gray-800">{q}</span>
                <ChevronDownIcon className={`w-5 h-5 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="pb-4 px-1 text-gray-600">
                    <p>{a}</p>
                </div>
            )}
        </div>
    );
}

const HelpCenterView: React.FC<HelpCenterViewProps> = ({ navigateBack }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="flex items-center p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
        <button onClick={navigateBack} className="p-2 mr-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Centro de Ayuda</h1>
      </header>
      
      <div className="p-4">
        <p className="text-gray-600 mb-4">Encuentra respuestas a las preguntas más frecuentes.</p>
        <div className="bg-white rounded-lg border border-gray-200 p-2">
            {faqs.map((faq, i) => (
                <AccordionItem key={i} q={faq.q} a={faq.a} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HelpCenterView;