"use client";
import { useParams } from "next/navigation";

export default function Filters() {
  const params = useParams();
  const query = params.query as string;

  return (
    <main className="flex gap-4 flex-col md:flex-row">
      {/* Seccion de filtros */}
      <section className="bg-gray-200 rounded-xl px-4 py-2 md:w-1/3 flex flex-col gap-4">
        {/* Filtro por precio */}
        <div className="flex gap-2 flex-col"></div>
        {/* Filtro por tipo de animal */}
        <div className="flex gap-2 flex-col"></div>
        {/* Filtro por categoria */}
        <div className="flex gap-2 flex-col"></div>
        {/* Botones de filtrar y limpiar filtro */}
        <div className="flex gap-2"></div>
      </section>
      {/* Seccion de paginacion */}
      <section className="bg-gray-200 rounded-xl px-4 py-2 flex flex-col gap-2"></section>
    </main>
  );
}
