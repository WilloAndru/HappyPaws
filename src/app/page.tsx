"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import Slider from "../components/Slider";
import { useAuth } from "@/context/AuthContext";
import { useTrendingProducts } from "./hooks/useProducts";

export default function Home() {
  const { data: products, isLoading } = useTrendingProducts(); // Obtenemos los productos en tendencia
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
  const { user } = useAuth();

  // Funcion para deslizar las imagenes del slider automaticamente
  useEffect(() => {
    if (isPauseSlider) return;
    const interval = setInterval(() => {
      setSlide((prev) => (prev === imagesSlider.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isPauseSlider]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <main className="flex gap-8 flex-col">
      {/* Seccion de descuentos por primera compra */}
      <section className="flex justify-between gap-8 px-6 py-4 rounded-2xl bg-blue-200 items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <h2>
            {user ? `Welcome back ${user.name?.split(" ")[0]}!` : "Hello!"}
          </h2>
          {!user && (
            <Link
              href="/auth"
              className="rounded-3xl text-white font-bold bg-primary hover:bg-primary-hover px-4 py-2 w-fit"
            >
              Sign in
            </Link>
          )}
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
        <Slider list={imagesPets} isCategory={true} />
      </section>
      {/* Seccion de categorias */}
      <section>
        <h2>Categories</h2>
        <div className="mt-2  grid grid-cols-3 md:grid-cols-6">
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
      {/* Seccion de funcionalidades de la pagina */}
      <section>
        <h2>For pets that deserve the best</h2>
        <div className="mt-2  grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="flex flex-col p-2 rounded-2xl bg-blue-200 items-center gap-2 justify-center text-center">
            <img className="rounded-2xl" src="/advices/img1.png" alt="" />
            <h6>Award-winning 24/7 custom care</h6>
          </div>
          <div className="flex flex-col p-2 rounded-2xl bg-blue-200 items-center gap-2 justify-center text-center">
            <img className="rounded-2xl" src="/advices/img2.png" alt="" />
            <h6>Chat free with our professional team</h6>
          </div>
          <div className="flex flex-col p-2 rounded-2xl bg-blue-200 items-center gap-2 justify-center text-center">
            <img className="rounded-2xl" src="/advices/img3.png" alt="" />
            <h6>Prescription meds</h6>
          </div>
          <div className="flex flex-col p-2 rounded-2xl bg-blue-200 items-center gap-2 justify-center text-center">
            <img className="rounded-2xl" src="/advices/img4.png" alt="" />
            <h6>Pet insurance</h6>
          </div>
        </div>
      </section>
      {/* Seccion de productos en tendencia */}
      <section className="bg-blue-200 p-3 rounded-2xl">
        <h2>Trending Products</h2>
        <div className="mt-2 gap-2 flex">
          <div className="gap-1 flex-col hidden md:flex">
            <img
              className="rounded-sm object-cover w-[16vw] max-w-64"
              src="/advices/img5.png"
              alt="Image"
            />
            <h5>Ready for buy now?</h5>
            <p>Discover the most popular pet products of the moment.</p>
          </div>
          <Slider list={products} isCategory={false} />
        </div>
      </section>
    </main>
  );
}
