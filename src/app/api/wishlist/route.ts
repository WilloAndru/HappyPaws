import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

//Funcion para eliminar o agregar un producto a la wishlist
export async function POST(req: Request) {
  try {
    const { userId, productId } = await req.json();

    if (!userId || !productId) {
      return NextResponse.json(
        { error: "Missing userId or productId" },
        { status: 400 }
      );
    }

    // Buscar si ya existe
    const existing = await prisma.wishItem.findUnique({
      where: {
        userId_productId: { userId, productId },
      },
    });

    // Si existe → eliminar
    if (existing) {
      await prisma.wishItem.delete({
        where: { userId_productId: { userId, productId } },
      });

      return NextResponse.json({ message: "removed" }, { status: 200 });
    }

    // Si NO existe → crear
    await prisma.wishItem.create({
      data: { userId, productId },
    });

    return NextResponse.json({ message: "added" }, { status: 201 });
  } catch (error) {
    console.error("Wishlist error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
