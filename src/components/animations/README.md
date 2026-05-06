# Animations Library

Comprehensive reference for all reusable animation components in `src/components/animations`.

Total components: **135**

## Installation

Install common dependencies used by this folder:

```bash
npm install gsap @gsap/react framer-motion three @react-three/fiber @react-three/drei ogl
```

Install only what your selected components need.

## Usage pattern

```tsx
import Aurora from "./backgrounds/Aurora";

export function HeroBg() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Aurora />
    </div>
  );
}
```

## Categories

- `backgrounds`: full-screen or section visual backdrops
- `interactive`: cursor/border/hover interaction helpers
- `motionUi`: animated UI widgets and layout pieces
- `textAnimations`: heading/paragraph/text effects

## backgrounds (57)

### Antigravity
- Path: `./backgrounds/Antigravity.tsx`
- Import: `import Antigravity from "./backgrounds/Antigravity.tsx";`
- Props: `count`, `magnetRadius`, `ringRadius`, `waveSpeed`, `waveAmplitude`, `particleSize`, `lerpSpeed`, `color`, `autoAnimate`, `particleVariance`, `rotationSpeed`, `depthFactor`, `pulseSpeed`, `particleShape`, `fieldStrength`
- External deps: `three`, `@react-three/fiber`

### Aurora
- Path: `./backgrounds/Aurora.tsx`
- Import: `import Aurora from "./backgrounds/Aurora.tsx";`
- Props: `colorStops`, `amplitude`, `blend`, `time`, `speed`
- External deps: `ogl`

### Balatro
- Path: `./backgrounds/Balatro.tsx`
- Import: `import Balatro from "./backgrounds/Balatro.tsx";`
- Props: `spinRotation`, `spinSpeed`, `offset`, `color1`, `color2`, `color3`, `contrast`, `lighting`, `spinAmount`, `pixelFilter`, `spinEase`, `isRotate`, `mouseInteraction`
- External deps: `ogl`

### Ballpit
- Path: `./backgrounds/Ballpit.tsx`
- Import: `import Ballpit from "./backgrounds/Ballpit.tsx";`
- Props: `className`, `followCursor`
- External deps: `three`, `gsap`

### Beams
- Path: `./backgrounds/Beams.tsx`
- Import: `import Beams from "./backgrounds/Beams.tsx";`
- Props: `beamWidth`, `beamHeight`, `beamNumber`, `lightColor`, `speed`, `noiseIntensity`, `scale`, `rotation`
- External deps: `three`, `@react-three/fiber`, `@react-three/drei`

### ColorBends
- Path: `./backgrounds/ColorBends.tsx`
- Import: `import ColorBends from "./backgrounds/ColorBends.tsx";`
- Props: none explicitly typed
- External deps: `three`

### Cubes
- Path: `./backgrounds/Cubes.tsx`
- Import: `import Cubes from "./backgrounds/Cubes.tsx";`
- Props: `gridSize`, `cubeSize`, `maxAngle`, `radius`, `easing`, `duration`, `cellGap`, `borderStyle`, `faceColor`, `shadow`, `autoAnimate`, `rippleOnClick`, `rippleColor`, `rippleSpeed`
- External deps: `gsap`

### DarkVeil
- Path: `./backgrounds/DarkVeil.tsx`
- Import: `import DarkVeil from "./backgrounds/DarkVeil.tsx";`
- Props: none explicitly typed
- External deps: `ogl`

### Dither
- Path: `./backgrounds/Dither.tsx`
- Import: `import Dither from "./backgrounds/Dither.tsx";`
- Props: `waveSpeed`, `waveFrequency`, `waveAmplitude`, `waveColor`, `colorNum`, `pixelSize`, `disableAnimation`, `enableMouseInteraction`, `mouseRadius`
- External deps: `three`, `@react-three/fiber`

### DotField
- Path: `./backgrounds/DotField.tsx`
- Import: `import DotField from "./backgrounds/DotField.tsx";`
- Props: `dotRadius`, `dotSpacing`, `cursorRadius`, `cursorForce`, `bulgeOnly`, `bulgeStrength`, `glowRadius`, `sparkle`, `waveAmplitude`, `gradientFrom`, `gradientTo`, `glowColor`

### DotGrid
- Path: `./backgrounds/DotGrid.tsx`
- Import: `import DotGrid from "./backgrounds/DotGrid.tsx";`
- Props: `dotSize`, `gap`, `baseColor`, `activeColor`, `proximity`, `speedTrigger`, `shockRadius`, `shockStrength`, `maxSpeed`, `resistance`, `returnDuration`, `className`, `style`
- External deps: `gsap`

### EvilEye
- Path: `./backgrounds/EvilEye.tsx`
- Import: `import EvilEye from "./backgrounds/EvilEye.tsx";`
- Props: `eyeColor`, `intensity`, `pupilSize`, `irisWidth`, `glowIntensity`, `scale`, `noiseScale`, `pupilFollow`, `flameSpeed`, `backgroundColor`
- External deps: `ogl`

### FaultyTerminal
- Path: `./backgrounds/FaultyTerminal.tsx`
- Import: `import FaultyTerminal from "./backgrounds/FaultyTerminal.tsx";`
- Props: none explicitly typed
- External deps: `ogl`

### FloatingLines
- Path: `./backgrounds/FloatingLines.tsx`
- Import: `import FloatingLines from "./backgrounds/FloatingLines.tsx";`
- Props: none explicitly typed
- External deps: `three`

### Galaxy
- Path: `./backgrounds/Galaxy.tsx`
- Import: `import Galaxy from "./backgrounds/Galaxy.tsx";`
- Props: `focal`, `rotation`, `starSpeed`, `density`, `hueShift`, `disableAnimation`, `speed`, `mouseInteraction`, `glowIntensity`, `saturation`, `mouseRepulsion`, `twinkleIntensity`, `rotationSpeed`, `repulsionStrength`, `autoCenterRepulsion`, `transparent`
- External deps: `ogl`

