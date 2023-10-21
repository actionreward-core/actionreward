import { RouteObject } from "react-router-dom";
import { PATHS } from "../consts/paths";

// Pages
import { IndexPage } from "../pages/Index";
import { AppIndexPage } from "../pages/app/Index";
import { AppLoginPage } from "../pages/app/Login.tsx";
import { AppSignupPage } from "../pages/app/Signup.tsx";
import { AppProjectsCreate } from "../pages/app/projects/ProjectsCreate.tsx";
import { ProjectsIndex } from "../pages/app/projects/Index.tsx";
import { ProjectSettingsPage } from "../pages/app/ProjectSettings.tsx";
import { SchemasIndex } from "../pages/app/schemas/Index.tsx";
import { SchemasCreatePage } from "../pages/app/schemas/SchemasCreate.tsx";

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
  {
    path: '/app/settings',
    element: <ProjectSettingsPage />
  },
  {
    path: '/app/schemas',
    element: <SchemasIndex />
  },
  {
    path: '/app/schemas/create',
    element: <SchemasCreatePage />
  },
  // ROUTES - END
];