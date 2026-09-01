import { useState } from "react";
import { NavLink } from "react-router";
import { Heart, Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type NavLinkItem = {
  label: string;
  href: string;
};

const navLinks: NavLinkItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Store",
    href: "/store",
  },
  {
    label: "Smart Home",
    href: "/store/smart-home",
  },
  {
    label: "Wearables",
    href: "/store/wearables",
  },
];

function Navbar() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:h-18 sm:gap-5 sm:px-8">
        <a
          href="/"
          className="shrink-0 text-lg font-black tracking-[0.14em] text-slate-950 sm:text-xl sm:tracking-[0.18em]"
        >
          KINETIC
        </a>
        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `text-sm font-medium transition-all duration-200 ${isActive
                  ? "scale-105 test-slate-950"
                  : "text-slate-600 hover:scale-105 hover:text-slate-950"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <label className="ml-auto hidden max-w-xs flex-1 items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-slate-500 md:flex">
          <Search className="size-4" />
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            type="search"
            placeholder="Search products"
          />
        </label>
        <div className="flex items-center gap-1 text-slate-700">
          <button
            aria-label="Search"
            className="rounded-full p-2.5 transition-colors hover:bg-slate-100 md:hidden"
          >
            <Search className="size-5" />
          </button>
          <button
            aria-label="Favorites"
            onClick={() => setIsFavorite(!isFavorite)}
            className="hidden rounded-full p-2.5 transition-colors hover:bg-slate-100 sm:block"
          >
            <Heart
              className={`size-5 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-slate-950"
                }`}
            />
          </button>
          <NavLink
            to={"/login"}
            aria-label="Account"
            className="hidden rounded-full p-2.5 transition-colors hover:bg-slate-100 sm:block"
          >
            <UserRound className="size-5" />
          </NavLink>
          <button
            aria-label="Shopping bag"
            className="rounded-full p-2.5 transition-colors hover:bg-slate-100"
          >
            <ShoppingBag className="size-5" />
          </button>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full lg:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>KINETIC</SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-4 p-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    className={({ isActive }) =>
                      `text-sm font-medium transition-colors ${isActive
                        ? "text-slate-950"
                        : "text-slate-600 hover:text-slate-950"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
