import PillType from "../../components/PillType";

type Props = {
  types: string[]
}

const DescriptionType: React.FC<Props> = ({ types }) => {
  return (
    <div className="w-full md:w-6/12 lg:w-4/12">
      <h5 className="text-xs mb-3">Type</h5>
      {
        types && types.map((type, i) => <PillType key={i} value={type} className="mr-2" />)
      }
    </div>
  )
}

export default DescriptionType;