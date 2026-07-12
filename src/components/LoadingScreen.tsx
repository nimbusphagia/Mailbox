
type Props = {
  className?: string
}
export function LoadingScreen({ className }: Props) {
  return (
    <div className={`inset-0 z-50 flex items-center justify-center bg-black ${className}`}>
      <style>{`
        @keyframes flash {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.15; }
        }
        .flash-anim {
          animation: flash 0.6s steps(1, end) infinite;
        }
      `}</style>
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-white flash-anim" />
        <span className="text-white text-sm tracking-widest uppercase flash-anim">
          Loading
        </span>
      </div>
    </div>
  );
}
