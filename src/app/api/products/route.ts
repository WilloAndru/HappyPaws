import { Category } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Funcion para obtener conjunto de productos por filtrado o no
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const sort = searchParams.get("sort");
    const category = searchParams.get("category");
    // Pasamos el string de category a uno de los enums reales
    const categoryEnum = category
      ? Category[category as keyof typeof Category]
      : undefined;
    const limit = Number(searchParams.get("limit")) || undefined;

    const products = await prisma.product.findMany({
      // Si category esta definido, devuelve los productos por categoria, sino devulve todo
      where: category ? { category: categoryEnum } : undefined,
      // Si sort esta definido, devuelve los productos ordenados, sino devulve todo
      orderBy: sort ? { [sort]: "desc" } : undefined,
      // Devuelve solo el limite de productos
      take: limit,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
