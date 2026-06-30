# Snek Arcade 🕹️

A high-performance, ultra-responsive retro Snake engine built with **React 19**, **Vite**, and **Tailwind CSS v4**. Engineered with an unthrottled, raw frame-rate HTML5 Canvas rendering pipeline, the system guarantees zero-latency execution loops, sub-millisecond input capture matrices, and fluid hardware-accelerated rendering.

**Live Production Build:** [christianbihasa.github.io/snek](https://christianbihasa.github.io/snek)

---

## Key Engineering Features

### 1. Raw Canvas Rendering Pipeline
Bypasses traditional DOM node manipulation overhead by executing drawing sweeps directly inside a high-speed HTML5 Canvas context. Game loops run on optimized fractional coordinates, ensuring fluid frame timing independent of browser layout trees.

### 2. Hybrid Input Guard Matrix
Features unified event handling across desktop physical switch states (`WASD` / `Arrow Keys`) and asynchronous mobile gesture touch targets. Implements an immutable vector boundary verification step that suppresses invalid 180° reversals, completely eliminating self-cannibalism runtime errors.

### 3. Anti-Scroll Viewport Shield
Hooks directly into active DOM touch surfaces to intercept browser-native touch gestures. It explicitly traps and swallows passive event cycles during active play, preventing layout bouncing, viewport shifting, or unintended elastic scrolling artifacts on mobile hardware layouts.

### 4. Decoupled Thread Particle Layer
Renders an ambient neon background animation grid using a separate procedural particle system. By segmenting physics updates from the primary game state vectors, the engine prevents background calculations from choking or delaying the critical frame-time requirements of the snake loop.

### 5. Automated Cloud-Native CI/CD Pipeline
Replaced legacy local push scripts with an integrated GitHub Actions deployment matrix (`deploy.yml`). Triggers instantly on git branch pushes to compile production bundles via Vite, optimize static audio assets, and pipe compressed build outputs directly to the GitHub Pages global edge network.

---

## System Architecture & Tech Stack

| Technology / Layer | Engineering Purpose |
| :--- | :--- |
| **React 19** | Component modularity, functional hooks, runtime setup orchestration, and UI overlay trees |
| **Vite** | Lightning-fast development Hot Module Replacement (HMR) and tree-shaken static compilation |
| **Tailwind CSS v4** | CSS-first styling framework implementing design tokens and ambient neon drop shadows |
| **HTML5 Canvas API** | Low-overhead pixel grid calculations and decoupled multi-layer render passes |
| **LocalStorage API** | High-speed, synchronous scoreboard verification and persistent high-score record memory |
| **Web Audio API** | Asynchronous, low-latency audio buffer triggers handler for event sound execution |

---

## Directory Blueprint

```text
├── .github/
│   └── workflows/
│       ├── capture-preview.yml # Headless Playwright automated screenshot runner
│       └── deploy.yml          # Production cloud asset compilation pipeline
├── public/
│   └── sounds/                 # Low-latency Web Audio wave targets
│       ├── die.wav             # Crash/Wall collision impact sound trigger
│       └── eat.wav             # Coordinate overlapping consumption sound trigger
├── src/
│   ├── components/             # Modular presentation components and interface layers
│   │   ├── GameContainer.jsx   # Core bridge connecting React lifecycle to the Canvas context
│   │   ├── GameHUD.jsx         # Score tracking overlay wrapped in high-contrast CSS neon styling
│   │   ├── GameOverModal.jsx   # Stateful modal managing reset commands and local records
│   │   ├── MainMenu.jsx        # Initial menu viewport overlay
│   │   └── ParticleBackground.jsx # Independent background element managing procedural canvas drift
│   ├── game/
│   │   └── engine.js           # Core loop architecture: coordinate grids, move buffers, and collision rules
│   ├── App.jsx                 # Application container shell and global layout tree configuration
│   ├── index.css               # Global reset parameters, base font layouts, and Tailwind utilities
│   └── main.jsx                # DOM root engine anchor point
├── package.json                # System tracking manifests and automated build routing scripts
└── vite.config.js              # Routing paths and Rollup asset compilation rule settings

```

---

## Core Engineering Details

### Non-Inverting Velocity Constraint Guard

To keep the directional inputs rock-solid, input hooks use an analytical validation pass against the active vector configuration before queuing changes in the movement queue, ensuring inputs can't crash back into themselves:

```javascript
// Excerpt from direction processing logic in engine.js
export const validateNextDirection = (currentVelocity, inputDirection) => {
  // Prevent immediate reversal down the same structural axis
  if (currentVelocity.x !== 0 && inputDirection.x !== 0) return currentVelocity;
  if (currentVelocity.y !== 0 && inputDirection.y !== 0) return currentVelocity;
  
  return inputDirection;
};

```

---

## Local Development & Setup

### Prerequisites

Ensure you have a modern instance of [Node.js](https://nodejs.org/) installed inside your terminal runtime environment.

### 1. Repository Setup

```bash
git clone [https://github.com/christianbihasa/snek.git]
cd snek

```

### 2. Dependency Resolution

```bash
npm install

```

### 3. Initialize HMR Development Server

```bash
npm run dev

```

Open the engine local link (defaults to [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173)) inside your browser to inspect or test code changes live.

### 4. Compiling Production Builds Locally

```bash
npm run build

```

Optimized, production-ready assets will compile cleanly inside the local `/dist` directory.

---

## Operational Mechanics & Controls

### Keyboard Layout (Desktop)

* **Vector Up:** `W` or `ArrowUp`
* **Vector Down:** `S` or `ArrowDown`
* **Vector Left:** `A` or `ArrowLeft`
* **Vector Right:** `D` or `ArrowRight`

### Touch Gesture Tracking (Mobile & Tablet)

* **Directional Swiping:** Swiftly swipe your finger anywhere across the display plane in your intended vector direction.
* *Note: System buffers accept inputs independently of grid cells, allowing skilled players to safely queue rapid multi-step turns within a single animation tick.*
