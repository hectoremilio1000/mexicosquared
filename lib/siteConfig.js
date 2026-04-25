export const siteConfig = {
  brandName: "Gabana Real Estate",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.gabanarealestate.com.mx",
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://gabanabackadonis-production.up.railway.app/api",
  adminUrl: process.env.NEXT_PUBLIC_ADMIN_URL || "",
  contactPhone: process.env.NEXT_PUBLIC_GABANA_PHONE || "",
  whatsapp: process.env.NEXT_PUBLIC_GABANA_WHATSAPP || "",
  email: process.env.NEXT_PUBLIC_GABANA_EMAIL || "",
  social: {
    instagram: process.env.NEXT_PUBLIC_GABANA_INSTAGRAM || "",
    facebook: process.env.NEXT_PUBLIC_GABANA_FACEBOOK || "",
    tiktok: process.env.NEXT_PUBLIC_GABANA_TIKTOK || "",
  },
};

export function getContactHref(message = "") {
  if (siteConfig.whatsapp) {
    const cleanPhone = siteConfig.whatsapp.replace(/\D/g, "");
    const text = message ? `?text=${encodeURIComponent(message)}` : "";
    return `https://wa.me/${cleanPhone}${text}`;
  }

  if (siteConfig.email) {
    const subject = message || "Quiero informacion de una propiedad";
    return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`;
  }

  return "";
}
