import type { PropsWithChildren } from "react";

type Props = {
  className?: string,
}
export function Modal({ className, children }: PropsWithChildren<Props>) {

  return (
    <div
      className={`absolute z-2 top-0 left-0 size-full bg-fg0/10 backdrop-blur-xs flex items-center justify-center ${className}`}
    >
      {children}
    </div>
  )
}
