import { Link } from "react-router-dom";
import HeroCarousel from "./HeroCarousel";

export default function Hero({ carouselImages }) {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-emerald">
            Premium Yaşam Alanları
          </span>
          <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-charcoal sm:text-5xl">
            Evinizin her köşesi için
            <span className="text-navy"> zarif</span> çözümler
          </h1>
          <p className="mt-6 max-w-lg text-base text-gray-500 sm:text-lg">
            Banyo aksesuarlarından mutfak ekipmanlarına, yapı & hırdavat
            ürünlerine kadar özenle küratörlüğünü yaptığımız koleksiyonu keşfedin.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/katalog"
              className="inline-flex items-center justify-center rounded-full bg-navy px-9 py-4 text-sm font-semibold text-white shadow-lg shadow-navy/20 transition-all duration-300 hover:bg-navy-light hover:shadow-xl hover:shadow-navy/30"
            >
              Kataloğu İncele
            </Link>
            <a
              href="https://www.nalburdan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-coral px-9 py-4 text-sm font-semibold text-white shadow-lg shadow-coral/30 transition-all duration-300 hover:bg-coral-light hover:shadow-xl hover:shadow-coral/40"
            >
              Satış Sitemiz — Nalburdan.com
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="w-full max-w-md justify-self-center lg:max-w-none lg:justify-self-end">
          <HeroCarousel images={carouselImages} />
        </div>
      </div>

      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-emerald/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-coral/5 blur-3xl" />
    </section>
  );
}
