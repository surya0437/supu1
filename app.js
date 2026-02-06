// Particle Trail Effect
let particles = ['💖', '💕', '✨', '💝', '🌹', '💗'];
let lastParticleTime = 0;

const musicToggle = document.getElementById('musicToggle');
const backgroundMusic = document.getElementById('backgroundMusic');
let isPlaying = false;


document.addEventListener('mousemove', function (e) {
    const now = Date.now();
    if (now - lastParticleTime > 30) { // Throttle particle creation
        createParticle(e.clientX, e.clientY);
        lastParticleTime = now;
    }
});

document.addEventListener('click', function (e) {
    const now = Date.now();
    if (now - lastParticleTime > 30) { // Throttle particle creation
        createParticle(e.clientX, e.clientY);
        lastParticleTime = now;
    }
});

document.addEventListener('touchmove', function (e) {
    const now = Date.now();
    if (now - lastParticleTime > 100) {
        const touch = e.touches[0];
        createParticle(touch.clientX, touch.clientY);
        lastParticleTime = now;
    }
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.textContent = particles[Math.floor(Math.random() * particles.length)];
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 1000);
}

// Sound Effects
function playSound(frequency = 520, duration = 200) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
}

// Create floating hearts
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝'];

    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 15 + 's';
        heart.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(heart);
    }
}

createFloatingHearts();

// Easter Egg Handler
document.getElementById('easterEgg').addEventListener('click', function () {
    playSound(660, 150);
    document.getElementById('overlay').classList.add('active');
    document.getElementById('secretMessage').classList.add('active');
});

document.getElementById('closeSecret').addEventListener('click', function () {
    playSound(440, 150);
    document.getElementById('overlay').classList.remove('active');
    document.getElementById('secretMessage').classList.remove('active');
});

document.getElementById('overlay').addEventListener('click', function () {
    this.classList.remove('active');
    document.getElementById('secretMessage').classList.remove('active');
});

// Apology Button Handler
document.getElementById('acceptApologyBtn').addEventListener('click', function () {
    playSound(523, 200);
    backgroundMusic.play();
    isPlaying = true;
    musicToggle.textContent = '🔊';
    showSection('section1');
});

// Helper function to show section
function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.style.display = 'flex';
    setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Trigger card animations for section 2
        if (sectionId === 'section2') {
            setTimeout(() => {
                document.querySelectorAll('.reveal-card').forEach(card => {
                    card.classList.add('visible');
                });
            }, 300);
        }
        // Add rose petals for Valentine Week section
        if (sectionId === 'valentineWeek') {
            createRosePetals();
        }
    }, 100);
}

// Envelope Opening Animation
const envelope = document.getElementById('envelope');
const section1 = document.getElementById('section1');

envelope.addEventListener('click', function () {
    playSound(587, 300);
    this.classList.add('opening');

    setTimeout(() => {
        section1.classList.add('hidden');
        showSection('section2');
    }, 1000);
});

// Continue Button 1 (Section 2 to Section 2.5 - Polaroids)
document.getElementById('continueBtn1').addEventListener('click', function () {
    playSound(659, 200);
    showSection('section2-5');
});

// Continue Button 1.5 (Section 2.5 to Section 3)
document.getElementById('continueBtn1-5').addEventListener('click', function () {
    playSound(698, 200);
    showSection('section3');
});

// Continue Button 2 (Section 3 to Section 4)
document.getElementById('continueBtn2').addEventListener('click', function () {
    playSound(784, 200);
    showSection('section4');
});

// Runaway "No" Button

const noButton = document.getElementById('noButton');
const yesButton = document.getElementById('yesButton');

function moveButton() {
    playSound(392, 100);
    const maxX = window.innerWidth - noButton.offsetWidth - 40;
    const maxY = window.innerHeight - noButton.offsetHeight - 40;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noButton.style.position = 'fixed';
    noButton.style.left = randomX + 'px';
    noButton.style.top = randomY + 'px';
}

