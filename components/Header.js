import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";
import Link from "next/link";
import { siteConfig } from "../lib/siteConfig";

export default function Header() {
  const navItems = [
    { href: "/comprar", label: "Comprar" },
    { href: "/rentar", label: "Rentar" },
    { href: "/#propiedades", label: "Propiedades" },
    { href: "/#agentes", label: "Agentes" },
    { href: "/#contacto", label: "Contacto" },
  ];
  const socialLinks = [
    {
      href: siteConfig.social.instagram,
      label: "Instagram",
      icon: <FaInstagram className="h-5 w-5" />,
      hoverClass: "hover:text-pink-600",
    },
    {
      href: siteConfig.social.facebook,
      label: "Facebook",
      icon: <FaFacebookF className="h-5 w-5" />,
      hoverClass: "hover:text-blue-600",
    },
    {
      href: siteConfig.social.tiktok,
      label: "TikTok",
      icon: <FaTiktok className="h-5 w-5" />,
      hoverClass: "",
    },
  ].filter((item) => item.href);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded bg-slate-950 text-sm font-semibold text-white">
            G
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-slate-950 sm:text-base">
              {siteConfig.brandName}
            </span>
            <span className="hidden text-xs text-slate-500 sm:block">
              Red inmobiliaria verificada
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-slate-950">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {siteConfig.adminUrl && (
            <Link
              href={siteConfig.adminUrl}
              className="hidden rounded border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:border-slate-950 hover:text-slate-950 sm:inline-flex"
            >
              Acceso agentes
            </Link>
          )}
          <Link
            href="/#agentes"
            className="rounded bg-slate-950 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Unirse
          </Link>

          {socialLinks.length > 0 && (
            <div className="hidden items-center gap-1 border-l border-slate-200 pl-3 md:flex">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className={`rounded p-2 text-slate-600 transition hover:bg-slate-100 ${item.hoverClass}`}
                  title={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
