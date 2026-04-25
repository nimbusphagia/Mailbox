import { createBrowserRouter } from "react-router-dom";
import { ErrorComponent } from "./components/Error/Error";
import { Home } from "./pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    ErrorBoundary: ErrorComponent,
  },
]);
