import { useEffect, useRef, useState } from "react";
import {
  Home,
  ChevronRight,
  ChevronDown,
  Check,
} from "lucide-react";

export type SortOption =
  | "recommended"
  | "price-low"
  | "price-high"
  | "rating";

interface UnderNavProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  resultCount: number;
}

const sortOptions: {
  label: string;
  value: SortOption;
}[] = [
    { label: "Recommended", value: "recommended" },
    { label: "Price: low to high", value: "price-low" },
    { label: "Price: high to low", value: "price-high" },
    { label: "Top rated", value: "rating" },
  ];

const UnderNav = ({
  sortBy,
  onSortChange,
  resultCount,
}: UnderNavProps) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  const currentOption = sortOptions.find(
    (option) => option.value === sortBy
  );

  const currentLabel = currentOption?.label ?? "Recommended";

  return (
    <section className="shrink-0 border-b border-slate-200 px-6 py-5">
      <nav
        aria-label="Breadcrumb"
        className="mb-1 flex items-center gap-1.5 text-sm text-slate-500"
      >
        <Home className="size-3.5" />
        <span>Home</span>
        <ChevronRight className="size-3.5 text-slate-300" />
        <span className="text-slate-700">Electronics</span>
      </nav>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-2.5">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
              Computing gear
            </h2>

            <span className="text-sm text-slate-400">
              {resultCount.toLocaleString()} results
            </span>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Browse computing products
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div ref={rootRef} className="relative">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-haspopup="listbox"
              aria-expanded={open}
              className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 text-sm text-slate-700 transition-colors hover:border-slate-300"
            >
              <span className="text-slate-400">Sort by</span>

              <span className="font-medium">
                {currentLabel}
              </span>

              <ChevronDown
                className={`size-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""
                  }`}
              />
            </button>

            {open && (
              <ul
                role="listbox"
                className="absolute right-0 z-10 mt-1.5 w-56 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg shadow-slate-900/5"
              >
                {sortOptions.map((option) => (
                  <li key={option.value}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={sortBy === option.value}
                      onClick={() => {
                        onSortChange(option.value);
                        setOpen(false);
                      }}
                      className="flex w-full items-center justify-between px-3.5 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                    >
                      {option.label}

                      {sortBy === option.value && (
                        <Check className="size-4 text-indigo-600" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnderNav;