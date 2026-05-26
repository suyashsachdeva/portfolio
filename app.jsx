/* global React, ReactDOM, DATA */
const { useState, useEffect, useRef, useMemo } = React;

/* ── icons ───────────────────────────────────────────────────────────── */
const Icon = ({ name, size = 16 }) => {
  const props = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: 1.5,
    strokeLinecap: "round", strokeLinejoin: "round",
  };
  const paths = {
    arrow:   <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    download:<><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></>,
    mail:    <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    github:  <path d="M9 19c-4 1.5-4-2-6-2.5M15 22v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 5.77 5.07 5.07 0 0 0 18.91 2S17.73 1.65 15 3.48a13.38 13.38 0 0 0-7 0C5.27 1.65 4.09 2 4.09 2A5.07 5.07 0 0 0 4 5.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 19.13V22"/>,
    linkedin:<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>,
    scholar: <><path d="M2 8 12 3l10 5-10 5L2 8z"/><path d="M6 11v5c0 2 3 3 6 3s6-1 6-3v-5"/></>,
    phone:   <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>,
    location:<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
    eye:     <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></>,
    shield:  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    book:    <><path d="M4 19.5V5a2 2 0 0 1 2-2h13v18H6.5a2.5 2.5 0 0 1 0-5H19"/></>,
    external:<><path d="M7 17 17 7"/><path d="M7 7h10v10"/></>,
    globe:   <><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2c3 3 4.5 6.5 4.5 10S15 19 12 22c-3-3-4.5-6.5-4.5-10S9 5 12 2z"/></>,
  };
  return <svg {...props}>{paths[name]}</svg>;
};

/* ── helpers ─────────────────────────────────────────────────────────── */
const Ext = ({ size = 11 }) => (
  <span className="ext"><Icon name="external" size={size} /></span>
);
const Lnk = ({ href, children, className = "", showExt = true }) => href ? (
  <a className={"lnk " + className} href={href} target="_blank" rel="noreferrer">
    {children}{showExt && <Ext />}
  </a>
) : <span className={className}>{children}</span>;

