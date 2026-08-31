import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import StorePage from "./pages/Store";
import PublicLayout from "./components/layout/public/PublicLayout";

function App() {
  return (
    <>
      <div className="min-h-screen container mx-auto bg-white">
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<StorePage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
