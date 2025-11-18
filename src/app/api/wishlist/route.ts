import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

//Funcion para eliminar o agregar un producto a la wishlist
export async function POST(req: Request) {
  try {
    const { userId, productId } = await req.json();

    // Buscamos el item favorito
    const wishItem = await prisma.wishItem.findUnique({
      where: {
        userId_productId: { userId, productId },
      },
    });
    // Si esta, lo eliminamos de favoritos
    if (wishItem) {
      await prisma.wishItem.delete({
        where: {
          userId_productId: { userId, productId },
        },
      });
      return NextResponse.json({ status: 200, id: wishItem.id });
    }
    // Si no esta, lo agregamos de favoritos
    else {
      const newItem = await prisma.wishItem.create({
        data: {
          userId,
          productId,
        },
      });
      return NextResponse.json({ status: 201, item: newItem });
    }
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json(false, { status: 500 });
  }
}
