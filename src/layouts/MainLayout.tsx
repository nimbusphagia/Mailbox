import { LoadingBar } from "@/components/LoadingBar";
import type { PropsWithChildren } from "react";

type MainLayoutProps = {
  isLoading?: boolean,
  className?: string,
}

export function MainLayout({ children, isLoading, className }: PropsWithChildren<MainLayoutProps>) {
  return (
    <div className="w-screen h-screen grid grid-rows-[1fr] overflow-hidden">
      {isLoading && <LoadingBar />}
      <div className={`bg-fg1 relative overflow-hidden ${className}`}>
        {children}
      </div>
    </div>
  );
}
