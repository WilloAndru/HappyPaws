import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

//Funcion para obtener los datos de un producto
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = Number(params.id);

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json({ status: 500 });
  }
}
