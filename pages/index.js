// /Users/hectoremilio/Proyectos/nextjs/gabana_real_estate/pages/index.js
import Header from "../components/Header";
import Footer from "../components/Footer";
import { HomeListingsView } from "../components/HomeListingsView";
import { fetchPublicListings } from "../lib/api";

export default function Home({ initialListings }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
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
