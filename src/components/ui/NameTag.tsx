type Props = {
  name: string,
  style: string,
}
export function NameTag({ name, style }: Props) {
  return (
    <>
      <div className="flex gap-2 items-center">
        <div className="flex items-center justify-center">
          <span className={`${style} font-bold text-[1.1em] p-0 m-0 underline decoration-2 `}>
            {name}
          </span>
        </div>
      </div>
    </>
  )
}
