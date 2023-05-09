import Image from "next/image";

type Props = {
  onClick?: () => void
}

const PokeballBtn: React.FC<Props> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="fixed w-28 h-28 bottom-10 left-1/2 -translate-x-1/2 bg-white rounded-full transition-all shadow-lg active:shadow active:scale-95" title="CATCH!">
      <Image src={'/images/pokeball.png'} alt="pokeball" width={112} height={112} />
    </button>
  );
}

export default PokeballBtn;