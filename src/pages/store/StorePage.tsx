import { useState } from "react";

import FilterSidebar, {
  type StoreFilters,
} from "@/features/store/components/FilterSidebar";

import Products from "@/features/store/components/Products";

import UnderNav, {
  type SortOption,
} from "@/features/store/components/UnderNav";

const initialFilters: StoreFilters = {
  categories: null,
  priceRange: null,
  minRating: null,
};

const Store = () => {
  const [filters, setFilters] = useState<StoreFilters>(initialFilters);
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [resultCount, setResultCount] = useState(0);

  return (
    <div className="flex h-[calc(100dvh-4rem)] flex-col overflow-hidden sm:h-[calc(100dvh-4.5rem)]">
      <UnderNav
        sortBy={sortBy}
        onSortChange={setSortBy}
        resultCount={resultCount}
      />

      <div className="flex min-h-0 flex-1">
        <aside className="w-64 shrink-0 overflow-hidden border-r border-slate-200 bg-white">
          <FilterSidebar filters={filters} onFiltersChange={setFilters} />
        </aside>

        <main className="min-w-0 flex-1 overflow-y-auto overscroll-contain scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
          <Products
            filters={filters}
            sortBy={sortBy}
            onResultCountChange={setResultCount}
          />
        </main>
      </div>
    </div>
  );
};

export default Store;
