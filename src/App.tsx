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
import Cart from "./pages/Cart/Cart";
import Favorites from "./pages/Favorites/Favorites";
import Admin from "./pages/Admin/Admin";
import AdminLayout from "./components/layout/Admin/AdminLayout";
import { Profile } from "./pages/User/Profile";
import UserLayout from "./components/layout/User/UserLayout";
import AdminOrders from "./features/Admin/components/AdminOrders";
import AdminInventory from "./features/Admin/components/AdminInventory";
import AdminAnalytics from "./features/Admin/components/AdminAnalytics";
import AdminSetting from "./features/Admin/components/AdminSetting";

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
                <Route element={<UserLayout />}>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/cart" element={<Cart />} />
                </Route>
              </Route>
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
              </Route>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/order" element={<AdminOrders />} />
                <Route path="/admin/inventory" element={<AdminInventory />} />
                <Route path="/admin/analytics" element={<AdminAnalytics />} />
                <Route path="/admin/setting" element={<AdminSetting />} />
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
