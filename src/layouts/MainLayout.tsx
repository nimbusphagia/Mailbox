import type { PropsWithChildren } from "react";

type MainLayoutProps = {
  className?: string,
}

export function MainLayout({ children, className }: PropsWithChildren<MainLayoutProps>) {
  return (
    <div className="w-screen h-screen grid grid-rows-[1fr] overflow-hidden">
      <div className={`bg-fg1 relative overflow-hidden ${className}`}>
        {children}
      </div>
    </div>
  );
}
