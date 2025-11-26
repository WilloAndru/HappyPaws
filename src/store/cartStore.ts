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
  addToCart: (item: CartItem) => void;
  removeToCart: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clear: () => void;
  total: () => number;
};

// Usamos zustand, una herramineta mas moderna que el clasico localstorage
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      // Funcion para agregar item al carro
      addToCart: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),

      // Funcion para remover item
      removeToCart: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      // Funcion para actualizar cantidad
      updateQty: (id, qty) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: qty } : i
          ),
        })),

      // Eliminamos todos los items del carrito
      clear: () => set({ items: [] }),

      // Hallamos el total del coste de todos los items
      total: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: "cart-storage" }
  )
);
