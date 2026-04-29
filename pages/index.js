// /Users/hectoremilio/Proyectos/nextjs/gabana_real_estate/pages/index.js
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroMap from "../components/HeroMap";
import { HomeListingsView } from "../components/HomeListingsView";
import { fetchPublicListings } from "../lib/api";
import Head from "next/head";
import { siteConfig } from "../lib/siteConfig";

export default function Home({ initialResponse }) {
  const pageTitle = `${siteConfig.brandName} | El MLS donde están los agentes de México`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="Encuentra propiedades en venta y renta con agentes verificados en toda la república mexicana."
        />
      </Head>
      <Header />
      <main className="flex flex-col space-y-8 pb-10">
        <HeroMap />
        <div className="mx-auto w-full max-w-7xl space-y-8 px-0 md:px-4 md:py-6">
          <HomeListingsView
            initialResponse={initialResponse}
            defaultOperation="venta"
            hideHero
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

// SSR: cargamos la primera página de venta. El resto se filtra en cliente
// vía /api/listings con los nuevos query params (Sprint 1, Gap #2).
export async function getServerSideProps() {
  try {
    const initialResponse = await fetchPublicListings({
      operation: "venta",
      per_page: 9,
      sort: "created_at:desc",
    });
    return { props: { initialResponse } };
  } catch (err) {
    console.error("Error en getServerSideProps listings:", err);
    return {
      props: {
        initialResponse: {
          data: [],
          meta: { total: 0, page: 1, perPage: 9, totalPages: 1 },
        },
      },
    };
  }
}
