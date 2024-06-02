import { useQuery } from "@tanstack/react-query";

import { PokemonService, queryKeys } from "../services/pokemon.service";

export const usePokemons = () => {
  const service = new PokemonService();

  return useQuery({
    queryKey: queryKeys.listPokemons(),
    queryFn: () => service.listAllPokemons(),
    // fetch this only once
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
