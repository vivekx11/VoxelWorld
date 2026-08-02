/* ═══════════════════════════════════════
   MiniCraft – Advanced script.js
═══════════════════════════════════════ */

/* ── Mobile Blocker Check ── */

// script.js 
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 992;
if (isMobileDevice) {
  document.body.classList.add('mobile-detected');
}

/* ── Loader ── */
const LOADING_TEXTS = [
  'Loading World',
  'Building Terrain',
  'Generating Chunks',
  'Spawning Sheep',
  'Preparing Spawn Area',
  'Locating Minecarts',
  'Configuring Redstone'
];

window.addEventListener('DOMContentLoaded', () => {
  const loaderText = document.querySelector('.loader-text');
  if (loaderText) {
    const randomText = LOADING_TEXTS[Math.floor(Math.random() * LOADING_TEXTS.length)];
    loaderText.innerHTML = `${randomText}<span class="dots"></span>`;
  }
});

window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    setTimeout(() => document.getElementById('loader').remove(), 700);
  }, 2000);
});

/* ── Custom Cursor ── */
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left  = mx + 'px';
  dot.style.top   = my + 'px';
});

(function animCursor() {
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a, button, .block, .bp, .bb, .tab-btn').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.transform = 'translate(-50%,-50%) scale(1.6)';
    ring.style.borderColor = 'rgba(245,197,24,0.7)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.borderColor = 'rgba(105,224,106,0.5)';
  });
});

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── Hero Canvas – falling blocks background ── */
const canvas = document.getElementById('heroCanvas');
const ctx    = canvas.getContext('2d');
const BLOCK_TYPES = ['grass', 'dirt', 'stone', 'wood', 'gold', 'diamond', 'redstone', 'brick'];
let blocks = [];

function resizeCanvas() {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function drawTexturedBlock(ctx, size, blockType) {
  const pSize = size / 4; // 4x4 pixel grid for falling blocks
  let colors = [];
  
  if (blockType === 'grass') {
    colors = [
      ['#55aa22', '#77cc44', '#55aa22', '#77cc44'],
      ['#55aa22', '#55aa22', '#77cc44', '#55aa22'],
      ['#8b5e3c', '#5c3e26', '#8b5e3c', '#5c3e26'],
      ['#5c3e26', '#8b5e3c', '#5c3e26', '#8b5e3c']
    ];
  } else if (blockType === 'dirt') {
    colors = [
      ['#8b5e3c', '#5c3e26', '#8b5e3c', '#8b5e3c'],
      ['#5c3e26', '#8b5e3c', '#5c3e26', '#8b5e3c'],
      ['#8b5e3c', '#8b5e3c', '#5c3e26', '#5c3e26'],
      ['#5c3e26', '#8b5e3c', '#8b5e3c', '#5c3e26']
    ];
  } else if (blockType === 'stone') {
    colors = [
      ['#7a7a7a', '#8a8a8a', '#7a7a7a', '#6a6a6a'],
      ['#8a8a8a', '#7a7a7a', '#6a6a6a', '#7a7a7a'],
      ['#7a7a7a', '#6a6a6a', '#8a8a8a', '#7a7a7a'],
      ['#6a6a6a', '#7a7a7a', '#7a7a7a', '#8a8a8a']
    ];
  } else if (blockType === 'wood') {
    colors = [
      ['#966c42', '#b28351', '#966c42', '#b28351'],
      ['#b28351', '#66482c', '#b28351', '#66482c'],
      ['#966c42', '#b28351', '#966c42', '#b28351'],
      ['#66482c', '#966c42', '#66482c', '#966c42']
    ];
  } else if (blockType === 'gold') {
    colors = [
      ['#ffdd33', '#ffa500', '#ffdd33', '#ffa500'],
      ['#ffa500', '#ffdd33', '#ffa500', '#ffa500'],
      ['#ffdd33', '#ffa500', '#ffdd33', '#ffa500'],
      ['#ffa500', '#ffa500', '#ffdd33', '#ffa500']
    ];
  } else if (blockType === 'diamond') {
    colors = [
      ['#7a7a7a', '#55ffff', '#7a7a7a', '#6a6a6a'],
      ['#8a8a8a', '#7a7a7a', '#55ffff', '#7a7a7a'],
      ['#7a7a7a', '#55ffff', '#8a8a8a', '#7a7a7a'],
      ['#55ffff', '#7a7a7a', '#7a7a7a', '#8a8a8a']
    ];
  } else if (blockType === 'redstone') {
    colors = [
      ['#7a7a7a', '#ff5555', '#7a7a7a', '#6a6a6a'],
      ['#8a8a8a', '#7a7a7a', '#ff5555', '#7a7a7a'],
      ['#7a7a7a', '#ff5555', '#8a8a8a', '#7a7a7a'],
      ['#ff5555', '#7a7a7a', '#7a7a7a', '#8a8a8a']
    ];
  } else {
    colors = [
      ['#a04030', '#a04030', '#602010', '#a04030'],
      ['#602010', '#a04030', '#a04030', '#602010'],
      ['#a04030', '#602010', '#a04030', '#a04030'],
      ['#a04030', '#a04030', '#602010', '#602010']
    ];
  }
// for div 
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      ctx.fillStyle = colors[r][c];
      ctx.fillRect(-size/2 + c*pSize, -size/2 + r*pSize, pSize, pSize);
    }
  }

  ctx.strokeStyle = 'rgba(0,0,0,0.5)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(-size/2, -size/2, size, size);
}

