export type FoodType = 'veg' | 'egg' | 'non-veg';

export type FoodBadge = 'Bestseller' | "Chef's Special" | 'New';

export type CuisineType = 'Indian' | 'Mughlai' | 'Chinese' | 'Tandoor' | 'Beverages';

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  type: FoodType;
  cuisine: CuisineType;
  description: string;
  price: number;
  badge?: FoodBadge;
  image: string;
  pieces?: string;
  portion?: 'Half' | 'Full' | 'Standard';
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phoneNumber: string;
  email?: string;
  orderType: 'Takeaway';
  specialInstructions?: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  createdAt: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  cuisine: CuisineType;
  iconName?: string;
  isAvailable: boolean;
  dishCount?: number;
}
