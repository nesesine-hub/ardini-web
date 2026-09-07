import { useState } from "react";

function FilterGroup({ title, options, selected, onToggle, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  if (options.length === 0) return null;

  return (
    <div className="border-b border-black/5 py-5 first:pt-0 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-sm font-semibold text-charcoal"
      >
        {title}
        <span className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}>
          ⌄
        </span>
      </button>

      {open && (
        <div className="mt-4 space-y-3">
          {options.map(({ value, count }) => (
            <label
              key={value}
              className="flex cursor-pointer items-center justify-between gap-2 text-sm text-gray-600 hover:text-charcoal"
            >
              <span className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={selected.includes(value)}
                  onChange={() => onToggle(value)}
                  className="h-4 w-4 rounded border-gray-300 text-emerald focus:ring-emerald/30"
                />
                {value}
              </span>
              <span className="text-xs text-gray-400">{count}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FilterSidebar({
  categories,
  series,
  colors,
  selectedCategories,
  selectedSeries,
  selectedColors,
  onToggleCategory,
  onToggleSeries,
  onToggleColor,
  onClear,
}) {
  const hasActiveFilters =
    selectedCategories.length > 0 || selectedSeries.length > 0 || selectedColors.length > 0;

  return (
    <aside className="w-full lg:w-64 lg:flex-shrink-0">
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-charcoal">Filtrele</h3>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClear}
              className="text-xs font-medium text-emerald hover:text-emerald-light"
            >
              Temizle
            </button>
          )}
        </div>

        <FilterGroup
          title="Kategori"
          options={categories}
          selected={selectedCategories}
          onToggle={onToggleCategory}
        />
        <FilterGroup
          title="Seri"
          options={series}
          selected={selectedSeries}
          onToggle={onToggleSeries}
          defaultOpen={false}
        />
        <FilterGroup
          title="Renk"
          options={colors}
          selected={selectedColors}
          onToggle={onToggleColor}
          defaultOpen={false}
        />
      </div>
    </aside>
  );
}
