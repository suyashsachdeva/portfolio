// script.js - neural header, typewriter, reveal & helpers

// YEAR
document.getElementById('year')?.textContent = new Date().getFullYear();

// SCROLL DOWN button
document.getElementById('scrollDown')?.addEventListener('click', () => {
  const target = document.querySelector('.site');
  if(target) target.scrollIntoView({behavior:'smooth'});
});

// MAILTO helper
function mailtoQuick(){ window.location.href = 'mailto:suyashsachdeva2403@gmail.com'; }

// REVEAL ON SCROLL
(function(){
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting) e.target.classList.add('visible');
    });
  }, {threshold:0.12});
  reveals.forEach(r => io.observe(r));
})();

// TYPEWRITER for hero title (subtle)
(function(){
  const el = document.getElementById('hero-title');
  if(!el) return;
  const phrases = ["Suyash Sachdeva", "Deep Learning Researcher", "Computer Vision • Robust ML"];
  let pi = 0, ci = 0, forward = true;
  function step(){
    const p = phrases[pi];
    el.innerHTML = `<span>${p.slice(0, ci)}</span> <span class="accent">Sachdeva</span>`;
    if(forward){ ci++; if(ci>p.length){ forward=false; setTimeout(step,900); return; } }
    else{ ci--; if(ci<0){ forward=true; pi=(pi+1)%phrases.length; ci=0; } }
    setTimeout(step, forward?60:30);
  }
  step();
})();

// NEURAL CANVAS
(function(){
  const canvas = document.getElementById('neural-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const DPR = window.devicePixelRatio || 1;

  function resizeCanvas(){
    const W = window.innerWidth;
    const H = Math.max(420, window.innerHeight * 0.55);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    ctx.setTransform(DPR,0,0,DPR,0,0);
    return {W,H};
  }

  let {W,H} = resizeCanvas();

  let nodes = [];
  function createNodes(){
    nodes = [];
    const N = Math.max(12, Math.floor(W/100));
    for(let i=0;i<N;i++){
      nodes.push({
        x: Math.random()*W,
        y: Math.random()*H,
        vx: (Math.random()-0.5)*0.45,
        vy: (Math.random()-0.5)*0.45,
        r: 1 + Math.random()*2.2,
        hue: 200 + Math.random()*70
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
  window.addEventListener('mouseleave', ()=> mouse = {x:W/2,y:H/2});

  function step(){
    ctx.clearRect(0,0,W,H);
    // subtle gradient overlay
    const lg = ctx.createLinearGradient(0,0,W,0);
    lg.addColorStop(0, 'rgba(69,179,255,0.02)');
    lg.addColorStop(1, 'rgba(109,91,255,0.02)');
    ctx.fillStyle = lg; ctx.fillRect(0,0,W,H);

    // update nodes
    for(let n of nodes){
      // weak attraction to mouse
      const dx = mouse.x - n.x, dy = mouse.y - n.y;
      n.vx += dx * 0.00002; n.vy += dy * 0.00002;
      n.x += n.vx; n.y += n.vy;
      if(n.x<0||n.x>W) n.vx *= -1;
      if(n.y<0||n.y>H) n.vy *= -1;
    }

    // draw connections
    for(let i=0;i<nodes.length;i++){
      for(let j=i+1;j<nodes.length;j++){
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if(d < Math.max(80, W/12)){
          ctx.beginPath();
          ctx.strokeStyle = `rgba(109,91,255,${Math.max(0, 0.12 - d*0.0009)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }

    // draw nodes
    for(let n of nodes){
      // halo
      const rg = ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,24);
      rg.addColorStop(0, `rgba(69,179,255,0.08)`);
      rg.addColorStop(1, `rgba(69,179,255,0)`);
      ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(n.x,n.y,18,0,Math.PI*2); ctx.fill();

      // core
      ctx.beginPath(); ctx.fillStyle = `rgba(69,179,255,0.9)`; ctx.arc(n.x,n.y, n.r, 0, Math.PI*2); ctx.fill();
    }

    requestAnimationFrame(step);
  }
  step();

  // responsiveness
  let resizeTimer;
  window.addEventListener('resize', ()=>{
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(()=>{
      const dims = resizeCanvas();
      W = dims.W; H = dims.H;
      createNodes();
    }, 120);
  });

  // reduce motion respect
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    canvas.style.display='none';
  }
})();
