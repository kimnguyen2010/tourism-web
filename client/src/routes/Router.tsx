import { useRoutes } from "react-router-dom";
import { routes } from "./route-config";

export default function Router(): React.ReactElement | null {
  return useRoutes(routes);
}
