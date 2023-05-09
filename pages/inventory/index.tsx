import { useSelector } from "react-redux";

import Layout from "../../components/Layout";
import ListItem from "../../components/ListItem";


const InventoryPage = () => {
  const { pokemons } = useSelector((state: any) => state.inventory);

  return (
    <Layout>
      <div className="inventory-page container my-8">
        <h1 className="text-4xl font-bold mb-8">My Pokémon</h1>
        {
          pokemons.length > 0 ? (
            <div className="flex flex-wrap">
              {
                pokemons.map((pokemon: { id: number, name: string, sprite: string }, i: number) => (
                  <div key={i} className="p-1 w-full md:w-6/12 lg:w-4/12">
                    <ListItem id={pokemon.id} name={pokemon.name} sprite={pokemon.sprite} />
                  </div>
                ))
              }
            </div>
          ) : <p className="text-center mt-8">You don't have any Pokémon yet....</p>
        }
      </div>
    </Layout>
  );
}

export default InventoryPage;