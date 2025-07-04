import React, { useState } from 'react';
import { ArrowLeftIcon, MapPinIcon } from '../common/Icon';

interface SelectLocationViewProps {
  currentLocation: string;
  onSave: (newLocation: string) => void;
  navigateBack: () => void;
}

const cities = [
  { name: 'Madrid', top: '48%', left: '46%' },
  { name: 'Barcelona', top: '38%', left: '80%' },
  { name: 'Valencia', top: '55%', left: '72%' },
  { name: 'Sevilla', top: '78%', left: '30%' },
  { name: 'Zaragoza', top: '35%', left: '55%' },
  { name: 'Málaga', top: '88%', left: '40%' },
  { name: 'Bilbao', top: '22%', left: '52%' },
];


const SelectLocationView: React.FC<SelectLocationViewProps> = ({ currentLocation, onSave, navigateBack }) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleSave = () => {
    if (selectedCity) {
      onSave(selectedCity);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <header className="flex items-center p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
        <button onClick={navigateBack} className="p-2 mr-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Selecciona tu Ubicación</h1>
      </header>
      
      <div className="flex-grow flex flex-col p-4 space-y-4">
        <p className="text-gray-600 text-center">Selecciona tu ciudad en el mapa para continuar.</p>
        
        <div className="relative w-full aspect-[4/5] bg-blue-200/20 rounded-lg overflow-hidden border-2 border-verde-med/30">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Provinces_of_Spain_map-es.svg/800px-Provinces_of_Spain_map-es.svg.png" 
            alt="Mapa de España" 
            className="w-full h-full object-contain opacity-40"
          />
          {cities.map(city => (
            <button 
              key={city.name}
              onClick={() => setSelectedCity(city.name)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
              style={{ top: city.top, left: city.left }}
            >
              <MapPinIcon className={`w-8 h-8 drop-shadow-lg ${selectedCity === city.name ? 'text-rojo-tomate scale-125' : 'text-verde-med'}`} />
              <span className={`absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-bold whitespace-nowrap px-1.5 py-0.5 rounded ${selectedCity === city.name ? 'bg-rojo-tomate text-white' : 'bg-verde-med text-white'}`}>
                {city.name}
              </span>
            </button>
          ))}
        </div>

        <button 
          onClick={handleSave}
          disabled={!selectedCity}
          className="w-full bg-rojo-tomate text-white font-bold py-3 rounded-xl text-lg hover:bg-opacity-90 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-rojo-tomate/50 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
        >
          {selectedCity ? `Guardar ${selectedCity}` : 'Selecciona una ciudad'}
        </button>
      </div>
    </div>
  );
};

export default SelectLocationView;
