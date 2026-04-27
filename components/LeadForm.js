// components/LeadForm.js
//
// Sprint 2 — Gap #5: form de contacto público.
//
// Reutilizable en:
//   - Ficha de propiedad (sticky en mobile, embebido al final en desktop).
//   - Página /contacto general (sin listingId).
//
// Tokens visuales según BRAND_GUIDE_v1.md (color-primary #007BFF, radius-lg
// 20px en CTAs, Montserrat heredado del layout, copy del bloque "Voz, tono"
// sección 9). Decisión #21 — checkbox de T&C obligatorio.
//
// Turnstile widget se monta solo si NEXT_PUBLIC_TURNSTILE_SITE_KEY está
// definido (Sprint 7+). En Sprint 2-6 el form funciona sin widget y el
// backend acepta el payload gracias al stub mockeado del turnstile_service.

import { useEffect, useRef, useState } from "react";
import { submitLead } from "../lib/api";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

export default function LeadForm({
  listingId = null,
  listingTitle = null,
  agentName = null,
  variant = "embedded", // "embedded" | "page"
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    listingTitle
      ? `Hola, me interesa "${listingTitle}". ¿Sigue disponible?`
      : ""
  );
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [sendConfirmation, setSendConfirmation] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const turnstileContainerRef = useRef(null);

  // Cargar widget de Turnstile dinámicamente cuando hay site key (Sprint 7+).
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || typeof window === "undefined") return;

    // Inyecta script una sola vez.
    if (!document.querySelector('script[data-cf-turnstile]')) {
      const s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      s.async = true;
      s.defer = true;
      s.setAttribute("data-cf-turnstile", "1");
      document.head.appendChild(s);
    }

    const interval = setInterval(() => {
      if (window.turnstile && turnstileContainerRef.current) {
        clearInterval(interval);
        window.turnstile.render(turnstileContainerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          size: "invisible",
          callback: (token) => setTurnstileToken(token),
        });
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!acceptTerms) {
      setErrorMsg("Debes aceptar los Términos y el Aviso de Privacidad.");
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitLead({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        message: message.trim(),
        listing_id: listingId ?? undefined,
        source: listingId ? "listing" : "contact_page",
        accept_terms: acceptTerms,
        send_confirmation: sendConfirmation,
        turnstile_token: turnstileToken || undefined,
      });

      const finalAgentName = result?.lead?.agent_name || agentName || "el agente";
      setSuccessMsg(
        `Tu mensaje fue enviado a ${finalAgentName}. Te contactará en menos de 24 horas.`
      );
      setName("");
      setPhone("");
      setEmail("");
      setMessage(
        listingTitle
          ? `Hola, me interesa "${listingTitle}". ¿Sigue disponible?`
          : ""
      );
      setAcceptTerms(false);
      setSendConfirmation(false);
    } catch (err) {
      const msg = err?.message || "Hubo un error al enviar el mensaje.";
      if (/429|demasiadas/i.test(msg)) {
        setErrorMsg(
          "Estás enviando muchos mensajes. Espera un minuto e inténtalo de nuevo."
        );
      } else if (/422/.test(msg)) {
        setErrorMsg(
          "Algunos datos no son válidos. Revisa el formulario e intenta de nuevo."
        );
      } else {
        setErrorMsg(msg);
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (successMsg) {
    return (
      <div
        className={`rounded-xl border border-blue-100 bg-blue-50 p-5 text-blue-900 ${
          variant === "embedded" ? "" : "max-w-xl mx-auto"
        }`}
      >
        <p className="text-base font-semibold">¡Listo!</p>
        <p className="mt-1 text-sm">{successMsg}</p>
        <button
          type="button"
          onClick={() => setSuccessMsg("")}
          className="mt-3 text-sm font-medium text-blue-700 underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${
        variant === "embedded" ? "" : "max-w-xl mx-auto"
      }`}
      noValidate
    >
      {variant === "embedded" && (
        <p className="mb-3 text-sm font-semibold text-slate-900">
          {agentName ? `Habla con ${agentName}` : "Solicita más información"}
        </p>
      )}

      <div className="grid gap-3">
        <Field label="Nombre" htmlFor="lead-name">
          <input
            id="lead-name"
            type="text"
            required
            minLength={2}
            maxLength={120}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </Field>

        <Field label="Teléfono" htmlFor="lead-phone">
          <input
            id="lead-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+52 55 1234 5678"
            className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </Field>

        <Field label="Email" htmlFor="lead-email">
          <input
            id="lead-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </Field>

        <Field label="Mensaje" htmlFor="lead-message">
          <textarea
            id="lead-message"
            required
            minLength={10}
            maxLength={2000}
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </Field>

        <label className="flex items-start gap-2 text-xs text-slate-700">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            required
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
          />
          <span>
            Acepto los{" "}
            <a
              href="/terminos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline"
            >
              Términos
            </a>{" "}
            y el{" "}
            <a
              href="/aviso-de-privacidad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline"
            >
              Aviso de Privacidad
            </a>
            .
          </span>
        </label>

        <label className="flex items-start gap-2 text-xs text-slate-600">
          <input
            type="checkbox"
            checked={sendConfirmation}
            onChange={(e) => setSendConfirmation(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
          />
          <span>Envíame una copia de confirmación por email.</span>
        </label>

        {/* Contenedor para Turnstile widget (solo si hay site key configurado) */}
        {TURNSTILE_SITE_KEY ? (
          <div ref={turnstileContainerRef} aria-hidden="true" />
        ) : null}

        {errorMsg && (
          <p className="text-sm text-red-600" role="alert">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-1 inline-flex items-center justify-center rounded-[20px] bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? "Enviando..." : "Enviar mensaje"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, htmlFor, children }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1 block text-xs font-medium text-slate-700"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
