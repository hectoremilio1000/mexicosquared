// lib/schemaOrg.js
//
// Sprint 2 — Gap #11 (parcial): JSON-LD de schema.org/RealEstateListing.
// Sprint 7 lo extiende con OG image dinámica y canonical, según el plan.
//
// Doc: https://schema.org/RealEstateListing
//      https://schema.org/Offer
//      https://developers.google.com/search/docs/appearance/structured-data

import { siteConfig } from "./siteConfig";

const PROPERTY_TYPE_TO_SCHEMA = {
  casa: "House",
  departamento: "Apartment",
  terreno: "LandPlot",
  local_comercial: "SingleFamilyResidence", // schema.org no tiene comercial directo
  oficina: "Place",
  nave_industrial: "Place",
  bodega: "Place",
  edificio: "ApartmentComplex",
};

/**
 * Devuelve el objeto JSON-LD para una ficha de propiedad. Si el listing no
 * trae lo mínimo (price, title, slug), regresa null y la página omite el tag.
 */
export function buildListingJsonLd(item, operation /* "venta" | "renta_larga" */) {
  if (!item || !item.title || !item.slug) return null;

  const baseUrl = siteConfig.siteUrl?.replace(/\/$/, "") || "";
  const operationPath = operation === "renta_larga" ? "renta" : "venta";
  const url = `${baseUrl}/${operationPath}/${item.slug}`;

  const photos = Array.isArray(item.photos) ? item.photos : [];
  const offerType =
    operation === "renta_larga" ? "RentAction" : "SellAction";

  const numericPrice =
    typeof item.price === "number" ? item.price : null;

  const accommodationType =
    PROPERTY_TYPE_TO_SCHEMA[item.propertyType] || "House";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: item.title,
    url,
    description: item.summary || item.address,
    datePosted: item.publishedAt || item.createdAt || undefined,
    image: photos.length ? photos : undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: item.address || undefined,
      addressLocality: item.municipality || item.zone || undefined,
      addressRegion: item.state || undefined,
      addressCountry: "MX",
    },
  };

  if (
    typeof item.coords?.lat === "number" &&
    typeof item.coords?.lng === "number"
  ) {
    jsonLd.geo = {
      "@type": "GeoCoordinates",
      latitude: item.coords.lat,
      longitude: item.coords.lng,
    };
  }

  if (numericPrice !== null) {
    jsonLd.offers = {
      "@type": "Offer",
      price: numericPrice,
      priceCurrency: "MXN",
      availability: "https://schema.org/InStock",
      url,
      // Sprint 7 podrá añadir validFrom/priceValidUntil cuando existan en BD.
    };
  }

  jsonLd.accommodationCategory = accommodationType;

  if (typeof item.bedsCount === "number" && item.bedsCount > 0) {
    jsonLd.numberOfBedrooms = item.bedsCount;
  }
  if (typeof item.bathsCount === "number" && item.bathsCount > 0) {
    jsonLd.numberOfBathroomsTotal = item.bathsCount;
  }
  if (typeof item.m2Built === "number" && item.m2Built > 0) {
    jsonLd.floorSize = {
      "@type": "QuantitativeValue",
      value: item.m2Built,
      unitCode: "MTK", // m²
    };
  } else if (typeof item.m2Land === "number" && item.m2Land > 0) {
    jsonLd.floorSize = {
      "@type": "QuantitativeValue",
      value: item.m2Land,
      unitCode: "MTK",
    };
  }

  // _operation está fuera del schema, pero lo dejamos como custom para no perder el dato.
  jsonLd._operationType = offerType;

  return jsonLd;
}

/** Helper para escapar el JSON dentro del <script>. */
export function jsonLdToScript(data) {
  if (!data) return "";
  // Evita romper el </script> dentro del JSON.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
