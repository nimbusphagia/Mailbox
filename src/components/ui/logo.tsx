import logo from "@/assets/logo.txt?raw"

export function Logo() {
  return (
    <pre className="text-[0.7em] text-bg2 font-black leading-tight overflow-x-auto">
      {logo}
    </pre>
  )
}
