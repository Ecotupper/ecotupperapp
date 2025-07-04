import type { SurplusItem, Order } from '../types';

const sellers = {
  1: { id: 1, name: 'Panadería Del Sol', rating: 4.8, reviewsCount: 134 },
  2: { id: 2, name: 'Sushi Go!', rating: 4.9, reviewsCount: 250 },
  3: { id: 3, name: 'Verduras Frescas & Co.', rating: 4.6, reviewsCount: 88 },
  4: { id: 4, name: 'Café El Rincón', rating: 4.7, reviewsCount: 95 },
  5: { id: 5, name: 'Gourmet Express', rating: 4.8, reviewsCount: 112 },
};

const mockItems: SurplusItem[] = [
  {
    id: 1,
    title: 'Pack de 3 Croissants de Mantequilla',
    description: 'Deliciosos croissants recién horneados esta mañana. Perfectos para el desayuno o la merienda.',
    price: 2.50,
    originalPrice: 7.50,
    pickupTime: 'Recoger antes de las 18:00',
    imageUrl: 'https://picsum.photos/seed/croissant/600/400',
    distance: '0.5 km',
    seller: sellers[1],
    tags: ['Panadería', 'Desayuno'],
    dietaryInfo: [],
    stock: 1,
    location: { lat: 40.4167, lng: -3.7032 },
  },
  {
    id: 2,
    title: 'Maki Box (16 piezas)',
    description: 'Selección variada de makis de salmón, atún y aguacate. Preparado hoy con pescado fresco.',
    price: 6.00,
    originalPrice: 15.00,
    pickupTime: 'Recoger antes de las 21:30',
    imageUrl: 'https://picsum.photos/seed/sushi/600/400',
    distance: '1.2 km',
    seller: sellers[2],
    tags: ['Japonés', 'Pescado', 'Comida preparada'],
    dietaryInfo: [],
    stock: 5,
    location: { lat: 40.4203, lng: -3.7058 },
  },
  {
    id: 3,
    title: 'Caja de Verduras Orgánicas',
    description: 'Mix de verduras de temporada: tomates, pepinos, pimientos y lechuga. Todo orgánico y local.',
    price: 4.50,
    originalPrice: 12.00,
    pickupTime: 'Recoger antes de las 13:20',
    imageUrl: 'https://picsum.photos/seed/vegetables/600/400',
    distance: '2.1 km',
    seller: sellers[3],
    tags: ['Vegano', 'Sin Gluten', 'Saludable'],
    dietaryInfo: ['Vegano', 'Sin Gluten'],
    stock: 1,
    location: { lat: 40.4100, lng: -3.7010 },
  },
  {
    id: 4,
    title: '2 porciones de Tarta de Zanahoria',
    description: 'Nuestra famosa tarta de zanahoria casera con frosting de queso crema. ¡Irresistible!',
    price: 3.00,
    originalPrice: 8.00,
    pickupTime: 'Recoger antes de las 19:00',
    imageUrl: 'https://picsum.photos/seed/cake/600/400',
    distance: '0.8 km',
    seller: sellers[4],
    tags: ['Postre', 'Dulce', 'Panadería'],
    dietaryInfo: [],
    stock: 4,
    location: { lat: 40.4240, lng: -3.7080 },
  },
   {
    id: 5,
    title: 'Sopa de Lentejas Casera (1L)',
    description: 'Sopa de lentejas nutritiva y reconfortante, como la de la abuela. Ideal para una comida completa.',
    price: 3.50,
    originalPrice: 9.00,
    pickupTime: 'Recoger antes de las 15:00',
    imageUrl: 'https://picsum.photos/seed/soup/600/400',
    distance: '1.5 km',
    seller: sellers[1],
    tags: ['Comida casera', 'Vegano', 'Comida preparada'],
    dietaryInfo: ['Vegano'],
    stock: 1,
    location: { lat: 40.4230, lng: -3.6980 },
  },
  {
    id: 6,
    title: 'Hogaza de Pan de Pueblo',
    description: 'Pan de masa madre con corteza crujiente e interior esponjoso. Hecho en horno de leña.',
    price: 2.00,
    originalPrice: 4.50,
    pickupTime: 'Recoger antes de las 14:00',
    imageUrl: 'https://picsum.photos/seed/bread/600/400',
    distance: '0.6 km',
    seller: sellers[1],
    tags: ['Panadería', 'Artesano'],
    dietaryInfo: ['Vegano'],
    stock: 3,
    location: { lat: 40.4150, lng: -3.7040 },
  },
  {
    id: 7,
    title: 'Ensalada César con Pollo',
    description: 'Ensalada completa con pollo a la parrilla, croutons, parmesano y nuestra salsa César especial.',
    price: 4.00,
    originalPrice: 9.50,
    pickupTime: 'Recoger antes de las 16:00',
    imageUrl: 'https://picsum.photos/seed/salad/600/400',
    distance: '1.8 km',
    seller: sellers[5],
    tags: ['Ensalada', 'Saludable', 'Comida preparada'],
    dietaryInfo: [],
    stock: 2,
    location: { lat: 40.4180, lng: -3.7100 },
  },
];

const mockOrders: Order[] = [
    { id: 'ORD001', item: mockItems[1], purchaseDate: '2024-07-29', status: 'completed', invoice: { subtotal: 6.00, serviceFee: 0.50, total: 6.50 } },
    { id: 'ORD002', item: mockItems[3], purchaseDate: '2024-07-30', status: 'active', invoice: { subtotal: 4.50, serviceFee: 0.50, total: 5.00 } },
    { id: 'ORD003', item: mockItems[0], purchaseDate: '2024-07-28', status: 'cancelled', invoice: { subtotal: 2.50, serviceFee: 0.50, total: 3.00 } },
];

export const getItems = async (): Promise<SurplusItem[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockItems), 500));
};

export const getItemById = async (id: number): Promise<SurplusItem | undefined> => {
  return new Promise(resolve => setTimeout(() => resolve(mockItems.find(item => item.id === id)), 300));
};

export const getOrders = async (): Promise<Order[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockOrders), 400));
};

export const getOrderById = async (id: string): Promise<Order | undefined> => {
    return new Promise(resolve => setTimeout(() => resolve(mockOrders.find(order => order.id === id)), 300));
};