# Snek Arcade 🕹️

A high-performance, ultra-responsive retro Snake game built for modern web browsers. Featuring an ambient, flowing particle background, a tactile sound feedback system, and custom touch gesture mechanics optimized for mobile and tablet play.

This project focuses on **Component Modularity** in React and an unthrottled, raw frame-rate canvas rendering pipeline to ensure seamless and zero-latency input delivery.

---

## Features

*   **Responsive Hybrid Input:** Fully playable via standard keyboard (`WASD` / `Arrow Keys`) on desktop or swift touch swiping gestures on mobile/tablets.
*   **Anti-Scroll Engine Shield:** Mobile browser scrolling and screen-bouncing are automatically suppressed during active play to keep focus on the game board.
*   **True Arcade High-Score Tracking:** Your personal best is stored directly in the browser's `localStorage` and updates strictly upon game over, preserving real-time scoring immersion.
*   **Ambient Neon Aesthetic:** Procedural HTML5 canvas particles drift elegantly across a deep slate background without clogging the primary canvas thread.
*   **Tactile Audio System:** Seamlessly synchronized audio blips handle instantaneous feedback for food consumption and crash sequences.

---

## Prerequisites

Before starting, ensure you have the following installed on your machine:
*   [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
*   [npm](https://www.npmjs.com/) (installed automatically with Node)

---

## Installation & Setup

Follow these steps to run the game locally on your development environment:

1. **Clone the Repository**
```bash
   git clone [https://github.com/christianbihasa/snek.git]
   cd snek

```

2. **Install Dependencies**

```bash
   npm install

```

3. **Run the Local Development Server**

```bash
   npm run dev

```

Open `http://localhost:5173` in your browser to play and test changes live.

---

## Usage & Controls

### Desktop

* **Move Up:** `W` or `ArrowUp`
* **Move Down:** `S` or `ArrowDown`
* **Move Left:** `A` or `ArrowLeft`
* **Move Right:** `D` or `ArrowRight`

### Mobile & Tablet (iOS / iPadOS / Android)

* **Swipe Directionally:** Swipe your thumb anywhere on the screen in your desired direction.
* *Note: Input safeguards prevent illegal 180° turns (instant self-cannibalism) for both keyboard inputs and touch gestures.*

---

## Project Structure

```text
snek/
├── public/
│   └── sounds/
│       ├── eat.wav                # Bitesize sound trigger for eating food
│       └── die.wav                # Impact sound trigger for wall/body crash
├── src/
│   ├── components/
│   │   ├── GameContainer.jsx      # The engine connector & overlay orchestrator
│   │   ├── GameHUD.jsx            # Scoreboard overlay utilizing neon shadows
│   │   ├── ParticleBackground.jsx # Separate background layer handling canvas drift
│   │   ├── MainMenu.jsx           # Initial title panel
│   │   └── GameOverModal.jsx      # Post-game retry screen
│   └── game/
│       └── engine.js              # Pure JS canvas loops, coordinate grid & buffers

```

---

## Production Deployment

This project comes pre-configured with a script to easily compile and host it on GitHub Pages.

To build and compile your static production assets:

```bash
npm run build

```

To deploy your live update branch instantly to GitHub Pages:

```bash
npm run deploy

```
