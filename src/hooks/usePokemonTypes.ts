import { NamedAPIResource } from "pokenode-ts";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { PokemonService, queryKeys } from "../services/pokemon.service";

export const usePokemonTypes = <T = NamedAPIResource[]>(
  options?: UseQueryOptions<NamedAPIResource[], Error, T>
) => {
  const service = new PokemonService();

  return useQuery({
    ...options,
    queryKey: queryKeys.listTypes(),
    queryFn: () => service.getTypes(),
  });
};
