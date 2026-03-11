"use client";

import { useAppSelector } from "@/src/store/store";
import { usePokemon } from "@/src/hooks/use-pokemon";
import SearchHeader from "./_components/search-header";
import PokemonHero from "./_components/pokemon-hero";
import PokemonStats from "./_components/pokemon-stats";
import PokemonKPIs from "./_components/pokemon-kpi";
import { Loader2, SearchX } from "lucide-react";

export default function Dashboard() {
  const activeSearch = useAppSelector((state) => state.pokemon.currentSearch);
  const { data: pokemon, isLoading, isError } = usePokemon(activeSearch);

  return (
    <div className="p-2 space-y-6 min-h-screen">
      <SearchHeader />

      <div className="min-h-100">
        {isLoading ? (
          <div className="h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-400">
            <Loader2 className="animate-spin h-10 w-10 text-red-500" />
            <p className="text-xs font-black uppercase tracking-widest">
              Searching name
            </p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
              <SearchX size={40} className="text-slate-300" />
            </div>
            <h2 className="text-lg font-black text-slate-800 uppercase italic">
              Not Found
            </h2>
            <p className="text-slate-500 text-sm mt-1 max-w-[250px]">
              We couldn't find{" "}
              <span className="text-red-500 font-bold">"{activeSearch}"</span>.
              Please check your spelling above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <PokemonHero pokemon={pokemon} />
            <PokemonStats stats={pokemon?.stats} />
            <PokemonKPIs pokemon={pokemon} />
          </div>
        )}
      </div>
    </div>
  );
}
