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
  const description =
    "Encuentra propiedades en venta y renta con agentes verificados en toda la república mexicana.";
  const ogImage = `${siteConfig.siteUrl}/og-image.png`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        {/* Open Graph (WhatsApp / Facebook / LinkedIn) */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteConfig.brandName} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={siteConfig.siteUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Gabana Real Estate · El MLS donde están los agentes de México" />
        <meta property="og:locale" content="es_MX" />
        {/* Twitter / X Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
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
