// @/lib/db/index.ts

import { PrismaClient } from '@prisma/client';

// Initialize the Prisma client instance
export const prisma = new PrismaClient();

// Export the Prisma client instance for usage in other files
export default prisma;
