console.log("🗄️ Initializing Prisma database client...");

import {PrismaClient} from "@prisma/client";

console.log("📦 Imported Prisma client");

const globalForPrisma = global
console.log("🌍 Setting up global Prisma instance for development");

console.log(`🔌 Database URL configured: ${process.env.DATABASE_URL ? 'Yes' : 'No'}`);
console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);

// Configure Prisma client with better error handling and connection settings
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

console.log("🔧 Created new Prisma client instance");

// Test database connection
console.log("🔍 Testing database connection...");
prisma.$connect()
  .then(() => {
    console.log("✅ Database connection successful");
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
    console.error("🔧 Please check your DATABASE_URL and ensure the database is accessible");
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  console.log("💾 Global Prisma instance stored for development hot reload");
} else {
  console.log("🏭 Production mode: Not using global Prisma instance");
}

console.log("✅ Prisma database client initialized successfully");