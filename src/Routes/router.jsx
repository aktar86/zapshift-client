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
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../Pages/Dashboard/Payment/PaymentCancel";
import PaymentHistry from "../Pages/Dashboard/PaymentHistry/PaymentHistry";
import ApproveRider from "../Pages/Dashboard/ApproveRider/ApproveRider";
import UserManagement from "../Pages/Dashboard/UserManagement/UserManagement";
import AdminRoute from "../privetRouter/AdminRoute";
import AssignRiders from "../Pages/Dashboard/AssignRiders/AssignRiders";

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
        loader: () => fetch("/servicesCenter.json").then((res) => res.json()),
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
        path: "/dashboard/approve-riders",
        // Component: ApproveRider,
        element: (
          <AdminRoute>
            <ApproveRider></ApproveRider>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/user-management",
        element: (
          <AdminRoute>
            <UserManagement></UserManagement>
          </AdminRoute>
        ),
        // Component: UserManagement,
      },
      {
        path: "/dashboard/assign-riders",
        element: (
          <AdminRoute>
            <AssignRiders></AssignRiders>
          </AdminRoute>
        ),
        // Component: UserManagement,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancel,
      },
      {
        path: "payment-history",
        Component: PaymentHistry,
      },
    ],
  },
]);

export default router;
