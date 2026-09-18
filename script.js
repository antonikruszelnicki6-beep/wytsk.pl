// ============================================================
//   INICJALIZACJA
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    setProfile();
    setBackground();
    setLinks();
    if (CONFIG.effects.typing)       startTyping();
    if (CONFIG.effects.customCursor) initCursor();
    if (CONFIG.counter.enabled)      initCounter();

    initIntro();
    initRipple();
    initTilt();

    initDiscordPresence();
    discordInterval = setInterval(initDiscordPresence, 15000);

    if (CONFIG.effects.fadeIn) {
        setTimeout(() => document.getElementById('card').classList.add('visible'), 100);
    } else {
        document.getElementById('card').classList.add('visible');
    }
});

// ============================================================
//   PROFIL
// ============================================================
function setProfile() {
    document.getElementById('name').textContent = CONFIG.name;
    document.getElementById('avatar').src = CONFIG.avatar;
    document.title = CONFIG.name + ' • wytsk.pl';
}

// ============================================================
//   EFEKT PISANIA BIO
// ============================================================
function startTyping() {
    const el = document.getElementById('bio');
    const text = CONFIG.bio;
    let i = 0;
    el.textContent = '';
    const speed = CONFIG.effects.typingSpeed || 55;
    (function tick() {
        if (i < text.length) {
            el.textContent += text[i++];
            setTimeout(tick, speed);
        } else {
            el.classList.add('done');
        }
    })();
}

