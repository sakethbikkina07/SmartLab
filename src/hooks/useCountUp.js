import { useEffect, useRef, useState } from 'react';

/** Animates a numeric (or numeric-looking, e.g. "18,420" / "74%") value from 0. */
export function parseStat(value) {
  const str = String(value);
  const m = str.match(/^([^\d-]*)(-?[\d,]+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const num = parseFloat(m[2].replace(/,/g, ''));
  if (Number.isNaN(num)) return null;
  return { prefix: m[1], num, suffix: m[3], comma: m[2].includes(','), decimals: (m[2].split('.')[1] || '').length };
}

export default function useCountUp(value, duration = 1100) {
  const parsed = parseStat(value);
  const [out, setOut] = useState(() => (parsed ? format(parsed, 0) : String(value)));
  const raf = useRef();

  useEffect(() => {
    if (!parsed) { setOut(String(value)); return; }
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setOut(format(parsed, parsed.num)); return; }
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setOut(format(parsed, parsed.num * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [String(value), duration]);

  return out;
}

function format(p, n) {
  const v = p.decimals ? n.toFixed(p.decimals) : String(Math.round(n));
  const body = p.comma ? Number(v).toLocaleString('en-US', { minimumFractionDigits: p.decimals, maximumFractionDigits: p.decimals }) : v;
  return `${p.prefix}${body}${p.suffix}`;
}
