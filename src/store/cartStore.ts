import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
};

type PurchaseMode = "cart" | "buyNow";

type CartStore = {
  items: CartItem[];
  buyNowItem: CartItem | null;
  state: PurchaseMode;
  setState: (mode: PurchaseMode) => void;
  addToCart: (item: CartItem) => void;
  removeToCart: (id: number) => void;
  setBuyNow: (item: CartItem) => void;
  clearCart: () => void;
  totalBuyNow: () => number;
};

// Usamos zustand, una herramineta mas moderna que el clasico localstorage
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      buyNowItem: null,
      state: "cart",

      // Cambiar estado de compra
      setState: (mode) =>
        set(() => ({
          state: mode,
        })),

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

      totalBuyNow: () =>
        get().buyNowItem
          ? get().buyNowItem!.price * get().buyNowItem!.quantity
          : 0,
    }),
    { name: "cart-storage" }
  )
);
