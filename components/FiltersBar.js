export default function FiltersBar() {
  return (
    <div className="flex flex-wrap gap-2">
      <button className="px-3 py-1.5 border rounded text-sm">Recámaras</button>
      <button className="px-3 py-1.5 border rounded text-sm">Precio</button>
      <button className="px-3 py-1.5 border rounded text-sm">
        Más filtros
      </button>
      <button className="px-3 py-1.5 border rounded text-sm">
        Crear alerta
      </button>
      <div className="ml-auto flex items-center gap-2 text-sm">
        <button className="underline">Ver mapa</button>
        <button className="underline">Ordenar</button>
      </div>
    </div>
  );
}
