import Link from "next/link";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type SliderProps = {
  list: any[];
  isCategory?: boolean;
};

export default function Slider({ list, isCategory }: SliderProps) {
  const [step, setStep] = useState(0);

  return (
    <div className="mt-2 relative flex items-center overflow-hidden">
      <button
        onClick={() => setStep((prev) => prev - 1)}
        className={`${
          step === 0 ? "hidden" : "flex"
        } z-1 absolute left-0 bg-primary rounded-full p-4 text-white hover:bg-primary-hover`}
      >
        <FaArrowLeft />
      </button>
      {isCategory ? (
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${step * 33 * 3}%)` }}
        >
          {list.map((item, index) => {
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
      ) : (
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${step * 33 * 3}%)` }}
        >
          {list.map((item, index) => {
            return (
              <Link
                className="min-w-[33%] md:min-w-[20%] p-[2%] flex flex-col items-center gap-2 hover:bg-gray-200 rounded-2xl"
                key={index}
                href={`/${item.name}`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="object-cover rounded-full flex-shrink-0"
                />
                <h6>{item.name}</h6>
              </Link>
            );
          })}
        </div>
      )}
      <button
        onClick={() => setStep((prev) => prev + 1)}
        className={`${
          step === 1 ? "hidden" : "flex"
        } absolute right-0 bg-primary rounded-full p-4 text-white hover:bg-primary-hover`}
      >
        <FaArrowRight />
      </button>
    </div>
  );
}
