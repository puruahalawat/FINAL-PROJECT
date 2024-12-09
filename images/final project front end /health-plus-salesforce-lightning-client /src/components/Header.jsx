import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { TbLogout } from "react-icons/tb";
import { cn } from "../utils";

const actions = [
  {
    label: "Logout",
    value: "logout",
    icon: <TbLogout fontSize="1.125em" className="mr-3" />,
  },
];

const Header = ({ isAuth, fromAuth, onLogout, userRole, isAuthenticated }) => {
  const onAction = (action) => {
    if (action === "logout") {
      onLogout();
    }
  };

  return (
    <header className={cn(fromAuth ? "" : "border-slate-200/80 border-b h-24")}>
      <div className={cn("items-center w-full h-full flex mx-auto px-10 py-6")}>
        <nav className="justify-between items-center w-full flex z-50 relative">
          <div className="items-center flex flex-shrink-0">
            <Link
              aria-label="Home"
              className="items-center flex flex-shrink-0"
              href="/"
            >
              <div className="logo">Health Plus+</div>
            </Link>
          </div>
          {!fromAuth && (
            <>
              {isAuth ? (
                <div className="flex items-center gap-5">
                  <span className="user-role text-lg">
                    <b>Role:</b> <span className="capitalize">{userRole}</span>
                  </span>
                  <Popover className="relative">
                    {({ close }) => (
                      <>
                        <PopoverButton
                          className={`
               inline-flex items-center outline-none popover-button text-gray-500 font-medium text-sm leading-5 text-center px-2 py-2 rounded-lg cursor-pointer hover:text-gray-900`}
                        >
                          <div className="flex items-center space-x-6">
                            <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer relative inline-block">
                              <img src={"/avatar.svg"} alt="avatar" />
                            </div>
                          </div>
                        </PopoverButton>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-x-1"
                          enterTo="opacity-100 translate-x-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-x-0"
                          leaveTo="opacity-0 translate-x-1"
                        >
                          <PopoverPanel className="absolute right-0 transform px-4 sm:px-0 shadow-md text-base leading-6 bg-white rounded list-none my-4 z-50 max-w-44 w-screen">
                            <ul
                              className="divide-y divide-gray-200"
                              role="none"
                            >
                              {actions.map((action) => (
                                <li
                                  key={action.value}
                                  className="hover:bg-gray-100 cursor-pointer py-3 px-4"
                                  onClick={() => onAction(action.value)}
                                >
                                  <div className="flex items-center">
                                    {action.icon}
                                    <span
                                      className="block text-gray-800 text-sm leading-5"
                                      role="menuitem"
                                    >
                                      {action.label}
                                    </span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </PopoverPanel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </div>
              ) : (
                <div className="flex items-center space-x-6">
                  <Link
                    className="transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] ring-opacity-100 ring-[#F1F5F9] font-semibold text-lg leading-[1.5rem] py-3 px-7 bg-primary rounded-full gap-2.5 items-center justify-center inline-flex"
                    to={isAuthenticated ? "/app" : "/login"}
                  >
                    Login
                  </Link>
                </div>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
