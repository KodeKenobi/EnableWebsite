import { Link } from "react-router-dom";

export default function DisclaimersPage() {
  return (
    <main className="min-h-screen bg-[var(--color-fg-strong)] px-6 py-16 text-[var(--color-fg-inverse)] md:px-10 lg:px-16">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-[color-mix(in_srgb,var(--color-fg-inverse)_78%,transparent)] hover:text-[var(--color-fg-inverse)]"
        >
          ← Back to home
        </Link>

        <h1
          className="mt-6 text-4xl leading-tight md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Disclaimers
        </h1>

        <section className="mt-10 space-y-6 text-[color-mix(in_srgb,var(--color-fg-inverse)_90%,transparent)]">
          <p>
            This page contains legal and policy notices for Enable. The cookie
            preferences in the cookie modal control optional analytics,
            functional, and marketing cookies used on this website.
          </p>
          <p>
            Essential cookies are required for core functionality. Optional
            cookies are only set according to your consent preferences.
          </p>
          <p>
            For additional policy language, replace this starter content with
            your finalized legal text.
          </p>
        </section>
      </div>
    </main>
  );
}
