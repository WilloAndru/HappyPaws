"use client";
import { Select } from "@/components/Select";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchProducts } from "../hooks/useProducts";

export default function Filters() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || ""; //String a buscar
  const [animalType, setAnimalType] = useState<string | null>(
    searchParams.get("animalType")
  ); //Tipo de animal a filtrar
  const [category, setCategory] = useState<string | null>(
    searchParams.get("category")
  ); //Categoria a filtrar

  // Listas de elementos de los selects
  const [animalTypes, setAnimalTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const optionsPrice = [
    { value: 0, label: "Lowest price first" },
    { value: 1, label: "Highest price first" },
  ];

  // Obtenemos todos los productos indicados
  const { data } = useSearchProducts(search, animalType, category, 50);

  // Obtenemos los datos de las categorias para los filtros
  useEffect(() => {
    const getCategoriesForFilters = async () => {
      // Funcion para capitalizar los label
      const capitalize = (text: string) =>
        text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

      try {
        const res = await axios.get("/api/categories");
        setAnimalTypes(
          res.data.animalTypes.map((item: string, index: number) => ({
            value: index,
            label: capitalize(item),
          }))
        );
        setCategories(
          res.data.categories.map((item: string, index: number) => ({
            value: index,
            label: capitalize(item),
          }))
        );
      } catch (error) {
        console.error("Error", error);
      }
    };
    getCategoriesForFilters();
  }, []);

  return (
    <main className="flex gap-4 flex-col md:flex-row">
      {/* Seccion de filtros */}
      <section className="bg-gray-200 rounded-xl px-5 py-3 md:w-1/3 flex flex-col gap-4">
        {/* Filtro por precio */}
        <div className="flex gap-2 flex-col">
          <h5>Price</h5>
          <Select options={optionsPrice} />
        </div>
        {/* Filtro por tipo de animal */}
        <div className="flex gap-2 flex-col">
          <h5>Animal type</h5>
          <Select options={animalTypes} />
        </div>
        {/* Filtro por categoria */}
        <div className="flex gap-2 flex-col">
          <h5>Category</h5>
          <Select options={categories} />
        </div>
        {/* Botones de filtrar y limpiar filtro */}
        <div className="flex gap-2 mb-2">
          <button className="rounded-xl text-white px-4 py-2 bg-primary hover:bg-primary-hover w-1/2">
            Apply filters
          </button>
          <button className="rounded-xl text-white px-4 py-2 bg-blue-400 hover:bg-blue-500 w-1/2">
            Clear filters
          </button>
        </div>
      </section>
      {/* Seccion de paginacion */}
      <section className="bg-gray-200 rounded-xl px-5 py-3 flex flex-col gap-2 md:w-2/3">
        {/* Header paginacion */}
        <header className="flex justify-between">
          {/* Titulo de que se esta buscando por caracteres */}
          {search !== "" && (
            <h2>{search[0].toUpperCase() + search.slice(1)}</h2>
          )}
          {/* Indicadores de que se esta filtrando */}
          <div className="flex gap-3">
            {animalType && (
              <h6 className="px-3 py-2 bg-gray-100 rounded-xl">{animalType}</h6>
            )}
            {category && (
              <h6 className="px-3 py-2 bg-gray-100 rounded-xl">{category}</h6>
            )}
          </div>
        </header>
        {/* Lista de productos */}
      </section>
    </main>
  );
}
