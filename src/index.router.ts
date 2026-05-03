import { createBrowserRouter } from "react-router-dom";
import { ErrorComponent } from "./components/Error/Error";
import { Home } from "./pages/Home/Home";
import { LoginPage } from "./pages/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/",
    Component: Home,
    ErrorBoundary: ErrorComponent,
  },
]);
