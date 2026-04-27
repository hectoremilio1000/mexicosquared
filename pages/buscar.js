// pages/buscar.js
//
// Sprint 3 — Gap #4: página /buscar con split list+mapa.
//
// Layout:
//   - Desktop (≥lg): grid 60% lista / 40% mapa, mapa sticky.
//   - Mobile: toggle "Lista | Mapa" arriba, una vista a la vez.
//
// La URL refleja todo el estado de búsqueda (operation, type, filtros, bbox)
// para que compartir un link preserve la búsqueda (deep linking).

import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import FiltersBar from "../components/FiltersBar";
import ListingGrid from "../components/ListingGrid";
import Pagination from "../components/Pagination";
import MapboxMap from "../components/MapboxMap";
import { fetchPublicListings, operationKeyToBackend } from "../lib/api";
import { siteConfig } from "../lib/siteConfig";

const PER_PAGE = 20;

export default function BuscarPage({ initialResponse, initialQuery }) {
  const router = useRouter();
  const [response, setResponse] = useState(initialResponse);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("list"); // mobile toggle: "list" | "map"

  const items = response?.data ?? [];
  const meta = response?.meta ?? { total: 0, page: 1, perPage: PER_PAGE, totalPages: 1 };

  const queryParams = useMemo(() => paramsFromRouter(router.query), [router.query]);

  // Refetch cuando cambian los query params.
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const data = await fetchPublicListings(queryParams);
        if (!cancelled) setResponse(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (router.isReady) load();
    return () => {
      cancelled = true;
    };
  }, [router.isReady, JSON.stringify(queryParams)]);

  function pushQuery(next) {
    const merged = { ...router.query, ...next };
    // Limpia keys vacías para que la URL se vea limpia.
    Object.keys(merged).forEach((k) => {
      if (
        merged[k] === undefined ||
        merged[k] === null ||
        merged[k] === ""
      ) {
        delete merged[k];
      }
    });
    router.push({ pathname: "/buscar", query: merged }, undefined, {
      shallow: true,
    });
  }

  function handleBoundsChange(bbox) {
    const [s, w, n, e] = bbox;
    const next = `${s.toFixed(4)},${w.toFixed(4)},${n.toFixed(4)},${e.toFixed(4)}`;
    if (router.query.bbox !== next) pushQuery({ bbox: next, page: 1 });
  }

  const initialBbox = router.query.bbox
    ? router.query.bbox.split(",").map(Number)
    : null;

  const pageTitle = `Buscar propiedades | ${siteConfig.brandName}`;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="Busca casas, departamentos, terrenos y más en México. Filtra por ubicación, precio, recámaras y amenidades. Mapa interactivo."
        />
      </Head>
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 py-6">
        <h1 className="sr-only">Buscar propiedades</h1>

        <div className="mb-4">
          <SearchBar />
          <div className="mt-3">
            <FiltersBar />
          </div>
        </div>

        {/* Toggle mobile */}
        <div className="mb-3 lg:hidden">
          <div className="inline-flex rounded-full bg-slate-100 p-1 text-sm">
            <button
              type="button"
              onClick={() => setView("list")}
              className={`rounded-full px-4 py-1 ${
                view === "list" ? "bg-white shadow text-blue-700" : "text-slate-600"
              }`}
            >
              Lista
            </button>
            <button
              type="button"
              onClick={() => setView("map")}
              className={`rounded-full px-4 py-1 ${
                view === "map" ? "bg-white shadow text-blue-700" : "text-slate-600"
              }`}
            >
              Mapa
            </button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[3fr_2fr]">
          {/* Lista */}
          <section className={`${view === "map" ? "hidden lg:block" : ""}`}>
            {loading && (
              <p className="mb-3 text-sm text-slate-500">Buscando...</p>
            )}
            <p className="mb-3 text-sm text-slate-600">
              {meta.total} {meta.total === 1 ? "propiedad" : "propiedades"} encontradas
            </p>
            <ListingGrid items={items} />
            <div className="mt-6">
              <Pagination
                page={meta.page}
                totalPages={meta.totalPages}
                onChange={(p) => pushQuery({ page: p })}
              />
            </div>
          </section>

          {/* Mapa */}
          <aside
            className={`lg:sticky lg:top-20 h-fit ${
              view === "list" ? "hidden lg:block" : ""
            }`}
          >
            <MapboxMap
              items={items}
              initialBbox={initialBbox && initialBbox.length === 4 ? initialBbox : null}
              onBoundsChange={handleBoundsChange}
              height="calc(100vh - 200px)"
            />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function paramsFromRouter(q) {
  const out = {};
  if (q.operation) out.operation = operationKeyToBackend(q.operation);
  if (q.type) out.type = q.type;
  if (q.beds_min) out.beds_min = Number(q.beds_min);
  if (q.baths_min) out.baths_min = Number(q.baths_min);
  if (q.min_price) out.min_price = Number(q.min_price);
  if (q.max_price) out.max_price = Number(q.max_price);
  if (q.state) out.state = q.state;
  if (q.municipality) out.municipality = q.municipality;
  if (q.amenities) out.amenities = q.amenities;
  if (q.q) out.q = q.q;
  if (q.bbox) out.bbox = q.bbox;
  if (q.is_featured) out.is_featured = q.is_featured === "1";
  if (q.sort) out.sort = q.sort;
  out.page = Number(q.page) || 1;
  out.per_page = Number(q.per_page) || PER_PAGE;
  return out;
}

export async function getServerSideProps({ query }) {
  const initialQuery = paramsFromRouter(query);
  try {
    const initialResponse = await fetchPublicListings(initialQuery);
    return { props: { initialResponse, initialQuery } };
  } catch {
    return {
      props: {
        initialResponse: { data: [], meta: { total: 0, page: 1, perPage: PER_PAGE, totalPages: 1 } },
        initialQuery,
      },
    };
  }
}
