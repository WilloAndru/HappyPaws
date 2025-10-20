import { PrismaClient } from "../generated/prisma";

declare global {
  var prisma: PrismaClient | undefined;
}

let tempPrisma: PrismaClient | undefined = global.prisma;

if (!tempPrisma) {
  tempPrisma = new PrismaClient({
    log: ["query", "warn", "error"],
  });
}

export const prisma: PrismaClient = tempPrisma!;

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
