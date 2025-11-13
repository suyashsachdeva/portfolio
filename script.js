// Safe initializers for DOM elements
document.addEventListener('DOMContentLoaded', () => {
  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Scroll down
  const scrollBtn = document.getElementById('scrollDown');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      const target = document.querySelector('.site');
      if (target) target.scrollIntoView({behavior: 'smooth'});
    });
  }

  // mail helper
  window.mailtoQuick = function() { window.location.href = 'mailto:suyashsachdeva2403@gmail.com'; };

  // reveal on scroll
  (function() {
    const reveals = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      reveals.forEach(r => r.classList.add('visible'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    reveals.forEach(r => io.observe(r));
  })();

  // typewriter (subtle)
  (function(){
    const el = document.getElementById('hero-title');
    if (!el) return;
    const phrases = ["Suyash Sachdeva", "Deep Learning Researcher", "Computer Vision • Robust ML"];
    let pi = 0, ci = 0, forward = true;
    function step() {
      const p = phrases[pi];
      // keep final accent word
      el.innerHTML = `<span>${p.slice(0, ci)}</span> <span class="accent">Sachdeva</span>`;
      if (forward) {
        ci++;
        if (ci > p.length) { forward = false; setTimeout(step, 800); return; }
      } else {
        ci--;
        if (ci < 0) { forward = true; pi = (pi + 1) % phrases.length; ci = 0; }
      }
      setTimeout(step, forward ? 60 : 30);
    }
    step();
  })();

  // neural canvas (lightweight & defensive)
  (function(){
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DPR = window.devicePixelRatio || 1;
    let W = window.innerWidth;
    let H = Math.max(420, window.innerHeight * 0.55);

    function resize() {
      W = window.innerWidth; H = Math.max(320, window.innerHeight * 0.45);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      ctx.setTransform(DPR,0,0,DPR,0,0);
    }
    resize();

    let nodes = [];
    function createNodes() {
      nodes = [];
      const N = Math.max(10, Math.floor(W / 110));
      for (let i=0;i<N;i++){
        nodes.push({
          x: Math.random()*W,
          y: Math.random()*H,
          vx: (Math.random()-0.5)*0.45,
          vy: (Math.random()-0.5)*0.45,
          r: 1 + Math.random()*2
        });
      }
    }
    createNodes();

    let mouse = {x: W/2, y: H/2};
    window.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    function frame(){
      ctx.clearRect(0,0,W,H);

      // soft overlay
      const lg = ctx.createLinearGradient(0,0,W,0);
      lg.addColorStop(0,'rgba(69,179,255,0.02)');
      lg.addColorStop(1,'rgba(109,91,255,0.02)');
      ctx.fillStyle = lg; ctx.fillRect(0,0,W,H);

      for (let n of nodes){
        // slight attraction to mouse
        const dx = mouse.x - n.x, dy = mouse.y - n.y;
        n.vx += dx * 0.00002; n.vy += dy * 0.00002;
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      }

      // connections
      for (let i=0;i<nodes.length;i++){
        for (let j=i+1;j<nodes.length;j++){
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < Math.max(80, W/12)){
            ctx.beginPath();
            ctx.strokeStyle = `rgba(109,91,255,${Math.max(0, 0.12 - d*0.0009)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
          }
        }
      }

      // nodes
      for (let n of nodes){
        // halo
        const rg = ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,20);
        rg.addColorStop(0,'rgba(69,179,255,0.08)');
        rg.addColorStop(1,'rgba(69,179,255,0)');
        ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(n.x,n.y,18,0,Math.PI*2); ctx.fill();

        // core
        ctx.beginPath(); ctx.fillStyle = 'rgba(69,179,255,0.9)'; ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fill();
      }

      requestAnimationFrame(frame);
    }
    frame();

    let rtimer;
    window.addEventListener('resize', ()=>{
      clearTimeout(rtimer);
      rtimer = setTimeout(()=>{ resize(); createNodes(); }, 120);
    });

    // respect reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      canvas.style.display = 'none';
    }
  })();

}); // DOMContentLoaded end
