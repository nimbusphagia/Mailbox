import { formatDate } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
type Props = {
  date: Date,
  name: string,
  color: string,
  facing: "right" | "left"
}
export function NameTag({ date, name, color, facing }: Props) {
  return (
    <>
      {facing === "right" ?
        <>
          <span className="text-[0.72em] text-bg4 ">
            {formatDate(new Date(date))}
          </span>

          <div className="flex gap-1 items-center">
            <ChevronLeft className={`size-[1.1em] ${color} m-0`} />
            <span className={`${color} font-bold text-[1.1em]`}>
              {name}
            </span>
          </div>
        </> :
        <>
          <div className="flex gap-1 items-center">
            <span className={`${color} font-bold text-[1.1em]`}>
              {name}
            </span>
            <ChevronRight className={`size-[1.1em] ${color} m-0`} />
          </div>
          <span className="text-[0.72em] text-bg4 ">
            {formatDate(new Date(date))}
          </span>
        </>
      }
    </>
  )
}
