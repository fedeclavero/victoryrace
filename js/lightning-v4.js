(async function () {
    let animate;

    try {
        const anime = await import('https://cdn.jsdelivr.net/npm/animejs@4/lib/anime.esm.min.js');
        animate = anime.animate;
        console.log("⚡ [Lightning] Anime.js v4 loaded.");
    } catch (e) {
        console.error("❌ [Lightning] Failed to load Anime.js:", e);
        return;
    }

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = 'lightning-svg';
    Object.assign(svg.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: '5',
        overflow: 'visible'
    });

    svg.innerHTML = `
        <defs>
            <filter id="lightning-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur1"/>
                <feColorMatrix in="blur1" type="matrix"
                    values="0 0 0 0 0
                            0.3 0.7 1 0 0
                            0 0 1 0 0
                            0 0 0 1 0" result="blue-glow"/>
                <feMerge>
                    <feMergeNode in="blue-glow"/>
                    <feMergeNode in="blue-glow"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
    `;

    document.body.appendChild(svg);

    function generatePoints(x1, y1, x2, y2, depth) {
        if (depth === 0) return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
        const dx = x2 - x1, dy = y2 - y1;
        const len = Math.sqrt(dx * dx + dy * dy);
        const disp = (Math.random() - 0.5) * len * 0.45;
        const nx = -dy / len, ny = dx / len;
        const ox = mx + nx * disp, oy = my + ny * disp;
        const left = generatePoints(x1, y1, ox, oy, depth - 1);
        const right = generatePoints(ox, oy, x2, y2, depth - 1);
        return [...left.slice(0, -1), ...right];
    }

    function createBolt() {
        const w = window.innerWidth, h = window.innerHeight;
        const startX = Math.random() * w, startY = 0;
        const endX = startX + (Math.random() - 0.5) * w * 0.5;
        const endY = h * (0.4 + Math.random() * 0.5);

        const points = generatePoints(startX, startY, endX, endY, 7);
        const d = points.reduce((acc, p, i) => i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, '');

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', '#ffffff');
        path.setAttribute('stroke-width', '1.5');
        path.setAttribute('filter', 'url(#lightning-glow)');
        path.style.opacity = '1';

        // Manual setup for progressive drawing (reliable cross-version)
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;

        svg.appendChild(path);

        // Core Drawing Animation
        animate(path, {
            strokeDashoffset: [length, 0],
            duration: 600,
            ease: 'linear',
            onComplete: () => {
                // Flicker and disappear
                animate(path, {
                    opacity: [1, 0.2, 1, 0.3, 1, 0],
                    duration: 1000,
                    ease: 'easeOutQuad',
                    onComplete: () => path.remove()
                });
            }
        });
    }

    let loopTimeout = null;
    let isRunning = false;

    function loop() {
        // Pause generation when the tab is hidden
        if (document.hidden) {
            isRunning = false;
            return;
        }
        createBolt();
        loopTimeout = setTimeout(loop, 1500 + Math.random() * 3000);
    }

    function startLoop() {
        if (!isRunning) {
            isRunning = true;
            loop();
        }
    }

    // Listen for tab visibility changes
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            // Tab became visible again — restart the loop
            startLoop();
        }
        // When hidden, the loop stops itself on next tick
    });

    startLoop();
    // Stagger a second independent bolt stream
    setTimeout(() => {
        if (!document.hidden) startLoop();
    }, 2000);
})();
