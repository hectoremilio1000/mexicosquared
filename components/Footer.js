import { siteConfig } from "../lib/siteConfig";

export default function Footer() {
  return (
    <footer className="border-t mt-10">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-gray-500 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {new Date().getFullYear()} {siteConfig.brandName}
        </span>
        <span>Propiedades en renta y venta en México.</span>
      </div>
    </footer>
  );
}
