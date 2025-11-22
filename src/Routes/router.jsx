import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("/servicesCenter.json").then((res) => res.json()),
      },
    ],
  },
]);

export default router;
