console.log("🗄️ Initializing Prisma database client...");

import {PrismaClient} from "@prisma/client";

console.log("📦 Imported Prisma client");

const globalForPrisma = global
console.log("🌍 Setting up global Prisma instance for development");

const prisma = new PrismaClient();
console.log("🔧 Created new Prisma client instance");

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  console.log("💾 Global Prisma instance stored for development hot reload");
} else {
  console.log("🏭 Production mode: Not using global Prisma instance");
}

console.log("✅ Prisma database client initialized successfully");
console.log(`🔌 Database URL configured: ${process.env.DATABASE_URL ? 'Yes' : 'No'}`);

export default prisma