/* ── animation hook: ticks every frame, returns seconds elapsed ────── */
const useFrame = () => {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    let alive = true;
    const loop = () => {
      if (!alive) return;
      setT((performance.now() - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { alive = false; cancelAnimationFrame(raf); };
  }, []);
  return t;
};

const GLYPH_W = 200, GLYPH_H = 100;
const monoStack = '"Geist Mono", ui-monospace, monospace';

/* ── DATA · 4 clusters of twinkling points over a bright axis frame ── */
const GlyphData = () => {
  const clusters = useMemo(() => ([
    { cx: 42,  cy: 30, n: 7, jitter: 9, filled: true  },
    { cx: 105, cy: 22, n: 7, jitter: 8, filled: false },
    { cx: 68,  cy: 66, n: 7, jitter: 9, filled: true  },
    { cx: 152, cy: 58, n: 7, jitter: 9, filled: false },
  ]), []);
  const pts = useMemo(() => clusters.flatMap((c, ci) =>
    Array.from({ length: c.n }, () => ({
      cx: c.cx + (Math.random() - 0.5) * c.jitter * 2,
      cy: c.cy + (Math.random() - 0.5) * c.jitter * 2,
      r:  1.6 + Math.random() * 0.7,
      period: 1.8 + Math.random() * 2.4,
      phase:  Math.random() * Math.PI * 2,
      base:   0.4 + Math.random() * 0.4,
      filled: c.filled,
    }))
  ), [clusters]);
  const t = useFrame();
  return (
    <svg viewBox={`0 0 ${GLYPH_W} ${GLYPH_H}`}>
      {/* bright axis lines */}
      <line x1="12" y1="88" x2={GLYPH_W - 6} y2="88" stroke="currentColor" strokeOpacity="0.85" strokeWidth="1.1"/>
      <line x1="12" y1="88" x2="12"  y2="6"  stroke="currentColor" strokeOpacity="0.85" strokeWidth="1.1"/>
      {/* arrow heads on axes */}
      <path d={`M${GLYPH_W - 6} 88 l-4 -2.5 v5 z`} fill="currentColor" opacity="0.85"/>
      <path d="M12 6 l-2.5 4 h5 z" fill="currentColor" opacity="0.85"/>
      {/* tick marks */}
      {[35, 60, 85, 110, 135, 160, 185].map(x => (
        <line key={"tx"+x} x1={x} y1="88" x2={x} y2="91" stroke="currentColor" strokeOpacity="0.55" strokeWidth="0.7"/>
      ))}
      {[20, 40, 60].map(y => (
        <line key={"ty"+y} x1="12" y1={y} x2="9" y2={y} stroke="currentColor" strokeOpacity="0.55" strokeWidth="0.7"/>
      ))}
      {/* cluster halos */}
      {clusters.map((c, i) => (
        <circle key={"h"+i} cx={c.cx} cy={c.cy} r={c.jitter * 1.6}
                fill="none" stroke="currentColor" strokeOpacity="0.12"
                strokeWidth="0.7" strokeDasharray="2 2"/>
      ))}
      {/* points */}
      {pts.map((p, i) => {
        const a = p.base + 0.4 * Math.sin(t * 2 * Math.PI / p.period + p.phase);
        const op = Math.max(0.2, Math.min(0.95, a));
        return p.filled
          ? <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="currentColor" opacity={op}/>
          : <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="none" stroke="currentColor" strokeWidth="1.1" opacity={op}/>;
      })}
      <text x={GLYPH_W - 6} y={GLYPH_H - 4} textAnchor="end" fontFamily={monoStack}
            fontSize="6.5" fill="currentColor" opacity="0.55" letterSpacing="0.18em">X → ℝⁿ</text>
    </svg>
  );
};

/* ── PREPROCESSING · bars normalising toward a mean line ─────────────── */
const GlyphPreproc = () => {
  const N = 10;
  const raws = useMemo(() => Array.from({ length: N }, () =>
    6 + Math.random() * 52
  ), []);
  const t = useFrame();
  // oscillate between raw (0) and normalised (1)
  const phase = (Math.sin(t * 0.65) + 1) / 2;
  const meanY = 50 - phase * 18 + (1 - phase) * 0;
  return (
    <svg viewBox={`0 0 ${GLYPH_W} ${GLYPH_H}`}>
      <line x1="14" y1="84" x2={GLYPH_W - 10} y2="84" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.8"/>
      {raws.map((h, i) => {
        const tgt = 28 + 8 * Math.sin(i * 0.7 + t * 0.5);
        const cur = h * (1 - phase) + tgt * phase;
        const x = 22 + i * 17;
        const y = 84 - cur;
        return (
          <g key={i}>
            <rect x={x} y={y} width="11" height={cur} rx="0.5"
                  fill="currentColor" opacity={0.3 + phase * 0.15}/>
            <rect x={x} y={y} width="11" height="2" fill="currentColor" opacity="0.9"/>
          </g>
        );
      })}
      {/* mean line slides into view as normalisation happens */}
      <line x1="14" y1={84 - (28 + phase * 6)} x2={GLYPH_W - 10} y2={84 - (28 + phase * 6)}
            stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 3"
            opacity={0.25 + phase * 0.5}/>
      <text x={GLYPH_W - 6} y={GLYPH_H - 4} textAnchor="end" fontFamily={monoStack}
            fontSize="6.5" fill="currentColor" opacity="0.55" letterSpacing="0.18em">x̂ = (x − µ) / σ</text>
    </svg>
  );
};

/* ── ARCHITECTURE · raw scatter passes through a layer; classes separate ── */
const GlyphArch = () => {
  const t = useFrame();
  // 4 input clusters (intermixed in input space) get transformed by a layer
  // to 4 clusters in embedding space, this time clearly separated.
  const centers = useMemo(() => ([
    { ix: 32, iy: 30, ox: 152, oy: 18, cls: 0 },
    { ix: 50, iy: 60, ox: 152, oy: 38, cls: 1 },
    { ix: 30, iy: 64, ox: 152, oy: 58, cls: 2 },
    { ix: 52, iy: 28, ox: 152, oy: 78, cls: 3 },
  ]), []);
  const pts = useMemo(() => {
    const list = [];
    centers.forEach(c => {
      for (let k = 0; k < 5; k++) {
        list.push({
          ix: c.ix + (Math.random() - 0.5) * 14,
          iy: c.iy + (Math.random() - 0.5) * 12,
          ox: c.ox + (Math.random() - 0.5) * 8,
          oy: c.oy + (Math.random() - 0.5) * 6,
          cls: c.cls,
          off: Math.random()
        });
      }
    });
    return list;
  }, [centers]);
  // animation: 6s cycle. 0-0.30 sit in input; 0.30-0.65 traverse layer; 0.65-1 sit in output
  return (
    <svg viewBox={`0 0 ${GLYPH_W} ${GLYPH_H}`}>
      {/* input axis frame */}
      <line x1="14" y1="86" x2="76" y2="86" stroke="currentColor" strokeOpacity="0.7" strokeWidth="0.9"/>
      <line x1="14" y1="86" x2="14" y2="14" stroke="currentColor" strokeOpacity="0.7" strokeWidth="0.9"/>
      {/* output axis frame */}
      <line x1="134" y1="86" x2={GLYPH_W - 8} y2="86" stroke="currentColor" strokeOpacity="0.7" strokeWidth="0.9"/>
      <line x1="134" y1="86" x2="134" y2="14" stroke="currentColor" strokeOpacity="0.7" strokeWidth="0.9"/>
      {/* layer barrier — vertical "weight" stripes that breathe */}
      <g>
        {[88, 94, 100, 106, 112, 118, 124, 130].map((x, i) => {
          const op = 0.18 + 0.18 * (0.5 + 0.5 * Math.sin(t * 1.8 + i * 0.55));
          return <line key={"w"+i} x1={x} y1="14" x2={x} y2="86"
                       stroke="currentColor" strokeWidth="0.7" opacity={op}/>;
        })}
        <text x="109" y="10" textAnchor="middle" fontFamily={monoStack}
              fontSize="5.4" fill="currentColor" opacity="0.7" letterSpacing="0.14em">
          W · x + b
        </text>
      </g>
      {/* particles flow */}
      {pts.map((p, i) => {
        const period = 6.5;
        const local = ((t + p.off * period) % period) / period;
        let x, y;
        if (local < 0.30) { x = p.ix; y = p.iy; }
        else if (local < 0.65) {
          const u = (local - 0.30) / 0.35;
          const eu = u * u * (3 - 2 * u);
          x = p.ix + (p.ox - p.ix) * eu;
          y = p.iy + (p.oy - p.iy) * eu;
        } else { x = p.ox; y = p.oy; }
        const stroked = p.cls % 2 === 1;
        return stroked
          ? <circle key={i} cx={x} cy={y} r="1.8" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.85"/>
          : <circle key={i} cx={x} cy={y} r="1.8" fill="currentColor" opacity="0.85"/>;
      })}
      <text x="45" y={GLYPH_H - 4} textAnchor="middle" fontFamily={monoStack}
            fontSize="5.6" fill="currentColor" opacity="0.55" letterSpacing="0.18em">INPUT</text>
      <text x={GLYPH_W - 28} y={GLYPH_H - 4} textAnchor="middle" fontFamily={monoStack}
            fontSize="5.6" fill="currentColor" opacity="0.55" letterSpacing="0.18em">EMBED</text>
    </svg>
  );
};

/* ── LOSS · 3-2-3 network: ∂ℒ travels back, each layer's values flip on arrival ── */
const GlyphLoss = () => {
  const t = useFrame();
  const layers = useMemo(() => ([
    { x: 32,            n: 3 },
    { x: GLYPH_W / 2,   n: 2 },
    { x: GLYPH_W - 32,  n: 3 },
  ]), []);
  const nodeY = (li, i) => {
    const n = layers[li].n;
    const gap = 22;
    const startY = 50 - ((n - 1) * gap) / 2;
    return startY + i * gap;
  };
  const period = 5.2;
  const cycle = Math.floor(t / period);
  const s = (t % period) / period;
  // gen new value
  const rand = () => {
    const v = (Math.random() * 1.8 - 0.9);
    return (v >= 0 ? "+" : "−") + Math.abs(v).toFixed(2);
  };
  const newSet = () => layers.map(L => Array.from({ length: L.n }, rand));
  const valsRef = useRef(null);
  if (!valsRef.current) {
    valsRef.current = { cycle, prev: newSet(), curr: newSet() };
  } else if (valsRef.current.cycle !== cycle) {
    valsRef.current = { cycle, prev: valsRef.current.curr, curr: newSet() };
  }
  const { prev, curr } = valsRef.current;
  // backprop window: s in [0.20, 0.75], head sweeps from right to left
  const bpActive = s >= 0.20 && s <= 0.78;
  const bpU = Math.max(0, Math.min(1, (s - 0.20) / 0.55));
  const bpX = layers[2].x + (layers[0].x - layers[2].x) * bpU;
  // layer-cross thresholds (s value at which the head reaches each layer)
  // s=0.20 starts at layers[2], s=0.75 ends at layers[0]
  // thresholds: layer 2 at 0.22, layer 1 at 0.45, layer 0 at 0.70
  const thresh = [0.70, 0.45, 0.22];
  const layerCrossed = (li) => s >= thresh[li];
  const freshness = (li) => Math.max(0, Math.min(1, 1 - (s - thresh[li]) * 6));

  return (
    <svg viewBox={`0 0 ${GLYPH_W} ${GLYPH_H}`}>
      {/* edges between layers */}
      {layers.slice(0, -1).map((L, li) => {
        const R = layers[li + 1];
        const lines = [];
        for (let i = 0; i < L.n; i++) {
          for (let j = 0; j < R.n; j++) {
            const x1 = L.x, y1 = nodeY(li, i);
            const x2 = R.x, y2 = nodeY(li + 1, j);
            // edges incoming to a freshly-updated layer flash briefly
            const fL = freshness(li + 1);
            const op = 0.22 + 0.45 * fL;
            lines.push(
              <line key={`e-${li}-${i}-${j}`}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="currentColor" strokeWidth={0.7 + fL * 0.5} opacity={op}/>
            );
          }
        }
        return <g key={"L"+li}>{lines}</g>;
      })}
      {/* backprop head — small vertical wavefront */}
      {bpActive && (
        <g>
          <line x1={bpX} y1="12" x2={bpX} y2={GLYPH_H - 16}
                stroke="currentColor" strokeWidth="6" opacity="0.18"/>
          <line x1={bpX} y1="12" x2={bpX} y2={GLYPH_H - 16}
                stroke="currentColor" strokeWidth="1.4" opacity="0.95"/>
          <text x={bpX} y="9" textAnchor="middle" fontFamily={monoStack}
                fontSize="6" fill="currentColor" opacity="0.95">∂ℒ</text>
          <path d={`M${bpX - 4} ${GLYPH_H - 16} L${bpX} ${GLYPH_H - 12} L${bpX + 4} ${GLYPH_H - 16} Z`}
                fill="currentColor" opacity="0.9"/>
        </g>
      )}
      {/* nodes */}
      {layers.map((L, li) =>
        Array.from({ length: L.n }).map((_, i) => {
          const x = L.x, y = nodeY(li, i);
          const show = layerCrossed(li);
          const v = show ? curr[li][i] : prev[li][i];
          const fr = show ? freshness(li) : 0;
          return (
            <g key={`n-${li}-${i}`}>
              {fr > 0 && (
                <circle cx={x} cy={y} r={10 + fr * 3}
                        fill="none" stroke="currentColor" strokeWidth="0.7"
                        opacity={fr * 0.5}/>
              )}
              <circle cx={x} cy={y} r={9}
                      fill="var(--bg-card, #16182a)" stroke="currentColor"
                      strokeWidth={1 + fr * 0.5} opacity="0.95"/>
              <text x={x} y={y + 2.4} textAnchor="middle"
                    fontFamily={monoStack} fontSize="5.6"
                    fill="currentColor" opacity="0.95">{v}</text>
            </g>
          );
        })
      )}
      <text x={GLYPH_W - 6} y={GLYPH_H - 4} textAnchor="end"
            fontFamily={monoStack} fontSize="6.5" fill="currentColor"
            opacity="0.55" letterSpacing="0.18em">θ ← θ − η ∂ℒ/∂θ</text>
    </svg>
  );
};

/* ── OPTIMIZER · 3D wireframe manifold, rotates; a path traces the surface */
const GlyphOpt = () => {
  const t = useFrame();
  const rows = 5, cols = 11;
  const cx = GLYPH_W / 2, cy = GLYPH_H / 2;
  const angle = Math.sin(t * 0.25) * 0.55;
  const ca = Math.cos(angle), sa = Math.sin(angle);
  // build grid of 3d points then project (rotate around Y, then iso-ish)
  const pts = [];
  for (let i = 0; i < rows; i++) {
    pts.push([]);
    for (let j = 0; j < cols; j++) {
      const gx = (j - (cols - 1) / 2) * 13;
      const gy = (i - (rows - 1) / 2) * 9.5;
      const gz = 7 * Math.sin(j * 0.55 + t * 0.5) * Math.cos(i * 0.55 + t * 0.3);
      const rx = gx * ca + gz * sa;
      const rz = -gx * sa + gz * ca;
      pts[i].push([cx + rx, cy + gy * 0.85 - rz * 0.45]);
    }
  }
  // a point moves over the surface following lissajous-style path
  const pj = ((Math.sin(t * 0.45) + 1) / 2) * (cols - 1);
  const pi = ((Math.cos(t * 0.35) + 1) / 2) * (rows - 1);
  const jLo = Math.floor(pj), jHi = Math.min(cols - 1, jLo + 1);
  const iLo = Math.floor(pi), iHi = Math.min(rows - 1, iLo + 1);
  const fj = pj - jLo, fi = pi - iLo;
  const l2 = (a, b, f) => [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
  const top = l2(pts[iLo][jLo], pts[iLo][jHi], fj);
  const bot = l2(pts[iHi][jLo], pts[iHi][jHi], fj);
  const dot = l2(top, bot, fi);
  return (
    <svg viewBox={`0 0 ${GLYPH_W} ${GLYPH_H}`}>
      {/* row lines */}
      {pts.map((row, i) => {
        const d = row.map((p, j) => (j === 0 ? "M" : "L") + p[0] + " " + p[1]).join(" ");
        return <path key={"r" + i} d={d} fill="none" stroke="currentColor"
                     strokeWidth="0.55" opacity={0.18 + i * 0.08}/>;
      })}
      {/* col lines */}
      {Array.from({ length: cols }).map((_, j) => {
        const d = pts.map((row, i) => (i === 0 ? "M" : "L") + row[j][0] + " " + row[j][1]).join(" ");
        return <path key={"c" + j} d={d} fill="none" stroke="currentColor"
                     strokeWidth="0.45" opacity={0.12 + j * 0.02}/>;
      })}
      <circle cx={dot[0]} cy={dot[1]} r="2.6" fill="currentColor"/>
      <circle cx={dot[0]} cy={dot[1]} r="5.5" fill="none" stroke="currentColor"
              strokeWidth="0.6" opacity="0.5"/>
      <text x={GLYPH_W - 6} y={GLYPH_H - 4} textAnchor="end" fontFamily={monoStack}
            fontSize="6.5" fill="currentColor" opacity="0.55" letterSpacing="0.18em">−∇ℒ on ℳ</text>
    </svg>
  );
};

/* ── TRAINING · loss curves drawing progressively over epochs ────────── */
const GlyphTrain = () => {
  const t = useFrame();
  const cycle = 6.0;
  const u = (t % cycle) / cycle;
  const epochs = Math.round(u * 100);
  // generate points up to current progress
  const points = (k, jitter) => {
    const N = 80;
    const out = [];
    for (let i = 0; i <= N; i++) {
      const ix = i / N;
      if (ix > u + 0.005) break;
      const x = 16 + ix * (GLYPH_W - 28);
      const baseY = 16 + 60 * (1 - Math.exp(-ix * k));
      const y = baseY + Math.sin(ix * 50 + t * 2) * jitter;
      out.push([x, y]);
    }
    return out;
  };
  const train = points(3.5, 0.6);
  const val   = points(2.9, 1.0);
  const toPath = (pts) => pts.map((p, i) => (i === 0 ? "M" : "L") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const trainHead = train.length ? train[train.length - 1] : null;
  const valHead   = val.length ? val[val.length - 1] : null;
  return (
    <svg viewBox={`0 0 ${GLYPH_W} ${GLYPH_H}`}>
      <line x1="14" y1="84" x2={GLYPH_W - 10} y2="84" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.8"/>
      <line x1="14" y1="84" x2="14"  y2="10" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.8"/>
      <path d={toPath(train)} fill="none" stroke="currentColor" strokeWidth="1.4"/>
      <path d={toPath(val)}   fill="none" stroke="currentColor" strokeWidth="1"
            strokeDasharray="3 3" opacity="0.7"/>
      {trainHead && <circle cx={trainHead[0]} cy={trainHead[1]} r="2" fill="currentColor"/>}
      {valHead   && <circle cx={valHead[0]} cy={valHead[1]} r="1.6" fill="currentColor" opacity="0.6"/>}
      {/* legend */}
      <g transform="translate(105, 14)">
        <line x1="0" y1="0" x2="10" y2="0" stroke="currentColor" strokeWidth="1.4"/>
        <text x="13" y="2.2" fontFamily={monoStack} fontSize="6" fill="currentColor" opacity="0.7">train</text>
        <line x1="40" y1="0" x2="50" y2="0" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.7"/>
        <text x="53" y="2.2" fontFamily={monoStack} fontSize="6" fill="currentColor" opacity="0.7">val</text>
      </g>
      <text x={GLYPH_W - 6} y={GLYPH_H - 4} textAnchor="end" fontFamily={monoStack}
            fontSize="6.5" fill="currentColor" opacity="0.55" letterSpacing="0.18em">
        EPOCH {String(epochs).padStart(3, "0")}/100
      </text>
    </svg>
  );
};

/* ── INFERENCE · model emits a distribution of outputs ──────────────── */
const GlyphInference = () => {
  const t = useFrame();
  // 5 output streams emerging from a black-box model
  const period = 3.0;
  const u = (t % period) / period;
  const outputs = [
    { y: 18, label: "0.62" },
    { y: 34, label: "0.21" },
    { y: 50, label: "0.09" },
    { y: 66, label: "0.05" },
    { y: 82, label: "0.03" },
  ];
  const modelX1 = 60, modelX2 = 110;
  const modelY1 = 18, modelY2 = 82;
  return (
    <svg viewBox={`0 0 ${GLYPH_W} ${GLYPH_H}`}>
      {/* input arrow */}
      <line x1="12" y1="50" x2="55" y2="50" stroke="currentColor"
            strokeWidth="1.1" opacity={0.85}/>
      <path d="M52 47 L56 50 L52 53 Z" fill="currentColor" opacity="0.9"/>
      <text x="14" y="44" fontFamily={monoStack} fontSize="6.5"
            fill="currentColor" opacity="0.7">x</text>
      {/* model black box */}
      <rect x={modelX1} y={modelY1} width={modelX2 - modelX1} height={modelY2 - modelY1}
            rx="3" fill="var(--bg-card, #16182a)" stroke="currentColor" strokeWidth="1"/>
      <text x={(modelX1 + modelX2)/2} y="48" textAnchor="middle"
            fontFamily={monoStack} fontSize="7" fill="currentColor">f_θ</text>
      <text x={(modelX1 + modelX2)/2} y="58" textAnchor="middle"
            fontFamily={monoStack} fontSize="5.5" fill="currentColor" opacity="0.55">
            MODEL
      </text>
      {/* output streams */}
      {outputs.map((o, i) => {
        const start = i * 0.12;
        const local = Math.max(0, Math.min(1, (u - start) / 0.6));
        const x = modelX2 + 6 + (GLYPH_W - 30 - modelX2) * local;
        return (
          <g key={i}>
            <line x1={modelX2 + 2} y1={o.y} x2={GLYPH_W - 30} y2={o.y}
                  stroke="currentColor" strokeWidth="0.55" opacity="0.35"
                  strokeDasharray="2 3"/>
            <circle cx={x} cy={o.y} r="2"
                    fill="currentColor"
                    opacity={Math.max(0.15, local * 0.85)}/>
            <text x={GLYPH_W - 26} y={o.y + 2} fontFamily={monoStack} fontSize="6"
                  fill="currentColor"
                  opacity={Math.max(0.25, local * 0.85)}>{o.label}</text>
          </g>
        );
      })}
      {/* arg-max bar */}
      <line x1={modelX2 + 6} y1={outputs[0].y - 3} x2={GLYPH_W - 28} y2={outputs[0].y - 3}
            stroke="var(--accent)" strokeWidth="0.5" opacity="0.6"/>
      <text x={GLYPH_W - 6} y={GLYPH_H - 4} textAnchor="end"
            fontFamily={monoStack} fontSize="6.5" fill="currentColor"
            opacity="0.55" letterSpacing="0.18em">ŷ = softmax(f_θ(x))</text>
    </svg>
  );
};

/* INFERENCE · drifting streams of predictions emerge from a centre point */
const BdInference = () => {
  const t = useFrame();
  const streams = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    y: 60 + Math.random() * (BD_H - 120),
    speed: 36 + Math.random() * 60,
    offset: Math.random() * BD_W,
    op: 0.05 + Math.random() * 0.09,
  })), []);
  return (
    <svg className="bd-svg" viewBox={`0 0 ${BD_W} ${BD_H}`} preserveAspectRatio="xMidYMid slice">
      {/* central seed line */}
      <line x1="180" y1="80" x2="180" y2={BD_H - 80}
            stroke="currentColor" strokeWidth="0.8" opacity="0.18"/>
      {streams.map((s, i) => {
        const head = ((t * s.speed + s.offset) % (BD_W + 200)) - 80;
        return (
          <g key={i} opacity={s.op}>
            <line x1="180" y1={s.y} x2={BD_W} y2={s.y}
                  stroke="currentColor" strokeWidth="0.5"
                  strokeDasharray="6 14"
                  strokeDashoffset={-t * s.speed * 0.6}/>
            {head > 180 && (
              <circle cx={head} cy={s.y} r="3" fill="currentColor" opacity="2"/>
            )}
          </g>
        );
      })}
    </svg>
  );
};

