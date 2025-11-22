import { Outdent } from "lucide-react";
import React from "react";
import { NavLink, Outlet } from "react-router";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="bg-white p-10 rounded-2xl">
      <h1 className="font-bold text-3xl mb-2">About Us</h1>
      <p className="w-8/12 font-medium">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>
      <hr className="mt-5" />
      <div>
        {/* navbar */}
        <div className="mt-10">
          <nav>
            <ul className="flex   pb-2">
              <li>
                <NavLink
                  to="/about_us/story"
                  className={({ isActive }) =>
                    `pr-6 py-1 font-bold transition-colors ${
                      isActive
                        ? "text-secondary "
                        : "text-gray-300  hover:text-primary"
                    }`
                  }
                >
                  Story
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about_us/mission"
                  className={({ isActive }) =>
                    `pr-6  py-1 font-bold transition-colors ${
                      isActive
                        ? "text-secondary"
                        : "text-gray-300  hover:text-primary"
                    }`
                  }
                >
                  Mission
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about_us/success"
                  className={({ isActive }) =>
                    `pr-6 py-1 font-bold transition-colors ${
                      isActive
                        ? "text-secondary "
                        : " text-gray-300 hover:text-primary"
                    }`
                  }
                >
                  Success
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about_us/teams_and_others"
                  className={({ isActive }) =>
                    `pr-6  py-1 font-bold transition-colors ${
                      isActive
                        ? "text-secondary"
                        : "text-gray-300 hover:text-primary"
                    }`
                  }
                >
                  Teams & Others
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-5 ">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
