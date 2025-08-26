import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white border-b">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
        {/* Marca (izquierda) */}
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded bg-blue-500" />
          <span className="font-semibold">MexicoSquared</span>
        </div>

        {/* Acciones + Redes (derecha) */}
        <nav className="ml-auto flex items-center gap-3">
          <button className="px-3 py-1.5 rounded border text-sm">
            Publicar
          </button>
          <button className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm">
            Ingresar
          </button>

          {/* Íconos al extremo derecho */}
          <div className="flex items-center gap-2 pl-3 border-l">
            <a
              href="https://instagram.com/tuusuario"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2 rounded hover:bg-gray-100 hover:text-pink-600 transition"
              title="Instagram"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
            <a
              href="https://facebook.com/tuusuario"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-2 rounded hover:bg-gray-100 hover:text-blue-600 transition"
              title="Facebook"
            >
              <FaFacebookF className="h-5 w-5" />
            </a>
            <a
              href="https://www.tiktok.com/@tuusuario"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="p-2 rounded hover:bg-gray-100 transition"
              title="TikTok"
            >
              <FaTiktok className="h-5 w-5" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
