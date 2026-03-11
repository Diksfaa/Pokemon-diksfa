// src/lib/battle-logic.ts

interface Pokemon {
  name: string;
  stats: { base_stat: number }[];
  types: { type: { name: string } }[];
}

export const calculateBattleResult = (
  p1: Pokemon | undefined,
  p2: Pokemon | undefined,
  p1TypeData: any,
  p2TypeData: any,
) => {
  if (!p1 || !p2 || !p1TypeData || !p2TypeData) return null;

  // Calculate Base Stats
  const base1 = p1.stats.reduce((acc: number, s: any) => acc + s.base_stat, 0);
  const base2 = p2.stats.reduce((acc: number, s: any) => acc + s.base_stat, 0);

  // Calculate Multipliers
  let m1 = 1; // P1's advantage over P2
  p1.types.forEach((atk: any) => {
    p2.types.forEach((def: any) => {
      if (
        p1TypeData.damage_relations.double_damage_to.some(
          (t: any) => t.name === def.type.name,
        )
      ) {
        m1 *= 1.25;
      }
    });
  });

  let m2 = 1; // P2's advantage over P1
  p2.types.forEach((atk: any) => {
    p1.types.forEach((def: any) => {
      if (
        p2TypeData.damage_relations.double_damage_to.some(
          (t: any) => t.name === def.type.name,
        )
      ) {
        m2 *= 1.25;
      }
    });
  });

  const score1 = Math.floor(base1 * m1);
  const score2 = Math.floor(base2 * m2);

  return {
    score1,
    score2,
    winner: score1 > score2 ? p1 : p2,
    m1,
    m2,
  };
};
