import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../components/ProductCard";
import FirebaseSetupNotice from "../components/FirebaseSetupNotice";
import { subscribeToCategories, subscribeToProducts } from "../firebase/products";
import { isFirebaseConfigured } from "../firebase/config";

function parseList(searchParams, key) {
  const raw = searchParams.get(key);
  return raw ? raw.split(",").filter(Boolean) : [];
}

function toggleInList(list, value) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function countOptions(items, key) {
  const counts = new Map();
  for (const item of items) {
    const value = item[key];
    if (!value) continue;
    counts.set(value, (counts.get(value) || 0) + 1);
  }
  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count);
}

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategories = useMemo(() => {
    const legacy = searchParams.get("kategori");
    const list = parseList(searchParams, "kategori");
    return legacy && list.length === 0 ? [legacy] : list;
  }, [searchParams]);
  const selectedSeries = useMemo(() => parseList(searchParams, "seri"), [searchParams]);
  const selectedColors = useMemo(() => parseList(searchParams, "renk"), [searchParams]);

  useEffect(() => {
    const unsubProducts = subscribeToProducts(setProducts);
    const unsubCategories = subscribeToCategories(setCategories);
    return () => {
      unsubProducts();
      unsubCategories();
    };
  }, []);

  function updateListParam(key, list) {
    const next = new URLSearchParams(searchParams);
    if (list.length > 0) {
      next.set(key, list.join(","));
    } else {
      next.delete(key);
    }
    setSearchParams(next);
  }

  const categoryOptions = countOptions(products, "category").map((o) => ({
    ...o,
    value: o.value,
  }));
  const seriesOptions = countOptions(
    products.filter((p) => p.series && p.series !== "Diğer"),
    "series"
  );
  const colorOptions = countOptions(
    products.filter((p) => p.color && p.color !== "Diğer"),
    "color"
  );

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesSeries =
        selectedSeries.length === 0 || selectedSeries.includes(product.series);
      const matchesColor =
        selectedColors.length === 0 || selectedColors.includes(product.color);
      const matchesSearch = product.name
        .toLocaleLowerCase("tr")
        .includes(searchTerm.toLocaleLowerCase("tr"));
      return matchesCategory && matchesSeries && matchesColor && matchesSearch;
    });

    return filtered.sort((a, b) => {
      if (!!b.isBestseller !== !!a.isBestseller) return b.isBestseller ? 1 : -1;
      if ((b.salesCount || 0) !== (a.salesCount || 0)) return (b.salesCount || 0) - (a.salesCount || 0);
      return a.name.localeCompare(b.name, "tr");
    });
  }, [products, selectedCategories, selectedSeries, selectedColors, searchTerm]);

  function clearFilters() {
    const next = new URLSearchParams(searchParams);
    next.delete("kategori");
    next.delete("seri");
    next.delete("renk");
    setSearchParams(next);
  }

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      {!isFirebaseConfigured && <FirebaseSetupNotice />}
      <Header />

      <main className="flex-1">
        <section className="border-b border-black/5 bg-cream-dark">
          <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
            <h1 className="text-3xl font-semibold tracking-tight text-charcoal sm:text-4xl">
              Katalog
            </h1>
            <p className="mt-3 max-w-xl text-gray-500">
              İhtiyacınıza uygun ürünü kategoriye göre filtreleyin veya
              doğrudan arayın.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="w-full md:max-w-sm">
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
            </div>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen((o) => !o)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-5 py-3 text-sm font-medium text-charcoal lg:hidden"
            >
              Filtrele
              {(selectedCategories.length + selectedSeries.length + selectedColors.length) > 0 && (
                <span className="rounded-full bg-navy px-2 py-0.5 text-xs text-white">
                  {selectedCategories.length + selectedSeries.length + selectedColors.length}
                </span>
              )}
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">
            <div className={`${mobileFiltersOpen ? "block" : "hidden"} lg:block`}>
              <FilterSidebar
                categories={categoryOptions}
                series={seriesOptions}
                colors={colorOptions}
                selectedCategories={selectedCategories}
                selectedSeries={selectedSeries}
                selectedColors={selectedColors}
                onToggleCategory={(v) => updateListParam("kategori", toggleInList(selectedCategories, v))}
                onToggleSeries={(v) => updateListParam("seri", toggleInList(selectedSeries, v))}
                onToggleColor={(v) => updateListParam("renk", toggleInList(selectedColors, v))}
                onClear={clearFilters}
              />
            </div>

            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <p className="text-lg font-medium text-charcoal">
                    Ürün bulunamadı
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Farklı bir arama terimi veya filtre deneyin.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
