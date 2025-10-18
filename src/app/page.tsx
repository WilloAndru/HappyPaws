"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import next from "next";

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
  const [stepPets, setStepPets] = useState(0);

  const handleStepPet = (isNext: boolean) => {
    if (isNext) {
      setStepPets((prev) => prev + 1);
    } else {
      setStepPets((prev) => prev - 1);
    }
  };

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
        <div className="relative flex items-center overflow-hidden">
          <button
            onClick={() => handleStepPet(false)}
            className={`${
              stepPets === 0 ? "hidden" : "flex"
            } z-1 absolute left-0 bg-primary rounded-full p-4 text-white hover:bg-primary-hover`}
          >
            <FaArrowLeft />
          </button>
          <div
            className="flex mt-2 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${stepPets * 144 * 3}px)` }}
          >
            {imagesPets.map((item, index) => {
              const name = item.replace(".png", "");
              const capitalized = name.charAt(0).toUpperCase() + name.slice(1);

              return (
                <Link
                  className="flex flex-col items-center gap-2 hover:bg-gray-200 rounded-2xl p-2"
                  key={item}
                  href={`/${name}`}
                >
                  <img
                    src={`/categories/${item}`}
                    alt={`Image ${index}`}
                    className="min-w-32 md: object-cover rounded-full flex-shrink-0"
                  />
                  <h6>{capitalized}</h6>
                </Link>
              );
            })}
          </div>
          <button
            onClick={() => handleStepPet(true)}
            className={`${
              stepPets === imagesPets.length / 3 - 1 ? "hidden" : "flex"
            } absolute right-0 bg-primary rounded-full p-4 text-white hover:bg-primary-hover`}
          >
            <FaArrowRight />
          </button>
        </div>
      </section>
    </main>
  );
}
