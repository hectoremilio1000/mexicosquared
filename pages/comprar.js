import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { HomeListingsView } from "../components/HomeListingsView";
import { fetchPublicListings } from "../lib/api";
import { siteConfig } from "../lib/siteConfig";

export default function Comprar({ initialResponse }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Head>
        <title>Comprar propiedades | {siteConfig.brandName}</title>
        <meta
          name="description"
          content="Explora propiedades en venta verificadas por agentes de Gabana en toda la república mexicana."
        />
      </Head>
      <Header />
      <main className="mx-auto w-full max-w-7xl space-y-8 px-0 pb-10 md:px-4 md:py-6">
        <HomeListingsView
          initialResponse={initialResponse}
          defaultOperation="venta"
        />
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const initialResponse = await fetchPublicListings({
      operation: "venta",
      per_page: 9,
      sort: "created_at:desc",
    });
    return { props: { initialResponse } };
  } catch (err) {
    console.error("Error en getServerSideProps comprar:", err);
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
