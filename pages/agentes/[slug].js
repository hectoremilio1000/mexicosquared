// pages/agentes/[slug].js
//
// Sprint 4 — Gap #8: perfil público de agente.

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { fetchPublicAgentBySlug } from "../../lib/api";
import { siteConfig } from "../../lib/siteConfig";

export default function AgenteDetail({ agent }) {
  if (!agent) return <div className="p-6">Agente no encontrado</div>;

  const title = `${agent.fullName} | ${siteConfig.brandName}`;
  const description =
    agent.bio || `${agent.fullName} es agente verificado en Gabana. Mira sus propiedades.`;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {agent.photoUrl && <meta property="og:image" content={agent.photoUrl} />}
      </Head>
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 py-8">
        <header className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-start">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full bg-slate-100">
            {agent.photoUrl ? (
              <Image
                src={agent.photoUrl}
                alt={agent.fullName}
                fill
                sizes="112px"
                className="object-cover"
                priority
              />
            ) : (
              <div className="grid h-full w-full place-items-center text-3xl font-semibold text-slate-500">
                {(agent.fullName || "?")
                  .split(" ")
                  .map((p) => p[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-950">
              {agent.fullName}
            </h1>
            <div className="mt-2 flex flex-wrap justify-center gap-2 md:justify-start">
              {agent.badges?.includes("verified") && (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  Agente verificado
                </span>
              )}
              {agent.badges?.includes("premium") && (
                <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-700">
                  Premium
                </span>
              )}
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                {agent.listingsActiveCount} propiedades activas
              </span>
            </div>
            {agent.bio && (
              <p className="mt-3 text-sm text-slate-700">{agent.bio}</p>
            )}
            <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
              {agent.whatsapp && (
                <a
                  href={`https://wa.me/${agent.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[20px] bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  WhatsApp
                </a>
              )}
              {agent.phonePublic && (
                <a
                  href={`tel:${agent.phonePublic}`}
                  className="rounded-[20px] border border-blue-600 px-5 py-2 text-sm font-semibold text-blue-700"
                >
                  {agent.phonePublic}
                </a>
              )}
            </div>
          </div>
        </header>

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-slate-900">
            Propiedades publicadas por {agent.fullName.split(" ")[0]}
          </h2>
          {agent.listings?.length ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {agent.listings.map((l) => (
                <Link
                  key={l.id}
                  href={`/${l.operationType === "renta_larga" ? "renta" : "venta"}/${l.slug}`}
                  className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] bg-slate-100">
                    {l.coverImageUrl && (
                      <Image
                        src={l.coverImageUrl}
                        alt={l.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-base font-semibold text-blue-700">
                      {l.priceLabel}
                    </p>
                    <p className="mt-1 text-sm text-slate-700 line-clamp-1">
                      {l.title}
                    </p>
                    <p className="text-xs text-slate-500">{l.zone}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-600">
              {agent.fullName} aún no tiene propiedades publicadas.
            </p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const agent = await fetchPublicAgentBySlug(params.slug);
    if (!agent) return { notFound: true };
    return { props: { agent } };
  } catch {
    return { notFound: true };
  }
}
