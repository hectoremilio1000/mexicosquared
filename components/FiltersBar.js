export default function FiltersBar({ updateFilter, resetFilters }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        className="px-3 py-1.5 border rounded text-sm"
        onClick={resetFilters}
      >
        Todo
      </button>
      <button
        className="px-3 py-1.5 border rounded text-sm"
        onClick={() => updateFilter("beds", "1-2 rec.")}
      >
        1-2 Recámaras
      </button>

      <button
        className="px-3 py-1.5 border rounded text-sm"
        onClick={() => updateFilter("price", 10000000)}
      >
        Precio ≤ 10M
      </button>

      <button
        className="px-3 py-1.5 border rounded text-sm"
        onClick={() => updateFilter("street", "Río San Joaquín")}
      >
        Calle Río San Joaquín
      </button>

      <button
        className="px-3 py-1.5 border rounded text-sm"
        onClick={() => updateFilter("zone", "Polanco")}
      >
        Zona Polanco
      </button>

      <button
        className="px-3 py-1.5 border rounded text-sm"
        onClick={() => updateFilter("badge", "Gimnasio")}
      >
        Con Gimnasio
      </button>

      <div className="ml-auto flex items-center gap-2 text-sm">
        <button className="underline">Ver mapa</button>
        <button className="underline">Ordenar</button>
      </div>
    </div>
  );
}
