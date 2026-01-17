#!/usr/bin/env node

console.log("🚀 Starting Orbit CLI...");

import dotenv from "dotenv";

console.log("📦 Loading environment variables...");
dotenv.config();
console.log("✅ Environment variables loaded");

import chalk from "chalk";
import figlet from "figlet";
import { Command } from "commander";

console.log("📦 Loading CLI dependencies...");
import { login, logout, whoami } from "./commands/auth/login.js";
import { wakeUp } from "./commands/ai/wakeUp.js";
console.log("✅ CLI dependencies loaded");

async function main() {
  console.log("🎨 Generating CLI banner...");
  // Display banner
  console.log(
    chalk.cyan(
      figlet.textSync("Orbit CLI", {
        font: "Standard",
        horizontalLayout: "default",
      })
    )
  );
  console.log(chalk.gray("A Cli based AI tool \n"));

  console.log("⚙️ Setting up CLI program...");
  const program = new Command("orbit");

  program
    .version("0.0.1")
    .description("Orbit CLI - Device Flow Authentication");

  console.log("🔧 Adding CLI commands...");
  // Add commands
  program.addCommand(wakeUp);
  console.log("✅ Wake up command added");
  program.addCommand(login);
  console.log("✅ Login command added");
  program.addCommand(logout);
  console.log("✅ Logout command added");
  program.addCommand(whoami);
  console.log("✅ Whoami command added");

  // Default action shows help
  program.action(() => {
    console.log("ℹ️ No command specified, showing help...");
    program.help();
  });

  console.log("🎯 Parsing CLI arguments...");
  program.parse();
  console.log("✅ CLI parsing completed");
}

console.log("🏁 Executing main function...");
main().catch((error) => {
  console.error(chalk.red("❌ Error running Orbit CLI:"), error);
  console.log("💥 Exiting with code 1");
  process.exit(1);
});
