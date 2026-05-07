import type { PropsWithChildren } from "react";

export function Modal({ children }: PropsWithChildren) {

  return (
    <div
      className="absolute top-0 left-0 size-full bg-fg0/30 flex items-center justify-center "
    >
      {children}
    </div>
  )
}
