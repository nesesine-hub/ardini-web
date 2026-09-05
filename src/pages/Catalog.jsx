import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import FirebaseSetupNotice from "../components/FirebaseSetupNotice";
import { subscribeToCategories, subscribeToProducts } from "../firebase/products";
import { isFirebaseConfigured } from "../firebase/config";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("kategori") || "Tümü";

  useEffect(() => {
    const unsubProducts = subscribeToProducts(setProducts);
    const unsubCategories = subscribeToCategories(setCategories);
    return () => {
      unsubProducts();
      unsubCategories();
    };
  }, []);

  function handleSelectCategory(categoryName) {
    if (categoryName === "Tümü") {
      searchParams.delete("kategori");
    } else {
      searchParams.set("kategori", categoryName);
    }
    setSearchParams(searchParams);
  }

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "Tümü" || product.category === selectedCategory;
      const matchesSearch = product.name
        .toLocaleLowerCase("tr")
        .includes(searchTerm.toLocaleLowerCase("tr"));
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

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
            <CategoryFilter
              categories={categories}
              selected={selectedCategory}
              onSelect={handleSelectCategory}
            />
          </div>

          {filteredProducts.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-24 flex flex-col items-center justify-center text-center">
              <p className="text-lg font-medium text-charcoal">
                Ürün bulunamadı
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Farklı bir arama terimi veya kategori deneyin.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
