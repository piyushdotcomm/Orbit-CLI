import { deviceAuthorizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: process.env.CLIENT_URL || "http://localhost:3005",
  plugins: [
    deviceAuthorizationClient(),
  ],
});
