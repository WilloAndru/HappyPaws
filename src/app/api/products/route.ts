import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        purchases: "desc", // ordena de mayor a menor
      },
      take: 10, // limita el resultado a los 10 primeros
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error GET /api/products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
