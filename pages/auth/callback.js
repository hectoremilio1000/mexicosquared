// pages/auth/callback.js
//
// Sprint 6 — landing del magic link. Consume el token y redirige.

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { consumeMagicLink } from "../../lib/publicAuth";

export default function AuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState("processing");

  useEffect(() => {
    if (!router.isReady) return;
    const token = router.query.token;
    if (!token) {
      setStatus("error");
      return;
    }
    consumeMagicLink(String(token))
      .then(() => {
        setStatus("ok");
        // Redirige al referer o a /favoritos.
        setTimeout(() => router.replace("/favoritos"), 600);
      })
      .catch(() => setStatus("error"));
  }, [router.isReady, router.query.token, router]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="mx-auto w-full max-w-md px-4 py-16 text-center">
        {status === "processing" && (
          <p className="text-sm text-slate-600">Procesando tu acceso...</p>
        )}
        {status === "ok" && (
          <p className="text-sm font-semibold text-blue-700">
            ¡Listo! Redirigiendo...
          </p>
        )}
        {status === "error" && (
          <div>
            <p className="text-sm font-semibold text-red-700">
              El link expiró o no es válido.
            </p>
            <p className="mt-2 text-xs text-slate-600">
              Pide uno nuevo desde la propiedad que querías guardar.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
