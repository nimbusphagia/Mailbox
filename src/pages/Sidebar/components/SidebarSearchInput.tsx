type Props = {
  query: string,
  onChange: (value: string) => void,
}

export function SidebarSearchInput({ query, onChange }: Props) {
  return (
    <div className="flex items-center justify-center">
      <input
        placeholder="search"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        className="bg-fg2 py-1.5 px-3 text-bg1 text-xs font-normal 
        w-full outline-none border-fg4 border-[1px] focus:bg-fg4/70 
        focus:placeholder:text-bg1 focus:text-bg1 rounded-sm"
      />
    </div>
  )
}
