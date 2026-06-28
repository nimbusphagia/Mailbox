import { SidebarSearchInput } from "@/pages/Sidebar/components/SidebarSearchInput"
import type { PropsWithChildren } from "react"

type Props = {
  query: string,
  onChange: (value: string) => void,
  className?: string,
  search?: boolean
}
export function SidebarMainLayout({ query, onChange, className, search = true, children }: PropsWithChildren<Props>) {
  return (
    <div
      className={`flex-1 flex flex-col *:rounded-sm *:m-2 ${className}`}
    >
      {search &&
        <SidebarSearchInput
          query={query}
          onChange={onChange}

        />
      }
      <div className="h-full text-center overflow-y-scroll 
          bg-fg2 border-fg4 border-[1px] py-1 px-0.5
          [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {
          children
        }
      </div>
    </div>
  )
}
