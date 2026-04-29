import { useEffect, useState } from "react";
import MapboxMap from "./MapboxMap";
import { fetchPublicListings } from "../lib/api";

export default function HeroMap() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [operation, setOperation] = useState("venta");

  // Cargar listings al montar (max 200 para el mapa hero)
  useEffect(() => {
    let cancelled = false;

    async function loadItems() {
      try {
        setLoading(true);
        const response = await fetchPublicListings({ per_page: 200 });
        if (!cancelled) {
          setItems(response.data || []);
        }
      } catch (err) {
        console.error("Error cargando listings para HeroMap:", err);
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadItems();
    return () => {
      cancelled = true;
    };
  }, []);

  // Navegar a /buscar con query
  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (operation) params.set("operation", operation);
    window.location.href = `/buscar?${params.toString()}`;
  };

  // Transformar items al formato que MapboxMap espera. La API devuelve camelCase
  // (priceLabel, operationType) y `coords: {lat,lng}` ya estructurado.
  const mappedItems = items
    .filter((item) => item.coords && typeof item.coords.lat === "number")
    .map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.title || "Propiedad",
      priceLabel: item.priceLabel || `MN ${item.price?.toLocaleString() || "0"}`,
      beds: item.beds || "",
      image: item.image || "",
      coords: item.coords,
      operationType: item.operationType || "venta",
      address: item.address || "",
      zone: item.zone || "",
    }));

  // Calcular bounds para centrar mapa en items
  let initialBbox = null;
  if (mappedItems.length > 0) {
    const lats = mappedItems
      .filter((i) => i.coords && i.coords.lat)
      .map((i) => i.coords.lat);
    const lngs = mappedItems
      .filter((i) => i.coords && i.coords.lng)
      .map((i) => i.coords.lng);

    if (lats.length > 0 && lngs.length > 0) {
      const south = Math.min(...lats);
      const west = Math.min(...lngs);
      const north = Math.max(...lats);
      const east = Math.max(...lngs);
      initialBbox = [south, west, north, east];
    }
  }

  // Stats dinámicos. Mientras carga muestra "—" en vez de fallback engañoso.
  const totalListings = loading ? "—" : items.length;
  const zones = loading
    ? "—"
    : [...new Set(items.map((i) => i.zone).filter(Boolean))].length;

  return (
    <section className="bg-slate-50 py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Grid: desktop 50/50, mobile stack */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Left: Content */}
          <div className="flex flex-col justify-center">
            {/* Eyebrow */}
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 sm:text-sm">
              El MLS donde están los agentes de México
            </p>

            {/* H1 */}
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-slate-950 sm:mt-4 sm:text-4xl lg:text-5xl">
              Encuentra propiedades reales con agentes verificados.
            </h1>

            {/* Paragraph */}
            <p className="mt-3 max-w-lg text-base leading-7 text-slate-600 sm:mt-4">
              Busca, compara y contacta directamente al agente. Sin intermediarios
              opacos, sin lead-gen pagada extra.
            </p>

            {/* Stats Grid: 3 columns */}
            <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4 lg:mt-8">
              <div className="rounded-lg border border-slate-200 bg-white p-3 sm:p-4">
                <strong className="block text-xl font-semibold text-slate-950 sm:text-2xl">
                  {totalListings}
                </strong>
                <span className="text-xs text-slate-600 sm:text-sm">
                  Propiedades
                </span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3 sm:p-4">
                <strong className="block text-xl font-semibold text-slate-950 sm:text-2xl">
                  {zones}
                </strong>
                <span className="text-xs text-slate-600 sm:text-sm">
                  Zonas activas
                </span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3 sm:p-4">
                <strong className="block text-xl font-semibold text-slate-950 sm:text-2xl">
                  24/7
                </strong>
                <span className="text-xs text-slate-600 sm:text-sm">
                  Captación digital
                </span>
              </div>
            </div>

            {/* Search Form */}
            <form
              onSubmit={handleSearch}
              className="mt-6 flex flex-col gap-2 sm:flex-row sm:gap-3 lg:mt-8"
            >
              <input
                type="text"
                placeholder="Ciudad, colonia o amenidad"
                aria-label="Búsqueda de propiedades"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="rounded border border-slate-300 bg-white px-4 py-2 text-sm placeholder-slate-500 outline-none transition focus:border-blue-700 focus:ring-1 focus:ring-blue-700 sm:text-base"
              />
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
                aria-label="Tipo de operación"
                className="rounded border border-slate-300 bg-white px-4 py-2 text-sm font-medium outline-none transition focus:border-blue-700 focus:ring-1 focus:ring-blue-700 sm:text-base"
              >
                <option value="venta">Comprar</option>
                <option value="renta_larga">Rentar</option>
              </select>
              <button
                type="submit"
                className="rounded bg-blue-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 sm:text-base whitespace-nowrap"
              >
                Buscar
              </button>
            </form>

            {/* Secondary CTA */}
            <a
              href="/buscar"
              className="mt-4 inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-800 sm:mt-6"
            >
              Explorar todas las propiedades en el mapa
              <span className="ml-2">→</span>
            </a>
          </div>

          {/* Right: Map */}
          <div className="h-80 sm:h-96 lg:h-auto lg:min-h-[560px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center bg-slate-100">
                <p className="text-sm text-slate-500">Cargando mapa...</p>
              </div>
            ) : (
              <MapboxMap
                items={mappedItems}
                initialBbox={initialBbox}
                onBoundsChange={null}
                height="100%"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
