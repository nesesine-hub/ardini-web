import { Link } from "react-router-dom";
import { categoryBadgeClass } from "../utils/categoryColors";

export default function ProductCard({ product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/urun/${product.id}`} className="relative aspect-[4/5] w-full overflow-hidden bg-cream-dark">
        {product.isBestseller && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-coral px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm">
            Çok Satan
          </span>
        )}
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Görsel Yakında
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <span
          className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${categoryBadgeClass(product.category)}`}
        >
          {product.category}
        </span>
        <Link to={`/urun/${product.id}`}>
          <h3 className="mt-2 text-lg font-semibold text-charcoal transition-colors hover:text-emerald">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-gray-500">
          {product.description}
        </p>

        <Link
          to={`/urun/${product.id}`}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald hover:shadow-lg hover:shadow-emerald/30"
        >
          Detayları Gör
        </Link>
      </div>
    </article>
  );
}