const Glyphs = {
  about:        GlyphData,
  experience:   GlyphPreproc,
  research:     GlyphArch,
  projects:     GlyphLoss,
  skills:       GlyphOpt,
  achievements: GlyphTrain,
  inference:    GlyphInference
};

/* ── per-section animated backdrops ─────────────────────────────────────
   Sit behind the section content at low opacity. Each one extends the
   phase metaphor across the whole section, not just the title glyph. */

const BD_W = 1600, BD_H = 600;

/* DATA · drifting starfield with cluster halos */
const BdData = () => {
  const t = useFrame();
  const pts = useMemo(() => Array.from({ length: 90 }, () => ({
    x: Math.random() * BD_W,
    y: Math.random() * BD_H,
    r: 0.7 + Math.random() * 1.8,
    period: 2 + Math.random() * 5,
    phase: Math.random() * Math.PI * 2,
    base:  0.05 + Math.random() * 0.1,
  })), []);
  const halos = useMemo(() => Array.from({ length: 4 }, () => ({
    x: 200 + Math.random() * (BD_W - 400),
    y: 80 + Math.random() * (BD_H - 160),
    r: 90 + Math.random() * 60,
  })), []);
  return (
    <svg className="bd-svg" viewBox={`0 0 ${BD_W} ${BD_H}`} preserveAspectRatio="xMidYMid slice">
      {halos.map((h, i) => (
        <circle key={"h"+i} cx={h.x} cy={h.y} r={h.r}
                fill="none" stroke="currentColor" strokeOpacity={0.06}
                strokeWidth="1" strokeDasharray="4 6"/>
      ))}
      {pts.map((p, i) => {
        const op = p.base + 0.08 * Math.sin(t * 2 * Math.PI / p.period + p.phase);
        return <circle key={i} cx={p.x} cy={p.y} r={p.r}
                       fill="currentColor" opacity={Math.max(0.03, op)}/>;
      })}
    </svg>
  );
};

/* PREPROCESSING · horizontal stream lines with travelling pulses */
const BdPreproc = () => {
  const t = useFrame();
  const lanes = useMemo(() => Array.from({ length: 9 }, (_, i) => ({
    y: 40 + i * 65 + (Math.random() - 0.5) * 22,
    speed: 22 + Math.random() * 60,
    offset: Math.random() * BD_W,
    op: 0.05 + Math.random() * 0.09,
  })), []);
  return (
    <svg className="bd-svg" viewBox={`0 0 ${BD_W} ${BD_H}`} preserveAspectRatio="xMidYMid slice">
      {lanes.map((l, i) => {
        const head = ((t * l.speed + l.offset) % (BD_W + 200)) - 60;
        return (
          <g key={i} opacity={l.op}>
            <line x1="0" y1={l.y} x2={BD_W} y2={l.y}
                  stroke="currentColor" strokeWidth="0.6" strokeDasharray="8 18"
                  strokeDashoffset={-t * l.speed * 0.6}/>
            <circle cx={head} cy={l.y} r="3.5" fill="currentColor" opacity="2"/>
            <line x1={head - 40} y1={l.y} x2={head} y2={l.y}
                  stroke="currentColor" strokeWidth="1.4" opacity="0.8"/>
          </g>
        );
      })}
    </svg>
  );
};

/* ARCHITECTURE · vertical layer planes with cross-flow pulses */
const BdArch = () => {
  const t = useFrame();
  const cols = [220, 540, 860, 1180, 1500];
  const pulses = useMemo(() => Array.from({ length: 10 }, () => ({
    y: 60 + Math.random() * (BD_H - 120),
    speed: 0.05 + Math.random() * 0.08,
    offset: Math.random(),
  })), []);
  return (
    <svg className="bd-svg" viewBox={`0 0 ${BD_W} ${BD_H}`} preserveAspectRatio="xMidYMid slice">
      {cols.map((x, i) => (
        <g key={i}>
          <line x1={x} y1="40" x2={x} y2={BD_H - 40}
                stroke="currentColor" strokeWidth="0.8" opacity="0.07"/>
          {[120, 240, 360, 480].map((y, j) => (
            <circle key={j} cx={x} cy={y} r="3"
                    fill="currentColor" opacity={0.08 + 0.03 * Math.sin(t + i * 0.4 + j * 0.6)}/>
          ))}
        </g>
      ))}
      {pulses.map((p, i) => {
        const u = ((t * p.speed + p.offset) % 1);
        const x = cols[0] + u * (cols[cols.length - 1] - cols[0]);
        return <g key={"p"+i}>
          <circle cx={x} cy={p.y} r="4" fill="currentColor" opacity="0.18"/>
          <line x1={x - 32} y1={p.y} x2={x} y2={p.y}
                stroke="currentColor" strokeWidth="1.2" opacity="0.15"/>
        </g>;
      })}
    </svg>
  );
};

