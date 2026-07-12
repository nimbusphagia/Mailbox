export function LoadingBar() {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50 overflow-hidden">
      <style>{`
        @keyframes loading-bar-slide {
          0% { left: -40%; width: 40%; }
          50% { width: 60%; }
          100% { left: 100%; width: 40%; }
        }
        .loading-bar-anim {
          animation: loading-bar-slide 1.2s ease-in-out infinite;
        }
      `}</style>
      <div className="absolute h-full bg-yellow rounded-full loading-bar-anim" />
    </div>
  );
}
