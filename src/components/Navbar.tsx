import { IoMenu } from "react-icons/io5";
import {
  FaComment,
  FaUserCircle,
  FaShoppingCart,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="text-white fixed flex flex-col gap-2 py-2 px-2 md:px-8 md:pb-4 md:pt-2 bg-primary w-full md:flex-row md:items-center md:justify-between">
      {/* Marca y menú */}
      <div className="flex items-center gap-2">
        <button className="text-4xl md:hidden">
          <IoMenu />
        </button>
        <h1>HappyPaws</h1>
      </div>

      {/* Barra de búsqueda */}
      <form className="flex order-2 md:order-none md:flex-1 md:mx-6 pl-2 rounded-lg border-0 bg-white shadow-sm md:max-w-[40vw]">
        <input
          className="w-full text-black px-3 py-2 outline-none"
          type="text"
          placeholder="Search"
        />
        <button className="text-primary text-[1.2rem] px-4 py-2">
          <FaSearch />
        </button>
      </form>

      {/* Botones de acción */}
      <div className="flex items-center justify-end absolute top-0 right-0 md:static">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-2xl hover:bg-primary-hover px-3 py-2"
        >
          <FaComment className="text-3xl" />
          <h6 className="hidden md:block">Help</h6>
          <FaChevronDown className="hidden md:block" />
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 rounded-2xl hover:bg-primary-hover px-3 py-2"
        >
          <FaUserCircle className="text-3xl" />
          <h6 className="hidden md:block">Sign In</h6>
          <FaChevronDown className="hidden md:block" />
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 rounded-2xl hover:bg-primary-hover px-3 py-2"
        >
          <FaShoppingCart className="text-3xl" />
          <h6 className="hidden md:block">Cart</h6>
          <FaChevronDown className="hidden md:block" />
        </Link>
      </div>
    </header>
  );
}
