import { Link } from "react-router-dom";

export default function SeriesShowcase({ series }) {
  if (series.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <h2 className="text-center text-2xl font-semibold tracking-tight text-charcoal sm:text-3xl">
        Serilerimiz
      </h2>
      <div className="mt-10 flex snap-x gap-8 overflow-x-auto pb-4 sm:justify-center sm:gap-10">
        {series.map(({ name, imageUrl }) => (
          <Link
            key={name}
            to={`/katalog?seri=${encodeURIComponent(name)}`}
            className="group flex flex-shrink-0 snap-start flex-col items-center gap-3"
          >
            <div className="h-28 w-28 overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-lg sm:h-32 sm:w-32">
              {imageUrl && (
                <img src={imageUrl} alt={name} className="h-full w-full object-contain p-4" />
              )}
            </div>
            <span className="text-sm font-medium text-charcoal">{name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
