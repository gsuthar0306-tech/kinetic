import { Outlet } from "react-router-dom";
import FilterSidebar from "./FilterSidebar";

const StoreLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex">
          <aside className="w-64 shrink-0 border-r">
            <FilterSidebar />
          </aside>

          <main className="min-w-0 flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default StoreLayout;
