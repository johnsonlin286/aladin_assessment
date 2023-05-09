import { useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { inventoryAction } from "../../stores/redux/inventory";

import { fetchDetail } from "../../API/pokemon";
import Layout from "../../components/Layout";
import Image from "next/image";
import { Icon } from '@iconify/react';
import loadingIcon from '@iconify/icons-eos-icons/loading';
import DescriptionItem from "../../components/Pokemon/DescItem";
import DescriptionType from "../../components/Pokemon/DescType";
import PokeballBtn from "../../components/Pokemon/PokeballBtn";
import { ToastContext } from "../../stores/context/toastContext";

type DataType = {
  id: number,
  name: string,
  sprite: string,
  weight: string,
  height: string,
  types: string[],
  abilities: string[]
}

const PokemonPage = () => {
  const router = useRouter();
  const { updateToast } = useContext(ToastContext);
  const pokemonName = useMemo(() => {
    if (router.query.name) return router.query.name;
  }, [router]);
  const [data, setData] = useState<DataType>();
  const [loading, setLoading] = useState(true);
  const { pokemons } = useSelector((state: any) => state.inventory);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await fetchDetail(`${pokemonName}`);
      setData(() => (
        {
          id: result.id,
          name: result.name,
          sprite: result.sprites.front_default,
          weight: `${result.weight} lbs`,
          height: `${result.height}"`,
          types: result.types.map((item: any) => item.type.name),
          abilities: result.abilities.map((item: any) => item.ability.name),
        }
      ));
      setLoading(false);
    }
    if (pokemonName) {
      fetchData();
    }
  }, [pokemonName]);

  const catchPokemon = () => {
    if (pokemons.length >= 6) {
      updateToast({ color: 'danger', message: 'No more space for new Pokémon!' });
      return;
    }
    const payload = {
      id: data?.id,
      name: data?.name,
      sprite: data?.sprite
    }
    dispatch(inventoryAction.catchPokemon(payload));
    updateToast({ color: 'success', message: 'Pokémon Catched!' });
  }

  return (
    <Layout title={`${pokemonName}`}>
      <div className="pokemon-page container">
        {
          loading && <div className="flex justify-center items-center"><Icon icon={loadingIcon} className="w-8 h-8 text-red-400 my-6" /></div>
        }
        {
          data && (
            <div className="my-8">
              <h1 className="text-4xl font-semibold text-center capitalize mb-8">{`#${data.id} ${data.name}`}</h1>
              <div className="flex flex-col md:flex-row justify-center items-center md:items-start">
                <div className="relative w-[300px] h-[300px] md:w-[200px] md:h-[200px]">
                  <Image src={data.sprite} alt={data.name} fill className="relative w-full h-full object-contain bg-slate-300 rounded-lg" />
                </div>
                <div className="bg-white w-full max-w-3xl flex flex-wrap flex-1 gap-y-2 rounded-lg shadow-lg p-4 mt-6 md:mt-0 md:ml-6">
                  <DescriptionItem label="Height" value={data.height} />
                  <DescriptionItem label="Weight" value={data.weight} />
                  <DescriptionItem label="Abilities" value={data.abilities.join(', ')} />
                  <DescriptionType types={data.types} />
                </div>
              </div>
              <PokeballBtn onClick={catchPokemon} />
            </div>
          )
        }
      </div>
    </Layout>
  );
}

export default PokemonPage;