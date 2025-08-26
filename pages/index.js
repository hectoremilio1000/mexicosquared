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
  const [filters, setFilters] = useState({
    beds: null,
    price: null,
    street: null,
    zone: null,
    badge: null,
  });

  // --- helpers de búsqueda avanzada ---
  const normalize = (s) =>
    (s || "")
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // quita acentos
      .replace(/[^a-z0-9\s]/g, " ") // quita símbolos raros
      .replace(/\s+/g, " ")
      .trim();

  // mapa de sinónimos → término canónico
  const ALIAS = {
    // tipos
    depa: "departamento",
    depas: "departamento",
    departamento: "departamento",
    departamentos: "departamento",
    depto: "departamento",
    deptos: "departamento",
    apto: "departamento",
    aptos: "departamento",
    apartamento: "departamento",
    apartamentos: "departamento",

    condo: "condominio",
    condominios: "condominio",
    condominio: "condominio",

    casa: "casa",
    casas: "casa",
    residencia: "casa",
    residencias: "casa",
    villa: "casa",
    villas: "casa",

    terreno: "terreno",
    lot: "terreno",
    lote: "terreno",
    lotes: "terreno",
    parcela: "terreno",
    parcelas: "terreno",
    land: "terreno",

    // ubicaciones frecuentes
    cdmx: "cdmx",
    "ciudad de mexico": "cdmx",
    "ciudad de méxico": "cdmx",
    df: "cdmx",
    "d f": "cdmx",
    // puedes ir agregando más estados/colonias si quieres alias
  };

  const canonical = (token) => ALIAS[token] || token;

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));
  };

  const filtered = useMemo(() => {
    const qNorm = normalize(query);
    const tokens = qNorm.split(" ").filter((t) => t.length >= 2); // ignora 1 letra

    return listings.filter((l) => {
      // armamos un solo “haystack” con todos los campos relevantes
      const haystack = normalize(
        [
          l.title,
          l.address,
          l.zone,
          l.summary,
          l.beds,
          l.size,
          l.priceLabel,
          ...(l.badges || []),
          ...(l.highlights || []),
          l.slug, // a veces trae pistas del tipo/ubicación
        ].join(" | ")
      );

      // cada token (con alias) debe existir en el haystack (AND)
      const matchesQuery =
        tokens.length === 0 ||
        tokens.every((t) => haystack.includes(canonical(t)));

      // filtros extras (lo que ya tenías)
      const matchesBeds = !filters.beds || l.beds.includes(filters.beds);
      const matchesPrice =
        !filters.price ||
        parseInt(l.priceLabel.replace(/\D/g, ""), 10) <= filters.price;
      const matchesStreet =
        !filters.street || haystack.includes(normalize(filters.street));
      const matchesZone =
        !filters.zone || haystack.includes(normalize(filters.zone));
      const matchesBadge =
        !filters.badge ||
        (l.badges &&
          l.badges.some((b) =>
            normalize(b).includes(normalize(filters.badge))
          ));

      return (
        matchesQuery &&
        matchesBeds &&
        matchesPrice &&
        matchesStreet &&
        matchesZone &&
        matchesBadge
      );
    });
  }, [query, filters]);

  const resetFilters = () => {
    setQuery("");
    setFilters({
      beds: null,
      price: null,
      street: null,
      zone: null,
      badge: null,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 py-6 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar value={query} onSearch={setQuery} />
        </div>

        <FiltersBar updateFilter={updateFilter} resetFilters={resetFilters} />

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
