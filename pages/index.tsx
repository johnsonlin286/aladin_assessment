import { useEffect, useMemo, useRef, useState } from "react"

import { fetchPokemon } from "../API/pokemon";
import Layout from "../components/Layout"
import ListItem from "../components/ListItem";
import { Icon } from '@iconify/react';
import loadingIcon from '@iconify/icons-eos-icons/loading';

const enviroment = process.env.ENVIROMENT;

type DataType = {
  id: number,
  name: string,
  sprite: string,
}

export default function Home() {
  const isMounted = useRef(false);
  const offset = useRef(0);
  const [data, setData] = useState<Array<DataType>>([]);
  const [showPagination, setShowPagination] = useState(false);
  const observerOptions = useMemo(() => {
    return {
      treshold: 1,
      rootMargin: '0px 0px 0px 0px'
    }
  }, []);

  useEffect(() => {
    // page mounted
    if (enviroment === 'development' && !isMounted.current) {
      isMounted.current = true;
      return;
    };
    if (data.length <= 0) {
      fetchData();
    }
  }, [isMounted]);

  const fetchData = async () => {
    if (data.length > 150) {
      return;
    }
    setShowPagination(false);
    const result: any = await fetchPokemon(offset.current, 30);
    if (result.length > 0) {
      setData(prev => [...prev, ...result]);
      offset.current += result.length;
      setShowPagination(true);
    }
  }

  useEffect(() => {
    const paginationElm = document.querySelector('#pagination');
    if (!paginationElm) return;
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fetchData();
        }
      })
    }, observerOptions);

    observer.observe(paginationElm);

    return () => observer.unobserve(paginationElm);
  }, [showPagination]);

  return (
    <Layout title="Home Page">
      <div className="home-page container flex flex-col justify-center items-center">
        {
          data.length > 0 && (
            <>
              <div className="flex flex-wrap">
                {
                  data.map(item => (
                    <div key={item.id} className="p-1 w-full md:w-4/12 lg:w-2/12">
                      <ListItem id={item.id} name={item.name} sprite={item.sprite} />
                    </div>
                  ))
                }
              </div>

            </>
          )
        }
        {
          showPagination ? <div id="pagination" className="w-full h-6" /> : <Icon icon={loadingIcon} className="w-8 h-8 text-red-400 my-6" />
        }
      </div>
    </Layout>
  )
}
