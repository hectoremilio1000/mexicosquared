// /Users/hectoremilio/Proyectos/nextjs/gabana_real_estate/lib/api.js

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchPublicListings() {
  const res = await fetch(`${API_BASE_URL}/listings`);

  if (!res.ok) {
    throw new Error(`Error al cargar listings: ${res.status}`);
  }

  return res.json();
}

export async function fetchPublicListingBySlug(slug) {
  const res = await fetch(`${API_BASE_URL}/listings/${slug}`);

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Error al cargar listing ${slug}: ${res.status}`);
  }

  return res.json();
}
