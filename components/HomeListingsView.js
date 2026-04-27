// /Users/hectoremilio/Proyectos/nextjs/gabana_real_estate/components/HomeListingsView.js
//
// Sprint 1 — Refactor para que el filtrado/ordenado/paginado vivan en el
// backend (Gap #2). Ya NO hacemos `listings.filter(...)` en cliente sobre
// el array completo. Cada cambio en SearchBar / FiltersBar dispara un
// fetch con los query params correspondientes.

import { useEffect, useMemo, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import FiltersBar from "./FiltersBar";
import ListingGrid from "./ListingGrid";
import Pagination from "./Pagination";
import { fetchPublicListings, fetchPublicStates } from "../lib/api";

const PAGE_SIZE = 9;

function emptyFilters() {
  return {
    beds_min: null,
    max_price: null,
    state: null,
    is_featured: false,
  };
}

export function HomeListingsView({ initialResponse, defaultOperation = "venta" }) {
  // initialResponse = { data, meta } del SSR. Si la página vieja todavía pasa
  // un array plano (initialListings), lo envolvemos para no romper.
  const initial = useMemo(() => {
    if (!initialResponse) return null;
    if (Array.isArray(initialResponse)) {
      return {
        data: initialResponse,
        meta: {
          total: initialResponse.length,
          page: 1,
          perPage: initialResponse.length,
          totalPages: 1,
        },
      };
    }
    return initialResponse;
  }, [initialResponse]);

  const [query, setQuery] = useState("");
  const [committedQuery, setCommittedQuery] = useState("");
  const [operation, setOperation] = useState(defaultOperation);
  const [propertyType, setPropertyType] = useState("");
  const [filters, setFilters] = useState(emptyFilters);
  const [sort, setSort] = useState("created_at:desc");
  const [page, setPage] = useState(1);

  const [data, setData] = useState(initial?.data ?? []);
  const [meta, setMeta] = useState(
    initial?.meta ?? { total: 0, page: 1, perPage: PAGE_SIZE, totalPages: 1 }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [states, setStates] = useState([]);
  const isFirstFetch = useRef(true);

  // Cargar catálogo de estados una vez para alimentar el filtro.
  useEffect(() => {
    let cancelled = false;
    fetchPublicStates()
      .then((rows) => {
        if (!cancelled) setStates(rows);
      })
      .catch(() => {
        /* sin estados, FiltersBar oculta el select */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Refetch en cualquier cambio de filtros / sort / page / operation.
  useEffect(() => {
    // En la primera ejecución, si tenemos initialResponse y no hay filtros
    // aplicados (operation = default, sin query, etc.), evitamos un fetch
    // redundante y usamos el SSR.
    if (
      isFirstFetch.current &&
      initial &&
      operation === defaultOperation &&
      !committedQuery &&
      !propertyType &&
      !filters.beds_min &&
      !filters.max_price &&
      !filters.state &&
      !filters.is_featured &&
      sort === "created_at:desc" &&
      page === 1
    ) {
      isFirstFetch.current = false;
      return;
    }
    isFirstFetch.current = false;

    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchPublicListings({
      operation,
      type: propertyType || undefined,
      q: committedQuery || undefined,
      beds_min: filters.beds_min ?? undefined,
      max_price: filters.max_price ?? undefined,
      state: filters.state ?? undefined,
      is_featured: filters.is_featured ? true : undefined,
      sort,
      page,
      per_page: PAGE_SIZE,
    })
      .then((res) => {
        if (cancelled) return;
        setData(res.data);
        setMeta(res.meta);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error(err);
        setError("No se pudieron cargar las propiedades");
        setData([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [
    operation,
    propertyType,
    committedQuery,
    filters,
    sort,
    page,
    defaultOperation,
    initial,
  ]);

  const operationLabel = operation === "venta" ? "venta" : "renta";
  const zones = [...new Set(data.map((item) => item.zone).filter(Boolean))];

  const resetFilters = () => {
    setQuery("");
    setCommittedQuery("");
    setPropertyType("");
    setFilters(emptyFilters());
    setSort("created_at:desc");
    setPage(1);
  };

  const handleSearchSubmit = () => {
    setPage(1);
    setCommittedQuery(query.trim());
  };

  return (
    <>
      <section className="relative overflow-hidden rounded-none border-b border-slate-200 bg-slate-950 text-white md:rounded-xl md:border">
        <div className="absolute inset-0 opacity-45">
          <img
            src={data[0]?.image || "/imagenes/departamentos_escondido.jpg"}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/20" />
        <div className="relative grid gap-8 px-4 py-10 sm:px-8 lg:grid-cols-[1fr_440px] lg:py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
              El MLS donde están los agentes de México
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Encuentra propiedades reales con agentes verificados.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-200">
              Busca, compara y contacta directamente al agente. Sin intermediarios
              opacos, sin lead-gen pagada extra.
            </p>
            <div className="mt-6 grid max-w-lg grid-cols-3 gap-3 text-sm">
              <div className="rounded border border-white/15 bg-white/10 p-3">
                <strong className="block text-2xl">{meta.total}</strong>
                Propiedades
              </div>
              <div className="rounded border border-white/15 bg-white/10 p-3">
                <strong className="block text-2xl">{zones.length || 1}</strong>
                Zonas activas
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
              onSearch={(value) => setQuery(value)}
              onOperationChange={(value) => {
                setPage(1);
                setOperation(value);
              }}
              onPropertyTypeChange={(value) => {
                setPage(1);
                setPropertyType(value);
              }}
              onSubmit={handleSearchSubmit}
            />
            <p className="mt-3 px-1 text-xs text-slate-500">
              Agentes verificados, contacto directo y propiedades publicadas
              desde toda la república.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,760px)_1fr]">
        <section id="propiedades" className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-700">
                  Inventario Gabana
                </p>
                <h2 className="text-2xl font-semibold text-slate-950">
                  {meta.total.toLocaleString()} propiedades en {operationLabel}
                </h2>
                <p className="text-sm text-slate-500">
                  {loading
                    ? "Actualizando resultados…"
                    : "Resultados desde el backend en Railway."}
                </p>
              </div>
              <button
                type="button"
                className="rounded border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700"
              >
                Guardar búsqueda
              </button>
            </div>
            <FiltersBar
              filters={filters}
              states={states}
              sort={sort}
              onFilterChange={(next) => {
                setPage(1);
                setFilters(next);
              }}
              onSortChange={(value) => {
                setPage(1);
                setSort(value);
              }}
              onReset={resetFilters}
            />
            {error && (
              <p className="mt-3 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}
          </div>

          <ListingGrid items={data} />
          <Pagination
            page={meta.page}
            pages={meta.totalPages}
            onPageChange={setPage}
          />
        </section>

        <aside className="hidden lg:block">
          <div className="sticky top-24 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="h-72 bg-slate-100">
              <img
                src={data[0]?.image || "/imagenes/departamentos_escondido.jpg"}
                alt=""
                className="h-full w-full object-cover opacity-80"
              />
            </div>
            <div className="p-5">
              <p className="text-sm font-semibold text-slate-950">
                Vista de mercado
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Próximo paso: mapa Mapbox con clusters por zona, sincronizado
                con tus filtros.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded bg-slate-50 p-3">
                  <strong className="block text-slate-950">
                    {zones[0] || "México"}
                  </strong>
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

      <section
        id="agentes"
        className="rounded-xl border border-slate-200 bg-white p-6"
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-blue-700">
              Para agentes inmobiliarios
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Publica gratis, sube de plan cuando crezcas, recibe leads sin
              pagar lead-gen extra.
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Gabana es la plataforma; los protagonistas son los agentes y las
              propiedades.
            </p>
          </div>
          <div className="rounded-lg bg-slate-950 p-5 text-white">
            <p className="text-sm text-slate-300">Próximamente</p>
            <p className="mt-2 text-xl font-semibold">
              Perfiles públicos de agente + leads en tu inbox.
            </p>
            <a
              href="#contacto"
              className="mt-4 inline-flex rounded bg-white px-4 py-2 text-sm font-semibold text-slate-950"
            >
              Únete como agente
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
