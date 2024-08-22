import { Pokedex } from "pokeapi-js-wrapper";

const P = new Pokedex();

const PokemonList = async () => {
    const pokemonList = await P.getPokemonsList({ limit: 20, offset: 0 });
    return pokemonList;
}

const PokemonData = async (name: string) => {
    const pokemonData = await P.getPokemonByName(name);
    return pokemonData;
}
export { PokemonList, PokemonData }