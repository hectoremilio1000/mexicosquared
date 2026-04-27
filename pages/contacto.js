// pages/contacto.js
//
// Sprint 2 — Gap #5: página /contacto general (sin listing_id).

import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LeadForm from "../components/LeadForm";
import { siteConfig } from "../lib/siteConfig";

export default function ContactoPage() {
  const title = `Contacto | ${siteConfig.brandName}`;
  const description =
    "Escríbenos. Te responde un agente verificado de Gabana en menos de 24 horas.";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <Header />
      <main className="mx-auto w-full max-w-3xl px-4 py-10">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-950">
            Contáctanos
          </h1>
          <p className="mt-3 text-base text-slate-600">
            ¿Buscas una propiedad o quieres unirte a Gabana como agente?
            Cuéntanos qué necesitas. Te respondemos en menos de 24 horas.
          </p>
        </header>

        <section className="mt-8">
          <LeadForm variant="page" />
        </section>

        <section className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Otros canales</p>
          <ul className="mt-2 space-y-1">
            <li>
              Soporte:{" "}
              <a
                href="mailto:hola@gabanarealstate.com.mx"
                className="text-blue-700 underline"
              >
                hola@gabanarealstate.com.mx
              </a>
            </li>
            {siteConfig.whatsapp && (
              <li>
                WhatsApp:{" "}
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`}
                  className="text-blue-700 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {siteConfig.whatsapp}
                </a>
              </li>
            )}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