### GradientBlinds
- Path: `./backgrounds/GradientBlinds.tsx`
- Import: `import GradientBlinds from "./backgrounds/GradientBlinds.tsx";`
- Props: `className`, `dpr`, `paused`, `gradientColors`, `angle`, `noise`, `blindCount`, `blindMinWidth`, `mouseDampening`, `mirrorGradient`, `spotlightRadius`, `spotlightSoftness`, `spotlightOpacity`, `distortAmount`, `shineDirection`, `mixBlendMode`
- External deps: `ogl`

### GradualBlur
- Path: `./backgrounds/GradualBlur.tsx`
- Import: `import GradualBlur from "./backgrounds/GradualBlur.tsx";`
- Props: none explicitly typed

### Grainient
- Path: `./backgrounds/Grainient.tsx`
- Import: `import Grainient from "./backgrounds/Grainient.tsx";`
- Props: `timeSpeed`, `colorBalance`, `warpStrength`, `warpFrequency`, `warpSpeed`, `warpAmplitude`, `blendAngle`, `blendSoftness`, `rotationAmount`, `noiseScale`, `grainAmount`, `grainScale`, `grainAnimated`, `contrast`, `gamma`, `saturation`, `centerX`, `centerY`, `zoom`, `color1`, `color2`, `color3`, `className`
- External deps: `ogl`

### GridDistortion
- Path: `./backgrounds/GridDistortion.tsx`
- Import: `import GridDistortion from "./backgrounds/GridDistortion.tsx";`
- Props: `grid`, `mouse`, `strength`, `relaxation`, `imageSrc`, `className`
- External deps: `three`

### GridMotion
- Path: `./backgrounds/GridMotion.tsx`
- Import: `import GridMotion from "./backgrounds/GridMotion.tsx";`
- Props: `items`, `gradientColor`
- External deps: `gsap`

### GridScan
- Path: `./backgrounds/GridScan.tsx`
- Import: `import GridScan from "./backgrounds/GridScan.tsx";`
- Props: none explicitly typed
- External deps: `three`

### Hyperspeed
- Path: `./backgrounds/Hyperspeed.tsx`
- Import: `import Hyperspeed from "./backgrounds/Hyperspeed.tsx";`
- Props: `effectOptions`
- External deps: `three`

### ImageTrail
- Path: `./backgrounds/ImageTrail.tsx`
- Import: `import ImageTrail from "./backgrounds/ImageTrail.tsx";`
- Props: `items`, `variant`
- External deps: `gsap`

### Iridescence
- Path: `./backgrounds/Iridescence.tsx`
- Import: `import Iridescence from "./backgrounds/Iridescence.tsx";`
- Props: `color`, `speed`, `amplitude`, `mouseReact`
- External deps: `ogl`

### LaserFlow
- Path: `./backgrounds/LaserFlow.tsx`
- Import: `import LaserFlow from "./backgrounds/LaserFlow.tsx";`
- Props: none explicitly typed
- External deps: `three`

### Lightning
- Path: `./backgrounds/Lightning.tsx`
- Import: `import Lightning from "./backgrounds/Lightning.tsx";`
- Props: `hue`, `xOffset`, `speed`, `intensity`, `size`

### LightPillar
- Path: `./backgrounds/LightPillar.tsx`
- Import: `import LightPillar from "./backgrounds/LightPillar.tsx";`
- Props: `topColor`, `bottomColor`, `intensity`, `rotationSpeed`, `interactive`, `className`, `glowAmount`, `pillarWidth`, `pillarHeight`, `noiseIntensity`, `mixBlendMode`, `pillarRotation`, `quality`
- External deps: `three`

### LightRays
- Path: `./backgrounds/LightRays.tsx`
- Import: `import LightRays from "./backgrounds/LightRays.tsx";`
- Props: `raysOrigin`, `raysColor`, `raysSpeed`, `lightSpread`, `rayLength`, `pulsating`, `fadeDistance`, `saturation`, `followMouse`, `mouseInfluence`, `noiseAmount`, `distortion`, `className`
- External deps: `ogl`

### LineWaves
- Path: `./backgrounds/LineWaves.tsx`
- Import: `import LineWaves from "./backgrounds/LineWaves.tsx";`
- Props: `speed`, `innerLineCount`, `outerLineCount`, `warpIntensity`, `rotation`, `edgeFadeWidth`, `colorCycleSpeed`, `brightness`, `color1`, `color2`, `color3`, `enableMouseInteraction`, `mouseInfluence`
- External deps: `ogl`

### LiquidChrome
- Path: `./backgrounds/LiquidChrome.tsx`
- Import: `import LiquidChrome from "./backgrounds/LiquidChrome.tsx";`
- Props: none explicitly typed
- External deps: `ogl`

### LiquidEther
- Path: `./backgrounds/LiquidEther.tsx`
- Import: `import LiquidEther from "./backgrounds/LiquidEther.tsx";`
- Props: `mouseForce`, `cursorSize`, `isViscous`, `viscous`, `iterationsViscous`, `iterationsPoisson`, `dt`, `BFECC`, `resolution`, `isBounce`, `colors`, `style`, `className`, `autoDemo`, `autoSpeed`, `autoIntensity`, `takeoverDuration`, `autoResumeDelay`, `autoRampDuration`
- External deps: `three`

### LogoLoop
- Path: `./backgrounds/LogoLoop.tsx`
- Import: `import LogoLoop from "./backgrounds/LogoLoop.tsx";`
- Props: `logos`, `speed`, `direction`, `width`, `logoHeight`, `gap`, `pauseOnHover`, `hoverSpeed`, `fadeOut`, `fadeOutColor`, `scaleOnHover`, `renderItem`, `ariaLabel`, `className`, `style`

### MagicRings
- Path: `./backgrounds/MagicRings.tsx`
- Import: `import MagicRings from "./backgrounds/MagicRings.tsx";`
- Props: `color`, `colorTwo`, `speed`, `ringCount`, `attenuation`, `lineThickness`, `baseRadius`, `radiusStep`, `scaleRate`, `opacity`, `blur`, `noiseAmount`, `rotation`, `ringGap`, `fadeIn`, `fadeOut`, `followMouse`, `mouseInfluence`, `hoverScale`, `parallax`, `clickBurst`
- External deps: `three`

