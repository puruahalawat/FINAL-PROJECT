import React from "react";
import { HiUsers } from "react-icons/hi";
import { Link } from "react-router-dom";
import { cn } from "../utils";
import { SiGoogleclassroom } from "react-icons/si";

const SidebarItems = [
  {
    label: "Dashboard",
    value: "dashboard",
    icon: (
      <svg
        className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
      </svg>
    ),
  },
  {
    label: "Members",
    value: "members",
    icon: (
      <HiUsers className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" />
    ),
  },
  {
    label: "Classes",
    value: "classes",
    icon: (
      <SiGoogleclassroom className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" />
    ),
  },
];

const Sidebar = ({ active }) => {
  return (
    <aside
      id="sidebar"
      className="flex flex-shrink-0 flex-col w-60 transition-width duration-75"
      aria-label="Sidebar"
    >
      <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 pt-0">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex-1 px-3 divide-y space-y-1">
            <ul className="space-y-2 pb-2">
              <li></li>
              {SidebarItems.map((sidebarItem) => (
                <li key={sidebarItem.value}>
                  <Link
                    to={
                      sidebarItem.value === "dashboard"
                        ? "/app"
                        : "/app/" + sidebarItem.value
                    }
                    className={cn(
                      "text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group",
                      active === sidebarItem.value ? "bg-gray-100" : ""
                    )}
                  >
                    {sidebarItem.icon}
                    <span className="ml-3 flex-1 whitespace-nowrap">
                      {sidebarItem.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
