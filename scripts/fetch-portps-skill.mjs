// Pull the portps SKILL.md straight from its GitHub repo into src/content so the
// site preview never drifts from the source of truth. Network failure isn't
// fatal — keep whatever copy is already on disk (fresh checkout / previous run).
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const SKILL_URL =
  "https://raw.githubusercontent.com/overdraft-protocol/portps/main/skills/portps/SKILL.md";
const dest = join(import.meta.dirname, "../src/content/portps/SKILL.md");

try {
  const res = await fetch(SKILL_URL);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  writeFileSync(dest, await res.text());
  console.log(`✓ fetched portps SKILL.md from GitHub`);
} catch (err) {
  console.warn(`⚠ could not fetch portps SKILL.md (${err.message}) — using existing copy`);
}
