import React from 'react';
import { ArrowLeftIcon } from '../common/Icon';

interface PersonalInfoViewProps {
  navigateBack: () => void;
}

const PersonalInfoView: React.FC<PersonalInfoViewProps> = ({ navigateBack }) => {
  const userInfo = {
    name: 'Ana García',
    email: 'ana.garcia@email.com',
    phone: '+34 612 345 678',
    joined: '25 de Julio, 2024'
  };

  const InfoField: React.FC<{ label: string, value: string }> = ({ label, value }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-medium text-gray-800">{value}</p>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="flex items-center p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
        <button onClick={navigateBack} className="p-2 mr-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Información Personal</h1>
      </header>
      
      <div className="p-4 space-y-4">
        <InfoField label="Nombre Completo" value={userInfo.name} />
        <InfoField label="Correo Electrónico" value={userInfo.email} />
        <InfoField label="Teléfono" value={userInfo.phone} />
        <InfoField label="Miembro desde" value={userInfo.joined} />

        <div className="pt-4">
           <button className="w-full bg-verde-med text-white font-bold py-3 rounded-xl text-lg hover:bg-opacity-90 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-verde-med/50">
            Editar Información
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoView;