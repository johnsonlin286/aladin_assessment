import { useMemo } from "react";

type Props = {
  value: string,
  className?: string,
}

const PillType: React.FC<Props> = ({ value, className }) => {
  const name = useMemo(() => {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }, [value]);
  const color = useMemo(() => {
    switch (value) {
      case "grass":
        return 'bg-green-400 text-white';
      case "fire":
        return 'bg-red-400 text-white';
      case "water":
        return 'bg-blue-400 text-white';
      case "electric":
        return 'bg-yellow-400 text-white';
      case "ground":
        return 'bg-yellow-800 text-white';
      case "rock":
        return 'bg-stone-300 text-white'
      case "poison":
        return 'bg-purple-300 text-white';
      case "bug":
        return 'bg-green-800 text-white';
      case "flying":
        return 'bg-sky-400 text-white';
      case "fighting":
        return 'bg-red-800 text-white';
      case "psychic":
        return 'bg-purple-800 text-white';
      case "dragon":
        return "bg-blue-800 text-white";
      case "fairy":
        return "bg-pink-400 text-white";
      case "steel":
        return "bg-slate-300 text-white";
      case "ice":
        return "bg-cyan-300 text-white";
      case "ghost":
        return "bg-violet-800 text-white";
      default:
        return "bg-white text-black";
    }
  }, [value])

  return (
    <span className={`rounded-full text-center text-sm shadow py-2 px-6 ${color} ${className || ''}`}>{name}</span>
  );
}

export default PillType;