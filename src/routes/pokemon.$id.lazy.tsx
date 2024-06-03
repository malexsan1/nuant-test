import { capitalize } from "lodash";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import {
  IconArrowLeft,
  IconHeart,
  IconSword,
  IconShield,
} from "@tabler/icons-react";

import { usePokemon } from "../hooks";

export const Route = createLazyFileRoute("/pokemon/$id")({
  component: PokemonDetails,
});

function PokemonDetails() {
  const { id: pokemonId } = Route.useParams();

  const { data: pokemon } = usePokemon(pokemonId);

  if (!pokemon) {
    return <div>Pokemon not found.</div>;
  }

  const abilities = pokemon.abilities
    .map((a) => capitalize(a.ability.name))
    .join(", ");
  const types = pokemon.types.map((t) => capitalize(t.type.name)).join(", ");

  return (
    <div className="lg:max-w-[50vw] flex flex-col gap-8 mx-auto py-8">
      <Link to="/" className="flex gap-2">
        <IconArrowLeft size={24} />
        Back
      </Link>
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">{capitalize(pokemon.name)}</h1>
          <div>
            <h2 className="font-semibold">Abilities:</h2>
            <span>{abilities}</span>
          </div>
          <div>
            <h2 className="font-semibold">Types:</h2>
            <span>{types}</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="avatar">
            <div className="w-40 rounded-md">
              <img src={pokemon.sprites.front_default as string} />
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex gap-2">
              <IconHeart size={24} />
              <span className="text-md">{pokemon.stats[0].base_stat} HP</span>
            </div>
            <div className="flex gap-2">
              <IconSword size={24} />
              <div className="text-md">{pokemon.stats[1].base_stat} Attack</div>
            </div>
            <div className="flex gap-2">
              <IconShield size={24} />
              <div className="text-md">
                {pokemon.stats[2].base_stat} Defense
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
