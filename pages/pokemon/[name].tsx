import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import { fetchDetail } from "../../API/pokemon";
import Layout from "../../components/Layout";
import Image from "next/image";
import { Icon } from '@iconify/react';
import loadingIcon from '@iconify/icons-eos-icons/loading';
import PillType from "../../components/PillType";

type DataType = {
  id: number,
  name: string,
  sprite: string,
  weight: string,
  height: string,
  types: string[],
  abilities: string[]
}

type DescGroupType = {
  label: string,
  value: string
}

type DescTypesType = {
  types: string[]
}

const DescriptionItem: React.FC<DescGroupType> = ({ label, value }) => {
  return (
    <div className="w-full md:w-6/12 lg:w-4/12">
      <h5 className="text-xs mb-2">{label}</h5>
      <p className="text-lg font-medium">{value}</p>
    </div>
  )
}

const DescriptionType: React.FC<DescTypesType> = ({ types }) => {
  return (
    <div className="w-full md:w-6/12 lg:w-4/12">
      <h5 className="text-xs mb-3">Type</h5>
      {
        types && types.map(type => <PillType value={type} className="mr-2" />)
      }
    </div>
  )
}

const PokemonPage = () => {
  const router = useRouter();
  const pokemonName = useMemo(() => {
    if (router.query.name) return router.query.name;
  }, [router]);
  const [data, setData] = useState<DataType>();
  const [loading, setLoading] = useState(true);

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
                <div className="bg-white flex flex-wrap flex-1 rounded-lg shadow-lg p-4 mt-6 md:mt-0 md:ml-6">
                  <DescriptionItem label="Height" value={data.height} />
                  <DescriptionItem label="Weight" value={data.weight} />
                  <DescriptionItem label="Abilities" value={data.abilities.join(', ')} />
                  <DescriptionType types={data.types} />
                </div>
              </div>
              <button className="fixed w-28 h-28 bottom-10 left-1/2 -translate-x-1/2 bg-white rounded-full transition-all shadow-lg active:shadow active:scale-95" title="CATCH!">
                <Image src={'/images/pokeball.png'} alt="pokeball" width={112} height={112} />
              </button>
            </div>
          )
        }
      </div>
    </Layout>
  );
}

export default PokemonPage;