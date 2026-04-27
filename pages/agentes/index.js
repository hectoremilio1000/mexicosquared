// pages/agentes/index.js
//
// Sprint 4 — Gap #8: directorio público de agentes.

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { fetchPublicAgents } from "../../lib/api";
import { siteConfig } from "../../lib/siteConfig";

export default function AgentesIndex({ response }) {
  const agents = response?.data ?? [];
  const title = `Agentes verificados | ${siteConfig.brandName}`;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Conoce a los agentes verificados de Gabana. Cada perfil incluye foto, bio y propiedades publicadas."
        />
      </Head>
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-slate-950">
            Agentes verificados
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {response?.meta?.total ?? 0} agentes activos en Gabana.
          </p>
        </header>

        {agents.length === 0 ? (
          <p className="rounded-lg border border-slate-200 bg-white px-4 py-10 text-center text-slate-600">
            Aún no hay agentes verificados.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {agents.map((a) => (
              <AgentCard key={a.id} agent={a} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function AgentCard({ agent }) {
  return (
    <Link
      href={`/agentes/${agent.slug}`}
      className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-slate-100">
        {agent.photoUrl ? (
          <Image
            src={agent.photoUrl}
            alt={agent.fullName}
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-lg font-semibold text-slate-500">
            {(agent.fullName || "?")
              .split(" ")
              .map((p) => p[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>
        )}
      </div>
      <div className="flex-1">
        <h2 className="font-semibold text-slate-950 group-hover:text-blue-700">
          {agent.fullName}
        </h2>
        <div className="mt-1 flex flex-wrap gap-1">
          {agent.badges?.includes("verified") && (
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
              Verificado
            </span>
          )}
          {agent.badges?.includes("premium") && (
            <span className="rounded-full bg-yellow-50 px-2 py-0.5 text-xs font-medium text-yellow-700">
              Premium
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export async function getServerSideProps({ query }) {
  const params = {};
  if (query.q) params.q = query.q;
  if (query.state) params.state = query.state;
  if (query.page) params.page = Number(query.page);
  try {
    const response = await fetchPublicAgents(params);
    return { props: { response } };
  } catch {
    return { props: { response: null } };
  }
}
