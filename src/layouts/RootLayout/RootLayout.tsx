import type { PropsWithChildren } from "react"

type Props = {
  route: string,
}
export function RootLayout({ children, route }: PropsWithChildren<Props>) {
  return (
    <div className="w-screen h-screen grid grid-rows-[1fr_25px] overflow-hidden">
      {children}
      <footer className="bg-bg4 ">
        <div className="bg-fg2 w-20 h-full flex items-center justify-center">
          <p className="uppercase">{route}</p>
        </div>
      </footer>
    </div>
  )
}
