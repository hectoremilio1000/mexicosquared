export default function SearchBar({
  value,
  operation,
  propertyType,
  onSearch,
  onOperationChange,
  onPropertyTypeChange,
}) {
  return (
    <div className="w-full rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
      <div className="mb-2 grid grid-cols-2 rounded bg-slate-100 p-1 text-sm font-semibold sm:hidden">
        {[
          ["sale", "Comprar"],
          ["rent", "Rentar"],
        ].map(([key, label]) => (
          <button
            key={key}
            className={`rounded px-3 py-2 ${
              operation === key ? "bg-white text-slate-950 shadow-sm" : "text-slate-600"
            }`}
            onClick={() => onOperationChange?.(key)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-[1fr_140px_150px_auto]">
        <label className="relative block">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            ⌕
          </span>
          <input
            type="text"
            placeholder="Ciudad, colonia, calle o amenidad"
            aria-label="Búsqueda por estado o colonia"
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
          <option value="sale">Comprar</option>
          <option value="rent">Rentar</option>
        </select>

        <select
          aria-label="Tipo de inmueble"
          className="h-12 rounded border border-slate-200 bg-white px-3 text-sm font-medium outline-none focus:border-slate-950"
          value={propertyType}
          onChange={(e) => onPropertyTypeChange?.(e.target.value)}
        >
          <option value="">Inmueble</option>
          <option value="departamento">Departamento</option>
          <option value="casa">Casa</option>
          <option value="terreno">Terreno</option>
        </select>
        <button
          type="button"
          className="h-12 rounded bg-blue-700 px-5 text-sm font-semibold text-white hover:bg-blue-800"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
