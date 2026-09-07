import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ImageGallery from "../components/ImageGallery";
import ProductCard from "../components/ProductCard";
import { categoryBadgeClass } from "../utils/categoryColors";
import { subscribeToProduct, subscribeToProducts } from "../firebase/products";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(undefined);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    setProduct(undefined);
    const unsubscribe = subscribeToProduct(id, setProduct);
    return unsubscribe;
  }, [id]);

  useEffect(() => {
    const unsubscribe = subscribeToProducts(setAllProducts);
    return unsubscribe;
  }, []);

  if (product === undefined) {
    return (
      <div className="flex min-h-screen flex-col bg-cream">
        <Header />
        <main className="flex-1" />
        <Footer />
      </div>
    );
  }

  if (product === null) {
    return (
      <div className="flex min-h-screen flex-col bg-cream">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <p className="text-lg font-medium text-charcoal">Ürün bulunamadı</p>
          <Link
            to="/katalog"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
          >
            Kataloğa Dön
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const images = product.images?.length > 0 ? product.images : product.imageUrl ? [product.imageUrl] : [];

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .sort((a, b) => {
      const aSameSeries = a.series === product.series && product.series !== "Diğer" ? 1 : 0;
      const bSameSeries = b.series === product.series && product.series !== "Diğer" ? 1 : 0;
      if (bSameSeries !== aSameSeries) return bSameSeries - aSameSeries;
      return (b.salesCount || 0) - (a.salesCount || 0);
    })
    .slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <Link to="/katalog" className="text-sm font-medium text-gray-500 hover:text-charcoal">
            ← Kataloğa Dön
          </Link>

          <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <ImageGallery images={images} alt={product.name} />

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${categoryBadgeClass(product.category)}`}
                >
                  {product.category}
                </span>
                {product.isBestseller && (
                  <span className="inline-flex items-center rounded-full bg-coral px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    Çok Satan
                  </span>
                )}
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-charcoal">
                {product.name}
              </h1>

              {(product.series && product.series !== "Diğer") || (product.color && product.color !== "Diğer") ? (
                <div className="mt-3 flex gap-4 text-sm text-gray-500">
                  {product.series && product.series !== "Diğer" && <span>Seri: {product.series}</span>}
                  {product.color && product.color !== "Diğer" && <span>Renk: {product.color}</span>}
                </div>
              ) : null}

              <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-gray-600">
                {product.description}
              </p>

              <a
                href={product.redirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-coral px-9 py-4 text-sm font-semibold text-white shadow-lg shadow-coral/30 transition-all duration-300 hover:bg-coral-light hover:shadow-xl hover:shadow-coral/40"
              >
                Satın Al — Nalburdan.com'a Git
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <section className="mt-20">
              <h2 className="text-2xl font-semibold tracking-tight text-charcoal">
                Benzer Ürünler
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((related) => (
                  <ProductCard key={related.id} product={related} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
