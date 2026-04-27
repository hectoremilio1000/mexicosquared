// Sprint 1 — FiltersBar consume los nuevos query params del backend.
//
// Antes: chips hardcodeados ("4+ recámaras", "Hasta 10M") con filtrado
// en cliente sobre el array completo.
//
// Ahora: controles estructurados que mandan beds_min, max_price, state,
// is_featured y sort directamente al endpoint /api/listings.

const BEDS_OPTIONS = [
  { value: null, label: "Todas" },
  { value: 1, label: "1+" },
  { value: 2, label: "2+" },
  { value: 3, label: "3+" },
  { value: 4, label: "4+" },
];

const PRICE_PRESETS = [
  { value: null, label: "Sin tope" },
  { value: 3000000, label: "Hasta $3M" },
  { value: 6000000, label: "Hasta $6M" },
  { value: 10000000, label: "Hasta $10M" },
  { value: 25000000, label: "Hasta $25M" },
];

const SORT_OPTIONS = [
  { value: "created_at:desc", label: "Recientes" },
  { value: "price:asc", label: "Menor precio" },
  { value: "price:desc", label: "Mayor precio" },
  { value: "size:desc", label: "Mayor superficie" },
];

export default function FiltersBar({
  filters = {},
  states = [],
  sort,
  onFilterChange,
  onSortChange,
  onReset,
}) {
  const safeFilters = filters || {};
  const setField = (key, value) => onFilterChange?.({ ...safeFilters, [key]: value });

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        className="rounded border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:border-slate-950"
        onClick={onReset}
        type="button"
      >
        Limpiar
      </button>

      {/* Recámaras */}
      <div className="flex items-center gap-1 rounded border border-slate-300 bg-white px-2 py-1">
        <span className="text-xs text-slate-500">Recámaras</span>
        {BEDS_OPTIONS.map((opt) => {
          const active = safeFilters.beds_min === opt.value;
          return (
            <button
              key={opt.label}
              type="button"
              onClick={() => setField("beds_min", opt.value)}
              className={`rounded px-2 py-1 text-xs font-medium ${
                active ? "bg-slate-950 text-white" : "text-slate-600"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Precio máximo */}
      <select
        className="h-9 rounded border border-slate-300 bg-white px-2 text-sm font-medium text-slate-700"
        value={safeFilters.max_price ?? ""}
        onChange={(e) =>
          setField(
            "max_price",
            e.target.value === "" ? null : Number(e.target.value)
          )
        }
        aria-label="Precio máximo"
      >
        {PRICE_PRESETS.map((opt) => (
          <option key={opt.label} value={opt.value ?? ""}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Estado */}
      {states.length > 0 && (
        <select
          className="h-9 rounded border border-slate-300 bg-white px-2 text-sm font-medium text-slate-700"
          value={safeFilters.state ?? ""}
          onChange={(e) =>
            setField("state", e.target.value === "" ? null : e.target.value)
          }
          aria-label="Estado"
        >
          <option value="">Todos los estados</option>
          {states.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      )}

      {/* Destacados */}
      <button
        type="button"
        className={`rounded border px-3 py-2 text-sm font-medium ${
          safeFilters.is_featured
            ? "border-amber-500 bg-amber-50 text-amber-700"
            : "border-slate-300 bg-white text-slate-700"
        }`}
        onClick={() => setField("is_featured", !safeFilters.is_featured)}
      >
        Destacados ★
      </button>

      <div className="ml-auto flex min-w-44 items-center gap-2 text-sm">
        <label htmlFor="sort-listings" className="text-gray-500">
          Ordenar
        </label>
        <select
          id="sort-listings"
          className="rounded border border-slate-300 bg-white px-2 py-2 text-slate-700"
          value={sort}
          onChange={(e) => onSortChange?.(e.target.value)}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
