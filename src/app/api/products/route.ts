import { prisma } from "@/lib/prisma";
import { Category, AnimalType } from "@prisma/client";
import { NextResponse } from "next/server";

// Función para obtener productos con filtros opcionales
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const q = searchParams.get("q");
    const animalTypeParam = searchParams.get("animalType");
    const categoryParam = searchParams.get("category");
    const limit = Number(searchParams.get("limit")) || 50;

    // Enums reales solo si existen
    const categoryEnum = categoryParam
      ? Category[categoryParam as keyof typeof Category]
      : undefined;

    const animalTypeEnum = animalTypeParam
      ? AnimalType[animalTypeParam as keyof typeof AnimalType]
      : undefined;

    // Construir filtro dinámico sin basura
    const where: any = {};

    if (q) {
      where.name = {
        contains: q,
        mode: "insensitive",
      };
    }

    if (categoryEnum) where.category = categoryEnum;
    if (animalTypeEnum) where.animalType = animalTypeEnum;

    const products = await prisma.product.findMany({
      where: Object.keys(where).length ? where : undefined,

      orderBy: {
        createdAt: "desc", // orden fijo seguro
      },

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
