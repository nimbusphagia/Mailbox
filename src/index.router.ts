import { createBrowserRouter } from "react-router-dom";
import { ErrorComponent } from "./components/Error/Error";
import { Home } from "./pages/Home/Home";
import { LoginPage } from "./pages/Login/Login";
import { LoginAction } from "./pages/Login/Login.action";
import { SignupPage } from "./pages/Signup/Signup";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
    action: LoginAction,
  },
  {
    path: "/signup",
    Component: SignupPage,
  },
  {
    path: "/",
    Component: Home,
    ErrorBoundary: ErrorComponent,
  },
]);
