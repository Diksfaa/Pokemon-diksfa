"use client";

import { useState, useMemo } from "react";
import { usePokemon } from "@/src/hooks/use-pokemon";
import { useTypeDetails } from "@/src/hooks/use-types";
import { Swords, Trophy, Search } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { calculateBattleResult } from "@/src/lib/battle-utils";
import BattleCard from "./battle-card";

export default function CustomBattleArena() {
  const [p1Input, setP1Input] = useState("charizard");
  const [p2Input, setP2Input] = useState("blastoise");

  // Fetching data with loading/error states
  const { data: p1, isError: e1, isLoading: l1 } = usePokemon(p1Input);
  const { data: p2, isError: e2, isLoading: l2 } = usePokemon(p2Input);

  const { data: p1TypeData } = useTypeDetails(p1?.types[0]?.type.name || "");
  const { data: p2TypeData } = useTypeDetails(p2?.types[0]?.type.name || "");

  const battle = useMemo(
    () => calculateBattleResult(p1, p2, p1TypeData, p2TypeData),
    [p1, p2, p1TypeData, p2TypeData],
  );

  return (
    <div className="p-4 md:p-10 space-y-12 bg-slate-50/30 min-h-screen">
      {/* HEADER & SEARCH CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-[#ac6a6a] tracking-widest ml-2">
            Challenger 01
          </label>

          <div>
            <Input
              placeholder="Search Name..."
              onKeyDown={(e) =>
                e.key === "Enter" &&
                setP1Input(e.currentTarget.value.toLowerCase())
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-blue-500 tracking-widest ml-2">
            Challenger 02
          </label>

          <div>
            <Input
              placeholder="Search Name..."
              onKeyDown={(e) =>
                e.key === "Enter" &&
                setP2Input(e.currentTarget.value.toLowerCase())
              }
            />
          </div>
        </div>
      </div>

      {/* BATTLEGROUND */}
      <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center max-w-7xl mx-auto">
        <div className="lg:col-span-5">
          <BattleCard
            pokemon={p1}
            isLoading={l1}
            isError={e1}
            errorName={p1Input}
            score={battle?.score1 || 0}
            isWinner={battle?.winner === p1}
            multiplier={battle?.m1 || 1}
            color="red"
          />
        </div>

        <div className="lg:col-span-1 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center shadow-2xl border-4 border-white rotate-12">
            <Swords className="text-white" size={24} />
          </div>
        </div>

        <div className="lg:col-span-5">
          <BattleCard
            pokemon={p2}
            isLoading={l2}
            isError={e2}
            errorName={p2Input}
            score={battle?.score2 || 0}
            isWinner={battle?.winner === p2}
            multiplier={battle?.m2 || 1}
            color="blue"
          />
        </div>
      </div>

      {/* WINNER SECTION */}
      {!l1 && !l2 && !e1 && !e2 && battle && (
        <div className="bg-slate-950 rounded-[3rem] p-10 text-center relative overflow-hidden max-w-5xl mx-auto">
          <Trophy
            className="mx-auto text-yellow-400 mb-4 animate-bounce"
            size={48}
          />
          <h2 className="text-4xl font-black italic uppercase text-white tracking-tighter">
            {battle.winner.name} Dominates!
          </h2>
          <p className="text-slate-500 text-xs mt-2 uppercase tracking-[0.2em]">
            Final Battle Score: {Math.max(battle.score1, battle.score2)}
          </p>
        </div>
      )}
    </div>
  );
}
