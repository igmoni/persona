import Link from "next/link";

const NotFound = () => {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#080808] text-white">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-200px] left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-white/[0.04] blur-[120px]"
      />

      {/* Main content */}
      <section className="relative flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        {/* Brand */}
        <Link
          href="/"
          aria-label="Persona home"
          className="mb-16 flex items-center gap-3 transition-opacity hover:opacity-70"
        >
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
        </Link>

        {/* 404 */}
        <p className="mb-5 text-xs font-medium tracking-[0.35em] text-white/30 uppercase">
          Error 404
        </p>

        <h1 className="text-7xl font-medium tracking-[-0.07em] sm:text-9xl">
          Lost in
          <br />
          <span className="text-white/35">the pixels.</span>
        </h1>

        <p className="mt-7 max-w-sm text-sm leading-7 text-white/50 sm:text-base">
          Looks like this page doesn't belong to anyone. Let's get you back to
          where you belong.
        </p>

        {/* Home button */}
        <Link
          href="/"
          className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:bg-white/85"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
            aria-hidden="true"
          >
            <path
              d="M19 12H5m0 0 7-7m-7 7 7 7"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to home
        </Link>

        <div className="mt-20 flex items-center gap-3 text-[10px] tracking-[0.3em] text-white/25 uppercase">
          <span className="h-px w-8 bg-white/15" />
          Every pixel has a place
          <span className="h-px w-8 bg-white/15" />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative flex flex-col items-center justify-between gap-3 border-t border-white/[0.08] px-6 py-6 text-xs text-white/40 sm:flex-row sm:px-10">
        <p>© 2026 Persona. All rights reserved.</p>

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

export default NotFound;
