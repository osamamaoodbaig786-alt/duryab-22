document.addEventListener('DOMContentLoaded', () => {

    // 1. DYNAMIC FOOTER YEAR
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // 2. DARK / LIGHT THEME TOGGLE WITH LOCAL STORAGE
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('user-theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersLight) {
        htmlElement.setAttribute('data-theme', 'light');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('user-theme', newTheme);
        });
    }

    // 3. MOBILE MENU TOGGLE
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // 4. SCROLL PROGRESS INDICATOR
    const progressBar = document.getElementById('progress-bar');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) progressBar.style.width = scrolled + '%';
    });

    // 5. INTERSECTION OBSERVER FOR SECTION REVEALS
    const reveals = document.querySelectorAll('.section-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    reveals.forEach(reveal => revealObserver.observe(reveal));

    // 6. 3D FLOATING GEOMETRY & INTERACTIVE CANVAS ENGINE
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let mouse = { x: null, y: null, radius: 180 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function getThemeColor() {
        const theme = htmlElement.getAttribute('data-theme');
        return theme === 'light' ? { r: 99, g: 102, b: 241 } : { r: 6, g: 182, b: 212 };
    }

    class FloatingShape {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 25 + 15;
            this.speedX = (Math.random() - 0.5) * 0.8;
            this.speedY = (Math.random() - 0.5) * 0.8;
            this.angle = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
            this.type = Math.floor(Math.random() * 3);
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.angle += this.rotationSpeed;

            if (this.x < -50) this.x = width + 50;
            if (this.x > width + 50) this.x = -50;
            if (this.y < -50) this.y = height + 50;
            if (this.y > height + 50) this.y = -50;

            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    let force = (mouse.radius - distance) / mouse.radius;
                    let angle = Math.atan2(dy, dx);
                    this.x -= Math.cos(angle) * force * 3;
                    this.y -= Math.sin(angle) * force * 3;
                }
            }
        }

        draw() {
            const color = getThemeColor();
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);

            ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.25)`;
            ctx.lineWidth = 1.5;

            ctx.beginPath();
            if (this.type === 0) {
                ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size);
                ctx.strokeRect(-this.size / 4, -this.size / 4, this.size / 2, this.size / 2);
            } else if (this.type === 1) {
                ctx.moveTo(0, -this.size);
                ctx.lineTo(this.size / 1.5, 0);
                ctx.lineTo(0, this.size);
                ctx.lineTo(-this.size / 1.5, 0);
                ctx.closePath();
                ctx.stroke();
            } else {
                ctx.moveTo(0, -this.size);
                ctx.lineTo(this.size, this.size);
                ctx.lineTo(-this.size, this.size);
                ctx.closePath();
                ctx.stroke();
            }

            ctx.restore();
        }
    }

    class EnergyNode {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.radius = Math.random() * 2 + 1;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            const color = getThemeColor();
            ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const shapes = Array.from({ length: 18 }, () => new FloatingShape());
    const nodes = Array.from({ length: 35 }, () => new EnergyNode());

    function drawConnections() {
        const color = getThemeColor();
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                let dx = nodes[i].x - nodes[j].x;
                let dy = nodes[i].y - nodes[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 140) {
                    let alpha = (1 - dist / 140) * 0.2;
                    ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        shapes.forEach(shape => {
            shape.update();
            shape.draw();
        });

        nodes.forEach(node => {
            node.update();
            node.draw();
        });

        drawConnections();

        requestAnimationFrame(animate);
    }

    animate();
});