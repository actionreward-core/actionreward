import { Dialog, Transition } from "@headlessui/react";
import { Cog6ToothIcon, HomeIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { FC, Fragment, useEffect } from "react";
import Logo from "../../assets/logo.png";
import classNames from "classnames";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowPathRoundedSquareIcon,
  BoltIcon,
  Cog8ToothIcon,
  DocumentTextIcon,
  TrophyIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Project } from "../../types/project";
import { getCIDLink } from "../../utils/web3Storage";

export interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  project: Project;
}

const AutomationIcon = (props: any) => {
  return (
    <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 256 256"
  >
    <path d="M247.96 80.792c-.01.107-.031.21-.046.317-.02.153-.04.306-.07.457-.024.125-.059.247-.09.37-.032.13-.061.26-.1.39-.037.12-.082.237-.124.355-.046.129-.089.258-.14.384-.046.108-.098.211-.148.317-.061.132-.12.265-.19.393-.051.098-.111.19-.167.284-.076.13-.15.261-.236.388-.066.098-.14.191-.21.286-.084.115-.165.231-.256.342-.116.141-.242.274-.367.406-.054.059-.102.12-.159.176l-40 40a8 8 0 01-11.314-11.314L220.687 88H176a40.046 40.046 0 00-40 40 56.063 56.063 0 01-56 56h-.907a36 36 0 110-16H80a40.046 40.046 0 0040-40 56.063 56.063 0 0156-56h44.687l-26.344-26.343a8 8 0 0111.314-11.314l40 40c.057.056.105.117.159.176.125.132.25.265.367.406.091.11.171.227.255.342.07.095.145.188.211.286.085.127.16.258.236.388.056.095.115.186.167.284.07.129.129.261.19.393.05.106.102.21.147.317.052.127.095.255.14.384.043.119.088.235.125.355.039.13.068.26.1.39.031.124.066.245.09.37.03.151.05.304.07.457.015.106.035.21.046.317a8.023 8.023 0 010 1.584z"></path>
  </svg>
  )
}

const generalNavigation = [
  {
    name: "Dashboard",
    path: "/app",
    icon: HomeIcon,
  },
  {
    name: "Triggered Actions",
    path: "/app/actions",
    icon: BoltIcon,
  },
  {
    name: "Users",
    path: "/app/users",
    icon: UsersIcon,
  },
];

const setupNavigation = [
  {
    name: "Action Schemas",
    path: "/app/schemas",
    icon: DocumentTextIcon,
  },
  {
    name: "Rewards",
    path: "/app/rewards",
    icon: TrophyIcon,
  },
  {
    name: "Automations",
    path: "/app/automations",
    icon: AutomationIcon,
  },
  {
    name: "Project Settings",
    path: "/app/settings",
    icon: Cog8ToothIcon,
  },
];

export const Sidebar: FC<SidebarProps> = ({ open, setOpen, project }) => {
  const { pathname } = useLocation();
  const renderLink =  (item: any) => (
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
  );
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
                    <img src={getCIDLink(project.logo)} />
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
          <div className="p-4 pb-2">
            <label className="text-xs font-semibold text-gray-500">LIVE DATA</label>
          </div>
          <nav className="px-2 space-y-1">
            {generalNavigation.map(renderLink)}
          </nav>
          <div className="p-4 pb-2 mt-2">
            <label className="text-xs font-semibold text-gray-500">SETUP</label>
          </div>
          <nav className="px-2 space-y-1">
            {setupNavigation.map(renderLink)}
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
