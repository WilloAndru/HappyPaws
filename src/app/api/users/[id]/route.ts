import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Cambiar la direccion del usuario
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { address } = await req.json();

    await prisma.user.update({
      where: { id: params.id },
      data: { address },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json(false, { status: 500 });
  }
}
