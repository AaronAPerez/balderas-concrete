import { PrismaClient } from "@/src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

/**
 * Prisma client configured for Neon serverless
 * Uses the Neon serverless adapter for better connection handling in serverless environments
 */
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;

  // Use Neon serverless adapter for better connection handling
  if (connectionString) {
    // Create the Prisma adapter with the connection string config
    const adapter = new PrismaNeon({ connectionString });
    return new PrismaClient({
      adapter,
      log: ["error", "warn"],
    }) as PrismaClient;
  }

  // Fallback for local development without DATABASE_URL
  return new PrismaClient({
    log: ["error", "warn"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;