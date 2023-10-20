import { Dialog, Transition } from "@headlessui/react";
import { Cog6ToothIcon, HomeIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { FC, Fragment, useEffect } from "react";
import Logo from "../../assets/logo.png";
import classNames from "classnames";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowPathRoundedSquareIcon,
  BoltIcon,
  DocumentTextIcon,
  TrophyIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Project } from "../../types/project";

export interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  project: Project;
}

const navigation = [
  {
    name: "Dashboard",
    path: "/app",
    icon: HomeIcon,
  },
  {
    name: "Schemas",
    path: "/app/schemas",
    icon: DocumentTextIcon,
  },
  {
    name: "Rewards",
    path: "/app/rewards",
    icon: TrophyIcon,
  },
  {
    name: "Actions",
    path: "/app/actions",
    icon: BoltIcon,
  },
  {
    name: "Users",
    path: "/app/users",
    icon: UsersIcon,
  },
  {
    name: "Settings",
    path: "/app/settings",
    icon: Cog6ToothIcon,
  },
];

export const Sidebar: FC<SidebarProps> = ({ open, setOpen, project }) => {
  const { pathname } = useLocation();
  const renderMenuContent = () => {
    return (
      <>
        <div className="flex-1 h-0 pt-5 pb-4">
          <div className="flex-shrink-0 flex items-center px-4">
            <img className="h-9 w-auto" src={Logo} alt="Workflow" />
          </div>
          <div className="flex items-center p-4 border-y mt-4 justify-between">
            <div className="flex items-center overflow-hidden">
              <div>
                <div className="avatar mr-3 p-[4px]">
                  <div className="w-8 rounded ring-gray-300 ring-2 ring-offset-base-100 ring-offset-1">
                    <img src="https://placehold.co/400" />
                  </div>
                </div>
              </div>
              <div className="overflow-hidden w-full">
                <div className="truncate" title={project.name}>{project.name}</div>
              </div>
            </div>
            <div className="tooltip tooltip-right ml-2" data-tip="Change Project">
              <Link className="btn btn-xs" to="/app/projects">
                <ArrowPathRoundedSquareIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <nav className="mt-5 px-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={classNames(
                  "group flex items-center px-2 py-2 text-base font-medium rounded-md",
                  item.path === pathname
                    ? "text-primary bg-gray-100"
                    : "text-gray-400 hover:bg-gray-100/80 hover:text-primary hover:opacity-70"
                )}
              >
                <item.icon
                  className="mr-4 flex-shrink-0 h-6 w-6"
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-t-gray-200 p-4 text-white">
          TODO: Add User Info
        </div>
      </>
    );
  };
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 flex z-40 md:hidden"
          open={open}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity npm runease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              {renderMenuContent()}
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" />
        </Dialog>
      </Transition.Root>

      <div className="hidden md:flex md:flex-shrink-0 border-r border-r-gray-200">
        <div className="flex flex-col w-72">
          <div className="flex flex-col h-0 flex-1 bg-white">
            {renderMenuContent()}
          </div>
        </div>
      </div>
    </>
  );
};
