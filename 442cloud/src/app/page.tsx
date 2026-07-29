import Image from "next/image";
import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";
import TacticBoard from "@/components/TacticBoard";

/* ============================================================
   Small building blocks
   ============================================================ */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/5 px-4 py-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
      <span className="font-display text-[11px] uppercase tracking-[0.28em] text-brand-200">
        {children}
      </span>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={60}>
        <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={120}>
        <div className={`accent-bar mt-5 ${align === "center" ? "mx-auto" : ""}`} />
      </Reveal>
      {intro && (
        <Reveal delay={160}>
          <p className="mt-6 text-lg leading-relaxed text-muted">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

/* Icons (inline, no dependency) */
function Icon({ name }: { name: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "sales":
      return (
        <svg {...common}><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-4 4" /></svg>
      );
    case "service":
      return (
        <svg {...common}><path d="M3 12a9 9 0 0 1 18 0" /><path d="M21 12v4a2 2 0 0 1-2 2h-1v-6h3ZM3 12v4a2 2 0 0 0 2 2h1v-6H3Z" /></svg>
      );
    case "field":
      return (
        <svg {...common}><path d="M12 22s8-4.5 8-11a8 8 0 1 0-16 0c0 6.5 8 11 8 11Z" /><circle cx="12" cy="11" r="3" /></svg>
      );
    case "portal":
      return (
        <svg {...common}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 4v5" /></svg>
      );
    case "nonprofit":
      return (
        <svg {...common}><path d="M19 14c1.5-1.5 3-3.4 3-5.5A3.5 3.5 0 0 0 15.5 6L12 9.3 8.5 6A3.5 3.5 0 0 0 2 8.5C2 12 6 15 12 20c2.3-1.9 4.2-3.6 5.7-5" /></svg>
      );
    case "revenue":
      return (
        <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M14.5 9a2.5 2.5 0 0 0-5 0c0 3 5 1.5 5 4.5a2.5 2.5 0 0 1-5 0M12 6.5v11" /></svg>
      );
    case "custom":
      return (
        <svg {...common}><path d="m8 6-6 6 6 6M16 6l6 6-6 6M13 4l-2 16" /></svg>
      );
    default:
      return (
        <svg {...common}><path d="m5 12 5 5L20 7" /></svg>
      );
  }
}

/* ============================================================
   PAGE
   ============================================================ */

const SKILLS: { title: string; desc: string; icon: string }[] = [
  { title: "Agentforce Sales", desc: "Pipelines, forecasting and AI agents that keep every deal moving forward.", icon: "sales" },
  { title: "Agentforce Service", desc: "Faster case resolution with intelligent, always-on service agents.", icon: "service" },
  { title: "Agentforce Field Service", desc: "Scheduling, mobile work and on-site delivery, orchestrated end to end.", icon: "field" },
  { title: "Agentforce Service Portal", desc: "Self-service Experience Cloud portals your customers actually enjoy.", icon: "portal" },
  { title: "Agentforce Nonprofit", desc: "Purpose-built solutions for organisations that measure impact, not just revenue.", icon: "nonprofit" },
  { title: "Agentforce Revenue Management", desc: "CPQ, billing and revenue flows aligned with how your business really sells.", icon: "revenue" },
  { title: "Custom Built Solutions", desc: "Apex, LWC and integrations tailored to the plays only your team runs.", icon: "custom" },
];

const LINES: { tag: string; title: string; desc: string }[] = [
  {
    tag: "Defence",
    title: "Rock-solid architecture",
    desc: "A stable back line — clean data models, security and governance that never let a goal in.",
  },
  {
    tag: "Midfield",
    title: "Relentless delivery",
    desc: "The engine room. We control the tempo of every sprint and connect strategy to execution.",
  },
  {
    tag: "Attack",
    title: "Measurable results",
    desc: "Where it counts. Automation, AI and adoption that put real points on the board.",
  },
];

const STEPS: { no: string; phase: string; title: string; desc: string }[] = [
  {
    no: "01",
    phase: "Kick-off",
    title: "Mastering the analysis",
    desc: "Through collaborative workshops we collect requirements and build a rock-solid foundation for the project.",
  },
  {
    no: "02",
    phase: "Tactics",
    title: "Preparing the strategy",
    desc: "We translate insights into a clear, prioritised action plan — the tactics that win the match.",
  },
  {
    no: "03",
    phase: "Full time",
    title: "Fair play & victory",
    desc: "We deliver with full transparency and dedication, so results speak for themselves at the final whistle.",
  },
];

const CREW: { name: string; role: string; photo: string; no: string }[] = [
  { name: "Mateusz Chalaba", role: "CEO", photo: "/crew/mateusz.jpg", no: "10" },
  { name: "Kamil Rzepka", role: "Board Member", photo: "/crew/kamil.jpg", no: "4" },
  { name: "Michał Kwika", role: "Board Member", photo: "/crew/michal.jpg", no: "8" },
];

// Salesforce certifications — the trophy cabinet
const CERTS: { name: string; img: string }[] = [
  { name: "Agentforce Specialist", img: "/certs/agentforceSpecialist.png" },
  { name: "Agentforce Sales Consultant", img: "/certs/agentforceSalesConsultant.png" },
  { name: "Application Architect", img: "/certs/applicationArchitect.png" },
  { name: "System Architect", img: "/certs/systemArchitect.png" },
  { name: "Integration Architect", img: "/certs/integrationArchitect.png" },
  { name: "Platform Data Architect", img: "/certs/plarformDataArchitect.png" },
  { name: "Identity & Access Management Architect", img: "/certs/identityAndAccessMngmtArchitect.png" },
  { name: "Sharing & Visibility Architect", img: "/certs/sharingAndVisibilityArchitect.png" },
  { name: "Development Lifecycle & Deployment Architect", img: "/certs/platformDevLifecycleDeploymentArchitect.png" },
  { name: "Platform Developer", img: "/certs/platformDeveloper.png" },
  { name: "Platform App Builder", img: "/certs/platformAppBuilder.png" },
  { name: "Platform Administrator", img: "/certs/platformAdmin.png" },
  { name: "Data 360 Consultant", img: "/certs/d360consultant.png" },
  { name: "Experience Cloud Consultant", img: "/certs/xperienceCloudConsultant.png" },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main id="top" className="relative">
        {/* ============================ HERO ============================ */}
        <section className="relative flex min-h-[100svh] items-center overflow-hidden">
          <Image
            src="/slides/first.png"
            alt="442 Cloud stadium at night"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent" />
          <div className="pitch-grid absolute inset-0 opacity-70" aria-hidden />

          <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-28 pb-20 sm:px-6">
            <Reveal>
              <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/40 px-5 py-2 backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
                </span>
                <span className="font-display text-[11px] uppercase tracking-[0.28em] text-brand-100 sm:text-xs">
                  Engineering your digital victory
                </span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-7 font-display text-6xl font-extrabold leading-[0.95] sm:text-7xl md:text-8xl">
                442 <span className="text-gradient">CLOUD</span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <div className="accent-bar mt-6" />
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-chalk/90 sm:text-xl">
                A winning Salesforce strategy designed to strengthen your team,
                streamline your play and elevate your results.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href="#contact" className="btn btn-primary">
                  Start the match
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </a>
                <a href="#formation" className="btn btn-ghost">
                  See our formation
                </a>
              </div>
            </Reveal>

            <Reveal delay={340}>
              <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
                <span className="font-display uppercase tracking-[0.2em] text-white/50">
                  Powered by
                </span>
                {["Salesforce", "Agentforce", "Experience Cloud", "Service Cloud"].map((t) => (
                  <span key={t} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-brand-500" />
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* scroll hint */}
          <a
            href="#formation"
            aria-label="Scroll to formation"
            className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 sm:flex"
          >
            <span className="font-display text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/25 p-1">
              <span className="anim-nudge h-1.5 w-1.5 rounded-full bg-brand-400" />
            </span>
          </a>
        </section>

        {/* ============================ FORMATION ============================ */}
        <section id="formation" className="relative overflow-hidden bg-ink py-24 sm:py-32">
          <div className="pitch-grid absolute inset-0 opacity-60" aria-hidden />
          <div className="glow-brand absolute -left-40 top-10 h-96 w-96 opacity-20 blur-3xl" aria-hidden />

          <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
            <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
              {/* text */}
              <div>
                <SectionHeading
                  eyebrow="Our philosophy"
                  title={
                    <>
                      No one beats us in IT.
                      <br />
                      We are the mighty{" "}
                      <span className="text-brand-400">442&nbsp;Cloud</span>.
                    </>
                  }
                  intro={
                    <>
                      We deliver IT implementations with precision and purpose. Just like the{" "}
                      <span className="text-white">4-4-2 formation</span> in football, our approach is
                      built on structure, balance and smart strategy — the right expertise in the
                      right positions, so every project moves forward and delivers outstanding
                      results.
                    </>
                  }
                />

                <Reveal delay={200}>
                  <div className="mt-10 grid gap-4 sm:grid-cols-3">
                    {LINES.map((l) => (
                      <div
                        key={l.tag}
                        className="glass rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
                      >
                        <span className="font-display text-[11px] uppercase tracking-[0.22em] text-brand-400">
                          {l.tag}
                        </span>
                        <h3 className="mt-2 font-display text-base font-bold text-white">
                          {l.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{l.desc}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              {/* tactic board + flag */}
              <div className="relative">
                <Reveal delay={120}>
                  <TacticBoard />
                </Reveal>

                <Reveal delay={260}>
                  <div className="anim-floaty ml-auto mt-6 hidden w-36 overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/60 sm:block lg:w-40">
                    <div className="relative aspect-[2/3]">
                      <Image
                        src="/slides/flag.png"
                        alt="442 Cloud official flag"
                        fill
                        sizes="200px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className="absolute bottom-2 left-3 font-display text-[9px] uppercase tracking-[0.25em] text-white/80">
                        Official flag
                      </span>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ============================ SKILLSET ============================ */}
        <section id="skillset" className="relative overflow-hidden bg-ink-800 py-24 sm:py-32">
          {/* balls image */}
          <div className="absolute inset-0">
            <Image
              src="/slides/balls.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-90"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/70" />

          <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
            <SectionHeading
              eyebrow="Our skillset"
              title={
                <>
                  The full squad of <span className="text-brand-400">cloud competencies</span>
                </>
              }
              intro="A comprehensive set of cloud skills that empowers your business at every stage — from the first whistle to the trophy lift."
            />

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SKILLS.map((s, i) => (
                <Reveal key={s.title} delay={i * 60}>
                  <article className="group h-full rounded-2xl border border-white/10 bg-ink-700/70 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-500/50 hover:bg-ink-600/80">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/12 text-brand-400 transition-colors group-hover:bg-brand-500/20">
                      <Icon name={s.icon} />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
                  </article>
                </Reveal>
              ))}

              {/* CTA tile */}
              <Reveal delay={SKILLS.length * 60}>
                <a
                  href="#contact"
                  className="flex h-full flex-col justify-between rounded-2xl border border-brand-500/40 bg-gradient-to-br from-brand-600/25 to-brand-500/5 p-6 transition-transform duration-300 hover:-translate-y-1.5"
                >
                  <span className="font-display text-lg font-bold text-white">
                    Need a play we haven&apos;t listed?
                  </span>
                  <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-brand-300">
                    Let&apos;s build it together
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============================ GAME PLAN ============================ */}
        <section id="gameplan" className="relative overflow-hidden bg-ink py-24 sm:py-32">
          <div className="pitch-grid absolute inset-0 opacity-50" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
            <SectionHeading
              align="center"
              eyebrow="Our game plan"
              title={
                <>
                  A strategy designed for <span className="text-brand-400">your business</span>
                </>
              }
              intro="Three phases, one result. Here's how we take you from kick-off to the final whistle."
            />

            <div className="relative mt-16">
              {/* connecting line (desktop) */}
              <div
                className="pointer-events-none absolute left-0 right-0 top-9 hidden h-[2px] bg-gradient-to-r from-brand-500/10 via-brand-500/70 to-brand-500/10 md:block"
                aria-hidden
              />
              <div className="grid gap-6 md:grid-cols-3">
                {STEPS.map((s, i) => (
                  <Reveal key={s.no} delay={i * 120}>
                    <div className="relative h-full rounded-2xl border border-white/10 bg-ink-700/60 p-7 backdrop-blur transition-transform duration-300 hover:-translate-y-1.5">
                      <div className="mb-6 flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-500/60 bg-ink font-display text-xl font-extrabold text-brand-400 shadow-[0_0_24px_rgba(34,224,123,0.25)]">
                          {s.no}
                        </div>
                        <span className="font-display text-[11px] uppercase tracking-[0.24em] text-brand-300">
                          {s.phase}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-white">{s.title}</h3>
                      <p className="mt-3 leading-relaxed text-muted">{s.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================ SQUAD ============================ */}
        <section id="squad" className="relative overflow-hidden bg-ink-800 py-24 sm:py-32">
          <div className="glow-brand absolute -right-40 top-0 h-96 w-96 opacity-20 blur-3xl" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
            <SectionHeading
              eyebrow="Our crew"
              title={
                <>
                  Meet the <span className="text-brand-400">starting eleven</span>
                </>
              }
              intro="The team that turns strategy into results and brings every project to the winning league."
            />

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CREW.map((c, i) => (
                <Reveal key={c.name} delay={i * 100}>
                  <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-ink-700/60">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={c.photo}
                        alt={c.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                      {/* jersey number */}
                      <span className="absolute right-4 top-3 font-display text-6xl font-extrabold text-white/12 transition-colors duration-300 group-hover:text-brand-500/25">
                        {c.no}
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <span className="font-display text-[11px] uppercase tracking-[0.24em] text-brand-300">
                        {c.role}
                      </span>
                      <h3 className="mt-1 font-display text-xl font-bold text-white">{c.name}</h3>
                      <div className="accent-bar mt-3 w-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ TROPHY CABINET ============================ */}
        <section id="trophies" className="relative overflow-hidden bg-ink py-24 sm:py-32">
          <div className="pitch-grid absolute inset-0 opacity-50" aria-hidden />
          <div className="glow-brand absolute -left-40 bottom-0 h-96 w-96 opacity-20 blur-3xl" aria-hidden />

          <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Trophy cabinet"
                title={
                  <>
                    Silverware in the <span className="text-brand-400">cabinet</span>
                  </>
                }
                intro="Every Salesforce certification is a trophy we've lifted. Proof the squad is match-fit right across the platform — from admin to architect."
              />
              <Reveal delay={120}>
                <div className="glass flex items-center gap-4 rounded-2xl px-6 py-4">
                  <span className="font-display text-4xl font-extrabold text-brand-400">
                    27
                  </span>
                  <span className="text-sm leading-tight text-muted">
                    Salesforce
                    <br />
                    certifications
                  </span>
                </div>
              </Reveal>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
              {CERTS.map((c, i) => (
                <Reveal key={c.img} delay={(i % 4) * 60}>
                  <figure className="group flex h-full flex-col items-center rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-5 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-500/50 hover:from-white/[0.12] hover:shadow-[0_20px_45px_-20px_rgba(34,224,123,0.55)]">
                    <div className="relative h-24 w-24 shrink-0 transition-transform duration-300 group-hover:scale-105 sm:h-28 sm:w-28">
                      <Image
                        src={c.img}
                        alt={`Salesforce Certified ${c.name}`}
                        fill
                        sizes="112px"
                        className="object-contain drop-shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
                      />
                    </div>
                    <figcaption className="mt-4 text-xs font-medium leading-snug text-muted transition-colors group-hover:text-chalk sm:text-sm">
                      {c.name}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ CONTACT ============================ */}
        <section id="contact" className="relative flex min-h-[80svh] items-center overflow-hidden py-24">
          <Image
            src="/slides/contact.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />

          <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-6">
            <Reveal>
              <Eyebrow>Let&apos;s talk</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="max-w-2xl font-display text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
                We are here to secure your{" "}
                <span className="text-gradient">IT victory</span>.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 max-w-xl text-lg text-chalk/85">
                Ready to put a winning formation behind your Salesforce project? Drop us a line and
                let&apos;s plan the first move.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a href="mailto:contact@442cloud.com" className="btn btn-primary text-base">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                  contact@442cloud.com
                </a>
                <span className="text-sm text-muted">
                  We usually reply within one working day.
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============================ FOOTER ============================ */}
        <footer className="border-t border-white/10 bg-ink">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
            <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
              <div className="max-w-sm">
                <a href="#top" className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
                  <span className="font-display text-xl font-extrabold tracking-wide">
                    442<span className="text-brand-400"> CLOUD</span>
                  </span>
                </a>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  Engineering your digital victory. Salesforce &amp; Agentforce implementations built
                  on the precision of a perfect 4-4-2.
                </p>
              </div>

              <nav className="grid grid-cols-2 gap-x-12 gap-y-2 sm:grid-cols-3">
                {[
                  { href: "#formation", label: "Formation" },
                  { href: "#skillset", label: "Skillset" },
                  { href: "#gameplan", label: "Game Plan" },
                  { href: "#squad", label: "Squad" },
                  { href: "#trophies", label: "Trophies" },
                  { href: "#contact", label: "Contact" },
                ].map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-brand-300"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-muted sm:flex-row sm:items-center">
              <span>© {new Date().getFullYear()} 442 Cloud. All rights reserved.</span>
              <a href="mailto:contact@442cloud.com" className="hover:text-brand-300">
                contact@442cloud.com
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
