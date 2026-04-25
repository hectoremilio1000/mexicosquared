import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";
import Link from "next/link";
import { siteConfig } from "../lib/siteConfig";

export default function Header() {
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
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b">
      <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 min-w-0">
          <span className="h-7 w-7 rounded bg-blue-600 shrink-0" />
          <span className="font-semibold truncate">{siteConfig.brandName}</span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3 flex-nowrap">
          {siteConfig.adminUrl && (
            <Link
              href={siteConfig.adminUrl}
              className="hidden sm:inline-flex px-3 py-1.5 rounded border text-sm shrink-0"
            >
              Admin
            </Link>
          )}

          {socialLinks.length > 0 && (
            <div className="flex items-center gap-2 pl-3 border-l shrink-0">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className={`p-2 rounded hover:bg-gray-100 transition ${item.hoverClass}`}
                  title={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
