import { useQuery } from "@tanstack/react-query";
import { fetchPokemon } from "../services/pokemon";

export const usePokemon = (pokemonName: string) => {
  return useQuery({
    queryKey: ["pokemon", pokemonName],
    queryFn: () => fetchPokemon(pokemonName),
    enabled: !!pokemonName,
    retry: false,
  });
};
