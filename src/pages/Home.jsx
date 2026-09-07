import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import ProductCarouselRow from "../components/ProductCarouselRow";
import CategoryBanner from "../components/CategoryBanner";
import SeriesShowcase from "../components/SeriesShowcase";
import PromoBanner from "../components/PromoBanner";
import ContactSection from "../components/ContactSection";
import FirebaseSetupNotice from "../components/FirebaseSetupNotice";
import { subscribeToCategories, subscribeToProducts } from "../firebase/products";
import { isFirebaseConfigured } from "../firebase/config";

function pickRepresentativeImage(products) {
  const withImages = products.filter((p) => p.imageUrl);
  const best = withImages.find((p) => p.isBestseller);
  return (best || withImages[0])?.imageUrl;
}

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
  const bestsellers = withImages
    .filter((p) => p.isBestseller)
    .sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
  const featuredProducts = (bestsellers.length > 0 ? bestsellers : withImages).slice(0, 8);
  const carouselImages = (bestsellers.length > 0 ? bestsellers : withImages)
    .slice(0, 6)
    .map((p) => ({ src: p.imageUrl, alt: p.name }));

  const categoryBanners = categories.map((cat) => ({
    name: cat.name,
    imageUrl: pickRepresentativeImage(products.filter((p) => p.category === cat.name)),
  }));

  const seriesNames = [...new Set(products.map((p) => p.series).filter((s) => s && s !== "Diğer"))];
  const seriesShowcase = seriesNames
    .map((name) => ({
      name,
      imageUrl: pickRepresentativeImage(products.filter((p) => p.series === name)),
      count: products.filter((p) => p.series === name).length,
    }))
    .filter((s) => s.imageUrl)
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const mangalProduct = withImages.find((p) => /mangal|izgara/i.test(p.name));

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      {!isFirebaseConfigured && <FirebaseSetupNotice />}
      <Header />

      <main className="flex-1">
        <Hero carouselImages={carouselImages} />

        {categoryBanners.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-charcoal sm:text-3xl">
              Kategoriler
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {categoryBanners.map((cat) => (
                <CategoryBanner key={cat.name} name={cat.name} imageUrl={cat.imageUrl} />
              ))}
            </div>
          </section>
        )}

        {bestsellers.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight text-charcoal sm:text-3xl">
                Çok Satanlar
              </h2>
              <Link
                to="/katalog"
                className="text-sm font-medium text-emerald hover:text-emerald-light"
              >
                Tümünü Gör →
              </Link>
            </div>
            <div className="mt-10">
              <ProductCarouselRow products={bestsellers.slice(0, 15)} />
            </div>
          </section>
        )}

        <SeriesShowcase series={seriesShowcase} />

        {mangalProduct && (
          <div className="pb-20">
            <PromoBanner
              imageUrl={mangalProduct.imageUrl}
              title="Paslanmaz kaliteyle mangal keyfi"
              subtitle="Mutfak ekipmanları koleksiyonumuzda kaliteli ızgara ve mangal seçenekleri sizi bekliyor."
              to={`/katalog?kategori=${encodeURIComponent("Mutfak Ekipmanları")}`}
            />
          </div>
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
