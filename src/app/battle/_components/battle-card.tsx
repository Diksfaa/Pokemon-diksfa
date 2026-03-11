import { Heart, Sword, Shield, Zap, Target, Gauge } from "lucide-react";
import { Progress } from "@/src/components/ui/progress";

const statIcons: Record<string, any> = {
  hp: <Heart size={14} />,
  attack: <Sword size={14} />,
  defense: <Shield size={14} />,
  "special-attack": <Target size={14} />,
  "special-defense": <Zap size={14} />,
  speed: <Gauge size={14} />,
};

export default function BattleCard({
  pokemon,
  score,
  isWinner,
  multiplier,
  color,
}: any) {
  if (!pokemon)
    return (
      <div className="h-[500px] bg-slate-50 animate-pulse rounded-[3rem]" />
    );

  return (
    <div
      className={`relative bg-white p-8 rounded-[3rem] shadow-xl border-4 transition-all duration-500 ${
        isWinner
          ? "border-emerald-400 scale-105 shadow-emerald-100"
          : "border-transparent"
      }`}
    >
      {/* Top Image Section */}
      <div className="relative h-48 flex items-center justify-center mb-6">
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          className="h-full object-contain drop-shadow-2xl"
          alt={pokemon.name}
        />
        <div
          className={`absolute inset-0 rounded-full blur-3xl opacity-10 ${color === "red" ? "bg-red-500" : "bg-blue-500"}`}
        />
      </div>

      <h3 className="text-3xl font-black uppercase italic text-center mb-6 tracking-tighter">
        {pokemon.name}
      </h3>

      {/* Main Battle Power Section */}
      <div className="bg-slate-50 p-6 rounded-[2rem] mb-6">
        <div className="flex justify-between items-end mb-2">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Total Battle Power
            </p>
            <p className="text-4xl font-black text-slate-900">{score}</p>
          </div>
          {multiplier !== 1 && (
            <div
              className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${multiplier > 1 ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"}`}
            >
              x{multiplier} Modifier
            </div>
          )}
        </div>
        <Progress value={(score / 1200) * 100} className="h-3 rounded-full" />
      </div>

      {/* NEW: Individual Stats Grid to fill space */}
      <div className="grid grid-cols-2 gap-3">
        {pokemon.stats.map((s: any) => (
          <div
            key={s.stat.name}
            className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm"
          >
            <div
              className={`p-2 rounded-lg ${color === "red" ? "bg-red-50 text-red-500" : "bg-blue-50 text-blue-500"}`}
            >
              {statIcons[s.stat.name] || <Zap size={14} />}
            </div>
            <div>
              <p className="text-[9px] font-black uppercase text-slate-400 leading-none mb-1">
                {s.stat.name.replace("special-", "Sp. ")}
              </p>
              <p className="text-sm font-black text-slate-700 leading-none">
                {s.base_stat}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
