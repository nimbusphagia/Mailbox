import type { PropsWithChildren } from "react";

export function Modal({ children }: PropsWithChildren) {

  return (
    <div
      className="absolute z-2 top-0 left-0 size-full bg-fg0/10 backdrop-blur-xs flex items-center justify-center "
    >
      {children}
    </div>
  )
}
