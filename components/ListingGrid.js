import ListingCard from "./ListingCard";

export default function ListingGrid({ items }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => (
        <ListingCard key={it.id} item={it} />
      ))}
    </div>
  );
}
