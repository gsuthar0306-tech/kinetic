import { useState } from "react";
import FilterSidebar, { type StoreFilters } from "@/components/store/FilterSidebar";
import Products from "../components/store/Productes";
import UnderNav, { type SortOption, type ViewMode } from "@/components/store/UnderNav";

const Store = () => {
  const [filters, setFilters] = useState<StoreFilters>({
    categories: null,
    priceRange: null,
    minRating: null,
  });
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [view, setView] = useState<ViewMode>("grid");
  const [resultCount, setResultCount] = useState(0);

  return (
    <div className="flex h-[calc(100dvh-4rem)] flex-col overflow-hidden sm:h-[calc(100dvh-4.5rem)]">
      <UnderNav
        sortBy={sortBy}
        onSortChange={setSortBy}
        view={view}
        onViewChange={setView}
        resultCount={resultCount}
      />
      <div className="flex min-h-0 flex-1">
        <aside className="w-64 shrink-0 overflow-hidden border-r bg-white">
          <FilterSidebar onFiltersChange={setFilters} />
          </aside>

        <main className="min-w-0 flex-1 overflow-y-auto overscroll-contain">
          <Products
            filters={filters}
            sortBy={sortBy}
            view={view}
            onResultCountChange={setResultCount}
          />
        </main>
      </div>
    </div>
  );
};

export default Store;
