// Defensive startup
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year')?.textContent = new Date().getFullYear();

  // Scroll hint
  document.getElementById('scrollHint')?.addEventListener('click', () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Intersection observer for alternating slide-in sections
  (function handlePanels(){
    const panels = Array.from(document.querySelectorAll('.panel.alternating'));
    panels.forEach((p, i) => {
      // alternate sides: even index -> slide-left, odd -> slide-right
      p.classList.add(i % 2 === 0 ? 'slide-left' : 'slide-right');
    });
    if (!('IntersectionObserver' in window)) {
      panels.forEach(p => p.classList.add('visible'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.12 });
    panels.forEach(p => io.observe(p));
  })();

  // Left neural background (subtle): points + connecting lines
  (function leftNeural(){
    const canvas = document.getElementById('neuralLeft');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = 100, H = 100, DPR = window.devicePixelRatio || 1;
    function resize() {
      const hero = document.querySelector('.hero-left');
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      canvas.style.left = rect.left + 'px';
      canvas.style.top = rect.top + 'px';
      canvas.width = Math.floor(rect.width * DPR);
      canvas.height = Math.floor(rect.height * DPR);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      W = rect.width; H = rect.height;
    }
    let nodes = [];
    function createNodes() {
      nodes = [];
      const count = Math.max(8, Math.floor((W * H) / 16000));
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: 0.9 + Math.random() * 1.8
        });
      }
    }

    let mouse = { x: -9999, y: -9999 };
    window.addEventListener('mousemove', (e) => {
      const rect = document.querySelector('.hero-left')?.getBoundingClientRect();
      if (!rect) return;
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    window.addEventListener('mouseleave', () => mouse = { x: -9999, y: -9999 });

    function step() {
      ctx.clearRect(0, 0, W, H);
      // soft background
      ctx.fillStyle = 'rgba(0,0,0,0)';
      ctx.fillRect(0, 0, W, H);

      // update nodes
      for (let n of nodes) {
        if (mouse.x > -900) {
          n.vx += (mouse.x - n.x) * 0.00001;
          n.vy += (mouse.y - n.y) * 0.00001;
        }
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      }

      // connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < Math.max(80, Math.min(W, H) / 5)) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(69,179,255,${Math.max(0, 0.10 - d * 0.0009)})`;
            ctx.lineWidth = 0.9;
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      // draw nodes
      for (let n of nodes) {
        const rg = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 18);
        rg.addColorStop(0, 'rgba(69,179,255,0.06)');
        rg.addColorStop(1, 'rgba(69,179,255,0)');
        ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(n.x, n.y, 16, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.fillStyle = 'rgba(69,179,255,0.9)'; ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      }
      requestAnimationFrame(step);
    }

    function init() {
      resize();
      createNodes();
      step();
    }
    init();
    let tResize;
    window.addEventListener('resize', () => {
      clearTimeout(tResize); tResize = setTimeout(() => { resize(); createNodes(); }, 120);
    });
  })();

  // Overlay neural on video (right)
  (function overlayNeural(){
    const canvas = document.getElementById('neuralOverlay');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let DPR = window.devicePixelRatio || 1;
    let W = 300, H = 150;
    function updateBounds(){
      const media = document.querySelector('.hero-media');
      if(!media) return;
      const rect = media.getBoundingClientRect();
      canvas.style.left = rect.left + 'px';
      canvas.style.top = rect.top + 'px';
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      W = Math.max(200, rect.width); H = Math.max(150, rect.height);
      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      ctx.setTransform(DPR,0,0,DPR,0,0);
    }
    let nodes = [];
    function create(){ nodes=[]; const count = Math.max(16, Math.floor((W*H)/16000)); for(let i=0;i<count;i++){ nodes.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*0.35,vy:(Math.random()-.5)*0.35,r:0.9+Math.random()*2}) } }
    function anim(){
      ctx.clearRect(0,0,W,H);
      for(let n of nodes){ n.x+=n.vx; n.y+=n.vy; if(n.x<0||n.x>W) n.vx*=-1; if(n.y<0||n.y>H) n.vy*=-1; }
      for(let i=0;i<nodes.length;i++){ for(let j=i+1;j<nodes.length;j++){ const a=nodes[i],b=nodes[j]; const dx=a.x-b.x, dy=a.y-b.y, d=Math.hypot(dx,dy); if(d < Math.max(80,Math.min(W,H)/6)){ ctx.beginPath(); ctx.strokeStyle=`rgba(69,179,255,${Math.max(0,0.12 - d*0.0009)})`; ctx.lineWidth = 0.9; ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); } } }
      for(let n of nodes){ const rg = ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,20); rg.addColorStop(0,'rgba(69,179,255,0.08)'); rg.addColorStop(1,'rgba(69,179,255,0)'); ctx.fillStyle=rg; ctx.beginPath(); ctx.arc(n.x,n.y,18,0,Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.fillStyle='rgba(69,179,255,0.9)'; ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fill(); }
      requestAnimationFrame(anim);
    }
    updateBounds(); create(); anim();
    let tr; window.addEventListener('resize',()=>{ clearTimeout(tr); tr=setTimeout(()=>{updateBounds(); create();},120); });
  })();

  // H4: Neural Sphere hologram in contact
  (function holoSphere(){
    const canvas = document.getElementById('holoSphere');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W=320, H=260, DPR = window.devicePixelRatio || 1;
    function resize(){
      const wrap = document.querySelector('.holo-wrap');
      if(!wrap) return;
      const rect = wrap.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = Math.floor(W * DPR); canvas.height = Math.floor(H * DPR);
      canvas.style.width = rect.width + 'px'; canvas.style.height = rect.height + 'px';
      ctx.setTransform(DPR,0,0,DPR,0,0);
    }
    // build sphere points
    const points = [];
    const R = 70;
    const lat = 14, lon = 28;
    for(let i=0;i<lat;i++){
      const theta = (i/(lat-1)) * Math.PI;
      for(let j=0;j<lon;j++){
        const phi = (j/ lon) * Math.PI * 2;
        const x = Math.sin(theta) * Math.cos(phi);
        const y = Math.cos(theta);
        const z = Math.sin(theta) * Math.sin(phi);
        points.push({x,y,z});
      }
    }
    let rot = 0;
    function draw(){
      resize();
      ctx.clearRect(0,0,W,H);
      // background vignette
      const g = ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,Math.max(W,H));
      g.addColorStop(0, 'rgba(10,15,22,0.0)');
      g.addColorStop(1, 'rgba(2,6,10,0.5)');
      ctx.fillStyle = g; ctx.fillRect(0,0,W,H);

      // center
      const cx = W/2, cy = H/2 + 6;

      // compute rotated positions
      const cosr = Math.cos(rot), sinr = Math.sin(rot);
      const projected = [];
      for(const p of points){
        // rotate around Y axis
        const x = p.x * cosr + p.z * sinr;
        const z = -p.x * sinr + p.z * cosr;
        const y = p.y;
        // perspective
        const dist = 2.8;
        const scale = (dist) / (dist + z);
        const sx = cx + x * R * scale;
        const sy = cy + y * R * scale;
        const sz = z;
        projected.push({sx, sy, sz, scale});
      }

      // sort by depth
      projected.sort((a,b)=> a.z - b.z);

      // draw connecting lines for some neighbors
      ctx.lineWidth = 0.9;
      for(let i=0;i<projected.length;i++){
        const a = projected[i];
        // draw small glow
        const rad = 2.0 * a.scale;
        const rg = ctx.createRadialGradient(a.sx,a.sy,0,a.sx,a.sy,14);
        rg.addColorStop(0, `rgba(69,179,255,${0.9*a.scale})`);
        rg.addColorStop(1, `rgba(69,179,255,0)`);
        ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(a.sx,a.sy,8*a.scale,0,Math.PI*2); ctx.fill();
        // optionally draw point
        ctx.beginPath(); ctx.fillStyle = `rgba(120,180,255,${0.9*a.scale})`; ctx.arc(a.sx,a.sy,rad,0,Math.PI*2); ctx.fill();
      }

      // draw faint gridlines by connecting neighbors in longitude/latitude
      ctx.strokeStyle = 'rgba(100,160,255,0.06)';
      for(let i=0;i<lat;i++){
        for(let j=0;j<lon;j++){
          const idx = i*lon + j;
          const cur = projected[idx];
          const right = projected[i*lon + ((j+1)%lon)];
          const down = projected[((i+1)%lat)*lon + j] || null;
          if(right){
            ctx.beginPath(); ctx.moveTo(cur.sx,cur.sy); ctx.lineTo(right.sx,right.sy); ctx.stroke();
          }
          if(down){
            ctx.beginPath(); ctx.moveTo(cur.sx,cur.sy); ctx.lineTo(down.sx,down.sy); ctx.stroke();
          }
        }
      }

      // subtle outer glow / base ring
      const ring = ctx.createRadialGradient(cx,cy,R*0.2,cx,cy,R*1.6);
      ring.addColorStop(0,'rgba(70,160,255,0.06)');
      ring.addColorStop(1,'rgba(70,160,255,0)');
      ctx.fillStyle = ring; ctx.beginPath(); ctx.arc(cx,cy,R*1.3,0,Math.PI*2); ctx.fill();

      rot += 0.008;
      requestAnimationFrame(draw);
    }

    draw();
    let rt;
    window.addEventListener('resize', ()=>{ clearTimeout(rt); rt = setTimeout(()=>resize(), 120); });
  })();

  // Respect reduced motion: pause video + stop heavy anime
  (function reduceMotion(){
    const prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const v = document.getElementById('bgVideo');
    if (prefersReduce && v) try{ v.pause(); }catch(e){}
    if (prefersReduce) {
      // reduce animations by revealing panels immediately
      document.querySelectorAll('.panel').forEach(p=>p.classList.add('visible'));
    }
  })();
});
