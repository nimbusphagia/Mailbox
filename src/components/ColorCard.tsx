import type { PropsWithChildren } from "react";

export function ColorCard({ children }: PropsWithChildren) {
  return (
    <div
      className="relative bg-fg4/93 size-fit min-w-[550px] min-h-[300px] rounded-sm flex flex-col justify-center m-auto
          px-5 py-2"
    >
      {children}
    </div>
  )

}
