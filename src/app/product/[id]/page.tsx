"use client";

import { useProduct } from "@/app/hooks/useProducts";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Heart } from "lucide-react";
import Rating from "@/components/Rating";
import { Select, OptionType } from "@/components/Select";

export default function Product() {
  const { id } = useParams();
  const productId = Number(id);
  const [isFav, setIsFav] = useState(false);
  const { data, isLoading } = useProduct(productId);

  // Opciones del select del stock y su estado
  const options = [
    { value: 1, label: "1 unit" },
    { value: 2, label: "2 units" },
    { value: 3, label: "3 units" },
    { value: 4, label: "4 units" },
    { value: 5, label: "5 units" },
  ];
  const [qty, setQty] = useState<OptionType>(options[0]);

  // Funcion para añadir el producto a favoritos
  const handleAddFavorite = async () => {
    setIsFav((prev) => !prev);
  };

  if (isLoading) return <p>Loading...</p>;

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
      <section className="px-6 py-4 flex flex-col gap-3 rounded-sm bg-white md:w-1/2">
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
        {/* Rating */}
        <Rating rating={data.rating} />
        {/* Seccion de precio y descuento */}
        <section>
          <p className="line-through text-gray-400">$ {data.price}</p>
          <div className="flex gap-4">
            <h2>$ {(data.price * (1 - data.discount)).toFixed(2)}</h2>
            <h4 className="text-white px-2 py-1 rounded-xl bg-primary">
              {data.discount * 100}% OFF
            </h4>
          </div>
        </section>
        {/* Descripcion */}
        <p>{data.description}</p>
        {/* Stocks */}
        <section>
          <h6 className="mb-1">Stock</h6>
          <div className="flex items-center gap-3">
            <Select options={options} value={qty} onChange={setQty} />
            <p className="text-gray-500">{data.stock} units left</p>
          </div>
        </section>
        {/* Boton de compra y carrito */}
        <section className="flex flex-col gap-1">
          <button className="rounded-xl bg-primary text-white px-4 py-2 hover:bg-primary-hover">
            Buy now
          </button>
          <button className="rounded-xl bg-blue-400 text-white px-4 py-2 hover:bg-blue-500">
            Add to cart
          </button>
        </section>
      </section>
    </main>
  );
}
