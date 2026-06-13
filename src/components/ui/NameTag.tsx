type Props = {
  name: string,
  style: string,
}
export function NameTag({ name, style }: Props) {
  return (
    <>
      <div className="flex gap-2 items-center">
        <div className="flex items-center justify-center">
          <span className={`${style} font-semibold text-sm underline decoration-[0.1em] `}>
            {name}
          </span>
        </div>
      </div>
    </>
  )
}
