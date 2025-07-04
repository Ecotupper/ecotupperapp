import React, { useState } from 'react';
import { ArrowLeftIcon } from '../common/Icon';

interface RecommendBusinessViewProps {
  navigateBack: () => void;
}

const RecommendBusinessView: React.FC<RecommendBusinessViewProps> = ({ navigateBack }) => {
  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('');
  const [comments, setComments] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (businessName && location) {
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
            <h1 className="text-xl font-bold text-gray-800">Recomendar</h1>
        </header>
        <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
          <h2 className="text-2xl font-bold text-verde-med">¡Gracias por tu recomendación!</h2>
          <p className="text-gray-600 mt-2">Contactaremos con el establecimiento lo antes posible. ¡Tu ayuda es muy valiosa!</p>
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
        <h1 className="text-xl font-bold text-gray-800">Recomiéndanos un Establecimiento</h1>
      </header>
      
      <form className="p-4 space-y-6" onSubmit={handleSubmit}>
        <p className="text-gray-600">¿Conoces algún sitio que debería estar en Ecotupper? ¡Dínoslo!</p>
        
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">Nombre del establecimiento</label>
          <input
            id="businessName"
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Ej: Panadería Del Sol"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-med focus:border-transparent transition"
          />
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Ubicación (Dirección o barrio)</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ej: Calle Mayor, 12, Madrid"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-med focus:border-transparent transition"
          />
        </div>

        <div>
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">Comentarios (opcional)</label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Ej: Tienen pan y bollería increíble que a menudo sobra."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-med focus:border-transparent transition"
          ></textarea>
        </div>

        <button type="submit" className="w-full bg-rojo-tomate text-white font-bold py-3 rounded-xl text-lg hover:bg-opacity-90 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-rojo-tomate/50">
          Enviar Recomendación
        </button>
      </form>
    </div>
  );
};

export default RecommendBusinessView;
