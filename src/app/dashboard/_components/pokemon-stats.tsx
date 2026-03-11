import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { PokemonStat } from "@/src/types/pokemon";

interface PokemonStatProps {
  stats: PokemonStat[];
}

export default function PokemonStats({ stats }: PokemonStatProps) {
  const chartData = stats.map((s: any) => ({
    subject: s.stat.name.replace("special-", "Sp. ").toUpperCase(),
    A: s.base_stat,
  }));

  return (
    <Card className="md:col-span-5 shadow-sm">
      <CardHeader>
        <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
          Base Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#64748b", fontSize: 10 }}
            />
            <Radar
              name="Stats"
              dataKey="A"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.5}
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
