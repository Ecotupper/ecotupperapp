import React from 'react';
import type { UserRole, View } from '../../types';
import { 
    UserIcon, 
    CreditCardIcon, 
    ArchiveBoxIcon, 
    QuestionMarkCircleIcon, 
    EnvelopeIcon, 
    ChevronRightIcon,
    BuildingStorefrontIcon,
    UserGroupIcon,
    MegaphoneIcon,
    ClipboardDocumentListIcon
} from '../common/Icon';

interface ProfileViewProps {
    userRole: UserRole;
    setUserRole: (role: UserRole) => void;
    navigate: (view: View) => void;
    isCollaboratorRegistered: boolean;
}

const ProfileView: React.FC<ProfileViewProps> = ({ userRole, setUserRole, navigate, isCollaboratorRegistered }) => {

    const isCollaboratorView = userRole === 'collaborator';
    const toggleLabel = isCollaboratorView ? 'Cambiar a vista de Cliente' : 'Cambiar a vista de Colaborador';

    const handleToggle = () => {
        if (isCollaboratorView) {
            setUserRole('client');
        } else {
            if (isCollaboratorRegistered) {
                setUserRole('collaborator');
            } else {
                navigate('collaboratorRegistration');
            }
        }
    };

    const StatCard: React.FC<{ value: string, label: string, color: string }> = ({ value, label, color }) => (
        <div className={`p-4 rounded-lg shadow-sm ${color}`}>
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-sm text-white/90">{label}</p>
        </div>
    );
    
    const ProfileOption: React.FC<{ label: string, children: React.ReactNode, onClick?: () => void, disabled?: boolean }> = ({ label, children, onClick, disabled }) => (
        <button onClick={onClick} disabled={disabled} className={`w-full flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 transition-colors ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'}`}>
            <div className="flex items-center">
                {children}
                <span className="ml-4 text-gray-700 font-medium">{label}</span>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
        </button>
    );

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <header className="flex items-center space-x-4 mb-8">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" className="w-20 h-20 rounded-full border-4 border-white shadow-md" />
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Ana García</h1>
                    <p className="text-gray-500 mb-2">ana.garcia@email.com</p>
                    <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full shadow-sm ${
                        isCollaboratorView 
                        ? 'bg-verde-med text-white' 
                        : 'bg-naranja-fuerte text-white'
                    }`}>
                        Rol: {isCollaboratorView ? 'Colaborador' : 'Cliente'}
                    </span>
                </div>
            </header>

            <div className="mb-6">
                <label htmlFor="toggle" className="flex items-center cursor-pointer">
                    <div className="relative">
                        <input type="checkbox" id="toggle" className="sr-only" checked={isCollaboratorView} onChange={handleToggle} />
                        <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${isCollaboratorView ? 'translate-x-full !bg-verde-med' : ''}`}></div>
                    </div>
                    <div className="ml-3 text-gray-700 font-medium">
                        {toggleLabel}
                    </div>
                </label>
            </div>
            
            {isCollaboratorView && (
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-3">Panel de Colaborador</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       <StatCard value="12" label="Excedentes subidos" color="bg-naranja-fuerte" />
                       <StatCard value="€158" label="Ventas totales" color="bg-verde-med" />
                       <StatCard value="4.8 ★" label="Valoración media" color="bg-amarillo-suave" />
                    </div>
                </div>
            )}

            <div className="space-y-3">
                {isCollaboratorView && (
                    <div className="space-y-3">
                        <h2 className="text-lg font-semibold text-gray-700 px-2">Mi Negocio</h2>
                        <ProfileOption label="Mis Publicaciones" onClick={() => navigate('publishedItems')}>
                            <BuildingStorefrontIcon className="h-6 w-6 text-verde-med" />
                        </ProfileOption>
                    </div>
                )}
            
                <h2 className="text-lg font-semibold text-gray-700 px-2 pt-4">Mi Cuenta</h2>
                <ProfileOption label="Información Personal" onClick={() => navigate('personalInfo')}>
                     <UserIcon className="h-6 w-6 text-verde-med" />
                </ProfileOption>
                <ProfileOption label="Métodos de Pago" onClick={() => navigate('paymentMethods')}>
                     <CreditCardIcon className="h-6 w-6 text-verde-med" />
                </ProfileOption>
                <ProfileOption label="Pedidos Salvados" onClick={() => navigate('orders')}>
                    <ArchiveBoxIcon className="h-6 w-6 text-verde-med" />
                </ProfileOption>

                {!isCollaboratorView && (
                    <div className="space-y-3">
                        <h2 className="text-lg font-semibold text-gray-700 px-2 pt-4">Comunidad</h2>
                        <ProfileOption label="Invita a tus amigos" onClick={() => navigate('inviteFriends')}>
                            <UserGroupIcon className="h-6 w-6 text-verde-med" />
                        </ProfileOption>
                        <ProfileOption label="Recomiéndanos un establecimiento" onClick={() => navigate('recommendBusiness')}>
                            <MegaphoneIcon className="h-6 w-6 text-verde-med" />
                        </ProfileOption>
                        <ProfileOption label="Registrar establecimiento" onClick={() => navigate('collaboratorRegistration')}>
                            <ClipboardDocumentListIcon className="h-6 w-6 text-verde-med" />
                        </ProfileOption>
                    </div>
                )}


                <h2 className="text-lg font-semibold text-gray-700 px-2 pt-4">Ayuda</h2>
                 <ProfileOption label="Centro de Ayuda" onClick={() => navigate('helpCenter')}>
                    <QuestionMarkCircleIcon className="h-6 w-6 text-verde-med" />
                </ProfileOption>
                <ProfileOption label="Contactar con Soporte" onClick={() => navigate('contactSupport')}>
                    <EnvelopeIcon className="h-6 w-6 text-verde-med" />
                </ProfileOption>
            </div>
        </div>
    );
};

export default ProfileView;