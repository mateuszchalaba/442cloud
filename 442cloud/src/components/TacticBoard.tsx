/**
 * A responsive SVG "tactic board" that renders a 4-4-2 formation.
 * Pure SVG + CSS (no client JS). viewBox keeps it perfectly responsive.
 */

type Player = { x: number; y: number };

// Percent coordinates within a 100 x 64 pitch (left GK -> right attack)
const GK: Player = { x: 7, y: 32 };
const DEF: Player[] = [
  { x: 24, y: 12 },
  { x: 24, y: 34 },
  { x: 24, y: 44 },
  { x: 24, y: 56 },
];
const MID: Player[] = [
  { x: 50, y: 12 },
  { x: 50, y: 34 },
  { x: 50, y: 44 },
  { x: 50, y: 56 },
];
const FWD: Player[] = [
  { x: 74, y: 24 },
  { x: 74, y: 44 },
];

function Dot({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="3.4" fill="var(--color-brand-500)" opacity="0.18" />
      <circle
        r="1.9"
        fill="var(--color-brand-400)"
        className="anim-pulse-dot"
        style={{ animationDelay: `${delay}ms`, transformOrigin: "center" }}
      />
      <circle r="1.9" fill="none" stroke="#03210f" strokeWidth="0.4" />
    </g>
  );
}

export default function TacticBoard() {
  return (
    <div className="relative">
      {/* glow behind board */}
      <div className="glow-brand absolute -inset-6 -z-10 opacity-40 blur-2xl" aria-hidden />

      <svg
        viewBox="0 0 100 64"
        role="img"
        aria-label="A football pitch showing a 4-4-2 formation"
        className="w-full rounded-2xl border border-white/10 shadow-2xl shadow-black/50"
      >
        {/* Field */}
        <rect x="0" y="0" width="100" height="64" fill="#0a2e1c" />
        {/* mowing stripes */}
        {Array.from({ length: 8 }).map((_, i) => (
          <rect
            key={i}
            x={(100 / 8) * i}
            y="0"
            width={100 / 8}
            height="64"
            fill={i % 2 === 0 ? "#0c3421" : "#0a2b1a"}
          />
        ))}

        {/* Lines */}
        <g stroke="rgba(255,255,255,0.35)" strokeWidth="0.4" fill="none">
          <rect x="2" y="2" width="96" height="60" rx="1" />
          <line x1="50" y1="2" x2="50" y2="62" />
          <circle cx="50" cy="32" r="8" />
          <circle cx="50" cy="32" r="0.8" fill="rgba(255,255,255,0.5)" stroke="none" />
          {/* left box */}
          <rect x="2" y="17" width="12" height="30" />
          <rect x="2" y="25" width="5" height="14" />
          {/* right box */}
          <rect x="86" y="17" width="12" height="30" />
          <rect x="93" y="25" width="5" height="14" />
        </g>

        {/* Players */}
        <Dot x={GK.x} y={GK.y} delay={0} />
        {DEF.map((p, i) => (
          <Dot key={`d${i}`} x={p.x} y={p.y} delay={200 + i * 120} />
        ))}
        {MID.map((p, i) => (
          <Dot key={`m${i}`} x={p.x} y={p.y} delay={700 + i * 120} />
        ))}
        {FWD.map((p, i) => (
          <Dot key={`f${i}`} x={p.x} y={p.y} delay={1200 + i * 120} />
        ))}

        {/* Line labels */}
        <g
          fontFamily="var(--font-display), sans-serif"
          fill="rgba(255,255,255,0.72)"
          fontSize="2.6"
          fontWeight="700"
          letterSpacing="0.4"
          textAnchor="middle"
        >
          <text x="24" y="63.2">DEFENCE</text>
          <text x="50" y="63.2">MIDFIELD</text>
          <text x="74" y="63.2">ATTACK</text>
        </g>
      </svg>
    </div>
  );
}
