import React from 'react';
import Sidebar from '~/component/sidebar';
import Dashboard from '~/component/dashboard';
import { signOut } from 'next-auth/react';
import { FaUser } from 'react-icons/fa';

import Link from 'next/link';

const Main = () => {
  return (
    <div>
      <div className="py-4 text-center shadow-md">
        <div className="font-bold text-left text-2xl p-2 flex md:flex-row justify-between">
          <h1>Will Maker</h1>
          <div className="md:hidden">
            <Link href="/main/profile">
              <FaUser size={22} className="cursor-pointer" />
            </Link>
          </div>
          <div className="hidden md:block bg-gradient-to-r from-yellow-400 to-yellow-600 w-28 h-8 rounded-full transform hover:scale-105 transition text-center text-lg">
            <button
              onClick={() => {
                signOut({ callbackUrl: '/' });
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
      <div className='flex'>
        <Sidebar />
        <Dashboard />
      </div>
    </div>
  );
};

export default Main;