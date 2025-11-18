import axios from "axios";
import React, { useState, useEffect } from "react";

type FavoriteProps = {
  productId: number;
};

export default function Favorite({ productId }: FavoriteProps) {
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/product/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error getting product", error);
      }
    };
    fetchProduct();
  }, []);

  return (
    <section className="p-2 flex justify-between items-center">
      <div>
        <h6></h6>
      </div>
    </section>
  );
}
