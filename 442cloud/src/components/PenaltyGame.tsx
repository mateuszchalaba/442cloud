"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ============================================================
   442 CLOUD — Penalty minigame
   Pure canvas + React. No libraries, no persistence.
   Flow per shot: aim (sweeping) -> power (rising) -> shot -> reveal
   ============================================================ */

const LW = 360; // logical width
const LH = 470; // logical height
const TOTAL = 5; // penalties per game

type Phase = "ready" | "aim" | "power" | "shoot" | "reveal" | "done";
type Third = "L" | "C" | "R";

type Particle = { x: number; y: number; vx: number; vy: number; life: number; c: string };

type Game = {
  phase: Phase;
  shots: number;
  goals: number;
  // aim
  aimX: number;
  aimDir: number;
  lockAimX: number;
  // power
  power: number;
  powDir: number;
  // shot
  t: number;
  dur: number;
  ballX: number;
  ballY: number;
  ballR: number;
  targetX: number;
  targetY: number;
  keeperX: number;
  keeperFromX: number;
  keeperToX: number;
  result: "GOAL" | "SAVED" | "OVER" | null;
  resolved: boolean;
  revealUntil: number;
  // fx
  particles: Particle[];
  shake: number;
  last: number;
};

const AIM_MIN = 92;
const AIM_MAX = 268;
const BALL_SPOT_X = 180;
const BALL_SPOT_Y = 372;
const CROSSBAR_Y = 64;
const GOAL_LINE_Y = 150;

function freshGame(): Game {
  return {
    phase: "ready",
    shots: 0,
    goals: 0,
    aimX: 180,
    aimDir: 1,
    lockAimX: 180,
    power: 0,
    powDir: 1,
    t: 0,
    dur: 620,
    ballX: BALL_SPOT_X,
    ballY: BALL_SPOT_Y,
    ballR: 15,
    targetX: 180,
    targetY: 100,
    keeperX: 180,
    keeperFromX: 180,
    keeperToX: 180,
    result: null,
    resolved: false,
    revealUntil: 0,
    particles: [],
    shake: 0,
    last: 0,
  };
}

function thirdOf(x: number): Third {
  return x < 143 ? "L" : x < 217 ? "C" : "R";
}

