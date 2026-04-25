// /Users/hectoremilio/Proyectos/nextjs/gabana_real_estate/components/HomeListingsView.js
import { useMemo, useState } from "react";
import SearchBar from "./SearchBar";
import FiltersBar from "./FiltersBar";
import ListingGrid from "./ListingGrid";
import Pagination from "./Pagination";

const PAGE_SIZE = 9;

export function HomeListingsView({ initialListings }) {
  const [query, setQuery] = useState("");
  const [operation, setOperation] = useState("rent");
  const [propertyType, setPropertyType] = useState("");
  const [sort, setSort] = useState("recent");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    beds: null,
    price: null,
    zone: null,
    badge: null,
  });

  // usamos lo que viene del servidor (DB)
  const listings = initialListings || [];

  // --- helpers de búsqueda ---
  const normalize = (s) =>
    (s || "")
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // quita acentos
      .replace(/[^a-z0-9\s]/g, " ") // symbols rara
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

    // ubicaciones
    cdmx: "cdmx",
    "ciudad de mexico": "cdmx",
    "ciudad de méxico": "cdmx",
    df: "cdmx",
    "d f": "cdmx",
  };

  const canonical = (token) => ALIAS[token] || token;

  const updateFilter = (key, value) => {
    setPage(1);
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));
  };

  const filtered = useMemo(() => {
    const qNorm = normalize(query);
    const tokens = qNorm.split(" ").filter((t) => t.length >= 2); // ignorar 1 letra

    return listings.filter((l) => {
      // armamos un string grande con todos los campos relevantes
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
          l.slug,
        ].join(" | ")
      );

      // cada token (con alias) debe existir en el haystack (AND)
      const matchesQuery =
        tokens.length === 0 ||
        tokens.every((t) => haystack.includes(canonical(t)));

      const matchesOperation =
        operation === "rent" ||
        haystack.includes("venta") ||
        haystack.includes("comprar");

      const matchesPropertyType =
        !propertyType || haystack.includes(canonical(propertyType));

      const matchesBeds =
        !filters.beds || (l.beds || "").includes(filters.beds);

      const matchesPrice =
        !filters.price ||
        parseInt(String(l.priceLabel || "").replace(/\D/g, ""), 10) <=
          filters.price;

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
        matchesOperation &&
        matchesPropertyType &&
        matchesBeds &&
        matchesPrice &&
        matchesZone &&
        matchesBadge
      );
    });
  }, [query, filters, listings, operation, propertyType]);

  const sorted = useMemo(() => {
    const toPrice = (listing) =>
      parseInt(String(listing.priceLabel || "").replace(/\D/g, ""), 10) || 0;
    const toSize = (listing) =>
      parseInt(String(listing.size || "").replace(/\D/g, ""), 10) || 0;

    return [...filtered].sort((a, b) => {
      if (sort === "price-asc") return toPrice(a) - toPrice(b);
      if (sort === "price-desc") return toPrice(b) - toPrice(a);
      if (sort === "size-desc") return toSize(b) - toSize(a);
      return 0;
    });
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = sorted.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const resetFilters = () => {
    setQuery("");
    setOperation("rent");
    setPropertyType("");
    setSort("recent");
    setPage(1);
    setFilters({
      beds: null,
      price: null,
      zone: null,
      badge: null,
    });
  };

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar
          value={query}
          operation={operation}
          propertyType={propertyType}
          onSearch={(value) => {
            setPage(1);
            setQuery(value);
          }}
          onOperationChange={(value) => {
            setPage(1);
            setOperation(value);
          }}
          onPropertyTypeChange={(value) => {
            setPage(1);
            setPropertyType(value);
          }}
        />
      </div>

      <FiltersBar
        filters={filters}
        sort={sort}
        updateFilter={updateFilter}
        resetFilters={resetFilters}
        onSortChange={(value) => {
          setPage(1);
          setSort(value);
        }}
      />

      <div className="text-sm text-gray-600 mt-2">
        {sorted.length.toLocaleString()} propiedades en renta - México
      </div>

      <ListingGrid items={paginated} />
      <Pagination
        page={currentPage}
        pages={totalPages}
        onPageChange={setPage}
      />
    </>
  );
}