/* LOSS · stacked bowl contours with descent dots rolling down */
const BdLoss = () => {
  const t = useFrame();
  const bowls = [
    { y0: 70,  y1: 480, y2: 70  },
    { y0: 130, y1: 440, y2: 130 },
    { y0: 200, y1: 400, y2: 200 },
  ];
  // shared bezier helper for the deepest bowl
  const bz = (u) => {
    const P0 = [120, 70], P1 = [800, 540], P2 = [1480, 70];
    return [
      (1-u)*(1-u)*P0[0] + 2*(1-u)*u*P1[0] + u*u*P2[0],
      (1-u)*(1-u)*P0[1] + 2*(1-u)*u*P1[1] + u*u*P2[1],
    ];
  };
  const cycle = 9;
  const dots = [0, 0.2, 0.4, 0.6, 0.8].map((d, i) => {
    const u = ((t / cycle + d) % 1);
    // descend from 0 to 0.5 over the first 70% of the segment, then linger
    const seg = u < 0.7 ? (u / 0.7) * 0.5 : 0.5;
    return { u, seg, i };
  });
  return (
    <svg className="bd-svg" viewBox={`0 0 ${BD_W} ${BD_H}`} preserveAspectRatio="xMidYMid slice">
      {bowls.map((b, i) => (
        <path key={i}
              d={`M 120 ${b.y0} Q 800 ${b.y1} 1480 ${b.y2}`}
              fill="none" stroke="currentColor" strokeWidth="1.4"
              opacity={0.07 - i * 0.015}/>
      ))}
      {dots.map(({ u, seg, i }) => {
        const [x, y] = bz(seg);
        const op = 0.18 - u * 0.1;
        return <circle key={i} cx={x} cy={y} r="6" fill="currentColor" opacity={Math.max(0.04, op)}/>;
      })}
    </svg>
  );
};

/* OPTIMIZER · concentric contour rings with orbiting descent dots */
const BdOpt = () => {
  const t = useFrame();
  return (
    <svg className="bd-svg" viewBox={`0 0 ${BD_W} ${BD_H}`} preserveAspectRatio="xMidYMid slice">
      <g transform={`translate(${BD_W / 2}, ${BD_H / 2})`}>
        {[560, 440, 330, 230, 150, 85, 35].map((r, i) => (
          <ellipse key={i} cx="0" cy="0" rx={r} ry={r * 0.55}
                   fill="none" stroke="currentColor" strokeWidth="0.8"
                   opacity={0.05 + i * 0.01}/>
        ))}
        {[0, 1, 2, 3, 4].map(i => {
          const u = t * 0.16 + i * 0.18;
          const r = ((500 - (u * 80) % 500));
          const a = u * 1.4;
          return <circle key={i}
                         cx={Math.cos(a) * r}
                         cy={Math.sin(a) * r * 0.55}
                         r="6" fill="currentColor"
                         opacity={0.14 + 0.06 * Math.sin(u)}/>;
        })}
        <circle cx="0" cy="0" r="6" fill="currentColor" opacity="0.4"/>
      </g>
    </svg>
  );
};

/* TRAINING · loss/val curves draw progressively across the section */
const BdTrain = () => {
  const t = useFrame();
  const cycle = 14;
  const u = (t % cycle) / cycle;
  const buildCurve = (k, baseJitter) => {
    const N = 220;
    const pts = [];
    for (let i = 0; i <= N; i++) {
      const ix = i / N;
      if (ix > u + 0.004) break;
      const x = 80 + ix * (BD_W - 160);
      const y = 100 + 380 * (1 - Math.exp(-ix * k))
                + Math.sin(ix * 80 + t * 1.4) * baseJitter;
      pts.push(`${x.toFixed(0)} ${y.toFixed(0)}`);
    }
    return pts.length ? "M" + pts.join(" L") : "";
  };
  return (
    <svg className="bd-svg" viewBox={`0 0 ${BD_W} ${BD_H}`} preserveAspectRatio="xMidYMid slice">
      <path d={buildCurve(3.6, 2)}
            fill="none" stroke="currentColor" strokeWidth="2.4" opacity="0.11"/>
      <path d={buildCurve(2.9, 3)}
            fill="none" stroke="currentColor" strokeWidth="1.8"
            strokeDasharray="10 10" opacity="0.07"/>
    </svg>
  );
};

const Backdrops = {
  about:        BdData,
  experience:   BdPreproc,
  research:     BdArch,
  projects:     BdLoss,
  skills:       BdOpt,
  achievements: BdTrain,
  inference:    BdInference,
};

const PhaseBackdrop = ({ kind }) => {
  const C = Backdrops[kind];
  if (!C) return null;
  return <div className="section-bg" aria-hidden="true"><C /></div>;
};

/* ── section header (phase rule + title + glyph) ────────────────────── */
const PhaseHead = ({ phase, title, sub, children }) => {
  const G = Glyphs[phase.id];
  return (
    <>
      <div className="phase-rule" aria-hidden="true">
        <span className="pr-line"></span>
        <span className="pr-mark">
          <span className="pr-dot"></span>
          <span className="pr-num">{phase.n}</span>
          <span className="pr-sep">·</span>
          <span className="pr-name">{phase.phase}</span>
          <span className="pr-sep">·</span>
          <span className="pr-tag">{phase.tag}</span>
          <span className="pr-dot"></span>
        </span>
        <span className="pr-line"></span>
      </div>
      <header className="phase-head">
        <div>
          <h2 className="sec-title">{title}</h2>
          {sub && <p className="sec-sub">{sub}</p>}
          {children}
        </div>
        <div className="phase-glyph">
          {G && <G />}
        </div>
      </header>
    </>
  );
};

/* ── nav ─────────────────────────────────────────────────────────────── */
const Nav = () => {
  const [active, setActive] = useState("about");
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    [{id:"about"},...DATA.phases,{id:"contact"}].forEach(s => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  const links = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "research", label: "Research" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "inference", label: "Posts" },
    { id: "contact", label: "Contact" }
  ];
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <a className="brand" href="#top"><span className="dot"></span>{DATA.shortName}</a>
        <div className="nav-links">
          {links.map(s => (
            <a key={s.id} href={"#" + s.id} className={active === s.id ? "active" : ""}>
              {s.label}
            </a>
          ))}
        </div>
        <a className="nav-cta" href="#contact">Get in touch</a>
      </div>
    </nav>
  );
};

/* ── phase rail (fixed left) ────────────────────────────────────────── */
const Rail = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const sections = [
      { key: "hero",    id: "top" },
      ...DATA.phases.map(p => ({ key: p.id, id: p.id })),
      { key: "contact", id: "contact" }
    ];
    let last = "";
    const onScroll = () => {
      let activeIdx = 0;
      let activeKey = "hero";
      sections.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight * 0.42) {
            activeKey = s.key;
            if (i >= 1 && i <= DATA.phases.length) activeIdx = i - 1;
          }
        }
      });
      setActive(activeIdx);
      if (activeKey !== last) {
        last = activeKey;
        window.dispatchEvent(new CustomEvent("phase-change", { detail: activeKey }));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <aside className="rail" aria-label="Training pipeline">
      {DATA.phases.map((p, i) => (
        <a key={p.id}
           href={"#" + p.id}
           className={i === active ? "active" : (i < active ? "done" : "")}
           style={{ "--phase": `oklch(74% 0.13 ${p.hue})` }}
           aria-label={`${p.n} ${p.phase}`}>
          <span className="dot"></span>
          <span className="num">{p.n} · {p.phase}</span>
        </a>
      ))}
    </aside>
  );
};

/* ── hero ────────────────────────────────────────────────────────────── */
const NeuralNet = () => {
  const layers = useMemo(() => ([
    { x: -75, n: 5, cls: "in" },
    { x: -25, n: 7, cls: "hidden" },
    { x:  25, n: 7, cls: "hidden" },
    { x:  75, n: 3, cls: "out" },
  ]), []);
  const nodeY = (i, n) => {
    const span = 130;
    if (n === 1) return 0;
    return -span/2 + (span/(n-1)) * i;
  };
  const edges = [];
  for (let l = 0; l < layers.length - 1; l++) {
    const A = layers[l], B = layers[l+1];
    for (let i = 0; i < A.n; i++) {
      for (let j = 0; j < B.n; j++) {
        const hot = (i*7 + j*3 + l) % 9 === 0;
        edges.push({ x1: A.x, y1: nodeY(i, A.n), x2: B.x, y2: nodeY(j, B.n), hot, key: `${l}-${i}-${j}` });
      }
    }
  }
  const signals = useMemo(() => {
    const paths = [[1,3,2,0],[3,0,5,2],[0,6,1,1],[4,2,4,0],[2,5,0,2]];
    return paths.map(picks => {
      let d = "";
      picks.forEach((idx, l) => {
        const L = layers[l]; const y = nodeY(idx, L.n);
        d += (l === 0 ? "M" : "L") + L.x + " " + y + " ";
      });
      return d.trim();
    });
  }, [layers]);
  const labels = ["INPUT", "h₁", "h₂", "OUTPUT"];
  return (
    <div className="orbit-wrap" aria-hidden="true">
      <svg className="nn-svg" viewBox="-110 -100 220 200">
        <g>{edges.map(e => (
          <line key={e.key} className={"edge" + (e.hot ? " hot" : "")} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}/>
        ))}</g>
        <g>{signals.map((d, i) => (
          <path key={i} className={"signal s" + (i+1)} d={d}/>
        ))}</g>
        <g>{layers.map((L, li) => (
          <g key={li}>{Array.from({ length: L.n }).map((_, i) => {
            const r = L.cls === "out" ? 3.2 : 2.6;
            const live = (i + li) % 3 === 0;
            const delay = ["", "d1", "d2", "d3", "d4"][(i+li) % 5];
            return <circle key={i} className={"node " + L.cls + (live ? " live " + delay : "")} cx={L.x} cy={nodeY(i, L.n)} r={r}/>;
          })}</g>
        ))}</g>
        <g>{layers.map((L, i) => (
          <text key={i} className="layer-label" x={L.x} y={85} textAnchor="middle">{labels[i]}</text>
        ))}</g>
        <line x1="-100" y1="75" x2="100" y2="75" stroke="var(--line-soft)" strokeWidth="0.4"/>
      </svg>
    </div>
  );
};


/* ── architecture slideshow: FFN · CNN · RNN · GNN · Transformer ─────── */
const ARCH_VB = "-115 -75 230 150";

