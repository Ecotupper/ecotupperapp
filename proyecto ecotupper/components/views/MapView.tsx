import React, { useState, useMemo } from 'react';
import type { SurplusItem } from '../../types';
import { MapPinIcon } from '../common/Icon';
import SurplusItemCard from '../SurplusItemCard';

interface MapViewProps {
  items: SurplusItem[];
  navigateToDetail: (id: number) => void;
}

// Simple projection function to convert lat/lng to x/y percentages.
// This is a basic simulation and would be replaced by a real map library.
const mapRange = (value: number, in_min: number, in_max: number, out_min: number, out_max: number): number => {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

const MADRID_BOUNDS = {
    lat: { min: 40.38, max: 40.47 },
    lng: { min: -3.75, max: -3.65 },
};

const MapView: React.FC<MapViewProps> = ({ items, navigateToDetail }) => {
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    const pins = useMemo(() => {
        return items.map(item => {
            const top = 100 - mapRange(item.location.lat, MADRID_BOUNDS.lat.min, MADRID_BOUNDS.lat.max, 5, 95);
            const left = mapRange(item.location.lng, MADRID_BOUNDS.lng.min, MADRID_BOUNDS.lng.max, 5, 95);
            return { ...item, top, left };
        });
    }, [items]);

    const selectedItem = useMemo(() => {
        return items.find(item => item.id === selectedItemId) || null;
    }, [items, selectedItemId]);

    return (
        <div className="relative w-full h-full bg-gray-200">
            {/* This would be a real map component */}
            <div className="w-full h-full bg-cover bg-center opacity-50" style={{backgroundImage: "url('https://www.google.com/maps/vt/data=Ay5GWBe_tAR_EETV3Jk1P7TzSm-qA-UqA_DqtnbaqBq0D1Pb0NaA1SxiX8L2qILrxdUK-T0r6y5k2Y2lB2iJkbyi2C-Xb1E')"}}></div>
            
            {pins.map(pin => (
                <button
                    key={pin.id}
                    className="absolute transform -translate-x-1/2 -translate-y-full transition-transform duration-300"
                    style={{ top: `${pin.top}%`, left: `${pin.left}%`, zIndex: selectedItemId === pin.id ? 10 : 1 }}
                    onClick={() => setSelectedItemId(pin.id)}
                >
                    <MapPinIcon className={`w-8 h-8 drop-shadow-lg ${selectedItemId === pin.id ? 'text-rojo-tomate scale-125' : 'text-verde-med'}`} />
                </button>
            ))}
            
            {selectedItem && (
                 <div className="absolute bottom-4 left-4 right-4 z-20 transition-transform duration-300 animate-slide-up">
                    <SurplusItemCard 
                        item={selectedItem} 
                        onClick={() => navigateToDetail(selectedItem.id)} 
                        variant="grid"
                    />
                </div>
            )}
        </div>
    );
};

export default MapView;
