import {GRID_SIZE, SNAKE_SPEED} from './constants.js';

export function initGame(canvas, {onScoreChange, onGameOver}) {
    const ctx = canvas.getContext('2d');
    let loopId = null;
    let lastUpdateTime = 0;

    // Game engine state variables
    let snake = [];
    let food = {x: 0, y: 0};
    let direction = {x: 1, y: 0};
    let inputQueue = [];
    let score = 0;
    let isRunning = false;

    // For touchscreen / Mobile implementation
    let touchStartPos = {x: 0, y: 0};

    // Force canvas to be a square based on the smaller dimension of the window
    function resize() {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }
    resize();

    // Helper to get random coord on the grid
    const getRandomTile = () => Math.floor(Math.random() * GRID_SIZE);

    function spawnFood() {
        let newFood;
        
        // Ensure food doesn't spawn inside the snake's body
        while(!newFood || snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
            newFood = {x: getRandomTile(), y: getRandomTile()};
        }
        food = newFood;
    }

    function resetState() {
        snake = [
            {x: 10, y: 10},
            {x: 9, y: 10},
            {x: 8, y: 10}
        ];
        direction = {x: 1, y: 0};
        inputQueue = [];
        score = 0;
        onScoreChange(0);
        spawnFood();
    }

    // Keyboard event handler
    function handleKeyDown(e) {
        if(!isRunning) return;

        let targetDirection = null;

        switch(e.key) {
            case 'ArrowUp': case 'w': case 'W': if(direction.y === 0) targetDirection = {x: 0, y: -1}; break;
            case 'ArrowDown': case 's': case 'S': if(direction.y === 0) targetDirection = {x: 0, y: 1}; break;
            case 'ArrowLeft': case 'a': case 'A': if(direction.x === 0) targetDirection = {x: -1, y: 0}; break;
            case 'ArrowRight': case 'd': case 'D': if(direction.x === 0) targetDirection = {x: 1, y: 0}; break;
            default: return;
        }

        // Determine next direction
        const lastQueuedDirection = inputQueue.length > 0 ? inputQueue[inputQueue.length - 1] : direction;

        const isOpposite = (targetDirection.x + lastQueuedDirection.x === 0) && (targetDirection.y + lastQueuedDirection.y === 0);

        // Checks for illegal direction & Handles up to 2 max queued direction
        if(!isOpposite && inputQueue.length < 2) {
            inputQueue.push(targetDirection);
        }
        
    }

    function handleTouchStart(e) {
        touchStartPos.x = e.touches[0].clientX;
        touchStartPos.y = e.touches[0].clientY;
    }

    function handleTouchEnd(e) {
        if(!isRunning) return;

        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;

        const dx = touchEndX - touchStartPos.x;
        const dy = touchEndY - touchStartPos.y;

        // Min swipe distance threshold in pixels to ignore accidental micro-taps
        const threshold = 30;

        if(Math.abs(dx) < threshold && Math.abs(dy) < threshold) return;

        let targetDirection = null;

        // Determine swipe axis (Horizontal vs. Vertical)
        if(Math.abs(dx) > Math.abs(dy)) {
            // Horizontal
            targetDirection = dx > 0 ? {x: 1, y: 0} : {x: -1, y: 0};
        } else {
            // Vertical
            targetDirection = dy > 0 ? {x: 0, y: 1} : {x: 0, y: -1};
        }

        // Queue up direction using same anti-reversal safety logic
        const lastQueuedDirection = inputQueue.length > 0 ? inputQueue[inputQueue.length - 1] : direction;
        
        const isOpposite = (targetDirection.x + lastQueuedDirection.x === 0) && (targetDirection.y + lastQueuedDirection.y === 0);

        // Checks for illegal direction & Handles up to 2 max queued direction
        if(!isOpposite && inputQueue.length < 2) {
            inputQueue.push(targetDirection);
        }
    }

    function handleTouchMove(e) {
        if(isRunning) {
            e.preventDefault();
        }
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, {passive: true});
    window.addEventListener('touchend', handleTouchEnd, {passive: true});
    window.addEventListener('touchmove', handleTouchMove, {passive: false});

    // Core mechanics update logic
    function update() {
        // Process the next move in the buffer queue
        if(inputQueue.length > 0) {
            direction = inputQueue.shift();
        }

        // Calculate new head position
        const head = {
            x: snake[0].x + direction.x,
            y: snake[0].y + direction.y
        };

        // (1) Collision check: Hits wall
        if(head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
            gameOver();
            return;
        }

        // (2) Collision check: Hits body
        if(snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            gameOver();
            return;
        }

        // Append new head
        snake.unshift(head);

        // (3) Mechanic check: Food consumption
        if(head.x === food.x && head.y === food.y) {
            score += 10;
            onScoreChange(score);
            spawnFood();
        } else {
            // Pop tail to simulate forward movement
            snake.pop();
        }
    }

    function draw() {
        const tileW = canvas.width / GRID_SIZE;
        const tileH = canvas.height / GRID_SIZE;

        // Clear previous frames
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Added vfx
        ctx.shadowBlur = 12;

        // Render food
        ctx.fillStyle = '#f43f5e';
        ctx.shadowColor = '#f43f5e';
        ctx.beginPath();
        ctx.arc(
            food.x * tileW + tileW / 2,
            food.y * tileH + tileH / 2,
            tileW / 2.5, 0, Math.PI * 2
        );
        ctx.fill();

        // Render Snake
        snake.forEach((segment, index) => {
            // Head
            ctx.fillStyle = index === 0 ? '#22d3ee' : '#0d9488';
            ctx.shadowColor = index === 0 ? '#22d3ee' : '#0d9488';

            ctx.fillRect(
                segment.x * tileW + 1,
                segment.y * tileH +1,
                tileW - 2,
                tileH - 2
            );
        });

        // Reset shadow for next frame
        ctx.shadowBlur = 0;
    }

    // Throttle the game loop to run at a fixed speed
    function gameLoop(timestamp) {
        if(!isRunning) return;

        loopId = requestAnimationFrame(gameLoop);

        const elapsed = timestamp - lastUpdateTime;
        if(elapsed > SNAKE_SPEED) {
            lastUpdateTime = timestamp;
            update();
            draw();
        }
    }

    function gameOver() {
        isRunning = false;
        cancelAnimationFrame(loopId);
        onGameOver(score);
    }

    return {
        start() {
            resetState();
            isRunning = true;
            lastUpdateTime = performance.now();
            loopId = requestAnimationFrame(gameLoop);
        },
        destroy() {
            isRunning = false;
            cancelAnimationFrame(loopId);
            window.removeEventListener('keydown', handleKeyDown);
            window.addEventListener('touchstart', handleTouchStart, {passive: true});
            window.addEventListener('touchend', handleTouchEnd, {passive: true});
            window.addEventListener('touchmove', handleTouchMove, {passive: false});
        }
    }
}