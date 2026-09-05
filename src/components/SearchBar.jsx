export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full">
      <svg
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ürün ara..."
        className="w-full rounded-full border border-black/10 bg-white py-3.5 pl-12 pr-5 text-sm text-charcoal placeholder:text-gray-400 focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
      />
    </div>
  );
}
