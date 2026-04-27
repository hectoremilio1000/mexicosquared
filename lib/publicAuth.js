// lib/publicAuth.js
//
// Sprint 6 — auth pública client-side. Guarda session_token en localStorage
// y lo agrega como Authorization: Bearer en peticiones a /api/public/*.

import { siteConfig } from "./siteConfig";

const SESSION_KEY = "gabana_public_session";

export function getPublicSessionToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(SESSION_KEY);
}

export function setPublicSessionToken(token) {
  if (typeof window === "undefined") return;
  if (token) window.localStorage.setItem(SESSION_KEY, token);
  else window.localStorage.removeItem(SESSION_KEY);
}

export async function requestMagicLink(email, fullName) {
  const res = await fetch(`${siteConfig.apiBaseUrl}/auth/public/request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, full_name: fullName || undefined }),
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}

export async function consumeMagicLink(token) {
  const res = await fetch(`${siteConfig.apiBaseUrl}/auth/public/consume`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  const data = await res.json();
  if (data.session_token) setPublicSessionToken(data.session_token);
  return data;
}

export async function fetchPublicMe() {
  const token = getPublicSessionToken();
  if (!token) return null;
  const res = await fetch(`${siteConfig.apiBaseUrl}/auth/public/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) {
    setPublicSessionToken(null);
    return null;
  }
  if (!res.ok) return null;
  return res.json();
}

async function authedFetch(path, options = {}) {
  const token = getPublicSessionToken();
  return fetch(`${siteConfig.apiBaseUrl}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}

export async function listFavorites() {
  const res = await authedFetch("/public/favorites");
  if (!res.ok) return { data: [] };
  return res.json();
}

export async function addFavorite(listingId) {
  const res = await authedFetch(`/public/listings/${listingId}/favorite`, {
    method: "POST",
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}

export async function removeFavorite(listingId) {
  const res = await authedFetch(`/public/listings/${listingId}/favorite`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}
