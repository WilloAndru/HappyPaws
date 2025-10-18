"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Home() {
  const imagesSlider = ["img1.jpg", "img2.jpg", "img3.jpg"];
  const imagesPets = [
    "cat.png",
    "dog.png",
    "chicken.png",
    "fish.png",
    "hamster.png",
    "horse.png",
  ];

  const [slide, setSlide] = useState(0);
  const [isPauseSlider, setIsPauseSlider] = useState(false);

  // Funcion para deslisar las imagenes del slider automaticamente
  useEffect(() => {
    if (isPauseSlider) return;
    const interval = setInterval(() => {
      setSlide((prev) => (prev === imagesSlider.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isPauseSlider]);

  return (
    <main className="flex gap-6 flex-col">
      {/* Seccion de imagenes deslisantes */}
      <section className="relative rounded-2xl overflow-hidden">
        <div
          className="max-h-80 w-full flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${slide * 100}%)` }}
        >
          {imagesSlider.map((item, index) => {
            return (
              <img
                key={index}
                src={`/slider/${item}`}
                alt={`Image ${index}`}
                className="w-full object-cover"
              />
            );
          })}
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center gap-2 p-2">
          <button
            className="text-white text-2xl"
            onClick={() => setIsPauseSlider((prev) => !prev)}
          >
            {!isPauseSlider ? <FaPause /> : <FaPlay />}
          </button>
          {imagesSlider.map((_, index) => (
            <button
              key={index}
              className={`w-[12vw] h-2 rounded-4xl ${
                slide === index ? "bg-white" : "bg-gray-300"
              }`}
              onClick={() => {
                setSlide(index);
                setIsPauseSlider(true);
              }}
            ></button>
          ))}
        </div>
      </section>
      {/* Seccion de categorias por mascota */}
      <section>
        <h2>What’s your pet?</h2>
        <div className="relative flex items-center mt-2 overflow-hidden">
          <button className="fixed left-5 bg-primary rounded-full p-4 text-white hover:bg-primary-hover">
            <FaArrowLeft />
          </button>

          {imagesPets.map((item, index) => (
            <Link
              className="flex flex-col items-center gap-2 hover:bg-gray-200 rounded-2xl p-2"
              key={item}
              href={item}
            >
              <img
                src={`/categories/${item}`}
                alt={`Image ${index}`}
                className="min-w-32 object-cover rounded-full flex-shrink-0"
              />
              <h6>{item}</h6>
            </Link>
          ))}

          <button className="fixed right-5 bg-primary rounded-full p-4 text-white hover:bg-primary-hover">
            <FaArrowRight />
          </button>
        </div>
      </section>
    </main>
  );
}