### MetaBalls
- Path: `./backgrounds/MetaBalls.tsx`
- Import: `import MetaBalls from "./backgrounds/MetaBalls.tsx";`
- Props: none explicitly typed
- External deps: `ogl`

### MetallicPaint
- Path: `./backgrounds/MetallicPaint.tsx`
- Import: `import MetallicPaint from "./backgrounds/MetallicPaint.tsx";`
- Props: `imageSrc`, `seed`, `scale`, `refraction`, `blur`, `liquid`, `speed`, `brightness`, `contrast`, `angle`, `fresnel`, `lightColor`, `darkColor`, `patternSharpness`, `waveAmplitude`, `noiseScale`, `chromaticSpread`, `mouseAnimation`, `distortion`, `contour`, `tintColor`

### Noise
- Path: `./backgrounds/Noise.tsx`
- Import: `import Noise from "./backgrounds/Noise.tsx";`
- Props: `patternSize`, `patternScaleX`, `patternScaleY`, `patternRefreshInterval`, `patternAlpha`

### Orb
- Path: `./backgrounds/Orb.tsx`
- Import: `import Orb from "./backgrounds/Orb.tsx";`
- Props: `hue`, `hoverIntensity`, `rotateOnHover`, `forceHoverState`, `backgroundColor`
- External deps: `ogl`

### OrbitImages
- Path: `./backgrounds/OrbitImages.tsx`
- Import: `import OrbitImages from "./backgrounds/OrbitImages.tsx";`
- Props: `images`, `altPrefix`, `shape`, `customPath`, `baseWidth`, `radiusX`, `radiusY`, `radius`, `starPoints`, `starInnerRatio`, `rotation`, `duration`, `itemSize`, `direction`, `fill`, `width`, `height`, `className`, `showPath`, `pathColor`, `pathWidth`, `easing`, `paused`, `centerContent`, `responsive`, `item`, `index`, `totalItems`, `path`, `progress`
- External deps: `motion/react`

### Particles
- Path: `./backgrounds/Particles.tsx`
- Import: `import Particles from "./backgrounds/Particles.tsx";`
- Props: `particleCount`, `particleSpread`, `speed`, `particleColors`, `moveParticlesOnHover`, `particleHoverFactor`, `alphaParticles`, `particleBaseSize`, `sizeRandomness`, `cameraDistance`, `disableRotation`, `pixelRatio`, `className`
- External deps: `ogl`

### PixelBlast
- Path: `./backgrounds/PixelBlast.tsx`
- Import: `import PixelBlast from "./backgrounds/PixelBlast.tsx";`
- Props: none explicitly typed
- External deps: `three`

### PixelSnow
- Path: `./backgrounds/PixelSnow.tsx`
- Import: `import PixelSnow from "./backgrounds/PixelSnow.tsx";`
- Props: `color`, `flakeSize`, `minFlakeSize`, `pixelResolution`, `speed`, `depthFade`, `farPlane`, `brightness`, `gamma`, `density`, `variant`, `direction`, `className`, `style`
- External deps: `three`

### PixelTrail
- Path: `./backgrounds/PixelTrail.tsx`
- Import: `import PixelTrail from "./backgrounds/PixelTrail.tsx";`
- Props: `id`, `strength`, `gridSize`, `trailSize`, `maxAge`, `interpolate`, `easingFunction`, `pixelColor`, `canvasProps`, `glProps`, `gooeyFilter`, `color`, `className`
- External deps: `three`, `@react-three/fiber`, `@react-three/drei`

### PixelTransition
- Path: `./backgrounds/PixelTransition.tsx`
- Import: `import PixelTransition from "./backgrounds/PixelTransition.tsx";`
- Props: `firstContent`, `secondContent`, `gridSize`, `pixelColor`, `animationStepDuration`, `once`, `className`, `style`, `aspectRatio`
- External deps: `gsap`

### Plasma
- Path: `./backgrounds/Plasma.tsx`
- Import: `import Plasma from "./backgrounds/Plasma.tsx";`
- Props: `color`, `speed`, `direction`, `scale`, `opacity`, `mouseInteractive`
- External deps: `ogl`

### PlasmaWave
- Path: `./backgrounds/PlasmaWave.tsx`
- Import: `import PlasmaWave from "./backgrounds/PlasmaWave.tsx";`
- Props: `xOffset`, `yOffset`, `rotationDeg`, `focalLength`, `speed1`, `speed2`, `dir2`, `bend1`, `bend2`, `colors`
- External deps: `ogl`

### Prism
- Path: `./backgrounds/Prism.tsx`
- Import: `import Prism from "./backgrounds/Prism.tsx";`
- Props: none explicitly typed
- External deps: `ogl`

### PrismaticBurst
- Path: `./backgrounds/PrismaticBurst.tsx`
- Import: `import PrismaticBurst from "./backgrounds/PrismaticBurst.tsx";`
- Props: none explicitly typed
- External deps: `ogl`

### Radar
- Path: `./backgrounds/Radar.tsx`
- Import: `import Radar from "./backgrounds/Radar.tsx";`
- Props: `speed`, `scale`, `ringCount`, `spokeCount`, `ringThickness`, `spokeThickness`, `sweepSpeed`, `sweepWidth`, `sweepLobes`, `color`, `backgroundColor`, `falloff`, `brightness`, `enableMouseInteraction`, `mouseInfluence`
- External deps: `ogl`

### Ribbons
- Path: `./backgrounds/Ribbons.tsx`
- Import: `import Ribbons from "./backgrounds/Ribbons.tsx";`
- Props: `colors`, `baseSpring`, `baseFriction`, `baseThickness`, `offsetFactor`, `maxAge`, `pointCount`, `speedMultiplier`, `enableFade`, `enableShaderEffect`, `effectAmplitude`, `backgroundColor`
- External deps: `ogl`

