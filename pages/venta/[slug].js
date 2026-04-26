// Public detail page for listings marked as sale.
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { fetchPublicListingBySlug } from "../../lib/api";
import { getContactHref, siteConfig } from "../../lib/siteConfig";

export default function ListingDetail({ item }) {
  if (!item) return <div className="p-6">No encontrado</div>;

  const photos = item.photos?.length ? item.photos : [item.image].filter(Boolean);
  const contactHref = getContactHref(
    `Hola, quiero informacion de la propiedad ${item.title || item.slug}`
  );
  const mapHref = item.coords
    ? `https://www.google.com/maps/search/?api=1&query=${item.coords.lat},${item.coords.lng}`
    : "";
  const pageTitle = `${item.title} | ${siteConfig.brandName}`;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={item.summary || `${item.title} en ${item.zone}`}
        />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={item.summary || item.address} />
        {item.image && <meta property="og:image" content={item.image} />}
      </Head>
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 py-6">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <a href="/" className="hover:text-slate-950">Inicio</a>
          <span>/</span>
          <span>{item.zone}</span>
          <span>/</span>
          <span className="text-slate-950">{item.title}</span>
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section>
            <div className="grid gap-2 overflow-hidden rounded-xl md:grid-cols-[2fr_1fr]">
              <div className="aspect-[16/10] bg-gray-100 md:aspect-auto">
                <img
                  src={photos[0]}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
                {photos.slice(1, 3).map((photo, index) => (
                  <div key={photo} className="relative min-h-40 bg-gray-100">
                    <img
                      src={photo}
                      alt={`${item.title} foto ${index + 2}`}
                      className="h-full w-full object-cover"
                    />
                    {index === 1 && photos.length > 3 && (
                      <div className="absolute inset-0 grid place-items-center bg-slate-950/50 text-sm font-semibold text-white">
                        Ver {photos.length} fotos
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {photos.slice(3, 7).map((photo, index) => (
                <div key={photo} className="h-20 w-28 overflow-hidden rounded bg-slate-100">
                  <img
                    src={photo}
                    alt={`${item.title} miniatura ${index + 4}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="hidden aspect-[16/9] bg-gray-100 rounded overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-5">
              <p className="text-sm text-blue-700 font-medium">
                {item.isPremier ? "Propiedad premier" : "Propiedad disponible"}
              </p>
              <h1 className="text-3xl font-semibold mt-1 text-slate-950">
                {item.title} — {item.priceLabel}
              </h1>
              <p className="text-gray-700 mt-2">{item.address}</p>
              <p className="text-sm text-gray-500">{item.zone}</p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {[item.size, item.beds, `${photos.length || item.mediaCount || 1} fotos`]
                .filter(Boolean)
                .map((spec) => (
                  <span key={spec} className="border rounded px-3 py-1.5 text-sm">
                    {spec}
                  </span>
                ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {(item.badges || []).map((b) => (
                <span key={b} className="bg-gray-100 rounded px-2 py-1 text-sm">
                  {b}
                </span>
              ))}
            </div>

            <section className="mt-8">
              <h2 className="text-lg font-semibold">Descripcion</h2>
              <p className="mt-2 text-gray-700 leading-7">{item.summary}</p>
            </section>

            <section className="mt-8">
              <h2 className="text-lg font-semibold">Amenidades y equipamiento</h2>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {(item.highlights || []).map((highlight) => (
                  <div key={highlight} className="rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                    {highlight}
                  </div>
                ))}
              </div>
            </section>

            {mapHref && (
              <section className="mt-8">
                <h2 className="text-lg font-semibold">Ubicacion</h2>
                <a
                  href={mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex rounded border px-4 py-2 text-sm"
                >
                  Ver ubicacion en mapa
                </a>
              </section>
            )}
          </section>

          <aside className="lg:sticky lg:top-20 h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
              Propiedad verificada
            </p>
            <p className="text-sm text-gray-500">Precio</p>
            <p className="text-2xl font-semibold">{item.priceLabel}</p>
            <p className="mt-3 text-sm text-gray-600">
              Solicita informacion, disponibilidad o una visita para esta
              propiedad.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              {siteConfig.contactPhone && (
                <a
                  href={`tel:${siteConfig.contactPhone}`}
                  className="rounded bg-blue-600 px-4 py-2 text-center text-white"
                >
                  Llamar
                </a>
              )}
              {contactHref && (
                <a
                  href={contactHref}
                  target={contactHref.startsWith("http") ? "_blank" : undefined}
                  rel={
                    contactHref.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="rounded bg-blue-700 px-4 py-2 text-center font-semibold text-white hover:bg-blue-800"
                >
                  Contactar
                </a>
              )}
              {!contactHref && (
                <a
                  href="/#contacto"
                  className="rounded bg-blue-700 px-4 py-2 text-center font-semibold text-white hover:bg-blue-800"
                >
                  Solicitar información
                </a>
              )}
              <a href="/" className="rounded border px-4 py-2 text-center">
                Ver mas propiedades
              </a>
            </div>
            <div className="mt-5 rounded bg-slate-50 p-3 text-xs leading-5 text-slate-600">
              ID {item.id}. Inventario publicado desde Gabana Admin y conectado
              al backend en Railway.
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const item = await fetchPublicListingBySlug(params.slug);
    if (!item) {
      return { notFound: true };
    }
    return { props: { item } };
  } catch (err) {
    console.error("Error cargando listing por slug:", err);
    return { notFound: true };
  }
}
