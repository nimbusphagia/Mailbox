
type Props = {
  title: string,
}
export function Title({ title }: Props) {
  return (
    <h1
      className="text-2xl font-bold text-zinc-900"
    >{title}</h1>
  )
}
