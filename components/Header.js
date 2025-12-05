import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b">
      <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
        {/* Marca (izquierda) */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-7 w-7 rounded bg-blue-500 shrink-0" />
          <span className="font-semibold truncate">Gabana Real Estate</span>
        </div>

        {/* Acciones + Redes (derecha) */}
        <nav className="flex items-center gap-2 sm:gap-3 flex-nowrap">
          {/* En móvil escondemos los botones para que no rompan el layout */}
          {/* <button className="hidden sm:inline-flex px-3 py-1.5 rounded border text-sm shrink-0">
            Publicar
          </button> */}
          <button className="hidden sm:inline-flex px-3 py-1.5 rounded bg-blue-600 text-white text-sm shrink-0">
            Ingresar
          </button>

          {/* Íconos siempre visibles; separados con una línea */}
          <div className="flex items-center gap-2 pl-3 border-l shrink-0">
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
