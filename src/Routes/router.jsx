import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Story from "../Pages/AboutUs/AboutChild/Story";
import Mission from "../Pages/AboutUs/AboutChild/Mission";
import Success from "../Pages/AboutUs/AboutChild/Success";
import Teams_others from "../Pages/AboutUs/AboutChild/Teams_others";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivetRouter from "../privetRouter/PrivetRouter";
import BeARider from "../Pages/BeARider/BeARider";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayout from "../Layout/DashboardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <p>Loading...</p>,
    hydrateFallbackElement: <p>Loading..</p>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "be_a_rider",
        element: (
          <PrivetRouter>
            <BeARider></BeARider>
          </PrivetRouter>
        ),
      },
      {
        path: "send_a_parcel",
        loader: () => fetch("/servicesCenter.json").then((res) => res.json()),
        element: (
          <PrivetRouter>
            <SendParcel></SendParcel>
          </PrivetRouter>
        ),
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
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivetRouter>
        <DashboardLayout></DashboardLayout>
      </PrivetRouter>
    ),
    children: [
      {
        path: "my-parcels",
        Component: MyParcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
    ],
  },
]);

export default router; 
