// Pack src/content/agent-economy/ into public/agent-economy.zip and .skill for download.
import { execSync } from "node:child_process";
import { copyFileSync, existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const contentDir = join(root, "src/content");
const publicDir = join(root, "public");
const zipPath = join(publicDir, "agent-economy.zip");

if (existsSync(zipPath)) rmSync(zipPath);
const skillPath = join(publicDir, "agent-economy.skill");
if (existsSync(skillPath)) rmSync(skillPath);
execSync(`zip -r ${zipPath} agent-economy`, { cwd: contentDir, stdio: "inherit" });
copyFileSync(zipPath, skillPath);
