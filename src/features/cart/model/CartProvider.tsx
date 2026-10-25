import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { readJson, writeJson } from '../../../shared/utils/storage';
import { CartContext, type CartLine } from './cartContext';

/**
 * Cart of the logged-in buyer, kept in the browser until the cart endpoint exists. Guests have no cart (AC-02.3):
 * the add button sends them to log in first.
 */
const STORAGE_KEY = 'moonkage.cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => readJson<CartLine[]>(STORAGE_KEY, []));

  const add = useCallback((productId: string, quantity: number) => {
    setLines((current) => {
      const existing = current.find((l) => l.productId === productId);
      const next = existing
        ? current.map((l) => (l.productId === productId ? { ...l, quantity: l.quantity + quantity } : l))
        : [...current, { productId, quantity }];
      writeJson(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ lines, count: lines.reduce((n, l) => n + l.quantity, 0), add }), [lines, add]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
