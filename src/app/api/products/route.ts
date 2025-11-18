import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Funcion para obtener conjunto de productos por filtrado o no
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const sort = searchParams.get("sort");

    const products = await prisma.product.findMany({
      // Si sort esta definido, devuelve los productos filtrados, sino devulve todo
      orderBy: sort ? { [sort]: "desc" } : undefined,
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
