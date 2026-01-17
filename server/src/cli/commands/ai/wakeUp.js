import chalk from "chalk";
import { Command } from "commander";
import yoctoSpinner from "yocto-spinner";
import { getStoredToken } from "../auth/login.js";
import prisma from "../../../lib/db.js";
import { select } from "@clack/prompts";
import { startChat } from "../../chat/chat-with-ai.js";
import { startToolChat } from "../../chat/chat-with-ai-tool.js";
import { startAgentChat } from "../../chat/chat-with-ai-agent.js";

const wakeUpAction = async () => {
  console.log("🌅 Starting wake up process...");

  console.log("🔑 Retrieving stored authentication token...");
  const token = await getStoredToken();

  if (!token?.access_token) {
    console.log(chalk.red("❌ Not authenticated. Please login."));
    return;
  }
  console.log("✅ Authentication token found");

  console.log("🔄 Starting spinner for user information fetch...");
  const spinner = yoctoSpinner({ text: "Fetching User Information..." });
  spinner.start();

  console.log("👤 Querying database for user information...");
  const user = await prisma.user.findFirst({
    where: {
      sessions: {
        some: { token: token.access_token },
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });

  spinner.stop();
  console.log("✅ User information fetch completed");

  if (!user) {
    console.log(chalk.red("❌ User not found."));
    return;
  }

  console.log(chalk.green(`\nWelcome back, ${user.name}!\n`));
  console.log("📋 Presenting AI mode selection menu...");

  const choice = await select({
    message: "Select an option:",
    options: [
      {
        value: "chat",
        label: "Chat",
        hint: "Simple chat with AI",
      },
      {
        value: "tool",
        label: "Tool Calling",
        hint: "Chat with tools (Google Search, Code Execution)",
      },
      {
        value: "agent",
        label: "Agentic Mode",
        hint: "Advanced AI agent (Coming soon)",
      },
    ],
  });

  switch (choice) {
    case "chat":
      console.log("💬 Starting simple chat mode...");
      await startChat("chat");
      console.log("✅ Simple chat session ended");
      break;
    case "tool":
      console.log("🛠️ Starting tool calling mode...");
      await startToolChat();
      console.log("✅ Tool calling session ended");
      break;
    case "agent":
      console.log("🤖 Starting agentic mode...");
      await startAgentChat();
      console.log("✅ Agentic session ended");
      break;
  }
};

export const wakeUp = new Command("wakeup")
  .description("Wake up the AI")
  .action(wakeUpAction);
