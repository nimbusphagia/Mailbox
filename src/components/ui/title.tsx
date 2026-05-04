
type Props = {
  title: string,
}
export function Title({ title }: Props) {
  return (
    <div className="w-fit m-auto px-[1rem] py-[0.2rem]">
      <h1
        className="text-2xl font-bold "
      >{title}</h1>
    </div>
  )
}
