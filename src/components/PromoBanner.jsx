import { Link } from "react-router-dom";

export default function PromoBanner({ imageUrl, title, subtitle, to }) {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-10">
      <Link
        to={to}
        className="group relative flex h-72 items-center overflow-hidden rounded-3xl bg-charcoal shadow-lg sm:h-80"
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/40 to-transparent" />
        <div className="relative max-w-md px-8 sm:px-12">
          <h3 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
            {title}
          </h3>
          <p className="mt-3 text-white/80">{subtitle}</p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-charcoal transition-colors group-hover:bg-cream">
            Kataloğu İncele
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </section>
  );
}
