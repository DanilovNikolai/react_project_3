// TypeScript
export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  type: string;
  count: number;
};

// TypeScript
export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}