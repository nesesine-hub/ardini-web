import { useState } from "react";

export default function ImageGallery({ images, alt }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-3xl bg-cream-dark">
        <span className="text-sm font-medium uppercase tracking-wide text-gray-400">
          Görsel Yakında
        </span>
      </div>
    );
  }

  return (
    <div>
      <div className="aspect-square w-full overflow-hidden rounded-3xl bg-cream-dark ring-1 ring-black/5">
        <img
          src={images[activeIndex]}
          alt={alt}
          className="h-full w-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-3 sm:grid-cols-6">
          {images.map((src, index) => (
            <button
              key={src}
              onClick={() => setActiveIndex(index)}
              className={`aspect-square overflow-hidden rounded-xl ring-2 transition-all ${
                index === activeIndex ? "ring-emerald" : "ring-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img src={src} alt={`${alt} - görsel ${index + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
