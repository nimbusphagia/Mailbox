import { ScrollRestoration, Outlet } from "react-router-dom"

export default function RootLayout() {
  return (
    <div
    >
      <ScrollRestoration getKey={(location) => location.state?.key ?? location.pathname} />
      <Outlet />
    </div>
  )
}

