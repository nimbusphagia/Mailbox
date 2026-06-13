import { randomFromRange } from "@/lib/utils";
import { useFiglet } from "@/pages/Hooks/useFiglet";
import { useMemo } from "react";

type Props = {
  className?: string,
}
export function LogoRandom({ className }: Props) {
  const styles = ["Chiseled", "DiamFont", "Flower Power", "Merlin1"]
  const random = useMemo(() => randomFromRange(0, styles.length - 1), []);
  const { ascii } = useFiglet("MailBox", { font: styles[random] });
  return (
    <pre
      className={`max-w-fit select-none text-[10px]  
      text-fg0 font-black leading-none
      ${className}`}>
      {ascii}
    </pre>

  )
}
