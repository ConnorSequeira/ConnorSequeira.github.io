/*
    Dimension by HTML5 UP
    html5up.net | @ajlkn
    Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {
    var $window = $(window),
        $body = $('body'),
        $wrapper = $('#wrapper'),
        $header = $('#header'),
        $footer = $('#footer'),
        $main = $('#main'),
        $main_articles = $main.children('article');

    // Breakpoints.
    breakpoints({
        xlarge: ['1281px', '1680px'],
        large: ['981px', '1280px'],
        medium: ['737px', '980px'],
        small: ['481px', '736px'],
        xsmall: ['361px', '480px'],
        xxsmall: [null, '360px']
    });

    // Play initial animations on page load.
    $window.on('load', function () {
        window.setTimeout(function () {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Particle Animation Script
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    // Resize canvas to fit the screen
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle settings
    const particleCount = 275;
    const particles = [];

    // Utility function to generate random values
    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Particle class
    class Particle {
        constructor(x, y) {
            this.x = x || canvas.width / 2;
            this.y = y || canvas.height / 2;
            this.size = random(2, 5);
            this.speedX = random(-2, 2);
            this.speedY = random(-2, 2);
            this.glow = `rgba(255, 255, 255, ${random(0.5, 1)})`;
            this.isBursting = true;
            this.burstAcceleration = 0.1; // Initial burst speed
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.glow;
            ctx.fill();
        }

        update() {
            if (this.isBursting) {
                this.speedX += random(-this.burstAcceleration, this.burstAcceleration);
                this.speedY += random(-this.burstAcceleration, this.burstAcceleration);
                this.burstAcceleration *= 0.98; // Gradually slow down the burst

                if (this.burstAcceleration < 0.02) {
                    this.isBursting = false; // End burst
                }
            }

            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap particles around screen edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
    }

    // Initialize particles
    function createParticles() {
        particles.length = 0;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    // Animate particles
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle) => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    // Click event to create a burst effect
    canvas.addEventListener('click', (event) => {
        const { clientX, clientY } = event;

        particles.forEach((particle) => {
            const dx = particle.x - clientX;
            const dy = particle.y - clientY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                particle.speedX = -dx * 0.1;
                particle.speedY = -dy * 0.1;
            }
        });
    });

    // Start particle animation
    createParticles();
    animateParticles();

})(jQuery);
