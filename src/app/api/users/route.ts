import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(false, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    return NextResponse.json(!!user);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(false, { status: 500 });
  }
}

// Registro o login con firebase
export async function POST(req: Request) {
  try {
    const { email, name, image, firebaseUid } = await req.json();

    // Upsert busca el user por el uid, lo crea si no esta y si esta lo envia
    const user = await prisma.user.upsert({
      where: { firebaseUid },
      update: {},
      create: {
        firebaseUid,
        email,
        name,
        image,
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        createdAt: true,
      },
    });

    return Response.json(user, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(false, { status: 500 });
  }
}
