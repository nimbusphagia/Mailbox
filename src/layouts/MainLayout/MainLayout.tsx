import type { ReactNode } from "react";

type MainLayoutProps = {
  aside: ReactNode,
  main: ReactNode,
}

export function MainLayout({ aside, main }: MainLayoutProps) {
  return (
    <div>
      {aside}
      {main}
    </div>
  );
}
