import { Star, StarHalf } from "lucide-react";
import { useLocation } from "react-router-dom";
import type { Product } from "@/services/products";

const ProductDetails = () => {
  const location = useLocation();
  const product = location.state?.product as Product;

  return (
    <>
      <main>
        <section>
          <aside>
            <img src={product.thumbnail} alt={product.title} />
            <div></div>
          </aside>
          <article className="flex flex-col gap-1">
            <div className="flex justify-between">
              <h2 className="text-slate-300 tracking-tight">KINETIC SERIES</h2>
              <p className="text-amber-300">
                <Star size={16} />
                <Star size={16} />
                <Star size={16} />
                <Star size={16} />
                <StarHalf size={16} />
                <span className="px-1 text-black">
                  {product.rating.toFixed(1)} Reviews
                </span>
              </p>
            </div>
            <h1>{product?.title}</h1>
          </article>
        </section>
      </main>
    </>
  );
};

export default ProductDetails;
