import Image from "next/image";

export default function PresentationPage() {
  return (
    <main
      className="
        h-screen
        overflow-y-scroll
        snap-y snap-mandatory
        bg-[#040915]
        text-white
      "
    >
      {/* ------------------------ SLIDE 1 ------------------------ */}
      <section className="relative min-h-screen snap-start flex items-center">
        {/* Background */}
        <Image
          src="/slides/first.png"
          alt="442 Cloud stadium"
          fill
          priority
          className="object-cover pointer-events-none"
        />
        <div className="absolute inset-0 bg-black/55" />

        {/* Dekoracyjne kształty */}
        <div className="pointer-events-none absolute -left-32 bottom-10 h-56 w-56 rounded-full bg-green-500/10 blur-3xl" />
        <div className="pointer-events-none absolute right-10 top-10 h-32 w-32 rounded-full border border-green-400/30" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-10">
          {/* Badge jak na slajdzie */}
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-black/50 border border-white/20 mb-6">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            <span className="text-xs md:text-sm font-oxanium tracking-[0.25em] uppercase text-green-100">
              Engineering your digital victory!
            </span>
          </div>

          {/* Tytuł + podkreślenie */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-oxanium">
            442 CLOUD
          </h1>
          <div className="h-1 w-24 bg-green-400 rounded-full mb-8" />

          <p className="max-w-xl text-gray-100 text-lg">
            A winning Salesforce strategy designed to strengthen your team,
            streamline your play, and elevate your results.
          </p>
        </div>
      </section>

      {/* ------------------------ SLIDE 2 ------------------------ */}
<section className="relative min-h-screen snap-start flex items-center">
  {/* Decorative shapes */}
  <div className="pointer-events-none absolute -right-40 top-10 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />
  <div className="pointer-events-none absolute left-0 bottom-0 h-40 w-40 rounded-full border border-green-400/25" />

  <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16">
    <div className="grid gap-16 md:grid-cols-[1.4fr_1fr] items-center">
      
      {/* LEFT — TEXT PANEL */}
      <div>
        <div className="inline-block rounded-3xl bg-white/5 border border-white/10 px-6 py-5 mb-8 shadow-lg shadow-black/40">
          <h2 className="text-3xl md:text-4xl font-bold font-oxanium leading-tight mb-3">
            NO ONE CAN BEAT US IN IT,
            <br /> WE ARE THE MIGHTY 442 CLOUD
          </h2>
          <div className="h-[2px] w-24 bg-green-400 rounded-full" />
        </div>

        <p className="text-gray-200 mb-6 max-w-2xl text-lg leading-relaxed">
          We deliver IT implementations with precision and purpose. Just like
          the 4-4-2 formation in football, our approach is built on structure,
          balance, and smart strategy. We align the right expertise in the
          right positions to ensure every project moves forward efficiently
          and delivers outstanding results.
        </p>

        <button className="mt-4 px-8 py-3 rounded-full bg-green-500 text-black font-semibold font-oxanium tracking-wide shadow-lg shadow-green-500/20">
          EXPLORE
        </button>
      </div>

      {/* RIGHT — LARGE FLAG */}
      <div className="relative flex justify-center md:justify-end">
        <div className="
          relative
          w-[340px] h-[420px]
          md:w-[420px] md:h-[520px]
          lg:w-[480px] lg:h-[600px]
          rounded-3xl
          overflow-hidden
          border border-white/20
          bg-white/5
          shadow-2xl shadow-black/60
        ">
          <Image
            src="/slides/flag.png"
            alt="442 Cloud flag"
            fill
            priority
            className="object-cover"
          />

          {/* subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

          {/* tag in corner */}
          <div className="absolute bottom-4 left-5 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-oxanium text-white/80">
              OFFICIAL FLAG
            </span>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>


      {/* ------------------------ SLIDE 3 ------------------------ */}
      <section className="relative min-h-screen snap-start flex items-center">
        {/* delikatny pasek z lewej jak shape */}
        <div className="pointer-events-none absolute left-0 top-16 bottom-16 w-1 bg-gradient-to-b from-green-500/0 via-green-500/60 to-green-500/0" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-oxanium">
            OUR CREW
          </h2>
          <div className="h-[2px] w-20 bg-green-400 rounded-full mb-8" />

          <p className="text-gray-300 mb-10 max-w-2xl text-lg">
            Meet the team that turns strategy into results and brings every
            project to the winning league!
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <CrewCard
              name="Mateusz Chalaba"
              role="CEO"
              photo="/crew/mateusz.jpg"
            />
            <CrewCard
              name="Kamil Rzepka"
              role="Board Member"
              photo="/crew/kamil.jpg"
            />
            <CrewCard
              name="Michał Kwika"
              role="Board Member"
              photo="/crew/michal.jpg"
            />
          </div>
        </div>
      </section>

      {/* ------------------------ SLIDE 4 ------------------------ */}
      <section className="relative min-h-screen snap-start flex items-center">
        {/* pionowa linia jak oś timeline */}
        <div className="pointer-events-none absolute left-1/2 top-24 bottom-24 w-px bg-gradient-to-b from-green-500/0 via-green-500/60 to-green-500/0 hidden lg:block" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-oxanium">
            OUR HISTORY
          </h2>
          <div className="h-[2px] w-24 bg-green-400 rounded-full mb-8" />

          <p className="text-gray-200 mb-10 max-w-3xl text-lg">
            442 Cloud was born when three friends decided it was time to build
            something of their own — a company shaped by their ambitions,
            values, and passion for technology.
          </p>

          <div className="grid gap-4 md:grid-cols-4 text-lg">
            <HistoryItem title="2024" text="idea to do something together" />
            <HistoryItem title="March 2025" text="442 Cloud officially created" />
            <HistoryItem title="May 2025" text="first project begin" />
            <HistoryItem title="December 2025" text="expansion started" />
          </div>
        </div>
      </section>

      {/* ------------------------ SLIDE 5 ------------------------ */}
      <section className="relative min-h-screen snap-start flex items-center">
        {/* prawa strona – piłki */}
        <div className="absolute inset-y-0 right-0 w-full md:w-1/2">
          <Image
            src="/slides/balls.png"
            alt="Skillset"
            fill
            className="object-cover opacity-80"
          />
        </div>

        {/* lekki ciemny gradient od lewej, żeby tekst był czytelny */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#040915] via-[#040915]/80 to-[#040915]/10" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-oxanium">
            OUR <span className="text-green-400">SKILLSET</span>
          </h2>
          <div className="h-[2px] w-24 bg-green-400 rounded-full mb-6" />

          <p className="text-gray-200 mb-8 max-w-xl text-lg">
            A comprehensive set of cloud competencies that empower your business
            at every stage.
          </p>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm max-w-xl">
            <ul className="space-y-3 text-lg">
              {[
                "Agentforce Sales",
                "Agentforce Service",
                "Agentforce Field Service",
                "Agentforce Service Portal",
                "Agentforce Nonprofit",
                "Agentforce Revenue Management",
                "Custom Built Solutions",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------ SLIDE 6 ------------------------ */}
      <section className="relative min-h-screen snap-start flex items-center">
        {/* dekoracyjny ring */}
        <div className="pointer-events-none absolute -right-16 top-24 h-40 w-40 rounded-full border border-green-400/40" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-oxanium max-w-3xl">
            OUR STRATEGY DESIGNED FOR YOUR BUSINESS
          </h2>
          <div className="h-[2px] w-24 bg-green-400 rounded-full mb-10" />

          <div className="grid gap-8 md:grid-cols-3 text-lg">
            <StepCard
              step="STEP 1"
              title="MASTERING THE ANALYSIS"
              text="Through collaborative workshops, we collect requirements and build a foundation."
            />
            <StepCard
              step="STEP 2"
              title="PREPARING TACTICS AND STRATEGY"
              text="We translate insights into a clear action plan."
            />
            <StepCard
              step="STEP 3"
              title="FAIR PLAY AND VICTORY"
              text="We deliver with full transparency and dedication."
            />
          </div>
        </div>
      </section>

      {/* ------------------------ SLIDE 7 ------------------------ */}
      <section className="relative min-h-screen snap-start flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/slides/contact.png"
            alt="Contact"
            fill
            className="object-cover opacity-80"
          />
        </div>

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-16">
          {/* mały badge w stylu slajdu */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-white/20 mb-6">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-oxanium text-white/80">
              Let&apos;s talk
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-oxanium max-w-xl">
            WE ARE HERE TO SECURE YOUR IT VICTORY
          </h2>

          <div className="inline-flex items-center gap-4 bg-green-500 text-black px-6 py-4 rounded-xl shadow-xl shadow-green-500/40">
            <span className="font-bold text-lg font-oxanium">C</span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide">
                Contact us
              </p>
              <a
                href="mailto:contact@442cloud.com"
                className="text-base font-medium"
              >
                contact@442cloud.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------
   CREW CARD
------------------------------------------------------------- */
function CrewCard({
  name,
  role,
  photo,
}: {
  name: string;
  role: string;
  photo: string;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center backdrop-blur-sm">
      <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden bg-white/10">
        <Image src={photo} alt={name} fill className="object-cover" />
      </div>
      <h3 className="font-semibold text-lg font-oxanium">{name}</h3>
      <p className="text-sm text-gray-300 uppercase tracking-wide">{role}</p>
    </div>
  );
}

/* -------------------------------------------------------------
   HISTORY ITEM
------------------------------------------------------------- */
function HistoryItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
      <p className="text-green-400 font-semibold mb-2 font-oxanium">{title}</p>
      <p className="text-gray-200 text-sm md:text-base">{text}</p>
    </div>
  );
}

/* -------------------------------------------------------------
   STEP CARD
------------------------------------------------------------- */
function StepCard({
  step,
  title,
  text,
}: {
  step: string;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3 backdrop-blur-sm">
      <p className="text-green-400 text-sm font-semibold font-oxanium uppercase tracking-wide">
        {step}
      </p>
      <h3 className="font-semibold text-lg font-oxanium">{title}</h3>
      <p className="text-gray-200 text-sm md:text-base">{text}</p>
    </div>
  );
}