// ============================================================
//   IKONY SVG
// ============================================================
const ICONS = {
    discord: `<svg viewBox="0 0 24 24"><path d="M20.317 4.369A19.79 19.79 0 0 0 15.885 3c-.2.36-.43.845-.588 1.23a18.27 18.27 0 0 0-5.594 0A13.4 13.4 0 0 0 9.11 3a19.74 19.74 0 0 0-4.43 1.37C1.86 8.61 1.1 12.75 1.48 16.84a19.9 19.9 0 0 0 5.99 3.02c.48-.66.91-1.36 1.28-2.1-.7-.27-1.37-.6-2-.99.17-.13.34-.26.5-.4a14.1 14.1 0 0 0 11.5 0c.16.14.33.27.5.4-.63.39-1.3.72-2 .99.37.74.8 1.44 1.28 2.1a19.86 19.86 0 0 0 5.99-3.02c.44-4.74-.76-8.83-3.21-12.47ZM8.02 14.33c-1.18 0-2.15-1.08-2.15-2.4 0-1.33.95-2.4 2.15-2.4 1.2 0 2.17 1.08 2.15 2.4 0 1.32-.95 2.4-2.15 2.4Zm7.96 0c-1.18 0-2.15-1.08-2.15-2.4 0-1.33.95-2.4 2.15-2.4 1.2 0 2.17 1.08 2.15 2.4 0 1.32-.95 2.4-2.15 2.4Z"/></svg>`,

    instagram: `<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.06.42 2.23.06 1.26.07 1.64.07 4.85s0 3.6-.07 4.85c-.05 1.17-.25 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.37-2.23.42-1.26.06-1.64.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.42a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.17-.42-.37-1.06-.42-2.23C2.2 15.6 2.2 15.22 2.2 12s0-3.6.07-4.85c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.37 2.23-.42C8.4 2.2 8.78 2.2 12 2.2Zm0 1.8c-3.15 0-3.52.01-4.76.07-.87.04-1.34.18-1.66.3-.42.16-.72.36-1.03.67-.3.31-.5.6-.67 1.03-.12.32-.26.8-.3 1.66C3.5 8.48 3.5 8.85 3.5 12s.01 3.52.07 4.76c.04.87.18 1.34.3 1.66.16.42.36.72.67 1.03.31.3.6.5 1.03.67.32.12.8.26 1.66.3 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.87-.04 1.34-.18 1.66-.3.42-.16.72-.36 1.03-.67.3-.31.5-.6.67-1.03.12-.32.26-.8.3-1.66.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.04-.87-.18-1.34-.3-1.66a2.77 2.77 0 0 0-.67-1.03 2.77 2.77 0 0 0-1.03-.67c-.32-.12-.8-.26-1.66-.3C15.52 4.01 15.15 4 12 4Zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 1.8a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2Zm5.1-.7a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z"/></svg>`,

    tiktok: `<svg viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.3 0 .58.04.86.13V9.4a6.33 6.33 0 0 0-5.11 10.55 6.33 6.33 0 0 0 11.05-4.31V8.66a8.15 8.15 0 0 0 4.77 1.52V6.73a4.85 4.85 0 0 1-1.46-.04Z"/></svg>`,

    youtube: `<svg viewBox="0 0 24 24"><path d="M23.5 6.2a3.02 3.02 0 0 0-2.13-2.13C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.37.52A3.02 3.02 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.13 2.13c1.87.52 9.37.52 9.37.52s7.5 0 9.37-.52a3.02 3.02 0 0 0 2.13-2.13A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z"/></svg>`,

    twitter: `<svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.16 17.52h1.833L7.084 4.126H5.117L17.084 19.77Z"/></svg>`,

    github: `<svg viewBox="0 0 24 24"><path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.72-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.1-.74.08-.72.08-.72 1.21.08 1.85 1.24 1.85 1.24 1.08 1.83 2.82 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.9 0-1.3.46-2.37 1.24-3.21-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.21 0 4.58-2.8 5.6-5.47 5.9.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.83.58A12 12 0 0 0 12 .5Z"/></svg>`,

    twitch: `<svg viewBox="0 0 24 24"><path d="M2.6 0 .5 4.2v15.6h5.4V22h3.6l3.3-2.2h3.9l5.8-5.8V0H2.6Zm17.8 13.5-3.2 3.2h-5.2l-3.3 2.2v-2.2H4.5V2.2h15.9v11.3ZM9 5.5v6h2.2v-6H9Zm5.8 0v6h2.2v-6h-2.2Z"/></svg>`,

    spotify: `<svg viewBox="0 0 24 24"><path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm5.5 17.3a.75.75 0 0 1-1.03.25c-2.82-1.72-6.37-2.11-10.55-1.16a.75.75 0 1 1-.33-1.46c4.57-1.04 8.5-.6 11.66 1.34.36.22.47.69.25 1.03Zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.23-1.98-8.15-2.56-11.97-1.4a.94.94 0 1 1-.55-1.8c4.37-1.32 9.8-.68 13.5 1.6.44.27.58.85.31 1.29Zm.13-3.4C15.24 8.32 8.85 8.1 5.18 9.22a1.13 1.13 0 1 1-.65-2.16c4.22-1.28 11.27-1.03 15.72 1.61a1.13 1.13 0 0 1-1.16 1.95Z"/></svg>`,

    steam: `<svg viewBox="0 0 24 24"><path d="M12 0a12 12 0 0 0-12 11.7l6.45 2.66a3.4 3.4 0 0 1 1.94-.6l2.87-4.16v-.06a4.55 4.55 0 1 1 4.55 4.55h-.11l-4.1 2.93c0 .12.01.23.01.35a3.42 3.42 0 0 1-6.8.53l-4.6-1.9A12 12 0 1 0 12 0Zm-4.9 18.26 1.13.47a2.57 2.57 0 1 0 2.93-4.06l1.17.48a1.93 1.93 0 1 1-1.49 3.55 1.93 1.93 0 0 1-1.05-1.04l-1.17-.48a3.42 3.42 0 0 1-1.52-.04Zm8.42-10.02a3.04 3.04 0 1 0 0 6.08 3.04 3.04 0 0 0 0-6.08Zm0 1a2.04 2.04 0 1 1 0 4.08 2.04 2.04 0 0 1 0-4.08Z"/></svg>`,

    telegram: `<svg viewBox="0 0 24 24"><path d="M23.9 3.3 20.3 20.5c-.27 1.2-.98 1.5-1.98.93l-5.47-4.03-2.64 2.54c-.29.29-.54.54-1.1.54l.39-5.55L19.6 5.86c.44-.39-.1-.6-.68-.22L6.48 13.5.9 11.74c-1.2-.38-1.23-1.2.25-1.78L22.36 1.62c1-.37 1.87.23 1.54 1.68Z"/></svg>`,

    email: `<svg viewBox="0 0 24 24"><path d="M2 4h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm10 8.2L3.5 6H20.5L12 12.2Zm0 2.3 8.5-6.2V18H3.5V8.3L12 14.5Z"/></svg>`,

    website: `<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm7.93 9h-3.42a15.6 15.6 0 0 0-1.13-5.4 8.02 8.02 0 0 1 4.55 5.4ZM12 4.06c.9 1.2 1.6 2.9 1.9 5.94h-3.8c.3-3.04 1-4.74 1.9-5.94ZM4.26 13h3.42c.14 1.9.53 3.7 1.13 5.4A8.02 8.02 0 0 1 4.26 13Zm3.42-2H4.26a8.02 8.02 0 0 1 4.55-5.4A15.6 15.6 0 0 0 7.68 11Zm1.8 0c.3-3.04 1-4.74 1.9-5.94.9 1.2 1.6 2.9 1.9 5.94h-3.8Zm0 2h3.8c-.3 3.04-1 4.74-1.9 5.94-.9-1.2-1.6-2.9-1.9-5.94Zm6.7 2c-.6 1.7-.99 3.5-1.13 5.4h3.42a8.02 8.02 0 0 1-2.29-5.4Zm1.13-2a15.6 15.6 0 0 0-1.13-5.4 8.02 8.02 0 0 1 4.55 5.4h-3.42Z"/></svg>`,

    link: `<svg viewBox="0 0 24 24"><path d="M3.9 12a3.1 3.1 0 0 1 3.1-3.1h3V7H7a5 5 0 0 0 0 10h3v-1.9H7A3.1 3.1 0 0 1 3.9 12Zm3.6 1h9v-2h-9v2Zm5.5-6h-3v1.9h3a3.1 3.1 0 0 1 0 6.2h-3V17h3a5 5 0 0 0 0-10Z"/></svg>`,

    volume: `<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3a4.5 4.5 0 0 0-2.5-4.03v8.05A4.5 4.5 0 0 0 16.5 12ZM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77Z"/></svg>`,

    muted: `<svg viewBox="0 0 24 24"><path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63ZM19 12c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.8 8.8 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71ZM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z"/></svg>`,

    eye: `<svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5ZM12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg>`
};

