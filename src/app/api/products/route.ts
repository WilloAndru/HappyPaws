import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sort = searchParams.get("sort") || "rating";
    const limit = Number(searchParams.get("limit") || 10);

    const products = await prisma.product.findMany({
      orderBy: { [sort]: "desc" },
      take: limit,
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
