import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { LoginPage } from "./pages/Login/Login";
import { LoginAction } from "./pages/Login/Login.action";
import { SignupPage } from "./pages/Signup/Signup";
import { SignupAction } from "./pages/Signup/SignupAction";
import { HomeLoader } from "./pages/Home/Home.loader";
import { HomeAction } from "./pages/Home/Home.action";
import { HomeError } from "./pages/Home/HomeError";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
    action: LoginAction,
  },
  {
    path: "/signup",
    Component: SignupPage,
    action: SignupAction,
  },
  {
    path: "/",
    Component: Home,
    loader: HomeLoader,
    action: HomeAction,
    ErrorBoundary: HomeError,
  },
]);