export default function PenaltyGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<Game>(freshGame());
  const rafRef = useRef<number>(0);
  const reducedRef = useRef(false);

  // React mirror (only what the overlay needs)
  const [phase, setPhase] = useState<Phase>("ready");
  const [shots, setShots] = useState(0);
  const [goals, setGoals] = useState(0);
  const [flash, setFlash] = useState<{ text: string; type: string; id: number } | null>(null);

  const syncPhase = useCallback((p: Phase) => {
    gameRef.current.phase = p;
    setPhase(p);
  }, []);

  const startShot = useCallback(() => {
    const g = gameRef.current;
    const power = g.power;
    const tx = g.lockAimX;
    // higher power -> higher placement; too high -> over the bar
    const ty = 142 - (power / 100) * 84; // 142 (low) .. 58 (above bar)
    g.targetX = tx;
    g.targetY = ty;
    g.dur = 640 - (power / 100) * 130;

    // keeper AI: 50% reads the correct third, else random
    const ballThird = thirdOf(tx);
    const thirds: Third[] = ["L", "C", "R"];
    const keeperThird =
      Math.random() < 0.5 ? ballThird : thirds[Math.floor(Math.random() * 3)];
    const keeperCenter: Record<Third, number> = { L: 118, C: 180, R: 242 };
    g.keeperFromX = 180;
    g.keeperToX = keeperCenter[keeperThird];

    g.t = 0;
    g.resolved = false;
    g.result = null;
    syncPhase("shoot");
  }, [syncPhase]);

  const resolveShot = useCallback(() => {
    const g = gameRef.current;
    g.resolved = true;

    const over = g.targetY < 62;
    let result: "GOAL" | "SAVED" | "OVER";

    if (over) {
      result = "OVER";
    } else {
      let reach = 48;
      if (g.targetY < 92) reach = 32; // top shots harder to reach
      if (g.power < 18) reach += 16; // weak shots easy to save
      const covered = Math.abs(g.targetX - g.keeperToX) <= reach;
      const topCorner = g.targetY < 82;
      if (covered && !(topCorner && Math.random() < 0.35)) {
        result = "SAVED";
      } else {
        result = "GOAL";
      }
    }

    g.result = result;
    if (result === "GOAL") {
      g.goals += 1;
      setGoals(g.goals);
      if (!reducedRef.current) {
        g.shake = 10;
        for (let i = 0; i < 34; i++) {
          const a = Math.random() * Math.PI * 2;
          const s = 1 + Math.random() * 3.4;
          g.particles.push({
            x: g.targetX,
            y: g.targetY,
            vx: Math.cos(a) * s,
            vy: Math.sin(a) * s - 1.5,
            life: 1,
            c: ["#22e07b", "#7ff2b0", "#ffffff"][i % 3],
          });
        }
      }
    }
    setFlash({
      text: result === "GOAL" ? "GOAL!" : result === "SAVED" ? "SAVED!" : "OVER!",
      type: result,
      id: Date.now(),
    });
    g.revealUntil = performance.now() + 1250;
    syncPhase("reveal");
  }, [syncPhase]);

  const nextPenalty = useCallback(() => {
    const g = gameRef.current;
    g.shots += 1;
    setShots(g.shots);
    setFlash(null);
    if (g.shots >= TOTAL) {
      syncPhase("done");
      return;
    }
    g.ballX = BALL_SPOT_X;
    g.ballY = BALL_SPOT_Y;
    g.ballR = 15;
    g.keeperX = 180;
    g.power = 0;
    g.powDir = 1;
    g.aimX = 180;
    syncPhase("aim");
  }, [syncPhase]);

  // Single action handler for tap / click / key / button
  const act = useCallback(() => {
    const g = gameRef.current;
    if (g.phase === "ready") {
      syncPhase("aim");
    } else if (g.phase === "aim") {
      g.lockAimX = g.aimX;
      g.power = 0;
      g.powDir = 1;
      syncPhase("power");
    } else if (g.phase === "power") {
      startShot();
    }
    // shoot / reveal / done: ignore
  }, [startShot, syncPhase]);

  const playAgain = useCallback(() => {
    gameRef.current = freshGame();
    setShots(0);
    setGoals(0);
    setFlash(null);
    syncPhase("ready");
  }, [syncPhase]);

  // ---- main loop ----
  useEffect(() => {
    reducedRef.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let running = true;

    const resize = () => {
      const wrap = wrapRef.current!;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrapRef.current!);

    const frame = (now: number) => {
      if (!running) return;
      const g = gameRef.current;
      const dt = g.last ? Math.min(48, now - g.last) : 16;
      g.last = now;
      update(g, dt, now);
      render(ctx, canvas, g);
      rafRef.current = requestAnimationFrame(frame);
    };
    rafRef.current = requestAnimationFrame(frame);

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafRef.current);
      } else if (!running) {
        running = true;
        gameRef.current.last = 0;
        rafRef.current = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
    // update/resolveShot etc. are stable via refs; loop reads gameRef
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // advance discrete transitions that the loop detects
  const update = useCallback(
    (g: Game, dt: number, now: number) => {
      if (g.phase === "aim") {
        const sp = 0.16 * dt;
        g.aimX += g.aimDir * sp;
        if (g.aimX > AIM_MAX) {
          g.aimX = AIM_MAX;
          g.aimDir = -1;
        } else if (g.aimX < AIM_MIN) {
          g.aimX = AIM_MIN;
          g.aimDir = 1;
        }
      } else if (g.phase === "power") {
        const sp = 0.13 * dt;
        g.power += g.powDir * sp;
        if (g.power >= 100) {
          g.power = 100;
          g.powDir = -1;
        } else if (g.power <= 0) {
          g.power = 0;
          g.powDir = 1;
        }
      } else if (g.phase === "shoot") {
        g.t += dt / g.dur;
        const p = Math.min(1, g.t);
        const e = 1 - Math.pow(1 - p, 2); // easeOutQuad
        g.ballX = BALL_SPOT_X + (g.targetX - BALL_SPOT_X) * e;
        g.ballY = BALL_SPOT_Y + (g.targetY - BALL_SPOT_Y) * e;
        g.ballR = 15 + (6 - 15) * e;
        g.keeperX = g.keeperFromX + (g.keeperToX - g.keeperFromX) * Math.min(1, e * 1.15);
        if (p >= 0.82 && !g.resolved) resolveShot();
      } else if (g.phase === "reveal") {
        if (now >= g.revealUntil) nextPenalty();
      }

      // fx
      if (g.shake > 0) g.shake = Math.max(0, g.shake - dt * 0.04);
      if (g.particles.length) {
        for (const pt of g.particles) {
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.vy += 0.14;
          pt.life -= dt / 800;
        }
        g.particles = g.particles.filter((pt) => pt.life > 0);
      }
    },
    [resolveShot, nextPenalty]
  );

  // keyboard on the focusable wrapper
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter" || e.key === "ArrowUp") {
      e.preventDefault();
      if (gameRef.current.phase === "done") playAgain();
      else act();
    }
  };

  const actionLabel =
    phase === "ready"
      ? "Kick off"
      : phase === "aim"
        ? "Lock aim"
        : phase === "power"
          ? "Shoot!"
          : "…";

  const hint =
    phase === "ready"
      ? "Tap / press Space to start"
      : phase === "aim"
        ? "Tap to lock your aim"
        : phase === "power"
          ? "Tap at the right power"
          : phase === "shoot" || phase === "reveal"
            ? "\u00a0"
            : "";

  const resultMsg = (() => {
    if (goals === 5) return "Perfect five. Golden Boot! \u{1F3C6}";
    if (goals === 4) return "Top scorer of the match.";
    if (goals === 3) return "Solid finishing.";
    if (goals === 2) return "Needs a bit more practice.";
    return "Rough day at the office.";
  })();

  return (
    <div
      ref={wrapRef}
      tabIndex={0}
      onKeyDown={onKey}
      onPointerDown={(e) => {
        if (phase !== "done") {
          e.preventDefault();
          act();
        }
      }}
      className="relative mx-auto aspect-[36/47] w-full max-w-[420px] cursor-pointer touch-none select-none overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/50 outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
      role="application"
      aria-label="Penalty shootout minigame"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Scoreboard */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3 text-white">
        <span className="rounded-full bg-black/45 px-3 py-1 font-display text-xs font-semibold tracking-wide backdrop-blur">
          Penalty {Math.min(shots + (phase === "done" ? 0 : 1), TOTAL)}/{TOTAL}
        </span>
        <span className="rounded-full bg-black/45 px-3 py-1 font-display text-xs font-semibold tracking-wide backdrop-blur">
          Goals <span className="text-brand-400">{goals}</span>
        </span>
      </div>

      {/* Flash message */}
      {flash && phase !== "done" && (
        <div
          key={flash.id}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <span
            className={`animate-[popIn_.4s_cubic-bezier(.2,.7,.2,1)] font-display text-5xl font-extrabold drop-shadow-[0_4px_18px_rgba(0,0,0,0.6)] ${
              flash.type === "GOAL" ? "text-brand-400" : "text-white"
            }`}
          >
            {flash.text}
          </span>
        </div>
      )}

      {/* Bottom controls */}
      {phase !== "done" && (
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 bg-gradient-to-t from-black/60 via-black/25 to-transparent p-4 pt-10">
          <p className="font-display text-xs uppercase tracking-[0.2em] text-white/70">{hint}</p>
          <button
            type="button"
            disabled={phase === "shoot" || phase === "reveal"}
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.stopPropagation();
              act();
            }}
            className="btn btn-primary pointer-events-auto text-sm disabled:cursor-default disabled:opacity-60"
          >
            {actionLabel}
          </button>
        </div>
      )}

      {/* Done overlay */}
      {phase === "done" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-ink/80 p-6 text-center backdrop-blur-sm">
          <span className="font-display text-xs uppercase tracking-[0.3em] text-brand-300">
            Full time
          </span>
          <div className="font-display text-6xl font-extrabold text-white">
            {goals}
            <span className="text-2xl text-muted"> / {TOTAL}</span>
          </div>
          <p className="max-w-xs text-sm text-chalk/90">{resultMsg}</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <button type="button" onClick={playAgain} className="btn btn-primary text-sm">
              Play again
            </button>
            <a href="#contact" className="btn btn-ghost text-sm">
              Score for real
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Rendering
   ============================================================ */
function render(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, g: Game) {
  const sx = canvas.width / LW;
  const sy = canvas.height / LH;
  const shx = g.shake ? (Math.random() - 0.5) * g.shake : 0;
  const shy = g.shake ? (Math.random() - 0.5) * g.shake : 0;
  ctx.setTransform(sx, 0, 0, sy, shx * sx, shy * sy);
  ctx.clearRect(0, 0, LW, LH);

  drawPitch(ctx);
  drawGoal(ctx);
  drawKeeper(ctx, g);
  if (g.phase === "aim" || g.phase === "power") drawAim(ctx, g);
  drawBall(ctx, g.ballX, g.ballY, g.ballR);
  if (g.phase === "power") drawPowerGauge(ctx, g.power);
  drawParticles(ctx, g);
}

function drawPitch(ctx: CanvasRenderingContext2D) {
  const grad = ctx.createLinearGradient(0, 0, 0, LH);
  grad.addColorStop(0, "#0b3a23");
  grad.addColorStop(1, "#07271a");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, LW, LH);

  // mowing stripes (perspective-ish, brighter near bottom)
  for (let i = 0; i < 7; i++) {
    ctx.fillStyle = i % 2 === 0 ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.05)";
    const y = 150 + i * 46;
    ctx.fillRect(0, y, LW, 46);
  }
  // penalty arc + spot
  ctx.strokeStyle = "rgba(255,255,255,0.28)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(180, 470, 120, Math.PI * 1.15, Math.PI * 1.85);
  ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.beginPath();
  ctx.arc(BALL_SPOT_X, BALL_SPOT_Y, 2.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawGoal(ctx: CanvasRenderingContext2D) {
  const L = 74;
  const R = 286;
  // net
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 1;
  for (let x = L + 12; x < R; x += 16) {
    ctx.beginPath();
    ctx.moveTo(x, CROSSBAR_Y + 3);
    ctx.lineTo(x, GOAL_LINE_Y);
    ctx.stroke();
  }
  for (let y = CROSSBAR_Y + 12; y < GOAL_LINE_Y; y += 15) {
    ctx.beginPath();
    ctx.moveTo(L + 3, y);
    ctx.lineTo(R - 3, y);
    ctx.stroke();
  }
  // frame
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(L, GOAL_LINE_Y);
  ctx.lineTo(L, CROSSBAR_Y);
  ctx.lineTo(R, CROSSBAR_Y);
  ctx.lineTo(R, GOAL_LINE_Y);
  ctx.stroke();
}

function drawKeeper(ctx: CanvasRenderingContext2D, g: Game) {
  const x = g.keeperX;
  const y = 138;
  const diving = Math.abs(x - 180) > 12;
  const dir = x < 180 ? -1 : 1;
  ctx.save();
  ctx.translate(x, y);
  if (diving) ctx.rotate(dir * 0.28);

  // shadow
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.beginPath();
  ctx.ellipse(0, 20, 16, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // body (keeper kit)
  ctx.fillStyle = "#f4c430";
  roundRect(ctx, -11, -12, 22, 30, 7);
  ctx.fill();
  // head
  ctx.fillStyle = "#eab98f";
  ctx.beginPath();
  ctx.arc(0, -18, 7, 0, Math.PI * 2);
  ctx.fill();
  // gloves
  ctx.fillStyle = "#ffffff";
  const gx = diving ? 15 * dir : 13;
  ctx.beginPath();
  ctx.arc(gx, diving ? -10 : -2, 4.5, 0, Math.PI * 2);
  ctx.arc(-gx, diving ? -2 : -2, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawBall(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.save();
  // shadow
  ctx.fillStyle = "rgba(0,0,0,0.22)";
  ctx.beginPath();
  ctx.ellipse(x, y + r * 0.75, r * 0.9, r * 0.32, 0, 0, Math.PI * 2);
  ctx.fill();
  // ball
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.18)";
  ctx.lineWidth = 1;
  ctx.stroke();
  // simple pentagon accents
  ctx.fillStyle = "#0b1220";
  const p = r * 0.42;
  ctx.beginPath();
  ctx.arc(x, y, p * 0.7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(x - r * 0.32, y - r * 0.3, r * 0.16, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawAim(ctx: CanvasRenderingContext2D, g: Game) {
  const x = g.phase === "aim" ? g.aimX : g.lockAimX;
  const y = 106;
  ctx.save();
  ctx.strokeStyle = g.phase === "aim" ? "rgba(34,224,123,0.85)" : "rgba(255,255,255,0.5)";
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(BALL_SPOT_X, BALL_SPOT_Y);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.setLineDash([]);
  // reticle
  ctx.strokeStyle = "#22e07b";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(x, y, 9, 0, Math.PI * 2);
  ctx.moveTo(x - 14, y);
  ctx.lineTo(x + 14, y);
  ctx.moveTo(x, y - 14);
  ctx.lineTo(x, y + 14);
  ctx.stroke();
  ctx.restore();
}

function drawPowerGauge(ctx: CanvasRenderingContext2D, power: number) {
  const x = 24;
  const top = 250;
  const h = 130;
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  roundRect(ctx, x - 8, top - 8, 16, h + 16, 8);
  ctx.fill();
  // fill
  const fh = (power / 100) * h;
  const grad = ctx.createLinearGradient(0, top + h, 0, top);
  grad.addColorStop(0, "#22e07b");
  grad.addColorStop(0.7, "#4fe895");
  grad.addColorStop(1, "#ff5d5d");
  ctx.fillStyle = grad;
  roundRect(ctx, x - 5, top + (h - fh), 10, fh, 5);
  ctx.fill();
  // sweet-spot marker
  ctx.strokeStyle = "rgba(255,255,255,0.7)";
  ctx.lineWidth = 1.5;
  const sy = top + h - (0.85 * h);
  ctx.beginPath();
  ctx.moveTo(x - 9, sy);
  ctx.lineTo(x + 9, sy);
  ctx.stroke();
  ctx.restore();
}

function drawParticles(ctx: CanvasRenderingContext2D, g: Game) {
  for (const p of g.particles) {
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.fillStyle = p.c;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
