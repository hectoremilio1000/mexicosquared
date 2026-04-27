// components/Lightbox.js
//
// Sprint 3 — preparación de Sprint 6 (galería con lightbox).
//
// Lightbox simple sin dependencias externas. Soporta:
//   - Navegación prev/next con flechas + teclas ←/→
//   - Cierre con ESC o click fuera
//   - Counter "n / total"
//   - Zoom básico al click sobre la imagen
//
// Sprint 6 puede sustituir esto por `yet-another-react-lightbox` si se quiere
// más features (swipe táctil avanzado, fullscreen API, etc.). Por ahora
// alcanza para cumplir Gap #9 al nivel de UX de OmniMLS.

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

export default function Lightbox({
  open,
  photos,
  startIndex = 0,
  alt = "",
  onClose,
}) {
  const [index, setIndex] = useState(startIndex);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (open) {
      setIndex(startIndex);
      setZoomed(false);
    }
  }, [open, startIndex]);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % photos.length),
    [photos.length]
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + photos.length) % photos.length),
    [photos.length]
  );

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, next, prev, onClose]);

  if (!open || !photos?.length) return null;

  const current = photos[index];

  return (
    <div
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-black/95"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/20"
        onClick={(e) => {
          e.stopPropagation();
          onClose?.();
        }}
        aria-label="Cerrar"
      >
        Cerrar ✕
      </button>

      <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs text-white">
        {index + 1} / {photos.length}
      </div>

      <button
        type="button"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-2xl text-white hover:bg-white/20"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        aria-label="Anterior"
      >
        ‹
      </button>
      <button
        type="button"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-2xl text-white hover:bg-white/20"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        aria-label="Siguiente"
      >
        ›
      </button>

      <div
        className="relative h-[88vh] w-[92vw] cursor-zoom-in"
        onClick={(e) => {
          e.stopPropagation();
          setZoomed((z) => !z);
        }}
      >
        <Image
          src={current}
          alt={alt}
          fill
          sizes="92vw"
          className={`object-contain transition-transform duration-200 ${
            zoomed ? "scale-150 cursor-zoom-out" : ""
          }`}
          priority
        />
      </div>
    </div>
  );
}
