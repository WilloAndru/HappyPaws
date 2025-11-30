"use client";

import { useCartStore } from "@/store/cartStore";
import React from "react";

export default function Checkout() {
  const { state, items, buyNowItem } = useCartStore();
  const purchaseItems = state === "buyNow" ? [buyNowItem] : items;
  const totalCart = purchaseItems.reduce(
    (sum, item) => sum + item!.price * item!.quantity,
    0
  );

  return (
    <main className="grid gap-2 grid-cols-1 md:grid-cols-2">
      {/* Seccion de datos de los productos y total */}
      <section className="rounded-xl flex flex-col px-6 py-3 bg-gray-100 gap-3">
        {/* Total a pagar */}
        <div>
          <p>You have to pay</p>
          <h2>${totalCart}</h2>
        </div>
        {/* Informacion de los productos */}
        {purchaseItems.map((item) => (
          <section key={item!.id}>
            <h6>{item!.name}</h6>
            <div className="flex justify-between">
              <p>
                {item!.quantity} {item!.quantity === 1 ? "unit" : "units"}
              </p>
              <h6>${item!.price * item!.quantity}</h6>
            </div>
          </section>
        ))}
      </section>
      {/* Seccion de datos de domicilio y compra */}
      <section></section>
    </main>
  );
}
