import { RouteObject } from "react-router-dom";
import { PATHS } from "../consts/paths";

// Pages
import { IndexPage } from "../pages/Index";

export const general: RouteObject[] = [
  // ROUTES - START
  {
    path: PATHS.index,
    element: <IndexPage />,
  },
  // ROUTES - END
];