/* FFN — feed-forward, fully connected; pulse wavefront + signal traces */
const ArchFFN = () => {
  const layers = useMemo(() => ([
    { x: -80, n: 5, cls: "in" },
    { x: -27, n: 7, cls: "hidden" },
    { x:  27, n: 7, cls: "hidden" },
    { x:  80, n: 3, cls: "out" },
  ]), []);
  const nodeY = (i, n) => {
    const span = 100;
    if (n === 1) return 0;
    return -span/2 + (span/(n-1)) * i;
  };
  const edges = [];
  for (let l = 0; l < layers.length - 1; l++) {
    const A = layers[l], B = layers[l+1];
    for (let i = 0; i < A.n; i++)
      for (let j = 0; j < B.n; j++)
        edges.push({ x1: A.x, y1: nodeY(i, A.n), x2: B.x, y2: nodeY(j, B.n),
                     hot: (i*7 + j*3 + l) % 9 === 0, key: `${l}-${i}-${j}` });
  }
  const t = useFrame();
  // 2s forward-pass cycle: a wavefront sweeps left → right
  const period = 2.4;
  const u = (t % period) / period;
  // wave position interpolates between layer x's
  const wavefrontX = layers[0].x + (layers[layers.length-1].x - layers[0].x) * u;
  // which layer is most active right now?
  const closestLayer = layers.reduce((best, L, i) => {
    return Math.abs(L.x - wavefrontX) < Math.abs(layers[best].x - wavefrontX) ? i : best;
  }, 0);
  // signal traces: random forward paths
  const sigPaths = useMemo(() => {
    const picks = [[1,3,2,0],[3,0,5,2],[0,6,1,1],[4,2,4,0],[2,5,0,2]];
    return picks.map(p => {
      let d = "";
      p.forEach((idx, l) => {
        const L = layers[l]; const y = nodeY(idx, L.n);
        d += (l === 0 ? "M" : "L") + L.x + " " + y + " ";
      });
      return d.trim();
    });
  }, [layers]);
  return (
    <svg className="nn-svg" viewBox={ARCH_VB}>
      {/* wavefront glow */}
      <line x1={wavefrontX} y1="-58" x2={wavefrontX} y2="58"
            stroke="var(--accent)" strokeWidth="14" opacity="0.10"/>
      <line x1={wavefrontX} y1="-58" x2={wavefrontX} y2="58"
            stroke="var(--accent)" strokeWidth="1.2" opacity="0.55"/>
      {edges.map(e => <line key={e.key} className={"edge" + (e.hot ? " hot" : "")}
                            x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}/>)}
      {/* animated signal paths */}
      {sigPaths.map((d, i) => (
        <path key={"s"+i} className={"signal s" + (i+1)} d={d}/>
      ))}
      {/* nodes — highlight layer the wavefront is crossing */}
      {layers.map((L, li) => (
        <g key={li}>{Array.from({ length: L.n }).map((_, i) => {
          const isHotLayer = li === closestLayer;
          const r = (L.cls === "out" ? 3.2 : 2.6) + (isHotLayer ? 0.8 : 0);
          return (
            <g key={i}>
              {isHotLayer && (
                <circle cx={L.x} cy={nodeY(i, L.n)} r={r + 4}
                        fill="none" stroke="var(--accent)" strokeWidth="0.6" opacity="0.5"/>
              )}
              <circle className={"node " + L.cls + (isHotLayer ? " live" : "")}
                      cx={L.x} cy={nodeY(i, L.n)} r={r}/>
            </g>
          );
        })}</g>
      ))}
      {["INPUT", "h₁", "h₂", "OUTPUT"].map((l, i) => (
        <text key={i} className="layer-label" x={layers[i].x} y="64" textAnchor="middle">{l}</text>
      ))}
    </svg>
  );
};

/* CNN — kernel sliding over an image grid, producing a feature map */
const ArchCNN = () => {
  const t = useFrame();
  const positions = 9;
  const dur = 0.55;
  const idx = Math.floor((t / dur)) % positions;
  const kx = idx % 3, ky = Math.floor(idx / 3);
  const inX = -100, inY = -42;
  const outX = 30, outY = -18;
  const cell = 16;
  return (
    <svg viewBox={ARCH_VB}>
      {/* input grid 5×5 */}
      {Array.from({ length: 25 }, (_, i) => {
        const col = i % 5, row = Math.floor(i / 5);
        const inK = col >= kx && col < kx + 3 && row >= ky && row < ky + 3;
        return <rect key={i}
                     x={inX + col * cell} y={inY + row * cell}
                     width={cell - 2} height={cell - 2} rx="1.5"
                     fill={inK ? "var(--accent)" : "var(--bg)"}
                     fillOpacity={inK ? 0.35 : 1}
                     stroke="var(--ink-mute)" strokeWidth="0.7"
                     opacity={inK ? 0.95 : 0.45}/>;
      })}
      {/* kernel outline */}
      <rect x={inX + kx * cell - 1.5} y={inY + ky * cell - 1.5}
            width={cell * 3 - 0.5} height={cell * 3 - 0.5} rx="1.5"
            fill="none" stroke="var(--accent)" strokeWidth="1.5"
            style={{ filter: "drop-shadow(0 0 6px var(--accent))" }}/>
      {/* arrow input → output */}
      <line x1={inX + kx * cell + cell * 1.5} y1={inY + ky * cell + cell * 1.5}
            x2={outX + kx * cell + cell/2}    y2={outY + ky * cell + cell/2}
            stroke="var(--accent)" strokeWidth="0.9" strokeDasharray="2 3" opacity="0.75"/>
      {/* output feature map 3×3 */}
      {Array.from({ length: 9 }, (_, i) => {
        const col = i % 3, row = Math.floor(i / 3);
        const filled = (row * 3 + col) <= idx;
        const isHere = (row === ky && col === kx);
        return <rect key={i}
                     x={outX + col * cell} y={outY + row * cell}
                     width={cell - 2} height={cell - 2} rx="1.5"
                     fill={filled ? "var(--accent)" : "var(--bg)"}
                     fillOpacity={isHere ? 0.7 : filled ? 0.4 : 1}
                     stroke="var(--ink-mute)" strokeWidth="0.7"/>;
      })}
      {/* labels — all on bottom row, no overlap */}
      <text className="layer-label" x={inX + cell * 2.5} y="50" textAnchor="middle">INPUT 5×5</text>
      <text className="layer-label" x={outX + cell * 1.5} y="50" textAnchor="middle">FEATURE MAP 3×3</text>
      <text className="layer-label" x="0" y="64" textAnchor="middle">3×3 KERNEL · STRIDE 1</text>
    </svg>
  );
};

/* RNN — unrolled timesteps with recurrent state passing */
const ArchRNN = () => {
  const t = useFrame();
  const N = 5;
  const dur = 0.7;
  const active = Math.floor(t / dur) % (N + 1);
  const xs = Array.from({ length: N }, (_, i) => -80 + i * 40);
  return (
    <svg viewBox={ARCH_VB}>
      {xs.map((x, i) => {
        const isOn = i < active;
        const justOn = i === active - 1;
        return (
          <g key={i}>
            {/* input arrow x_t (from above) */}
            <text x={x} y="-44" textAnchor="middle" fontFamily={monoStack}
                  fontSize="7.5" fill="currentColor" opacity={isOn ? 0.95 : 0.4}>
              x{<tspan baselineShift="sub" fontSize="5.5">{i + 1}</tspan>}
            </text>
            <line x1={x} y1="-38" x2={x} y2="-13" stroke="currentColor"
                  strokeWidth={justOn ? 1.4 : 0.9} opacity={isOn ? 0.95 : 0.4}/>
            <path d={`M${x-3} -16 L${x} -13 L${x+3} -16`} fill="currentColor" opacity={isOn ? 0.95 : 0.4}/>
            {/* hidden state cell */}
            <rect x={x - 11} y={-11} width="22" height="22" rx="3"
                  fill={isOn ? "var(--accent)" : "var(--bg)"} fillOpacity={isOn ? 0.25 : 1}
                  stroke="currentColor" strokeWidth={justOn ? 1.6 : 1}/>
            <text x={x} y="3" textAnchor="middle" fontFamily={monoStack}
                  fontSize="8" fill="currentColor" opacity={isOn ? 0.95 : 0.5}>
              h{<tspan baselineShift="sub" fontSize="5.5">{i + 1}</tspan>}
            </text>
            {/* output arrow y_t (downward) */}
            <line x1={x} y1="11" x2={x} y2="32" stroke="currentColor"
                  strokeWidth="0.9" opacity={isOn ? 0.65 : 0.3}/>
            <text x={x} y="42" textAnchor="middle" fontFamily={monoStack}
                  fontSize="7.5" fill="currentColor" opacity={isOn ? 0.85 : 0.4}>
              y{<tspan baselineShift="sub" fontSize="5.5">{i + 1}</tspan>}
            </text>
            {/* recurrent edge to next */}
            {i < N - 1 && (
              <g>
                <line x1={x + 11} y1={0} x2={xs[i+1] - 11} y2={0}
                      stroke="currentColor" strokeWidth={i === active - 1 ? 1.6 : 0.8}
                      opacity={i < active ? 0.9 : 0.35}/>
                <path d={`M${xs[i+1] - 14} -3 L${xs[i+1] - 11} 0 L${xs[i+1] - 14} 3`}
                      fill="currentColor" opacity={i < active ? 0.9 : 0.35}/>
              </g>
            )}
          </g>
        );
      })}
      <text className="layer-label" x="0" y="62" textAnchor="middle">UNROLLED  ·  t = 1 … 5</text>
    </svg>
  );
};

