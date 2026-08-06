import { execSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const nextDir = join(projectRoot, ".next");

function killPort(port) {
  try {
    const pids = execSync(`lsof -t -i:${port}`, { encoding: "utf8" })
      .trim()
      .split("\n")
      .filter(Boolean);
    for (const pid of pids) {
      execSync(`kill -9 ${pid}`);
      console.log(`Stopped process ${pid} on port ${port}`);
    }
  } catch {
    // Port already free
  }
}

killPort(3000);
killPort(3001);

if (existsSync(nextDir)) {
  rmSync(nextDir, { recursive: true, force: true });
  console.log("Removed .next cache");
}

console.log("Dev environment cleaned. Run: npm run dev");
