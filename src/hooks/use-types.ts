import { useQuery } from "@tanstack/react-query";
import { fetchAllTypes, fetchTypeDetails } from "@/src/services/pokemon";

export const useAllTypes = () => {
  return useQuery({
    queryKey: ["types-all"],
    queryFn: fetchAllTypes,
    staleTime: Infinity,
  });
};

export const useTypeDetails = (typeName: string) => {
  return useQuery({
    queryKey: ["type-details", typeName],
    queryFn: () => fetchTypeDetails(typeName),
    enabled: !!typeName,
  });
};
