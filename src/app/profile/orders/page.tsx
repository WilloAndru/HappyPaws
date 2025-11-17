"use client";

import { useAuth, DBOrder } from "@/context/AuthContext";
import Link from "next/link";
import React, { useState } from "react";
import { FaBoxOpen, FaBoxes } from "react-icons/fa";
import { BiSolidPurchaseTag } from "react-icons/bi";

export default function Orders() {
  const { user, setUser } = useAuth();
  const [orders, setOrders] = useState<DBOrder[]>(user?.orders || []);

  return (
    <main className="flex flex-col gap-6 justify-center text-start m-2">
      {/* Header */}
      <header className="flex gap-3 items-center">
        <FaBoxOpen className="text-2xl" />
        <h2>Orders</h2>
      </header>
      {orders.length === 0 ? (
        // Seccion de no haz realizado ninguna compra
        <section className="flex flex-col gap-8 text-center items-center justify-center w-full">
          <h2>You haven't made any purchases yet.</h2>
          <FaBoxes className="text-5xl" />
          <Link
            className="flex gap-2 items-center justify-center bg-primary px-6 py-3 rounded-2xl text-white hover:bg-primary-hover font-bold"
            href="/"
          >
            <BiSolidPurchaseTag className="text-2xl" />
            Buy now!
          </Link>
        </section>
      ) : (
        // Seccion de ordenes
        <section></section>
      )}
    </main>
  );
}
