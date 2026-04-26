const filterButtons = [
  { label: "4+ recámaras", key: "beds", value: "4 rec." },
  { label: "Hasta 10M", key: "price", value: 10000000 },
  { label: "Casa", key: "badge", value: "Casa" },
  { label: "Fraccionamiento", key: "badge", value: "Fraccionamiento privado" },
];

export default function FiltersBar({
  filters,
  sort,
  updateFilter,
  resetFilters,
  onSortChange,
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        className="rounded border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:border-slate-950"
        onClick={resetFilters}
      >
        Todo
      </button>

      {filterButtons.map((button) => {
        const active = filters?.[button.key] === button.value;
        return (
          <button
            key={`${button.key}-${button.label}`}
            className={`rounded border px-3 py-2 text-sm font-medium ${
              active
                ? "border-slate-950 bg-slate-950 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:border-slate-950"
            }`}
            onClick={() => updateFilter(button.key, button.value)}
          >
            {button.label}
          </button>
        );
      })}

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
          <option value="recent">Recientes</option>
          <option value="price-asc">Menor precio</option>
          <option value="price-desc">Mayor precio</option>
          <option value="size-desc">Mayor superficie</option>
        </select>
      </div>
    </div>
  );
}