// ============================================================
//   LINKI
// ============================================================
function setLinks() {
    const box = document.getElementById('links');
    box.innerHTML = '';
    CONFIG.links.forEach(l => {
        const a = document.createElement('a');
        a.href = l.url;
        a.target = '_blank';
        a.rel = 'noopener';
        a.className = 'btn';
        a.dataset.brand = l.icon;
        a.innerHTML = `
      <span class="icon">${ICONS[l.icon] || ICONS.link}</span>
      <span class="label">${l.label}</span>
    `;
        box.appendChild(a);
    });

    if (CONFIG.effects.customCursor) attachCursorListeners();
}

// ============================================================
//   TŁO
// ============================================================
function setBackground() {
    const bg = CONFIG.background;
    const canvas = document.getElementById('bg-canvas');
    const img = document.getElementById('bg-image');
    const yt = document.getElementById('bg-youtube');
    const vid = document.getElementById('bg-video');

    canvas.style.display = 'none';
    img.style.display = 'none';
    yt.style.display = 'none';
    vid.style.display = 'none';

    if (bg.type === 'matrix') {
        canvas.style.display = 'block';
        startMatrix();
    } else if (bg.type === 'particles') {
        canvas.style.display = 'block';
        startParticles();
    } else if (bg.type === 'gradient') {
        document.body.style.background =
            'linear-gradient(135deg,#0f0c29,#302b63,#24243e)';
    } else if (bg.type === 'image' && bg.image) {
        img.style.display = 'block';
        img.style.backgroundImage = `url('${bg.image}')`;
    } else if (bg.type === 'youtube' && bg.youtube) {
        yt.style.display = 'block';
        const mute = bg.youtubeMuted ? 1 : 0;
        document.getElementById('yt-player').innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/${bg.youtube}?autoplay=1&mute=${mute}&controls=0&loop=1&playlist=${bg.youtube}&showinfo=0&rel=0&modestbranding=1&playsinline=1"
        allow="autoplay; encrypted-media"
        allowfullscreen>
      </iframe>`;
    } else if (bg.type === 'video') {
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const src = isMobile && bg.videoMobile ? bg.videoMobile : bg.video;

        const overlay = bg.videoOverlay ?? 0.45;
        document.body.style.setProperty('--video-overlay', overlay);

        if (isMobile && bg.videoMobile && /\.(jpg|jpeg|png|webp|gif)$/i.test(bg.videoMobile)) {
            img.style.display = 'block';
            img.style.backgroundImage = `url('${bg.videoMobile}')`;
            img.style.opacity = '0';
            setTimeout(() => img.style.opacity = '1', 50);
        } else if (src) {
            vid.style.display = 'block';
            vid.style.opacity = '0';
            vid.src = src;
            vid.muted = bg.videoMuted !== false;
            vid.loop = true;
            vid.autoplay = true;
            vid.playsInline = true;

            vid.addEventListener('loadeddata', () => {
                vid.style.opacity = '1';
            }, { once: true });

            vid.play().catch(() => {
                const resume = () => {
                    vid.play().catch(() => {});
                    document.removeEventListener('click', resume);
                    document.removeEventListener('touchstart', resume);
                };
                document.addEventListener('click', resume);
                document.addEventListener('touchstart', resume);
            });
        }
    }
}

// ============================================================
//   MATRIX
// ============================================================
function startMatrix() {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    const color = (CONFIG.background.matrixColor) || '#00ff88';

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const fontSize = 16;
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const arr = chars.split('');
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(1);

    window.addEventListener('resize', () => {
        columns = Math.floor(canvas.width / fontSize);
        drops = Array(columns).fill(1);
    });

    function draw() {
        ctx.fillStyle = 'rgba(5,6,10,0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = color;
        ctx.font = fontSize + 'px JetBrains Mono, monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = arr[Math.floor(Math.random() * arr.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
                drops[i] = 0;
            drops[i]++;
        }
    }
    setInterval(draw, 45);
}

// ============================================================
//   PARTICLES
// ============================================================
function startParticles() {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let w, h, particles;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    function init() {
        particles = Array.from({ length: 70 }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 1.8 + 0.4,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            hue: Math.random() * 360
        }));
    }
    function draw() {
        ctx.fillStyle = 'rgba(5,6,10,0.35)';
        ctx.fillRect(0, 0, w, h);
        for (const p of particles) {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue},90%,65%,0.8)`;
            ctx.fill();
        }
        requestAnimationFrame(draw);
    }
    resize(); init(); draw();
    window.addEventListener('resize', () => { resize(); init(); });
}

