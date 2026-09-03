import { Heart, ShoppingBag, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { getElectronicProducts, type Product } from "@/services/products";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

const TrendingHardware = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [addedProducts, setAddedProducts] = useState<number[]>([]);

  useEffect(() => {
    let isMounted = true;
    getElectronicProducts()
      .then((data) => {
        if (isMounted) setProducts(data.slice(0, 4));
      })
      .catch(() => undefined);
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="bg-white px-5 py-14 sm:px-8 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between border-b border-slate-200 pb-4">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-slate-500">
              NEW ARRIVALS
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">
              Trending Hardware
            </h2>
          </div>
          <a
            href="#"
            className="text-xs font-semibold text-blue-600 transition-colors hover:text-blue-800"
          >
            View All &rarr;
          </a>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {(products.length ? products : Array.from({ length: 4 })).map(
            (product, index) => {
              const item = product as Product | undefined;
              const isFavorite = item ? favorites.includes(item.id) : false;

              return (
                <article
                  key={item?.id ?? index}
                  className="group rounded-lg border border-slate-200 bg-white p-2 shadow-sm transition-shadow hover:shadow-md sm:p-3"
                >
                  <div className="relative aspect-square overflow-hidden rounded-md bg-slate-100">
                    {item ? (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full animate-pulse bg-slate-100" />
                    )}
                    <button
                      type="button"
                      aria-label={
                        isFavorite
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                      onClick={() => {
                        if (!item) return;

                        setFavorites((prev) =>
                          prev.includes(item.id)
                            ? prev.filter((id) => id !== item.id)
                            : [...prev, item.id],
                        );
                      }}
                      className="absolute right-2 top-2 rounded-full bg-white/80 p-2.5 transition-colors hover:bg-slate-100"
                    >
                      <Heart
                        className={`size-5 transition-colors ${
                          isFavorite
                            ? "fill-red-500 text-red-500"
                            : "text-slate-950"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="px-1 pb-1 pt-3">
                    <p className="truncate text-[9px] font-semibold tracking-[0.14em] text-slate-400">
                      {item?.category.replaceAll("-", " ") ?? "LOADING"}
                    </p>
                    <h3 className="mt-1 truncate text-sm font-semibold text-slate-900">
                      {item?.title ?? "Loading product"}
                    </h3>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-950">
                        {item ? formatPrice(item.price) : "—"}
                      </span>
                      {item && (
                        <span className="flex items-center gap-1 text-[10px] text-slate-500">
                          <Star className="size-3 fill-amber-400 text-amber-400" />
                          {item.rating.toFixed(1)}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      disabled={!item}
                      onClick={() => {
                        if (!item) return;

                        setAddedProducts((prev) =>
                          prev.includes(item.id)
                            ? prev.filter((id) => id !== item.id)
                            : [...prev, item.id],
                        );
                      }}
                      className={`mt-3 flex w-full items-center justify-center gap-2 rounded-md border py-2 text-[10px] font-bold tracking-wide transition-colors ${
                        item && addedProducts.includes(item.id)
                          ? "border-slate-950 bg-white text-slate-950 hover:bg-slate-100"
                          : "border-slate-950 bg-slate-950 text-white hover:bg-slate-800"
                      }`}
                    >
                      <ShoppingBag className="size-3.5" />
                      {item && addedProducts.includes(item.id)
                        ? "ADDED TO BAG"
                        : "ADD TO BAG"}
                    </button>
                  </div>
                </article>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
};

export default TrendingHardware;
