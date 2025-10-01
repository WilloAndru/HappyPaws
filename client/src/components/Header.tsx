import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Brand from "./Brand";
import { IoMenu } from "react-icons/io5";

function Header() {
  return (
    <header className="fixed flex justify-between items-center px-3 py-5 md:p-5 bg-cyan-500 w-screen text-white shadow-sm">
      {/* Marca y boton de categorias*/}
      <div className="flex gap-4">
        <button className="flex flex-col items-center">
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
    </header>
  );
}

export default Header;
