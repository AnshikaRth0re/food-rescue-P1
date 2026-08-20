export type UserRole = 'guest' | 'donor' | 'ngo' | 'volunteer';

export type NavigationTab = 
  | 'home' 
  | 'available' 
  | 'donor-dashboard' 
  | 'volunteer-dashboard' 
  | 'donate' 
  | 'login' 
  | 'alerts' 
  | 'profile';

export type FoodCategory = 'All Food' | 'Produce' | 'Prepared Meals' | 'Bakery' | 'Pantry' | 'Dairy';

export interface FoodItem {
  id: string;
  title: string;
  donorName: string;
  donorType?: string;
  donorAvatar?: string;
  category: 'Produce' | 'Prepared Meals' | 'Bakery' | 'Pantry' | 'Dairy';
  quantity: string;
  location: string;
  distance: string;
  expiryTime: string;
  expiresInText: string;
  expiresInMinutes: number;
  imageUrl: string;
  isUrgent?: boolean;
  matchScore?: number;
  claimed: boolean;
  claimedBy?: string;
  status: 'Active' | 'Claimed' | 'Picked Up' | 'Delivered';
  createdAt: string;
  description?: string;
}

export interface DeliveryPickup {
  id: string;
  foodTitle: string;
  donorName: string;
  pickupAddress: string;
  deliveryNgo: string;
  deliveryAddress: string;
  status: 'accepted' | 'picked_up' | 'delivered';
  distance: string;
  isUrgent: boolean;
  mapImageUrl: string;
}

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  impactLevel: number;
  rescuedKg: number;
  completedDeliveries: number;
  distanceCoveredKm: number;
  totalDonations: number;
  activeDonationsCount: number;
}
