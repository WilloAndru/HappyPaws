import { prisma } from "@/lib/prisma";
import { adminAuth } from "@/app/firebase/admin";
import { NextResponse } from "next/server";

// Registro o login con firebase
export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Required token" }, { status: 400 });
    }

    const decodedToken = await adminAuth.verifyIdToken(token);
    const { uid, email, name, picture } = decodedToken;

    let user = await prisma.user.findUnique({
      where: { firebaseUid: uid },
      include: { addresses: true },
    });

    // Si el usuario no esta registrado
    if (!user) {
      user = await prisma.user.create({
        data: {
          firebaseUid: uid,
          email: email || "",
          name: name || email?.split("@")[0],
          image: picture || null,
          cellphone: "",
          addresses: {
            create: {
              name: "Home",
              address: "",
              city: "",
              country: "",
              isDefault: true,
            },
          },
        },
        include: { addresses: true },
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(false, { status: 500 });
  }
}
