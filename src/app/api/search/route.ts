import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Funcion para devolver la lista de recomendaciones de busqueda
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const q = (url.searchParams.get("q") || "").trim(); // Extraemos la palabra a buscar
    const limit = (url.searchParams.get("limit") || "").trim(); // Extraemos el limite de objetos a devolver

    //Si el usuario no escribio nada
    if (!q) {
      return NextResponse.json({ res: [] });
    }

    const results = await prisma.product.findMany({
      where: {
        name: { contains: q, mode: "insensitive" },
      },
      take: Number(limit), // Devolvemos los 8 primeros
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(false, { status: 500 });
  }
}
