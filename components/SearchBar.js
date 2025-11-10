export default function SearchBar({ value, onSearch }) {
  return (
    // En móvil: 1 columna; en >=sm: 1fr + dos autos
    <div className="w-full grid gap-2 grid-cols-1 sm:grid-cols-[1fr_auto_auto]">
      <input
        type="text"
        placeholder="Ingresa estados o colonias"
        aria-label="Búsqueda por estado o colonia"
        autoComplete="off"
        className="w-full min-w-0 border rounded px-3 py-2"
        value={value}
        onChange={(e) => onSearch?.(e.target.value)}
      />

      {/* Anchos fijos en desktop; full en móvil */}
      <select
        aria-label="Operación"
        className="w-full sm:w-36 border rounded px-3 py-2"
        defaultValue="Rentar"
      >
        <option>Rentar</option>
        <option>Comprar</option>
      </select>

      <select
        aria-label="Tipo de inmueble"
        className="w-full sm:w-40 border rounded px-3 py-2"
        defaultValue="Inmueble"
      >
        <option>Inmueble</option>
        <option>Terreno</option>
        <option>Departamento</option>
      </select>
    </div>
  );
}
