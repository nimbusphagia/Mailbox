import type { PropsWithChildren } from "react"
import { Link } from "react-router-dom"

type Props = {
  route: string,
  message?: string,
  redirect?: string,
}
export function RootLayout({ children, route, message = "", redirect }: PropsWithChildren<Props>) {
  return (
    <div className="w-screen h-screen grid grid-rows-[1fr_25px] overflow-hidden">
      {children}
      <footer className="bg-bg4 w-full h-full flex justify-between">
        <div className="bg-fg2 w-20 h-full font-semibold flex items-center justify-center">
          <p className="uppercase">{route}</p>
        </div>
        <div className="text-fg2 text-sm font-semibold flex items-center justify-center px-3">
          {redirect &&
            <Link to={redirect} className="hover:text-fg0">{message}</Link>}
        </div>
      </footer>
    </div>
  )
}
