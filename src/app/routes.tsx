import { createBrowserRouter } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { SearchRoute } from "./pages/SearchRoute";
import { RouteResults } from "./pages/RouteResults";
import { RouteDetail } from "./pages/RouteDetail";
import { RealTimeTracking } from "./pages/RealTimeTracking";
import { Profile } from "./pages/Profile";
import { Favorites } from "./pages/Favorites";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: "/search",
    Component: SearchRoute,
  },
  {
    path: "/routes",
    Component: RouteResults,
  },
  {
    path: "/route/:id",
    Component: RouteDetail,
  },
  {
    path: "/tracking/:id",
    Component: RealTimeTracking,
  },
  {
    path: "/favorites",
    Component: Favorites,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);