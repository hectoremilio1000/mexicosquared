const filterButtons = [
  { label: "1-2 Recámaras", key: "beds", value: "1-2 rec." },
  { label: "Hasta 10M", key: "price", value: 10000000 },
  { label: "Polanco", key: "zone", value: "Polanco" },
  { label: "Gimnasio", key: "badge", value: "Gimnasio" },
];

export default function FiltersBar({
  filters,
  sort,
  updateFilter,
  resetFilters,
  onSortChange,
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        className="px-3 py-1.5 border rounded text-sm bg-white"
        onClick={resetFilters}
      >
        Todo
      </button>

      {filterButtons.map((button) => {
        const active = filters?.[button.key] === button.value;
        return (
          <button
            key={`${button.key}-${button.label}`}
            className={`px-3 py-1.5 border rounded text-sm ${
              active ? "bg-blue-600 text-white border-blue-600" : "bg-white"
            }`}
            onClick={() => updateFilter(button.key, button.value)}
          >
            {button.label}
          </button>
        );
      })}

      <div className="ml-auto flex items-center gap-2 text-sm min-w-44">
        <label htmlFor="sort-listings" className="text-gray-500">
          Ordenar
        </label>
        <select
          id="sort-listings"
          className="border rounded px-2 py-1.5 bg-white"
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
