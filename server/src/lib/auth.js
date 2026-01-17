console.log("🔐 Initializing Better Auth configuration...");

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db.js";
import { deviceAuthorization } from "better-auth/plugins";

console.log("📦 Imported auth dependencies successfully");

console.log("🗄️ Setting up Prisma adapter...");
const adapter = prismaAdapter(prisma, {
  provider: "postgresql",
});
console.log("✅ Prisma adapter configured");

console.log("⚙️ Reading environment variables...");
const backendUrl = process.env.BACKEND_URL || "http://localhost:3005";
const trustedOrigins = process.env.TRUSTED_ORIGINS ? process.env.TRUSTED_ORIGINS.split(',') : [
  "http://localhost:3000",
  "https://orbit-cli.vercel.app",
];
const corsOrigin = process.env.CORS_ORIGIN === 'true';
const corsCredentials = process.env.CORS_CREDENTIALS === 'true';
const deviceExpiresIn = process.env.DEVICE_EXPIRES_IN || "30m";
const deviceInterval = process.env.DEVICE_INTERVAL || "5s";

console.log(`🌐 Backend URL: ${backendUrl}`);
console.log(`🔒 Trusted Origins: ${trustedOrigins.join(', ')}`);
console.log(`🌍 CORS Origin: ${corsOrigin}`);
console.log(`🍪 CORS Credentials: ${corsCredentials}`);
console.log(`⏰ Device Expires In: ${deviceExpiresIn}`);
console.log(`🔄 Device Interval: ${deviceInterval}`);

console.log("🔧 Configuring device authorization plugin...");
const devicePlugin = deviceAuthorization({
  expiresIn: deviceExpiresIn,
  interval: deviceInterval,
});
console.log("✅ Device authorization plugin configured");

console.log("🚀 Creating Better Auth instance...");
export const auth = betterAuth({
  database: adapter,

  // IMPORTANT: must be dynamic for production
  baseURL: backendUrl,
  basePath: "/api/auth",

  // IMPORTANT: allow your deployed frontend
  trustedOrigins: trustedOrigins,

  // IMPORTANT: better-auth CORS (this fixes localhost issue)
  cors: {
    origin: corsOrigin,
    credentials: corsCredentials,
  },

  plugins: [devicePlugin],

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },

  logger: {
    level: "debug",
  },
});

console.log("🎉 Better Auth configuration completed successfully!");
console.log("🔑 GitHub OAuth configured:", process.env.GITHUB_CLIENT_ID ? "Yes" : "No");
console.log("📊 Debug logging enabled");
