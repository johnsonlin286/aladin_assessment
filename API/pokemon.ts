import axios from "axios";

export const fetchPokemon = async (offset: number, limit: number) => {
  try {
    const newLimit = offset < 150 ? 30 : 1;
    const result = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${newLimit}`
    );
    if (result?.data?.results?.length > 0) {
      const pokemons = await fetchImage(result.data.results);
      return pokemons;
    }
  } catch (error) {
    console.error(error);
  }
};

const fetchImage = async (data: { name: string; url: string }[]) => {
  const promise = [];
  for (let i = 0; i < data.length; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${data[i].name}`;
    promise.push(axios.get(url));
  }
  const pokemons: { id: number; name: string; sprite: string }[] = [];
  return await Promise.all(promise)
    .then((result) => {
      result.map((item) =>
        pokemons.push({
          id: item.data.id,
          name: item.data.name,
          sprite: item.data.sprites.front_default,
        })
      );
      return pokemons;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchDetail = async (name: string) => {
  try {
    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};