### RippleGrid
- Path: `./backgrounds/RippleGrid.tsx`
- Import: `import RippleGrid from "./backgrounds/RippleGrid.tsx";`
- Props: none explicitly typed
- External deps: `ogl`

### ShapeBlur
- Path: `./backgrounds/ShapeBlur.tsx`
- Import: `import ShapeBlur from "./backgrounds/ShapeBlur.tsx";`
- Props: `className`, `variation`, `pixelRatioProp`, `shapeSize`, `roundness`, `borderSize`, `circleSize`, `circleEdge`
- External deps: `three`

### ShapeGrid
- Path: `./backgrounds/ShapeGrid.tsx`
- Import: `import ShapeGrid from "./backgrounds/ShapeGrid.tsx";`
- Props: `direction`, `speed`, `borderColor`, `squareSize`, `hoverFillColor`, `shape`, `hoverTrailAmount`

### Silk
- Path: `./backgrounds/Silk.tsx`
- Import: `import Silk from "./backgrounds/Silk.tsx";`
- Props: `uniforms`, `speed`, `scale`, `color`, `noiseIntensity`, `rotation`
- External deps: `three`, `@react-three/fiber`

### SoftAurora
- Path: `./backgrounds/SoftAurora.tsx`
- Import: `import SoftAurora from "./backgrounds/SoftAurora.tsx";`
- Props: `speed`, `scale`, `brightness`, `color1`, `color2`, `noiseFrequency`, `noiseAmplitude`, `bandHeight`, `bandSpread`, `octaveDecay`, `layerOffset`, `colorSpeed`, `enableMouseInteraction`, `mouseInfluence`
- External deps: `ogl`

### StarBorder
- Path: `./backgrounds/StarBorder.tsx`
- Import: `import StarBorder from "./backgrounds/StarBorder.tsx";`
- Props: none explicitly typed

### Threads
- Path: `./backgrounds/Threads.tsx`
- Import: `import Threads from "./backgrounds/Threads.tsx";`
- Props: `color`, `amplitude`, `distance`, `enableMouseInteraction`
- External deps: `ogl`

### Waves
- Path: `./backgrounds/Waves.tsx`
- Import: `import Waves from "./backgrounds/Waves.tsx";`
- Props: `lineColor`, `backgroundColor`, `waveSpeedX`, `waveSpeedY`, `waveAmpX`, `waveAmpY`, `xGap`, `yGap`, `friction`, `tension`, `maxCursorMove`, `style`, `className`

## interactive (13)

### AnimatedContent
- Path: `./interactive/AnimatedContent.tsx`
- Import: `import AnimatedContent from "./interactive/AnimatedContent.tsx";`
- Props: none explicitly typed
- External deps: `gsap`

### BlobCursor
- Path: `./interactive/BlobCursor.tsx`
- Import: `import BlobCursor from "./interactive/BlobCursor.tsx";`
- Props: `blobType`, `fillColor`, `trailCount`, `sizes`, `innerSizes`, `innerColor`, `opacities`, `shadowColor`, `shadowBlur`, `shadowOffsetX`, `shadowOffsetY`, `filterId`, `filterStdDeviation`, `filterColorMatrixValues`, `useFilter`, `fastDuration`, `slowDuration`, `fastEase`, `slowEase`, `zIndex`
- External deps: `gsap`

### ClickSpark
- Path: `./interactive/ClickSpark.tsx`
- Import: `import ClickSpark from "./interactive/ClickSpark.tsx";`
- Props: `sparkColor`, `sparkSize`, `sparkRadius`, `sparkCount`, `duration`, `easing`, `extraScale`, `children`

### Crosshair
- Path: `./interactive/Crosshair.tsx`
- Import: `import Crosshair from "./interactive/Crosshair.tsx";`
- Props: `color`, `containerRef`
- External deps: `gsap`

### ElectricBorder
- Path: `./interactive/ElectricBorder.tsx`
- Import: `import ElectricBorder from "./interactive/ElectricBorder.tsx";`
- Props: `children`, `color`, `speed`, `chaos`, `borderRadius`, `className`, `style`

### FadeContent
- Path: `./interactive/FadeContent.tsx`
- Import: `import FadeContent from "./interactive/FadeContent.tsx";`
- Props: none explicitly typed
- External deps: `gsap`

### GhostCursor
- Path: `./interactive/GhostCursor.tsx`
- Import: `import GhostCursor from "./interactive/GhostCursor.tsx";`
- Props: none explicitly typed
- External deps: `three`

### GlareHover
- Path: `./interactive/GlareHover.tsx`
- Import: `import GlareHover from "./interactive/GlareHover.tsx";`
- Props: `width`, `height`, `background`, `borderRadius`, `borderColor`, `children`, `glareColor`, `glareOpacity`, `glareAngle`, `glareSize`, `transitionDuration`, `playOnce`, `className`, `style`

### Magnet
- Path: `./interactive/Magnet.tsx`
- Import: `import Magnet from "./interactive/Magnet.tsx";`
- Props: none explicitly typed

### MagnetLines
- Path: `./interactive/MagnetLines.tsx`
- Import: `import MagnetLines from "./interactive/MagnetLines.tsx";`
- Props: `rows`, `columns`, `containerSize`, `lineColor`, `lineWidth`, `lineHeight`, `baseAngle`, `className`, `style`

### SplashCursor
- Path: `./interactive/SplashCursor.tsx`
- Import: `import SplashCursor from "./interactive/SplashCursor.tsx";`
- Props: `SIM_RESOLUTION`, `DYE_RESOLUTION`, `CAPTURE_RESOLUTION`, `DENSITY_DISSIPATION`, `VELOCITY_DISSIPATION`, `PRESSURE`, `PRESSURE_ITERATIONS`, `CURL`, `SPLAT_RADIUS`, `SPLAT_FORCE`, `SHADING`, `COLOR_UPDATE_SPEED`, `BACK_COLOR`, `TRANSPARENT`, `RAINBOW_MODE`, `COLOR`

