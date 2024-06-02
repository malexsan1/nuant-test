import { PokemonClient } from "pokenode-ts";

export const queryKeys = {
  listPokemons: () => ["list-pokemons"],
  listTypes: () => ["list-types"],
};

export class PokemonService {
  client: PokemonClient;

  constructor() {
    this.client = new PokemonClient();
  }

  // - due to the way PokeAPI is designed, it only accepts limit and offset as parameters
  // - by default it returns a list of 20 pokemons
  // - the result is pretty minimal, it only returns the name of the pokemon and a link to get the pokemon's details
  // - I will fetch 200 pokemons and their details only once and do the pagination/filtering on the frontend on the already fetched data
  // - this request will be pretty heavy at first, but i will only run it once
  async listAllPokemons() {
    const pokemonResults = await this.client
      .listPokemons(undefined, 200)
      .then((r) => r.results);

    const pokemonDetails = await Promise.all(
      pokemonResults.map((p) => this.client.getPokemonByName(p.name))
    );

    return pokemonDetails;
  }

  async getTypes() {
    return this.client
      .listTypes(undefined, 25)
      .then((response) => response.results);
  }

  async getPokemonById(id: number) {
    return this.client.getPokemonById(id);
  }
}