/* GNN — focal-node message passing on a larger graph */
const ArchGNN = () => {
  const t = useFrame();
  // 18 nodes spread across the full viewBox in a clustered layout
  const nodes = useMemo(() => [
    { x: -98, y: -55 }, { x: -68, y: -62 }, { x: -38, y: -50 }, { x:  -8, y: -58 },
    { x:  24, y: -52 }, { x:  56, y: -60 }, { x:  88, y: -48 }, { x: 102, y: -20 },
    { x: -92, y: -22 }, { x: -55, y: -18 }, { x: -22, y: -12 }, { x:  18, y: -20 },
    { x:  52, y: -12 }, { x:  82, y:   2 },
    { x: -78, y:  28 }, { x: -40, y:  38 }, { x:  -8, y:  26 }, { x:  28, y:  40 },
    { x:  62, y:  30 }, { x:  92, y:  42 },
  ], []);
  const edges = useMemo(() => [
    // top row interconnects
    [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],
    // top-to-middle bridges
    [0,8],[1,9],[2,9],[3,10],[4,11],[5,12],[6,13],[7,13],
    // middle row interconnects
    [8,9],[9,10],[10,11],[11,12],[12,13],
    // middle-to-bottom bridges
    [8,14],[9,14],[10,15],[10,16],[11,16],[11,17],[12,17],[12,18],[13,18],[13,19],
    // bottom row
    [14,15],[15,16],[16,17],[17,18],[18,19],
    // extra cross-links for richness
    [2,10],[4,12],[10,17],[12,18],[5,13],
  ], []);
  const neighbours = useMemo(() => {
    const m = nodes.map(() => []);
    edges.forEach(([a, b]) => { m[a].push(b); m[b].push(a); });
    return m;
  }, [nodes, edges]);
  // pick "central" nodes with high degree so the operation feels meaningful
  const focalOrder = useMemo(() => {
    return [10, 11, 5, 16, 9, 12, 3, 17, 4, 13]; // hand-picked well-connected nodes
  }, []);
  const focalPeriod = 2.8;
  const focalCycle = Math.floor(t / focalPeriod);
  const focal = focalOrder[focalCycle % focalOrder.length];
  const localT = (t % focalPeriod) / focalPeriod;
  // animated halo expands during 0.0 - 0.7
  const haloT = Math.min(1, localT / 0.7);

  return (
    <svg viewBox={ARCH_VB}>
      {/* all edges */}
      {edges.map(([a, b], i) => {
        const isNbrEdge = a === focal || b === focal;
        return (
          <line key={i}
                x1={nodes[a].x} y1={nodes[a].y}
                x2={nodes[b].x} y2={nodes[b].y}
                stroke={isNbrEdge ? "var(--accent)" : "currentColor"}
                strokeWidth={isNbrEdge ? 1.3 : 0.55}
                opacity={isNbrEdge ? 0.85 : 0.22}/>
        );
      })}

      {/* outer expanding halo (the receptive field) */}
      <circle cx={nodes[focal].x} cy={nodes[focal].y}
              r={6 + haloT * 38}
              fill="none" stroke="var(--accent)" strokeWidth="0.8"
              opacity={Math.max(0, 0.55 * (1 - haloT))}/>
      <circle cx={nodes[focal].x} cy={nodes[focal].y}
              r={6 + haloT * 22}
              fill="none" stroke="var(--accent)" strokeWidth="0.6"
              opacity={Math.max(0, 0.4 * (1 - haloT * 0.8))}/>

      {/* message pulses: every neighbour sends a glowing dot inward */}
      {neighbours[focal].map((nb, i) => {
        const n = neighbours[focal].length;
        const start = 0.10 + i * (0.45 / Math.max(1, n));
        const end   = 0.70 + i * (0.20 / Math.max(1, n));
        if (localT < start || localT > end) return null;
        const u = (localT - start) / (end - start);
        const eu = u * u * (3 - 2 * u);
        const a = nodes[nb], b = nodes[focal];
        const x = a.x + (b.x - a.x) * eu;
        const y = a.y + (b.y - a.y) * eu;
        return (
          <g key={"m" + i}>
            <circle cx={x} cy={y} r="6" fill="var(--accent)" opacity="0.35"/>
            <circle cx={x} cy={y} r="3" fill="var(--accent)" opacity="0.75"/>
            <circle cx={x} cy={y} r="1.6" fill="oklch(96% 0.05 85)"/>
          </g>
        );
      })}

      {/* all nodes */}
      {nodes.map((n, i) => {
        const isFocal = i === focal;
        const isNb = neighbours[focal].includes(i);
        const r = isFocal ? 7 : (isNb ? 5.2 : 4);
        return (
          <g key={i}>
            {isFocal && (
              <circle cx={n.x} cy={n.y} r={r + 3}
                      fill="none" stroke="var(--accent)" strokeWidth="0.9"
                      opacity={0.6 + 0.35 * Math.sin(t * 5)}/>
            )}
            <circle cx={n.x} cy={n.y} r={r}
                    fill={isFocal ? "var(--accent)" : (isNb ? "var(--bg-soft)" : "var(--bg)")}
                    fillOpacity={isFocal ? 0.95 : 1}
                    stroke={isFocal ? "var(--accent)" : "currentColor"}
                    strokeWidth={isFocal ? 1.4 : (isNb ? 1.1 : 0.9)}
                    style={isFocal ? { filter: "drop-shadow(0 0 8px var(--accent))" } : null}/>
          </g>
        );
      })}

      <text className="layer-label" x="0" y="66" textAnchor="middle">
        h_v ← Σ MSG(h_u, h_v),  u ∈ N(v)
      </text>
    </svg>
  );
};

/* Transformer — full attention block: X → (Wq,Wk,Wv) → Q,K,V → softmax(QKᵀ/√d)·V → z */
const ArchTransformer = () => {
  const t = useFrame();
  // 4-stage loop (4s):
  //   0.00-0.22 : tokens → projection bus
  //   0.22-0.42 : Wq/Wk/Wv → Q/K/V
  //   0.42-0.62 : Q·Kᵀ → /√d → softmax
  //   0.62-0.85 : softmax × V
  //   0.85-1.00 : output emerges
  const period = 4.2;
  const u = (t % period) / period;
  const stage = (a, b) => u >= a && u <= b ? Math.max(0, Math.min(1, (u - a) / (b - a))) : (u > b ? 1 : 0);
  const sTok  = stage(0.00, 0.18);
  const sProj = stage(0.18, 0.36);
  const sQKV  = stage(0.36, 0.50);
  const sQK   = stage(0.50, 0.62);
  const sSM   = stage(0.62, 0.74);
  const sZ    = stage(0.74, 0.92);
  const tokens = [
    { x: -88, label: "x₁" }, { x: -60, label: "x₂" }, { x: -32, label: "x₃" },
    { x:  -4, label: "…"  }, { x:  24, label: "xᵢ" }, { x:  52, label: "xₙ₋₁" },
    { x:  80, label: "xₙ" },
  ];
  // positions
  const tokY = 58;
  const busY = 40;
  const wY   = 20;       // Wq, Wk, Wv blocks
  const qkvY = -6;       // Q, K, V outputs (lowered for clearer gap)
  const matY = -30;      // Q·Kᵀ matmul
  const smY  = -48;      // softmax
  const attY = smY;      // softmax × V combiner (same row)
  const zY   = -68;
  const Qx = -56, Kx = 0, Vx = 56;
  return (
    <svg viewBox={ARCH_VB}>
      <defs>
        <marker id="tfm-ah" viewBox="0 0 6 6" refX="5" refY="3"
                markerWidth="4" markerHeight="4" orient="auto-start-reverse">
          <path d="M0 0 L6 3 L0 6 z" fill="currentColor"/>
        </marker>
      </defs>
      {/* tokens */}
      {tokens.map((tk, i) => {
        const lit = sTok > 0 ? 1 : 0.55;
        return (
          <g key={i} opacity={lit}>
            <rect x={tk.x - 11} y={tokY - 5} width="22" height="13" rx="2"
                  fill="var(--bg-card, #16182a)" stroke="currentColor" strokeWidth="0.8"/>
            <text x={tk.x} y={tokY + 4} textAnchor="middle"
                  fontFamily={monoStack} fontSize="6.5" fill="currentColor">{tk.label}</text>
          </g>
        );
      })}
      {/* arrows from each token up to the bus */}
      {tokens.map((tk, i) => (
        <line key={"ta"+i} x1={tk.x} y1={tokY - 5} x2={tk.x} y2={busY + 1}
              stroke="currentColor" strokeWidth={sTok > 0 ? 0.9 : 0.5}
              opacity={sTok > 0 ? 0.85 : 0.4} markerEnd="url(#tfm-ah)"/>
      ))}
      {/* bus line "x" */}
      <line x1="-100" y1={busY} x2="100" y2={busY}
            stroke="currentColor" strokeWidth="1.1"
            opacity={0.5 + sTok * 0.45}/>
      <text x="-105" y={busY + 2} textAnchor="end"
            fontFamily={monoStack} fontSize="6.5" fill="currentColor" opacity="0.85">x</text>

      {/* arrows bus → Wq, Wk, Wv */}
      {[Qx, Kx, Vx].map((wx, i) => (
        <line key={i} x1={wx} y1={busY} x2={wx} y2={wY + 8.5}
              stroke="currentColor" strokeWidth={sProj > 0 ? 1 : 0.6}
              opacity={sProj > 0 ? 0.9 : 0.45} markerEnd="url(#tfm-ah)"/>
      ))}

      {/* Wq, Wk, Wv blocks */}
      {[["Wq", Qx], ["Wₖ", Kx], ["Wᵥ", Vx]].map(([lab, wx], i) => (
        <g key={lab} opacity={sProj > 0 ? 1 : 0.6}>
          <rect x={wx - 15} y={wY - 7} width="30" height="14" rx="2"
                fill={sProj > 0.5 ? "var(--accent)" : "var(--bg-card, #16182a)"}
                fillOpacity={sProj > 0.5 ? 0.18 : 1}
                stroke="currentColor" strokeWidth="0.9"/>
          <text x={wx} y={wY + 2} textAnchor="middle"
                fontFamily={monoStack} fontSize="7" fill="currentColor">{lab}</text>
        </g>
      ))}

      {/* arrows W → Q,K,V */}
      {[Qx, Kx, Vx].map((wx, i) => (
        <line key={i} x1={wx} y1={wY - 7} x2={wx} y2={qkvY + 8.5}
              stroke="currentColor" strokeWidth={sQKV > 0 ? 1 : 0.6}
              opacity={sQKV > 0 ? 0.9 : 0.45} markerEnd="url(#tfm-ah)"/>
      ))}

      {/* Q, K, V */}
      {[["Q", Qx], ["K", Kx], ["V", Vx]].map(([lab, wx], i) => (
        <g key={lab} opacity={sQKV > 0 ? 1 : 0.7}>
          <rect x={wx - 12} y={qkvY - 6} width="24" height="12" rx="1.5"
                fill={sQKV > 0.5 ? "var(--accent)" : "var(--bg-card, #16182a)"}
                fillOpacity={sQKV > 0.5 ? 0.25 : 1}
                stroke="var(--accent)" strokeWidth="1"/>
          <text x={wx} y={qkvY + 2.5} textAnchor="middle"
                fontFamily={monoStack} fontSize="7.5" fill="currentColor" fontWeight="500">{lab}</text>
        </g>
      ))}

      {/* Q & K → matmul circle (above Q and K) */}
      <line x1={Qx} y1={qkvY - 6} x2={(Qx + Kx) / 2 - 4} y2={matY + 4}
            stroke="currentColor" strokeWidth={sQK > 0 ? 1 : 0.6}
            opacity={sQK > 0 ? 0.9 : 0.45}/>
      <line x1={Kx} y1={qkvY - 6} x2={(Qx + Kx) / 2 + 4} y2={matY + 4}
            stroke="currentColor" strokeWidth={sQK > 0 ? 1 : 0.6}
            opacity={sQK > 0 ? 0.9 : 0.45}/>
      <g opacity={sQK > 0 ? 1 : 0.6}>
        <circle cx={(Qx + Kx) / 2} cy={matY} r="6"
                fill="var(--bg-card, #16182a)" stroke="currentColor" strokeWidth="1"/>
        <text x={(Qx + Kx) / 2} y={matY + 2.4} textAnchor="middle"
              fontFamily={monoStack} fontSize="7" fill="currentColor">×</text>
      </g>
      {/* /√d scaler (between matmul and softmax) */}
      <line x1={(Qx + Kx) / 2} y1={matY - 7} x2={(Qx + Kx) / 2} y2={smY + 8.5}
            stroke="currentColor" strokeWidth={sSM > 0 ? 1 : 0.6}
            opacity={sSM > 0 ? 0.9 : 0.45} markerEnd="url(#tfm-ah)"/>
      <g opacity={sSM > 0 ? 1 : 0.7}>
        <rect x={(Qx + Kx) / 2 - 26} y={smY - 5} width="52" height="11" rx="2"
              fill={sSM > 0.5 ? "var(--accent)" : "var(--bg-card, #16182a)"}
              fillOpacity={sSM > 0.5 ? 0.22 : 1}
              stroke="currentColor" strokeWidth="0.9"/>
        <text x={(Qx + Kx) / 2} y={smY + 2.2} textAnchor="middle"
              fontFamily={monoStack} fontSize="6.5" fill="currentColor">softmax(·/√d)</text>
      </g>

      {/* softmax to multiplier with V */}
      <line x1={(Qx + Kx) / 2 + 26} y1={smY} x2={Vx - 8.5} y2={smY}
            stroke="currentColor" strokeWidth={sSM > 0 ? 1 : 0.6}
            opacity={sSM > 0 ? 0.9 : 0.45} markerEnd="url(#tfm-ah)"/>
      <line x1={Vx} y1={qkvY - 7} x2={Vx} y2={smY + 8.5}
            stroke="currentColor" strokeWidth={sSM > 0 ? 1 : 0.6}
            opacity={sSM > 0 ? 0.9 : 0.45}/>
      <g opacity={sSM > 0 ? 1 : 0.6}>
        <circle cx={Vx} cy={smY} r="6"
                fill="var(--bg-card, #16182a)" stroke="currentColor" strokeWidth="1"/>
        <text x={Vx} y={smY + 2.4} textAnchor="middle"
              fontFamily={monoStack} fontSize="7" fill="currentColor">×</text>
      </g>

      {/* output → z */}
      <line x1={Vx} y1={smY - 7} x2={Vx} y2={zY + 4}
            stroke="currentColor" strokeWidth={sZ > 0 ? 1.2 : 0.7}
            opacity={sZ > 0 ? 1 : 0.5} markerEnd="url(#tfm-ah)"/>
      <text x={Vx + 6} y={zY + 4} textAnchor="start"
            fontFamily={monoStack} fontSize="7.5" fill="var(--accent)" fontWeight="500"
            opacity={sZ > 0 ? 1 : 0.7}>z</text>

      {/* running pulse dot to make data flow obvious */}
      {(() => {
        // animate one pulse going through the active stage
        let px = 0, py = 0, show = false;
        if (sTok > 0 && sTok < 1) {
          // pulse riding up from an example token to bus
          show = true;
          const tk = tokens[Math.floor((u / 0.18) * tokens.length) % tokens.length];
          px = tk.x;
          py = tokY - 5 + (busY - tokY + 5) * sTok;
        } else if (sProj > 0 && sProj < 1) {
          show = true;
          const wxs = [Qx, Kx, Vx];
          const wx = wxs[Math.floor(sProj * 3) % 3];
          px = wx; py = busY + (wY + 6 - busY) * sProj;
        } else if (sQKV > 0 && sQKV < 1) {
          show = true;
          const wxs = [Qx, Kx, Vx];
          const wx = wxs[Math.floor(sQKV * 3) % 3];
          px = wx; py = wY + 7 + (qkvY - 6 - (wY + 7)) * sQKV;
        }
        if (!show) return null;
        return (
          <g>
            <circle cx={px} cy={py} r="3.5" fill="var(--accent)" opacity="0.55"/>
            <circle cx={px} cy={py} r="1.6" fill="var(--accent)"/>
          </g>
        );
      })()}
    </svg>
  );
};

