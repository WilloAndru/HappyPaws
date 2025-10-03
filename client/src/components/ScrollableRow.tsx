import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

type ScrollableRowProps = {
  title: string;
  listItems: any[];
};

function ScrollableRow({ title, listItems }: ScrollableRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const scroll = (direction: "left" | "right") => {
    const cardsForStep = 5;
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = container.clientWidth / cardsForStep;
      const scrollAmount = cardWidth * cardsForStep;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Verifica los límites del scroll
  const checkScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, clientWidth, scrollWidth } = container;

    setIsAtStart(scrollLeft <= 1);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
  };

  useEffect(() => {
    checkScroll();
  }, []);

  return (
    <div className="bg-white flex flex-col gap-4 p-6 rounded-2xl">
      <div className="flex justify-between">
        <h3>{title}</h3>
        <Link className="link font-bold text-[20px]" to="/">
          See more
        </Link>
      </div>
      <div className="relative flex gap-4 items-center">
        {isAtEnd && (
          <button
            className="text-2xl absolute left-[-15px] rounded-full bg-cyan-500 p-4 h-18 text-white hover:bg-cyan-600 z-10"
            onClick={() => scroll("left")}
          >
            <FaArrowLeft />
          </button>
        )}
        <div
          ref={scrollRef}
          className="overflow-hidden grid grid-flow-col auto-cols-[20%]"
        >
          {listItems.map((item: any, index) => {
            return (
              <Link
                to={`/${item.id}`}
                key={index}
                className="relative p-4 hover:bg-gray-200 rounded-2xl gap-2 flex flex-col"
              >
                <div className="absolute top-2 left-2 rounded-2xl bg-cyan-500 p-2 text-white font-bold">
                  -{item.discount}%
                </div>
                <img className="h-48" src={item.img} alt="product" />
                <h5>{item.name}</h5>
                <h5 className="text-cyan-700">{item.price}</h5>
              </Link>
            );
          })}
        </div>
        {isAtStart && (
          <button
            className="text-2xl absolute right-[-15px] rounded-full bg-cyan-500 p-4 h-18 text-white hover:bg-cyan-600 z-10"
            onClick={() => scroll("right")}
          >
            <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
}

export default ScrollableRow;
