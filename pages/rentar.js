import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { HomeListingsView } from "../components/HomeListingsView";
import { fetchPublicListings } from "../lib/api";
import { siteConfig } from "../lib/siteConfig";

export default function Rentar({ initialListings }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Head>
        <title>Rentar propiedades | {siteConfig.brandName}</title>
        <meta
          name="description"
          content="Encuentra propiedades en renta verificadas por Gabana Real Estate."
        />
      </Head>
      <Header />
      <main className="mx-auto w-full max-w-7xl space-y-8 px-0 pb-10 md:px-4 md:py-6">
        <HomeListingsView initialListings={initialListings} defaultOperation="rent" />
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const initialListings = await fetchPublicListings();
    return { props: { initialListings } };
  } catch (err) {
    console.error("Error en getServerSideProps rentar:", err);
    return { props: { initialListings: [] } };
  }
}
