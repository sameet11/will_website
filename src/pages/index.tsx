import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

import Header from "~/component/header";
import Slider from "~/component/slider";
import Features from "~/component/features";
import CallToAction from "~/component/callToaction";
import Testimonials from "~/component/testimonials";


export default function Home() {

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Will-maker|One Stop platform for will-making" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header/>
        <Slider/>
        <Features/>
        <CallToAction/>
        <Testimonials/>
      </main>
    </>
  );
}

