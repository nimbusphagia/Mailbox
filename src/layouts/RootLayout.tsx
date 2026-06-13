import type { PropsWithChildren } from "react"

type Props = {
}

export function RootLayout({ children }: PropsWithChildren<Props>) {
  return (
    <div className="w-screen h-screen grid grid-rows-[1fr] overflow-hidden">
      {children}
    </div >
  )
}
