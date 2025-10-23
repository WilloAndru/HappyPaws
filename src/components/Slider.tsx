import Link from "next/link";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Star } from "lucide-react";

type SliderProps = {
  list: any[];
  isCategory: boolean;
};

export default function Slider({ list, isCategory }: SliderProps) {
  const [step, setStep] = useState(0);

  return (
    <div className="relative flex items-center overflow-hidden">
      <button
        onClick={() => setStep((prev) => prev - 1)}
        className={`${
          step === 0 ? "hidden" : "flex"
        } z-1 absolute left-0 bg-primary rounded-full p-4 text-white hover:bg-primary-hover`}
      >
        <FaArrowLeft />
      </button>
      <div
        className="flex transition-transform duration-500 ease-in-out gap-[1%] w-full"
        style={{ transform: `translateX(-${step * 101}%)` }}
      >
        {list.map((item, index) => {
          const name = isCategory ? item.replace(".png", "") : item.name;
          const capitalized = name.charAt(0).toUpperCase() + name.slice(1);

          return (
            <Link
              className={`min-w-[33%] md:min-w-[19.1%] flex flex-col rounded-sm ${
                isCategory
                  ? "items-center p-[2%] hover:bg-gray-200"
                  : "items-start bg-gray-100"
              }`}
              key={index}
              href={`/${name}`}
            >
              <img
                src={isCategory ? `/pets/${item}` : item.imageUrl}
                alt={name}
                className={`object-cover ${
                  isCategory ? "rounded-full" : "rounded-sm w-full h-full"
                }`}
              />
              <div className="flex flex-col gap-1 px-4 py-2">
                <h6>{capitalized}</h6>
                {!isCategory && (
                  <div className="flex items-center space-x-1">
                    <p>{item.rating}</p>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        size={15}
                        className={`${
                          i <= item.rating
                            ? "fill-yellow-500 text-yellow-500"
                            : "text-gray-300"
                        } transition-all duration-200`}
                      />
                    ))}
                  </div>
                )}
                {!isCategory && <h6>${item.price}</h6>}
              </div>
            </Link>
          );
        })}
      </div>
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
