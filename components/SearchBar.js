// Sprint 1 — SearchBar consume operation/type del nuevo modelo MLS.
//
// Cambios vs versión anterior:
//   - operation usa los valores del backend (`venta`, `renta_larga`) en lugar
//     de `sale`/`rent`. Esto evita un mapeo redundante en cada componente.
//   - propertyType acepta los 8 enums oficiales (DECISIONES_NEGOCIO #4).
//   - El padre recibe los valores listos para mandar al endpoint.

const PROPERTY_TYPES = [
  { value: "", label: "Todos los tipos" },
  { value: "casa", label: "Casa" },
  { value: "departamento", label: "Departamento" },
  { value: "terreno", label: "Terreno / Lote" },
  { value: "local_comercial", label: "Local comercial" },
  { value: "oficina", label: "Oficina" },
  { value: "nave_industrial", label: "Nave industrial" },
  { value: "bodega", label: "Bodega" },
  { value: "edificio", label: "Edificio" },
];

export default function SearchBar({
  value,
  operation,
  propertyType,
  onSearch,
  onOperationChange,
  onPropertyTypeChange,
  onSubmit,
}) {
  return (
    <div className="w-full rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
      <div className="mb-2 grid grid-cols-2 rounded bg-slate-100 p-1 text-sm font-semibold sm:hidden">
        {[
          ["venta", "Comprar"],
          ["renta_larga", "Rentar"],
        ].map(([key, label]) => (
          <button
            key={key}
            className={`rounded px-3 py-2 ${
              operation === key
                ? "bg-white text-slate-950 shadow-sm"
                : "text-slate-600"
            }`}
            onClick={() => onOperationChange?.(key)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.();
        }}
        className="grid gap-2 sm:grid-cols-[1fr_140px_180px_auto]"
      >
        <label className="relative block">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            ⌕
          </span>
          <input
            type="text"
            placeholder="Ciudad, colonia, calle o amenidad"
            aria-label="Búsqueda libre"
            autoComplete="off"
            className="h-12 w-full min-w-0 rounded border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none transition focus:border-slate-950 focus:bg-white"
            value={value}
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </label>

        <select
          aria-label="Operación"
          className="hidden h-12 rounded border border-slate-200 bg-white px-3 text-sm font-medium outline-none focus:border-slate-950 sm:block"
          value={operation}
          onChange={(e) => onOperationChange?.(e.target.value)}
        >
          <option value="venta">Comprar</option>
          <option value="renta_larga">Rentar</option>
        </select>

        <select
          aria-label="Tipo de inmueble"
          className="h-12 rounded border border-slate-200 bg-white px-3 text-sm font-medium outline-none focus:border-slate-950"
          value={propertyType || ""}
          onChange={(e) => onPropertyTypeChange?.(e.target.value)}
        >
          {PROPERTY_TYPES.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="h-12 rounded bg-blue-700 px-5 text-sm font-semibold text-white hover:bg-blue-800"
        >
          Buscar
        </button>
      </form>
    </div>
  );
}
