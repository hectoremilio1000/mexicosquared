// lib/sentry.js
//
// Sprint 7 — Sentry init.
//
// Stub: solo activa si NEXT_PUBLIC_SENTRY_DSN está definido. El SDK se carga
// dinámicamente desde el bundle del browser cuando hay DSN, evitando inflar
// el primer load para usuarios en dev.

let initialized = false;

export async function initSentry() {
  if (typeof window === "undefined") return;
  if (initialized) return;
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) return;
  initialized = true;
  try {
    const Sentry = await import("@sentry/browser");
    Sentry.init({
      dsn,
      tracesSampleRate: 0.1,
      replaysSessionSampleRate: 0,
    });
  } catch {
    // Silencioso — si @sentry/browser no está instalado, no rompe la app.
  }
}
