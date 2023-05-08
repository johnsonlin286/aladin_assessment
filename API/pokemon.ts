import axios from "axios";

export const fetchPokemon = async (offset: number, limit: number) => {
  try {
    console.log("FUCK");
    // https://pokeapi.co/api/v2/pokemon?offset=20&limit=20
    const result = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
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
  await Promise.all(promise).then((result) => {
    result.map((item) =>
      pokemons.push({
        id: item.data.id,
        name: item.data.name,
        sprite: item.data.sprites.front_default,
      })
    );
  });
  return pokemons;
};

export const fetchDetail = async (id: number) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(({ data }) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