### StickerPeel
- Path: `./interactive/StickerPeel.tsx`
- Import: `import StickerPeel from "./interactive/StickerPeel.tsx";`
- Props: `imageSrc`, `rotate`, `peelBackHoverPct`, `peelBackActivePct`, `peelEasing`, `peelHoverEasing`, `width`, `shadowIntensity`, `lightingIntensity`, `initialPosition`, `peelDirection`, `className`
- External deps: `gsap`

### TargetCursor
- Path: `./interactive/TargetCursor.tsx`
- Import: `import TargetCursor from "./interactive/TargetCursor.tsx";`
- Props: `targetSelector`, `spinDuration`, `hideDefaultCursor`, `hoverDuration`, `parallaxOn`
- External deps: `gsap`

## motionUi (35)

### AnimatedList
- Path: `./motionUi/AnimatedList.tsx`
- Import: `import AnimatedList from "./motionUi/AnimatedList.tsx";`
- Props: `children`, `delay`, `index`, `onMouseEnter`, `onClick`, `items`, `onItemSelect`, `showGradients`, `enableArrowNavigation`, `className`, `itemClassName`, `displayScrollbar`, `initialSelectedIndex`
- External deps: `motion/react`

### BorderGlow
- Path: `./motionUi/BorderGlow.tsx`
- Import: `import BorderGlow from "./motionUi/BorderGlow.tsx";`
- Props: `children`, `className`, `edgeSensitivity`, `glowColor`, `backgroundColor`, `borderRadius`, `glowRadius`, `glowIntensity`, `coneSpread`, `animated`, `colors`, `fillOpacity`

### BounceCards
- Path: `./motionUi/BounceCards.tsx`
- Import: `import BounceCards from "./motionUi/BounceCards.tsx";`
- Props: `className`, `images`, `containerWidth`, `containerHeight`, `animationDelay`, `animationStagger`, `easeType`, `transformStyles`, `enableHover`
- External deps: `gsap`

### BubbleMenu
- Path: `./motionUi/BubbleMenu.tsx`
- Import: `import BubbleMenu from "./motionUi/BubbleMenu.tsx";`
- Props: none explicitly typed
- External deps: `gsap`

### CardNav
- Path: `./motionUi/CardNav.tsx`
- Import: `import CardNav from "./motionUi/CardNav.tsx";`
- Props: `logo`, `logoAlt`, `items`, `className`, `ease`, `baseColor`, `menuColor`, `buttonBgColor`, `buttonTextColor`
- External deps: `gsap`

### CardSwap
- Path: `./motionUi/CardSwap.tsx`
- Import: `import CardSwap from "./motionUi/CardSwap.tsx";`
- Props: `width`, `height`, `cardDistance`, `verticalDistance`, `delay`, `pauseOnHover`, `onCardClick`, `skewAmount`, `easing`, `children`
- External deps: `gsap`

### Carousel
- Path: `./motionUi/Carousel.tsx`
- Import: `import Carousel from "./motionUi/Carousel.tsx";`
- Props: `items`, `baseWidth`, `autoplay`, `autoplayDelay`, `pauseOnHover`, `loop`, `round`, `item`, `index`, `itemWidth`, `trackItemOffset`, `x`, `transition`
- External deps: `motion/react`

### ChromaGrid
- Path: `./motionUi/ChromaGrid.tsx`
- Import: `import ChromaGrid from "./motionUi/ChromaGrid.tsx";`
- Props: `items`, `className`, `radius`, `damping`, `fadeOut`, `ease`
- External deps: `gsap`

### CircularGallery
- Path: `./motionUi/CircularGallery.tsx`
- Import: `import CircularGallery from "./motionUi/CircularGallery.tsx";`
- Props: `gl`, `plane`, `renderer`, `text`, `textColor`, `font`, `geometry`, `image`, `index`, `length`, `scene`, `screen`, `viewport`, `bend`, `borderRadius`, `items`, `scrollSpeed`, `scrollEase`
- External deps: `ogl`

### Counter
- Path: `./motionUi/Counter.tsx`
- Import: `import Counter from "./motionUi/Counter.tsx";`
- Props: `mv`, `number`, `height`, `place`, `value`, `digitStyle`, `fontSize`, `padding`, `places`, `gap`, `borderRadius`, `horizontalPadding`, `textColor`, `fontWeight`, `containerStyle`, `counterStyle`, `gradientHeight`, `gradientFrom`, `gradientTo`, `topGradientStyle`, `bottomGradientStyle`
- External deps: `motion/react`

### DecayCard
- Path: `./motionUi/DecayCard.tsx`
- Import: `import DecayCard from "./motionUi/DecayCard.tsx";`
- Props: `width`, `height`, `image`, `baseFrequency`, `numOctaves`, `seed`, `maxDisplacement`, `movementBound`, `children`
- External deps: `gsap`

### Dock
- Path: `./motionUi/Dock.tsx`
- Import: `import Dock from "./motionUi/Dock.tsx";`
- Props: none explicitly typed
- External deps: `motion/react`

### DomeGallery
- Path: `./motionUi/DomeGallery.tsx`
- Import: `import DomeGallery from "./motionUi/DomeGallery.tsx";`
- Props: none explicitly typed

### ElasticSlider
- Path: `./motionUi/ElasticSlider.tsx`
- Import: `import ElasticSlider from "./motionUi/ElasticSlider.tsx";`
- Props: `defaultValue`, `startingValue`, `maxValue`, `className`, `isStepped`, `stepSize`, `leftIcon`, `rightIcon`
- External deps: `motion/react`

### FlowingMenu
- Path: `./motionUi/FlowingMenu.tsx`
- Import: `import FlowingMenu from "./motionUi/FlowingMenu.tsx";`
- Props: `items`, `speed`, `textColor`, `bgColor`, `marqueeBgColor`, `marqueeTextColor`, `borderColor`
- External deps: `gsap`

