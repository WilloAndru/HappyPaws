import { AnimalType, Category } from "@/generated/prisma";
import { NextResponse } from "next/server";

// Funcion para obetener todos los tipos de animales y las categorias
export async function GET() {
  try {
    return NextResponse.json({
      animalTypes: Object.values(AnimalType),
      categories: Object.values(Category),
    });
  } catch (error) {
    console.error("Error", error);
  }
}
