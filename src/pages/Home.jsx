import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import ContactSection from "../components/ContactSection";
import FirebaseSetupNotice from "../components/FirebaseSetupNotice";
import { subscribeToCategories, subscribeToProducts } from "../firebase/products";
import { isFirebaseConfigured } from "../firebase/config";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubCategories = subscribeToCategories(setCategories);
    const unsubProducts = subscribeToProducts(setProducts);
    return () => {
      unsubCategories();
      unsubProducts();
    };
  }, []);

  const withImages = products.filter((p) => p.imageUrl);
  const bestsellers = withImages.filter((p) => p.isBestseller);
  const featuredProducts = (bestsellers.length > 0 ? bestsellers : withImages).slice(0, 4);
  const carouselImages = (bestsellers.length > 0 ? bestsellers : withImages)
    .slice(0, 6)
    .map((p) => ({ src: p.imageUrl, alt: p.name }));

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      {!isFirebaseConfigured && <FirebaseSetupNotice />}
      <Header />

      <main className="flex-1">
        <Hero carouselImages={carouselImages} />

        {categories.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-charcoal sm:text-3xl">
              Kategoriler
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/katalog?kategori=${encodeURIComponent(cat.name)}`}
                  className="group flex items-center justify-between rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="text-lg font-medium text-charcoal">
                    {cat.name}
                  </span>
                  <span className="text-emerald transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {featuredProducts.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight text-charcoal sm:text-3xl">
                Öne Çıkan Ürünler
              </h2>
              <Link
                to="/katalog"
                className="text-sm font-medium text-emerald hover:text-emerald-light"
              >
                Tümünü Gör →
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