### FluidGlass
- Path: `./motionUi/FluidGlass.tsx`
- Import: `import FluidGlass from "./motionUi/FluidGlass.tsx";`
- Props: `mode`, `lensProps`, `barProps`, `cubeProps`
- External deps: `three`, `@react-three/fiber`, `@react-three/drei`

### FlyingPosters
- Path: `./motionUi/FlyingPosters.tsx`
- Import: `import FlyingPosters from "./motionUi/FlyingPosters.tsx";`
- Props: none explicitly typed
- External deps: `ogl`

### Folder
- Path: `./motionUi/Folder.tsx`
- Import: `import Folder from "./motionUi/Folder.tsx";`
- Props: `color`, `size`, `items`, `className`

### GlassIcons
- Path: `./motionUi/GlassIcons.tsx`
- Import: `import GlassIcons from "./motionUi/GlassIcons.tsx";`
- Props: `items`, `className`

### GlassSurface
- Path: `./motionUi/GlassSurface.tsx`
- Import: `import GlassSurface from "./motionUi/GlassSurface.tsx";`
- Props: `children`, `width`, `height`, `borderRadius`, `borderWidth`, `brightness`, `opacity`, `blur`, `displace`, `backgroundOpacity`, `saturation`, `distortionScale`, `redOffset`, `greenOffset`, `blueOffset`, `xChannel`, `yChannel`, `mixBlendMode`, `className`, `style`

### GooeyNav
- Path: `./motionUi/GooeyNav.tsx`
- Import: `import GooeyNav from "./motionUi/GooeyNav.tsx";`
- Props: `items`, `animationTime`, `particleCount`, `particleDistances`, `particleR`, `timeVariance`, `colors`, `initialActiveIndex`

### InfiniteMenu
- Path: `./motionUi/InfiniteMenu.tsx`
- Import: `import InfiniteMenu from "./motionUi/InfiniteMenu.tsx";`
- Props: `items`, `scale`

### MagicBento
- Path: `./motionUi/MagicBento.tsx`
- Import: `import MagicBento from "./motionUi/MagicBento.tsx";`
- Props: `color`, `title`, `description`, `label`, `textAutoHide`, `disableAnimations`, `enableStars`, `enableSpotlight`, `enableBorderGlow`, `spotlightRadius`, `particleCount`, `enableTilt`, `glowColor`, `clickEffect`, `enableMagnetism`
- External deps: `gsap`

### Masonry
- Path: `./motionUi/Masonry.tsx`
- Import: `import Masonry from "./motionUi/Masonry.tsx";`
- Props: `items`, `ease`, `duration`, `stagger`, `animateFrom`, `scaleOnHover`, `hoverScale`, `blurToFocus`, `colorShiftOnHover`
- External deps: `gsap`

### ModelViewer
- Path: `./motionUi/ModelViewer.tsx`
- Import: `import ModelViewer from "./motionUi/ModelViewer.tsx";`
- Props: `url`, `width`, `height`, `modelXOffset`, `modelYOffset`, `defaultRotationX`, `defaultRotationY`, `defaultZoom`, `minZoomDistance`, `maxZoomDistance`, `enableMouseParallax`, `enableManualRotation`, `enableHoverRotation`, `enableManualZoom`, `ambientIntensity`, `keyLightIntensity`, `fillLightIntensity`, `rimLightIntensity`, `environmentPreset`, `autoFrame`, `placeholderSrc`, `showScreenshotButton`, `fadeIn`, `autoRotate`, `autoRotateSpeed`, `onModelLoaded`, `xOff`, `yOff`, `pivot`, `initYaw`, `initPitch`, `minZoom`, `maxZoom`, `onLoaded`
- External deps: `three`, `@react-three/fiber`, `@react-three/drei`

### PillNav
- Path: `./motionUi/PillNav.tsx`
- Import: `import PillNav from "./motionUi/PillNav.tsx";`
- Props: `logo`, `logoAlt`, `items`, `activeHref`, `className`, `ease`, `baseColor`, `pillColor`, `hoveredPillTextColor`, `pillTextColor`, `onMobileMenuClick`, `initialLoadAnimation`
- External deps: `gsap`

### PixelCard
- Path: `./motionUi/PixelCard.tsx`
- Import: `import PixelCard from "./motionUi/PixelCard.tsx";`
- Props: `variant`, `gap`, `speed`, `colors`, `noFocus`, `className`, `children`

### ProfileCard
- Path: `./motionUi/ProfileCard.tsx`
- Import: `import ProfileCard from "./motionUi/ProfileCard.tsx";`
- Props: `avatarUrl`, `iconUrl`, `grainUrl`, `innerGradient`, `behindGlowEnabled`, `behindGlowColor`, `behindGlowSize`, `className`, `enableTilt`, `enableMobileTilt`, `mobileTiltSensitivity`, `miniAvatarUrl`, `name`, `title`, `handle`, `status`, `contactText`, `showUserInfo`, `onContactClick`

### ReflectiveCard
- Path: `./motionUi/ReflectiveCard.tsx`
- Import: `import ReflectiveCard from "./motionUi/ReflectiveCard.tsx";`
- Props: `blurStrength`, `color`, `metalness`, `roughness`, `overlayColor`, `displacementStrength`, `noiseScale`, `specularConstant`, `grayscale`, `glassDistortion`, `className`, `style`

### ScrollStack
- Path: `./motionUi/ScrollStack.tsx`
- Import: `import ScrollStack from "./motionUi/ScrollStack.tsx";`
- Props: `itemClassName`, `children`, `className`, `itemDistance`, `itemScale`, `itemStackDistance`, `stackPosition`, `scaleEndPosition`, `baseScale`, `scaleDuration`, `rotationAmount`, `blurAmount`, `useWindowScroll`, `onStackComplete`

### SpotlightCard
- Path: `./motionUi/SpotlightCard.tsx`
- Import: `import SpotlightCard from "./motionUi/SpotlightCard.tsx";`
- Props: none explicitly typed

