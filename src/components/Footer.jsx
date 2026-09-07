import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-cream-dark">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Link to="/">
              <img src="./logo.png" alt="Ardini" className="h-10 w-auto" />
            </Link>
            <p className="mt-3 max-w-sm text-sm text-gray-500">
              Banyo, mutfak ve yapı & hırdavat kategorilerinde özenle seçilmiş
              ürünlerin premium kataloğu.
            </p>
          </div>
          <nav className="flex gap-8 text-sm text-gray-500">
            <Link to="/katalog" className="transition-colors hover:text-charcoal">
              Katalog
            </Link>
            <a href="#iletisim" className="transition-colors hover:text-charcoal">
              İletişim
            </a>
            <Link to="/admin-login" className="transition-colors hover:text-charcoal">
              Yönetici Girişi
            </Link>
          </nav>
        </div>
        <div className="mt-8 flex flex-col gap-1 border-t border-black/5 pt-8 text-sm text-gray-500 sm:flex-row sm:gap-6">
          <a href="tel:+905493300900" className="transition-colors hover:text-charcoal">
            0549 330 09 00
          </a>
          <span className="hidden sm:inline">·</span>
          <span>Bayar Plaza, Şeyh Sinan, İbrişim Sk., 59850 Çorlu/Tekirdağ</span>
        </div>
        <p className="mt-6 text-xs text-gray-400">
          © {new Date().getFullYear()} Ardini — Bayar Ticari Yatırımlar Yapı Turizm Kimya San. ve Tic. Ltd. Şti. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
