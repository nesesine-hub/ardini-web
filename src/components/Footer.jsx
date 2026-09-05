import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-cream-dark">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Link to="/" className="text-xl font-semibold tracking-tight text-charcoal">
              ARDINI
            </Link>
            <p className="mt-2 max-w-sm text-sm text-gray-500">
              Banyo, mutfak ve yapı & hırdavat kategorilerinde özenle seçilmiş
              ürünlerin premium kataloğu.
            </p>
          </div>
          <nav className="flex gap-8 text-sm text-gray-500">
            <Link to="/katalog" className="transition-colors hover:text-charcoal">
              Katalog
            </Link>
            <Link to="/admin-login" className="transition-colors hover:text-charcoal">
              Yönetici Girişi
            </Link>
          </nav>
        </div>
        <p className="mt-10 text-xs text-gray-400">
          © {new Date().getFullYear()} Ardini. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
