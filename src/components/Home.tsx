import { useEffect, useState, useRef} from "react";
import { PokemonList, PokemonData } from "../utils/getPokeData";
import Card from "./Card";
import { Pokemon } from "pokeapi-js-wrapper";
// gsap for animation
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const Home = () => {
  const [pokemonList, setPokemonList] = useState<{name:string, url:string}[]>([]);
  const [pokemonData, setPokemonData] = useState<any[]>([]);
  const [showData, setShowData] = useState<any[]>([]);
  const [showFilteredData, setShowFilteredData] = useState<any[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>();
  // const [pokemonDataArr, setPokemonDataArr] = useState<Pokemon[]>([]);
  const [isLocalStorageFilled, setIsLocalStorageFilled] = useState<boolean>(false);

  const container = useRef();

  useEffect(() => {
    let localLocalData = JSON.parse(localStorage.getItem("pokeData"));
    console.log("is storage filled with data", localLocalData != null);
    
    setIsLoading(true);
    
    async function fetchData() {
      // console.log("inside fetchData");
     if(localLocalData == null){
        const localList = await PokemonList();

        const fetchPokemonData = async ()=>{
          const promise = localList.results.map(async pokemon=>{
              const tempItem = await PokemonData(pokemon.name);
             return tempItem;
           })
          
          const result = await Promise.all(promise);
          localStorage.setItem("pokeData", JSON.stringify(result));

          // get the data from localStorage
          localLocalData = JSON.parse(localStorage.getItem("pokeData"));
          setShowData(localLocalData);
          console.log("aa gya data", localLocalData);
         window.location.reload(); 
        }
        fetchPokemonData();
        setIsLoading(false);
      } 
    }

    fetchData();

     // if localStorage is filled get the data
     setShowData(localLocalData);
    setShowFilteredData(localLocalData);
      // console.log("localto page", localLocalData, "filterd data", showFilteredData);
    
     setIsLoading(false);

    return () => {
      setPokemonList([]);
      setPokemonData([]);
      setShowData([]);
      // setPokemonDataArr([]);
    }
  }, [])

  //   console.log("fetch after feth", pokemonDataArr.length == 20);
  // if(pokemonDataArr.length == 20){
  //   localStorage.setItem("pokeData", JSON.stringify(pokemonDataArr));
  // }

    // console.log("last fetched", pokemonDataArr);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    let newValue = e.target.value;
    setInput(newValue);

    setIsLoading(true);
    setTimeout(() => {
       setShowFilteredData(showData.filter(item => item.name.includes(newValue.toLowerCase()))); 
        setIsLoading(false);
    }, 900);
    // setShowFilteredData(showData.filter(item => item.name.includes(newValue.toLowerCase()))); 
     // console.log("filtered", showFilteredData);
     // console.log("show data", showData, input);
   
    // setShowFilteredData(JSON.parse(localStorage.getItem("pokeData")).filter(item => item.name.includes(input.toLowerCase()))); 
    // clearTimeout(timer);
  }

   // if (isLoading) return <div className="">Loading...</div>;
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

      <div ref={container} className="flex flex-wrap gap-4 justify-center items-center my-4">
        {isLoading || !showFilteredData ? <h1 className="text-2xl p-4 font-semibold">Loading...</h1> :
        showFilteredData.map((pokemon) => {
          return (
            <div key={pokemon.name}>
              {<Card
                name={pokemon.name}
                hp={pokemon.stats[0].base_stat}
                spAttack={pokemon.stats[1].base_stat}
                spDefence={pokemon.stats[2].base_stat}
                spSpeed={pokemon.stats[3].base_stat}
                image={pokemon.sprites.other.dream_world.front_default}
                id={pokemon.id}
              /> }
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
