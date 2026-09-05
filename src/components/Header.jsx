import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { subscribeToCategories } from "../firebase/products";

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = subscribeToCategories(setCategories);
    return unsubscribe;
  }, []);

  function goToCategory(categoryName) {
    setMenuOpen(false);
    navigate(`/katalog?kategori=${encodeURIComponent(categoryName)}`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link to="/" className="text-2xl font-semibold tracking-tight text-charcoal">
          ARDINI
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/katalog"
            className="text-sm font-medium text-charcoal/70 transition-colors hover:text-charcoal"
          >
            Tüm Ürünler
          </Link>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => goToCategory(cat.name)}
              className="text-sm font-medium text-charcoal/70 transition-colors hover:text-charcoal"
            >
              {cat.name}
            </button>
          ))}
        </nav>

        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Menüyü aç/kapat"
        >
          <span className={`h-0.5 w-6 bg-charcoal transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-charcoal transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-charcoal transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-black/5 bg-cream px-6 pb-6 md:hidden">
          <Link
            to="/katalog"
            onClick={() => setMenuOpen(false)}
            className="py-3 text-sm font-medium text-charcoal/80"
          >
            Tüm Ürünler
          </Link>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => goToCategory(cat.name)}
              className="py-3 text-left text-sm font-medium text-charcoal/80"
            >
              {cat.name}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
