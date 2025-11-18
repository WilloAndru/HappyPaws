"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React from "react";
import { FaStar, FaBoxes } from "react-icons/fa";
import { BiSolidPurchaseTag } from "react-icons/bi";
import axios from "axios";
import Favorite from "./components/Favorite";

export default function WishList() {
  const { user, setUser } = useAuth();

  const handleProduct = async () => {
    try {
      const res = await axios.post("/api/wishlist/", {
        userId: user?.id,
        productId: 1,
      });
      // Si se elimina el producto de favoritos
      if (res.data.status === 200) {
        setUser((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            wishlist: prev.wishlist.filter((i) => i.id !== res.data.id),
          };
        });
      }
      // Si se agrega el producto a favoritos
      else if (res.data.status === 201) {
        setUser((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            wishlist: [...prev.wishlist, res.data.item],
          };
        });
      }
      window.location.reload();
    } catch (error) {
      console.error("Error handle product", error);
    }
  };

  return (
    <main className="flex flex-col gap-10 justify-center text-start">
      {/* Header */}
      <header className="flex gap-3 items-center">
        <FaStar className="text-2xl" />
        <h2>Whishlist</h2>
      </header>
      {user?.wishlist.length === 0 ? (
        // Seccion de no haz añadido ningun favorito
        <section className="flex flex-col gap-8 text-center items-center justify-center w-full">
          <h2>You haven’t added any favorite products yet.</h2>
          <FaBoxes className="text-5xl" />
          <Link
            className="flex gap-2 items-center justify-center bg-primary px-6 py-3 rounded-2xl text-white hover:bg-primary-hover font-bold"
            href="/"
          >
            <BiSolidPurchaseTag className="text-2xl" />
            Add now!
          </Link>
        </section>
      ) : (
        // Seccion de lista de deseos
        <section className="flex flex-col gap-2">
          {user?.wishlist.map((item) => {
            return <Favorite productId={item.productId} />;
          })}
        </section>
      )}
      <button onClick={handleProduct}>ACA</button>
    </main>
  );
}
