import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function Header() {
  return (
    <header className="fixed flex justify-between items-center p-6 bg-[#3AB7BF] w-screen text-white">
      {/* Marca */}
      <Link to="/" className="flex items-center gap-3">
        <img className="w-12" src="/icon.png" alt="Icon" />
        <h1 className="hidden md:flex">HappyPaws</h1>
      </Link>

      {/* Barra de busqueda */}
      <form className="flex rounded-lg overflow-hidden border-1">
        <input
          className="bg-gray-100 text-black px-5 w-[30vw] md:w-[40vw]"
          type="text"
          placeholder="Find whatever you want"
        />
        <button className="py-3 px-4 hover:bg-teal-600">
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
