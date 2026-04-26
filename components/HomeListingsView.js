// /Users/hectoremilio/Proyectos/nextjs/gabana_real_estate/components/HomeListingsView.js
import { useMemo, useState } from "react";
import SearchBar from "./SearchBar";
import FiltersBar from "./FiltersBar";
import ListingGrid from "./ListingGrid";
import Pagination from "./Pagination";

const PAGE_SIZE = 9;

export function HomeListingsView({ initialListings, defaultOperation = "sale" }) {
  const [query, setQuery] = useState("");
  const [operation, setOperation] = useState(defaultOperation);
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
  const operationLabel = operation === "sale" ? "venta" : "renta";
  const zones = [...new Set(listings.map((item) => item.zone).filter(Boolean))];

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
        operation === "sale"
          ? haystack.includes("venta") || haystack.includes("comprar")
          : haystack.includes("renta") || haystack.includes("rentar");

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
    setOperation(defaultOperation);
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
      <section className="relative overflow-hidden rounded-none border-b border-slate-200 bg-slate-950 text-white md:rounded-xl md:border">
        <div className="absolute inset-0 opacity-45">
          <img
            src={listings[0]?.image || "/imagenes/departamentos_escondido.jpg"}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/20" />
        <div className="relative grid gap-8 px-4 py-10 sm:px-8 lg:grid-cols-[1fr_440px] lg:py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
              Plataforma inmobiliaria verificada
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Encuentra propiedades exclusivas con respaldo profesional.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-200">
              Busca, compara y agenda visitas en una red diseñada para compradores,
              propietarios y asesores inmobiliarios.
            </p>
            <div className="mt-6 grid max-w-lg grid-cols-3 gap-3 text-sm">
              <div className="rounded border border-white/15 bg-white/10 p-3">
                <strong className="block text-2xl">{listings.length}</strong>
                Listados activos
              </div>
              <div className="rounded border border-white/15 bg-white/10 p-3">
                <strong className="block text-2xl">{zones.length || 1}</strong>
                Zonas
              </div>
              <div className="rounded border border-white/15 bg-white/10 p-3">
                <strong className="block text-2xl">24/7</strong>
                Captación digital
              </div>
            </div>
          </div>
          <div className="self-end rounded-xl bg-white p-3 text-slate-950 shadow-2xl">
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
            <p className="mt-3 px-1 text-xs text-slate-500">
              Propiedades verificadas, contacto directo y gestión para asesores.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,760px)_1fr]">
        <section id="propiedades" className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-700">Inventario Gabana</p>
                <h2 className="text-2xl font-semibold text-slate-950">
                  {sorted.length.toLocaleString()} propiedades en {operationLabel}
                </h2>
                <p className="text-sm text-slate-500">
                  Resultados actualizados desde el backend en Railway.
                </p>
              </div>
              <button className="rounded border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700">
                Guardar búsqueda
              </button>
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
          </div>

          <ListingGrid items={paginated} />
          <Pagination
            page={currentPage}
            pages={totalPages}
            onPageChange={setPage}
          />
        </section>

        <aside className="hidden lg:block">
          <div className="sticky top-24 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="h-72 bg-slate-100">
              <img
                src={listings[0]?.image || "/imagenes/departamentos_escondido.jpg"}
                alt=""
                className="h-full w-full object-cover opacity-80"
              />
            </div>
            <div className="p-5">
              <p className="text-sm font-semibold text-slate-950">Vista de mercado</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Próximo paso: conectar mapa real por coordenadas, clusters de
                propiedades y búsqueda por zona.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded bg-slate-50 p-3">
                  <strong className="block text-slate-950">{zones[0] || "México"}</strong>
                  Zona principal
                </div>
                <div className="rounded bg-slate-50 p-3">
                  <strong className="block text-slate-950">MLS</strong>
                  Experiencia objetivo
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <section id="agentes" className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-blue-700">Para asesores y propietarios</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Publica, administra y convierte interesados desde una sola red.
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Gabana conecta inventario, administración y contacto comercial para
              que cada propiedad tenga presencia pública y seguimiento operativo.
            </p>
          </div>
          <div className="rounded-lg bg-slate-950 p-5 text-white">
            <p className="text-sm text-slate-300">Siguiente integración</p>
            <p className="mt-2 text-xl font-semibold">Leads, WhatsApp y agente responsable.</p>
            <a href="#contacto" className="mt-4 inline-flex rounded bg-white px-4 py-2 text-sm font-semibold text-slate-950">
              Solicitar información
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
