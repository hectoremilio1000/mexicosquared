// components/MagicLinkModal.js
//
// Sprint 6 — modal de auth pública (magic link).

import { useState } from "react";
import { requestMagicLink } from "../lib/publicAuth";

export default function MagicLinkModal({ open, onClose, intent = "save" }) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await requestMagicLink(email.trim(), fullName.trim());
      setSent(true);
    } catch {
      setError("No pudimos enviar el correo. Inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="float-right text-slate-400 hover:text-slate-700"
          aria-label="Cerrar"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold text-slate-900">
          {sent ? "Revisa tu correo" : intent === "save"
            ? "Guarda esta propiedad"
            : "Entra a Gabana"}
        </h2>
        {sent ? (
          <div className="mt-3">
            <p className="text-sm text-slate-700">
              Te enviamos un link a <strong>{email}</strong>. Click ahí y
              regresa para continuar.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 w-full rounded-[20px] border border-blue-600 px-5 py-2 text-sm font-semibold text-blue-700"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-3 space-y-3">
            <p className="text-sm text-slate-600">
              Te enviamos un link a tu correo para entrar sin contraseña.
            </p>
            <input
              type="email"
              required
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            <input
              type="text"
              placeholder="Nombre (opcional)"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-[20px] bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? "Enviando..." : "Enviar link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
