// /Users/hectoremilio/Proyectos/nextjs/gabana_real_estate/lib/api.js

import { siteConfig } from "./siteConfig";

function buildUrl(path, params = {}) {
  const url = new URL(`${siteConfig.apiBaseUrl}${path}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

export async function fetchPublicListings(params = {}) {
  const res = await fetch(buildUrl("/listings", params));

  if (!res.ok) {
    throw new Error(`Error al cargar listings: ${res.status}`);
  }

  const payload = await res.json();
  return Array.isArray(payload) ? payload : payload.data || [];
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
