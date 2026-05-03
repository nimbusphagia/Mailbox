
type Props = {
  title: string,
}
export function Title({ title }: Props) {
  return (
    <div className="bg-fg3 w-fit m-auto px-[1rem] py-[0.2rem] rounded-xs">
      <h1
        className="text-2xl font-bold text-bg4"
      >{title}</h1>
    </div>
  )
}
