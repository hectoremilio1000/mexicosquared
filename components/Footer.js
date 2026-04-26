import { siteConfig } from "../lib/siteConfig";

export default function Footer() {
  return (
    <footer id="contacto" className="mt-10 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm text-slate-600 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded bg-slate-950 text-sm font-semibold text-white">
              G
            </span>
            <span className="font-semibold text-slate-950">{siteConfig.brandName}</span>
          </div>
          <p className="mt-3 max-w-xs leading-6">
            Plataforma inmobiliaria para publicar, buscar y dar seguimiento a
            propiedades verificadas en México.
          </p>
        </div>
        <div>
          <p className="font-semibold text-slate-950">Bienes inmuebles</p>
          <a className="mt-3 block hover:text-slate-950" href="/comprar">Compra</a>
          <a className="mt-2 block hover:text-slate-950" href="/rentar">Renta</a>
          <a className="mt-2 block hover:text-slate-950" href="/#propiedades">Propiedades</a>
        </div>
        <div>
          <p className="font-semibold text-slate-950">Iniciativas</p>
          <a className="mt-3 block hover:text-slate-950" href="/#agentes">Unirse a Gabana</a>
          {siteConfig.adminUrl && (
            <a className="mt-2 block hover:text-slate-950" href={siteConfig.adminUrl}>
              Acceso agentes
            </a>
          )}
          <a className="mt-2 block hover:text-slate-950" href="/#contacto">Contacto</a>
        </div>
        <div>
          <p className="font-semibold text-slate-950">Contacto</p>
          {siteConfig.email && <a className="mt-3 block hover:text-slate-950" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>}
          {siteConfig.contactPhone && <a className="mt-2 block hover:text-slate-950" href={`tel:${siteConfig.contactPhone}`}>{siteConfig.contactPhone}</a>}
          <p className="mt-6 text-xs">© {new Date().getFullYear()} {siteConfig.brandName}</p>
        </div>
      </div>
    </footer>
  );
}
