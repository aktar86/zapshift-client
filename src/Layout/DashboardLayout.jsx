import {
  CreditCardIcon,
  Home,
  Menu,
  Motorbike,
  Settings,
  Truck,
} from "lucide-react";
import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { FaUsers } from "react-icons/fa";
import useRole from "../hook/useRole";
// import { MdOutlineElectricBike } from "react-icons/md";
import { RiEBikeLine } from "react-icons/ri";

const DashboardLayout = () => {
  const { role } = useRole();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn"
          >
            {/* Sidebar toggle icon */}
            <Menu></Menu>
          </label>
          <div className="px-4 font-bold">Navbar Title</div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
        {/* <div className="p-4">Page Content</div> */}
      </div>

      {/* sidebar */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <Home></Home>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* List item */}
            <li>
              <NavLink
                to="/dashboard/my-parcels"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Parcels"
              >
                {/* icon */}
                <Truck></Truck>
                <span className="is-drawer-close:hidden">My Parcels</span>
              </NavLink>
            </li>

            {role === "admin" && (
              <>
                {/* Approve Riders */}
                <li>
                  <NavLink
                    to="/dashboard/approve-riders"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Approve Riders"
                  >
                    {/* icon */}
                    <Motorbike></Motorbike>
                    <span className="is-drawer-close:hidden">
                      Approve Riders
                    </span>
                  </NavLink>
                </li>

                {/* Assign Riders */}
                <li>
                  <NavLink
                    to="/dashboard/assign-riders"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Assign Riders"
                  >
                    {/* icon */}
                    <RiEBikeLine />
                    <span className="is-drawer-close:hidden">
                      Assign Riders
                    </span>
                  </NavLink>
                </li>

                {/* Users Management */}
                <li>
                  <NavLink
                    to="/dashboard/user-management"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Users Management"
                  >
                    {/* icon */}
                    <FaUsers />
                    <span className="is-drawer-close:hidden">
                      Users Management
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {/* List item */}
            <li>
              <NavLink
                to="/dashboard/payment-history"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* icon */}
                <CreditCardIcon></CreditCardIcon>
                <span className="is-drawer-close:hidden">Payment History</span>
              </NavLink>
            </li>
            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <Settings></Settings>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
