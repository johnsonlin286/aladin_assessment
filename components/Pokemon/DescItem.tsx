type Props = {
  label: string,
  value: string
}

const DescriptionItem: React.FC<Props> = ({ label, value }) => {
  return (
    <div className="w-full md:w-6/12 lg:w-4/12">
      <h5 className="text-xs mb-2">{label}</h5>
      <p className="text-lg font-medium">{value}</p>
    </div>
  )
}

export default DescriptionItem;