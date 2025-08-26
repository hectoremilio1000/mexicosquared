import { listings } from "../../data/listings";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ListingDetail({ item }) {
  if (!item) return <div className="p-6">No encontrado</div>;
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="mx-auto w-full max-w-5xl px-4 py-6">
        <div className="aspect-[16/9] bg-gray-100 rounded overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-semibold mt-4">
          {item.title} — {item.priceLabel}
        </h1>
        <p className="text-gray-700 mt-1">{item.address}</p>
        <p className="text-sm text-gray-500">{item.zone}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.badges.map((b) => (
            <span key={b} className="border rounded px-2 py-1 text-sm">
              {b}
            </span>
          ))}
        </div>
        <p className="mt-4 text-gray-700">{item.summary}</p>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const item = listings.find((l) => l.slug === params.slug) || null;
  return { props: { item } };
}
