"use client";

import { useProduct } from "@/app/hooks/useProducts";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Heart } from "lucide-react";
import Rating from "@/components/Rating";

export default function Product() {
  const { id } = useParams();
  const productId = Number(id);
  const [isFav, setIsFav] = useState(false);
  const { data, isLoading } = useProduct(productId);

  if (isLoading) return <p>Loading...</p>;

  const handleAddFavorite = async () => {
    setIsFav((prev) => !prev);
  };

  return (
    <main className="flex flex-col md:flex-row gap-4 p-4 bg-gray-100 rounded-sm md:mx-[10vw]">
      {/* Seccion de la imagen */}
      <section className="relative w-full md:w-1/2 aspect-square">
        <Image
          src={data.imageUrl}
          alt={data.name}
          fill
          className="rounded-sm object-cover"
        />
      </section>
      {/* Seccion de detalles del producto */}
      <section className="px-6 py-4 flex flex-col gap-2 rounded-sm bg-white md:w-1/2">
        {/* Nombre y boton de favoritos */}
        <header className="flex justify-between items-center">
          <h2>{data.name}</h2>
          <Heart
            className={`text-primary text-2xl cursor-pointer ${
              isFav ? "fill-primary" : ""
            }`}
            onClick={handleAddFavorite}
          />
        </header>
        <Rating rating={data.rating} />
      </section>
    </main>
  );
}
