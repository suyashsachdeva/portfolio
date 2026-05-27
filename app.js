const {
  useState,
  useEffect,
  useRef,
  useMemo
} = React;
const Icon = ({
  name,
  size = 16
}) => {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  const paths = {
    arrow: React.createElement(React.Fragment, null, React.createElement("path", {
      d: "M5 12h14"
    }), React.createElement("path", {
      d: "m13 6 6 6-6 6"
    })),
    download: React.createElement(React.Fragment, null, React.createElement("path", {
      d: "M12 3v12"
    }), React.createElement("path", {
      d: "m7 10 5 5 5-5"
    }), React.createElement("path", {
      d: "M5 21h14"
    })),
    mail: React.createElement(React.Fragment, null, React.createElement("rect", {
      x: "3",
      y: "5",
      width: "18",
      height: "14",
      rx: "2"
    }), React.createElement("path", {
      d: "m3 7 9 6 9-6"
    })),
    github: React.createElement("path", {
      d: "M9 19c-4 1.5-4-2-6-2.5M15 22v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 5.77 5.07 5.07 0 0 0 18.91 2S17.73 1.65 15 3.48a13.38 13.38 0 0 0-7 0C5.27 1.65 4.09 2 4.09 2A5.07 5.07 0 0 0 4 5.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 19.13V22"
    }),
    linkedin: React.createElement(React.Fragment, null, React.createElement("path", {
      d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"
    }), React.createElement("rect", {
      x: "2",
      y: "9",
      width: "4",
      height: "12"
    }), React.createElement("circle", {
      cx: "4",
      cy: "4",
      r: "2"
    })),
    scholar: React.createElement(React.Fragment, null, React.createElement("path", {
      d: "M2 8 12 3l10 5-10 5L2 8z"
    }), React.createElement("path", {
      d: "M6 11v5c0 2 3 3 6 3s6-1 6-3v-5"
    })),
    phone: React.createElement("path", {
      d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
    }),
    location: React.createElement(React.Fragment, null, React.createElement("path", {
      d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
    }), React.createElement("circle", {
      cx: "12",
      cy: "10",
      r: "3"
    })),
    eye: React.createElement(React.Fragment, null, React.createElement("path", {
      d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"
    }), React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "3"
    })),
    shield: React.createElement("path", {
      d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
    }),
    book: React.createElement(React.Fragment, null, React.createElement("path", {
      d: "M4 19.5V5a2 2 0 0 1 2-2h13v18H6.5a2.5 2.5 0 0 1 0-5H19"
    })),
    external: React.createElement(React.Fragment, null, React.createElement("path", {
      d: "M7 17 17 7"
    }), React.createElement("path", {
      d: "M7 7h10v10"
    })),
    globe: React.createElement(React.Fragment, null, React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), React.createElement("path", {
      d: "M2 12h20M12 2c3 3 4.5 6.5 4.5 10S15 19 12 22c-3-3-4.5-6.5-4.5-10S9 5 12 2z"
    }))
  };
  return React.createElement("svg", props, paths[name]);
};
const Ext = ({
  size = 11
}) => React.createElement("span", {
  className: "ext"
}, React.createElement(Icon, {
  name: "external",
  size: size
}));
const Lnk = ({
  href,
  children,
  className = "",
  showExt = true
}) => href ? React.createElement("a", {
  className: "lnk " + className,
  href: href,
  target: "_blank",
  rel: "noreferrer"
}, children, showExt && React.createElement(Ext, null)) : React.createElement("span", {
  className: className
}, children);
const __frameTickers = new Set();
let __frameRaf = null;
let __frameStart = 0;
const __frameLoop = () => {
  const now = (performance.now() - __frameStart) / 1000;
  for (const cb of __frameTickers) cb(now);
  __frameRaf = requestAnimationFrame(__frameLoop);
};
const __frameSubscribe = cb => {
  if (__frameTickers.size === 0) {
    __frameStart = performance.now();
    __frameRaf = requestAnimationFrame(__frameLoop);
  }
  __frameTickers.add(cb);
  return () => {
    __frameTickers.delete(cb);
    if (__frameTickers.size === 0 && __frameRaf) {
      cancelAnimationFrame(__frameRaf);
      __frameRaf = null;
    }
  };
};
const useFrame = () => {
  const [t, setT] = useState(0);
  useEffect(() => __frameSubscribe(setT), []);
  return t;
};
const useDelayedMount = delay => {
  const [ready, setReady] = useState(delay === 0);
  useEffect(() => {
    if (delay === 0) return;
    const id = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(id);
  }, [delay]);
  return ready;
};
const useInViewMount = (ref, {
  rootMargin = "300px",
  delay = 0,
  fallback = 1800
} = {}) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    let timeoutId, fallbackId;
    const trigger = () => {
      if (delay > 0) timeoutId = setTimeout(() => setInView(true), delay);else setInView(true);
    };
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        trigger();
        io.disconnect();
        if (fallbackId) clearTimeout(fallbackId);
      }
    }, {
      rootMargin
    });
    io.observe(ref.current);
    fallbackId = setTimeout(() => {
      trigger();
      io.disconnect();
    }, fallback);
    return () => {
      io.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
      if (fallbackId) clearTimeout(fallbackId);
    };
  }, [ref, rootMargin, delay, fallback]);
  return inView;
};
const GLYPH_W = 200,
  GLYPH_H = 100;
