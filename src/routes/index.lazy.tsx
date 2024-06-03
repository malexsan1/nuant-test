import React, { useMemo } from "react";

import {
  useSearch,
  useNavigate,
  createLazyFileRoute,
} from "@tanstack/react-router";

import { PokemonTypeDropdown, PokemonList } from "../components";
import { usePokemons } from "../hooks";

export const Route = createLazyFileRoute("/")({
  component: PokemonsHome,
});

function PokemonsHome() {
  const { data: pokemons = [], isLoading } = usePokemons();

  const navigate = useNavigate();
  const { searchInput = "", type = "" } = useSearch({
    from: "/",
  }) as { searchInput: string; type: string };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    navigate({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      search: (prev: any) => {
        return {
          ...prev,
          page: 1,
          searchInput: e.target.value,
        };
      },
    });
  };

  const onChangeType = (type: string) => {
    navigate({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      search: (prev: any) => {
        return {
          ...prev,
          page: 1,
          type,
        };
      },
    });
  };

  const filteredPokemon = useMemo(() => {
    const filtered = pokemons.filter((p) => {
      return p.name.toLowerCase().includes(searchInput.toLowerCase());
    });

    if (type !== "") {
      return filtered.filter((p) => {
        const pokemonTypes = p.types.map((t) => t.type.name);
        return pokemonTypes.includes(type);
      });
    }
    return filtered;
  }, [searchInput, pokemons, type]);

  return (
    <div className="lg:max-w-[60vw] flex flex-col gap-4 mx-auto py-8">
      <div className="flex gap-4">
        <input
          onChange={onChangeName}
          value={searchInput}
          placeholder="Search pokemon"
          className="flex-1 px-2 rounded-md"
        />
        <PokemonTypeDropdown value={type} onChange={onChangeType} />
      </div>

      {isLoading ? (
        <span className="self-center mt-12">Loading pokemons...</span>
      ) : (
        <PokemonList pokemons={filteredPokemon} />
      )}
    </div>
  );
}
