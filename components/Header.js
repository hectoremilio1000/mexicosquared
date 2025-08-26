export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white border-b">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded bg-blue-500" />
          <span className="font-semibold">VivaOaxaca</span>
        </div>
        <nav className="ml-auto flex items-center gap-3">
          <button className="px-3 py-1.5 rounded border text-sm">
            Publicar
          </button>
          <button className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm">
            Ingresar
          </button>
        </nav>
      </div>
    </header>
  );
}
