import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchPokemonList, fetchAllPokemonNames } from "@/src/services/pokemon";

export const usePokemonList = (page: number, limit: number = 20) => {
  const offset = page * limit;
  return useQuery({
    queryKey: ["pokemon-list", limit, offset],
    queryFn: () => fetchPokemonList(limit, offset),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
};

export const useAllPokemon = () => {
  return useQuery({
    queryKey: ["pokemon-all-names"],
    queryFn: fetchAllPokemonNames,
    staleTime: Infinity,
  });
};
