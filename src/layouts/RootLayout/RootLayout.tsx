import type { PropsWithChildren } from "react"
import { Link } from "react-router-dom"

type RedLink = {
  message: string,
  src: string,
}
type Props = {
  route: string,
  footerMessage?: string,
  footerLink?: RedLink,
}
export function RootLayout({ children, route, footerMessage = "", footerLink }: PropsWithChildren<Props>) {
  return (
    <div className="w-screen h-screen grid grid-rows-[1fr_25px] overflow-hidden">
      {children}
      <footer className="bg-bg4 w-full h-full flex justify-between">
        <div className="bg-fg2 w-20 h-full font-semibold flex items-center justify-center">
          <p className="uppercase">{route}</p>
        </div>
        <div className="text-fg2/80 text-[0.85em] font-semibold flex items-center justify-center px-3">
          <p>
            {footerMessage}
            {footerLink &&
              <Link
                to={footerLink.src}
                className="text-blue-dark/70 underline decoration-2 hover:text-blue-dark"
              >{footerLink.message}
              </Link>}
          </p>
        </div>
      </footer>
    </div >
  )
}
