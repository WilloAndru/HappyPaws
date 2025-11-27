"use client";

import {
  FaComment,
  FaUserCircle,
  FaShoppingCart,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { optionsUser } from "@/data/optionsUser";
import { useSearchProducts } from "@/app/hooks/useProducts";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showOptionsProfile, setShowOptionsProfile] = useState(false);

  // Variables de la barra de busqueda
  const [searchText, setSearchText] = useState(""); // Texto a buscar
  const [debounced, setDebounced] = useState(searchText); // Retraso
  const { data } = useSearchProducts(debounced, null, null, 5); // Lista de las 5 recomendaciones obtenidas

  // Funcion que maneja el retraso de 300ms para mandar la solicitud de productos recomendados
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(searchText), 300);
    return () => clearTimeout(handler);
  }, [searchText]);

  // Funcion que se ejecuta al buscar
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = searchText.trim(); // Aseguramos que sea un string con espacios en las esquinas
    if (text !== "") {
      router.push(`/filters?search=${encodeURIComponent(text)}`);
      setSearchText("");
    }
  };

  return (
    <header className="z-1 top-0 left-0 text-white fixed flex flex-col gap-2 py-2 px-2 md:px-8 md:py-4 bg-primary w-full md:flex-row md:items-center md:justify-between">
      {/* Titulo */}
      <Link href="/" className="flex items-center gap-2 text-2xl">
        <MdOutlinePets />
        <h1>HappyPaws</h1>
      </Link>

      {/* Barra de búsqueda */}
      <form
        onSubmit={handleSearch}
        className="relative flex order-2 md:order-none md:flex-1 md:mx-6 pl-2 rounded-lg border-0 bg-white shadow-sm md:max-w-[40vw]"
      >
        {/* Barra de busqueda */}
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full text-black px-3 py-2 outline-none"
          type="text"
          placeholder="Search"
        />
        <button className="text-primary text-[1.2rem] px-4 py-2">
          <FaSearch />
        </button>
        {/* Resultados recomendados */}
        {data?.results?.length > 0 && (
          <div className="absolute left-0 top-full mt-0.5 w-full bg-white shadow-lg rounded-lg flex flex-col text-black">
            {data.results.map((p: any) => (
              <Link
                onClick={() => setSearchText("")}
                href={`/product/${p.id}`}
                className="px-4 py-3 rounded-lg hover:bg-gray-100"
                key={p.id}
              >
                {p.name}
              </Link>
            ))}
          </div>
        )}
      </form>

      {/* Botones de acción */}
      <div className="flex items-center justify-end absolute top-0 right-0 md:static">
        {/* Boton de chat  */}
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl hover:bg-primary-hover px-3 py-2"
        >
          <FaComment className="text-3xl" />
          <h6 className="hidden md:block">Help</h6>
          <FaChevronDown className="hidden md:block" />
        </Link>
        {/* Boton de perfil o auth */}
        <div
          className="relative flex items-center gap-2 rounded-xl hover:bg-primary-hover px-3 py-2"
          onMouseEnter={() => user && setShowOptionsProfile(true)}
          onMouseLeave={() => user && setShowOptionsProfile(false)}
        >
          <Link
            href={user ? "/profile" : "/auth"}
            className="flex items-center gap-2"
          >
            <FaUserCircle className="text-3xl" />
            <h6 className="hidden md:block">
              {user ? user.name?.split(" ")[0] : "Sign In"}
            </h6>
            <FaChevronDown className="hidden md:block" />
          </Link>
          {/* Seccion de opciones de usuario */}
          {showOptionsProfile && (
            <section className="absolute top-[47px] right-0 flex flex-col p-2 rounded-xl bg-white text-black shadow-2xl w-max font-bold">
              {optionsUser.map(({ label, href, icon: Icon }) => {
                const classes =
                  "flex items-center gap-2 py-2 px-3 hover:bg-gray-200 rounded-xl cursor-pointer";
                // Si el elemento es un link
                if (href) {
                  return (
                    <Link key={label} href={href} className={classes}>
                      <Icon />
                      {label}
                    </Link>
                  );
                }
                // Si el elemento es el boton de sign out
                return (
                  <button
                    key={label}
                    onClick={() => logout()}
                    className={classes}
                  >
                    <Icon />
                    {label}
                  </button>
                );
              })}
            </section>
          )}
        </div>
        {/* Boton de carrito */}
        <Link
          href="/cart"
          className="flex items-center gap-2 rounded-xl hover:bg-primary-hover px-3 py-2"
        >
          <FaShoppingCart className="text-3xl" />
          <h6 className="hidden md:block">Cart</h6>
          <FaChevronDown className="hidden md:block" />
        </Link>
      </div>
    </header>
  );
}
