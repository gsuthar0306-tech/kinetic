import "./App.css";
import { Routes, Route } from "react-router";
import PublicLayout from "@/components/layout/public/PublicLayout";
import AuthLayout from "@/components/layout/auth/AuthLayout";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import HomePage from "@/pages/home/HomePage";
import StorePage from "@/pages/store/StorePage";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <div className="min-h-screen container mx-auto bg-white scrollbar-thin scrollbar-thumb-amber-100">
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/store" element={<StorePage />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Route>
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
