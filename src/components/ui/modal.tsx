import type { PropsWithChildren } from "react";

export function Modal({ children }: PropsWithChildren) {
  return (
    <div
      className="bg-bg4 py-6 px-10  w-full max-w-fit text-fg1 flex flex-col gap-5"
    >
      {children}
    </div>
  )
}
