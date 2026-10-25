import { createContext } from 'react';

export interface CartLine {
  productId: string;
  quantity: number;
}

export interface CartValue {
  lines: CartLine[];
  /** Number of boxes in the cart (the header count). */
  count: number;
  add: (productId: string, quantity: number) => void;
}

export const CartContext = createContext<CartValue | null>(null);
