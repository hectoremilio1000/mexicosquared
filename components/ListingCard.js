import Link from "next/link";
import { getContactHref, siteConfig } from "../lib/siteConfig";

export default function ListingCard({ item }) {
  const contactHref = getContactHref(
    `Hola, quiero informacion de la propiedad ${item.title || item.slug}`
  );

  return (
    <article className="bg-white border rounded-lg overflow-hidden hover:shadow-sm transition">
      <div className="relative aspect-[16/9] bg-gray-100">
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute left-2 bottom-2 flex gap-1">
          {item.highlights?.slice(0, 2).map((h) => (
            <span
              key={h}
              className="bg-blue-700 text-white text-xs px-2 py-0.5 rounded"
            >
              {h}
            </span>
          ))}
        </div>
        <div className="absolute right-2 top-2 bg-white/90 rounded-full p-1 text-xs">
          {item.mediaCount}
        </div>
      </div>

      <div className="p-4">
        {item.isPremier && (
          <div className="mb-2 text-xs inline-flex items-center gap-1 bg-gray-900 text-white px-2 py-0.5 rounded">
            Premier
          </div>
        )}
        <h3 className="text-gray-900 font-semibold">{item.priceLabel}</h3>
        <p className="text-sm text-gray-700 mt-1">{item.address}</p>
        <p className="text-xs text-gray-500">{item.zone}</p>

        <div className="flex flex-wrap gap-2 mt-3">
          {item.badges?.map((b) => (
            <span key={b} className="text-xs px-2 py-1 border rounded">
              {b}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
          <span>{item.size}</span>
          <span>•</span>
          <span>{item.beds}</span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          {siteConfig.contactPhone && (
            <a
              href={`tel:${siteConfig.contactPhone}`}
              className="px-3 py-2 border rounded text-sm"
            >
              Llamar
            </a>
          )}
          {contactHref && (
            <a
              href={contactHref}
              target={contactHref.startsWith("http") ? "_blank" : undefined}
              rel={contactHref.startsWith("http") ? "noopener noreferrer" : undefined}
              className="px-3 py-2 border rounded text-sm"
            >
              Contactar
            </a>
          )}
          <Link
            href={`/renta/${item.slug}`}
            className="ml-auto text-sm text-blue-700 underline"
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  );
}
