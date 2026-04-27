// pages/unete.js
//
// Sprint 4 — Gap #8: alta de agente (multi-step básico).
//
// Stub funcional: esta página redirige a la conversación con soporte por ahora,
// porque el endpoint POST /api/auth/register-agent + S3 upload de docs vive
// también en Sprint 4 backend pero requiere bucket S3 configurado para uploads
// privados. Sprint 5 cierra el flujo completo cuando esté lista la billing
// integración (necesitamos el plan al alta para asignar trial Pro 30d).

import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { siteConfig } from "../lib/siteConfig";

export default function UnetePage() {
  const title = `Únete como agente | ${siteConfig.brandName}`;
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Únete a Gabana, el MLS de México. Plan Free para empezar, Pro y Premium cuando crezcas."
        />
      </Head>
      <Header />
      <main className="mx-auto w-full max-w-3xl px-4 py-10">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-950">
            Únete como agente a Gabana
          </h1>
          <p className="mt-3 text-base text-slate-600">
            Publica propiedades, recibe leads y haz crecer tu cartera.
            Aprobamos tu cuenta en 24-48 horas hábiles.
          </p>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <PlanCard
            name="Free"
            price="$0"
            features={["3 listings activos", "Trial 30 días Pro al alta"]}
          />
          <PlanCard
            name="Pro"
            price="$499 MXN/mes"
            highlight
            features={[
              "25 listings activos",
              "1 destacado",
              "Estadísticas básicas",
            ]}
          />
          <PlanCard
            name="Premium"
            price="$1,499 MXN/mes"
            features={[
              "100 listings activos",
              "5 destacados",
              "Soporte prioritario",
              "Badge Premium",
            ]}
          />
        </section>

        <section className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            ¿Cómo funciona?
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
            <li>Llena el formulario de registro con tus datos básicos.</li>
            <li>Sube RFC, INE (frente y reverso) y foto de perfil.</li>
            <li>Te aprobamos en 24-48 horas hábiles.</li>
            <li>Empiezas a publicar inventario y recibir leads.</li>
          </ol>

          <div className="mt-5 flex flex-wrap gap-3">
            {/* Sprint 5: el botón abrirá el flujo multi-step real conectado
                a POST /api/auth/register-agent + uploads. Por ahora redirige
                a /contacto para soporte humano. */}
            <Link
              href="/contacto"
              className="rounded-[20px] bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Empezar registro
            </Link>
            <a
              href="mailto:hola@gabanarealstate.com.mx?subject=Quiero%20ser%20agente%20Gabana"
              className="rounded-[20px] border border-blue-600 px-6 py-3 text-sm font-semibold text-blue-700"
            >
              Hablar con soporte
            </a>
          </div>
        </section>

        <section className="mt-10 text-center text-sm text-slate-600">
          <p>
            ¿Ya tienes cuenta?{" "}
            <a
              href={siteConfig.adminUrl || "http://localhost:5173"}
              className="text-blue-700 underline"
            >
              Entra al panel
            </a>
            .
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function PlanCard({ name, price, features, highlight = false }) {
  return (
    <div
      className={`rounded-xl border bg-white p-5 shadow-sm ${
        highlight ? "border-blue-600 ring-1 ring-blue-100" : "border-slate-200"
      }`}
    >
      <p className="text-sm font-semibold text-slate-900">{name}</p>
      <p className="mt-1 text-2xl font-bold text-slate-950">{price}</p>
      <ul className="mt-3 space-y-1 text-sm text-slate-700">
        {features.map((f) => (
          <li key={f}>· {f}</li>
        ))}
      </ul>
    </div>
  );
}
