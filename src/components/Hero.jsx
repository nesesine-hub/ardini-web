import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center lg:px-10 lg:py-40">
        <span className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-emerald">
          Premium Yaşam Alanları
        </span>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
          Evinizin her köşesi için
          <br className="hidden sm:block" />
          <span className="text-navy"> zarif</span> çözümler
        </h1>
        <p className="mt-6 max-w-xl text-base text-gray-500 sm:text-lg">
          Banyo aksesuarlarından mutfak ekipmanlarına, yapı & hırdavat
          ürünlerine kadar özenle küratörlüğünü yaptığımız koleksiyonu keşfedin.
        </p>
        <Link
          to="/katalog"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-navy px-9 py-4 text-sm font-semibold text-white shadow-lg shadow-navy/20 transition-all duration-300 hover:bg-navy-light hover:shadow-xl hover:shadow-navy/30"
        >
          Kataloğu İncele
        </Link>
      </div>

      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-emerald/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-navy/5 blur-3xl" />
    </section>
  );
}
