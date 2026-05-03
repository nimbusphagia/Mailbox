import type { PropsWithChildren } from "react";

export function Modal({ children }: PropsWithChildren) {
  return (
    <div
      className="bg-bg4 py-6 px-10 rounded-xs w-full max-w-sm"
    >
      {children}
    </div>
  )
}
