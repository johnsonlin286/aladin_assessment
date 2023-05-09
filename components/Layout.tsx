import { ReactNode, useContext } from 'react'
import Head from 'next/head'
import { Inter } from '@next/font/google'
import HeaderNav from './HeaderNav'
import { ToastContext } from '../stores/context/toastContext'
import Toast from './Toast'

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
      <main data-testid="layout" className={`${inter.className} relative pt-[95px]`}>
        <HeaderNav />
        <Toast />
        {children}
      </main>
    </>
  );
}

export default Layout;