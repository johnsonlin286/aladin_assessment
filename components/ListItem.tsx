import Image from "next/image";
import Link from "next/link";

type Props = {
  id: number,
  name: string,
  sprite: string,
  className?: string,
}

const ListItem: React.FC<Props> = ({ id, name, sprite, className }) => {
  return (
    <Link href={`/pokemon/${name}`} className={`bg-white rounded-lg shadow-lg p-6 flex flex-col items-center hover:bg-red-200 ${className || ''}`}>
      <Image src={sprite} alt={name} width={120} height={120} />
      <h3 className="mt-3 text-lg font-bold">{name}</h3>
    </Link>
  );
}

export default ListItem;