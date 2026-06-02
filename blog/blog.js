/* ─────────────────────────────────────────────────────────────────────
   Field Notes · diagram engine
   Builds and animates the figures for "Why a Chaotic Loss Landscape
   Still Works". Diagrams are drawn from a shared deterministic value-noise
   field so the self-similarity figure is an honest magnification.
   ───────────────────────────────────────────────────────────────────── */
(function () {
  "use strict";
  const NS = "http://www.w3.org/2000/svg";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── tiny DOM helpers ─────────────────────────────────────────────── */
  function E(tag, attrs, parent) {
    const n = document.createElementNS(NS, tag);
    if (attrs) for (const k in attrs) {
      if (k === "text") n.textContent = attrs[k];
      else n.setAttribute(k, attrs[k]);
    }
    if (parent) parent.appendChild(n);
    return n;
  }
  const f1 = (x) => (Math.round(x * 10) / 10);

  /* ── deterministic value noise + fBm (fractal-like roughness) ─────── */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function makeNoise(seed) {
    const rnd = mulberry32(seed);
    const N = 512;
    const v = Array.from({ length: N }, () => rnd() * 2 - 1);
    return function (x) {
      const i = Math.floor(x);
      const fr = x - i;
      const a = v[((i % N) + N) % N];
      const b = v[(((i + 1) % N) + N) % N];
      const t = fr * fr * (3 - 2 * fr);
      return a + (b - a) * t;
    };
  }
  function fbm(noise, x, oct) {
    oct = oct || 4;
    let amp = 1, freq = 1, sum = 0, norm = 0;
    for (let o = 0; o < oct; o++) { sum += amp * noise(x * freq); norm += amp; amp *= 0.5; freq *= 2.04; }
    return sum / norm;
  }
  const NOISE = makeNoise(20260601);

  const dip = (u, c, w, amp) => amp * Math.exp(-((u - c) * (u - c)) / (2 * w * w));

  /* ── path builders ────────────────────────────────────────────────── */
  function linePath(pts) {
    if (!pts.length) return "";
    let d = "M" + f1(pts[0][0]) + " " + f1(pts[0][1]);
    for (let i = 1; i < pts.length; i++) d += " L" + f1(pts[i][0]) + " " + f1(pts[i][1]);
    return d;
  }
  function smoothPath(pts) {
    if (pts.length < 3) return linePath(pts);
    let d = "M" + f1(pts[0][0]) + " " + f1(pts[0][1]);
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += " C" + f1(c1x) + " " + f1(c1y) + " " + f1(c2x) + " " + f1(c2y) + " " + f1(p2[0]) + " " + f1(p2[1]);
    }
    return d;
  }
  // sample a u→y function across pixel range
  function sample(x0, x1, n, fy) {
    const pts = [];
    for (let i = 0; i <= n; i++) { const u = i / n; pts.push([x0 + u * (x1 - x0), fy(u)]); }
    return pts;
  }
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  /* ── figure registry + shared loop ────────────────────────────────── */
  const figures = [];
  function reg(id, builder) {
    const svg = document.getElementById(id);
    if (!svg) return;
    const update = builder(svg);
    figures.push({ svg, update, vis: false });
  }

  /* ════════════════════════════════════════════════════════════════════
     FIGURE 1 · convex bowl vs complex profile, with descent balls
     ════════════════════════════════════════════════════════════════════ */
  function buildFig1(svg) {
    const yTop = 70, yBot = 300;
    // divider
    E("line", { x1: 455, y1: 60, x2: 455, y2: 320, class: "d-grid", "stroke-dasharray": "3 6" }, svg);

    // ---- LEFT: convex bowl ----
    const lx0 = 80, lx1 = 420;
    E("line", { x1: lx0, y1: yBot, x2: lx1, y2: yBot, class: "d-axis" }, svg);
    E("line", { x1: lx0, y1: yTop, x2: lx0, y2: yBot, class: "d-axis" }, svg);
    const bowlY = (u) => 250 - 150 * Math.pow((u - 0.5) * 2, 2);
    E("path", { d: smoothPath(sample(lx0, lx1, 60, bowlY)), class: "d-curve" }, svg);
    E("text", { x: (lx0 + lx1) / 2, y: 332, "text-anchor": "middle", class: "d-label-dim", text: "convex · one minimum" }, svg);
    E("circle", { cx: (lx0 + lx1) / 2, cy: 250, r: 3, fill: "var(--ink-dim)" }, svg);
    const lglow = E("circle", { r: 11, class: "d-ball-glow" }, svg);
    const lball = E("circle", { r: 6, class: "d-ball" }, svg);

    // ---- RIGHT: complex multi-feature profile ----
    const rx0 = 500, rx1 = 905;
    E("line", { x1: rx0, y1: yBot, x2: rx1, y2: yBot, class: "d-axis" }, svg);
    E("line", { x1: rx0, y1: yTop, x2: rx0, y2: yBot, class: "d-axis" }, svg);
    const cY = (u) => {
      let y = 150 + 34 * Math.sin(u * 3.0 + 0.5);
      y += dip(u, 0.70, 0.15, 120);   // wide flat basin
      y += dip(u, 0.32, 0.040, 150);  // sharp narrow basin
      y -= dip(u, 0.50, 0.045, 64);   // ridge (up)
      const rough = (1 - u) * 0.95 + 0.12;
      y += fbm(NOISE, u * 24 + 9, 5) * 13 * rough;
      return clamp(y, 96, 292);
    };
    const cX = (u) => rx0 + u * (rx1 - rx0);
    E("path", { d: smoothPath(sample(rx0, rx1, 200, cY)), class: "d-curve" }, svg);
    // annotations
    const mark = (u, label, dy) => {
      const x = cX(u), y = cY(u);
      E("line", { x1: x, y1: y - 8, x2: x, y2: y + dy + 6, class: "d-tick" }, svg);
      E("text", { x: x, y: y + dy, "text-anchor": "middle", class: "d-label-dim", text: label }, svg);
    };
    mark(0.32, "sharp min", -26);
    mark(0.50, "ridge", -20);
    mark(0.70, "flat min", -118);
    // descent ball on the complex curve
    const rglow = E("circle", { r: 12, class: "d-ball-glow" }, svg);
    const rball = E("circle", { r: 6, class: "d-ball" }, svg);
    const trail = E("path", { class: "d-curve-2", "stroke-width": 1.4, opacity: 0.5, "stroke-dasharray": "2 4", fill: "none" }, svg);

    return function (t) {
      // left: gentle settle to centre
      const TL = 5.5, pl = (t % TL) / TL;
      let ul;
      if (pl < 0.8) { const p = pl / 0.8; const e = 1 - Math.pow(1 - p, 3); ul = 0.12 + (0.5 - 0.12) * e + Math.sin(p * Math.PI * 4) * 0.05 * (1 - p); }
      else ul = 0.5;
      const lX = lx0 + ul * (lx1 - lx0), lY = bowlY(ul) - 6;
      lball.setAttribute("cx", f1(lX)); lball.setAttribute("cy", f1(lY));
      lglow.setAttribute("cx", f1(lX)); lglow.setAttribute("cy", f1(lY));

      // right: descend and settle into the flat basin
      const TR = 7.0, pr = (t % TR) / TR;
      let ur;
      if (pr < 0.86) { const p = pr / 0.86; const e = 1 - Math.pow(1 - p, 3); ur = 0.07 + (0.70 - 0.07) * e + Math.sin(p * Math.PI * 5) * 0.045 * (1 - p); }
      else ur = 0.70;
      ur = clamp(ur, 0.05, 0.78);
      const rX = cX(ur), rY = cY(ur) - 6;
      rball.setAttribute("cx", f1(rX)); rball.setAttribute("cy", f1(rY));
      rglow.setAttribute("cx", f1(rX)); rglow.setAttribute("cy", f1(rY));
      // short trailing path behind the ball
      const tp = [];
      for (let k = 6; k >= 0; k--) { const uu = clamp(ur - k * 0.012, 0.05, 0.99); tp.push([cX(uu), cY(uu) - 6]); }
      trail.setAttribute("d", linePath(tp));
    };
  }

  /* ════════════════════════════════════════════════════════════════════
     FIGURE 2 · multifractal — rough left, smooth right
     ════════════════════════════════════════════════════════════════════ */
  function buildFig2(svg) {
    const x0 = 70, x1 = 890, yBot = 322, yTop = 80;
    E("line", { x1: x0, y1: yBot, x2: x1, y2: yBot, class: "d-axis" }, svg);
    E("line", { x1: x0, y1: yTop, x2: x0, y2: yBot, class: "d-axis" }, svg);
    const Y = (u) => {
      let y = 180 + 46 * Math.sin(u * 2.3 + 0.5);
      y += dip(u, 0.78, 0.16, 150);
      y += dip(u, 0.12, 0.024, 120) + dip(u, 0.24, 0.030, 110) + dip(u, 0.37, 0.022, 130);
      const rough = clamp((0.48 - u) / 0.48, 0, 1);
      y += fbm(NOISE, u * 42 + 3, 5) * 24 * rough;
      return clamp(y, 100, 304);
    };
    const X = (u) => x0 + u * (x1 - x0);
    E("path", { d: smoothPath(sample(x0, x1, 260, Y)), class: "d-curve" }, svg);
    // dashed divider + region labels
    const xm = X(0.5);
    E("line", { x1: xm, y1: 64, x2: xm, y2: yBot, class: "d-grid", "stroke-dasharray": "3 6" }, svg);
    E("text", { x: X(0.22), y: 56, "text-anchor": "middle", class: "d-label-dim", text: "rough · small H" }, svg);
    E("text", { x: X(0.22), y: 72, "text-anchor": "middle", class: "d-label", "font-size": 11, fill: "var(--accent-d)", text: "sharp minima" }, svg);
    E("text", { x: X(0.76), y: 56, "text-anchor": "middle", class: "d-label-dim", text: "smooth · large H" }, svg);
    E("text", { x: X(0.76), y: 72, "text-anchor": "middle", class: "d-label", "font-size": 11, fill: "var(--accent)", text: "flat basin" }, svg);

    // three "exploration" dots in the rough zone + one settled in the basin
    const ex = [0.10, 0.22, 0.36].map((c) => ({ c, g: E("circle", { r: 9, class: "d-ball-glow" }, svg), b: E("circle", { r: 4.5, class: "d-rough", "stroke-width": 1.6, fill: "none" }, svg) }));
    const setGlow = E("circle", { r: 12, class: "d-ball-glow" }, svg);
    const settled = E("circle", { r: 6, class: "d-ball" }, svg);

    return function (t) {
      ex.forEach((d, i) => {
        const u = clamp(d.c + fbm(NOISE, t * 1.6 + i * 13, 3) * 0.06, 0.05, 0.45);
        const x = X(u), y = Y(u) - 5;
        d.b.setAttribute("cx", f1(x)); d.b.setAttribute("cy", f1(y));
        d.g.setAttribute("cx", f1(x)); d.g.setAttribute("cy", f1(y));
      });
      const us = 0.78 + Math.sin(t * 1.1) * 0.015;
      const xs = X(us), ys = Y(us) - 6;
      settled.setAttribute("cx", f1(xs)); settled.setAttribute("cy", f1(ys));
      setGlow.setAttribute("cx", f1(xs)); setGlow.setAttribute("cy", f1(ys));
    };
  }

  /* ════════════════════════════════════════════════════════════════════
     FIGURE 3 · Hölder exponent — jagged (small H) vs smooth (large H)
     ════════════════════════════════════════════════════════════════════ */
  function buildFig3(svg) {
    const yA = 80, yB = 250;
    function segment(x0, x1, jagged, seedShift, label, tag) {
      E("line", { x1: x0, y1: yA, x2: x0, y2: yB + 18, class: "d-tick" }, svg);
      E("line", { x1: x1, y1: yA, x2: x1, y2: yB + 18, class: "d-tick" }, svg);
      E("line", { x1: x0 - 6, y1: yA, x2: x1 + 6, y2: yA, class: "d-tick", "stroke-dasharray": "2 4" }, svg);
      E("line", { x1: x0 - 6, y1: yB, x2: x1 + 6, y2: yB, class: "d-tick", "stroke-dasharray": "2 4" }, svg);
      const Y = (u) => {
        const base = yA + u * (yB - yA);
        if (jagged) return base + fbm(NOISE, u * 26 + seedShift, 6) * 46 * Math.sin(u * Math.PI);
        return base + Math.sin(u * 5 + seedShift) * 5;
      };
      const X = (u) => x0 + u * (x1 - x0);
      const pts = sample(x0, x1, jagged ? 120 : 60, Y);
      E("path", { d: jagged ? linePath(pts) : smoothPath(pts), class: jagged ? "d-rough" : "d-curve-2" }, svg);
      E("text", { x: (x0 + x1) / 2, y: yB + 44, "text-anchor": "middle", class: "d-label-dim", text: label }, svg);
      E("text", { x: (x0 + x1) / 2, y: yB + 62, "text-anchor": "middle", class: "d-label", fill: jagged ? "var(--accent-d)" : "var(--accent)", text: tag }, svg);
      const glow = E("circle", { r: 10, class: "d-ball-glow" }, svg);
      const ball = E("circle", { r: 5, class: "d-ball" }, svg);
      return { Y, X, glow, ball };
    }
    // shared "same vertical drop" bracket label
    E("text", { x: 470, y: 70, "text-anchor": "middle", class: "d-label-dim", text: "same Δ loss · same Δθ" }, svg);
    const L = segment(120, 430, true, 1.3, "jagged — a tiny step can swing the loss", "small H");
    const R = segment(510, 850, false, 0.4, "gentle — the loss changes slowly", "large H");
    return function (t) {
      const T = 4.0, p = (t % T) / T;
      [L, R].forEach((s, i) => {
        const u = i === 0 ? p : p; // both descend together
        const x = s.X(u), y = s.Y(u);
        s.ball.setAttribute("cx", f1(x)); s.ball.setAttribute("cy", f1(y));
        s.glow.setAttribute("cx", f1(x)); s.glow.setAttribute("cy", f1(y));
      });
    };
  }

  /* ════════════════════════════════════════════════════════════════════
     FIGURE 4 · self-similarity — magnify, magnify again
     ════════════════════════════════════════════════════════════════════ */
  function buildFig4(svg) {
    const yTop = 95, yBot = 300, h = yBot - yTop, mid = (yTop + yBot) / 2;
    // panels: A(full)  B(zoom)  C(zoom²) over noise domains
    const panels = [
      { x0: 60, x1: 350, d0: 0.0, d1: 8.0, oct: 4, amp: 70, sel: [0.46, 0.60] },
      { x0: 400, x1: 640, d0: 0.46 * 8, d1: 0.60 * 8, oct: 6, amp: 56, sel: [0.40, 0.56] },
      { x0: 680, x1: 900, d0: (0.46 * 8) + (0.40 * (0.60 * 8 - 0.46 * 8)), d1: (0.46 * 8) + (0.56 * (0.60 * 8 - 0.46 * 8)), oct: 8, amp: 44, sel: null }
    ];
    const sels = [];
    panels.forEach((p, idx) => {
      E("rect", { x: p.x0, y: yTop, width: p.x1 - p.x0, height: h, fill: "none", class: "d-grid", rx: 3 }, svg);
      const Y = (u) => mid + fbm(NOISE, p.d0 + u * (p.d1 - p.d0), p.oct) * p.amp;
      const X = (u) => p.x0 + u * (p.x1 - p.x0);
      E("path", { d: linePath(sample(p.x0, p.x1, 200, Y)), class: idx === 0 ? "d-curve" : (idx === 1 ? "d-rough" : "d-curve-2") }, svg);
      E("text", { x: (p.x0 + p.x1) / 2, y: yBot + 26, "text-anchor": "middle", class: "d-label-dim", text: idx === 0 ? "full basin" : (idx === 1 ? "×8 zoom" : "×64 zoom") }, svg);
      if (p.sel) {
        const sx0 = X(p.sel[0]), sx1 = X(p.sel[1]);
        const r = E("rect", { x: sx0, y: yTop + 6, width: sx1 - sx0, height: h - 12, fill: "none", stroke: "var(--accent)", "stroke-width": 1.4, rx: 2 }, svg);
        sels.push({ rect: r });
        // magnify connectors to next panel
        const nx = panels[idx + 1].x0;
        E("line", { x1: sx1, y1: yTop + 6, x2: nx, y2: yTop, class: "d-tick", "stroke-dasharray": "3 4" }, svg);
        E("line", { x1: sx1, y1: yBot - 6, x2: nx, y2: yBot, class: "d-tick", "stroke-dasharray": "3 4" }, svg);
      }
    });
    return function (t) {
      const a = 0.5 + 0.5 * Math.sin(t * 2.2);
      sels.forEach((s) => { s.rect.setAttribute("stroke-opacity", f1(0.45 + a * 0.55)); });
    };
  }

  /* ════════════════════════════════════════════════════════════════════
     FIGURE 5 · architecture changes the terrain (four small multiples)
     ════════════════════════════════════════════════════════════════════ */
  function buildFig5(svg) {
    const yTop = 56, yBot = 222, mid = (yTop + yBot) / 2;
    const titles = ["Deep · no skips", "+ Skip connections", "ReLU kinks", "Wide network"];
    const xs = [40, 270, 500, 730], w = 175;
    const balls = [];
    xs.forEach((x0, i) => {
      const x1 = x0 + w;
      E("line", { x1: x0, y1: yBot, x2: x1, y2: yBot, class: "d-axis", "stroke-opacity": 0.4 }, svg);
      let Y, cls, minU;
      if (i === 0) { Y = (u) => mid + fbm(NOISE, u * 30 + i * 50, 6) * 70 + dip(u, 0.5, 0.2, 30); cls = "d-rough"; minU = 0.62; }
      else if (i === 1) { Y = (u) => yTop + 12 + 150 * Math.pow((u - 0.5) * 2, 2) + Math.sin(u * 7) * 3; cls = "d-curve-2"; minU = 0.5; }
      else if (i === 2) { // piecewise V with kinks
        const knots = [[0, 70], [0.18, 120], [0.34, 96], [0.5, 168], [0.66, 110], [0.82, 140], [1, 78]];
        Y = (u) => { for (let k = 0; k < knots.length - 1; k++) { if (u <= knots[k + 1][0]) { const a = knots[k], b = knots[k + 1]; const tt = (u - a[0]) / (b[0] - a[0]); return a[1] + (b[1] - a[1]) * tt; } } return knots[knots.length - 1][1]; }; cls = "d-curve"; minU = 0.5;
      }
      else { Y = (u) => yTop + 30 + 110 * Math.pow((u - 0.5) * 2, 2) * 0.7 + Math.sin(u * 4) * 2; cls = "d-curve-2"; minU = 0.5; }
      const X = (u) => x0 + u * w;
      const pts = sample(x0, x1, i === 2 ? 7 : 120, Y);
      E("path", { d: (i === 2 ? linePath(pts) : (i === 0 ? linePath(pts) : smoothPath(pts))), class: cls }, svg);
      E("text", { x: x0 + w / 2, y: yBot + 36, "text-anchor": "middle", class: "d-label-dim", text: titles[i] }, svg);
      const g = E("circle", { r: 9, class: "d-ball-glow" }, svg);
      const b = E("circle", { r: 5, class: "d-ball" }, svg);
      balls.push({ Y, X, g, b, minU, off: i * 0.6 });
    });
    return function (t) {
      balls.forEach((s) => {
        const T = 4.5, p = ((t + s.off) % T) / T;
        let u;
        if (p < 0.8) { const q = p / 0.8; const e = 1 - Math.pow(1 - q, 3); u = 0.08 + (s.minU - 0.08) * e; }
        else u = s.minU;
        const x = s.X(u), y = s.Y(u) - 5;
        s.b.setAttribute("cx", f1(x)); s.b.setAttribute("cy", f1(y));
        s.g.setAttribute("cx", f1(x)); s.g.setAttribute("cy", f1(y));
      });
    };
  }

  /* ════════════════════════════════════════════════════════════════════
     FIGURE 6 · fractal boundary in hyperparameter space
     ════════════════════════════════════════════════════════════════════ */
  function buildFig6(svg) {
    const x0 = 90, x1 = 850, y0 = 60, y1 = 320;
    // boundary as a jagged coastline x = b(y)
    const bX = (yy) => {
      const u = (yy - y0) / (y1 - y0);
      return clamp(360 + fbm(NOISE, u * 7 + 2, 7) * 230 + (u - 0.5) * 90, x0 + 30, x1 - 30);
    };
    // trainable fill (left of boundary)
    const pts = [];
    for (let yy = y0; yy <= y1; yy += 4) pts.push([bX(yy), yy]);
    let fillD = "M" + x0 + " " + y0;
    pts.forEach((p) => { fillD += " L" + f1(p[0]) + " " + f1(p[1]); });
    fillD += " L" + x0 + " " + y1 + " Z";
    E("path", { d: fillD, fill: "var(--accent)", opacity: 0.10 }, svg);
    // diverge hatch fill (right)
    let fillR = "M" + x1 + " " + y0;
    pts.forEach((p) => { fillR += " L" + f1(p[0]) + " " + f1(p[1]); });
    fillR += " L" + x1 + " " + y1 + " Z";
    E("path", { d: fillR, class: "d-fill-soft" }, svg);
    // boundary line
    E("path", { d: linePath(pts), fill: "none", stroke: "var(--accent)", "stroke-width": 1.6 }, svg);
    // axes
    E("line", { x1: x0, y1: y1, x2: x1, y2: y1, class: "d-axis" }, svg);
    E("line", { x1: x0, y1: y0, x2: x0, y2: y1, class: "d-axis" }, svg);
    E("text", { x: (x0 + x1) / 2, y: y1 + 30, "text-anchor": "middle", class: "d-label-dim", text: "learning rate →" }, svg);
    const yl = E("text", { x: x0 - 22, y: (y0 + y1) / 2, "text-anchor": "middle", class: "d-label-dim", text: "init scale →" }, svg);
    yl.setAttribute("transform", `rotate(-90 ${x0 - 22} ${(y0 + y1) / 2})`);
    E("text", { x: x0 + 90, y: y0 + 26, "text-anchor": "middle", class: "d-label", fill: "var(--accent)", text: "TRAINS" }, svg);
    E("text", { x: x1 - 80, y: y0 + 26, "text-anchor": "middle", class: "d-label-dim", text: "DIVERGES" }, svg);
    // probe dots near the boundary
    const probes = [];
    const pr = mulberry32(77);
    for (let i = 0; i < 9; i++) {
      const yy = y0 + 18 + pr() * (y1 - y0 - 36);
      const side = pr() > 0.5 ? 1 : -1;
      const xx = clamp(bX(yy) + side * (10 + pr() * 36), x0 + 8, x1 - 8);
      const trains = xx < bX(yy);
      const g = E("circle", { cx: xx, cy: yy, r: 9, fill: trains ? "var(--accent)" : "var(--ink-dim)", opacity: 0 }, svg);
      const d = E("circle", { cx: xx, cy: yy, r: 3.4, fill: trains ? "var(--accent)" : "var(--ink-dim)" }, svg);
      probes.push({ g, d, off: i * 0.35, trains });
    }
    return function (t) {
      probes.forEach((p) => {
        const a = 0.5 + 0.5 * Math.sin(t * 1.8 + p.off * 6);
        p.g.setAttribute("opacity", f1(a * (p.trains ? 0.28 : 0.16)));
        p.g.setAttribute("r", f1(7 + a * 4));
      });
    };
  }

  /* ════════════════════════════════════════════════════════════════════
     FIGURE 7 · sharp vs flat minima + shifted test curve
     ════════════════════════════════════════════════════════════════════ */
  function buildFig7(svg) {
    const x0 = 80, x1 = 880, yBot = 320, yTop = 70;
    E("line", { x1: x0, y1: yBot, x2: x1, y2: yBot, class: "d-axis" }, svg);
    E("line", { x1: x0, y1: yTop, x2: x0, y2: yBot, class: "d-axis" }, svg);
    const trainY = (u) => {
      let y = 150 + 16 * Math.sin(u * 2.6);
      y += dip(u, 0.30, 0.030, 150); // sharp
      y += dip(u, 0.72, 0.150, 130); // flat
      return clamp(y, 96, 300);
    };
    const X = (u) => x0 + u * (x1 - x0);
    E("path", { d: smoothPath(sample(x0, x1, 200, trainY)), class: "d-curve" }, svg);
    const testPath = E("path", { class: "d-curve-2", "stroke-dasharray": "6 5", "stroke-width": 1.6 }, svg);
    // markers at the two minima
    const sharp = { u: 0.30, line: E("line", { class: "d-tick", stroke: "var(--accent-d)", "stroke-width": 1.4 }, svg), lab: E("text", { class: "d-label", fill: "var(--accent-d)", "text-anchor": "middle", text: "large test gap" }, svg) };
    const flat = { u: 0.72, line: E("line", { class: "d-tick", stroke: "var(--accent)", "stroke-width": 1.4 }, svg), lab: E("text", { class: "d-label", fill: "var(--accent)", "text-anchor": "middle", text: "robust" }, svg) };
    E("circle", { cx: X(0.30), cy: trainY(0.30), r: 4, fill: "var(--accent-d)" }, svg);
    E("circle", { cx: X(0.72), cy: trainY(0.72), r: 4, fill: "var(--accent)" }, svg);
    // legend
    E("line", { x1: 620, y1: 96, x2: 648, y2: 96, class: "d-curve", "stroke-width": 1.6 }, svg);
    E("text", { x: 654, y: 100, class: "d-label", fill: "var(--ink-mute)", text: "train" }, svg);
    E("line", { x1: 706, y1: 96, x2: 734, y2: 96, class: "d-curve-2", "stroke-dasharray": "5 4", "stroke-width": 1.6 }, svg);
    E("text", { x: 740, y: 100, class: "d-label", fill: "var(--accent)", text: "test" }, svg);

    return function (t) {
      const delta = 0.028 + 0.018 * (0.5 + 0.5 * Math.sin(t * 1.2)); // shift in u-space
      const testY = (u) => trainY(clamp(u - delta, 0, 1)) - 8;
      testPath.setAttribute("d", smoothPath(sample(x0, x1, 200, testY)));
      [sharp, flat].forEach((m) => {
        const x = X(m.u), yt = trainY(m.u), ye = testY(m.u);
        m.line.setAttribute("x1", f1(x)); m.line.setAttribute("x2", f1(x));
        m.line.setAttribute("y1", f1(yt)); m.line.setAttribute("y2", f1(ye));
        m.lab.setAttribute("x", f1(x)); m.lab.setAttribute("y", f1(Math.min(yt, ye) - 10));
      });
    };
  }

  /* ════════════════════════════════════════════════════════════════════
     FIGURE 8 · hub — one geometry, many phenomena
     ════════════════════════════════════════════════════════════════════ */
  function buildFig8(svg) {
    const cx = 470, cy = 210;
    const nodes = [
      { x: 158, y: 92, t: "Edge of stability" },
      { x: 158, y: 210, t: "Mode connectivity" },
      { x: 158, y: 328, t: "Flat minima" },
      { x: 782, y: 92, t: "Anomalous diffusion" },
      { x: 782, y: 210, t: "Implicit regularisation" },
      { x: 782, y: 328, t: "Hyperparameter sensitivity" }
    ];
    const spokes = [];
    nodes.forEach((n) => {
      const anchorX = n.x < cx ? n.x + 100 : n.x - 100;
      E("line", { x1: cx, y1: cy, x2: anchorX, y2: n.y, class: "d-grid", "stroke-width": 1 }, svg);
      const p = E("circle", { r: 3.2, fill: "var(--accent)" }, svg);
      spokes.push({ ax: anchorX, ay: n.y, p, off: Math.random() });
    });
    // outer nodes
    nodes.forEach((n) => {
      E("rect", { x: n.x - 100, y: n.y - 22, width: 200, height: 44, rx: 6, fill: "var(--bg-card)", stroke: "var(--line)", "stroke-width": 1 }, svg);
      E("text", { x: n.x, y: n.y + 4, "text-anchor": "middle", class: "d-label", fill: "var(--ink-mute)", "font-size": 12.5, text: n.t }, svg);
    });
    // centre node
    E("ellipse", { cx: cx, cy: cy, rx: 96, ry: 62, fill: "var(--bg-soft)", stroke: "var(--accent)", "stroke-width": 1.4 }, svg);
    // tiny rugged glyph inside
    const gp = [];
    for (let i = 0; i <= 40; i++) { const u = i / 40; gp.push([cx - 70 + u * 140, cy - 26 + fbm(NOISE, u * 9 + 30, 5) * 14]); }
    E("path", { d: linePath(gp), fill: "none", stroke: "var(--accent)", "stroke-width": 1, opacity: 0.6 }, svg);
    E("text", { x: cx, y: cy + 8, "text-anchor": "middle", class: "d-annot", "font-size": 16, fill: "var(--ink)", text: "Multifractal" }, svg);
    E("text", { x: cx, y: cy + 28, "text-anchor": "middle", class: "d-label-dim", text: "loss landscape" }, svg);

    return function (t) {
      spokes.forEach((s) => {
        const p = ((t * 0.5 + s.off) % 1);
        const x = cx + (s.ax - cx) * p, y = cy + (s.ay - cy) * p;
        s.p.setAttribute("cx", f1(x)); s.p.setAttribute("cy", f1(y));
        s.p.setAttribute("opacity", f1(Math.sin(p * Math.PI)));
      });
    };
  }

  /* ── register all figures ─────────────────────────────────────────── */
  reg("fig1", buildFig1);
  reg("fig2", buildFig2);
  reg("fig3", buildFig3);
  reg("fig4", buildFig4);
  reg("fig5", buildFig5);
  reg("fig6", buildFig6);
  reg("fig7", buildFig7);
  reg("fig8", buildFig8);

  /* ── rect-based visibility (robust across embedded iframes where
        IntersectionObserver callbacks can fail to fire) ──────────────── */
  const reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  const inView = (el, margin) => {
    const r = el.getBoundingClientRect();
    const h = window.innerHeight || document.documentElement.clientHeight;
    return r.top < h + (margin || 0) && r.bottom > -(margin || 0);
  };
  const revealPass = () => {
    for (let i = reveals.length - 1; i >= 0; i--) {
      if (inView(reveals[i], 60)) {
        const el = reveals[i];
        el.classList.add("in");
        el.style.setProperty("opacity", "1", "important");
        el.style.setProperty("transform", "none", "important");
        reveals.splice(i, 1);
      }
    }
  };
  const visPass = () => { for (const f of figures) f.vis = inView(f.svg, 120); };

  revealPass();
  visPass();
  window.addEventListener("scroll", () => { revealPass(); visPass(); }, { passive: true });
  window.addEventListener("resize", () => { revealPass(); visPass(); }, { passive: true });

  if (figures.length) {
    if (reduce) {
      figures.forEach((f) => f.update && f.update(2.6));
    } else {
      const start = performance.now();
      const loop = (now) => {
        const t = (now - start) / 1000;
        for (const f of figures) if (f.vis && f.update) f.update(t);
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }
  }
  // safety net: if anything is still hidden shortly after load, reveal it
  setTimeout(() => { document.querySelectorAll(".reveal:not(.in)").forEach((el) => { if (inView(el, 0)) { el.classList.add("in"); el.style.setProperty("opacity", "1", "important"); el.style.setProperty("transform", "none", "important"); } }); }, 500);

  /* ── reading-progress bar ─────────────────────────────────────────── */
  const bar = document.getElementById("progress");
  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const p = max > 0 ? (h.scrollTop || document.body.scrollTop) / max : 0;
    if (bar) bar.style.width = (p * 100).toFixed(2) + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── citation markers flash their reference ───────────────────────── */
  document.querySelectorAll(".cref").forEach((a) => {
    a.addEventListener("click", () => {
      const id = a.getAttribute("href");
      const li = id && document.querySelector(id);
      if (li) { li.classList.remove("flash"); void li.offsetWidth; li.classList.add("flash"); }
    });
  });
})();
