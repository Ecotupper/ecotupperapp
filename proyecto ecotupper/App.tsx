import React, { useState, useCallback } from 'react';
import type { View, UserRole, ItemFilterType, CartItem, SurplusItem } from './types';
import HomeView from './components/views/HomeView';
import OrdersView from './components/views/OrdersView';
import PostItemView from './components/views/PostItemView';
import ProfileView from './components/views/ProfileView';
import ItemDetailView from './components/views/ItemDetailView';
import BottomNav from './components/layout/BottomNav';
import OrderDetailView from './components/views/OrderDetailView';
import AllItemsView from './components/views/AllItemsView';
import FavoritesView from './components/views/FavoritesView';
import PersonalInfoView from './components/views/PersonalInfoView';
import PaymentMethodsView from './components/views/PaymentMethodsView';
import HelpCenterView from './components/views/HelpCenterView';
import ContactSupportView from './components/views/ContactSupportView';
import PublishedItemsView from './components/views/PublishedItemsView';
import CollaboratorRegistrationView from './components/views/CollaboratorRegistrationView';
import InviteFriendsView from './components/views/InviteFriendsView';
import RecommendBusinessView from './components/views/RecommendBusinessView';
import CartView from './components/views/CartView';
import SelectLocationView from './components/views/SelectLocationView';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [activeItemId, setActiveItemId] = useState<number | null>(null);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('client');
  const [activeFilterType, setActiveFilterType] = useState<ItemFilterType | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set([2, 4]));
  const [isCollaboratorRegistered, setIsCollaboratorRegistered] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [location, setLocation] = useState<string>('Madrid Centro');
  const [lastView, setLastView] = useState<View>('home');

  const navigate = useCallback((newView: View, payload: number | string | ItemFilterType | null = null) => {
    window.scrollTo(0, 0);
    setLastView(view);
    setView(newView);
    
    if (newView !== 'detail') setActiveItemId(null);
    if (newView !== 'orderDetail') setActiveOrderId(null);
    if (newView !== 'allitems') setActiveFilterType(null);

    if (payload !== null) {
      if (newView === 'detail' && typeof payload === 'number') {
        setActiveItemId(payload);
      } else if (newView === 'orderDetail' && typeof payload === 'string') {
        setActiveOrderId(payload);
      } else if (newView === 'allitems' && typeof payload === 'string') {
         const validFilters: ItemFilterType[] = ['recent', 'nearby', 'prepared', 'endingSoon', 'bakery'];
         if(validFilters.includes(payload as ItemFilterType)) {
            setActiveFilterType(payload as ItemFilterType);
         }
      }
    }
  }, [view]);
  
  const toggleFavorite = useCallback((itemId: number) => {
    setFavoriteIds(prevIds => {
      const newIds = new Set(prevIds);
      if (newIds.has(itemId)) {
        newIds.delete(itemId);
      } else {
        newIds.add(itemId);
      }
      return newIds;
    });
  }, []);

  const addToCart = useCallback((item: SurplusItem, quantity: number) => {
    setCart(prevCart => {
        const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
        if (existingItemIndex > -1) {
            const updatedCart = [...prevCart];
            updatedCart[existingItemIndex].quantity += quantity;
            return updatedCart;
        } else {
            return [...prevCart, { ...item, quantity }];
        }
    });
  }, []);

  const updateCartQuantity = useCallback((itemId: number, newQuantity: number) => {
    setCart(prevCart => {
        if (newQuantity <= 0) {
            return prevCart.filter(item => item.id !== itemId);
        }
        return prevCart.map(item => 
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
    });
  }, []);

  const removeCartItem = useCallback((itemId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  }, []);
  
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);


  const handleCollaboratorRegistration = () => {
    setIsCollaboratorRegistered(true);
    setUserRole('collaborator');
    navigate('profile');
  };

  const handleLocationSave = (newLocation: string) => {
    if (newLocation.trim()) {
      setLocation(newLocation.trim());
    }
    navigate('home');
  };

  const renderView = () => {
    const homeViewProps = {
      navigateToDetail: (id: number) => navigate('detail', id),
      navigateToAllItems: (filter: ItemFilterType) => navigate('allitems', filter),
      location: location,
      navigateToSelectLocation: () => navigate('selectLocation')
    };

    switch (view) {
      case 'home':
        return <HomeView {...homeViewProps} />;
      case 'orders':
        return <OrdersView navigateToOrderDetail={(id) => navigate('orderDetail', id)} />;
      case 'favorites':
        return <FavoritesView favoriteIds={Array.from(favoriteIds)} navigateToDetail={(id) => navigate('detail', id)} />;
      case 'post':
        return <PostItemView />;
      case 'profile':
        return <ProfileView userRole={userRole} setUserRole={setUserRole} navigate={(v) => navigate(v)} isCollaboratorRegistered={isCollaboratorRegistered} />;
      case 'detail':
        return activeItemId ? <ItemDetailView itemId={activeItemId} navigateBack={() => navigate(lastView)} favoriteIds={favoriteIds} toggleFavorite={toggleFavorite} addToCart={addToCart} /> : <HomeView {...homeViewProps} />;
      case 'orderDetail':
        return activeOrderId ? <OrderDetailView orderId={activeOrderId} navigateBack={() => navigate('orders')} /> : <OrdersView navigateToOrderDetail={(id) => navigate('orderDetail', id)} />;
      case 'allitems':
        return activeFilterType ? <AllItemsView filterType={activeFilterType} navigateToDetail={(id) => navigate('detail', id)} navigateBack={() => navigate('home')} /> : <HomeView {...homeViewProps} />;
      case 'cart':
        return <CartView cartItems={cart} onQuantityChange={updateCartQuantity} onRemoveItem={removeCartItem} onCheckout={clearCart} navigateToHome={() => navigate('home')} />;
      case 'selectLocation':
        return <SelectLocationView currentLocation={location} onSave={handleLocationSave} navigateBack={() => navigate('home')} />;
      case 'personalInfo':
        return <PersonalInfoView navigateBack={() => navigate('profile')} />;
      case 'paymentMethods':
        return <PaymentMethodsView navigateBack={() => navigate('profile')} />;
      case 'helpCenter':
        return <HelpCenterView navigateBack={() => navigate('profile')} />;
      case 'contactSupport':
        return <ContactSupportView navigateBack={() => navigate('profile')} />;
      case 'publishedItems':
        return <PublishedItemsView navigateBack={() => navigate('profile')} />;
      case 'collaboratorRegistration':
        return <CollaboratorRegistrationView onRegistrationComplete={handleCollaboratorRegistration} navigateBack={() => navigate('profile')} />;
      
      case 'inviteFriends':
        return <InviteFriendsView navigateBack={() => navigate('profile')} />;
      case 'recommendBusiness':
        return <RecommendBusinessView navigateBack={() => navigate('profile')} />;

      default:
        return <HomeView {...homeViewProps} />;
    }
  };

  return (
    <div className="bg-fondo-neutro min-h-screen font-sans">
      <div className="max-w-md mx-auto bg-fondo-neutro shadow-lg min-h-screen">
        <main className="pb-24">
          {renderView()}
        </main>
        <BottomNav currentView={view} setView={(v) => navigate(v)} userRole={userRole} cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
      </div>
    </div>
  );
};

export default App;