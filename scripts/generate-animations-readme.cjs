const fs = require("fs");
const path = require("path");

const root = path.resolve("src/components/animations");
const readme = path.join(root, "README.md");

function walk(dir) {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(walk(p));
    else if (p.endsWith(".tsx")) out.push(p);
  }
  return out;
}

function parseProps(content) {
  const blocks = [
    ...content.matchAll(/interface\s+([A-Za-z0-9_]+Props?)\s*\{([\s\S]*?)\n\}/g),
  ];
  const props = [];
  for (const b of blocks) {
    for (const line of b[2].split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z0-9_]+)\??\s*:/);
      if (m) props.push(m[1]);
    }
  }
  return [...new Set(props)];
}

function deps(content) {
  const imports = [...content.matchAll(/from\s+['"]([^'"]+)['"]/g)].map(
    (m) => m[1],
  );
  const known = [
    "three",
    "@react-three/fiber",
    "@react-three/drei",
    "ogl",
    "gsap",
    "framer-motion",
    "motion/react",
    "matter-js",
  ];
  return known.filter((d) => imports.some((i) => i === d || i.startsWith(`${d}/`)));
}

const files = walk(root).sort((a, b) => a.localeCompare(b));
const groups = {};

for (const f of files) {
  const rel = f.replace(/\\/g, "/").split("/src/components/animations/")[1];
  const [category, file] = rel.split("/");
  const content = fs.readFileSync(f, "utf8");
  const name = file.replace(/\.tsx$/, "");
  const props = parseProps(content);
  const dep = deps(content);
  if (!groups[category]) groups[category] = [];
  groups[category].push({
    name,
    rel: `./${rel}`,
    props,
    dep,
  });
}

let md = "";
md += "# Animations Library\n\n";
md +=
  "Comprehensive reference for all reusable animation components in `src/components/animations`.\n\n";
md += `Total components: **${files.length}**\n\n`;
md += "## Installation\n\n";
md += "Install common dependencies used by this folder:\n\n";
md += "```bash\n";
md += "npm install gsap @gsap/react framer-motion three @react-three/fiber @react-three/drei ogl\n";
md += "```\n\n";
md += "Install only what your selected components need.\n\n";
md += "## Usage pattern\n\n";
md += "```tsx\n";
md += 'import Aurora from "./backgrounds/Aurora";\n\n';
md += "export function HeroBg() {\n";
md += "  return (\n";
md += '    <div className="absolute inset-0 pointer-events-none">\n';
md += "      <Aurora />\n";
md += "    </div>\n";
md += "  );\n";
md += "}\n";
md += "```\n\n";
md += "## Categories\n\n";
md += "- `backgrounds`: full-screen or section visual backdrops\n";
md += "- `interactive`: cursor/border/hover interaction helpers\n";
md += "- `motionUi`: animated UI widgets and layout pieces\n";
md += "- `textAnimations`: heading/paragraph/text effects\n\n";

for (const section of ["backgrounds", "interactive", "motionUi", "textAnimations"]) {
  const items = (groups[section] || []).sort((a, b) => a.name.localeCompare(b.name));
  md += `## ${section} (${items.length})\n\n`;
  for (const it of items) {
    const props = it.props.length
      ? it.props.map((p) => `\`${p}\``).join(", ")
      : "none explicitly typed";
    md += `### ${it.name}\n`;
    md += `- Path: \`${it.rel}\`\n`;
    md += `- Import: \`import ${it.name} from "${it.rel}";\`\n`;
    md += `- Props: ${props}\n`;
    if (it.dep.length) {
      md += `- External deps: ${it.dep.map((d) => `\`${d}\``).join(", ")}\n`;
    }
    md += "\n";
  }
}

md += "## Performance and integration notes\n\n";
md +=
  "- Heavy WebGL components (`three`, `@react-three/fiber`, `ogl`) should be used sparingly per page.\n";
md +=
  "- For hero backgrounds, combine with `pointer-events-none` unless interaction is required.\n";
md +=
  "- If an animation feels jerky, reduce count/line/particle props first, then disable parallax/interaction.\n";
md +=
  "- Prefer lazy loading for heavy sections (`React.lazy`) when they are below the fold.\n\n";
md += "## Maintenance\n\n";
md +=
  "When adding new components, update this README by adding the component under the right category with path, props, and dependencies.\n";

fs.writeFileSync(readme, md);
console.log(`Wrote README with ${files.length} components`);
