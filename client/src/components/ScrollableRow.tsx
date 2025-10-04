import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useRef } from "react";

type ScrollableRowProps = {
  title: string;
  listItems: any[];
};

function ScrollableRow({ title, listItems }: ScrollableRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Funcion que maneja el desplazamiento del scroll
  const scroll = (direction: "left" | "right") => {
    const cardsForStep = 5;
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = container.clientWidth / cardsForStep;
      const scrollAmount = cardWidth * cardsForStep;
      // Metodo del DOM para desplazar un elemento HTML
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth", // Animacion suave
      });
    }
  };

  return (
    <div className="bg-white flex flex-col gap-4 p-6 rounded-2xl">
      {/* Div superior */}
      <div className="flex justify-between">
        <h3>{title}</h3>
        <Link className="link font-bold text-[20px]" to="/">
          See more
        </Link>
      </div>
      {/* Div de scroll */}
      <div className="relative flex gap-4 items-center">
        {/* Flecha izquierda */}
        <button
          className="text-2xl absolute left-[-15px] rounded-full bg-cyan-500 p-4 h-18 text-white hover:bg-cyan-600 z-10"
          onClick={() => scroll("left")}
        >
          <FaArrowLeft />
        </button>
        {/* Lista de productos */}
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
        {/* Flecha derecha */}
        <button
          className="text-2xl absolute right-[-15px] rounded-full bg-cyan-500 p-4 h-18 text-white hover:bg-cyan-600 z-10"
          onClick={() => scroll("right")}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default ScrollableRow;
