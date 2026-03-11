"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import { Pokemon } from "@/src/types/pokemon";
import { Ruler, Weight, Zap, Heart, Target, TrendingUp } from "lucide-react";

interface PokemonKPIsProps {
  pokemon: Pokemon;
}

export default function PokemonKPIs({ pokemon }: PokemonKPIsProps) {
  const totalStats = pokemon.stats.reduce(
    (acc: number, s: any) => acc + s.base_stat,
    0,
  );
  const powerPercentage = Math.min(Math.round((totalStats / 700) * 100), 100);

  return (
    <div className="md:col-span-3 grid grid-cols-2 gap-3">
      <Card className="col-span-2 bg-slate-900 border-none text-white overflow-hidden relative group">
        <CardContent className="p-4">
          <div className="flex justify-between items-start relative">
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">
                Combat Power
              </p>
              <h3 className="text-3xl font-black italic">{totalStats}</h3>
            </div>
            <TrendingUp
              className="text-emerald-400 group-hover:scale-110 transition-transform"
              size={24}
            />
          </div>
          <div className="mt-4 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000"
              style={{ width: `${powerPercentage}%` }}
            />
          </div>
          <p className="text-[9px] mt-2 text-slate-500 font-bold uppercase">
            Rank: {totalStats > 500 ? "Elite" : "Common"}
          </p>
        </CardContent>
      </Card>

      {/* 2. Height & Weight (Small Square Cards) */}
      <StatBox
        icon={<Ruler size={16} />}
        label="Height"
        value={`${pokemon.height / 10}m`}
        color="text-blue-500"
      />
      <StatBox
        icon={<Weight size={16} />}
        label="Weight"
        value={`${pokemon.weight / 10}kg`}
        color="text-orange-500"
      />

      {/* 3. Base Experience (Medium Card) */}
      <Card className="col-span-2 flex items-center p-3 border-none bg-white shadow-sm hover:shadow-md transition-all">
        <div className="w-10 h-10 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center mr-3">
          <Zap size={20} fill="currentColor" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase">
              Training Reward
            </p>
            <span className="text-[10px] font-mono font-bold bg-yellow-100 px-1.5 rounded text-yellow-700">
              +{pokemon.base_experience} XP
            </span>
          </div>
          <div className="h-1 w-full bg-slate-100 mt-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-400"
              style={{ width: `${(pokemon.base_experience / 340) * 100}%` }}
            />
          </div>
        </div>
      </Card>

      {/* 4. Friendship (Small Square) */}
      <StatBox
        icon={<Heart size={16} />}
        label="Base Love"
        value="70"
        color="text-pink-500"
      />

      {/* 5. Catch Target (Small Square) */}
      <StatBox
        icon={<Target size={16} />}
        label="Capture"
        value="45"
        color="text-red-500"
      />
    </div>
  );
}

function StatBox({
  icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <Card className="p-3 border-none shadow-sm flex flex-col items-center justify-center text-center hover:bg-slate-50 cursor-default">
      <div className={`${color} mb-1 opacity-80`}>{icon}</div>
      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
        {label}
      </p>
      <p className="text-sm font-black text-slate-700 leading-tight">{value}</p>
    </Card>
  );
}
