import { useCartStore } from "@/store/cartStore";
import React from "react";

export default function Cart() {
  const { items, removeToCart, total } = useCartStore();
  return (
    <main>
      {items.map((i) => (
        <div key={i.id}>
          {i.name} ({i.quantity}) - ${i.price}
          <button onClick={() => removeToCart(i.id)}>X</button>
        </div>
      ))}
      <h3>Total: ${total()}</h3>
    </main>
  );
}
