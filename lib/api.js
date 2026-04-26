// /Users/hectoremilio/Proyectos/nextjs/gabana_real_estate/lib/api.js
//
// Sprint 1 — el endpoint público devuelve `{data, meta}` con todos los
// query params del nuevo modelo MLS (Gap #2). Centralizamos la URL builder
// y exponemos helpers tipados para SearchBar, FiltersBar y catálogos.

import { siteConfig } from "./siteConfig";

function buildUrl(path, params = {}) {
  const url = new URL(`${siteConfig.apiBaseUrl}${path}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    if (typeof value === "boolean") {
      url.searchParams.set(key, value ? "1" : "0");
      return;
    }
    url.searchParams.set(key, String(value));
  });

  return url.toString();
}

/**
 * @param {Object} [params] — operation, type, beds_min, baths_min, parking_min,
 *   min_price, max_price, m2_built_min, m2_land_min, state, municipality,
 *   amenities (CSV), q, bbox, page, per_page, sort, is_featured.
 * @returns {Promise<{data: any[], meta: {total:number, page:number, perPage:number, totalPages:number}}>}
 */
export async function fetchPublicListings(params = {}) {
  const res = await fetch(buildUrl("/listings", params));

  if (!res.ok) {
    throw new Error(`Error al cargar listings: ${res.status}`);
  }

  const payload = await res.json();
  // Retrocompat: si el backend antiguo devuelve un array plano, lo envolvemos.
  if (Array.isArray(payload)) {
    return {
      data: payload,
      meta: {
        total: payload.length,
        page: 1,
        perPage: payload.length,
        totalPages: 1,
      },
    };
  }
  return payload;
}

export async function fetchPublicListingBySlug(slug) {
  const res = await fetch(buildUrl(`/listings/${slug}`));

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Error al cargar listing ${slug}: ${res.status}`);
  }

  return res.json();
}

// ── Catálogos públicos (Sprint 1) ──────────────────────────────────────

export async function fetchPublicStates() {
  try {
    const res = await fetch(buildUrl("/states"));
    if (!res.ok) return [];
    const payload = await res.json();
    return payload.data || [];
  } catch {
    return [];
  }
}

export async function fetchPublicAmenities() {
  try {
    const res = await fetch(buildUrl("/amenities"));
    if (!res.ok) return [];
    const payload = await res.json();
    return payload.data || [];
  } catch {
    return [];
  }
}

// ── Mapeo operation interno (sale/rent) → backend (venta/renta_larga) ──

export function operationKeyToBackend(operation) {
  if (operation === "rent" || operation === "renta_larga") return "renta_larga";
  return "venta";
}
