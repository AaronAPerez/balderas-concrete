import { PrismaClient } from "@/src/generated/prisma";

/**
 * Prisma client configured for Neon database
 * Uses Neon's connection pooler for serverless environments
 */
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

// Use singleton pattern to avoid multiple connections in development
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;