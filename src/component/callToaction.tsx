import React from "react";

import {signIn} from "next-auth/react"

const CallToAction = () => {
  return (
    <section className="bg-blue-100 py-16 text-center">
      <h2 className="text-2xl font-semibold">Join Over 100 Happy Customers</h2>
      <p className="mt-4 text-gray-600">See why they trust us to create their wills.</p>
      <button className="text-white text-lg font-semibold px-8 py-3 rounded-full mt-6 bg-gradient-to-r from-orange-400 to-orange-800 hover:from-orange-600 hover:to-orange-900 transition duration-500 ease-in-out transform hover:scale-105" onClick={() => signIn(undefined,{callbackUrl:'/main'})}>
        Start Creating Your Will
      </button>
    </section>
  );
};

export default CallToAction;