### Stack
- Path: `./motionUi/Stack.tsx`
- Import: `import Stack from "./motionUi/Stack.tsx";`
- Props: `children`, `onSendToBack`, `sensitivity`, `disableDrag`, `randomRotation`, `sendToBackOnClick`, `cards`, `animationConfig`, `autoplay`, `autoplayDelay`, `pauseOnHover`, `mobileClickOnly`, `mobileBreakpoint`
- External deps: `motion/react`

### StaggeredMenu
- Path: `./motionUi/StaggeredMenu.tsx`
- Import: `import StaggeredMenu from "./motionUi/StaggeredMenu.tsx";`
- Props: `position`, `colors`, `items`, `socialItems`, `displaySocials`, `displayItemNumbering`, `className`, `logoUrl`, `menuButtonColor`, `openMenuButtonColor`, `accentColor`, `isFixed`, `changeMenuColorOnOpen`, `closeOnClickAway`, `onMenuOpen`, `onMenuClose`
- External deps: `gsap`

### Stepper
- Path: `./motionUi/Stepper.tsx`
- Import: `import Stepper from "./motionUi/Stepper.tsx";`
- Props: `isCompleted`, `currentStep`, `direction`, `children`, `className`, `onHeightReady`, `step`, `onClickStep`, `disableStepIndicators`, `isComplete`
- External deps: `motion/react`

### TiltedCard
- Path: `./motionUi/TiltedCard.tsx`
- Import: `import TiltedCard from "./motionUi/TiltedCard.tsx";`
- Props: `imageSrc`, `altText`, `captionText`, `containerHeight`, `containerWidth`, `imageHeight`, `imageWidth`, `scaleOnHover`, `rotateAmplitude`, `showMobileWarning`, `showTooltip`, `overlayContent`, `displayOverlayContent`
- External deps: `motion/react`

## textAnimations (30)

### ASCIIText
- Path: `./textAnimations/ASCIIText.tsx`
- Import: `import ASCIIText from "./textAnimations/ASCIIText.tsx";`
- Props: `text`, `asciiFontSize`, `textFontSize`, `textColor`, `planeBaseHeight`, `enableWaves`
- External deps: `three`

### BlurText
- Path: `./textAnimations/BlurText.tsx`
- Import: `import BlurText from "./textAnimations/BlurText.tsx";`
- Props: none explicitly typed
- External deps: `motion/react`

### CircularText
- Path: `./textAnimations/CircularText.tsx`
- Import: `import CircularText from "./textAnimations/CircularText.tsx";`
- Props: `text`, `spinDuration`, `onHover`, `className`
- External deps: `motion/react`

### CountUp
- Path: `./textAnimations/CountUp.tsx`
- Import: `import CountUp from "./textAnimations/CountUp.tsx";`
- Props: `to`, `from`, `direction`, `delay`, `duration`, `className`, `startWhen`, `separator`, `onStart`, `onEnd`
- External deps: `motion/react`

### CurvedLoop
- Path: `./textAnimations/CurvedLoop.tsx`
- Import: `import CurvedLoop from "./textAnimations/CurvedLoop.tsx";`
- Props: `marqueeText`, `speed`, `className`, `curveAmount`, `direction`, `interactive`

### DecryptedText
- Path: `./textAnimations/DecryptedText.tsx`
- Import: `import DecryptedText from "./textAnimations/DecryptedText.tsx";`
- Props: none explicitly typed
- External deps: `motion/react`

### FallingText
- Path: `./textAnimations/FallingText.tsx`
- Import: `import FallingText from "./textAnimations/FallingText.tsx";`
- Props: `text`, `highlightWords`, `trigger`, `backgroundColor`, `wireframes`, `gravity`, `mouseConstraintStiffness`, `fontSize`
- External deps: `matter-js`

### FuzzyText
- Path: `./textAnimations/FuzzyText.tsx`
- Import: `import FuzzyText from "./textAnimations/FuzzyText.tsx";`
- Props: `children`, `fontSize`, `fontWeight`, `fontFamily`, `color`, `enableHover`, `baseIntensity`, `hoverIntensity`, `fuzzRange`, `fps`, `direction`, `transitionDuration`, `clickEffect`, `glitchMode`, `glitchInterval`, `glitchDuration`, `gradient`, `letterSpacing`, `className`

### GlitchText
- Path: `./textAnimations/GlitchText.tsx`
- Import: `import GlitchText from "./textAnimations/GlitchText.tsx";`
- Props: `children`, `speed`, `enableShadows`, `enableOnHover`, `className`

### GradientText
- Path: `./textAnimations/GradientText.tsx`
- Import: `import GradientText from "./textAnimations/GradientText.tsx";`
- Props: `children`, `className`, `colors`, `animationSpeed`, `showBorder`, `direction`, `pauseOnHover`, `yoyo`
- External deps: `motion/react`

### LetterGlitch
- Path: `./textAnimations/LetterGlitch.tsx`
- Import: `import LetterGlitch from "./textAnimations/LetterGlitch.tsx";`
- Props: none explicitly typed

### LettersPullUp
- Path: `./textAnimations/LettersPullUp.tsx`
- Import: `import LettersPullUp from "./textAnimations/LettersPullUp.tsx";`
- Props: none explicitly typed
- External deps: `framer-motion`

### LinesPullUp
- Path: `./textAnimations/LinesPullUp.tsx`
- Import: `import LinesPullUp from "./textAnimations/LinesPullUp.tsx";`
- Props: `text`, `className`, `containerClassName`, `delay`, `duration`, `stagger`
- External deps: `framer-motion`

### ParagraphSlide
- Path: `./textAnimations/ParagraphSlide.tsx`
- Import: `import ParagraphSlide from "./textAnimations/ParagraphSlide.tsx";`
- Props: none explicitly typed
- External deps: `framer-motion`

### ParagraphSlideText
- Path: `./textAnimations/ParagraphSlideText.tsx`
- Import: `import ParagraphSlideText from "./textAnimations/ParagraphSlideText.tsx";`
- Props: none explicitly typed
- External deps: `framer-motion`

