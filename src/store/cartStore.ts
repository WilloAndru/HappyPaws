import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  buyNowItem: CartItem | null;

  addToCart: (item: CartItem) => void;
  removeToCart: (id: number) => void;

  setBuyNow: (item: CartItem) => void;

  clearCart: () => void;
  totalCart: () => number;
  totalBuyNow: () => number;
};

// Usamos zustand, una herramineta mas moderna que el clasico localstorage
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      buyNowItem: null,

      // CARRITO NORMAL
      addToCart: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),

      removeToCart: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      clearCart: () => set({ items: [] }),

      // COMPRA DIRECTA
      setBuyNow: (item) => set({ buyNowItem: item }),

      // TOTALES
      totalCart: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      totalBuyNow: () =>
        get().buyNowItem
          ? get().buyNowItem!.price * get().buyNowItem!.quantity
          : 0,
    }),
    { name: "cart-storage" }
  )
);
