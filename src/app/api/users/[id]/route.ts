import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Cambiar la direccion del usuario
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { address, city, country, isDefault } = await req.json();

    await prisma.address.update({
      where: { id: params.id },
      data: {},
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json(false, { status: 500 });
  }
}
