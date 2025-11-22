import React from "react";
import { Star } from "lucide-react";

type RatingProps = {
  rating: number;
};

// Componente que representa las estrellas y el rating de un producto

export default function Rating({ rating }: RatingProps) {
  return (
    <section className="flex items-center space-x-1">
      <p>{rating}</p>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={15}
          className={`${
            i <= rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"
          } transition-all duration-200`}
        />
      ))}
    </section>
  );
}
