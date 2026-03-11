import { Card, CardContent } from "@/src/components/ui/card";
import { Pokemon } from "@/src/types/pokemon";

interface PokemonHeroProps {
  pokemon: Pokemon;
}

export default function PokemonHero({ pokemon }: PokemonHeroProps) {
  return (
    <Card className="md:col-span-4 overflow-hidden border-none shadow-2xl bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white group">
      <CardContent className="p-0 relative flex flex-col items-center justify-center min-h-112.5">
        <div className="absolute top-6 right-6 text-white/20 font-mono text-4xl font-black italic tracking-tighter group-hover:text-red-500/30 transition-colors duration-500">
          #{pokemon.id.toString().padStart(3, "0")}
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <h2 className="text-[70px] font-black uppercase italic leading-none">
            {pokemon.name}
          </h2>
        </div>

        <div className=" transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-4">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-64 h-64 drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]"
          />
        </div>

        <div className=" mt-6 flex flex-col items-center gap-4 text-center">
          <div className="space-y-1">
            <h1 className="text-5xl font-black uppercase italic  leading-tight bg-linear-to-b from-white to-slate-400 bg-clip-text text-transparent">
              {pokemon.name}
            </h1>

            <div className="h-1 w-24 bg-red-500 mx-auto rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
          </div>

          <div className="flex gap-2">
            {pokemon.types.map((t: any) => (
              <span
                key={t.type.name}
                className="px-4 py-1.5 bg-white/5 backdrop-blur-xl rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 hover:bg-white/20 transition-all cursor-default"
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
