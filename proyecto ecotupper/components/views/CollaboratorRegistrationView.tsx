import React, { useState } from 'react';
import { ArrowLeftIcon } from '../common/Icon';

interface CollaboratorRegistrationViewProps {
  onRegistrationComplete: () => void;
  navigateBack: () => void;
}

const InputField: React.FC<{
    id: string;
    label: string;
    value: string;
    onChange: (val: string) => void;
    placeholder: string;
    type?: string;
    required?: boolean;
}> = ({ id, label, value, onChange, placeholder, type = 'text', required = false }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            id={id}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-med focus:border-transparent transition"
        />
    </div>
);

const SelectField: React.FC<{
    id: string;
    label: string;
    value: string;
    onChange: (val: string) => void;
    options: string[];
    required?: boolean;
}> = ({ id, label, value, onChange, options, required = false }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <select
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-verde-med focus:border-transparent transition bg-white ${!value ? 'text-gray-500' : 'text-black'}`}
        >
            <option value="" disabled>Selecciona una opción</option>
            {options.map(opt => <option key={opt} value={opt} className="text-black">{opt}</option>)}
        </select>
    </div>
);

const CollaboratorRegistrationView: React.FC<CollaboratorRegistrationViewProps> = ({ onRegistrationComplete, navigateBack }) => {
    const [companyName, setCompanyName] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [cif, setCif] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const [bankAccount, setBankAccount] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    const businessTypeOptions = [
        "Buffet", "Bar", "Restaurante", "Comidas preparadas", "Verdulería", "Panadería", 
        "Hotel", "Catering", "Supermercado", "Comedores escolares", "Comedores universitarios", 
        "Mercados", "Carnicerías", "Frutería", "Pescadería", "Cafetería", "Gasolinera"
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (termsAccepted) {
            // Here you would typically send the data to your backend
            console.log({
                companyName, businessType, cif, email, phone, pickupTime, bankAccount
            });
            onRegistrationComplete();
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <header className="flex items-center p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
                <button onClick={navigateBack} className="p-2 mr-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
                </button>
                <h1 className="text-xl font-bold text-gray-800">Registro de Colaborador</h1>
            </header>

            <form className="p-4 space-y-6" onSubmit={handleSubmit}>
                <p className="text-gray-600">Completa tu perfil de empresa para empezar a vender excedentes.</p>
                
                <InputField id="companyName" label="Nombre de la empresa" value={companyName} onChange={setCompanyName} placeholder="Ej: Panadería Del Sol S.L." required />
                
                <SelectField id="businessType" label="Tipo de negocio" value={businessType} onChange={setBusinessType} options={businessTypeOptions} required />

                <InputField id="cif" label="CIF" value={cif} onChange={setCif} placeholder="B12345678" required />
                <InputField id="email" label="Email de contacto" value={email} onChange={setEmail} placeholder="contacto@empresa.com" type="email" required />
                <InputField id="phone" label="Teléfono de contacto" value={phone} onChange={setPhone} placeholder="600 123 456" type="tel" required />
                <InputField id="pickupTime" label="Horario de recogida" value={pickupTime} onChange={setPickupTime} placeholder="Ej: L-V de 17:00 a 19:00" required />
                <InputField id="bankAccount" label="Cuenta bancaria (IBAN)" value={bankAccount} onChange={setBankAccount} placeholder="ES00 0000 0000 00 0000000000" required />

                <div className="flex items-start">
                    <input
                        id="terms"
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="h-4 w-4 text-verde-med border-gray-300 rounded focus:ring-verde-med mt-1"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                        Acepto los <a href="#" className="font-medium text-verde-med hover:underline">términos y condiciones</a> y la <a href="#" className="font-medium text-verde-med hover:underline">política de privacidad</a>.
                    </label>
                </div>

                <button 
                    type="submit" 
                    disabled={!termsAccepted}
                    className="w-full bg-rojo-tomate text-white font-bold py-3 rounded-xl text-lg hover:bg-opacity-90 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-rojo-tomate/50 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                >
                    Registrar mi negocio
                </button>
            </form>
        </div>
    );
};

export default CollaboratorRegistrationView;