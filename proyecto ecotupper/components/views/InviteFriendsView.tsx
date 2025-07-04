import React from 'react';
import { ArrowLeftIcon } from '../common/Icon';

interface InviteFriendsViewProps {
  navigateBack: () => void;
}

const InviteFriendsView: React.FC<InviteFriendsViewProps> = ({ navigateBack }) => {
  const referralCode = 'ECO-ANA24';

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: '¡Únete a Ecotupper!',
        text: `¡Hola! Te invito a unirte a Ecotupper y rescatar comida deliciosa a precios increíbles. Usa mi código ${referralCode} y ayúdanos a combatir el desperdicio de alimentos.`,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(`¡Hola! Te invito a unirte a Ecotupper y rescatar comida deliciosa a precios increíbles. Usa mi código ${referralCode} y ayúdanos a combatir el desperdicio de alimentos.`);
      alert('¡Enlace de invitación copiado al portapapeles!');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="flex items-center p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
        <button onClick={navigateBack} className="p-2 mr-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Invita a tus Amigos</h1>
      </header>
      
      <div className="p-4 text-center">
        <div className="bg-white p-8 rounded-lg border border-gray-200 mt-4">
          <h2 className="text-lg font-semibold text-gray-800">¡Comparte y Gana!</h2>
          <p className="text-gray-600 mt-2">Invita a tus amigos a unirse a la comunidad Ecotupper. ¡Juntos podemos hacer una gran diferencia!</p>
          <div className="my-6">
            <p className="text-sm text-gray-500">Tu código de referido</p>
            <div className="mt-2 text-2xl font-bold text-verde-med bg-verde-med/10 border-2 border-dashed border-verde-med py-3 rounded-lg">
              {referralCode}
            </div>
          </div>
          <button 
            onClick={handleShare}
            className="w-full bg-rojo-tomate text-white font-bold py-3 rounded-xl text-lg hover:bg-opacity-90 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-rojo-tomate/50"
          >
            Compartir Invitación
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteFriendsView;
