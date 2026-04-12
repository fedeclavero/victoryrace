(function () {
    // Uses the globally loaded anime.js v3 (loaded via defer in HTML)
    // anime.js v3 is available as window.anime
    var animate = window.anime;
    if (!animate) {
        console.warn("[Lightning] Anime.js not found globally.");
        return;
    }

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = 'lightning-svg';
    Object.assign(svg.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: '5',
        overflow: 'hidden'
    });

    svg.innerHTML = '<defs><filter id="lightning-glow" x="-50%" y="-50%" width="200%" height="200%"><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>';

    document.body.appendChild(svg);

    function generatePoints(x1, y1, x2, y2, depth) {
        if (depth === 0) return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
        var mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
        var dx = x2 - x1, dy = y2 - y1;
        var len = Math.sqrt(dx * dx + dy * dy);
        var disp = (Math.random() - 0.5) * len * 0.45;
        var nx = -dy / len, ny = dx / len;
        var ox = mx + nx * disp, oy = my + ny * disp;
        var left = generatePoints(x1, y1, ox, oy, depth - 1);
        var right = generatePoints(ox, oy, x2, y2, depth - 1);
        return left.slice(0, -1).concat(right);
    }

    function createBolt() {
        var w = window.innerWidth, h = window.innerHeight;
        var startX = Math.random() * w, startY = 0;
        var endX = startX + (Math.random() - 0.5) * w * 0.5;
        var endY = h * (0.4 + Math.random() * 0.5);

        var points = generatePoints(startX, startY, endX, endY, 6);
        var d = points.reduce(function (acc, p, i) { return i === 0 ? 'M ' + p.x + ' ' + p.y : acc + ' L ' + p.x + ' ' + p.y; }, '');

        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', '#00f2ff');
        path.setAttribute('stroke-width', '1.5');
        path.style.filter = 'drop-shadow(0 0 6px rgba(0, 242, 255, 0.8)) drop-shadow(0 0 12px rgba(0, 242, 255, 0.4))';
        path.style.opacity = '1';

        var length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;

        svg.appendChild(path);

        animate(path, {
            strokeDashoffset: [length, 0],
            duration: 600,
            easing: 'linear',
            complete: function () {
                animate(path, {
                    opacity: [1, 0.2, 1, 0.3, 1, 0],
                    duration: 1000,
                    easing: 'easeOutQuad',
                    complete: function () { path.remove(); }
                });
            }
        });
    }

    var loopTimeout = null;
    var isRunning = false;

    function loop() {
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

    document.addEventListener('visibilitychange', function () {
        if (!document.hidden) {
            startLoop();
        }
    });

    startLoop();
    setTimeout(function () {
        if (!document.hidden) startLoop();
    }, 2000);
})();
