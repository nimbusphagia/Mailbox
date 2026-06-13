import type { PropsWithChildren, ReactNode } from "react";

type MainLayoutProps = {
  aside: ReactNode,
  main: ReactNode,
  className: string,
}

export function MainLayout({ aside, main, children, className }: PropsWithChildren<MainLayoutProps>) {
  return (
    <div className={`bg-fg1 relative overflow-hidden ${className}`}>
      {aside}
      {main}
      {children}
    </div>
  );
}
