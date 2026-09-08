import "./App.css";
import { Routes, Route } from "react-router";
import PublicLayout from "@/components/layout/public/PublicLayout";
import AuthLayout from "@/components/layout/auth/AuthLayout";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import HomePage from "@/pages/home/HomePage";
import StorePage from "@/pages/store/StorePage";
import { Toaster } from "./components/ui/sonner";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import { FavoritesProvider } from "./context/FavoritesContext";
import { CartProvider } from "./context/CartContext";
import { Profile } from "./pages/User/Profile";
import Cart from "./pages/Cart/Cart";
import Favorites from "./pages/Favorites/Favorites";
import Admin from "./pages/Admin/Admin";
import AdminLayout from "./components/layout/Admin/AdminLayout";
import UserLayout from "./components/layout/User/UserLayout";

function App() {
  return (
    <>
      <FavoritesProvider>
        <CartProvider>
          <div className="min-h-screen container mx-auto bg-white">
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/store" element={<StorePage />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/profile" element={<UserLayout />} />
              </Route>
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
              </Route>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<Admin />} />
              </Route>
            </Routes>
            <Toaster position="top-right" />
          </div>
        </CartProvider>
      </FavoritesProvider>
    </>
  );
}

export default App;
