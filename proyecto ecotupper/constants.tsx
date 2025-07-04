import React from 'react';
import type { View } from './types';
import { HomeIcon, ListBulletIcon, PlusCircleIcon, UserCircleIcon, HeartIcon, ShoppingCartIcon } from './components/common/Icon';

interface NavItem {
  id: View;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const NAVIGATION_ITEMS: NavItem[] = [
  { id: 'home', label: 'Inicio', icon: HomeIcon },
  { id: 'orders', label: 'Mis Pedidos', icon: ListBulletIcon },
  { id: 'favorites', label: 'Favoritos', icon: HeartIcon },
  { id: 'cart', label: 'Carrito', icon: ShoppingCartIcon },
  { id: 'post', label: 'Publicar', icon: PlusCircleIcon },
  { id: 'profile', label: 'Perfil', icon: UserCircleIcon },
];