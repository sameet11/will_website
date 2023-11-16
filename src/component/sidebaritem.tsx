import { IconType } from "react-icons/lib";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
interface SidebarItemProps{
    icon:IconType,
    label:string,
    active:boolean,
    href:string,
}
const SidebarItem: React.FC<SidebarItemProps> = ({
    icon: Icon,
    label,
    active,
    href
  }) => {
    return ( 
      <Link
        href={href} 
        className={twMerge(`
          flex 
          flex-row 
          h-auto 
          items-center 
          w-full 
          gap-x-4 
          text-md 
          font-medium
          cursor-pointer
          transition
          sidebar-link
          text-white
          py-1`,
          active && "border-b-2"
          )
        }
      >
        <Icon size={26} />
        <p className="truncate w-100">{label}</p>
      </Link>
     );
  }
  
  export default SidebarItem;