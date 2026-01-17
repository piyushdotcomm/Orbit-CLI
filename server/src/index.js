


console.log("🚀 Starting Orbit CLI Server...");

import express from "express";
import { auth } from "./lib/auth.js";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import cors from "cors";

console.log("📦 Imported dependencies successfully");

const app = express();
const port = process.env.PORT || 3005;

console.log(`🔧 Server port configured: ${port}`);

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
console.log(`🌐 Client URL configured: ${CLIENT_URL}`);

console.log("🔒 Setting up CORS middleware...");
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
console.log("✅ CORS middleware configured");

console.log("📝 Setting up JSON parsing middleware...");
app.use(express.json());
console.log("✅ JSON middleware configured");

console.log("🔐 Setting up authentication routes...");
app.all("/api/auth/*splat", toNodeHandler(auth));
console.log("✅ Auth routes configured");

console.log("👤 Setting up /api/me route...");
app.get("/api/me", async (req, res) => {
  console.log("📨 Received request to /api/me");
  try {
    console.log("🔍 Getting session from headers...");
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    console.log("✅ Session retrieved:", session ? "Found" : "Not found");

    if (!session) {
      console.log("❌ No active session found");
      return res.status(401).json({ error: "No active session" });
    }

    console.log("✅ Session found, returning user data");
    return res.json(session);
  } catch (error) {
    console.error("❌ Session error:", error);
    return res.status(500).json({ error: "Failed to get session", details: error.message });
  }
});

console.log("🔑 Setting up /api/me/:access_token route...");
app.get("/api/me/:access_token", async (req, res) => {
  const { access_token } = req.params;
  console.log(`📨 Received request to /api/me/:access_token with token: ${access_token ? 'Present' : 'Missing'}`);

  try {
    console.log("🔍 Getting session with Bearer token...");
    const session = await auth.api.getSession({
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    });
    console.log("✅ Session retrieved:", session ? "Found" : "Not found");

    if (!session) {
      console.log("❌ No session found for provided token");
      return res.status(401).json({ error: "Invalid token" });
    }

    console.log("✅ Valid session found, returning user data");
    return res.json(session);
  } catch (error) {
    console.error("❌ Token validation error:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
});

console.log("📱 Setting up /device route...");
app.get("/device", async (req, res) => {
  const { user_code } = req.query;
  console.log(`📨 Received request to /device with user_code: ${user_code || 'Not provided'}`);
  console.log(`🔄 Redirecting to: ${CLIENT_URL}/device?user_code=${user_code}`);
  res.redirect(`${CLIENT_URL}/device?user_code=${user_code}`);
});

console.log("🚀 Starting server...");
app.listen(port, () => {
  console.log(`🎉 Server running on port ${port}`);
  console.log(`🌐 Server URL: http://localhost:${port}`);
  console.log(`🔗 Auth endpoints available at: http://localhost:${port}/api/auth`);
  console.log(`👤 User endpoints available at: http://localhost:${port}/api/me`);
  console.log(`📱 Device redirect available at: http://localhost:${port}/device`);
});
