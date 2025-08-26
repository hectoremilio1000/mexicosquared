export default function Pagination({ page = 1, pages = 10 }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        className="px-3 py-1.5 border rounded disabled:opacity-50"
        disabled={page <= 1}
      >
        Anterior
      </button>
      <span className="text-sm">
        Página {page} de {pages}
      </span>
      <button
        className="px-3 py-1.5 border rounded disabled:opacity-50"
        disabled={page >= pages}
      >
        Siguiente
      </button>
    </div>
  );
}
