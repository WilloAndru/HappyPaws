import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Cambiar la direccion del usuario
export async function POST(req: Request) {
  try {
    const { userId, idAddress, name, address, city, country } =
      await req.json();

    // Si trae idAddress → actualizar
    if (idAddress) {
      const updated = await prisma.address.update({
        where: { id: idAddress },
        data: {
          name,
          address,
          city,
          country,
        },
      });

      return NextResponse.json(updated, { status: 200 });
    }

    // Si no trae idAddress → crear
    const created = await prisma.address.create({
      data: {
        userId,
        name,
        address,
        city,
        country,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json(false, { status: 500 });
  }
}
