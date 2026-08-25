import { Heart, Menu, Search, ShoppingBag, UserRound } from "lucide-react";

const navLinks = ["Audio", "Computing", "Smart Home", "Wearables"];

function Navbar() {
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
            <a
              key={link}
              href="#"
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
            >
              {link}
            </a>
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
            className="hidden rounded-full p-2.5 transition-colors hover:bg-slate-100 sm:block"
          >
            <Heart className="size-5" />
          </button>
          <button
            aria-label="Account"
            className="hidden rounded-full p-2.5 transition-colors hover:bg-slate-100 sm:block"
          >
            <UserRound className="size-5" />
          </button>
          <button
            aria-label="Shopping bag"
            className="rounded-full p-2.5 transition-colors hover:bg-slate-100"
          >
            <ShoppingBag className="size-5" />
          </button>
          <button
            aria-label="Open menu"
            className="rounded-full p-2.5 transition-colors hover:bg-slate-100 lg:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
