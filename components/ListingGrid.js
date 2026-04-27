import ListingCard from "./ListingCard";

export default function ListingGrid({ items }) {
  if (!items.length) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white px-4 py-10 text-center text-slate-600">
        <p className="font-semibold text-slate-950">No encontramos propiedades con esos filtros.</p>
        <p className="mt-1 text-sm">Prueba ampliar la zona o limpiar filtros activos.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
      {items.map((it, idx) => (
        // Sprint 3 — Gap #15: las primeras 4 cards LCP-priority.
        <ListingCard key={it.id} item={it} priority={idx < 4} />
      ))}
    </div>
  );
}
