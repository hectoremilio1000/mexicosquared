import ListingCard from "./ListingCard";

export default function ListingGrid({ items }) {
  if (!items.length) {
    return (
      <div className="rounded border bg-white px-4 py-10 text-center text-gray-600">
        No encontramos propiedades con esos filtros.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => (
        <ListingCard key={it.id} item={it} />
      ))}
    </div>
  );
}
