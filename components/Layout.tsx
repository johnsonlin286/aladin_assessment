import { ReactNode } from 'react'
import Head from 'next/head'
import { Inter } from '@next/font/google'
import HeaderNav from './HeaderNav'

const inter = Inter({ subsets: ['latin'] })

type Props = {
  title?: string,
  children: ReactNode
}

const Layout: React.FC<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{`Pokemon ${title ? `- ${title}` : ''}`}</title>
      </Head>
      <main className={`${inter.className} pt-[95px]`}>
        <HeaderNav />
        {children}
      </main>
    </>
  );
}

export default Layout;