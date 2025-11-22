import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Story from "../Pages/AboutUs/AboutChild/Story";
import Mission from "../Pages/AboutUs/AboutChild/Mission";
import Success from "../Pages/AboutUs/AboutChild/Success";
import Teams_others from "../Pages/AboutUs/AboutChild/Teams_others";

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
      {
        path: "about_us",
        Component: AboutUs,
        children: [
          {
            path: "/about_us/story",
            Component: Story,
          },
          {
            path: "/about_us/mission",
            Component: Mission,
          },
          {
            path: "/about_us/success",
            Component: Success,
          },
          {
            path: "/about_us/teams_and_others",
            Component: Teams_others,
          },
        ],
      },
    ],
  },
]);

export default router;
