"use client";
import { useState } from "react";

export default function Home() {
  const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg"];
  const [slide, setSlide] = useState(0);

  return (
    <main className="relative flex gap-2">
      <section className="rounded-2xl overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${slide * 100}%)` }}
        >
          {images.map((item, index) => {
            return (
              <img
                key={index}
                src={item}
                alt={`Image ${index}`}
                className="w-full object-cover"
              />
            );
          })}
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 p-2">
          {images.map((_, index) => {
            return (
              <button
                key={index}
                className={`w-12 h-2 ${
                  slide === index ? "bg-white" : "bg-gray-300"
                } rounded-4xl`}
                onClick={() => setSlide(index)}
              ></button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
