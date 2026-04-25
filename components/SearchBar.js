export default function SearchBar({
  value,
  operation,
  propertyType,
  onSearch,
  onOperationChange,
  onPropertyTypeChange,
}) {
  return (
    <div className="w-full grid gap-2 grid-cols-1 sm:grid-cols-[1fr_auto_auto]">
      <input
        type="text"
        placeholder="Busca por colonia, ciudad, calle o amenidad"
        aria-label="Búsqueda por estado o colonia"
        autoComplete="off"
        className="w-full min-w-0 border rounded px-3 py-2"
        value={value}
        onChange={(e) => onSearch?.(e.target.value)}
      />

      <select
        aria-label="Operación"
        className="w-full sm:w-36 border rounded px-3 py-2"
        value={operation}
        onChange={(e) => onOperationChange?.(e.target.value)}
      >
        <option value="rent">Rentar</option>
        <option value="sale">Comprar</option>
      </select>

      <select
        aria-label="Tipo de inmueble"
        className="w-full sm:w-40 border rounded px-3 py-2"
        value={propertyType}
        onChange={(e) => onPropertyTypeChange?.(e.target.value)}
      >
        <option value="">Inmueble</option>
        <option value="departamento">Departamento</option>
        <option value="casa">Casa</option>
        <option value="terreno">Terreno</option>
      </select>
    </div>
  );
}
