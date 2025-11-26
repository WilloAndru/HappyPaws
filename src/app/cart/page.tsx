"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";

export default function Cart() {
  const { items, removeToCart, updateQty, total } = useCartStore();

  // Interfaz de carrito vacio
  if (items.length === 0) {
    return (
      <main className="flex flex-col items-center gap-12 justify-center mt-[20vh]">
        <div className="flex items-center gap-4">
          <FaShoppingCart className="text-5xl" />
          <h2>Your cart is empty</h2>
        </div>
        <Link
          className="text-white rounded-xl px-4 py-2 font-bold bg-primary hover:bg-primary-hover"
          href="/products"
        >
          Go to add products
        </Link>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-4 bg-gray-200 rounded-2xl mx-[10vw] justify-center text-start px-10 py-5">
      <h2>Shopping cart</h2>
      {/* Lista de productos en el carro */}
      {items.map((i) => (
        <section
          key={i.id}
          className="flex items-center justify-between w-full py-2"
        >
          {/* Div izquierdo */}
          <div className="flex gap-6 items-center">
            {/* Imagen */}
            <Image
              className="rounded-xl object-cover"
              src={i.imageUrl}
              width={150}
              height={150}
              alt={i.name}
            />
            {/* Informacion del producto */}
            <div className="flex flex-col">
              {/* Nombre producto */}
              <h6 className="font-medium text-gray-800">{i.name}</h6>
              {/* Cantidad y precio */}
              <p>
                {i.quantity} {i.quantity === 1 ? "unit" : "units"} × ${i.price}
              </p>
            </div>
          </div>
          {/* Div derecho */}
          <button
            onClick={() => removeToCart(i.id)}
            className="text-gray-400 hover:text-red-500 transition font-semibold text-lg"
            aria-label="Remove item"
          >
            ×
          </button>
        </section>
      ))}
      <h3>Total: ${total()}</h3>
    </main>
  );
}
