import { Link } from "react-router-dom";

export default function CategoryBanner({ name, imageUrl }) {
  return (
    <Link
      to={`/katalog?kategori=${encodeURIComponent(name)}`}
      className="group relative flex h-56 items-end overflow-hidden rounded-2xl bg-cream-dark shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
      <div className="relative flex w-full items-center justify-between p-6">
        <span className="text-lg font-semibold text-white">{name}</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-charcoal transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}
