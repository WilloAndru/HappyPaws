import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Brand from "./Brand";
import { IoMenu } from "react-icons/io5";
import { useEffect, useState } from "react";
import { getCategories } from "../services/categoriesService";

function Header() {
  const [isCategories, setIsCategories] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getCategories();
      setCategories(data);
    })();
  }, []);

  return (
    <header className="fixed flex justify-between items-center px-3 py-5 h-24 md:p-8 bg-cyan-500 w-screen text-white shadow-sm z-20">
      {/* Marca y boton de categorias*/}
      <div className="flex gap-4">
        <button
          onClick={() => setIsCategories((state) => !state)}
          className="flex flex-col items-center hover:text-neutral-300"
        >
          <IoMenu className="text-5xl" />
          <p className="text-[12px]">Categories</p>
        </button>
        <Brand />
      </div>
      {/* Barra de busqueda */}
      <form className="flex rounded-lg overflow-hidden border-1">
        <input
          className="bg-gray-100 text-black px-5 w-[20vw] md:w-[35vw]"
          type="text"
          placeholder="Find whatever you want"
        />
        <button className="py-3 px-4 hover:bg-cyan-600">
          <FaSearch className="text-[24px]" />
        </button>
      </form>
      {/* Login */}
      <Link className="btn-1" to="/login">
        Login
      </Link>
      {/* Interfaz de categorias */}
      {isCategories && (
        <div
          className="fixed left-0 top-24 inset-0 bg-[rgba(0,0,0,0.6)]"
          onClick={() => setIsCategories(false)}
        >
          <div
            className="absolute bg-cyan-400 h-[60vh] w-64 flex flex-col rounded-br-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {categories.map((item: string, index: number) => {
              return (
                <div className="hover:bg-cyan-500 px-4 py-2" key={index}>
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
