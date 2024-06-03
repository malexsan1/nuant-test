import { useQuery } from "@tanstack/react-query";

import { PokemonService, queryKeys } from "../services/pokemon.service";

export const usePokemon = (pokemonId: string) => {
  const service = new PokemonService();

  return useQuery({
    enabled: !!pokemonId,
    queryKey: queryKeys.pokemon(pokemonId),
    queryFn: () => service.getPokemonById(Number(pokemonId)),
  });
};
