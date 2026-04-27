import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getContactHref, siteConfig } from "../lib/siteConfig";
import {
  getPublicSessionToken,
  addFavorite,
  removeFavorite,
} from "../lib/publicAuth";
import MagicLinkModal from "./MagicLinkModal";
import { FiCamera, FiHeart, FiMapPin, FiShare2 } from "react-icons/fi";

/**
 * Sprint 3 — Gap #15: card con next/image responsive.
 * Sprint 6 — Gap #12: corazón funcional con auth pública (magic link).
 *
 * Las primeras 4 cards se cargan con priority (LCP). El resto lazy.
 */
export default function ListingCard({ item, priority = false }) {
  const contactHref = getContactHref(
    `Hola, quiero informacion de la propiedad ${item.title || item.slug}`
  );
  const listingIdNumeric = listingNumericId(item.id);
  const [favorited, setFavorited] = useState(Boolean(item.isFavorite));
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setFavorited(Boolean(item.isFavorite));
  }, [item.isFavorite]);

  async function handleHeart(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!getPublicSessionToken()) {
      setShowModal(true);
      return;
    }
    try {
      if (favorited) {
        await removeFavorite(listingIdNumeric);
        setFavorited(false);
      } else {
        await addFavorite(listingIdNumeric);
        setFavorited(true);
      }
    } catch {
      // silencioso — UI no cambia si falla
    }
  }
  const operationLabel = item.badges?.some((badge) => /renta/i.test(badge))
    ? "Renta"
    : "Venta";
  const detailBasePath = operationLabel === "Renta" ? "renta" : "venta";

  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[4/3] bg-slate-100">
        {item.image && (
          <Image
            src={item.image}
            alt={item.title || ""}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
            priority={priority}
            className="object-cover"
          />
        )}
        <div className="absolute left-3 top-3 flex gap-1">
          {Boolean(item.isPremier) && (
            <span
              className="rounded-full bg-slate-950/90 px-2.5 py-1 text-xs font-semibold text-white"
            >
              Exclusiva
            </span>
          )}
        </div>
        <div className="absolute right-3 top-3 flex gap-2">
          <button
            type="button"
            onClick={handleHeart}
            aria-label={favorited ? "Quitar de favoritos" : "Guardar como favorito"}
            className={`grid h-8 w-8 place-items-center rounded-full shadow ${
              favorited
                ? "bg-red-50 text-red-600"
                : "bg-white/95 text-slate-800"
            }`}
          >
            <FiHeart fill={favorited ? "currentColor" : "none"} />
          </button>
          <button
            type="button"
            aria-label="Compartir"
            className="grid h-8 w-8 place-items-center rounded-full bg-white/95 text-slate-800 shadow"
          >
            <FiShare2 />
          </button>
        </div>
        <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-xs font-semibold text-slate-800 shadow">
          <FiCamera /> {item.mediaCount || item.photos?.length || 1}
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
            {operationLabel}
          </span>
          <span className="text-xs text-slate-500">ID {item.id}</span>
        </div>
        <h3 className="text-xl font-semibold text-slate-950">{item.priceLabel}</h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-slate-700">
          <FiMapPin className="shrink-0" /> {item.address}
        </p>
        <p className="text-xs text-slate-500">{item.zone}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {item.badges?.map((b) => (
            <span key={b} className="rounded border border-slate-200 px-2 py-1 text-xs text-slate-600">
              {b}
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2 text-sm font-medium text-slate-700">
          <span>{item.size}</span>
          <span className="text-slate-300">•</span>
          <span>{item.beds}</span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          {siteConfig.contactPhone && (
            <a
              href={`tel:${siteConfig.contactPhone}`}
              className="rounded border border-slate-300 px-3 py-2 text-sm font-medium"
            >
              Llamar
            </a>
          )}
          {contactHref && (
            <a
              href={contactHref}
              target={contactHref.startsWith("http") ? "_blank" : undefined}
              rel={contactHref.startsWith("http") ? "noopener noreferrer" : undefined}
              className="rounded border border-slate-300 px-3 py-2 text-sm font-medium"
            >
              Contactar
            </a>
          )}
          <Link
            href={`/${detailBasePath}/${item.slug}`}
            className="ml-auto rounded bg-slate-950 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Ver detalle
          </Link>
        </div>
      </div>

      <MagicLinkModal
        open={showModal}
        onClose={() => setShowModal(false)}
        intent="save"
      />
    </article>
  );
}

function listingNumericId(id) {
  if (typeof id === "number") return id;
  if (typeof id === "string") {
    const m = id.match(/(\d+)/);
    if (m) return Number(m[1]);
  }
  return null;
}
