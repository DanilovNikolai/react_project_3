// TypeScript
export type CartItemProps = {
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
  items: CartItemProps[];
}