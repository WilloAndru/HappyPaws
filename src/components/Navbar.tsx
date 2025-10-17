import { IoMenu } from "react-icons/io5";
import {
  FaComment,
  FaUserCircle,
  FaShoppingCart,
  FaSearch,
} from "react-icons/fa";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="text-white fixed flex flex-col gap-2 p-2 bg-primary w-full">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <button className="text-4xl">
            <IoMenu />
          </button>
          <h1>HappyPaws</h1>
        </div>
        <div className="flex gap-2 items-center">
          <Link href="/" className="text-3xl">
            <FaComment />
          </Link>
          <Link href="/" className="text-3xl">
            <FaUserCircle />
          </Link>
          <Link href="/" className="text-3xl">
            <FaShoppingCart />
          </Link>
        </div>
      </div>
      <form className="flex pl-2 rounded-sm border-0 bg-white">
        <input className="w-full text-black" type="text" />
        <button className="text-primary text-[1.2rem] px-4 py-2">
          <FaSearch />
        </button>
      </form>
    </header>
  );
}
