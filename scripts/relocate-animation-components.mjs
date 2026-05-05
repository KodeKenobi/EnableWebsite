import { existsSync, mkdirSync, readdirSync, renameSync, unlinkSync } from "node:fs";
import { join, basename } from "node:path";

const repoRoot = join(import.meta.dirname, "..");
const componentsRoot = join(repoRoot, "src", "components");

const SKIP = new Set(["Hero.tsx", "Header.tsx", "IntroLoader.tsx"]);

/** @type {Record<string, Set<string>>} */
const byCategory = {
  textAnimations: new Set([
    "ASCIIText",
    "CircularText",
    "CountUp",
    "CurvedLoop",
    "DecryptedText",
    "FallingText",
    "FuzzyText",
    "GlitchText",
    "GradientText",
    "LetterGlitch",
    "RotatingText",
    "ScrambledText",
    "ScrollFloat",
    "ScrollReveal",
    "ScrollVelocity",
    "ShinyText",
    "TextCursor",
    "TextPressure",
    "TextType",
    "TrueFocus",
    "VariableProximity",
    "Shuffle",
  ]),
  backgrounds: new Set([
    "Aurora",
    "Balatro",
    "Ballpit",
    "Beams",
    "ColorBends",
    "DarkVeil",
    "Dither",
    "DotField",
    "DotGrid",
    "FaultyTerminal",
    "Galaxy",
    "GradientBlinds",
    "Grainient",
    "GridScan",
    "GridDistortion",
    "GridMotion",
    "Hyperspeed",
    "Iridescence",
    "LightRays",
    "Lightning",
    "LightPillar",
    "LineWaves",
    "EvilEye",
    "Radar",
    "SoftAurora",
    "LiquidChrome",
    "LiquidEther",
    "FloatingLines",
    "PixelSnow",
    "Noise",
    "Ribbons",
    "RippleGrid",
    "Silk",
    "ShapeGrid",
    "Threads",
    "Waves",
    "Orb",
    "Particles",
    "PixelBlast",
    "Plasma",
    "PlasmaWave",
    "Prism",
    "PrismaticBurst",
    "Cubes",
    "LaserFlow",
    "Antigravity",
    "OrbitImages",
    "MagicRings",
    "ImageTrail",
    "LogoLoop",
    "MetaBalls",
    "MetallicPaint",
    "PixelTrail",
    "PixelTransition",
    "StarBorder",
    "ShapeBlur",
    "GradualBlur",
  ]),
  interactive: new Set([
    "AnimatedContent",
    "FadeContent",
    "BlobCursor",
    "ClickSpark",
    "Crosshair",
    "GhostCursor",
    "Magnet",
    "MagnetLines",
    "SplashCursor",
    "StickerPeel",
    "TargetCursor",
    "GlareHover",
    "ElectricBorder",
  ]),
  motionUi: new Set([
    "AnimatedList",
    "BounceCards",
    "BubbleMenu",
    "CardNav",
    "CardSwap",
    "Carousel",
    "ChromaGrid",
    "CircularGallery",
    "Counter",
    "DecayCard",
    "Dock",
    "DomeGallery",
    "ElasticSlider",
    "FlowingMenu",
    "FluidGlass",
    "FlyingPosters",
    "Folder",
    "GlassIcons",
    "GlassSurface",
    "GooeyNav",
    "InfiniteMenu",
    "MagicBento",
    "Masonry",
    "ModelViewer",
    "PillNav",
    "PixelCard",
    "ProfileCard",
    "ScrollStack",
    "SpotlightCard",
    "BorderGlow",
    "Stack",
    "Stepper",
    "TiltedCard",
    "StaggeredMenu",
    "ReflectiveCard",
  ]),
};

const nameToCategory = new Map();
for (const [cat, names] of Object.entries(byCategory)) {
  for (const n of names) {
    if (nameToCategory.has(n)) {
      throw new Error(`Duplicate category mapping for "${n}"`);
    }
    nameToCategory.set(n, cat);
  }
}

/** Root duplicates — keep canonical copy already under animations/. */
const deleteRootDuplicates = new Set(["BlurText.tsx", "SplitText.tsx"]);

for (const f of deleteRootDuplicates) {
  const p = join(componentsRoot, f);
  if (existsSync(p)) {
    console.log(`Remove duplicate root: ${f} (animations/textAnimations/${basename(f)})`);
    unlinkSync(p);
  }
}

const animationsRoot = join(componentsRoot, "animations");
mkdirSync(animationsRoot, { recursive: true });

const files = readdirSync(componentsRoot).filter(
  (f) => f.endsWith(".tsx") && !SKIP.has(f),
);

let moved = 0;
for (const file of files) {
  const base = basename(file, ".tsx");
  const cat = nameToCategory.get(base);
  if (!cat) {
    throw new Error(`Uncategorized component at src/components/${file} — add it to scripts/relocate-animation-components.mjs`);
  }

  const destDir = join(animationsRoot, cat);
  mkdirSync(destDir, { recursive: true });
  const from = join(componentsRoot, file);
  const to = join(destDir, file);
  if (existsSync(to)) {
    console.log(`Skip (already exists): ${to}`);
    unlinkSync(from);
    continue;
  }
  renameSync(from, to);
  moved++;
  console.log(`Moved ${file} → animations/${cat}/`);
}

console.log(`Done. Moved ${moved} files.`);
