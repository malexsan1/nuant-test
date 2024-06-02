import { capitalize } from "lodash";
import { Pokemon } from "pokenode-ts";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";

export interface PokemonListProps {
  pokemons: Pokemon[];
}

const PER_PAGE = 20;

export const PokemonList: React.FC<PokemonListProps> = ({ pokemons = [] }) => {
  const { page = 1 } = useSearch({ strict: false });
  const navigate = useNavigate({ from: "/" });

  const hasPagination = pokemons.length > PER_PAGE;
  const totalPages = Math.ceil(pokemons.length / PER_PAGE);

  const goToNextPage = () => {
    navigate({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      search: (prev: any) => {
        return prev.page
          ? { ...prev, page: Math.min(totalPages, page + 1) }
          : { ...prev, page: 1 };
      },
    });
  };

  const goToPrevPage = () => {
    navigate({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      search: (prev: any) => {
        return prev.page
          ? { ...prev, page: Math.max(1, page - 1) }
          : { ...prev, page: 1 };
      },
    });
  };

  return (
    <div className="flex flex-col gap-2 pt-4">
      {hasPagination && (
        <div className="join self-center">
          <button className="join-item btn" onClick={goToPrevPage}>
            «
          </button>
          <button className="join-item btn">
            Page {page} / {totalPages}
          </button>
          <button className="join-item btn" onClick={goToNextPage}>
            »
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4 p-4">
        {pokemons
          .slice((page - 1) * PER_PAGE, page * PER_PAGE)
          .map((pokemon) => {
            const pokemonTypes = pokemon.types
              .map((t) => capitalize(t.type.name))
              .join(", ");

            return (
              <Link
                key={pokemon.id}
                to={`/pokemon/${pokemon.id}`}
                className="flex items-center p-2 gap-4 border rounded-md hover:bg-zinc-600"
              >
                <div className="avatar">
                  <div className="w-30 aspect-square rouded">
                    <img src={pokemon.sprites.front_default as string} />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <h4 className="font-bold text-lg">
                    {capitalize(pokemon.name)}
                  </h4>

                  <div className="flex gap-2">
                    <h5 className="font-semibold">Types:</h5>
                    <span className="">{pokemonTypes}</span>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};
