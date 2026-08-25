import { useState } from "react";
import { ChevronUp, Search, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

const FilterSidebar = () => {
  // Controls whether each filter section is open or closed.
  // This is what allows the ^ button to collapse the section.
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    brand: true,
    rating: true,
  });

  // Current price range.
  // Slider returns an array, so we keep two numbers:
  // [minimum, maximum]
  const [price, setPrice] = useState([100, 500]);

  // Helper function for opening/closing a filter section.
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((current) => ({
      ...current,
      [section]: !current[section],
    }));
  };

  return (
    <aside className="w-full max-w-[270px] shrink-0 text-slate-900">
      {/* ----------------------------------------
                ACTIVE FILTERS
            ---------------------------------------- */}

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[11px] font-semibold tracking-wide">
          ACTIVE FILTERS
        </h2>

        <button
          type="button"
          className="text-[10px] text-blue-600 hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Selected filters */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        <Badge
          variant="secondary"
          className="rounded-full bg-blue-600 px-2 py-1 text-[9px] font-medium text-white hover:bg-blue-600"
        >
          $100 - $500
          <X className="ml-1 size-3" />
        </Badge>

        <Badge
          variant="secondary"
          className="rounded-full bg-blue-600 px-2 py-1 text-[9px] font-medium text-white hover:bg-blue-600"
        >
          Brand: Logitech
          <X className="ml-1 size-3" />
        </Badge>
      </div>

      <Separator />

      {/* ----------------------------------------
                CATEGORIES
            ---------------------------------------- */}

      <div className="py-4">
        {/* Section heading + collapse button */}
        <button
          type="button"
          onClick={() => toggleSection("categories")}
          className="flex w-full items-center justify-between"
        >
          <span className="text-sm font-semibold">Categories</span>

          <ChevronUp
            className={`size-4 transition-transform ${
              openSections.categories ? "" : "rotate-180"
            }`}
          />
        </button>

        {/* Only show content when section is open */}
        {openSections.categories && (
          <div className="mt-3 space-y-2">
            <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-600">
              <Checkbox defaultChecked />
              <span>
                Keyboards <span className="text-slate-500">(45)</span>
              </span>
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-600">
              <Checkbox />
              <span>
                Mice <span className="text-slate-500">(32)</span>
              </span>
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-600">
              <Checkbox />
              <span>
                Monitors <span className="text-slate-500">(28)</span>
              </span>
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-600">
              <Checkbox />
              <span>
                Headsets <span className="text-slate-500">(37)</span>
              </span>
            </label>
          </div>
        )}
      </div>

      <Separator />

      {/* ----------------------------------------
                PRICE RANGE
            ---------------------------------------- */}

      <div className="py-4">
        <button
          type="button"
          onClick={() => toggleSection("price")}
          className="flex w-full items-center justify-between"
        >
          <span className="text-sm font-semibold">Price Range</span>

          <ChevronUp
            className={`size-4 transition-transform ${
              openSections.price ? "" : "rotate-180"
            }`}
          />
        </button>

        {openSections.price && (
          <div className="mt-5">
            {/* 
                            Shadcn Slider.

                            value:
                            [100, 500]

                            min:
                            lowest possible price

                            max:
                            highest possible price
                        */}
            <Slider
              value={price}
              onValueChange={setPrice}
              min={0}
              max={1000}
              step={10}
              className="w-full"
            />

            {/* Shows the selected minimum and maximum */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex h-8 flex-1 items-center rounded-sm bg-slate-100 px-3 text-[10px] text-slate-700">
                ${price[0]}
              </div>

              <span className="text-xs text-slate-400">-</span>

              <div className="flex h-8 flex-1 items-center rounded-sm bg-slate-100 px-3 text-[10px] text-slate-700">
                ${price[1]}
              </div>
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* ----------------------------------------
                BRAND
            ---------------------------------------- */}

      <div className="py-4">
        <button
          type="button"
          onClick={() => toggleSection("brand")}
          className="flex w-full items-center justify-between"
        >
          <span className="text-sm font-semibold">Brand</span>

          <ChevronUp
            className={`size-4 transition-transform ${
              openSections.brand ? "" : "rotate-180"
            }`}
          />
        </button>

        {openSections.brand && (
          <div className="mt-3">
            {/* Search brands */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />

              <Input
                placeholder="Search brands"
                className="h-8 border-0 bg-slate-100 pl-8 text-[10px] shadow-none focus-visible:ring-1"
              />
            </div>

            {/* Brand list */}
            <div className="mt-3 space-y-2">
              <label className="flex cursor-pointer items-center gap-2 text-xs">
                <Checkbox defaultChecked />

                <span className="flex-1 text-slate-600">Logitech</span>

                <span className="text-[9px] text-slate-400">42</span>
              </label>

              <label className="flex cursor-pointer items-center gap-2 text-xs">
                <Checkbox />

                <span className="flex-1 text-slate-600">Razer</span>

                <span className="text-[9px] text-slate-400">28</span>
              </label>

              <label className="flex cursor-pointer items-center gap-2 text-xs">
                <Checkbox />

                <span className="flex-1 text-slate-600">Keychron</span>

                <span className="text-[9px] text-slate-400">15</span>
              </label>

              <label className="flex cursor-pointer items-center gap-2 text-xs">
                <Checkbox />

                <span className="flex-1 text-slate-600">Dell</span>

                <span className="text-[9px] text-slate-400">35</span>
              </label>
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* ----------------------------------------
                RATING
            ---------------------------------------- */}

      <div className="py-4">
        <button
          type="button"
          onClick={() => toggleSection("rating")}
          className="flex w-full items-center justify-between"
        >
          <span className="text-sm font-semibold">Rating</span>

          <ChevronUp
            className={`size-4 transition-transform ${
              openSections.rating ? "" : "rotate-180"
            }`}
          />
        </button>

        {openSections.rating && (
          <div className="mt-3">
            <label className="flex cursor-pointer items-center gap-2">
              <Checkbox />

              <span className="text-sm tracking-wide text-blue-600">★★★★</span>

              <span className="text-xs text-slate-600">& Up</span>
            </label>
          </div>
        )}
      </div>
    </aside>
  );
};

export default FilterSidebar;
