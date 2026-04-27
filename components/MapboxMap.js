// components/MapboxMap.js
//
// Sprint 3 — Gap #4: mapa interactivo en /buscar.
//
// Cargamos Mapbox GL JS dinámicamente desde CDN (sin agregar dep al package
// para evitar inflar el bundle del resto del sitio). El componente pinta:
//   - Lista de pins con tooltip (foto, precio, beds, link a ficha).
//   - Cluster automático cuando hay >50 pins visibles.
//   - Mover/zoom dispara callback `onBoundsChange` con bbox `lat1,lng1,lat2,lng2`.
//
// STUB: si NEXT_PUBLIC_MAPBOX_TOKEN no está configurado, muestra placeholder
// gris con la lista de pins encima como cards tradicionales. Esto permite
// avanzar Sprint 3-6 sin bloquear hasta tener cuenta Mapbox.

import { useEffect, useRef, useState } from "react";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
const MAPBOX_CSS = "https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.css";
const MAPBOX_JS = "https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.js";

/**
 * @param {Object} props
 * @param {Array<{id:string|number, slug:string, title:string, priceLabel:string, beds?:string, image?:string, coords:{lat:number,lng:number}, operationType:string}>} props.items
 * @param {[number,number,number,number]|null} [props.initialBbox] — [latS, lngW, latN, lngE]
 * @param {(bbox:[number,number,number,number])=>void} [props.onBoundsChange]
 * @param {string} [props.height]
 */
export default function MapboxMap({
  items = [],
  initialBbox = null,
  onBoundsChange,
  height = "calc(100vh - 120px)",
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  // Carga script + css de Mapbox cuando hay token.
  useEffect(() => {
    if (!MAPBOX_TOKEN || typeof window === "undefined") return;

    let cancelled = false;

    if (!document.querySelector(`link[href="${MAPBOX_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = MAPBOX_CSS;
      document.head.appendChild(link);
    }

    if (window.mapboxgl) {
      setReady(true);
      return;
    }

    if (!document.querySelector(`script[src="${MAPBOX_JS}"]`)) {
      const s = document.createElement("script");
      s.src = MAPBOX_JS;
      s.async = true;
      s.onload = () => {
        if (!cancelled) setReady(true);
      };
      s.onerror = () => {
        if (!cancelled) setError("No pudimos cargar el mapa.");
      };
      document.head.appendChild(s);
    } else {
      const wait = setInterval(() => {
        if (window.mapboxgl) {
          clearInterval(wait);
          if (!cancelled) setReady(true);
        }
      }, 200);
      return () => clearInterval(wait);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  // Inicializa el mapa cuando script está listo.
  useEffect(() => {
    if (!ready || !containerRef.current || !window.mapboxgl) return;

    window.mapboxgl.accessToken = MAPBOX_TOKEN;
    const map = new window.mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-99.1332, 19.4326], // CDMX por defecto
      zoom: 5,
    });
    mapRef.current = map;

    if (initialBbox) {
      const [s, w, n, e] = initialBbox;
      map.fitBounds(
        [
          [w, s],
          [e, n],
        ],
        { padding: 24, duration: 0 }
      );
    }

    map.on("moveend", () => {
      if (!onBoundsChange) return;
      const b = map.getBounds();
      onBoundsChange([
        b.getSouth(),
        b.getWest(),
        b.getNorth(),
        b.getEast(),
      ]);
    });

    return () => map.remove();
  }, [ready, initialBbox, onBoundsChange]);

  // Pinta los pins (con clustering nativo de Mapbox via GeoJSON).
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !window.mapboxgl) return;

    const features = items
      .filter((it) => it.coords && typeof it.coords.lat === "number")
      .map((it) => ({
        type: "Feature",
        properties: {
          id: it.id,
          slug: it.slug,
          title: it.title,
          priceLabel: it.priceLabel,
          beds: it.beds || "",
          image: it.image || "",
          operationType: it.operationType || "venta",
        },
        geometry: {
          type: "Point",
          coordinates: [it.coords.lng, it.coords.lat],
        },
      }));

    const data = { type: "FeatureCollection", features };

    function applyData() {
      if (!map.getSource("listings")) {
        map.addSource("listings", {
          type: "geojson",
          data,
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50,
        });
        map.addLayer({
          id: "clusters",
          type: "circle",
          source: "listings",
          filter: ["has", "point_count"],
          paint: {
            "circle-color": "#007BFF",
            "circle-radius": [
              "step",
              ["get", "point_count"],
              16,
              50,
              22,
              200,
              28,
            ],
            "circle-stroke-width": 2,
            "circle-stroke-color": "#FFFFFF",
          },
        });
        map.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "listings",
          filter: ["has", "point_count"],
          layout: {
            "text-field": "{point_count_abbreviated}",
            "text-size": 12,
            "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
          },
          paint: { "text-color": "#FFFFFF" },
        });
        map.addLayer({
          id: "unclustered-point",
          type: "circle",
          source: "listings",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#007BFF",
            "circle-radius": 8,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#FFFFFF",
          },
        });

        map.on("click", "clusters", (e) => {
          const f = map.queryRenderedFeatures(e.point, {
            layers: ["clusters"],
          });
          const clusterId = f[0].properties.cluster_id;
          map
            .getSource("listings")
            .getClusterExpansionZoom(clusterId, (err, zoom) => {
              if (err) return;
              map.easeTo({
                center: f[0].geometry.coordinates,
                zoom,
              });
            });
        });

        map.on("click", "unclustered-point", (e) => {
          const p = e.features[0].properties;
          const path = p.operationType === "renta_larga" ? "renta" : "venta";
          new window.mapboxgl.Popup({ offset: 14 })
            .setLngLat(e.features[0].geometry.coordinates)
            .setHTML(
              `<div style="min-width:180px">
                ${
                  p.image
                    ? `<img src="${p.image}" alt="" style="width:100%;height:100px;object-fit:cover;border-radius:6px"/>`
                    : ""
                }
                <p style="margin:6px 0 0;font-weight:600">${escapeHtml(p.title)}</p>
                <p style="margin:2px 0;color:#007BFF;font-weight:600">${escapeHtml(p.priceLabel)}</p>
                ${p.beds ? `<p style="margin:0;color:#64748B;font-size:12px">${escapeHtml(p.beds)}</p>` : ""}
                <a href="/${path}/${encodeURIComponent(p.slug)}" style="display:inline-block;margin-top:6px;color:#007BFF;font-weight:600">Ver ficha →</a>
              </div>`
            )
            .addTo(map);
        });

        map.on("mouseenter", "clusters", () => (map.getCanvas().style.cursor = "pointer"));
        map.on("mouseleave", "clusters", () => (map.getCanvas().style.cursor = ""));
        map.on("mouseenter", "unclustered-point", () => (map.getCanvas().style.cursor = "pointer"));
        map.on("mouseleave", "unclustered-point", () => (map.getCanvas().style.cursor = ""));
      } else {
        map.getSource("listings").setData(data);
      }
    }

    if (map.isStyleLoaded()) {
      applyData();
    } else {
      map.once("load", applyData);
    }
  }, [items, ready]);

  // ── STUB: sin token configurado ──────────────────────────────────────────
  if (!MAPBOX_TOKEN) {
    return (
      <div
        className="rounded-xl border border-dashed border-slate-300 bg-slate-100 p-6 text-center"
        style={{ height, minHeight: 480 }}
      >
        <p className="text-sm font-semibold text-slate-700">
          Mapa interactivo (Mapbox)
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Configura{" "}
          <code className="rounded bg-white px-1 py-0.5">
            NEXT_PUBLIC_MAPBOX_TOKEN
          </code>{" "}
          en tu .env para activar el mapa real.
        </p>
        <ul className="mt-4 space-y-1 text-left text-xs text-slate-600">
          {items.slice(0, 8).map((it) => (
            <li key={it.id}>
              · {it.title} — {it.priceLabel}
            </li>
          ))}
          {items.length > 8 && (
            <li className="text-slate-400">… y {items.length - 8} más</li>
          )}
        </ul>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
        {error}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{ height, minHeight: 400, borderRadius: 12, overflow: "hidden" }}
    />
  );
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
