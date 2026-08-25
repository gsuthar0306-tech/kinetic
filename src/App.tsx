import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import PublicLayout from "./components/layout/PublicLayout";

function App() {
  return (
    <>
      <div className="min-h-screen container mx-auto bg-white">
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
