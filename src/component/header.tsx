import React from "react";

import {signIn} from "next-auth/react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-amber-600 to-amber-800 text-white">
      <div className="py-4 text-center shadow-md">
        <ul className="flex justify-end space-x-6 mr-6">
          <li>
            <a href="#features" className="nav-link">Features</a>
          </li>
          <li>
            <a href="#testimonials" className="nav-link">Testimonials</a>
          </li>
          <li>
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 w-24 h-8 rounded-full transform hover:scale-105 transition">
              <button className="pt-1"  onClick={()=>{
                signIn(undefined,{callbackUrl:'/main'});
              }}
              >Sign In</button>
            </div>
          </li>
        </ul>
      </div>
      <div className="py-20 text-center">
        <h1 className="text-4xl font-bold">Create Your Will Today</h1>
        <p className="mt-4 text-lg">Protect your loved ones with a legal will.</p>
      </div>
    </header>
  );
};

export default Header;


