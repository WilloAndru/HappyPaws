"use client";

import { useProduct, useProductsByCategory } from "@/app/hooks/useProducts";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Heart } from "lucide-react";
import Rating from "@/components/Rating";
import { Select, OptionType } from "@/components/Select";
import { FaCartArrowDown } from "react-icons/fa";
import Slider from "@/components/Slider";
import { useAuth } from "@/context/AuthContext";
import { updateWishlist } from "@/lib/api/wishlist";
import { useCartStore } from "@/store/cartStore";
import AdviceAuth from "@/components/AdviceAuth";

export default function Product() {
  const { user, setUser } = useAuth();
  const [showAdviceAuth, setShowAdviceAuth] = useState(false);

  // Constantes inicales del producto y productos similares
  const { id } = useParams();
  const productId = Number(id);
  const { data: product, isLoading: isLoadingProduct } = useProduct(productId);
  const { data: products, isLoading: isLoadingCategory } =
    useProductsByCategory(product?.category || "", {
      enabled: !!product,
    });

  // El producto ya esta en la lista de deseos?
  const isFav =
    !!user &&
    !!product &&
    user.wishlist.some((item) => item.productId === product.id);

  // Logica de cantidad de productos a comprar
  const options = [
    { value: 1, label: "1 unit" },
    { value: 2, label: "2 units" },
    { value: 3, label: "3 units" },
    { value: 4, label: "4 units" },
    { value: 5, label: "5 units" },
  ];
  const [qty, setQty] = useState<OptionType>(options[0]);

  // Funcion para añadir el producto a favoritos
  const toggleFavorite = async () => {
    try {
      // Si no esta logeado salta aviso
      if (!user) {
        setShowAdviceAuth(true);
        return;
      }
      const status = await updateWishlist(user!.id, product.id);
      // Si estaba en favoritos → quitar
      if (status === 200) {
        setUser((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            wishlist: prev.wishlist.filter(
              (item) => item.productId !== productId
            ),
          };
        });
      }
      // Si NO estaba en favoritos → agregar
      else {
        setUser((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            wishlist: [...prev.wishlist, { userId: user!.id, productId }],
          };
        });
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  // Funciones para añadir, remover y validar si el producto esta en el carro
  const { addToCart, removeToCart } = useCartStore();
  const isOnCart = useCartStore((state) =>
    state.items.some((i) => i.id === productId)
  );

  if (isLoadingProduct || isLoadingCategory) return <p>Loading...</p>;

  return (
    <main className="flex flex-col gap-4 md:mx-[10vw]">
      {/* Seccion del producto */}
      <section className="flex flex-col md:flex-row gap-4 p-4 bg-gray-100 rounded-sm">
        {/* Seccion de la imagen */}
        <section className="relative w-full md:w-1/2 aspect-square">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="rounded-sm object-cover"
          />
        </section>
        {/* Seccion de detalles del producto */}
        <section className="px-6 py-4 flex flex-col gap-3 rounded-sm bg-white md:w-1/2">
          {/* Nombre y boton de favoritos */}
          <header className="flex justify-between items-center">
            <h2>{product.name}</h2>
            <Heart
              className={`text-primary text-2xl cursor-pointer ${
                isFav ? "fill-primary" : ""
              }`}
              onClick={toggleFavorite}
            />
          </header>
          {/* Rating */}
          <Rating rating={product.rating} />
          {/* Seccion de precio y descuento */}
          <section>
            <p className="line-through text-gray-400">$ {product.price}</p>
            <div className="flex gap-4">
              <h2>$ {(product.price * (1 - product.discount)).toFixed(2)}</h2>
              <h4 className="text-white px-2 py-1 rounded-xl bg-primary">
                {product.discount * 100}% OFF
              </h4>
            </div>
          </section>
          {/* Descripcion */}
          <p>{product.description}</p>
          {/* Stocks */}
          <section>
            <h6 className="mb-1">Stock</h6>
            {/* Cantidad de unidades a comprar */}
            <div className="flex items-center gap-3">
              <Select options={options} value={qty} onChange={setQty} />
              <p className="text-gray-500">{product.stock} units left</p>
            </div>
          </section>
          {/* Boton de compra y carrito */}
          <section className="flex flex-col gap-1">
            <button className="rounded-xl bg-primary text-white px-4 py-2 hover:bg-primary-hover">
              Buy now
            </button>
            <button
              className={`flex items-center justify-center gap-3 rounded-xl text-white px-4 py-2  ${
                isOnCart
                  ? "bg-red-400 hover:bg-red-500"
                  : "bg-blue-400 hover:bg-blue-500"
              }`}
              onClick={() => {
                if (!user) {
                  setShowAdviceAuth(true);
                } else {
                  if (isOnCart) {
                    removeToCart(productId);
                  } else {
                    addToCart({
                      id: productId,
                      name: product.name,
                      imageUrl: product.imageUrl,
                      price: product.price,
                      quantity: qty.value,
                    });
                  }
                }
              }}
            >
              <FaCartArrowDown />
              {isOnCart ? "Remove to cart" : "Add to cart"}
            </button>
          </section>
        </section>
      </section>
      {/* Seccion de productos similares */}
      <section className="flex flex-col gap-4 p-4 bg-gray-100 rounded-sm">
        <h2>Related products</h2>
        <Slider list={products} isCategory={false} />
      </section>
      {/* Aviso de no estas logeado todavia */}
      {showAdviceAuth && <AdviceAuth setShowAdviceAuth={setShowAdviceAuth} />}
    </main>
  );
}
