import type { PropsWithChildren, ReactNode } from "react";

type MainLayoutProps = {
  aside: ReactNode,
  main: ReactNode,
}

export function MainLayout({ aside, main, children }: PropsWithChildren<MainLayoutProps>) {
  return (
    <div className="bg-bg2 grid grid-cols-[25vw_1fr] relative overflow-hidden">
      {aside}
      {main}
      {children}
    </div>
  );
}
