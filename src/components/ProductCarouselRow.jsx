import ProductCard from "./ProductCard";

export default function ProductCarouselRow({ products }) {
  return (
    <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
      {products.map((product) => (
        <div key={product.id} className="w-72 flex-shrink-0 snap-start sm:w-80">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