### RotatingText
- Path: `./textAnimations/RotatingText.tsx`
- Import: `import RotatingText from "./textAnimations/RotatingText.tsx";`
- Props: none explicitly typed
- External deps: `motion/react`

### ScrambledText
- Path: `./textAnimations/ScrambledText.tsx`
- Import: `import ScrambledText from "./textAnimations/ScrambledText.tsx";`
- Props: `radius`, `duration`, `speed`, `scrambleChars`, `className`, `style`, `children`
- External deps: `gsap`

### ScrollFloat
- Path: `./textAnimations/ScrollFloat.tsx`
- Import: `import ScrollFloat from "./textAnimations/ScrollFloat.tsx";`
- Props: `children`, `scrollContainerRef`, `containerClassName`, `textClassName`, `animationDuration`, `ease`, `scrollStart`, `scrollEnd`, `stagger`
- External deps: `gsap`

### ScrollReveal
- Path: `./textAnimations/ScrollReveal.tsx`
- Import: `import ScrollReveal from "./textAnimations/ScrollReveal.tsx";`
- Props: `children`, `scrollContainerRef`, `enableBlur`, `baseOpacity`, `baseRotation`, `blurStrength`, `containerClassName`, `textClassName`, `rotationEnd`, `wordAnimationEnd`
- External deps: `gsap`

### ScrollVelocity
- Path: `./textAnimations/ScrollVelocity.tsx`
- Import: `import ScrollVelocity from "./textAnimations/ScrollVelocity.tsx";`
- Props: `children`, `baseVelocity`, `scrollContainerRef`, `className`, `damping`, `stiffness`, `numCopies`, `velocityMapping`, `parallaxClassName`, `scrollerClassName`, `parallaxStyle`, `scrollerStyle`, `texts`, `velocity`
- External deps: `motion/react`

### ShinyText
- Path: `./textAnimations/ShinyText.tsx`
- Import: `import ShinyText from "./textAnimations/ShinyText.tsx";`
- Props: `text`, `disabled`, `speed`, `className`, `color`, `shineColor`, `spread`, `yoyo`, `pauseOnHover`, `direction`, `delay`
- External deps: `motion/react`

### Shuffle
- Path: `./textAnimations/Shuffle.tsx`
- Import: `import Shuffle from "./textAnimations/Shuffle.tsx";`
- Props: `text`, `className`, `style`, `shuffleDirection`, `duration`, `maxDelay`, `ease`, `threshold`, `rootMargin`, `tag`, `textAlign`, `onShuffleComplete`, `shuffleTimes`, `animationMode`, `loop`, `loopDelay`, `stagger`, `scrambleCharset`, `colorFrom`, `colorTo`, `triggerOnce`, `respectReducedMotion`, `triggerOnHover`
- External deps: `gsap`

### SplitText
- Path: `./textAnimations/SplitText.tsx`
- Import: `import SplitText from "./textAnimations/SplitText.tsx";`
- Props: `text`, `className`, `delay`, `duration`, `ease`, `splitType`, `from`, `to`, `threshold`, `rootMargin`, `tag`, `textAlign`, `onLetterAnimationComplete`
- External deps: `gsap`

### TextCursor
- Path: `./textAnimations/TextCursor.tsx`
- Import: `import TextCursor from "./textAnimations/TextCursor.tsx";`
- Props: `text`, `spacing`, `followMouseDirection`, `randomFloat`, `exitDuration`, `removalInterval`, `maxPoints`
- External deps: `motion/react`

### TextPressure
- Path: `./textAnimations/TextPressure.tsx`
- Import: `import TextPressure from "./textAnimations/TextPressure.tsx";`
- Props: `text`, `fontFamily`, `fontUrl`, `width`, `weight`, `italic`, `alpha`, `flex`, `stroke`, `scale`, `textColor`, `strokeColor`, `strokeWidth`, `className`, `minFontSize`

### TextType
- Path: `./textAnimations/TextType.tsx`
- Import: `import TextType from "./textAnimations/TextType.tsx";`
- Props: `className`, `showCursor`, `hideCursorWhileTyping`, `cursorCharacter`, `cursorBlinkDuration`, `cursorClassName`, `text`, `as`, `typingSpeed`, `initialDelay`, `pauseDuration`, `deletingSpeed`, `loop`, `textColors`, `variableSpeed`, `onSentenceComplete`, `startOnVisible`, `reverseMode`
- External deps: `gsap`

### TrueFocus
- Path: `./textAnimations/TrueFocus.tsx`
- Import: `import TrueFocus from "./textAnimations/TrueFocus.tsx";`
- Props: `sentence`, `separator`, `manualMode`, `blurAmount`, `borderColor`, `glowColor`, `animationDuration`, `pauseBetweenAnimations`
- External deps: `motion/react`

### VariableProximity
- Path: `./textAnimations/VariableProximity.tsx`
- Import: `import VariableProximity from "./textAnimations/VariableProximity.tsx";`
- Props: none explicitly typed
- External deps: `motion/react`

### WordByWord
- Path: `./textAnimations/WordByWord.tsx`
- Import: `import WordByWord from "./textAnimations/WordByWord.tsx";`
- Props: none explicitly typed
- External deps: `framer-motion`

### WordsPullUp
- Path: `./textAnimations/WordsPullUp.tsx`
- Import: `import WordsPullUp from "./textAnimations/WordsPullUp.tsx";`
- Props: `text`, `className`, `containerClassName`, `delay`, `duration`
- External deps: `framer-motion`

## Performance and integration notes

- Heavy WebGL components (`three`, `@react-three/fiber`, `ogl`) should be used sparingly per page.
- For hero backgrounds, combine with `pointer-events-none` unless interaction is required.
- If an animation feels jerky, reduce count/line/particle props first, then disable parallax/interaction.
- Prefer lazy loading for heavy sections (`React.lazy`) when they are below the fold.

## Maintenance

When adding new components, update this README by adding the component under the right category with path, props, and dependencies.
