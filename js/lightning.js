import { animate, createDrawable } from 'https://cdn.jsdelivr.net/npm/animejs@4/lib/anime.esm.min.js';

(function () {
    // 1. Initialize SVG Overlay
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = 'lightning-svg';
    Object.assign(svg.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: '1',
        overflow: 'visible'
    });

    // 2. Add Glow Filter
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

    document.body.insertBefore(svg, document.body.firstChild);

    function generateLightningPoints(x1, y1, x2, y2, depth) {
        if (depth === 0) return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.sqrt(dx * dx + dy * dy);
        const displacement = (Math.random() - 0.5) * length * 0.4;
        const perpX = -dy / length;
        const perpY = dx / length;
        const offsetX = mx + perpX * displacement;
        const offsetY = my + perpY * displacement;
        const left = generateLightningPoints(x1, y1, offsetX, offsetY, depth - 1);
        const right = generateLightningPoints(offsetX, offsetY, x2, y2, depth - 1);
        return [...left.slice(0, -1), ...right];
    }

    function createLightningBolt() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        let startX, startY, endX, endY;

        const side = Math.random();
        if (side < 0.6) { // Top
            startX = Math.random() * width; startY = 0;
            endX = startX + (Math.random() - 0.5) * width * 0.6;
            endY = height * (0.4 + Math.random() * 0.45);
        } else if (side < 0.8) { // Left
            startX = 0; startY = Math.random() * height * 0.7;
            endX = width * (0.4 + Math.random() * 0.35);
            endY = startY + (Math.random() - 0.5) * height * 0.5;
        } else { // Right
            startX = width; startY = Math.random() * height * 0.7;
            endX = width * (0.25 + Math.random() * 0.35);
            endY = startY + (Math.random() - 0.5) * height * 0.5;
        }

        const points = generateLightningPoints(startX, startY, endX, endY, 7);
        const d = points.reduce((acc, p, i) => i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, '');

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', '#ffffff');
        path.setAttribute('stroke-width', '1.5');
        path.setAttribute('filter', 'url(#lightning-glow)');
        svg.appendChild(path);

        // Optional Secondary Branch
        if (Math.random() < 0.25) {
            const branchIdx = Math.floor(Math.random() * (points.length - 10)) + 5;
            const bStart = points[branchIdx];
            const dist = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
            const bEndX = bStart.x + (Math.random() - 0.5) * dist * 0.4;
            const bEndY = bStart.y + (Math.random() - 0.2) * dist * 0.4;
            const bPoints = generateLightningPoints(bStart.x, bStart.y, bEndX, bEndY, 4);
            const bd = bPoints.reduce((acc, p, i) => i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, '');
            const bPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            bPath.setAttribute('d', bd);
            bPath.setAttribute('fill', 'none');
            bPath.setAttribute('stroke', '#ffffff');
            bPath.setAttribute('stroke-width', '1');
            bPath.setAttribute('filter', 'url(#lightning-glow)');
            bPath.setAttribute('opacity', '0.5');
            svg.appendChild(bPath);
            animateBolt(bPath);
        }

        animateBolt(path);
    }

    function animateBolt(path) {
        const drawable = createDrawable(path);
        animate(drawable, {
            draw: ['0 0', '0 1'],
            duration: 800,
            ease: 'linear',
            onComplete: () => {
                const fadeOut = () => {
                    animate(path, {
                        opacity: [1, 0],
                        duration: 1500,
                        ease: 'easeOutQuad',
                        onComplete: () => path.remove()
                    });
                };

                if (Math.random() > 0.4) {
                    animate(path, {
                        opacity: [1, 0.2, 1, 0.3, 1],
                        duration: 300,
                        ease: 'linear',
                        onComplete: fadeOut
                    });
                } else {
                    setTimeout(fadeOut, 500 + Math.random() * 1000);
                }
            }
        });
    }

    function scheduleLightning() {
        createLightningBolt();
        const nextDelay = 800 + Math.random() * 2200;
        setTimeout(scheduleLightning, nextDelay);
    }

    scheduleLightning();
    setTimeout(scheduleLightning, 1200);
})();
