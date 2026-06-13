import { randomFromRange } from "@/lib/utils";
import { useFiglet } from "@/pages/Hooks/useFiglet";
import { useMemo } from "react";

type Props = {
  className?: string,
}
export function LogoRandom({ className }: Props) {
  const styles = ["Chiseled", "DiamFont", "Flower Power", "Patorjk's Cheese", "Lil Devil", "Patorjk-HeX", "Shaded Blocky", "Slant Relief", "Small Isometric1", "Sweet", "Sub-Zero", "Train", "Varsity", "Wet Letter", "ANSI Shadow", "Bloody", "Delta Corps Priest 1", "Elite", "Stronger Than All", "Rebel", "Bolger", "Caligraphy2"]
  const random = useMemo(() => randomFromRange(0, styles.length - 1), []);
  const { ascii, loading } = useFiglet("MailBox", { font: styles[random] });
  return (
    <pre
      className={`max-w-fit min-h-[50px] select-none text-[10px]  
      text-fg0 font-black leading-none flex items-center
      ${className}`}>
      {loading ? "01001101 01100001 01101001 01101100 01000010 01101111 01111000 " : ascii}
    </pre>

  )
}
