import { useEffect, useState } from "react";
import { PokemonList, PokemonData } from "../utils/getPokeData";
import Card from "./Card";
import { Pokemon } from "pokeapi-js-wrapper";
const Home = () => {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [pokemonData, setPokemonData] = useState<any[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isLocalStorageFilled = localStorage.getItem("pokemonData");

  const pokemonDataArr: Pokemon[] = [];

  const getPokemonList = async () => {
    const response = await PokemonList();
    setPokemonList(response.results);
  };

  const getPokemonData = async (name: string) => {
    const response = await PokemonData(name);
    setPokemonData((prev) => [...prev, response]);
    return response;
  };
  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      if (!isLocalStorageFilled) {
        getPokemonList();
        for (let i = 0; i < pokemonList.length; i++) {
          const pokeData = getPokemonData(pokemonList[i].name);
          pokemonDataArr.push(await pokeData);
        }
        localStorage.setItem("pokemonData", JSON.stringify(pokemonDataArr));
        setIsLoading(false);
      } else {
        const storedData = localStorage.getItem("pokemonData");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setPokemonData(parsedData);
        }
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);

    if (localStorage.getItem("pokemonData")) {
      const storedData = localStorage.getItem("pokemonData");
      if (storedData) {
        const parsedData = JSON.parse(storedData) as Pokemon[];
        setPokemonData(
          parsedData.filter((pokemon) => pokemon.name.includes(input))
        );
      }
    }

    if (input == "" || !input) {
      setPokemonData(pokemonData);
    }
    console.log(input);
  };

  if (isLoading) return <>Loading...</>;
  return (
    <>
      <input
        type="text"
        name="search"
        id=""
        placeholder="Search Pokemon"
        className="flex justify-center w-3/4 md:w-1/2 mx-auto border-2 border-gray-400 rounded-md p-2 my-4"
        value={input}
        onChange={handleChange}
      />

      <div className="flex flex-wrap gap-4 justify-center items-center my-4">
        {pokemonData.map((pokemon) => {
          return (
            <div key={pokemon.name}>
              <Card
                name={pokemon.name}
                hp={pokemon.stats[0].base_stat}
                spAttack={pokemon.stats[1].base_stat}
                spDefence={pokemon.stats[2].base_stat}
                spSpeed={pokemon.stats[3].base_stat}
                image={pokemon.sprites.other.dream_world.front_default}
                id={pokemon.id}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
