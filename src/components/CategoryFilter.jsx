export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect("Tümü")}
        className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
          selected === "Tümü"
            ? "bg-navy text-white"
            : "bg-white text-gray-500 ring-1 ring-black/10 hover:text-charcoal"
        }`}
      >
        Tümü
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.name)}
          className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
            selected === cat.name
              ? "bg-navy text-white"
              : "bg-white text-gray-500 ring-1 ring-black/10 hover:text-charcoal"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
