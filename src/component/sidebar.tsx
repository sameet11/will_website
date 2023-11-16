import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { FaBriefcase } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import SidebarItem from "./sidebaritem";

const Sidebar = () => {
  const pathname = usePathname(); 

  const routes = useMemo(() => [
    {
      icon: FaBriefcase,
      label: "Dashboard",
      active: pathname !== "/main/profile",
      href: "/main",
    },
    {
      icon: FaUser,
      label: "Profile",
      active: pathname === "/main/profile",
      href: "/main/profile",
    },
  ], [pathname]);
  return (
    <div className=" hidden md:flex md:gap-y-2 py-4 h-screen md:shadow-md md:w-1/6 bg-gradient-to-b from-amber-600 to-amber-800">
                <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </div>
  );
};

export default Sidebar;