const ARCH_SLIDES = [
  { id: "FFN", name: "Feed-forward",
    desc: "Every neuron in layer L connects to every neuron in L+1. The baseline against which every other deep architecture is measured.",
    Comp: ArchFFN,
    colab: "https://colab.research.google.com/" },
  { id: "CNN", name: "Convolutional",
    desc: "A small kernel slides across the input; weights are shared across positions. Built for signals with spatial structure: images, spectrograms, retinal scans.",
    Comp: ArchCNN,
    colab: "https://colab.research.google.com/" },
  { id: "RNN", name: "Recurrent",
    desc: "A hidden state carries information forward, one step at a time. Designed for sequences: speech, language, time-series signals.",
    Comp: ArchRNN,
    colab: "https://colab.research.google.com/" },
  { id: "GNN", name: "Graph",
    desc: "Each node aggregates messages from its neighbours. Models data with no fixed grid: molecules, social networks, irregular sensor layouts.",
    Comp: ArchGNN,
    colab: "https://colab.research.google.com/" },
  { id: "TFM", name: "Transformer",
    desc: "Every token attends to every other through Q · Kᵀ · V. The architecture under modern LLMs, ViTs and protein-structure models.",
    Comp: ArchTransformer,
    colab: "https://colab.research.google.com/" },
];

const ARCH_DUR_MS = 5200;

const ArchSlideshow = () => {
  const [idx, setIdx] = useState(0);
  const [cycle, setCycle] = useState(0);
    const unlocked = useUnlockAfterSeen('arch-notebooks-unlocked');
  useEffect(() => {
    const id = setInterval(() => {
      setIdx(i => {
        const next = (i + 1) % ARCH_SLIDES.length;
        if (next === 0) setCycle(c => c + 1);
        return next;
      });
    }, ARCH_DUR_MS);
    return () => clearInterval(id);
  }, []);
  const slide = ARCH_SLIDES[idx];
  const C = slide.Comp;
  return (
    <div className="arch-slide">
      <div className="arch-head">
        <span className="arch-counter">0{idx + 1} / 0{ARCH_SLIDES.length} · Architectures</span>
        {unlocked ? (
          <a className="arch-tag arch-tag-link"
             href={slide.colab}
             target="_blank"
             rel="noreferrer"
             title={`Open ${slide.name} notebook in Colab`}>
            <span>{slide.id}</span>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7"/><path d="M7 7h10v10"/>
            </svg>
          </a>
        ) : (
          <span className="arch-tag arch-tag-locked">
            {slide.id}
          </span>
        )}
      </div>
      <div className="arch-canvas" key={slide.id}>
        <C />
      </div>
      <div className="arch-foot">
        <div className="arch-name">{slide.name}</div>
        <div className="arch-desc">{slide.desc}</div>
      </div>
      <div className="arch-dots">
        {ARCH_SLIDES.map((s, i) => (
          <button key={s.id}
                  className={"arch-dot" + (i === idx ? " active" : i < idx ? " done" : "")}
                  onClick={() => setIdx(i)}
                  aria-label={s.name}>
            <span className="arch-dot-fill" key={`f-${idx}-${cycle}-${i}`}/>
          </button>
        ))}
      </div>
    </div>
  );
};


