import { useEffect, useState } from "react";
import { PokemonList, PokemonData } from "../utils/getPokeData";
import Card from "./Card";

const Home = () => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation: Data has large amount of fields>
	const [showData, setShowData] = useState<any[]>([]);
	// biome-ignore lint/suspicious/noExplicitAny: <explanation: Data has large amount of fields>
	const [showFilteredData, setShowFilteredData] = useState<any[]>([]);
	const [input, setInput] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>();

	useEffect(() => {
		let localLocalData = JSON.parse(localStorage.getItem("pokeData") || "[]");
		console.log("is storage filled with data", localLocalData != null);

		setIsLoading(true);

		async function fetchData() {
			// console.log("inside fetchData");
			if (localLocalData == null || localLocalData.length < 1) {
				const localList = await PokemonList();

				const fetchPokemonData = async () => {
					const promise = localList.results.map(async (pokemon) => {
						const tempItem = await PokemonData(pokemon.name);
						return tempItem;
					});

					const result = await Promise.all(promise);
					localStorage.setItem("pokeData", JSON.stringify(result));

					// get the data from localStorage
					localLocalData = JSON.parse(localStorage.getItem("pokeData") || "[]");
					setShowData(localLocalData);
					window.location.reload();
				};
				fetchPokemonData();
				setIsLoading(false);
			}
		}

		fetchData();
		setShowData(localLocalData);
		setShowFilteredData(localLocalData);
		setIsLoading(false);

		return () => {
			setShowData([]);
		};
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setInput(e.target.value);

		// console.log("hi from change input","targated val" +  e.target.value);
		setTimeout(() => {
			setIsLoading(false);
			setShowFilteredData(
				showData.filter((item) => item.name.includes(newValue.toLowerCase())),
			);
		}, 300);
		setIsLoading(true);
	};
	return (
		<>
			<input
				type="text"
				name="search"
				id=""
				placeholder="Search Pokemon"
				className="flex justify-center w-3/4 font-base md:font-medium md:w-1/3 mx-auto border-2 border-gray-400 rounded-xl px-3 py-2 md:p-3 mt-4 mb-8 focus:outline-none text-black "
				value={input}
				onChange={handleChange}
			/>
			<div className="flex flex-wrap gap-6 justify-center items-center my-4 text-white">
				{isLoading || showFilteredData.length < 1 ? (
					<h1 className="text-2xl p-4 font-semibold">Loading...</h1>
				) : (
					showFilteredData.map((pokemon) => {
						return (
							<div
								className={"w-11/12 md:w-fit rounded-md card bg-[#ffffff1a]"}
								key={pokemon.name}
							>
								{
									<Card
										name={pokemon.name}
										hp={pokemon.stats[0].base_stat}
										spAttack={pokemon.stats[1].base_stat}
										spDefence={pokemon.stats[2].base_stat}
										spSpeed={pokemon.stats[3].base_stat}
										image={pokemon.sprites.other.dream_world.front_default}
										id={pokemon.id}
									/>
								}
							</div>
						);
					})
				)}
			</div>
		</>
	);
};

export default Home;
