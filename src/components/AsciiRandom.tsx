import { randomFromRange } from "@/lib/utils";
import { useFiglet } from "@/pages/Hooks/useFiglet";
import { useEffect, useMemo, useRef } from "react";

type Props = {
  text: string,
  className?: string,
  containerCN?: string,
}
export function AsciiRandom({ text, className, containerCN }: Props) {
  const styles = ["Chiseled", "DiamFont", "Flower Power", "Patorjk's Cheese", "Lil Devil", "Shaded Blocky", "Slant Relief", "Small Isometric1", "Sweet", "Sub-Zero", "Train", "Varsity", "Wet Letter", "ANSI Shadow", "Bloody", "Delta Corps Priest 1", "Elite", "Stronger Than All", "Rebel", "Bolger", "Caligraphy2"]
  const random = useMemo(() => randomFromRange(0, styles.length - 1), [])


  const { ascii, loading } = useFiglet(text, { font: styles[random] })
  const containerRef = useRef<HTMLDivElement>(null)
  const preRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    if (loading || !containerRef.current || !preRef.current) return
    const container = containerRef.current
    const pre = preRef.current

    const fit = () => {
      pre.style.fontSize = "100px";
      const scaleX = container.clientWidth / pre.scrollWidth
      const scaleY = container.clientHeight / pre.scrollHeight
      const scale = Math.min(scaleX, scaleY, 1)
      pre.style.fontSize = `${100 * scale}px`
    }

    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(container)
    return () => observer.disconnect()
  }, [loading, ascii])

  return (
    <div ref={containerRef} className={`w-full h-full flex items-center justify-center overflow-hidden ${containerCN}`}>
      <pre
        ref={preRef}
        className={`select-none text-[10px] text-fg0 font-black leading-none ${className}`}
      >
        {loading ? "01001101 01100001 01101001 01101100 01000010 01111000" : ascii}
      </pre>
    </div>
  )
}
