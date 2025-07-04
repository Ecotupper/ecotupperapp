import React, { useState } from 'react';
import { ArrowLeftIcon } from '../common/Icon';

interface ContactSupportViewProps {
  navigateBack: () => void;
}

const ContactSupportView: React.FC<ContactSupportViewProps> = ({ navigateBack }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subject && message) {
      setIsSent(true);
    }
  };

  if (isSent) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <header className="flex items-center p-4 bg-white border-b border-gray-200">
            <button onClick={navigateBack} className="p-2 mr-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
              <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Contactar con Soporte</h1>
        </header>
        <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
          <h2 className="text-2xl font-bold text-verde-med">¡Mensaje enviado!</h2>
          <p className="text-gray-600 mt-2">Gracias por contactarnos. Nuestro equipo te responderá lo antes posible.</p>
          <button onClick={navigateBack} className="mt-6 bg-verde-med text-white font-bold py-3 px-8 rounded-xl text-lg hover:bg-opacity-90 transition-all">
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="flex items-center p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
        <button onClick={navigateBack} className="p-2 mr-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Contactar con Soporte</h1>
      </header>
      
      <form className="p-4 space-y-6" onSubmit={handleSubmit}>
        <p className="text-gray-600">¿Tienes alguna duda o problema? Envíanos un mensaje y te ayudaremos.</p>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Asunto</label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Ej: Problema con un pedido"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-med focus:border-transparent transition"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe tu consulta aquí..."
            rows={6}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-med focus:border-transparent transition"
          ></textarea>
        </div>

        <button type="submit" className="w-full bg-rojo-tomate text-white font-bold py-3 rounded-xl text-lg hover:bg-opacity-90 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-rojo-tomate/50">
          Enviar Mensaje
        </button>
      </form>
    </div>
  );
};

export default ContactSupportView;