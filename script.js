// Update year
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal animations
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add('visible'));
}, { threshold: 0.12 });
revealEls.forEach(r => io.observe(r));

// Email quick
function mailtoQuick() {
  window.location.href = 'mailto:suyashsachdeva2403@gmail.com';
}

// Typewriter effect
(function() {
  const target = document.getElementById('typeTarget');
  const phrases = ["Suyash Sachdeva", "Deep Learning Researcher", "Computer Vision • Robust ML"];
  let i = 0, idx = 0, forward = true;
  function step() {
    const p = phrases[i];
    target.innerHTML = p.slice(0, idx) + '<span class="cursor">|</span>';
    if (forward) { idx++; if (idx > p.length) { forward = false; setTimeout(step, 1000); return; } }
    else { idx--; if (idx < 0) { forward = true; i = (i + 1) % phrases.length; idx = 0; } }
    setTimeout(step, forward ? 60 : 30);
  }
  step();
})();

// Neural animation
(function() {
  const canvas = document.getElementById('neural');
  const ctx = canvas.getContext('2d');
  let W = window.innerWidth, H = Math.max(320, window.innerHeight * 0.45);
  const DPR = window.devicePixelRatio || 1;
  canvas.width = W * DPR; canvas.height = H * DPR; ctx.scale(DPR, DPR);

  const nodes = [];
  const N = Math.floor(W / 120);
  for (let i = 0; i < N; i++) {
    nodes.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3 });
  }
  const mouse = { x: W / 2, y: H / 2 };
  document.addEventListener('mousemove', e => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });

  function step() {
    ctx.clearRect(0, 0, W, H);
    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    }
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) {
          ctx.strokeStyle = `rgba(97,148,255,${0.15 - d * 0.001})`;
          ctx.lineWidth = 1; ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    for (const n of nodes) {
      ctx.beginPath(); ctx.fillStyle = "rgba(69,179,255,0.6)";
      ctx.arc(n.x, n.y, 2, 0, Math.PI * 2); ctx.fill();
    }
    requestAnimationFrame(step);
  }
  step();
})();