/* ── shared "site has been seen" trigger ────────────────────────────── */
const useUnlockAfterSeen = (storageKey) => {
  const [unlocked, setUnlocked] = useState(
    () => !!sessionStorage.getItem(storageKey)
  );
  useEffect(() => {
    if (unlocked) return;
    const unlock = () => {
      sessionStorage.setItem(storageKey, '1');
      setUnlocked(true);
    };
    const timer = setTimeout(unlock, 60000);
    const onScroll = () => {
      const el = document.getElementById('inference') || document.getElementById('contact');
      if (el && el.getBoundingClientRect().top < window.innerHeight * 0.9) {
        unlock();
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { clearTimeout(timer); window.removeEventListener('scroll', onScroll); };
  }, [unlocked]);
  return unlocked;
};

/* ── Blog-post floating prompt ───────────────────────────────────────── */
const BlogPrompt = () => {
  const triggered = useUnlockAfterSeen('site-seen-blog');
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    if (triggered && !sessionStorage.getItem('blog-prompt-dismissed') && !sessionStorage.getItem('site-seen-blog-shown')) {
      // small delay so it doesn't flash on first render
      const t = setTimeout(() => setVisible(true), 400);
      sessionStorage.setItem('site-seen-blog-shown', '1');
      return () => clearTimeout(t);
    }
  }, [triggered]);
  const dismiss = (e) => {
    e && e.stopPropagation();
    setVisible(false);
    setExpanded(false);
    sessionStorage.setItem('blog-prompt-dismissed', '1');
  };
  if (!visible) return null;
  return (
    <div className={"blog-prompt" + (expanded ? " blog-prompt-expanded" : "")}>
      {!expanded ? (
        <div className="blog-pill" role="button" tabIndex={0}
             onClick={() => setExpanded(true)}
             onKeyDown={e => e.key === 'Enter' && setExpanded(true)}>
          <span className="blog-pill-dot"></span>
          <span>Field notes</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>
          </svg>
          <span className="bp-dismiss" role="button" tabIndex={0}
                onClick={dismiss} onKeyDown={e => e.key === 'Enter' && dismiss(e)}
                aria-label="Dismiss">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </span>
        </div>
      ) : (
        <div className="blog-pane">
          <div className="blog-pane-head">
            <span className="blog-pane-title">Field notes</span>
            <button className="bp-dismiss" onClick={dismiss} aria-label="Close">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <p className="blog-pane-sub">Inference-time notes from the research.</p>
          <div className="blog-pane-list">
            {DATA.blogs.map((b, i) => (
              <a key={i} className="blog-pane-item" href="#inference">
                <span className="bpi-slot">{b.slot}</span>
                <span className="bpi-title">{b.title}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>
                </svg>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const HERO_TAGLINES = [
  {
    eyebrow: "Practice",
    body: "Specialising in steganography, one-shot learning and neural-network-based signal modeling, with applied work in healthcare computer vision and 3D electronic integration."
  },
  {
    eyebrow: "Question",
    body: "What limits fully-connected networks from generalising in complex scientific domains, despite their expressive power, and what architectures break past those limits?"
  },
  {
    eyebrow: "Direction",
    body: "Few-shot learning, modular architectures and Neural ODEs, towards models that are data-efficient, interpretable and grounded in real mathematics."
  },
];

const RotatingTag = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % HERO_TAGLINES.length), 6200);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="hero-tag-wrap" aria-live="polite">
      {HERO_TAGLINES.map((tag, i) => (
        <div key={i} className={"hero-tag" + (i === idx ? " in" : "")}>
          <span className="hero-tag-lbl">{tag.eyebrow}</span>
          <p>{tag.body}</p>
        </div>
      ))}
      <div className="hero-tag-dots">
        {HERO_TAGLINES.map((_, i) => (
          <button key={i}
                  className={"htd" + (i === idx ? " active" : "")}
                  onClick={() => setIdx(i)}
                  aria-label={`Show tagline ${i+1}`}/>
        ))}
      </div>
    </div>
  );
};

const Hero = () => (
  <section className="hero" id="top">
    <div className="wrap hero-grid">
      <div className="hero-left">
        <div className="hero-meta">
          <span className="pulse"></span>
          <span>Open to research roles · 2026</span>
        </div>
        <h1>
          Deep learning,<br/>
          built for the <em>edges</em><br/>
          of the signal.
        </h1>
        <RotatingTag />
        <div className="hero-cta-row">
          <a className="btn primary" href="#research">
            View research <span className="arrow"><Icon name="arrow" /></span>
          </a>
          <a className="btn" href="uploads/resume.pdf" target="_blank" rel="noreferrer">
            <Icon name="download" /> Resume
          </a>
        </div>
      </div>
      <ArchSlideshow />
    </div>
  </section>
);


/* ── about (phase 01 · DATA) ─────────────────────────────────────────── */
const About = () => {
  const p = DATA.phases[0];
  return (
    <section id={p.id} style={{ "--phase": `oklch(78% 0.13 ${p.hue})` }}>
      <PhaseBackdrop kind={p.id} />
      <div className="wrap">
        <PhaseHead phase={p} title="The inputs to my work."
          sub="A short read on the person, the training, and the kind of problems that drew me in." />
        <div className="about-grid">
          <div>
            <p className="sec-sub" style={{ marginTop: 0 }}>
              {DATA.education.deg}, {DATA.education.school}. {DATA.education.minor}.
            </p>
            <div className="stats">
              {DATA.stats.map(s => (
                <div className="stat" key={s.l}>
                  <span className="n">{s.n}</span>
                  <span className="l">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="about-body">
            {DATA.about.map((para, i) => <p key={i}>{para}</p>)}
            <div className="data-links">
              <a className="data-link" href={DATA.github} target="_blank" rel="noreferrer">
                <Icon name="github" size={18} />
                <span>GitHub</span>
              </a>
              <a className="data-link" href={DATA.linkedin} target="_blank" rel="noreferrer">
                <Icon name="linkedin" size={18} />
                <span>LinkedIn</span>
              </a>
              <a className="data-link" href={DATA.scholar} target="_blank" rel="noreferrer">
                <Icon name="scholar" size={18} />
                <span>Scholar</span>
              </a>
              <a className="data-link" href={"mailto:" + DATA.email}>
                <Icon name="mail" size={18} />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── experience (phase 02 · PREPROCESSING) ──────────────────────────── */
const Experience = () => {
  const p = DATA.phases[1];
  return (
    <section id={p.id} style={{ "--phase": `oklch(78% 0.13 ${p.hue})` }}>
      <PhaseBackdrop kind={p.id} />
      <div className="wrap">
        <PhaseHead phase={p} title="Where the work was shaped." />
        <div className="exp-list">
          {DATA.experience.map((e, i) => (
            <article className="exp-item" key={i}>
              <div className="exp-date">{e.date}</div>
              <div>
                {e.roleLink
                  ? <a className="exp-role lnk" href={e.roleLink} target="_blank" rel="noreferrer">{e.role}<Ext/></a>
                  : <h3 className="exp-role">{e.role}</h3>}
                <div className="exp-co">
                  {e.coLink
                    ? <a className="lnk" href={e.coLink} target="_blank" rel="noreferrer">{e.co}<Ext/></a>
                    : e.co}
                  <span>{e.loc}</span>
                </div>
                <ul className="exp-bullets">
                  {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
              <div className="exp-tags">
                {e.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── research (phase 03 · ARCHITECTURE) ─────────────────────────────── */
const Research = () => {
  const [tab, setTab] = useState("journals");
  const p = DATA.phases[2];
  const items = tab === "journals" ? DATA.journals : DATA.conferences;
  return (
    <section id={p.id} style={{ "--phase": `oklch(78% 0.13 ${p.hue})` }}>
      <PhaseBackdrop kind={p.id} />
      <div className="wrap">
        <PhaseHead phase={p} title="Nine papers. Six venues. One throughline."
          sub="Steganography, signal-integrity in 3D integration, adversarial robustness, and graph neural networks for healthcare." />
        <div className="tabs" role="tablist">
          <button className={"tab" + (tab === "journals" ? " active" : "")}
            onClick={() => setTab("journals")} role="tab" aria-selected={tab === "journals"}>
            Journals · {DATA.journals.length}
          </button>
          <button className={"tab" + (tab === "conferences" ? " active" : "")}
            onClick={() => setTab("conferences")} role="tab" aria-selected={tab === "conferences"}>
            Conferences · {DATA.conferences.length}
          </button>
        </div>
        <div className="pub-list">
          {items.map((pub, i) => (
            <article className="pub" key={pub.title}>
              <div className="pub-num">{String(i + 1).padStart(2, "0")}</div>
              <div>
                {pub.link
                  ? <a className="pub-title lnk" href={pub.link} target="_blank" rel="noreferrer">{pub.title}<Ext/></a>
                  : <h3 className="pub-title">{pub.title}</h3>}
                <div className="pub-venue">{pub.venue} · {pub.authors}</div>
              </div>
              <div className={"pub-status " + pub.kind}>{pub.status}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── projects (phase 04 · LOSS) ─────────────────────────────────────── */
const Projects = () => {
  const p = DATA.phases[3];
  return (
    <section id={p.id} style={{ "--phase": `oklch(78% 0.13 ${p.hue})` }}>
      <PhaseBackdrop kind={p.id} />
      <div className="wrap">
        <PhaseHead phase={p} title="Selected work, outside of papers."
          sub="Side projects where the loss surface mattered more than the writeup." />
        <div className="proj-grid">
          {DATA.projects.map(pr => (
            <a className="proj proj-card-link"
               key={pr.title}
               href={pr.link}
               target="_blank"
               rel="noreferrer">
              <div className="proj-head">
                <span className="proj-mark">{pr.mark}</span>
                <span className="proj-icon"><Icon name={pr.icon} size={14}/></span>
              </div>
              <h3>{pr.title}</h3>
              <p>{pr.body}</p>
              <div className="proj-date">
                <span>{pr.date}</span>
                <span className="proj-link-cue">View on GitHub <Icon name="external" size={11}/></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── skills (phase 05 · OPTIMIZER) ──────────────────────────────────── */
const Skills = () => {
  const p = DATA.phases[4];
  return (
    <section id={p.id} style={{ "--phase": `oklch(78% 0.13 ${p.hue})` }}>
      <PhaseBackdrop kind={p.id} />
      <div className="wrap">
        <PhaseHead phase={p} title="The gradient I follow."
          sub="Tools and frameworks I reach for when shipping research code or putting models into production." />
        <div className="skills-grid">
          {DATA.skills.map(g => (
            <div className="skill-group" key={g.group}>
              <h4>{g.group}</h4>
              <ul className="skill-list">
                {g.items.map(s => <li key={s}>{s}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── achievements (phase 06 · TRAINING) ─────────────────────────────── */
const Achievements = () => {
  const p = DATA.phases[5];
  return (
    <section id={p.id} style={{ "--phase": `oklch(78% 0.13 ${p.hue})` }}>
      <PhaseBackdrop kind={p.id} />
      <div className="wrap">
        <PhaseHead phase={p} title="Convergence — talks, wins and teams led."
          sub="Things that didn't fit into a paper or an internship — but they shaped the run." />
        <div className="ach-list">
          {DATA.achievements.map((a, i) => (
            <div className="ach" key={i}>
              <div className="ach-num">{String(i + 1).padStart(2, "0")}</div>
              {a.link ? (
                <a className="ach-body ach-link" href={a.link} target="_blank" rel="noreferrer">
                  <span dangerouslySetInnerHTML={{ __html: a.html }} />
                  <Ext />
                </a>
              ) : (
                <div className="ach-body" dangerouslySetInnerHTML={{ __html: a.html }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── inference (phase 07 · BLOG POSTS) ──────────────────────────────── */
const Inference = () => {
  const p = DATA.phases[6];
  return (
    <section id={p.id} style={{ "--phase": `oklch(78% 0.13 ${p.hue})` }}>
      <PhaseBackdrop kind={p.id} />
      <div className="wrap">
        <PhaseHead phase={p} title="Field notes, in progress."
          sub="Short writeups on the questions, dead ends and ideas-in-flight from my research. Inferences from the work, before they become papers." />
        <div className="blog-grid">
          {DATA.blogs.map((b, i) => (
            <article className="blog-card" key={i}>
              <div className="blog-card-rule" aria-hidden="true"></div>
              <div className="blog-head">
                <span className="blog-slot">{b.slot}</span>
                <span className="blog-date">{b.date}</span>
              </div>
              <h3 className="blog-title">{b.title}</h3>
              <p className="blog-excerpt">{b.excerpt}</p>
              <div className="blog-cta">
                <span className="blog-status">
                  <span className="blog-status-dot"></span>
                  Working on it actively
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── contact ─────────────────────────────────────────────────────────── */
const Contact = () => (
  <section id="contact" className="contact">
    <div className="wrap">
      <span className="eyebrow" style={{ justifyContent: "center" }}>Inference · Deploy</span>
      <h2>Let's talk about <em>research</em>.</h2>
      <p>
        Open to research positions, collaborations, and conversations with anyone
        building careful systems on top of deep learning.
      </p>
      <div className="contact-grid">
        <a className="contact-row" href={"mailto:" + DATA.email}>
          <span className="k">Email</span>
          <span className="v">{DATA.email}</span>
        </a>
        <a className="contact-row" href={"tel:" + DATA.phone.replace(/\s/g,"")}>
          <span className="k">Phone</span>
          <span className="v">{DATA.phone}</span>
        </a>
        <div className="contact-row">
          <span className="k">Based in</span>
          <span className="v">{DATA.location}</span>
        </div>
      </div>
      <div className="socials">
        <a className="social" href={DATA.scholar}  target="_blank" rel="noreferrer" aria-label="Google Scholar"><Icon name="scholar" size={18}/></a>
        <a className="social" href={DATA.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" size={18}/></a>
        <a className="social" href={DATA.github}   target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" size={18}/></a>
        <a className="social" href={DATA.website}  target="_blank" rel="noreferrer" aria-label="Portfolio"><Icon name="globe" size={18}/></a>
        <a className="social" href={"mailto:" + DATA.email} aria-label="Email"><Icon name="mail" size={18}/></a>
      </div>
      <div className="foot">
        <span>© 2026 {DATA.name} · All rights reserved</span>
        <span>Built with care, not noise.</span>
      </div>
    </div>
  </section>
);

/* ── app ─────────────────────────────────────────────────────────────── */
const App = () => (
  <React.Fragment>
    <Nav />
    <Rail />
    <BlogPrompt />
    <Hero />
    <About />
    <Experience />
    <Research />
    <Projects />
    <Skills />
    <Achievements />
    <Inference />
    <Contact />
  </React.Fragment>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

/* reveal on scroll */
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.08 });
    document.querySelectorAll("section").forEach(s => {
      s.classList.add("reveal");
      io.observe(s);
    });
  }, 200);
});
