import type { PropsWithChildren } from "react";

export function ColorCard({ children }: PropsWithChildren) {
  return (
    <div
      className="bg-bg4/80 size-fit min-w-[550px] min-h-[300px] 
          rounded-sm shadow-md shadow-fg0 flex flex-col justify-center m-auto
          p-5"
    >
      {children}
    </div>
  )

}
