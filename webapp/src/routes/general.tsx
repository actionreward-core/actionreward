import { RouteObject } from "react-router-dom";
import { PATHS } from "../consts/paths";

// Pages
import { IndexPage } from "../pages/Index";
import { AppIndexPage } from "../pages/app/Index";
import { AppLoginPage } from "../pages/app/Login.tsx";
import { AppSignupPage } from "../pages/app/Signup.tsx";
import { AppProjectsCreate } from "../pages/app/projects/ProjectsCreate.tsx";
import { ProjectsIndex } from "../pages/app/projects/Index.tsx";

export const general: RouteObject[] = [
  // ROUTES - START
  {
    path: PATHS.index,
    element: <IndexPage />,
  },
  {
    path: PATHS.app,
    element: <AppIndexPage />,
  },
  {
    path: PATHS.appLogin,
    element: <AppLoginPage />,
  },
  {
    path: PATHS.appSignup,
    element: <AppSignupPage />,
  },
  {
    path: "/app/projects",
    element: <ProjectsIndex />,
  },
  {
    path: "/app/projects/create",
    element: <AppProjectsCreate />,
  },
  {
    path: PATHS.app,
    element: <AppIndexPage />,
  },
  // ROUTES - END
];