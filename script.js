const overlay = document.getElementById('magic-overlay');
const mainContent = document.getElementById('main-content');
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let starsArray = [];
let animationRunning = false;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.6 + 0.1; // Gentle drifting downwards
        this.glowColor = Math.random() > 0.5 ? '#ffb7d5' : '#ffd700';
        this.alpha = Math.random();
        this.fadeSpeed = Math.random() * 0.01 + 0.005;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.shadowBlur = this.size * 5;
        ctx.shadowColor = this.glowColor;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function initStars() {
    starsArray = [];
    const count = Math.floor((canvas.width * canvas.height) / 9000);
    for (let i = 0; i < count; i++) {
        starsArray.push(new Star());
    }
}

function animate() {
    if (!animationRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < starsArray.length; i++) {
        starsArray[i].update();
        starsArray[i].draw();
    }
    requestAnimationFrame(animate);
}

overlay.addEventListener('click', () => {
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.classList.add('hidden');
        mainContent.classList.remove('hidden');
        animationRunning = true;
        initStars();
        animate();
    }, 1000);
});

