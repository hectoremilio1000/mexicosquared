export default function Pagination({ page = 1, pages = 1, onPageChange }) {
  if (pages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        className="px-3 py-1.5 border rounded disabled:opacity-50"
        disabled={page <= 1}
        onClick={() => onPageChange?.(page - 1)}
      >
        Anterior
      </button>
      <span className="text-sm">
        Página {page} de {pages}
      </span>
      <button
        className="px-3 py-1.5 border rounded disabled:opacity-50"
        disabled={page >= pages}
        onClick={() => onPageChange?.(page + 1)}
      >
        Siguiente
      </button>
    </div>
  );
}
