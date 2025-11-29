"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

export default function Cart() {
  const { items, removeToCart, total, clear } = useCartStore();

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
          href="/filters"
        >
          Go to add products
        </Link>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-4 bg-gray-200 rounded-2xl md:mx-[20vw] justify-center px-8 py-5">
      <h2>Shopping cart</h2>
      {/* Lista de productos en el carro */}
      {items.map((i) => (
        <Link
          href={`/product/${i.id}`}
          key={i.id}
          className="hover:bg-gray-100 px-2 rounded-xl flex justify-between py-2"
        >
          {/* Div izquierdo */}
          <div className="flex gap-6 items-center">
            {/* Imagen */}
            <Image
              alt={i.name}
              className="rounded-xl object-cover w-[80px] md:w-[120px]"
              src={i.imageUrl}
              width={120}
              height={120}
            />
            {/* Informacion del producto */}
            <div className="flex flex-col text-[1.2rem]">
              {/* Nombre producto */}
              <h5>{i.name}</h5>
              {/* Cantidad y precio */}
              <p>
                {i.quantity} {i.quantity === 1 ? "unit" : "units"} × ${i.price}
              </p>
            </div>
          </div>
          {/* Boton de remover */}
          <button
            onClick={() => removeToCart(i.id)}
            className="bg-red-500 hover:bg-red-400 px-4 self-stretch rounded-xl text-white text-3xl flex items-center justify-center"
          >
            <MdDeleteForever />
          </button>
        </Link>
      ))}
      {/* Total a pagar */}
      <h5 className="text-center">Total to pay: ${total().toFixed(2)}</h5>
      {/* Boton de pagar y vaciar carrito */}
      <section className="flex gap-4">
        <button
          className="rounded-xl px-4 py-2 bg-red-500 hover:bg-red-400 text-white w-1/2"
          onClick={clear}
        >
          Clear cart
        </button>
        <Link
          href="/checkout"
          className="rounded-xl px-4 py-2 bg-primary hover:bg-primary-hover text-center text-white font-bold w-1/2"
        >
          Go to pay
        </Link>
      </section>
    </main>
  );
}