const monoStack = '"Geist Mono", ui-monospace, monospace';
const GlyphData = () => {
  const clusters = useMemo(() => [{
    cx: 42,
    cy: 30,
    n: 7,
    jitter: 9,
    filled: true
  }, {
    cx: 105,
    cy: 22,
    n: 7,
    jitter: 8,
    filled: false
  }, {
    cx: 68,
    cy: 66,
    n: 7,
    jitter: 9,
    filled: true
  }, {
    cx: 152,
    cy: 58,
    n: 7,
    jitter: 9,
    filled: false
  }], []);
  const pts = useMemo(() => clusters.flatMap((c, ci) => Array.from({
    length: c.n
  }, () => ({
    cx: c.cx + (Math.random() - 0.5) * c.jitter * 2,
    cy: c.cy + (Math.random() - 0.5) * c.jitter * 2,
    r: 1.6 + Math.random() * 0.7,
    period: 1.8 + Math.random() * 2.4,
    phase: Math.random() * Math.PI * 2,
    base: 0.4 + Math.random() * 0.4,
    filled: c.filled
  }))), [clusters]);
  const t = useFrame();
  return React.createElement("svg", {
    viewBox: `0 0 ${GLYPH_W} ${GLYPH_H}`
  }, React.createElement("line", {
    x1: "12",
    y1: "88",
    x2: GLYPH_W - 6,
    y2: "88",
    stroke: "currentColor",
    strokeOpacity: "0.85",
    strokeWidth: "1.1"
  }), React.createElement("line", {
    x1: "12",
    y1: "88",
    x2: "12",
    y2: "6",
    stroke: "currentColor",
    strokeOpacity: "0.85",
    strokeWidth: "1.1"
  }), React.createElement("path", {
    d: `M${GLYPH_W - 6} 88 l-4 -2.5 v5 z`,
    fill: "currentColor",
    opacity: "0.85"
  }), React.createElement("path", {
    d: "M12 6 l-2.5 4 h5 z",
    fill: "currentColor",
    opacity: "0.85"
  }), [35, 60, 85, 110, 135, 160, 185].map(x => React.createElement("line", {
    key: "tx" + x,
    x1: x,
    y1: "88",
    x2: x,
    y2: "91",
    stroke: "currentColor",
    strokeOpacity: "0.55",
    strokeWidth: "0.7"
  })), [20, 40, 60].map(y => React.createElement("line", {
    key: "ty" + y,
    x1: "12",
    y1: y,
    x2: "9",
    y2: y,
    stroke: "currentColor",
    strokeOpacity: "0.55",
    strokeWidth: "0.7"
  })), clusters.map((c, i) => React.createElement("circle", {
    key: "h" + i,
    cx: c.cx,
    cy: c.cy,
    r: c.jitter * 1.6,
    fill: "none",
    stroke: "currentColor",
    strokeOpacity: "0.12",
    strokeWidth: "0.7",
    strokeDasharray: "2 2"
  })), pts.map((p, i) => {
    const a = p.base + 0.4 * Math.sin(t * 2 * Math.PI / p.period + p.phase);
    const op = Math.max(0.2, Math.min(0.95, a));
    return p.filled ? React.createElement("circle", {
      key: i,
      cx: p.cx,
      cy: p.cy,
      r: p.r,
      fill: "currentColor",
      opacity: op
    }) : React.createElement("circle", {
      key: i,
      cx: p.cx,
      cy: p.cy,
      r: p.r,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.1",
      opacity: op
    });
  }), React.createElement("text", {
    x: GLYPH_W - 6,
    y: GLYPH_H - 4,
    textAnchor: "end",
    fontFamily: monoStack,
    fontSize: "6.5",
    fill: "currentColor",
    opacity: "0.55",
    letterSpacing: "0.18em"
  }, "X \u2192 \u211D\u207F"));
};
const GlyphPreproc = () => {
  const N = 10;
  const raws = useMemo(() => Array.from({
    length: N
  }, () => 6 + Math.random() * 52), []);
  const t = useFrame();
  const phase = (Math.sin(t * 0.65) + 1) / 2;
  const meanY = 50 - phase * 18 + (1 - phase) * 0;
  return React.createElement("svg", {
    viewBox: `0 0 ${GLYPH_W} ${GLYPH_H}`
  }, React.createElement("line", {
    x1: "14",
    y1: "84",
    x2: GLYPH_W - 10,
    y2: "84",
    stroke: "currentColor",
    strokeOpacity: "0.3",
    strokeWidth: "0.8"
  }), raws.map((h, i) => {
    const tgt = 28 + 8 * Math.sin(i * 0.7 + t * 0.5);
    const cur = h * (1 - phase) + tgt * phase;
    const x = 22 + i * 17;
    const y = 84 - cur;
    return React.createElement("g", {
      key: i
    }, React.createElement("rect", {
      x: x,
      y: y,
      width: "11",
      height: cur,
      rx: "0.5",
      fill: "currentColor",
      opacity: 0.3 + phase * 0.15
    }), React.createElement("rect", {
      x: x,
      y: y,
      width: "11",
      height: "2",
      fill: "currentColor",
      opacity: "0.9"
    }));
  }), React.createElement("line", {
    x1: "14",
    y1: 84 - (28 + phase * 6),
    x2: GLYPH_W - 10,
    y2: 84 - (28 + phase * 6),
    stroke: "currentColor",
    strokeWidth: "0.6",
    strokeDasharray: "3 3",
    opacity: 0.25 + phase * 0.5
  }), React.createElement("text", {
    x: GLYPH_W - 6,
    y: GLYPH_H - 4,
    textAnchor: "end",
    fontFamily: monoStack,
    fontSize: "6.5",
    fill: "currentColor",
    opacity: "0.55",
    letterSpacing: "0.18em"
  }, "x\u0302 = (x \u2212 \xB5) / \u03C3"));
};
const GlyphArch = () => {
  const t = useFrame();
  const centers = useMemo(() => [{
    ix: 32,
    iy: 30,
    ox: 152,
    oy: 18,
    cls: 0
  }, {
    ix: 50,
    iy: 60,
    ox: 152,
    oy: 38,
    cls: 1
  }, {
    ix: 30,
    iy: 64,
    ox: 152,
    oy: 58,
    cls: 2
  }, {
    ix: 52,
    iy: 28,
    ox: 152,
    oy: 78,
    cls: 3
  }], []);
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
  return React.createElement("svg", {
    viewBox: `0 0 ${GLYPH_W} ${GLYPH_H}`
  }, React.createElement("line", {
    x1: "14",
    y1: "86",
    x2: "76",
    y2: "86",
    stroke: "currentColor",
    strokeOpacity: "0.7",
    strokeWidth: "0.9"
  }), React.createElement("line", {
    x1: "14",
    y1: "86",
    x2: "14",
    y2: "14",
    stroke: "currentColor",
    strokeOpacity: "0.7",
    strokeWidth: "0.9"
  }), React.createElement("line", {
    x1: "134",
    y1: "86",
    x2: GLYPH_W - 8,
    y2: "86",
    stroke: "currentColor",
    strokeOpacity: "0.7",
    strokeWidth: "0.9"
  }), React.createElement("line", {
    x1: "134",
    y1: "86",
    x2: "134",
    y2: "14",
    stroke: "currentColor",
    strokeOpacity: "0.7",
    strokeWidth: "0.9"
  }), React.createElement("g", null, [88, 94, 100, 106, 112, 118, 124, 130].map((x, i) => {
    const op = 0.18 + 0.18 * (0.5 + 0.5 * Math.sin(t * 1.8 + i * 0.55));
    return React.createElement("line", {
      key: "w" + i,
      x1: x,
      y1: "14",
      x2: x,
      y2: "86",
      stroke: "currentColor",
      strokeWidth: "0.7",
      opacity: op
    });
  }), React.createElement("text", {
    x: "109",
    y: "10",
    textAnchor: "middle",
    fontFamily: monoStack,
    fontSize: "5.4",
    fill: "currentColor",
    opacity: "0.7",
    letterSpacing: "0.14em"
  }, "W \xB7 x + b")), pts.map((p, i) => {
    const period = 6.5;
    const local = (t + p.off * period) % period / period;
    let x, y;
    if (local < 0.30) {
      x = p.ix;
      y = p.iy;
    } else if (local < 0.65) {
      const u = (local - 0.30) / 0.35;
      const eu = u * u * (3 - 2 * u);
      x = p.ix + (p.ox - p.ix) * eu;
      y = p.iy + (p.oy - p.iy) * eu;
    } else {
      x = p.ox;
      y = p.oy;
    }
    const stroked = p.cls % 2 === 1;
    return stroked ? React.createElement("circle", {
      key: i,
      cx: x,
      cy: y,
      r: "1.8",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.1",
      opacity: "0.85"
    }) : React.createElement("circle", {
      key: i,
      cx: x,
      cy: y,
      r: "1.8",
      fill: "currentColor",
      opacity: "0.85"
    });
  }), React.createElement("text", {
    x: "45",
    y: GLYPH_H - 4,
    textAnchor: "middle",
    fontFamily: monoStack,
    fontSize: "5.6",
    fill: "currentColor",
    opacity: "0.55",
    letterSpacing: "0.18em"
  }, "INPUT"), React.createElement("text", {
    x: GLYPH_W - 28,
    y: GLYPH_H - 4,
    textAnchor: "middle",
    fontFamily: monoStack,
    fontSize: "5.6",
    fill: "currentColor",
    opacity: "0.55",
    letterSpacing: "0.18em"
  }, "EMBED"));
};
const GlyphLoss = () => {
  const t = useFrame();
  const layers = useMemo(() => [{
    x: 32,
    n: 3
  }, {
    x: GLYPH_W / 2,
    n: 2
  }, {
    x: GLYPH_W - 32,
    n: 3
  }], []);
  const nodeY = (li, i) => {
    const n = layers[li].n;
    const gap = 22;
    const startY = 50 - (n - 1) * gap / 2;
    return startY + i * gap;
  };
  const period = 5.2;
  const cycle = Math.floor(t / period);
  const s = t % period / period;
  const rand = () => {
    const v = Math.random() * 1.8 - 0.9;
    return (v >= 0 ? "+" : "−") + Math.abs(v).toFixed(2);
  };
  const newSet = () => layers.map(L => Array.from({
    length: L.n
  }, rand));
  const valsRef = useRef(null);
  if (!valsRef.current) {
    valsRef.current = {
      cycle,
      prev: newSet(),
      curr: newSet()
    };
  } else if (valsRef.current.cycle !== cycle) {
    valsRef.current = {
      cycle,
      prev: valsRef.current.curr,
      curr: newSet()
    };
  }
  const {
    prev,
    curr
  } = valsRef.current;
  const bpActive = s >= 0.20 && s <= 0.78;
  const bpU = Math.max(0, Math.min(1, (s - 0.20) / 0.55));
  const bpX = layers[2].x + (layers[0].x - layers[2].x) * bpU;
  const thresh = [0.70, 0.45, 0.22];
  const layerCrossed = li => s >= thresh[li];
  const freshness = li => Math.max(0, Math.min(1, 1 - (s - thresh[li]) * 6));
  return React.createElement("svg", {
    viewBox: `0 0 ${GLYPH_W} ${GLYPH_H}`
  }, layers.slice(0, -1).map((L, li) => {
    const R = layers[li + 1];
    const lines = [];
    for (let i = 0; i < L.n; i++) {
      for (let j = 0; j < R.n; j++) {
        const x1 = L.x,
          y1 = nodeY(li, i);
        const x2 = R.x,
          y2 = nodeY(li + 1, j);
        const fL = freshness(li + 1);
        const op = 0.22 + 0.45 * fL;
        lines.push(React.createElement("line", {
          key: `e-${li}-${i}-${j}`,
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
          stroke: "currentColor",
          strokeWidth: 0.7 + fL * 0.5,
          opacity: op
        }));
      }
    }
    return React.createElement("g", {
      key: "L" + li
    }, lines);
  }), bpActive && React.createElement("g", null, React.createElement("line", {
    x1: bpX,
    y1: "12",
    x2: bpX,
    y2: GLYPH_H - 16,
    stroke: "currentColor",
    strokeWidth: "6",
    opacity: "0.18"
  }), React.createElement("line", {
    x1: bpX,
    y1: "12",
    x2: bpX,
    y2: GLYPH_H - 16,
    stroke: "currentColor",
    strokeWidth: "1.4",
    opacity: "0.95"
  }), React.createElement("text", {
    x: bpX,
    y: "9",
    textAnchor: "middle",
    fontFamily: monoStack,
    fontSize: "6",
    fill: "currentColor",
    opacity: "0.95"
  }, "\u2202\u2112"), React.createElement("path", {
    d: `M${bpX - 4} ${GLYPH_H - 16} L${bpX} ${GLYPH_H - 12} L${bpX + 4} ${GLYPH_H - 16} Z`,
    fill: "currentColor",
    opacity: "0.9"
  })), layers.map((L, li) => Array.from({
    length: L.n
  }).map((_, i) => {
    const x = L.x,
      y = nodeY(li, i);
    const show = layerCrossed(li);
    const v = show ? curr[li][i] : prev[li][i];
    const fr = show ? freshness(li) : 0;
    return React.createElement("g", {
      key: `n-${li}-${i}`
    }, fr > 0 && React.createElement("circle", {
      cx: x,
      cy: y,
      r: 10 + fr * 3,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "0.7",
      opacity: fr * 0.5
    }), React.createElement("circle", {
      cx: x,
      cy: y,
      r: 9,
      fill: "var(--bg-card, #16182a)",
      stroke: "currentColor",
      strokeWidth: 1 + fr * 0.5,
      opacity: "0.95"
    }), React.createElement("text", {
      x: x,
      y: y + 2.4,
      textAnchor: "middle",
      fontFamily: monoStack,
      fontSize: "5.6",
      fill: "currentColor",
      opacity: "0.95"
    }, v));
  })), React.createElement("text", {
    x: GLYPH_W - 6,
    y: GLYPH_H - 4,
    textAnchor: "end",
    fontFamily: monoStack,
    fontSize: "6.5",
    fill: "currentColor",
    opacity: "0.55",
    letterSpacing: "0.18em"
  }, "\u03B8 \u2190 \u03B8 \u2212 \u03B7 \u2202\u2112/\u2202\u03B8"));
};
const GlyphOpt = () => {
  const t = useFrame();
  const rows = 5,
    cols = 11;
  const cx = GLYPH_W / 2,
    cy = GLYPH_H / 2;
  const angle = Math.sin(t * 0.25) * 0.55;
  const ca = Math.cos(angle),
    sa = Math.sin(angle);
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
  const pj = (Math.sin(t * 0.45) + 1) / 2 * (cols - 1);
  const pi = (Math.cos(t * 0.35) + 1) / 2 * (rows - 1);
  const jLo = Math.floor(pj),
    jHi = Math.min(cols - 1, jLo + 1);
  const iLo = Math.floor(pi),
    iHi = Math.min(rows - 1, iLo + 1);
  const fj = pj - jLo,
    fi = pi - iLo;
  const l2 = (a, b, f) => [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
  const top = l2(pts[iLo][jLo], pts[iLo][jHi], fj);
  const bot = l2(pts[iHi][jLo], pts[iHi][jHi], fj);
  const dot = l2(top, bot, fi);
  return React.createElement("svg", {
    viewBox: `0 0 ${GLYPH_W} ${GLYPH_H}`
  }, pts.map((row, i) => {
    const d = row.map((p, j) => (j === 0 ? "M" : "L") + p[0] + " " + p[1]).join(" ");
    return React.createElement("path", {
      key: "r" + i,
      d: d,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "0.55",
      opacity: 0.18 + i * 0.08
    });
  }), Array.from({
    length: cols
  }).map((_, j) => {
    const d = pts.map((row, i) => (i === 0 ? "M" : "L") + row[j][0] + " " + row[j][1]).join(" ");
    return React.createElement("path", {
      key: "c" + j,
      d: d,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "0.45",
      opacity: 0.12 + j * 0.02
    });
  }), React.createElement("circle", {
    cx: dot[0],
    cy: dot[1],
    r: "2.6",
    fill: "currentColor"
  }), React.createElement("circle", {
    cx: dot[0],
    cy: dot[1],
    r: "5.5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "0.6",
    opacity: "0.5"
  }), React.createElement("text", {
    x: GLYPH_W - 6,
    y: GLYPH_H - 4,
    textAnchor: "end",
    fontFamily: monoStack,
    fontSize: "6.5",
    fill: "currentColor",
    opacity: "0.55",
    letterSpacing: "0.18em"
  }, "\u2212\u2207\u2112 on \u2133"));
};
const GlyphTrain = () => {
  const t = useFrame();
  const cycle = 6.0;
  const u = t % cycle / cycle;
  const epochs = Math.round(u * 100);
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
  const val = points(2.9, 1.0);
  const toPath = pts => pts.map((p, i) => (i === 0 ? "M" : "L") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const trainHead = train.length ? train[train.length - 1] : null;
  const valHead = val.length ? val[val.length - 1] : null;
  return React.createElement("svg", {
    viewBox: `0 0 ${GLYPH_W} ${GLYPH_H}`
  }, React.createElement("line", {
    x1: "14",
    y1: "84",
    x2: GLYPH_W - 10,
    y2: "84",
    stroke: "currentColor",
    strokeOpacity: "0.3",
    strokeWidth: "0.8"
  }), React.createElement("line", {
    x1: "14",
    y1: "84",
    x2: "14",
    y2: "10",
    stroke: "currentColor",
    strokeOpacity: "0.3",
    strokeWidth: "0.8"
  }), React.createElement("path", {
    d: toPath(train),
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }), React.createElement("path", {
    d: toPath(val),
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1",
    strokeDasharray: "3 3",
    opacity: "0.7"
  }), trainHead && React.createElement("circle", {
    cx: trainHead[0],
    cy: trainHead[1],
    r: "2",
    fill: "currentColor"
  }), valHead && React.createElement("circle", {
    cx: valHead[0],
    cy: valHead[1],
    r: "1.6",
    fill: "currentColor",
    opacity: "0.6"
  }), React.createElement("g", {
    transform: "translate(105, 14)"
  }, React.createElement("line", {
    x1: "0",
    y1: "0",
    x2: "10",
    y2: "0",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }), React.createElement("text", {
    x: "13",
    y: "2.2",
    fontFamily: monoStack,
    fontSize: "6",
    fill: "currentColor",
    opacity: "0.7"
  }, "train"), React.createElement("line", {
    x1: "40",
    y1: "0",
    x2: "50",
    y2: "0",
    stroke: "currentColor",
    strokeWidth: "1",
    strokeDasharray: "2 2",
    opacity: "0.7"
  }), React.createElement("text", {
    x: "53",
    y: "2.2",
    fontFamily: monoStack,
    fontSize: "6",
    fill: "currentColor",
    opacity: "0.7"
  }, "val")), React.createElement("text", {
    x: GLYPH_W - 6,
    y: GLYPH_H - 4,
    textAnchor: "end",
    fontFamily: monoStack,
    fontSize: "6.5",
    fill: "currentColor",
    opacity: "0.55",
    letterSpacing: "0.18em"
  }, "EPOCH ", String(epochs).padStart(3, "0"), "/100"));
};
const GlyphInference = () => {
  const t = useFrame();
  const period = 3.0;
  const u = t % period / period;
  const outputs = [{
    y: 18,
    label: "0.62"
  }, {
    y: 34,
    label: "0.21"
  }, {
    y: 50,
    label: "0.09"
  }, {
    y: 66,
    label: "0.05"
  }, {
    y: 82,
    label: "0.03"
  }];
  const modelX1 = 60,
    modelX2 = 110;
  const modelY1 = 18,
    modelY2 = 82;
  return React.createElement("svg", {
    viewBox: `0 0 ${GLYPH_W} ${GLYPH_H}`
  }, React.createElement("line", {
    x1: "12",
    y1: "50",
    x2: "55",
    y2: "50",
    stroke: "currentColor",
    strokeWidth: "1.1",
    opacity: 0.85
  }), React.createElement("path", {
    d: "M52 47 L56 50 L52 53 Z",
    fill: "currentColor",
    opacity: "0.9"
  }), React.createElement("text", {
    x: "14",
    y: "44",
    fontFamily: monoStack,
    fontSize: "6.5",
    fill: "currentColor",
    opacity: "0.7"
  }, "x"), React.createElement("rect", {
    x: modelX1,
    y: modelY1,
    width: modelX2 - modelX1,
    height: modelY2 - modelY1,
    rx: "3",
    fill: "var(--bg-card, #16182a)",
    stroke: "currentColor",
    strokeWidth: "1"
  }), React.createElement("text", {
    x: (modelX1 + modelX2) / 2,
    y: "48",
    textAnchor: "middle",
    fontFamily: monoStack,
    fontSize: "7",
    fill: "currentColor"
  }, "f_\u03B8"), React.createElement("text", {
    x: (modelX1 + modelX2) / 2,
    y: "58",
    textAnchor: "middle",
    fontFamily: monoStack,
    fontSize: "5.5",
    fill: "currentColor",
    opacity: "0.55"
  }, "MODEL"), outputs.map((o, i) => {
    const start = i * 0.12;
    const local = Math.max(0, Math.min(1, (u - start) / 0.6));
    const x = modelX2 + 6 + (GLYPH_W - 30 - modelX2) * local;
    return React.createElement("g", {
      key: i
    }, React.createElement("line", {
      x1: modelX2 + 2,
      y1: o.y,
      x2: GLYPH_W - 30,
      y2: o.y,
      stroke: "currentColor",
      strokeWidth: "0.55",
      opacity: "0.35",
      strokeDasharray: "2 3"
    }), React.createElement("circle", {
      cx: x,
      cy: o.y,
      r: "2",
      fill: "currentColor",
      opacity: Math.max(0.15, local * 0.85)
    }), React.createElement("text", {
      x: GLYPH_W - 26,
      y: o.y + 2,
      fontFamily: monoStack,
      fontSize: "6",
      fill: "currentColor",
      opacity: Math.max(0.25, local * 0.85)
    }, o.label));
  }), React.createElement("line", {
    x1: modelX2 + 6,
    y1: outputs[0].y - 3,
    x2: GLYPH_W - 28,
    y2: outputs[0].y - 3,
    stroke: "var(--accent)",
    strokeWidth: "0.5",
    opacity: "0.6"
  }), React.createElement("text", {
    x: GLYPH_W - 6,
    y: GLYPH_H - 4,
    textAnchor: "end",
    fontFamily: monoStack,
    fontSize: "6.5",
    fill: "currentColor",
    opacity: "0.55",
    letterSpacing: "0.18em"
  }, "\u0177 = softmax(f_\u03B8(x))"));
};
const BdInference = () => {
  const t = useFrame();
  const streams = useMemo(() => Array.from({
    length: 18
  }, (_, i) => ({
    y: 60 + Math.random() * (BD_H - 120),
    speed: 36 + Math.random() * 60,
    offset: Math.random() * BD_W,
    op: 0.05 + Math.random() * 0.09
  })), []);
  return React.createElement("svg", {
    className: "bd-svg",
    viewBox: `0 0 ${BD_W} ${BD_H}`,
    preserveAspectRatio: "xMidYMid slice"
  }, React.createElement("line", {
    x1: "180",
    y1: "80",
    x2: "180",
    y2: BD_H - 80,
    stroke: "currentColor",
    strokeWidth: "0.8",
    opacity: "0.18"
  }), streams.map((s, i) => {
    const head = (t * s.speed + s.offset) % (BD_W + 200) - 80;
    return React.createElement("g", {
      key: i,
      opacity: s.op
    }, React.createElement("line", {
      x1: "180",
      y1: s.y,
      x2: BD_W,
      y2: s.y,
      stroke: "currentColor",
      strokeWidth: "0.5",
      strokeDasharray: "6 14",
      strokeDashoffset: -t * s.speed * 0.6
    }), head > 180 && React.createElement("circle", {
      cx: head,
      cy: s.y,
      r: "3",
      fill: "currentColor",
      opacity: "2"
    }));
  }));
};
const Glyphs = {
  about: GlyphData,
  experience: GlyphPreproc,
  research: GlyphArch,
  projects: GlyphLoss,
  skills: GlyphOpt,
  achievements: GlyphTrain,
  inference: GlyphInference
};
const BD_W = 1600,
  BD_H = 600;
const BdData = () => {
  const t = useFrame();
  const pts = useMemo(() => Array.from({
    length: 90
  }, () => ({
    x: Math.random() * BD_W,
    y: Math.random() * BD_H,
    r: 0.7 + Math.random() * 1.8,
    period: 2 + Math.random() * 5,
    phase: Math.random() * Math.PI * 2,
    base: 0.05 + Math.random() * 0.1
  })), []);
  const halos = useMemo(() => Array.from({
    length: 4
  }, () => ({
    x: 200 + Math.random() * (BD_W - 400),
    y: 80 + Math.random() * (BD_H - 160),
    r: 90 + Math.random() * 60
  })), []);
  return React.createElement("svg", {
    className: "bd-svg",
    viewBox: `0 0 ${BD_W} ${BD_H}`,
    preserveAspectRatio: "xMidYMid slice"
  }, halos.map((h, i) => React.createElement("circle", {
    key: "h" + i,
    cx: h.x,
    cy: h.y,
    r: h.r,
    fill: "none",
    stroke: "currentColor",
    strokeOpacity: 0.06,
    strokeWidth: "1",
    strokeDasharray: "4 6"
  })), pts.map((p, i) => {
    const op = p.base + 0.08 * Math.sin(t * 2 * Math.PI / p.period + p.phase);
    return React.createElement("circle", {
      key: i,
      cx: p.x,
      cy: p.y,
      r: p.r,
      fill: "currentColor",
      opacity: Math.max(0.03, op)
    });
  }));
};
const BdPreproc = () => {
  const t = useFrame();
  const lanes = useMemo(() => Array.from({
    length: 9
  }, (_, i) => ({
    y: 40 + i * 65 + (Math.random() - 0.5) * 22,
    speed: 22 + Math.random() * 60,
    offset: Math.random() * BD_W,
    op: 0.05 + Math.random() * 0.09
  })), []);
  return React.createElement("svg", {
    className: "bd-svg",
    viewBox: `0 0 ${BD_W} ${BD_H}`,
    preserveAspectRatio: "xMidYMid slice"
  }, lanes.map((l, i) => {
    const head = (t * l.speed + l.offset) % (BD_W + 200) - 60;
    return React.createElement("g", {
      key: i,
      opacity: l.op
    }, React.createElement("line", {
      x1: "0",
      y1: l.y,
      x2: BD_W,
      y2: l.y,
      stroke: "currentColor",
      strokeWidth: "0.6",
      strokeDasharray: "8 18",
      strokeDashoffset: -t * l.speed * 0.6
    }), React.createElement("circle", {
      cx: head,
      cy: l.y,
      r: "3.5",
      fill: "currentColor",
      opacity: "2"
    }), React.createElement("line", {
      x1: head - 40,
      y1: l.y,
      x2: head,
      y2: l.y,
      stroke: "currentColor",
      strokeWidth: "1.4",
      opacity: "0.8"
    }));
  }));
};
const BdArch = () => {
  const t = useFrame();
  const cols = [220, 540, 860, 1180, 1500];
  const pulses = useMemo(() => Array.from({
    length: 10
  }, () => ({
    y: 60 + Math.random() * (BD_H - 120),
    speed: 0.05 + Math.random() * 0.08,
    offset: Math.random()
  })), []);
  return React.createElement("svg", {
    className: "bd-svg",
    viewBox: `0 0 ${BD_W} ${BD_H}`,
    preserveAspectRatio: "xMidYMid slice"
  }, cols.map((x, i) => React.createElement("g", {
    key: i
  }, React.createElement("line", {
    x1: x,
    y1: "40",
    x2: x,
    y2: BD_H - 40,
    stroke: "currentColor",
    strokeWidth: "0.8",
    opacity: "0.07"
  }), [120, 240, 360, 480].map((y, j) => React.createElement("circle", {
    key: j,
    cx: x,
    cy: y,
    r: "3",
    fill: "currentColor",
    opacity: 0.08 + 0.03 * Math.sin(t + i * 0.4 + j * 0.6)
  })))), pulses.map((p, i) => {
    const u = (t * p.speed + p.offset) % 1;
    const x = cols[0] + u * (cols[cols.length - 1] - cols[0]);
    return React.createElement("g", {
      key: "p" + i
    }, React.createElement("circle", {
      cx: x,
      cy: p.y,
      r: "4",
      fill: "currentColor",
      opacity: "0.18"
    }), React.createElement("line", {
      x1: x - 32,
      y1: p.y,
      x2: x,
      y2: p.y,
      stroke: "currentColor",
      strokeWidth: "1.2",
      opacity: "0.15"
    }));
  }));
};
const BdLoss = () => {
  const t = useFrame();
  const bowls = [{
    y0: 70,
    y1: 480,
    y2: 70
  }, {
    y0: 130,
    y1: 440,
    y2: 130
  }, {
    y0: 200,
    y1: 400,
    y2: 200
  }];
  const bz = u => {
    const P0 = [120, 70],
      P1 = [800, 540],
      P2 = [1480, 70];
    return [(1 - u) * (1 - u) * P0[0] + 2 * (1 - u) * u * P1[0] + u * u * P2[0], (1 - u) * (1 - u) * P0[1] + 2 * (1 - u) * u * P1[1] + u * u * P2[1]];
  };
  const cycle = 9;
  const dots = [0, 0.2, 0.4, 0.6, 0.8].map((d, i) => {
    const u = (t / cycle + d) % 1;
    const seg = u < 0.7 ? u / 0.7 * 0.5 : 0.5;
    return {
      u,
      seg,
      i
    };
  });
  return React.createElement("svg", {
    className: "bd-svg",
    viewBox: `0 0 ${BD_W} ${BD_H}`,
    preserveAspectRatio: "xMidYMid slice"
  }, bowls.map((b, i) => React.createElement("path", {
    key: i,
    d: `M 120 ${b.y0} Q 800 ${b.y1} 1480 ${b.y2}`,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.4",
    opacity: 0.07 - i * 0.015
  })), dots.map(({
    u,
    seg,
    i
  }) => {
    const [x, y] = bz(seg);
    const op = 0.18 - u * 0.1;
    return React.createElement("circle", {
      key: i,
      cx: x,
      cy: y,
      r: "6",
      fill: "currentColor",
      opacity: Math.max(0.04, op)
    });
  }));
};
const BdOpt = () => {
  const t = useFrame();
  return React.createElement("svg", {
    className: "bd-svg",
    viewBox: `0 0 ${BD_W} ${BD_H}`,
    preserveAspectRatio: "xMidYMid slice"
  }, React.createElement("g", {
    transform: `translate(${BD_W / 2}, ${BD_H / 2})`
  }, [560, 440, 330, 230, 150, 85, 35].map((r, i) => React.createElement("ellipse", {
    key: i,
    cx: "0",
    cy: "0",
    rx: r,
    ry: r * 0.55,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "0.8",
    opacity: 0.05 + i * 0.01
  })), [0, 1, 2, 3, 4].map(i => {
    const u = t * 0.16 + i * 0.18;
    const r = 500 - u * 80 % 500;
    const a = u * 1.4;
    return React.createElement("circle", {
      key: i,
      cx: Math.cos(a) * r,
      cy: Math.sin(a) * r * 0.55,
      r: "6",
      fill: "currentColor",
      opacity: 0.14 + 0.06 * Math.sin(u)
    });
  }), React.createElement("circle", {
    cx: "0",
    cy: "0",
    r: "6",
    fill: "currentColor",
    opacity: "0.4"
  })));
};
const BdTrain = () => {
  const t = useFrame();
  const cycle = 14;
  const u = t % cycle / cycle;
  const buildCurve = (k, baseJitter) => {
    const N = 220;
    const pts = [];
    for (let i = 0; i <= N; i++) {
      const ix = i / N;
      if (ix > u + 0.004) break;
      const x = 80 + ix * (BD_W - 160);
      const y = 100 + 380 * (1 - Math.exp(-ix * k)) + Math.sin(ix * 80 + t * 1.4) * baseJitter;
      pts.push(`${x.toFixed(0)} ${y.toFixed(0)}`);
    }
    return pts.length ? "M" + pts.join(" L") : "";
  };
  return React.createElement("svg", {
    className: "bd-svg",
    viewBox: `0 0 ${BD_W} ${BD_H}`,
    preserveAspectRatio: "xMidYMid slice"
  }, React.createElement("path", {
    d: buildCurve(3.6, 2),
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    opacity: "0.11"
  }), React.createElement("path", {
    d: buildCurve(2.9, 3),
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeDasharray: "10 10",
    opacity: "0.07"
  }));
};
const Backdrops = {
  about: BdData,
  experience: BdPreproc,
  research: BdArch,
  projects: BdLoss,
  skills: BdOpt,
  achievements: BdTrain,
  inference: BdInference
};
const PhaseBackdrop = ({
  kind
}) => {
  const C = Backdrops[kind];
  const ref = useRef(null);
  const inView = useInViewMount(ref, {
    rootMargin: "200px"
  });
  if (!C) return null;
  return React.createElement("div", {
    className: "section-bg",
    "aria-hidden": "true",
    ref: ref
  }, inView && React.createElement(C, null));
};
const PhaseHead = ({
  phase,
  title,
  sub,
  children
}) => {
  const G = Glyphs[phase.id];
  const ref = useRef(null);
  const inView = useInViewMount(ref, {
    rootMargin: "150px"
  });
  return React.createElement(React.Fragment, null, React.createElement("div", {
    className: "phase-rule",
    "aria-hidden": "true"
  }, React.createElement("span", {
    className: "pr-line"
  }), React.createElement("span", {
    className: "pr-mark"
  }, React.createElement("span", {
    className: "pr-dot"
  }), React.createElement("span", {
    className: "pr-num"
  }, phase.n), React.createElement("span", {
    className: "pr-sep"
  }, "\xB7"), React.createElement("span", {
    className: "pr-name"
  }, phase.phase), React.createElement("span", {
    className: "pr-sep"
  }, "\xB7"), React.createElement("span", {
    className: "pr-tag"
  }, phase.tag), React.createElement("span", {
    className: "pr-dot"
  })), React.createElement("span", {
    className: "pr-line"
  })), React.createElement("header", {
    className: "phase-head"
  }, React.createElement("div", null, React.createElement("h2", {
    className: "sec-title"
  }, title), sub && React.createElement("p", {
    className: "sec-sub"
  }, sub), children), React.createElement("div", {
    className: "phase-glyph",
    ref: ref
  }, G && inView && React.createElement(G, null))));
};
const Nav = () => {
  const [active, setActive] = useState("about");
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, {
      rootMargin: "-40% 0px -55% 0px"
    });
    [{
      id: "about"
    }, ...DATA.phases, {
      id: "contact"
    }].forEach(s => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  const links = [{
    id: "about",
    label: "About"
  }, {
    id: "experience",
    label: "Experience"
  }, {
    id: "research",
    label: "Research"
  }, {
    id: "projects",
    label: "Projects"
  }, {
    id: "skills",
    label: "Skills"
  }, {
    id: "inference",
    label: "Posts"
  }, {
    id: "contact",
    label: "Contact"
  }];
  return React.createElement("nav", {
    className: "nav"
  }, React.createElement("div", {
    className: "wrap nav-inner"
  }, React.createElement("a", {
    className: "brand",
    href: "#top"
  }, React.createElement("span", {
    className: "dot"
  }), DATA.shortName), React.createElement("div", {
    className: "nav-links"
  }, links.map(s => React.createElement("a", {
    key: s.id,
    href: "#" + s.id,
    className: active === s.id ? "active" : ""
  }, s.label))), React.createElement("a", {
    className: "nav-cta",
    href: "#contact"
  }, "Get in touch")));
};
const Rail = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const sections = [{
      key: "hero",
      id: "top"
    }, ...DATA.phases.map(p => ({
      key: p.id,
      id: p.id
    })), {
      key: "contact",
      id: "contact"
    }];
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
        window.dispatchEvent(new CustomEvent("phase-change", {
          detail: activeKey
        }));
      }
    };
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return React.createElement("aside", {
    className: "rail",
    "aria-label": "Training pipeline"
  }, DATA.phases.map((p, i) => React.createElement("a", {
    key: p.id,
    href: "#" + p.id,
    className: i === active ? "active" : i < active ? "done" : "",
    style: {
      "--phase": `oklch(74% 0.13 ${p.hue})`
    },
    "aria-label": `${p.n} ${p.phase}`
  }, React.createElement("span", {
    className: "dot"
  }), React.createElement("span", {
    className: "num"
  }, p.n, " \xB7 ", p.phase))));
};
const NeuralNet = () => {
  const layers = useMemo(() => [{
    x: -75,
    n: 5,
    cls: "in"
  }, {
    x: -25,
    n: 7,
    cls: "hidden"
  }, {
    x: 25,
    n: 7,
    cls: "hidden"
  }, {
    x: 75,
    n: 3,
    cls: "out"
  }], []);
  const nodeY = (i, n) => {
    const span = 130;
    if (n === 1) return 0;
    return -span / 2 + span / (n - 1) * i;
  };
  const edges = [];
  for (let l = 0; l < layers.length - 1; l++) {
    const A = layers[l],
      B = layers[l + 1];
    for (let i = 0; i < A.n; i++) {
      for (let j = 0; j < B.n; j++) {
        const hot = (i * 7 + j * 3 + l) % 9 === 0;
        edges.push({
          x1: A.x,
          y1: nodeY(i, A.n),
          x2: B.x,
          y2: nodeY(j, B.n),
          hot,
          key: `${l}-${i}-${j}`
        });
      }
    }
  }
  const signals = useMemo(() => {
    const paths = [[1, 3, 2, 0], [3, 0, 5, 2], [0, 6, 1, 1], [4, 2, 4, 0], [2, 5, 0, 2]];
    return paths.map(picks => {
      let d = "";
      picks.forEach((idx, l) => {
        const L = layers[l];
        const y = nodeY(idx, L.n);
        d += (l === 0 ? "M" : "L") + L.x + " " + y + " ";
      });
      return d.trim();
    });
  }, [layers]);
  const labels = ["INPUT", "h₁", "h₂", "OUTPUT"];
  return React.createElement("div", {
    className: "orbit-wrap",
    "aria-hidden": "true"
  }, React.createElement("svg", {
    className: "nn-svg",
    viewBox: "-110 -100 220 200"
  }, React.createElement("g", null, edges.map(e => React.createElement("line", {
    key: e.key,
    className: "edge" + (e.hot ? " hot" : ""),
    x1: e.x1,
    y1: e.y1,
    x2: e.x2,
    y2: e.y2
  }))), React.createElement("g", null, signals.map((d, i) => React.createElement("path", {
    key: i,
    className: "signal s" + (i + 1),
    d: d
  }))), React.createElement("g", null, layers.map((L, li) => React.createElement("g", {
    key: li
  }, Array.from({
    length: L.n
  }).map((_, i) => {
    const r = L.cls === "out" ? 3.2 : 2.6;
    const live = (i + li) % 3 === 0;
    const delay = ["", "d1", "d2", "d3", "d4"][(i + li) % 5];
    return React.createElement("circle", {
      key: i,
      className: "node " + L.cls + (live ? " live " + delay : ""),
      cx: L.x,
      cy: nodeY(i, L.n),
      r: r
    });
  })))), React.createElement("g", null, layers.map((L, i) => React.createElement("text", {
    key: i,
    className: "layer-label",
    x: L.x,
    y: 85,
    textAnchor: "middle"
  }, labels[i]))), React.createElement("line", {
    x1: "-100",
    y1: "75",
    x2: "100",
    y2: "75",
    stroke: "var(--line-soft)",
    strokeWidth: "0.4"
  })));
};
const ARCH_VB = "-115 -75 230 150";
const ArchFFN = () => {
  const layers = useMemo(() => [{
    x: -80,
    n: 5,
    cls: "in"
  }, {
    x: -27,
    n: 7,
    cls: "hidden"
  }, {
    x: 27,
    n: 7,
    cls: "hidden"
  }, {
    x: 80,
    n: 3,
    cls: "out"
  }], []);
  const nodeY = (i, n) => {
    const span = 100;
    if (n === 1) return 0;
    return -span / 2 + span / (n - 1) * i;
  };
  const edges = [];
  for (let l = 0; l < layers.length - 1; l++) {
    const A = layers[l],
      B = layers[l + 1];
    for (let i = 0; i < A.n; i++) for (let j = 0; j < B.n; j++) edges.push({
      x1: A.x,
      y1: nodeY(i, A.n),
      x2: B.x,
      y2: nodeY(j, B.n),
      hot: (i * 7 + j * 3 + l) % 9 === 0,
      key: `${l}-${i}-${j}`
    });
  }
  const t = useFrame();
  const period = 2.4;
  const u = t % period / period;
  const wavefrontX = layers[0].x + (layers[layers.length - 1].x - layers[0].x) * u;
  const closestLayer = layers.reduce((best, L, i) => {
    return Math.abs(L.x - wavefrontX) < Math.abs(layers[best].x - wavefrontX) ? i : best;
  }, 0);
  const sigPaths = useMemo(() => {
    const picks = [[1, 3, 2, 0], [3, 0, 5, 2], [0, 6, 1, 1], [4, 2, 4, 0], [2, 5, 0, 2]];
    return picks.map(p => {
      let d = "";
      p.forEach((idx, l) => {
        const L = layers[l];
        const y = nodeY(idx, L.n);
        d += (l === 0 ? "M" : "L") + L.x + " " + y + " ";
      });
      return d.trim();
    });
  }, [layers]);
  return React.createElement("svg", {
    className: "nn-svg",
    viewBox: ARCH_VB
  }, React.createElement("line", {
    x1: wavefrontX,
    y1: "-58",
    x2: wavefrontX,
    y2: "58",
    stroke: "var(--accent)",
    strokeWidth: "14",
    opacity: "0.10"
  }), React.createElement("line", {
    x1: wavefrontX,
    y1: "-58",
    x2: wavefrontX,
    y2: "58",
    stroke: "var(--accent)",
    strokeWidth: "1.2",
    opacity: "0.55"
  }), edges.map(e => React.createElement("line", {
    key: e.key,
    className: "edge" + (e.hot ? " hot" : ""),
    x1: e.x1,
    y1: e.y1,
    x2: e.x2,
    y2: e.y2
  })), sigPaths.map((d, i) => React.createElement("path", {
    key: "s" + i,
    className: "signal s" + (i + 1),
    d: d
  })), layers.map((L, li) => React.createElement("g", {
    key: li
  }, Array.from({
    length: L.n
  }).map((_, i) => {
    const isHotLayer = li === closestLayer;
    const r = (L.cls === "out" ? 3.2 : 2.6) + (isHotLayer ? 0.8 : 0);
    return React.createElement("g", {
      key: i
    }, isHotLayer && React.createElement("circle", {
      cx: L.x,
      cy: nodeY(i, L.n),
      r: r + 4,
      fill: "none",
      stroke: "var(--accent)",
      strokeWidth: "0.6",
      opacity: "0.5"
    }), React.createElement("circle", {
      className: "node " + L.cls + (isHotLayer ? " live" : ""),
      cx: L.x,
      cy: nodeY(i, L.n),
      r: r
    }));
  }))), ["INPUT", "h₁", "h₂", "OUTPUT"].map((l, i) => React.createElement("text", {
    key: i,
    className: "layer-label",
    x: layers[i].x,
    y: "64",
    textAnchor: "middle"
  }, l)));
};
const ArchCNN = () => {
  const t = useFrame();
  const positions = 9;
  const dur = 0.55;
  const idx = Math.floor(t / dur) % positions;
  const kx = idx % 3,
    ky = Math.floor(idx / 3);
  const inX = -100,
    inY = -42;
  const outX = 30,
    outY = -18;
  const cell = 16;
  return React.createElement("svg", {
    viewBox: ARCH_VB
  }, Array.from({
    length: 25
  }, (_, i) => {
    const col = i % 5,
      row = Math.floor(i / 5);
    const inK = col >= kx && col < kx + 3 && row >= ky && row < ky + 3;
    return React.createElement("rect", {
      key: i,
      x: inX + col * cell,
      y: inY + row * cell,
      width: cell - 2,
      height: cell - 2,
      rx: "1.5",
      fill: inK ? "var(--accent)" : "var(--bg)",
      fillOpacity: inK ? 0.35 : 1,
      stroke: "var(--ink-mute)",
      strokeWidth: "0.7",
      opacity: inK ? 0.95 : 0.45
    });
  }), React.createElement("rect", {
    x: inX + kx * cell - 1.5,
    y: inY + ky * cell - 1.5,
    width: cell * 3 - 0.5,
    height: cell * 3 - 0.5,
    rx: "1.5",
    fill: "none",
    stroke: "var(--accent)",
    strokeWidth: "1.5",
    style: {
      filter: "drop-shadow(0 0 6px var(--accent))"
    }
  }), React.createElement("line", {
    x1: inX + kx * cell + cell * 1.5,
    y1: inY + ky * cell + cell * 1.5,
    x2: outX + kx * cell + cell / 2,
    y2: outY + ky * cell + cell / 2,
    stroke: "var(--accent)",
    strokeWidth: "0.9",
    strokeDasharray: "2 3",
    opacity: "0.75"
  }), Array.from({
    length: 9
  }, (_, i) => {
    const col = i % 3,
      row = Math.floor(i / 3);
    const filled = row * 3 + col <= idx;
    const isHere = row === ky && col === kx;
    return React.createElement("rect", {
      key: i,
      x: outX + col * cell,
      y: outY + row * cell,
      width: cell - 2,
      height: cell - 2,
      rx: "1.5",
      fill: filled ? "var(--accent)" : "var(--bg)",
      fillOpacity: isHere ? 0.7 : filled ? 0.4 : 1,
      stroke: "var(--ink-mute)",
      strokeWidth: "0.7"
    });
  }), React.createElement("text", {
    className: "layer-label",
    x: inX + cell * 2.5,
    y: "50",
    textAnchor: "middle"
  }, "INPUT 5\xD75"), React.createElement("text", {
    className: "layer-label",
    x: outX + cell * 1.5,
    y: "50",
    textAnchor: "middle"
  }, "FEATURE MAP 3\xD73"), React.createElement("text", {
    className: "layer-label",
    x: "0",
    y: "64",
    textAnchor: "middle"
  }, "3\xD73 KERNEL \xB7 STRIDE 1"));
};
const ArchRNN = () => {
  const t = useFrame();
  const N = 5;
  const dur = 0.7;
  const active = Math.floor(t / dur) % (N + 1);
  const xs = Array.from({
    length: N
  }, (_, i) => -80 + i * 40);
  return React.createElement("svg", {
    viewBox: ARCH_VB
  }, xs.map((x, i) => {
    const isOn = i < active;
    const justOn = i === active - 1;
    return React.createElement("g", {
      key: i
    }, React.createElement("text", {
      x: x,
      y: "-44",
      textAnchor: "middle",
      fontFamily: monoStack,
      fontSize: "7.5",
      fill: "currentColor",
      opacity: isOn ? 0.95 : 0.4
    }, "x", React.createElement("tspan", {
      baselineShift: "sub",
      fontSize: "5.5"
    }, i + 1)), React.createElement("line", {
      x1: x,
      y1: "-38",
      x2: x,
      y2: "-13",
      stroke: "currentColor",
      strokeWidth: justOn ? 1.4 : 0.9,
      opacity: isOn ? 0.95 : 0.4
    }), React.createElement("path", {
      d: `M${x - 3} -16 L${x} -13 L${x + 3} -16`,
      fill: "currentColor",
      opacity: isOn ? 0.95 : 0.4
    }), React.createElement("rect", {
      x: x - 11,
      y: -11,
      width: "22",
      height: "22",
      rx: "3",
      fill: isOn ? "var(--accent)" : "var(--bg)",
      fillOpacity: isOn ? 0.25 : 1,
      stroke: "currentColor",
      strokeWidth: justOn ? 1.6 : 1
    }), React.createElement("text", {
      x: x,
      y: "3",
      textAnchor: "middle",
      fontFamily: monoStack,
      fontSize: "8",
      fill: "currentColor",
      opacity: isOn ? 0.95 : 0.5
    }, "h", React.createElement("tspan", {
      baselineShift: "sub",
      fontSize: "5.5"
    }, i + 1)), React.createElement("line", {
      x1: x,
      y1: "11",
      x2: x,
      y2: "32",
      stroke: "currentColor",
      strokeWidth: "0.9",
      opacity: isOn ? 0.65 : 0.3
    }), React.createElement("text", {
      x: x,
      y: "42",
      textAnchor: "middle",
      fontFamily: monoStack,
      fontSize: "7.5",
      fill: "currentColor",
      opacity: isOn ? 0.85 : 0.4
    }, "y", React.createElement("tspan", {
      baselineShift: "sub",
      fontSize: "5.5"
    }, i + 1)), i < N - 1 && React.createElement("g", null, React.createElement("line", {
      x1: x + 11,
      y1: 0,
      x2: xs[i + 1] - 11,
      y2: 0,
      stroke: "currentColor",
      strokeWidth: i === active - 1 ? 1.6 : 0.8,
      opacity: i < active ? 0.9 : 0.35
    }), React.createElement("path", {
      d: `M${xs[i + 1] - 14} -3 L${xs[i + 1] - 11} 0 L${xs[i + 1] - 14} 3`,
      fill: "currentColor",
      opacity: i < active ? 0.9 : 0.35
    })));
  }), React.createElement("text", {
    className: "layer-label",
    x: "0",
    y: "62",
    textAnchor: "middle"
  }, "UNROLLED  \xB7  t = 1 \u2026 5"));
};
const ArchGNN = () => {
  const t = useFrame();
  const nodes = useMemo(() => [{
    x: -98,
    y: -55
  }, {
    x: -68,
    y: -62
  }, {
    x: -38,
    y: -50
  }, {
    x: -8,
    y: -58
  }, {
    x: 24,
    y: -52
  }, {
    x: 56,
    y: -60
  }, {
    x: 88,
    y: -48
  }, {
    x: 102,
    y: -20
  }, {
    x: -92,
    y: -22
  }, {
    x: -55,
    y: -18
  }, {
    x: -22,
    y: -12
  }, {
    x: 18,
    y: -20
  }, {
    x: 52,
    y: -12
  }, {
    x: 82,
    y: 2
  }, {
    x: -78,
    y: 28
  }, {
    x: -40,
    y: 38
  }, {
    x: -8,
    y: 26
  }, {
    x: 28,
    y: 40
  }, {
    x: 62,
    y: 30
  }, {
    x: 92,
    y: 42
  }], []);
  const edges = useMemo(() => [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [0, 8], [1, 9], [2, 9], [3, 10], [4, 11], [5, 12], [6, 13], [7, 13], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [8, 14], [9, 14], [10, 15], [10, 16], [11, 16], [11, 17], [12, 17], [12, 18], [13, 18], [13, 19], [14, 15], [15, 16], [16, 17], [17, 18], [18, 19], [2, 10], [4, 12], [10, 17], [12, 18], [5, 13]], []);
  const neighbours = useMemo(() => {
    const m = nodes.map(() => []);
    edges.forEach(([a, b]) => {
      m[a].push(b);
      m[b].push(a);
    });
    return m;
  }, [nodes, edges]);
  const focalOrder = useMemo(() => {
    return [10, 11, 5, 16, 9, 12, 3, 17, 4, 13];
  }, []);
  const focalPeriod = 2.8;
  const focalCycle = Math.floor(t / focalPeriod);
  const focal = focalOrder[focalCycle % focalOrder.length];
  const localT = t % focalPeriod / focalPeriod;
  const haloT = Math.min(1, localT / 0.7);
  return React.createElement("svg", {
    viewBox: ARCH_VB
  }, edges.map(([a, b], i) => {
    const isNbrEdge = a === focal || b === focal;
    return React.createElement("line", {
      key: i,
      x1: nodes[a].x,
      y1: nodes[a].y,
      x2: nodes[b].x,
      y2: nodes[b].y,
      stroke: isNbrEdge ? "var(--accent)" : "currentColor",
      strokeWidth: isNbrEdge ? 1.3 : 0.55,
      opacity: isNbrEdge ? 0.85 : 0.22
    });
  }), React.createElement("circle", {
    cx: nodes[focal].x,
    cy: nodes[focal].y,
    r: 6 + haloT * 38,
    fill: "none",
    stroke: "var(--accent)",
    strokeWidth: "0.8",
    opacity: Math.max(0, 0.55 * (1 - haloT))
  }), React.createElement("circle", {
    cx: nodes[focal].x,
    cy: nodes[focal].y,
    r: 6 + haloT * 22,
    fill: "none",
    stroke: "var(--accent)",
    strokeWidth: "0.6",
    opacity: Math.max(0, 0.4 * (1 - haloT * 0.8))
  }), neighbours[focal].map((nb, i) => {
    const n = neighbours[focal].length;
    const start = 0.10 + i * (0.45 / Math.max(1, n));
    const end = 0.70 + i * (0.20 / Math.max(1, n));
    if (localT < start || localT > end) return null;
    const u = (localT - start) / (end - start);
    const eu = u * u * (3 - 2 * u);
    const a = nodes[nb],
      b = nodes[focal];
    const x = a.x + (b.x - a.x) * eu;
    const y = a.y + (b.y - a.y) * eu;
    return React.createElement("g", {
      key: "m" + i
    }, React.createElement("circle", {
      cx: x,
      cy: y,
      r: "6",
      fill: "var(--accent)",
      opacity: "0.35"
    }), React.createElement("circle", {
      cx: x,
      cy: y,
      r: "3",
      fill: "var(--accent)",
      opacity: "0.75"
    }), React.createElement("circle", {
      cx: x,
      cy: y,
      r: "1.6",
      fill: "oklch(96% 0.05 85)"
    }));
  }), nodes.map((n, i) => {
    const isFocal = i === focal;
    const isNb = neighbours[focal].includes(i);
    const r = isFocal ? 7 : isNb ? 5.2 : 4;
    return React.createElement("g", {
      key: i
    }, isFocal && React.createElement("circle", {
      cx: n.x,
      cy: n.y,
      r: r + 3,
      fill: "none",
      stroke: "var(--accent)",
      strokeWidth: "0.9",
      opacity: 0.6 + 0.35 * Math.sin(t * 5)
    }), React.createElement("circle", {
      cx: n.x,
      cy: n.y,
      r: r,
      fill: isFocal ? "var(--accent)" : isNb ? "var(--bg-soft)" : "var(--bg)",
      fillOpacity: isFocal ? 0.95 : 1,
      stroke: isFocal ? "var(--accent)" : "currentColor",
      strokeWidth: isFocal ? 1.4 : isNb ? 1.1 : 0.9,
      style: isFocal ? {
        filter: "drop-shadow(0 0 8px var(--accent))"
      } : null
    }));
  }), React.createElement("text", {
    className: "layer-label",
    x: "0",
    y: "66",
    textAnchor: "middle"
  }, "h_v \u2190 \u03A3 MSG(h_u, h_v),  u \u2208 N(v)"));
};
const ArchTransformer = () => {
  const t = useFrame();
  const period = 4.2;
  const u = t % period / period;
  const stage = (a, b) => u >= a && u <= b ? Math.max(0, Math.min(1, (u - a) / (b - a))) : u > b ? 1 : 0;
  const sTok = stage(0.00, 0.18);
  const sProj = stage(0.18, 0.36);
  const sQKV = stage(0.36, 0.50);
  const sQK = stage(0.50, 0.62);
  const sSM = stage(0.62, 0.74);
  const sZ = stage(0.74, 0.92);
  const tokens = [{
    x: -88,
    label: "x₁"
  }, {
    x: -60,
    label: "x₂"
  }, {
    x: -32,
    label: "x₃"
  }, {
    x: -4,
    label: "…"
  }, {
    x: 24,
    label: "xᵢ"
  }, {
    x: 52,
    label: "xₙ₋₁"
  }, {
    x: 80,
    label: "xₙ"
  }];
  const tokY = 58;
  const busY = 40;
  const wY = 20;
  const qkvY = -6;
  const matY = -30;
  const smY = -48;
  const attY = smY;
  const zY = -68;
  const Qx = -56,
    Kx = 0,
    Vx = 56;
  return React.createElement("svg", {
    viewBox: ARCH_VB
  }, React.createElement("defs", null, React.createElement("marker", {
    id: "tfm-ah",
    viewBox: "0 0 6 6",
    refX: "5",
    refY: "3",
    markerWidth: "4",
    markerHeight: "4",
    orient: "auto-start-reverse"
  }, React.createElement("path", {
    d: "M0 0 L6 3 L0 6 z",
    fill: "currentColor"
  }))), tokens.map((tk, i) => {
    const lit = sTok > 0 ? 1 : 0.55;
    return React.createElement("g", {
      key: i,
      opacity: lit
    }, React.createElement("rect", {
      x: tk.x - 11,
      y: tokY - 5,
      width: "22",
      height: "13",
      rx: "2",
      fill: "var(--bg-card, #16182a)",
      stroke: "currentColor",
      strokeWidth: "0.8"
    }), React.createElement("text", {
      x: tk.x,
      y: tokY + 4,
      textAnchor: "middle",
      fontFamily: monoStack,
      fontSize: "6.5",
      fill: "currentColor"
    }, tk.label));
  }), tokens.map((tk, i) => React.createElement("line", {
    key: "ta" + i,
    x1: tk.x,
    y1: tokY - 5,
    x2: tk.x,
    y2: busY + 1,
    stroke: "currentColor",
    strokeWidth: sTok > 0 ? 0.9 : 0.5,
    opacity: sTok > 0 ? 0.85 : 0.4,
    markerEnd: "url(#tfm-ah)"
  })), React.createElement("line", {
    x1: "-100",
    y1: busY,
    x2: "100",
    y2: busY,
    stroke: "currentColor",
    strokeWidth: "1.1",
    opacity: 0.5 + sTok * 0.45
  }), React.createElement("text", {
    x: "-105",
    y: busY + 2,
    textAnchor: "end",
    fontFamily: monoStack,
    fontSize: "6.5",
    fill: "currentColor",
    opacity: "0.85"
  }, "x"), [Qx, Kx, Vx].map((wx, i) => React.createElement("line", {
    key: i,
    x1: wx,
    y1: busY,
    x2: wx,
    y2: wY + 8.5,
    stroke: "currentColor",
    strokeWidth: sProj > 0 ? 1 : 0.6,
    opacity: sProj > 0 ? 0.9 : 0.45,
    markerEnd: "url(#tfm-ah)"
  })), [["Wq", Qx], ["Wₖ", Kx], ["Wᵥ", Vx]].map(([lab, wx], i) => React.createElement("g", {
    key: lab,
    opacity: sProj > 0 ? 1 : 0.6
  }, React.createElement("rect", {
    x: wx - 15,
    y: wY - 7,
    width: "30",
    height: "14",
    rx: "2",
    fill: sProj > 0.5 ? "var(--accent)" : "var(--bg-card, #16182a)",
    fillOpacity: sProj > 0.5 ? 0.18 : 1,
    stroke: "currentColor",
    strokeWidth: "0.9"
  }), React.createElement("text", {
    x: wx,
    y: wY + 2,
    textAnchor: "middle",
    fontFamily: monoStack,
    fontSize: "7",
    fill: "currentColor"
  }, lab))), [Qx, Kx, Vx].map((wx, i) => React.createElement("line", {
    key: i,
    x1: wx,
    y1: wY - 7,
    x2: wx,
    y2: qkvY + 8.5,
    stroke: "currentColor",
    strokeWidth: sQKV > 0 ? 1 : 0.6,
    opacity: sQKV > 0 ? 0.9 : 0.45,
    markerEnd: "url(#tfm-ah)"
  })), [["Q", Qx], ["K", Kx], ["V", Vx]].map(([lab, wx], i) => React.createElement("g", {
    key: lab,
    opacity: sQKV > 0 ? 1 : 0.7
  }, React.createElement("rect", {
    x: wx - 12,
    y: qkvY - 6,
    width: "24",
    height: "12",
    rx: "1.5",
    fill: sQKV > 0.5 ? "var(--accent)" : "var(--bg-card, #16182a)",
    fillOpacity: sQKV > 0.5 ? 0.25 : 1,
    stroke: "var(--accent)",
    strokeWidth: "1"
  }), React.createElement("text", {
    x: wx,
    y: qkvY + 2.5,
    textAnchor: "middle",
    fontFamily: monoStack,
    fontSize: "7.5",
    fill: "currentColor",
    fontWeight: "500"
  }, lab))), React.createElement("line", {
    x1: Qx,
    y1: qkvY - 6,
    x2: (Qx + Kx) / 2 - 4,
    y2: matY + 4,
    stroke: "currentColor",
    strokeWidth: sQK > 0 ? 1 : 0.6,
    opacity: sQK > 0 ? 0.9 : 0.45
  }), React.createElement("line", {
    x1: Kx,
    y1: qkvY - 6,
    x2: (Qx + Kx) / 2 + 4,
    y2: matY + 4,
    stroke: "currentColor",
    strokeWidth: sQK > 0 ? 1 : 0.6,
    opacity: sQK > 0 ? 0.9 : 0.45
  }), React.createElement("g", {
    opacity: sQK > 0 ? 1 : 0.6
  }, React.createElement("circle", {
    cx: (Qx + Kx) / 2,
    cy: matY,
    r: "6",
    fill: "var(--bg-card, #16182a)",
    stroke: "currentColor",
    strokeWidth: "1"
  }), React.createElement("text", {
    x: (Qx + Kx) / 2,
    y: matY + 2.4,
    textAnchor: "middle",
    fontFamily: monoStack,
    fontSize: "7",
    fill: "currentColor"
  }, "\xD7")), React.createElement("line", {
    x1: (Qx + Kx) / 2,
    y1: matY - 7,
    x2: (Qx + Kx) / 2,
    y2: smY + 8.5,
    stroke: "currentColor",
    strokeWidth: sSM > 0 ? 1 : 0.6,
    opacity: sSM > 0 ? 0.9 : 0.45,
    markerEnd: "url(#tfm-ah)"
  }), React.createElement("g", {
    opacity: sSM > 0 ? 1 : 0.7
  }, React.createElement("rect", {
    x: (Qx + Kx) / 2 - 26,
    y: smY - 5,
    width: "52",
    height: "11",
    rx: "2",
    fill: sSM > 0.5 ? "var(--accent)" : "var(--bg-card, #16182a)",
    fillOpacity: sSM > 0.5 ? 0.22 : 1,
    stroke: "currentColor",
    strokeWidth: "0.9"
  }), React.createElement("text", {
    x: (Qx + Kx) / 2,
    y: smY + 2.2,
    textAnchor: "middle",
    fontFamily: monoStack,
    fontSize: "6.5",
    fill: "currentColor"
  }, "softmax(\xB7/\u221Ad)")), React.createElement("line", {
    x1: (Qx + Kx) / 2 + 26,
    y1: smY,
    x2: Vx - 8.5,
    y2: smY,
    stroke: "currentColor",
    strokeWidth: sSM > 0 ? 1 : 0.6,
    opacity: sSM > 0 ? 0.9 : 0.45,
    markerEnd: "url(#tfm-ah)"
  }), React.createElement("line", {
    x1: Vx,
    y1: qkvY - 7,
    x2: Vx,
    y2: smY + 8.5,
    stroke: "currentColor",
    strokeWidth: sSM > 0 ? 1 : 0.6,
    opacity: sSM > 0 ? 0.9 : 0.45
  }), React.createElement("g", {
    opacity: sSM > 0 ? 1 : 0.6
  }, React.createElement("circle", {
    cx: Vx,
    cy: smY,
    r: "6",
    fill: "var(--bg-card, #16182a)",
    stroke: "currentColor",
    strokeWidth: "1"
  }), React.createElement("text", {
    x: Vx,
    y: smY + 2.4,
    textAnchor: "middle",
    fontFamily: monoStack,
    fontSize: "7",
    fill: "currentColor"
  }, "\xD7")), React.createElement("line", {
    x1: Vx,
    y1: smY - 7,
    x2: Vx,
    y2: zY + 4,
    stroke: "currentColor",
    strokeWidth: sZ > 0 ? 1.2 : 0.7,
    opacity: sZ > 0 ? 1 : 0.5,
    markerEnd: "url(#tfm-ah)"
  }), React.createElement("text", {
    x: Vx + 6,
    y: zY + 4,
    textAnchor: "start",
    fontFamily: monoStack,
    fontSize: "7.5",
    fill: "var(--accent)",
    fontWeight: "500",
    opacity: sZ > 0 ? 1 : 0.7
  }, "z"), (() => {
    let px = 0,
      py = 0,
      show = false;
    if (sTok > 0 && sTok < 1) {
      show = true;
      const tk = tokens[Math.floor(u / 0.18 * tokens.length) % tokens.length];
      px = tk.x;
      py = tokY - 5 + (busY - tokY + 5) * sTok;
    } else if (sProj > 0 && sProj < 1) {
      show = true;
      const wxs = [Qx, Kx, Vx];
      const wx = wxs[Math.floor(sProj * 3) % 3];
      px = wx;
      py = busY + (wY + 6 - busY) * sProj;
    } else if (sQKV > 0 && sQKV < 1) {
      show = true;
      const wxs = [Qx, Kx, Vx];
      const wx = wxs[Math.floor(sQKV * 3) % 3];
      px = wx;
      py = wY + 7 + (qkvY - 6 - (wY + 7)) * sQKV;
    }
    if (!show) return null;
    return React.createElement("g", null, React.createElement("circle", {
      cx: px,
      cy: py,
      r: "3.5",
      fill: "var(--accent)",
      opacity: "0.55"
    }), React.createElement("circle", {
      cx: px,
      cy: py,
      r: "1.6",
      fill: "var(--accent)"
    }));
  })());
};
const ARCH_SLIDES = [{
  id: "FFN",
  name: "Feed-forward",
  desc: "Every neuron in layer L connects to every neuron in L+1. The baseline against which every other deep architecture is measured.",
  Comp: ArchFFN,
  colab: "https://colab.research.google.com/"
}, {
  id: "CNN",
  name: "Convolutional",
  desc: "A small kernel slides across the input; weights are shared across positions. Built for signals with spatial structure: images, spectrograms, retinal scans.",
  Comp: ArchCNN,
  colab: "https://colab.research.google.com/"
}, {
  id: "RNN",
  name: "Recurrent",
  desc: "A hidden state carries information forward, one step at a time. Designed for sequences: speech, language, time-series signals.",
  Comp: ArchRNN,
  colab: "https://colab.research.google.com/"
}, {
  id: "GNN",
  name: "Graph",
  desc: "Each node aggregates messages from its neighbours. Models data with no fixed grid: molecules, social networks, irregular sensor layouts.",
  Comp: ArchGNN,
  colab: "https://colab.research.google.com/"
}, {
  id: "TFM",
  name: "Transformer",
  desc: "Every token attends to every other through Q · Kᵀ · V. The architecture under modern LLMs, ViTs and protein-structure models.",
  Comp: ArchTransformer,
  colab: "https://colab.research.google.com/"
}];
const ARCH_DUR_MS = 5200;
const ArchSlideshow = () => {
  const [idx, setIdx] = useState(0);
  const [cycle, setCycle] = useState(0);
  const unlocked = useUnlockAfterSeen('arch-notebooks-unlocked');
  const rotationReady = useDelayedMount(1200);
  useEffect(() => {
    if (!rotationReady) return;
    const id = setInterval(() => {
      setIdx(i => {
        const next = (i + 1) % ARCH_SLIDES.length;
        if (next === 0) setCycle(c => c + 1);
        return next;
      });
    }, ARCH_DUR_MS);
    return () => clearInterval(id);
  }, [rotationReady]);
  const slide = ARCH_SLIDES[idx];
  const C = slide.Comp;
  return React.createElement("div", {
    className: "arch-slide"
  }, React.createElement("div", {
    className: "arch-head"
  }, React.createElement("span", {
    className: "arch-counter"
  }, "0", idx + 1, " / 0", ARCH_SLIDES.length, " \xB7 Architectures"), unlocked ? React.createElement("a", {
    className: "arch-tag arch-tag-link",
    href: slide.colab,
    target: "_blank",
    rel: "noreferrer",
    title: `Open ${slide.name} notebook in Colab`
  }, React.createElement("span", null, slide.id), React.createElement("svg", {
    width: "9",
    height: "9",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, React.createElement("path", {
    d: "M7 17 17 7"
  }), React.createElement("path", {
    d: "M7 7h10v10"
  }))) : React.createElement("span", {
    className: "arch-tag arch-tag-locked"
  }, slide.id)), React.createElement("div", {
    className: "arch-canvas",
    key: slide.id
  }, React.createElement(C, null)), React.createElement("div", {
    className: "arch-foot"
  }, React.createElement("div", {
    className: "arch-name"
  }, slide.name), React.createElement("div", {
    className: "arch-desc"
  }, slide.desc)), React.createElement("div", {
    className: "arch-dots"
  }, ARCH_SLIDES.map((s, i) => React.createElement("button", {
    key: s.id,
    className: "arch-dot" + (i === idx ? " active" : i < idx ? " done" : ""),
    onClick: () => setIdx(i),
    "aria-label": s.name
  }, React.createElement("span", {
    className: "arch-dot-fill",
    key: `f-${idx}-${cycle}-${i}`
  })))));
};
const useUnlockAfterSeen = storageKey => {
  const [unlocked, setUnlocked] = useState(() => !!sessionStorage.getItem(storageKey));
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
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, [unlocked]);
  return unlocked;
};
const BlogPrompt = () => {
  const triggered = useUnlockAfterSeen('site-seen-blog');
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    if (triggered && !sessionStorage.getItem('blog-prompt-dismissed') && !sessionStorage.getItem('site-seen-blog-shown')) {
      const t = setTimeout(() => setVisible(true), 400);
      sessionStorage.setItem('site-seen-blog-shown', '1');
      return () => clearTimeout(t);
    }
  }, [triggered]);
  const dismiss = e => {
    e && e.stopPropagation();
    setVisible(false);
    setExpanded(false);
    sessionStorage.setItem('blog-prompt-dismissed', '1');
  };
  if (!visible) return null;
  return React.createElement("div", {
    className: "blog-prompt" + (expanded ? " blog-prompt-expanded" : "")
  }, !expanded ? React.createElement("div", {
    className: "blog-pill",
    role: "button",
    tabIndex: 0,
    onClick: () => setExpanded(true),
    onKeyDown: e => e.key === 'Enter' && setExpanded(true)
  }, React.createElement("span", {
    className: "blog-pill-dot"
  }), React.createElement("span", null, "Field notes"), React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, React.createElement("path", {
    d: "M5 12h14"
  }), React.createElement("path", {
    d: "m13 6 6 6-6 6"
  })), React.createElement("span", {
    className: "bp-dismiss",
    role: "button",
    tabIndex: 0,
    onClick: dismiss,
    onKeyDown: e => e.key === 'Enter' && dismiss(e),
    "aria-label": "Dismiss"
  }, React.createElement("svg", {
    width: "10",
    height: "10",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  })))) : React.createElement("div", {
    className: "blog-pane"
  }, React.createElement("div", {
    className: "blog-pane-head"
  }, React.createElement("span", {
    className: "blog-pane-title"
  }, "Field notes"), React.createElement("button", {
    className: "bp-dismiss",
    onClick: dismiss,
    "aria-label": "Close"
  }, React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  })))), React.createElement("p", {
    className: "blog-pane-sub"
  }, "Inference-time notes from the research."), React.createElement("div", {
    className: "blog-pane-list"
  }, DATA.blogs.map((b, i) => React.createElement("a", {
    key: i,
    className: "blog-pane-item",
    href: "#inference"
  }, React.createElement("span", {
    className: "bpi-slot"
  }, b.slot), React.createElement("span", {
    className: "bpi-title"
  }, b.title), React.createElement("svg", {
    width: "10",
    height: "10",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, React.createElement("path", {
    d: "M5 12h14"
  }), React.createElement("path", {
    d: "m13 6 6 6-6 6"
  })))))));
};
const HERO_TAGLINES = [{
  eyebrow: "Practice",
  body: "Specialising in steganography, one-shot learning and neural-network-based signal modeling, with applied work in healthcare computer vision and 3D electronic integration."
}, {
  eyebrow: "Question",
  body: "What limits fully-connected networks from generalising in complex scientific domains, despite their expressive power, and what architectures break past those limits?"
}, {
  eyebrow: "Direction",
  body: "Few-shot learning, modular architectures and Neural ODEs, towards models that are data-efficient, interpretable and grounded in real mathematics."
}];
const RotatingTag = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % HERO_TAGLINES.length), 6200);
    return () => clearInterval(id);
  }, []);
  return React.createElement("div", {
    className: "hero-tag-wrap",
    "aria-live": "polite"
  }, HERO_TAGLINES.map((tag, i) => React.createElement("div", {
    key: i,
    className: "hero-tag" + (i === idx ? " in" : "")
  }, React.createElement("span", {
    className: "hero-tag-lbl"
  }, tag.eyebrow), React.createElement("p", null, tag.body))), React.createElement("div", {
    className: "hero-tag-dots"
  }, HERO_TAGLINES.map((_, i) => React.createElement("button", {
    key: i,
    className: "htd" + (i === idx ? " active" : ""),
    onClick: () => setIdx(i),
    "aria-label": `Show tagline ${i + 1}`
  }))));
};
const Hero = () => React.createElement("section", {
  className: "hero",
  id: "top"
}, React.createElement("div", {
  className: "wrap hero-grid"
}, React.createElement("div", {
  className: "hero-left"
}, React.createElement("div", {
  className: "hero-meta"
}, React.createElement("span", {
  className: "pulse"
}), React.createElement("span", null, "Open to research roles \xB7 2026")), React.createElement("h1", null, "Deep learning,", React.createElement("br", null), "built for the ", React.createElement("em", null, "edges"), React.createElement("br", null), "of the signal."), React.createElement(RotatingTag, null), React.createElement("div", {
  className: "hero-cta-row"
}, React.createElement("a", {
  className: "btn primary",
  href: "#research"
}, "View research ", React.createElement("span", {
  className: "arrow"
}, React.createElement(Icon, {
  name: "arrow"
}))), React.createElement("a", {
  className: "btn",
  href: "uploads/resume.pdf",
  target: "_blank",
  rel: "noreferrer"
}, React.createElement(Icon, {
  name: "download"
}), " Resume"))), React.createElement(ArchSlideshow, null)));
const About = () => {
  const p = DATA.phases[0];
  return React.createElement("section", {
    id: p.id,
    style: {
      "--phase": `oklch(78% 0.13 ${p.hue})`
    }
  }, React.createElement(PhaseBackdrop, {
    kind: p.id
  }), React.createElement("div", {
    className: "wrap"
  }, React.createElement(PhaseHead, {
    phase: p,
    title: "The inputs to my work.",
    sub: "A short read on the person, the training, and the kind of problems that drew me in."
  }), React.createElement("div", {
    className: "about-grid"
  }, React.createElement("div", null, React.createElement("p", {
    className: "sec-sub",
    style: {
      marginTop: 0
    }
  }, DATA.education.deg, ", ", DATA.education.school, ". ", DATA.education.minor, "."), React.createElement("div", {
    className: "stats"
  }, DATA.stats.map(s => React.createElement("div", {
    className: "stat",
    key: s.l
  }, React.createElement("span", {
    className: "n"
  }, s.n), React.createElement("span", {
    className: "l"
  }, s.l))))), React.createElement("div", {
    className: "about-body"
  }, DATA.about.map((para, i) => React.createElement("p", {
    key: i
  }, para)), React.createElement("div", {
    className: "data-links"
  }, React.createElement("a", {
    className: "data-link",
    href: DATA.github,
    target: "_blank",
    rel: "noreferrer"
  }, React.createElement(Icon, {
    name: "github",
    size: 18
  }), React.createElement("span", null, "GitHub")), React.createElement("a", {
    className: "data-link",
    href: DATA.linkedin,
    target: "_blank",
    rel: "noreferrer"
  }, React.createElement(Icon, {
    name: "linkedin",
    size: 18
  }), React.createElement("span", null, "LinkedIn")), React.createElement("a", {
    className: "data-link",
    href: DATA.scholar,
    target: "_blank",
    rel: "noreferrer"
  }, React.createElement(Icon, {
    name: "scholar",
    size: 18
  }), React.createElement("span", null, "Scholar")), React.createElement("a", {
    className: "data-link",
    href: "mailto:" + DATA.email
  }, React.createElement(Icon, {
    name: "mail",
    size: 18
  }), React.createElement("span", null, "Email")))))));
};
const Experience = () => {
  const p = DATA.phases[1];
  return React.createElement("section", {
    id: p.id,
    style: {
      "--phase": `oklch(78% 0.13 ${p.hue})`
    }
  }, React.createElement(PhaseBackdrop, {
    kind: p.id
  }), React.createElement("div", {
    className: "wrap"
  }, React.createElement(PhaseHead, {
    phase: p,
    title: "Where the work was shaped."
  }), React.createElement("div", {
    className: "exp-list"
  }, DATA.experience.map((e, i) => React.createElement("article", {
    className: "exp-item",
    key: i
  }, React.createElement("div", {
    className: "exp-date"
  }, e.date), React.createElement("div", null, e.roleLink ? React.createElement("a", {
    className: "exp-role lnk",
    href: e.roleLink,
    target: "_blank",
    rel: "noreferrer"
  }, e.role, React.createElement(Ext, null)) : React.createElement("h3", {
    className: "exp-role"
  }, e.role), React.createElement("div", {
    className: "exp-co"
  }, e.coLink ? React.createElement("a", {
    className: "lnk",
    href: e.coLink,
    target: "_blank",
    rel: "noreferrer"
  }, e.co, React.createElement(Ext, null)) : e.co, React.createElement("span", null, e.loc)), React.createElement("ul", {
    className: "exp-bullets"
  }, e.bullets.map((b, j) => React.createElement("li", {
    key: j
  }, b)))), React.createElement("div", {
    className: "exp-tags"
  }, e.tags.map(t => React.createElement("span", {
    key: t,
    className: "tag"
  }, t))))))));
};
const Research = () => {
  const [tab, setTab] = useState("journals");
  const p = DATA.phases[2];
  const items = tab === "journals" ? DATA.journals : DATA.conferences;
  return React.createElement("section", {
    id: p.id,
    style: {
      "--phase": `oklch(78% 0.13 ${p.hue})`
    }
  }, React.createElement(PhaseBackdrop, {
    kind: p.id
  }), React.createElement("div", {
    className: "wrap"
  }, React.createElement(PhaseHead, {
    phase: p,
    title: "Nine papers. Six venues. One throughline.",
    sub: "Steganography, signal-integrity in 3D integration, adversarial robustness, and graph neural networks for healthcare."
  }), React.createElement("div", {
    className: "tabs",
    role: "tablist"
  }, React.createElement("button", {
    className: "tab" + (tab === "journals" ? " active" : ""),
    onClick: () => setTab("journals"),
    role: "tab",
    "aria-selected": tab === "journals"
  }, "Journals \xB7 ", DATA.journals.length), React.createElement("button", {
    className: "tab" + (tab === "conferences" ? " active" : ""),
    onClick: () => setTab("conferences"),
    role: "tab",
    "aria-selected": tab === "conferences"
  }, "Conferences \xB7 ", DATA.conferences.length)), React.createElement("div", {
    className: "pub-list"
  }, items.map((pub, i) => React.createElement("article", {
    className: "pub",
    key: pub.title
  }, React.createElement("div", {
    className: "pub-num"
  }, String(i + 1).padStart(2, "0")), React.createElement("div", null, pub.link ? React.createElement("a", {
    className: "pub-title lnk",
    href: pub.link,
    target: "_blank",
    rel: "noreferrer"
  }, pub.title, React.createElement(Ext, null)) : React.createElement("h3", {
    className: "pub-title"
  }, pub.title), React.createElement("div", {
    className: "pub-venue"
  }, pub.venue, " \xB7 ", pub.authors)), React.createElement("div", {
    className: "pub-status " + pub.kind
  }, pub.status))))));
};
const Projects = () => {
  const p = DATA.phases[3];
  return React.createElement("section", {
    id: p.id,
    style: {
      "--phase": `oklch(78% 0.13 ${p.hue})`
    }
  }, React.createElement(PhaseBackdrop, {
    kind: p.id
  }), React.createElement("div", {
    className: "wrap"
  }, React.createElement(PhaseHead, {
    phase: p,
    title: "Selected work, outside of papers.",
    sub: "Side projects where the loss surface mattered more than the writeup."
  }), React.createElement("div", {
    className: "proj-grid"
  }, DATA.projects.map(pr => React.createElement("a", {
    className: "proj proj-card-link",
    key: pr.title,
    href: pr.link,
    target: "_blank",
    rel: "noreferrer"
  }, React.createElement("div", {
    className: "proj-head"
  }, React.createElement("span", {
    className: "proj-mark"
  }, pr.mark), React.createElement("span", {
    className: "proj-icon"
  }, React.createElement(Icon, {
    name: pr.icon,
    size: 14
  }))), React.createElement("h3", null, pr.title), React.createElement("p", null, pr.body), React.createElement("div", {
    className: "proj-date"
  }, React.createElement("span", null, pr.date), React.createElement("span", {
    className: "proj-link-cue"
  }, "View on GitHub ", React.createElement(Icon, {
    name: "external",
    size: 11
  }))))))));
};
const Skills = () => {
  const p = DATA.phases[4];
  return React.createElement("section", {
    id: p.id,
    style: {
      "--phase": `oklch(78% 0.13 ${p.hue})`
    }
  }, React.createElement(PhaseBackdrop, {
    kind: p.id
  }), React.createElement("div", {
    className: "wrap"
  }, React.createElement(PhaseHead, {
    phase: p,
    title: "The gradient I follow.",
    sub: "Tools and frameworks I reach for when shipping research code or putting models into production."
  }), React.createElement("div", {
    className: "skills-grid"
  }, DATA.skills.map(g => React.createElement("div", {
    className: "skill-group",
    key: g.group
  }, React.createElement("h4", null, g.group), React.createElement("ul", {
    className: "skill-list"
  }, g.items.map(s => React.createElement("li", {
    key: s
  }, s))))))));
};
const Achievements = () => {
  const p = DATA.phases[5];
  return React.createElement("section", {
    id: p.id,
    style: {
      "--phase": `oklch(78% 0.13 ${p.hue})`
    }
  }, React.createElement(PhaseBackdrop, {
    kind: p.id
  }), React.createElement("div", {
    className: "wrap"
  }, React.createElement(PhaseHead, {
    phase: p,
    title: "Convergence \u2014 talks, wins and teams led.",
    sub: "Things that didn't fit into a paper or an internship \u2014 but they shaped the run."
  }), React.createElement("div", {
    className: "ach-list"
  }, DATA.achievements.map((a, i) => React.createElement("div", {
    className: "ach",
    key: i
  }, React.createElement("div", {
    className: "ach-num"
  }, String(i + 1).padStart(2, "0")), a.link ? React.createElement("a", {
    className: "ach-body ach-link",
    href: a.link,
    target: "_blank",
    rel: "noreferrer"
  }, React.createElement("span", {
    dangerouslySetInnerHTML: {
      __html: a.html
    }
  }), React.createElement(Ext, null)) : React.createElement("div", {
    className: "ach-body",
    dangerouslySetInnerHTML: {
      __html: a.html
    }
  }))))));
};
const Inference = () => {
  const p = DATA.phases[6];
  return React.createElement("section", {
    id: p.id,
    style: {
      "--phase": `oklch(78% 0.13 ${p.hue})`
    }
  }, React.createElement(PhaseBackdrop, {
    kind: p.id
  }), React.createElement("div", {
    className: "wrap"
  }, React.createElement(PhaseHead, {
    phase: p,
    title: "Field notes, in progress.",
    sub: "Short writeups on the questions, dead ends and ideas-in-flight from my research. Inferences from the work, before they become papers."
  }), React.createElement("div", {
    className: "blog-grid"
  }, DATA.blogs.map((b, i) => React.createElement("article", {
    className: "blog-card",
    key: i
  }, React.createElement("div", {
    className: "blog-card-rule",
    "aria-hidden": "true"
  }), React.createElement("div", {
    className: "blog-head"
  }, React.createElement("span", {
    className: "blog-slot"
  }, b.slot), React.createElement("span", {
    className: "blog-date"
  }, b.date)), React.createElement("h3", {
    className: "blog-title"
  }, b.title), React.createElement("p", {
    className: "blog-excerpt"
  }, b.excerpt), React.createElement("div", {
    className: "blog-cta"
  }, React.createElement("span", {
    className: "blog-status"
  }, React.createElement("span", {
    className: "blog-status-dot"
  }), "Working on it actively")))))));
};
const Contact = () => React.createElement("section", {
  id: "contact",
  className: "contact"
}, React.createElement("div", {
  className: "wrap"
}, React.createElement("span", {
  className: "eyebrow",
  style: {
    justifyContent: "center"
  }
}, "Inference \xB7 Deploy"), React.createElement("h2", null, "Let's talk about ", React.createElement("em", null, "research"), "."), React.createElement("p", null, "Open to research positions, collaborations, and conversations with anyone building careful systems on top of deep learning."), React.createElement("div", {
  className: "contact-grid"
}, React.createElement("a", {
  className: "contact-row",
  href: "mailto:" + DATA.email
}, React.createElement("span", {
  className: "k"
}, "Email"), React.createElement("span", {
  className: "v"
}, DATA.email)), React.createElement("a", {
  className: "contact-row",
  href: "tel:" + DATA.phone.replace(/\s/g, "")
}, React.createElement("span", {
  className: "k"
}, "Phone"), React.createElement("span", {
  className: "v"
}, DATA.phone)), React.createElement("div", {
  className: "contact-row"
}, React.createElement("span", {
  className: "k"
}, "Based in"), React.createElement("span", {
  className: "v"
}, DATA.location))), React.createElement("div", {
  className: "socials"
}, React.createElement("a", {
  className: "social",
  href: DATA.scholar,
  target: "_blank",
  rel: "noreferrer",
  "aria-label": "Google Scholar"
}, React.createElement(Icon, {
  name: "scholar",
  size: 18
})), React.createElement("a", {
  className: "social",
  href: DATA.linkedin,
  target: "_blank",
  rel: "noreferrer",
  "aria-label": "LinkedIn"
}, React.createElement(Icon, {
  name: "linkedin",
  size: 18
})), React.createElement("a", {
  className: "social",
  href: DATA.github,
  target: "_blank",
  rel: "noreferrer",
  "aria-label": "GitHub"
}, React.createElement(Icon, {
  name: "github",
  size: 18
})), React.createElement("a", {
  className: "social",
  href: DATA.website,
  target: "_blank",
  rel: "noreferrer",
  "aria-label": "Portfolio"
}, React.createElement(Icon, {
  name: "globe",
  size: 18
})), React.createElement("a", {
  className: "social",
  href: "mailto:" + DATA.email,
  "aria-label": "Email"
}, React.createElement(Icon, {
  name: "mail",
  size: 18
}))), React.createElement("div", {
  className: "foot"
}, React.createElement("span", null, "\xA9 2026 ", DATA.name, " \xB7 All rights reserved"), React.createElement("span", null, "Built with care, not noise."))));
const App = () => {
  const [chromeReady, setChromeReady] = useState(false);
  useEffect(() => {
    let raf1, raf2, idleId, timeoutId;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        window.dispatchEvent(new Event('app-ready'));
        const idle = window.requestIdleCallback || (cb => setTimeout(cb, 600));
        idleId = idle(() => setChromeReady(true), {
          timeout: 1800
        });
      });
    });
    timeoutId = setTimeout(() => setChromeReady(true), 2200);
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(timeoutId);
      if (window.cancelIdleCallback && idleId) window.cancelIdleCallback(idleId);
    };
  }, []);
  return React.createElement(React.Fragment, null, React.createElement(Nav, null), chromeReady && React.createElement(Rail, null), chromeReady && React.createElement(BlogPrompt, null), React.createElement(Hero, null), React.createElement(About, null), React.createElement(Experience, null), React.createElement(Research, null), React.createElement(Projects, null), React.createElement(Skills, null), React.createElement(Achievements, null), React.createElement(Inference, null), React.createElement(Contact, null));
};
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App, null));
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("in");
      });
    }, {
      threshold: 0.08
    });
    document.querySelectorAll("section").forEach(s => {
      s.classList.add("reveal");
      io.observe(s);
    });
  }, 200);
});