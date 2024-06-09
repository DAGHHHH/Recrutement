import { PrismaClient } from '@prisma/client';

declare global {
  // Extend the NodeJS global type with prisma
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
