// pages/precios.js
//
// Sprint 5 — Gap monetización: landing pública con planes Free/Pro/Premium.
// CTA "Empezar" envía a /unete (alta de cuenta) → de ahí flujo de checkout
// inicia desde el admin (panel de billing) según el plan elegido.

import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { siteConfig } from "../lib/siteConfig";

const PLANS = [
  {
    slug: "free",
    name: "Free",
    priceLabel: "$0 MXN",
    sub: "Para empezar",
    features: [
      "3 listings activos",
      "Trial 30 días Pro al alta",
      "Recibe leads sin pagar",
    ],
    ctaLabel: "Empezar gratis",
    ctaHref: "/unete",
    highlight: false,
  },
  {
    slug: "pro",
    name: "Pro",
    priceLabel: "$499 MXN/mes",
    sub: "Para agentes en crecimiento",
    features: [
      "25 listings activos",
      "1 listing destacado",
      "Estadísticas básicas",
      "Badge Pro",
      "Soporte por email",
    ],
    ctaLabel: "Probar Pro",
    ctaHref: "/unete?plan=pro",
    highlight: true,
  },
  {
    slug: "premium",
    name: "Premium",
    priceLabel: "$1,499 MXN/mes",
    sub: "Para agentes top",
    features: [
      "100 listings activos",
      "5 listings destacados",
      "Estadísticas avanzadas",
      "Badge Premium",
      "Soporte prioritario",
    ],
    ctaLabel: "Ir a Premium",
    ctaHref: "/unete?plan=premium",
    highlight: false,
  },
];

export default function PreciosPage() {
  const title = `Precios | ${siteConfig.brandName}`;
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Planes Gabana: Free, Pro y Premium. Sin contratos. Cancela cuando quieras."
        />
      </Head>
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 py-10">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-950">
            Precios
          </h1>
          <p className="mt-3 text-base text-slate-600">
            Sin contratos. Acepta tarjeta y OXXO. Factura SAT (CFDI 4.0)
            disponible.
          </p>
        </header>

        <section className="mt-10 grid gap-4 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.slug}
              className={`rounded-2xl border bg-white p-6 shadow-sm flex flex-col ${
                p.highlight
                  ? "border-blue-600 ring-1 ring-blue-100 lg:scale-105"
                  : "border-slate-200"
              }`}
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                {p.name}
              </p>
              <p className="mt-1 text-3xl font-bold text-slate-950">
                {p.priceLabel}
              </p>
              <p className="text-sm text-slate-600">{p.sub}</p>

              <ul className="mt-5 space-y-2 text-sm text-slate-700 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={p.ctaHref}
                className={`mt-6 rounded-[20px] px-5 py-3 text-center text-sm font-semibold ${
                  p.highlight
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-blue-600 text-blue-700 hover:bg-blue-50"
                }`}
              >
                {p.ctaLabel}
              </Link>
            </div>
          ))}
        </section>

        <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Preguntas frecuentes
          </h2>
          <div className="mt-3 space-y-3 text-sm text-slate-700">
            <Faq
              q="¿Puedo cambiar de plan después?"
              a="Sí. El cambio de Pro→Premium se aplica al instante (proración). De plan superior a inferior se aplica al cierre de tu ciclo."
            />
            <Faq
              q="¿Cobran por listing o por suscripción?"
              a="Suscripción mensual fija. Tus listings dentro del límite de tu plan están incluidos. Sin comisión por venta."
            />
            <Faq
              q="¿Aceptan OXXO?"
              a="Sí. Stripe + OXXO Pay para México. La factura SAT (CFDI) se emite automáticamente al cobro."
            />
            <Faq
              q="¿Y si rebota mi tarjeta?"
              a="Tienes 7 días de gracia con reintentos automáticos. Te avisamos por email cada vez que falle. Si tras 7 días no actualizas el método de pago, bajas a Free automáticamente."
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Faq({ q, a }) {
  return (
    <div>
      <p className="font-medium text-slate-900">{q}</p>
      <p className="mt-1 text-slate-600">{a}</p>
    </div>
  );
}
