import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db.js";
import { deviceAuthorization } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  // IMPORTANT: must be dynamic for production
  baseURL: process.env.BACKEND_URL || "http://localhost:3005",
  basePath: "/api/auth",

  // IMPORTANT: allow your deployed frontend
  trustedOrigins: [
    "http://localhost:3000",
    "https://orbit-cli.vercel.app",
  ],

  // IMPORTANT: better-auth CORS (this fixes localhost issue)
  cors: {
    origin: true,
    credentials: true,
  },

  plugins: [
    deviceAuthorization({
      expiresIn: "30m",
      interval: "5s",
    }),
  ],

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
