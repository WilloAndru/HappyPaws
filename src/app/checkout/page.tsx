"use client";

import { Select } from "@/components/Select";
import { useAuth } from "@/context/AuthContext";
import { useCartStore } from "@/store/cartStore";
import React, { useEffect, useState } from "react";
import { FaStripe } from "react-icons/fa";
import axios from "axios";

export default function Checkout() {
  const { user } = useAuth();
  const { state, items, buyNowItem } = useCartStore();
  const purchaseItems = state === "buyNow" ? [buyNowItem] : items;
  const totalCart = purchaseItems
    .reduce((sum, item) => sum + item!.price * item!.quantity, 0)
    .toFixed(2);

  // Logica para manejar que datos de domicilio se muestran
  const addressOptions =
    user?.addresses.map((a, i) => ({
      value: i,
      label: a.name,
    })) || [];
  const [addressSelected, setAddressSelected] = useState<any>(null);
  useEffect(() => {
    if (addressOptions.length && !addressSelected) {
      setAddressSelected(addressOptions[0]);
    }
  }, [addressOptions]);

  // Funcion para pagar en stripe
  async function handleCheckout() {
    try {
      const response = await axios.post("/api/stripe", {
        items: purchaseItems,
        mode: "buy",
      });

      const { url } = response.data;

      if (!url) {
        throw new Error("Stripe did not return a checkout URL");
      }

      window.location.href = url;
    } catch (err: any) {
      console.error("Stripe error:", err?.response?.data || err.message);
      alert("Payment failed. Please try again.");
    }
  }

  return (
    <main className="grid gap-4 grid-cols-1 md:grid-cols-2">
      {/* Seccion de datos de los productos y total */}
      <section className="rounded-xl flex flex-col px-6 py-3 bg-gray-100 gap-3 h-fit">
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
              <h6>${(item!.price * item!.quantity).toFixed(2)}</h6>
            </div>
          </section>
        ))}
      </section>
      {/* Seccion de datos de domicilio y compra */}
      <section className="rounded-xl flex flex-col px-6 py-3 bg-gray-100 gap-3">
        {/* Titulo */}
        <div>
          <h2>Payment</h2>
          <p>To complete your purchase, please verify your shipping details.</p>
        </div>
        {/* Seccion para cambiar a la direccion a enviar el productos */}
        {(user?.addresses?.length ?? 0) > 0 && (
          <div>
            <p>Select an address</p>
            <Select
              options={addressOptions}
              value={addressSelected}
              onChange={setAddressSelected}
            />
          </div>
        )}
        {/* Datos de direccion seleccionada */}
        <div className="flex flex-col gap-2">
          {/* Pais */}
          <div className="flex flex-col gap-1">
            <h6>Country</h6>
            <p>{user?.addresses[addressSelected?.value]?.country}</p>
          </div>
          {/* Ciudad */}
          <div className="flex flex-col gap-1">
            <h6>City</h6>
            <p>{user?.addresses[addressSelected?.value]?.city}</p>
          </div>
          {/* Direccion */}
          <div className="flex flex-col gap-1">
            <h6>Address</h6>
            <p>{user?.addresses[addressSelected?.value]?.address}</p>
          </div>
        </div>
        {/* Boton de compra */}
        <button
          onClick={handleCheckout}
          className="bg-primary text-white px-4 rounded-xl w-full hover:bg-primary-hover flex gap-2 items-center justify-center"
        >
          Pay now with
          <FaStripe className="text-5xl" />
        </button>
      </section>
    </main>
  );
}
