import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  });

// Cache in ALL environments to prevent connection pool exhaustion in production
if (!globalForPrisma.prisma) globalForPrisma.prisma = prisma;