// ============================================================
//   CURSOR
// ============================================================
function initCursor() {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });

    (function loop() {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
        requestAnimationFrame(loop);
    })();

    attachCursorListeners();
}

function attachCursorListeners() {
    const ring = document.querySelector('.cursor-ring');
    document.querySelectorAll('a, button, .btn').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
}

// ============================================================
//   LICZNIK
// ============================================================
async function initCounter() {
  const el = document.getElementById('visits');
  const url = CONFIG.counter.url;
  const path = CONFIG.counter.path || 'visits';

  if (!url || url.includes('TWOJ-PROJEKT')) {
    el.innerHTML = `${ICONS.eye} —`;
    console.warn('Uzupełnij CONFIG.counter.url w config.js');
    return;
  }

  try {
    const getRes = await fetch(`${url}/${path}.json`);
    let value = await getRes.json();
    if (typeof value !== 'number') value = 0;

    value += 1;
    await fetch(`${url}/${path}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value)
    });

    el.innerHTML = `${ICONS.eye} ${value.toLocaleString('pl-PL')}`;
  } catch (e) {
    el.innerHTML = `${ICONS.eye} —`;
    console.warn('Licznik nie odpowiada:', e.message);
  }
}

// ============================================================
//   INTRO
// ============================================================
function initIntro() {
    const intro = document.getElementById('intro');

    const enter = () => {
        intro.classList.add('hidden');

        startMusicAfterIntro();

        spawnRipple(window.innerWidth / 2, window.innerHeight / 2);

        intro.removeEventListener('click', enter);
        document.removeEventListener('keydown', enter);
    };

    intro.addEventListener('click', enter);
    document.addEventListener('keydown', enter);
}

// ============================================================
//   MUZYKA
// ============================================================
function startMusicAfterIntro() {
  const m = CONFIG.music;
  const audio = document.getElementById('audio');
  const btn = document.getElementById('music-toggle');

  if (!m.enabled || !m.src) {
    btn.style.display = 'none';
    return;
  }

  audio.src = m.src;
  audio.loop = m.loop;
  audio.volume = m.volume;
  audio.muted = false;

  const setIcon = (muted) => {
    btn.innerHTML = muted ? ICONS.muted : ICONS.volume;
    btn.classList.toggle('muted', muted);
  };

  audio.play().then(() => {
    setIcon(false);
  }).catch(() => {
    setIcon(true);
  });

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    audio.muted = !audio.muted;
    setIcon(audio.muted);
  });
}

// ============================================================
//   RIPPLE
// ============================================================
function initRipple() {
    document.addEventListener('click', (e) => {
        spawnRipple(e.clientX, e.clientY);
    });
}

function spawnRipple(x, y) {
    const size = 180;
    const r = document.createElement('div');
    r.className = 'ripple';
    r.style.left = x + 'px';
    r.style.top  = y + 'px';
    r.style.width  = size + 'px';
    r.style.height = size + 'px';
    document.body.appendChild(r);
    setTimeout(() => r.remove(), 700);
}

// ============================================================
//   TILT
// ============================================================
function initTilt() {
    if (window.matchMedia('(hover: none)').matches) return;

    const card = document.getElementById('card');
    const MAX_TILT = 12;

    document.addEventListener('mousemove', (e) => {
        if (document.getElementById('intro').classList.contains('hidden') === false) return;

        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)));
        const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)));

        const rotateY =  dx * MAX_TILT;
        const rotateX = -dy * MAX_TILT;
        const moveX   =  dx * 18;
        const moveY   =  dy * 18;

        card.style.transform =
            `translate(-50%, -50%)
       perspective(1000px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       translate(${moveX}px, ${moveY}px)`;
    });

    document.addEventListener('mouseleave', () => {
        card.style.transform =
            `translate(-50%, -50%) perspective(1000px) rotateX(0) rotateY(0)`;
    });
}

// ============================================================
//   DISCORD PRESENCE (Lanyard API)
// ============================================================
// ⚠️ WKLEJ TU SWOJE DISCORD USER ID (jako string!)
// Jak zdobyć: Discord → Ustawienia → Zaawansowane → Tryb dewelopera
// → prawy klik na swój nick → Kopiuj identyfikator użytkownika
// ⚠️ Musisz być na serwerze: discord.gg/lanyard
const DISCORD_USER_ID = "293020688682582016";
let discordInterval = null;

async function initDiscordPresence() {
  const el = document.getElementById('discord-activity');
  if (!el) return;

  if (!DISCORD_USER_ID || DISCORD_USER_ID === "293020688682582016") {
    el.style.display = 'none';
    return;
  }

  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${293020688682582016}`);
    const json = await res.json();

    if (!json.success || !json.data) {
      el.innerHTML = '';
      return;
    }

    const d = json.data;
    const status = d.discord_status;

    let html = '';

    if (d.listening_to_spotify && d.spotify) {
      const s = d.spotify;
      html = `
        <div class="dc-card dc-spotify">
          <img class="dc-cover" src="${s.album_art_url}" alt="cover" />
          <div class="dc-info">
            <div class="dc-label">${ICONS.spotify} Słucha Spotify</div>
            <div class="dc-title">${escapeHtml(s.song)}</div>
            <div class="dc-sub">${escapeHtml(s.artist)}</div>
          </div>
        </div>`;
    } else if (d.activities && d.activities.length > 0) {
      const act = d.activities.find(a => a.type !== 4) || d.activities[0];
      const img = act.assets?.large_image;
      const imgUrl = img
        ? (img.startsWith('mp:')
            ? `https://media.discordapp.net/${img.replace('mp:', '')}`
            : `https://cdn.discordapp.com/app-assets/${act.application_id}/${img}.png`)
        : '';

      html = `
        <div class="dc-card">
          ${imgUrl ? `<img class="dc-cover" src="${imgUrl}" alt="game" />` : ''}
          <div class="dc-info">
            <div class="dc-label">${ICONS.discord} Gra w</div>
            <div class="dc-title">${escapeHtml(act.name)}</div>
            ${act.details ? `<div class="dc-sub">${escapeHtml(act.details)}</div>` : ''}
            ${act.state ? `<div class="dc-sub">${escapeHtml(act.state)}</div>` : ''}
          </div>
        </div>`;
    } else {
      const statusLabel = {
        online: 'Online',
        idle: 'Zaraz wracam',
        dnd: 'Nie przeszkadzać',
        offline: 'Offline'
      }[status] || 'Offline';

      html = `
        <div class="dc-card dc-idle">
          <div class="dc-info">
            <div class="dc-label">${ICONS.discord} Discord</div>
            <div class="dc-title">${statusLabel}</div>
          </div>
        </div>`;
    }

    el.innerHTML = html;
    el.style.display = 'block';
  } catch (e) {
    console.warn('Discord presence error:', e.message);
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
