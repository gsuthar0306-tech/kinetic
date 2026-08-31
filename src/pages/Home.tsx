import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Collections from "@/components/home/Collections";
import TrendingHardware from "@/components/home/TrendingHardware";
import Newsletter from "@/components/home/Newsletter";
import woodenSpeaker from "@/assets/images/woodenspeaker.webp";

const Home = () => {
  return (
    <main className="bg-white text-slate-950">
      <section className="relative h-[calc(100vh-72px)] max-h-[720px] min-h-[520px] overflow-hidden border-b border-slate-800">
        <img
          src={woodenSpeaker}
          alt="Obsidian Series wooden speaker"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.68)_0%,rgba(0,0,0,0.5)_22%,rgba(0,0,0,0.25)_38%,transparent_55%)]" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">
          <div className="max-w-[31rem]">
            <p className="mb-4 text-[10px] font-semibold tracking-[0.2em] text-blue-300 sm:text-xs">
              INTRODUCING
            </p>

            <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-white">
              The Obsidian Series
            </h1>

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-200 sm:text-base sm:leading-7">
              Engineered for absolute silence. Crafted for infinite power.
              Discover the next evolution in premium desktop computing and
              architectural audio.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-5">
              <Button className="h-11 rounded-full bg-blue-600 px-6 text-[10px] font-bold tracking-wide text-white hover:bg-blue-500 sm:h-12 sm:px-7">
                EXPLORE SERIES
              </Button>

              <Button
                variant="ghost"
                className="h-11 gap-2 rounded-full border border-transparent bg-transparent px-4 text-[10px] font-bold tracking-wide text-white backdrop-blur-0 transition-all hover:border-white/20 hover:bg-white/10 hover:backdrop-blur-md hover:text-blue-200 sm:h-12"
              >
                <Play className="size-3.5 fill-current" />
                WATCH FILM
                <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Collections />
      <TrendingHardware />
      <Newsletter />
    </main>
  );
};

export default Home;