function spawnBlock() {
  blocks.push({
    x:     Math.random() * canvas.width,
    y:     -40,
    size:  Math.random() * 24 + 16,
    speed: Math.random() * 0.8 + 0.4,
    rot:   Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.03,
    type:  BLOCK_TYPES[Math.floor(Math.random() * BLOCK_TYPES.length)],
    alpha: Math.random() * 0.45 + 0.15
  });
}

for (let i = 0; i < 40; i++) {
  blocks.push({
    x: Math.random() * 1920, 
    y: Math.random() * 900,
    size: Math.random() * 24 + 16,
    speed: Math.random() * 0.8 + 0.4,
    rot: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.03,
    type: BLOCK_TYPES[Math.floor(Math.random() * BLOCK_TYPES.length)],
    alpha: Math.random() * 0.45 + 0.15
  });
}

function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (Math.random() < 0.05) spawnBlock();

  blocks = blocks.filter(b => b.y < canvas.height + 40);
  blocks.forEach(b => {
    b.y   += b.speed;
    b.rot += b.rotSpeed;
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(b.rot);
    ctx.globalAlpha = b.alpha;
    drawTexturedBlock(ctx, b.size, b.type);
    ctx.restore();
  });
  requestAnimationFrame(drawCanvas);
}
drawCanvas();

/* ── Hero Particles ── */
const particleContainer = document.getElementById('heroParticles');
function createParticle() {
  const p = document.createElement('div');
  const size = Math.random() * 4 + 2;
  p.style.cssText = `
    position:absolute;
    width:${size}px; height:${size}px;
    background:${Math.random() > 0.5 ? 'rgba(105,224,106,' : 'rgba(245,197,24,'}${Math.random()*0.5+0.1})';
    left:${Math.random()*100}%;
    top:${Math.random()*100}%;
    pointer-events:none;
    animation: particleFloat ${Math.random()*6+4}s ease-in-out ${Math.random()*4}s infinite alternate;
  `;
  particleContainer.appendChild(p);
}
for (let i = 0; i < 30; i++) createParticle();

const pStyle = document.createElement('style');
pStyle.textContent = `
  @keyframes particleFloat {
    from { transform: translateY(0) translateX(0); opacity: 0.2; }
    to   { transform: translateY(-30px) translateX(${Math.random()*20-10}px); opacity: 0.7; }
  }
`;
document.head.appendChild(pStyle);

/* ── Counter Animation ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  let current = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 40);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObserver.observe(el));

/* ── Scroll Reveal ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .feat-card').forEach(el => revealObserver.observe(el));

/* ── FPS Bar animation ── */
const fpsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const fill = e.target.querySelector('.fps-fill');
      if (fill) fill.style.width = fill.dataset.width + '%';
      fpsObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.fps-bar').forEach(el => fpsObserver.observe(el));

/* ── Tabs ── */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

