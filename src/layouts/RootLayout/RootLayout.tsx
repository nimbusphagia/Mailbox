import type { PropsWithChildren } from "react"
import { Link } from "react-router-dom"

type RedLink = {
  message: string,
  src: string,
}
export type FMessage = {
  message: string,
  color?: "red" | "blue" | "green" | "purple" | "black",
}
type Props = {
  route: string,
  color: string,
  right?: FMessage,
  rLink?: RedLink,
  left?: FMessage,
}
const bgMap: Record<string, string> = {
  red: "bg-red-dark/70",
  blue: "bg-blue-dark/70",
  green: "bg-green-dark/70",
  purple: "bg-purple-dark/70",
  black: "bg-fg0/70",
};
const colorMap: Record<string, string> = {
  red: "text-red-dark/65",
  blue: "text-blue-dark/65",
  green: "text-green-dark/65",
  purple: "text-purple-dark/65",
  black: "text-fg0/65",
};
export function RootLayout({ children, route, color, right, rLink, left }: PropsWithChildren<Props>) {
  return (
    <div className="w-screen h-screen grid grid-rows-[1fr_25px] overflow-hidden">
      {children}
      <footer className="bg-bg4 w-full h-full flex justify-between">
        <div className="flex-1 flex justify-start items-center font-semibold gap-3">
          <div className={`${bgMap[color]} text-bg3 w-20 h-full  flex items-center justify-center`}>
            <p className="uppercase">{route}</p>
          </div>
          <div className={`flex-1 justify-self-center ${colorMap[left?.color ?? "black"]} text-[0.8em]`}>
            <p className=" w-fit">{left?.message}</p>
          </div>
        </div>
        <div className="text-fg2 text-[0.85em] font-semibold flex items-center justify-center px-3">
          <p>
            {right?.message}
            {rLink &&
              <Link
                to={rLink.src}
                className="underline decoration-2"
              >{rLink.message}
              </Link>}
          </p>
        </div>
      </footer>
    </div >
  )
}
