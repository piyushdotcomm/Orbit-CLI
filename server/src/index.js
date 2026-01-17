


import express from "express";
import { auth } from "./lib/auth.js";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3005;

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.get("/api/me", async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({ error: "No active session" });
    }

    return res.json(session);
  } catch (error) {
    console.error("Session error:", error);
    return res.status(500).json({ error: "Failed to get session" });
  }
});

app.get("/api/me/:access_token", async (req, res) => {
  const { access_token } = req.params;

  try {
    const session = await auth.api.getSession({
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    });

    if (!session) {
      return res.status(401).json({ error: "Invalid token" });
    }

    return res.json(session);
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
});

app.get("/device", async (req, res) => {
  const { user_code } = req.query;
  res.redirect(`${CLIENT_URL}/device?user_code=${user_code}`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
