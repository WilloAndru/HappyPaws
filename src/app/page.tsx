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
  const categories = [
    "food.png",
    "health.png",
    "toys.png",
    "hygiene.png",
    "accessories.png",
    "habitat.png",
  ];

  const [slide, setSlide] = useState(0);
  const [isPauseSlider, setIsPauseSlider] = useState(false);
  const [stepPets, setStepPets] = useState(0);

  // Funcion para deslisar las imagenes del slider automaticamente
  useEffect(() => {
    if (isPauseSlider) return;
    const interval = setInterval(() => {
      setSlide((prev) => (prev === imagesSlider.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isPauseSlider]);

  return (
    <main className="flex gap-8 flex-col">
      {/* Seccion de descuentos por primera compra */}
      <section className="flex justify-between gap-8 px-6 py-4 rounded-2xl bg-blue-200 items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <h2>Hello!</h2>
          <Link
            href="/login"
            className="rounded-3xl text-white font-bold bg-primary hover:bg-primary-hover px-4 py-2 w-fit"
          >
            Sign in
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/shop"
            className="flex gap-4 items-center bg-white rounded-2xl px-4 py-2"
          >
            <img className="w-10" src="/icons/money.png" alt="Money" />
            <div className="text-sm">
              <h6>Save 15% on your first order</h6>
              <p className="text-primary">Order now!</p>
            </div>
          </Link>
          <Link
            href="/shop:farmaco"
            className="flex gap-4 items-center bg-white rounded-2xl px-4 py-2"
          >
            <img className="w-10" src="/icons/farmaco.png" alt="Farmaco" />
            <div className="text-sm">
              <h6>Save 25% on first medicine order</h6>
              <p className="text-primary">Order now!</p>
            </div>
          </Link>
        </div>
      </section>
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
            onClick={() => setStepPets((prev) => prev - 1)}
            className={`${
              stepPets === 0 ? "hidden" : "flex"
            } z-1 absolute left-0 bg-primary rounded-full p-4 text-white hover:bg-primary-hover`}
          >
            <FaArrowLeft />
          </button>
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${stepPets * 33 * 3}%)` }}
          >
            {imagesPets.map((item, index) => {
              const name = item.replace(".png", "");
              const capitalized = name.charAt(0).toUpperCase() + name.slice(1);

              return (
                <Link
                  className="min-w-[33%] md:min-w-[20%] p-[2%] flex flex-col items-center gap-2 hover:bg-gray-200 rounded-2xl"
                  key={index}
                  href={`/${name}`}
                >
                  <img
                    src={`/pets/${item}`}
                    alt={name}
                    className="object-cover rounded-full flex-shrink-0"
                  />
                  <h6>{capitalized}</h6>
                </Link>
              );
            })}
          </div>
          <button
            onClick={() => setStepPets((prev) => prev + 1)}
            className={`${
              stepPets === 1 ? "hidden" : "flex"
            } absolute right-0 bg-primary rounded-full p-4 text-white hover:bg-primary-hover`}
          >
            <FaArrowRight />
          </button>
        </div>
      </section>
      {/* Seccion de categorias */}
      <section>
        <h2>Categories</h2>
        <div className="grid grid-cols-3 md:grid-cols-6">
          {categories.map((item, index) => {
            const name = item.replace(".png", "");
            const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
            return (
              <Link
                key={index}
                href={`/${name}`}
                className="flex flex-col gap-2 items-center border-2 border-white hover:border-gray-400 rounded-3xl p-4"
              >
                <img src={`/categories/${item}`} alt={name} />
                <h6>{capitalized}</h6>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
