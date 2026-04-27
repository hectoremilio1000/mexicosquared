// pages/favoritos.js
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MagicLinkModal from "../components/MagicLinkModal";
import { fetchPublicMe, listFavorites, removeFavorite } from "../lib/publicAuth";
import { siteConfig } from "../lib/siteConfig";

export default function FavoritosPage() {
  const [me, setMe] = useState(null);
  const [favs, setFavs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      const meData = await fetchPublicMe();
      setMe(meData);
      if (meData) {
        const data = await listFavorites();
        setFavs(data?.data ?? []);
      }
      setLoading(false);
    })();
  }, []);

  async function handleRemove(id) {
    await removeFavorite(id);
    setFavs((f) => f.filter((x) => x.id !== id));
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head>
        <title>{`Mis favoritos | ${siteConfig.brandName}`}</title>
      </Head>
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-950">
          Mis favoritos
        </h1>

        {loading ? (
          <p className="mt-6 text-sm text-slate-500">Cargando...</p>
        ) : !me ? (
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-sm text-slate-700">
              Entra con tu correo para guardar y ver tus favoritos.
            </p>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="mt-3 rounded-[20px] bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Entrar
            </button>
          </div>
        ) : favs.length === 0 ? (
          <p className="mt-6 text-sm text-slate-600">
            Aún no guardaste propiedades. Click en el corazón de cualquier
            ficha para guardarla aquí.
          </p>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favs.map((it) => (
              <article
                key={it.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
              >
                <Link
                  href={`/${it.operationType === "renta_larga" ? "renta" : "venta"}/${it.slug}`}
                  className="block"
                >
                  <div className="relative aspect-[4/3] bg-slate-100">
                    {it.coverImageUrl && (
                      <Image
                        src={it.coverImageUrl}
                        alt={it.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-base font-semibold text-blue-700">
                      {it.priceLabel}
                    </p>
                    <p className="mt-1 text-sm text-slate-700 line-clamp-1">
                      {it.title}
                    </p>
                    <p className="text-xs text-slate-500">{it.zone}</p>
                  </div>
                </Link>
                <div className="px-3 pb-3">
                  <button
                    type="button"
                    onClick={() => handleRemove(it.id)}
                    className="w-full rounded border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:border-red-300 hover:text-red-600"
                  >
                    Quitar de favoritos
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />

      <MagicLinkModal
        open={showModal}
        onClose={() => setShowModal(false)}
        intent="login"
      />
    </div>
  );
}
