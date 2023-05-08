import Image from "next/image";
import Link from "next/link";

const HeaderNav = () => {
  return (
    <header className="fixed w-full top-0 left-0 bg-red-500 py-4">
      <div className="container flex items-center">
        <Link href={"/"}>
          <Image src={'/images/logo.png'} alt="LOGO" width={60} height={60} />
        </Link>
        <nav className="ml-8">
          <ul className="flex list-none">
            <li>
              <Link href={"/#"} className="text-lg font-bold text-yellow-300">
                My Pokémons
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default HeaderNav;