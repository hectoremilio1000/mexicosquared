// /Users/hectoremilio/Proyectos/nextjs/gabana_real_estate/pages/index.js
import Header from "../components/Header";
import Footer from "../components/Footer";
import { HomeListingsView } from "../components/HomeListingsView";
import { fetchPublicListings } from "../lib/api";
import Head from "next/head";
import { siteConfig } from "../lib/siteConfig";

export default function Home({ initialListings }) {
  const pageTitle = `${siteConfig.brandName} | Propiedades en Mexico`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="Busca propiedades en renta y venta con Gabana Real Estate."
        />
      </Head>
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 py-6 space-y-4">
        <HomeListingsView initialListings={initialListings} />
      </main>
      <Footer />
    </div>
  );
}

// SSR: cargar listings desde Adonis
export async function getServerSideProps() {
  try {
    const initialListings = await fetchPublicListings();
    return { props: { initialListings } };
  } catch (err) {
    console.error("Error en getServerSideProps listings:", err);
    return { props: { initialListings: [] } };
  }
}
