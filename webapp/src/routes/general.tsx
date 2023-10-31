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
import { RewardPage } from "../pages/Reward.tsx";
import { RewardsIndex } from "../pages/app/rewards/Index.tsx";
import { RewardsCreatePage } from "../pages/app/rewards/RewardsCreate.tsx";
import { ActionsIndex } from "../pages/app/actions/Index.tsx";
import { UsersIndex } from "../pages/app/users/Index.tsx";

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
  {
    path: '/app/actions',
    element: <ActionsIndex />
  },
  {
    path: '/app/users',
    element: <UsersIndex />
  },
  {
    path: '/app/rewards',
    element: <RewardsIndex />
  },
  {
    path: '/app/rewards/create',
    element: <RewardsCreatePage />
  },
  {
    path: '/rewards/:rewardId',
    element: <RewardPage />
  },
  // ROUTES - END
];