import axios from "axios";

export type Product = {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  images: string[];
  price: number;
  rating: number;
};

type ProductsResponse = {
  products: Product[];
};

const electronicsCategories = new Set([
  "laptops",
  "smartphones",
  "tablets",
  "mobile-accessories",
]);

const productsApi = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10_000,
});

export async function getProducts() {
  const { data } = await productsApi.get<ProductsResponse>("/products", {
    params: {
      limit: 1000,
      select: "id,title,category,thumbnail,images,price,rating",
    },
  });

  return data.products;
}

export async function getElectronicProducts() {
  const products = await getProducts();
  return products.filter((product) =>
    electronicsCategories.has(product.category),
  );
}
