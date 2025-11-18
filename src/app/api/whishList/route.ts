import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

//Funcion para eliminar o agregar un producto a la wishlist
export async function POST(req: Request) {
  try {
    const { userId, productId } = await req.json();

    const wishItem = await prisma.wishListItem.findUnique({
      where: {
        userId_productId: { userId, productId },
      },
    });

    if (wishItem) {
      await prisma.wishListItem.delete({
        where: {
          userId_productId: { userId, productId },
        },
      });

      return NextResponse.json({ status: "removed" });
    } else {
      const newItem = await prisma.wishListItem.create({
        data: {
          userId,
          productId,
        },
      });

      return NextResponse.json({ status: "added", data: newItem });
    }
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json(false, { status: 500 });
  }
}
