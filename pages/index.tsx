import { useEffect, useRef, useState } from "react"
import Layout from "../components/Layout"


export default function Home() {
  const isMounted = useRef(true);
  const [data, setData] = useState();

  useEffect(() => {
    if (isMounted) console.log('render');
  }, [isMounted]);

  return (
    <Layout title="Home Page">
      <div className="home-page container">

      </div>
    </Layout>
  )
}
