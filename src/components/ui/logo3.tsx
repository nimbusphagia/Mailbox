import logo from "@/assets/logoASCII/logo2.txt?raw"

type Props = {
  className?: string
}
export function LogoVar2({ className = "text-[0.8em]  text-fg0" }: Props) {
  return (
    <pre className={` text-center font-black leading-tight overflow-x-auto ${className}`}>
      {logo}
    </pre>
  )
}

