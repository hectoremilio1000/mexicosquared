import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroMap from "../components/HeroMap";
import { HomeListingsView } from "../components/HomeListingsView";
import { fetchPublicListings } from "../lib/api";
import { siteConfig } from "../lib/siteConfig";

export default function Rentar({ initialResponse }) {
  const pageTitle = `Rentar propiedades | ${siteConfig.brandName}`;
  const description =
    "Encuentra propiedades en renta larga (6-12 meses) con agentes verificados de Gabana.";
  const ogImage = `${siteConfig.siteUrl}/og-image.png`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteConfig.brandName} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${siteConfig.siteUrl}/rentar`} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="es_MX" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <Header />
      <main className="flex flex-col space-y-8 pb-10">
        <HeroMap defaultOperation="renta_larga" />
        <div className="mx-auto w-full max-w-7xl space-y-8 px-0 md:px-4 md:py-6">
          <HomeListingsView
            initialResponse={initialResponse}
            defaultOperation="renta_larga"
            hideHero
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const initialResponse = await fetchPublicListings({
      operation: "renta_larga",
      per_page: 9,
      sort: "created_at:desc",
    });
    return { props: { initialResponse } };
  } catch (err) {
    console.error("Error en getServerSideProps rentar:", err);
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
