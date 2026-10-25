
const page = () => {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#080808] text-white">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-200px] h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-white/[0.04] blur-[120px]"
      />

      {/* Main content */}
      <section className="relative flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        {/* Brand */}
        <div className="mb-12 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <rect
                x="4"
                y="3"
                width="16"
                height="18"
                rx="4"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle
                cx="12"
                cy="9"
                r="2.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M7.5 17c.8-2.1 2.3-3.2 4.5-3.2s3.7 1.1 4.5 3.2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <span className="text-lg font-medium tracking-tight">
            persona<span className="text-white/40">.</span>
          </span>
        </div>

        {/* Announcement */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium tracking-wide text-white/60">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          SOMETHING NEW IS TAKING SHAPE
        </div>

        {/* Heading */}
        <h1 className="max-w-4xl text-5xl font-medium leading-[1.08] tracking-[-0.06em] sm:text-7xl md:text-8xl">
          Meet the person
          <br />
          behind the <span className="text-white/40">pixels.</span>
        </h1>

        {/* Description */}
        <p className="mt-7 max-w-lg text-base leading-7 text-white/50 sm:text-lg sm:leading-8">
          Your work deserves more than a link. Persona is a new way to
          present who you are, what you do, and the work that speaks for
          itself.
        </p>

        {/* Coming soon */}
        <div className="mt-12 flex items-center gap-3 rounded-full border border-white/10 px-5 py-3 text-sm text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
          <span>Coming soon</span>
          <span className="text-white/25">/</span>
          <span className="text-white/40">Stay tuned</span>
        </div>

        {/* Bottom decorative element */}
        <div className="mt-20 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/25">
          <span className="h-px w-8 bg-white/15" />
          Made for the people behind the work
          <span className="h-px w-8 bg-white/15" />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative flex flex-col items-center justify-between gap-3 border-t border-white/[0.08] px-6 py-6 text-xs text-white/40 sm:flex-row sm:px-10">
        <p>
          © 2026 Persona. All rights reserved.
        </p>

        <p>
          Built by{" "}
          <a
            href="https://monxdev.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-white/80 transition-colors hover:text-white"
          >
            Mohan
          </a>
        </p>
      </footer>
    </main>
  );
};

export default page;
