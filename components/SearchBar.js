export default function SearchBar({ value, onSearch }) {
  return (
    <div className="w-full flex gap-2">
      <input
        type="text"
        placeholder="Ingresa estados o colonias"
        className="flex-1 border rounded px-3 py-2"
        value={value} // ← controlado
        onChange={(e) => onSearch?.(e.target.value)}
      />
      <select className="border rounded px-3 py-2">
        <option>Rentar</option>
        <option>Comprar</option>
      </select>
      <select className="border rounded px-3 py-2">
        <option>Inmueble</option>
        <option>Terreno</option>
        <option>Departamento</option>
      </select>
    </div>
  );
}
