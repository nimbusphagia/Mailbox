import welcome from "@/assets/ASCII/welcome.txt?raw"

type Props = {
  className?: string,
}
export function Welcome({ className = "text-[0.5em]  text-fg0" }: Props) {
  return (
    <pre className={` text-center font-black leading-tight overflow-x-auto ${className}`}>
      {welcome}
    </pre>
  )
}