/* ── Download button ── */
const dlBtn = document.getElementById('dlBtn');
const dlProgress = document.getElementById('dlProgress');

if (dlBtn) {
  dlBtn.addEventListener('click', () => {
    dlProgress.classList.add('active');
    const bar  = dlProgress.querySelector('.dl-progress-bar');
    const text = dlProgress.querySelector('.dl-progress-text');
    bar.style.width = '0%';
    text.textContent = 'Preparing download…';

    setTimeout(() => { bar.style.width = '40%'; text.textContent = 'Starting download…'; }, 200);
    setTimeout(() => { bar.style.width = '75%'; text.textContent = 'Downloading VoxelWorld.zip…'; }, 800);
    setTimeout(() => {
      bar.style.width = '100%';
      text.textContent = '✅ Download started!';
    }, 1800);
    setTimeout(() => dlProgress.classList.remove('active'), 4000);
  });
}

/* ── Download BG animated blocks ── */
const dlBg = document.getElementById('dlBgAnim');
if (dlBg) {
  for (let i = 0; i < 20; i++) {
    const b = document.createElement('div');
    const size = Math.random() * 30 + 10;
    b.style.cssText = `
      position:absolute;
      width:${size}px; height:${size}px;
      background:${BLOCK_COLORS[Math.floor(Math.random()*BLOCK_COLORS.length)]};
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      opacity:0.04;
      border:2px solid rgba(0,0,0,0.3);
      animation: dlBlockFloat ${Math.random()*10+6}s ease-in-out ${Math.random()*5}s infinite alternate;
      pointer-events:none;
    `;
    dlBg.appendChild(b);
  }
  const dlStyle = document.createElement('style');
  dlStyle.textContent = `
    @keyframes dlBlockFloat {
      from { transform: translateY(0) rotate(0deg); }
      to   { transform: translateY(-20px) rotate(15deg); }
    }
  `;
  document.head.appendChild(dlStyle);
}

/* ── Block palette hover tooltip ── */
const bpNames = ['Grass','Dirt','Stone','Wood','Sand','Leaves','Brick'];
document.querySelectorAll('.bp').forEach((bp, i) => {
  bp.addEventListener('mouseenter', () => {
    const tip = document.createElement('div');
    tip.className = 'bp-tip';
    tip.textContent = bp.title;
    tip.style.cssText = `
      position:fixed; background:rgba(0,0,0,0.9);
      border:1px solid rgba(255,255,255,0.1);
      color:#fff; font-family:'Orbitron',sans-serif;
      font-size:0.6rem; padding:4px 10px;
      pointer-events:none; z-index:9000; letter-spacing:1px;
      transform:translateX(-50%);
    `;
    document.body.appendChild(tip);
    const rect = bp.getBoundingClientRect();
    tip.style.left = (rect.left + rect.width/2) + 'px';
    tip.style.top  = (rect.top - 32) + 'px';
    bp._tip = tip;
  });
  bp.addEventListener('mouseleave', () => { if (bp._tip) bp._tip.remove(); });
});

/* ── Hamburger menu ── */
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  const links = document.querySelector('.nav-links');
  links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
  links.style.flexDirection = 'column';
  links.style.position = 'absolute';
  links.style.top = '72px';
  links.style.right = '24px';
  links.style.background = '#8b8b8b';
  links.style.padding = '16px 24px';
  links.style.border = '4px solid #000000';
  links.style.boxShadow = 'inset 3px 3px 0 #dbdbdb, inset -3px -3px 0 #555555';
  links.style.gap = '16px';
});

/* ── Smooth nav close on link click ── */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const links = document.querySelector('.nav-links');
    if (window.innerWidth < 768) links.style.display = 'none';
  });
});

/* ── Web Audio Retro Click Sound ── */
function playClickSound() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    // Short sharp wooden click/pop frequency ramp
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 0.08);
    
    // Quick volume envelope
    gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
  } catch (e) {
    // Ignore context blocked errors before user gesture
  }
}

// Bind click sound to all interactive elements
document.querySelectorAll('a, button, .btn-primary, .btn-secondary, .nav-cta, .tab-btn, .bp, .bb, .wk, .key').forEach(el => {
  el.addEventListener('click', playClickSound);
});
