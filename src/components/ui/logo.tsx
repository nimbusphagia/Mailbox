import logo from "@/assets/logoASCII/logo3.txt?raw"

type Props = {
  className?: string
}
export function Logo({ className = "text-[0.8em]" }: Props) {
  return (
    <pre className={` text-center text-fg0 font-black leading-tight overflow-x-auto ${className}`}>
      {logo}
    </pre>
  )
}
