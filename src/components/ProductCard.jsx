export default function ProductCard({ product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="aspect-[4/5] w-full overflow-hidden bg-cream-dark">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Görsel Yakında
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-semibold uppercase tracking-wide text-emerald">
          {product.category}
        </span>
        <h3 className="mt-2 text-lg font-semibold text-charcoal">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-gray-500">
          {product.description}
        </p>

        <a
          href={product.redirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald hover:shadow-lg hover:shadow-emerald/30"
        >
          Satın Al / Detaylı İncele
        </a>
      </div>
    </article>
  );
}
