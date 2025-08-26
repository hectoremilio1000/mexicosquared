import { useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import FiltersBar from "../components/FiltersBar";
import ListingGrid from "../components/ListingGrid";
import Pagination from "../components/Pagination";
import { listings } from "../data/listings";

export default function Home() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return listings;
    return listings.filter(
      (l) =>
        l.address.toLowerCase().includes(q) || l.zone.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 py-6 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar onSearch={setQuery} />
        </div>

        <FiltersBar />

        <div className="text-sm text-gray-600 mt-2">
          {filtered.length.toLocaleString()} propiedades en renta - México
        </div>

        <ListingGrid items={filtered} />

        <Pagination />
      </main>
      <Footer />
    </div>
  );
}
