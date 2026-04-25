// /Users/hectoremilio/Proyectos/nextjs/gabana_real_estate/pages/renta/[slug].js
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { fetchPublicListingBySlug } from "../../lib/api";
import { getContactHref, siteConfig } from "../../lib/siteConfig";

export default function ListingDetail({ item }) {
  if (!item) return <div className="p-6">No encontrado</div>;

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
      <main className="mx-auto w-full max-w-6xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section>
            <div className="aspect-[16/9] bg-gray-100 rounded overflow-hidden">
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
              <h1 className="text-2xl font-semibold mt-1">
                {item.title} — {item.priceLabel}
              </h1>
              <p className="text-gray-700 mt-2">{item.address}</p>
              <p className="text-sm text-gray-500">{item.zone}</p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {[item.size, item.beds, `${item.mediaCount || 1} fotos`]
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

          <aside className="lg:sticky lg:top-20 h-fit rounded-lg border bg-gray-50 p-5">
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
                  className="rounded border px-4 py-2 text-center"
                >
                  Contactar
                </a>
              )}
              <a href="/" className="rounded border px-4 py-2 text-center">
                Ver mas propiedades
              </a>
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
