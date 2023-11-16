import Sidebar from "~/component/sidebar";
import UserProfile from "~/component/userProfile";
import { signOut } from "next-auth/react";
const profile=()=>{
return (
  <div>
  <div className="py-4 text-center shadow-md">
    <div className='font-bold text-left text-2xl p-2 flex justify-between'>
      <h1>Will Maker</h1>
      <div className="hidden md:block md:bg-gradient-to-r from-yellow-400 to-yellow-600 md:w-28 md:h-8 md:rounded-full md:transform hover:scale-105 md:transition md:text-center md:text-lg">
            <button onClick={()=>{
              signOut({callbackUrl:'/'});
            }}
            >Sign Out</button>
          </div>
    </div>
    </div>
    <div className='flex'>
    <Sidebar/>
    <UserProfile/>
    </div>
    </div>
    )
}
export default profile;