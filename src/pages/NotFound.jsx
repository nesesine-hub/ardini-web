import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald">
        404
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-charcoal">
        Sayfa bulunamadı
      </h1>
      <p className="mt-3 max-w-sm text-gray-500">
        Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}
