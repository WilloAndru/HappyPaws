"use client";
import { Select } from "@/components/Select";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchProducts } from "../hooks/useProducts";
import Image from "next/image";
import Link from "next/link";

export default function Filters() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || ""; //String a buscar

  // Estados y elementos de los filtros
  const [animalTypes, setAnimalTypes] = useState([]);
  const [animalType, setAnimalType] = useState<any>();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState<any>();
  const optionsPrice = [
    { value: 0, label: "Lowest price first" },
    { value: 1, label: "Highest price first" },
  ];
  const [orderPrice, setOrderPrice] = useState<any>();

  // Obtenemos los datos de las categorias para los filtros
  useEffect(() => {
    const getCategoriesForFilters = async () => {
      try {
        const res = await axios.get("/api/categories");
        // Guardamos todos los tipos de animales
        setAnimalTypes(
          res.data.animalTypes.map((item: string, index: number) => ({
            value: index,
            label: item,
          }))
        );
        // Guardamos el tipo de animal actual a filtrar
        setAnimalType(
          res.data.animalTypes.find(
            (a: any) => a.label === searchParams.get("animalType")
          )
        );
        // Guardamos todas las categorias
        setCategories(
          res.data.categories.map((item: string, index: number) => ({
            value: index,
            label: item,
          }))
        );
        // Guardamos la categoria actual a filtrar
        setCategory(
          res.data.categories.find(
            (a: any) => a.label === searchParams.get("category")
          )
        );
      } catch (error) {
        console.error("Error", error);
      }
    };
    getCategoriesForFilters();
  }, []);

  // Obtenemos todos los productos indicados
  const { data } = useSearchProducts(
    search,
    searchParams.get("animalType"),
    searchParams.get("category"),
    50
  );
  const [filteredData, setFilteredData] = useState(data?.results || []);
  useEffect(() => {
    setFilteredData(data?.results || []);
  }, [data]);

  // Aplicar filtros
  const handleFilter = () => {};

  // Limpiar filtros
  const handleClearFilter = () => {
    setAnimalType(null);
    setCategory(null);
    setOrderPrice(null);
  };

  return (
    <main className="flex gap-4 flex-col md:flex-row">
      {/* Seccion de filtros */}
      <section className="md:sticky md:top-25 bg-gray-200 rounded-xl px-5 py-3 md:w-1/3 flex flex-col gap-4 h-fit">
        {/* Filtro por precio */}
        <div className="flex gap-2 flex-col">
          <h5>Price</h5>
          <Select options={optionsPrice} onChange={setOrderPrice} />
        </div>
        {/* Filtro por tipo de animal */}
        <div className="flex gap-2 flex-col">
          <h5>Animal type</h5>
          <Select options={animalTypes} onChange={setAnimalType} />
        </div>
        {/* Filtro por categoria */}
        <div className="flex gap-2 flex-col">
          <h5>Category</h5>
          <Select options={categories} onChange={setCategory} />
        </div>
        {/* Botones de filtrar y limpiar filtro */}
        <div className="flex gap-2 mb-2">
          <button
            onClick={handleFilter}
            className="rounded-xl text-white px-4 py-2 bg-primary hover:bg-primary-hover w-1/2"
          >
            Apply filters
          </button>
          <button
            onClick={handleClearFilter}
            className="rounded-xl text-white px-4 py-2 bg-blue-400 hover:bg-blue-500 w-1/2"
          >
            Clear filters
          </button>
        </div>
      </section>
      {/* Seccion de paginacion */}
      <section className="bg-gray-200 rounded-xl px-5 py-3 flex flex-col gap-3 md:w-2/3">
        {/* Header paginacion */}
        <header className="flex justify-between">
          {/* Titulo de que se esta buscando por caracteres */}
          {search !== "" && (
            <h2>{search[0].toUpperCase() + search.slice(1)}</h2>
          )}
          {/* Indicadores de que se esta filtrando */}
          <div className="flex gap-3">
            {animalType && (
              <h6 className="px-3 py-2 bg-gray-100 rounded-xl">
                {animalType.label}
              </h6>
            )}
            {category && (
              <h6 className="px-3 py-2 bg-gray-100 rounded-xl">
                {category.label}
              </h6>
            )}
          </div>
        </header>
        {/* Lista de productos */}
        {filteredData?.map((item: any) => (
          <Link
            href={`/product/${item.id}`}
            key={item.id}
            className="rounded-xl flex gap-4 p-4 bg-white hover:bg-gray-50"
          >
            {/* Imagen producto */}
            <Image
              src={item.imageUrl}
              width={120}
              height={120}
              alt={item.name}
              className="rounded-xl object-contain"
            />
            <div className="flex flex-col gap-1 justify-center">
              {/* Nombre */}
              <h5>{item.name}</h5>
              {/* Precio */}
              <div className="flex flex-col">
                <p className="line-through text-gray-400">$ {item.price}</p>
                <div className="flex gap-4">
                  <h5>$ {(item.price * (1 - item.discount)).toFixed(2)}</h5>
                  <h6 className="text-white px-2 py-1 rounded-xl bg-primary">
                    {item.discount * 100}% OFF
                  </h6>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
