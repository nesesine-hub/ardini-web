const CATEGORY_COLORS = {
  "Banyo Aksesuarları": "text-sky bg-sky/10",
  "Mutfak Ekipmanları": "text-coral bg-coral/10",
  "Yapı & Hırdavat": "text-gold bg-gold/10",
};

const DEFAULT_COLOR = "text-emerald bg-emerald/10";

export function categoryBadgeClass(category) {
  return CATEGORY_COLORS[category] || DEFAULT_COLOR;
}
