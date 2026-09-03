import { useParams } from "react-router-dom";
import { getProductById, type Product } from "@/services/products";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  // const location = useLocation();
  // const product = location.state?.product as Product;

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      const productId = Number(id);

      if (Number.isNaN(productId)) {
        setLoading(false);
        return;
      }

      const data = await getProductById(productId);

      setProduct(data);
      setLoading(false);
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <div className="flex min-h-96 items-center justify-center">
          <p className="text-sm text-slate-500">Loading product...</p>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <div className="flex min-h-96 items-center justify-center">
          <p className="text-sm text-slate-500">Product not found.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <main className="p-6">
        {" "}
        <div className="grid gap-8 md:grid-cols-2">
          {" "}
          <div className="overflow-hidden rounded-lg bg-slate-100">
            {" "}
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-full w-full object-cover"
            />{" "}
          </div>{" "}
          <div className="flex flex-col justify-center">
            {" "}
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              {" "}
              {product.category.replaceAll("-", " ")}{" "}
            </p>{" "}
            <h1 className="mt-2 text-3xl font-bold text-slate-950">
              {" "}
              {product.title}{" "}
            </h1>{" "}
            <p className="mt-4 text-2xl font-bold"> ${product.price} </p>{" "}
            <p className="mt-3 text-sm text-slate-500">
              {" "}
              Rating: {product.rating.toFixed(1)}{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </main>
    </>
  );
};

export default ProductDetails;
