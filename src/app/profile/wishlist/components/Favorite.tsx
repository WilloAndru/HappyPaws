import { useProduct } from "@/app/hooks/useProducts";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

type FavoriteProps = {
  productId: number;
};

export default function Favorite({ productId }: FavoriteProps) {
  const { user, setUser } = useAuth();
  const { data: product, isLoading } = useProduct(productId);

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

  if (isLoading) return <p>Loading favorite...</p>;

  return (
    <Link
      href="/"
      className="py-2 px-4 rounded-2xl flex justify-between items-center hover:bg-gray-300"
    >
      <div className="flex flex-col gap-2">
        <h6>{product.name}</h6>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={100}
          height={150}
          className="rounded-md"
        />
        <h6 className="text-center">${product.price}</h6>
      </div>

      <button
        className="bg-red-500 rounded-2xl p-4 text-white hover:bg-red-400 h-full"
        onClick={handleProduct}
      >
        Remove
      </button>
    </Link>
  );
}
