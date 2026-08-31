import type { Metadata } from "next";
import Link from "next/link";

import { getDataMode } from "@/lib/supabase/env";

import { signInWithMagicLink } from "./actions";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; sent?: string }>;
}) {
  const params = await searchParams;
  const demo = getDataMode(process.env) === "demo";

  return (
    <main id="main-content" className="login-page">
      <section className="login-card card">
        <Link className="brand brand--dark" href="/">
          <span className="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 32 32"><path d="M6 8h8v8H6zM18 8h8v5h-8zM6 20h5v6H6zM15 17h11v9H15z" /></svg>
          </span>
          <span>Career Decision OS</span>
        </Link>
        <div>
          <span className="eyebrow">Optional account · 可选账户</span>
          <h1>{demo ? "Explore the complete demo" : "Sign in with a secure link"}</h1>
          <p>
            {demo
              ? "No account is required. Demo changes remain in this local session."
              : "Enter your email and Supabase will send a one-time Magic Link."}
          </p>
        </div>
        {params.error ? <p className="form-message form-message--error" role="alert">{params.error}</p> : null}
        {params.sent ? <p className="form-message form-message--success" role="status">Check your email for the sign-in link.</p> : null}
        <form action={signInWithMagicLink}>
          {!demo ? (
            <label>
              Email address
              <input name="email" type="email" autoComplete="email" required />
            </label>
          ) : null}
          <button className="button button--primary" type="submit">
            {demo ? "Enter demo workspace" : "Send Magic Link"}
          </button>
        </form>
        <p className="login-note">The open demo uses fictional data. Optional cloud mode keeps each account isolated with Row Level Security.</p>
      </section>
    </main>
  );
}
