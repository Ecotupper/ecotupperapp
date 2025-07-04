export interface Seller {
  id: number;
  name: string;
  rating: number;
  reviewsCount: number;
}

export interface SurplusItem {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  pickupTime: string;
  imageUrl: string;
  distance: string;
  seller: Seller;
  tags: string[];
  dietaryInfo: string[];
  stock: number;
  location: {
    lat: number;
    lng: number;
  };
}

export interface CartItem extends SurplusItem {
    quantity: number;
}

export interface Invoice {
  subtotal: number;
  serviceFee: number;
  total: number;
}

export interface Order {
  id: string;
  item: SurplusItem;
  purchaseDate: string;
  status: 'active' | 'completed' | 'cancelled';
  invoice: Invoice;
}

export type View = 'home' | 'orders' | 'post' | 'profile' | 'detail' | 'orderDetail' | 'allitems' | 'favorites' | 'personalInfo' | 'paymentMethods' | 'helpCenter' | 'contactSupport' | 'publishedItems' | 'collaboratorRegistration' | 'inviteFriends' | 'recommendBusiness' | 'cart' | 'selectLocation';

export type ItemFilterType = 'recent' | 'nearby' | 'prepared' | 'endingSoon' | 'bakery';

export type UserRole = 'client' | 'collaborator';