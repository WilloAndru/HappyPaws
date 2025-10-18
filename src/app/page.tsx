"use client";
import { useEffect, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";

export default function Home() {
  const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg"];
  const [slide, setSlide] = useState(0);
  const [isPauseSlider, setIsPauseSlider] = useState(false);

  // Funcion para deslisar las imagenes del slider automaticamente
  useEffect(() => {
    if (isPauseSlider) return;
    const interval = setInterval(() => {
      setSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isPauseSlider]);

  return (
    <main className="relative flex gap-2">
      <section className="rounded-2xl overflow-hidden">
        <div
          className="max-h-80 w-full flex transition-transform duration-500 ease-in-out"
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
        <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center gap-2 p-2">
          <button
            className="text-white text-2xl"
            onClick={() => setIsPauseSlider((prev) => !prev)}
          >
            {!isPauseSlider ? <FaPause /> : <FaPlay />}
          </button>
          {images.map((_, index) => {
            return (
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
            );
          })}
        </div>
      </section>
    </main>
  );
}
