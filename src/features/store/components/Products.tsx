import { useEffect, useMemo, useState } from "react";
import { Heart, ShoppingBag, Star } from "lucide-react";

import { getElectronicProducts, type Product } from "@/services/products";

import type { StoreFilters } from "./FilterSidebar";
import type { SortOption } from "./UnderNav";
import { useNavigate } from "react-router";

interface ProductsProps {
  filters: StoreFilters;
  sortBy: SortOption;
  onResultCountChange: (count: number) => void;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

const Products = ({ filters, sortBy, onResultCountChange }: ProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getElectronicProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const [addedProducts, setAddedProducts] = useState<number[]>([]);

  const navigate = useNavigate();

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`, {
      state: { product },
    });
  };

  const filteredProducts = useMemo(() => {
    let result = products;

    if (filters.categories) {
      result = result.filter((product) =>
        filters.categories!.includes(product.category),
      );
    }

    if (filters.priceRange) {
      result = result.filter(
        (product) =>
          product.price >= filters.priceRange!.min &&
          product.price <= filters.priceRange!.max,
      );
    }

    if (filters.minRating) {
      result = result.filter((product) => product.rating >= filters.minRating!);
    }

    if (sortBy === "price-low") {
      result = [...result].sort((first, second) => first.price - second.price);
    }

    if (sortBy === "price-high") {
      result = [...result].sort((first, second) => second.price - first.price);
    }

    if (sortBy === "rating") {
      result = [...result].sort(
        (first, second) => second.rating - first.rating,
      );
    }

    return result;
  }, [products, filters, sortBy]);

  useEffect(() => {
    onResultCountChange(filteredProducts.length);
  }, [filteredProducts.length, onResultCountChange]);

  const toggleFavorite = (productId: number) => {
    if (favorites.includes(productId)) {
      const newFavorites = favorites.filter((id) => id !== productId);

      setFavorites(newFavorites);

      return;
    }

    const newFavorites = [...favorites, productId];

    setFavorites(newFavorites);
  };

  if (loading) {
    return (
      <section className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <article
            key={index}
            className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm sm:p-3"
          >
            <div className="aspect-square animate-pulse rounded-md bg-slate-100" />

            <div className="px-1 pb-1 pt-3">
              <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />

              <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-slate-100" />

              <div className="mt-4 h-4 w-1/3 animate-pulse rounded bg-slate-100" />

              <div className="mt-3 h-9 animate-pulse rounded-md bg-slate-100" />
            </div>
          </article>
        ))}
      </section>
    );
  }

  if (!filteredProducts.length) {
    return (
      <div className="flex min-h-60 items-center justify-center p-6">
        <p className="text-sm text-slate-600">No products found.</p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredProducts.map((product) => {
        const isFavorite = favorites.includes(product.id);

        return (
          <article
            key={product.id}
            onClick={() => handleProductClick(product)}
            className="group rounded-lg border border-slate-200 bg-white p-2 shadow-sm transition-shadow hover:shadow-md sm:p-3"
          >
            <div className="relative aspect-square overflow-hidden rounded-md bg-slate-100">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />

              <button
                type="button"
                aria-label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
                onClick={() => toggleFavorite(product.id)}
                className="absolute right-2 top-2 rounded-full bg-white/80 p-2.5 backdrop-blur-sm transition-colors hover:bg-white"
              >
                <Heart
                  className={`size-5 transition-colors ${
                    isFavorite ? "fill-red-500 text-red-500" : "text-slate-950"
                  }`}
                />
              </button>
            </div>

            <div className="px-1 pb-1 pt-3">
              <p className="truncate text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                {product.category.replaceAll("-", " ")}
              </p>

              <h2 className="mt-1 min-h-10 truncate text-sm font-semibold text-slate-900">
                {product.title}
              </h2>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-950">
                  {formatPrice(product.price)}
                </span>

                <span className="flex items-center gap-1 text-[10px] text-slate-500">
                  <Star className="size-3 fill-amber-400 text-amber-400" />
                  {product.rating.toFixed(1)}
                </span>
              </div>

              <button
                type="button"
                className={`mt-3 flex w-full items-center justify-center gap-2 rounded-md border py-2 text-[10px] font-bold tracking-wide transition-colors ${
                  addedProducts.includes(product.id)
                    ? "text-white bg-slate-400 border-0 outline-3 outline-slate-500"
                    : "bg-slate-950 text-white border-slate-950"
                }`}
                onClick={() => {
                  setAddedProducts((prev) =>
                    prev.includes(product.id)
                      ? prev.filter((id) => id !== product.id)
                      : [...prev, product.id],
                  );
                }}
              >
                <ShoppingBag className="size-3.5" />
                {addedProducts.includes(product.id)
                  ? "ADDED TO BAG"
                  : "ADD TO BAG"}
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Products;