noButton.addEventListener('mouseenter', moveButton);
noButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
});

// Yes Button - Celebration
yesButton.addEventListener('click', function () {
    playSound(880, 500);

    // Inside the Yes Button click function:
    document.body.classList.add('celebrating'); // Triggers the color shift
    noButton.style.display = 'none';

    // Create a massive heart ripple
    const ripple = document.createElement('div');
    ripple.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 0;
                height: 0;
                background: rgba(244, 114, 182, 0.2);
                border-radius: 50%;
                z-index: -1;
                transition: width 1.5s ease-out, height 1.5s ease-out;
            `;
    document.body.appendChild(ripple);

    setTimeout(() => {
        ripple.style.width = '300vw';
        ripple.style.height = '300vw';
    }, 10);

    // Confetti burst
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
    }, 250);

    // Show celebration section
    setTimeout(() => {
        document.getElementById('celebration').classList.add('active');
        document.getElementById('celebration').scrollIntoView({ behavior: 'smooth' });
    }, 500);
});

// Celebrate More Button - Extra Confetti
document.getElementById('celebrateMore').addEventListener('click', function () {
    playSound(1047, 300);

    // Giant confetti explosion
    confetti({
        particleCount: 200,
        spread: 180,
        origin: { y: 0.6 },
        colors: ['#F472B6', '#EC4899', '#FBBF24', '#F59E0B', '#FB7185']
    });

    setTimeout(() => {
        confetti({
            particleCount: 150,
            angle: 60,
            spread: 100,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 150,
            angle: 120,
            spread: 100,
            origin: { x: 1 }
        });
    }, 250);
});

// Valentine Week Button
document.getElementById('valentineWeekBtn').addEventListener('click', function () {
    playSound(800, 300);
    showSection('valentineWeek');
    
    // Create rose petal confetti
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fb7185', '#f43f5e', '#e11d48', '#fda4af'],
        shapes: ['circle'],
        scalar: 0.8
    });
});

// Music Toggle

musicToggle.addEventListener('click', function () {
    if (isPlaying) {
        backgroundMusic.pause();
        musicToggle.textContent = '🎵';
        isPlaying = false;
    } else {
        backgroundMusic.play();
        musicToggle.textContent = '🔊';
        isPlaying = true;
    }
});

// Inside your Section 2.5 to 3 transition:
document.querySelectorAll('#section3 p').forEach(p => p.classList.add('reveal-text'));
setTimeout(() => {
    document.querySelectorAll('#section3 p').forEach(p => p.classList.add('active'));
}, 500);


const cards = document.querySelectorAll('.polaroid, .reveal-card, .love-letter');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    });
});


function initScratchCard() {
    const canvas = document.getElementById('scratchCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Cover color
    ctx.fillStyle = '#F472B6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add "Scratch Me" text
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch to Reveal ✨', canvas.width / 2, canvas.height / 2 + 7);

    let isDrawing = false;

    function scratch(e) {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.fill();
    }

    canvas.addEventListener('mousedown', () => isDrawing = true);
    canvas.addEventListener('touchstart', () => isDrawing = true);
    window.addEventListener('mouseup', () => isDrawing = false);
    window.addEventListener('touchend', () => isDrawing = false);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('touchmove', scratch);
}

setInterval(() => {
    if (window.scrollY > 500 && window.scrollY < document.body.scrollHeight - 1000) {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 10 + 10) + 'px';
        heart.style.duration = (Math.random() * 3 + 2) + 's';
        heart.style.opacity = Math.random();
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }
}, 300);

// Create Rose Petals Animation
function createRosePetals() {
    const valentineSection = document.getElementById('valentineWeek');
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.className = 'rose-petal';
            petal.style.left = Math.random() * 100 + '%';
            petal.style.animationDelay = Math.random() * 5 + 's';
            petal.style.animationDuration = (8 + Math.random() * 4) + 's';
            valentineSection.appendChild(petal);
            
            setTimeout(() => petal.remove(), 15000);
        }, i * 200);
    }
}