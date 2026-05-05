import { readdirSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const VARIANT = "-TS-TW";
const COMPONENTS_DIR = join(repoRoot, "src", "components");
const BATCH = 12;
const registryUrl = "https://reactbits.dev/r/registry.json";

function collectTsxBasenames(dir) {
  const out = new Set();
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      for (const b of collectTsxBasenames(full)) out.add(b);
      continue;
    }
    if (name.endsWith(".tsx")) out.add(basename(name, ".tsx"));
  }
  return out;
}

const res = await fetch(registryUrl);
if (!res.ok) {
  console.error(`Failed to fetch registry: ${res.status}`);
  process.exit(1);
}
const registry = await res.json();

const have = collectTsxBasenames(COMPONENTS_DIR);

const all = registry.items
  .filter((i) => i.name.endsWith(VARIANT))
  .map((i) => {
    const base = i.name.slice(0, -VARIANT.length);
    return { pkg: `@react-bits/${i.name}`, base };
  });

const missing = all.filter(({ base }) => !have.has(base)).map((x) => x.pkg);

console.log(
  `React Bits (${VARIANT}): expected ${all.length}, already in src/components: ${have.size}, to install: ${missing.length}`,
);

if (missing.length === 0) {
  console.log("Nothing to install.");
  process.exit(0);
}

for (let i = 0; i < missing.length; i += BATCH) {
  const batch = missing.slice(i, i + BATCH);
  const n = Math.floor(i / BATCH) + 1;
  const total = Math.ceil(missing.length / BATCH);
  console.log(`\n>>> Batch ${n}/${total} (${batch.length} packages)…`);

  const r = spawnSync(
    "npx",
    ["--yes", "shadcn@latest", "add", ...batch, "-y"],
    { stdio: "inherit", shell: true, cwd: repoRoot },
  );

  if (r.status !== 0) {
    console.error(`Batch ${n} failed (exit ${r.status ?? 1}).`);
    process.exit(r.status ?? 1);
  }
}

console.log("\nAll missing React Bits packages installed.");
