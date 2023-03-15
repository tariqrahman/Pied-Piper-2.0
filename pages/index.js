import { useRouter } from "next/router";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { getProviders, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import spotify_logo from "../public/spotify-icons-logos/logos/01_RGB/02_PNG/Spotify_Logo_RGB_Green.png";
import logo from "../public/logo.png";
//import LinearGradient from 'react-native-linear-gradient';

import { getSession } from "next-auth/react";
import clientPromise from "@/lib/mongodb";
import Layout from "@/components/layout";

function homePage({ providers, currentUser }) {
  //userid should be used to get data related to user to display on page
  const router = useRouter();
  const userId = router.query.userId;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  //add some call to add stuff to mongodb database
  const followUser = () => {
    console.log("followed user(#" + { userId } + ")");
  };

  return (
    <div>
      <Layout providers={providers} currentUser={currentUser}>
      {/* body */}
      {/* <div className="min-h-screen bg-black pb-5"> */}
      <div className="min-h-screen bg-black pb-5" style={{background: "linear-gradient(#000046 ,#1CB5E0);" }}>
        {/* <LinearGradient colors = {['#2980B9'], ['#6DD5FA']} style = {styles.body}> */}
        <div className="flex mx-auto flex-col w-8/12 align-middle gap-3">
          <div className="relative px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  pied piper 2.0
                </h1>
                <p className="mt-6 text-lg leading-8 text-cyan-400">
                  A social networking platform based on your music taste.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href="#"
                    className="rounded-md bg-black px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get started
                  </a>
                  <a
                    href="#"
                    className="text-base font-semibold leading-7 text-white"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    </Layout>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const providers = await getProviders();
  const session = await getSession({ req });
  if (session) {
    const client = await clientPromise;
    const session = await getSession({ req });
    const userId = session.user.username;
    //get requests
    const curUser = await getUserProfile(userId, client);

    return {
      props: {
        providers: providers,
        currentUser: JSON.parse(JSON.stringify(curUser)),
      },
    };
  }
  if (!session) {
    return {
      props: {
        providers: providers,
      },
    };
  }
}

export default homePage;

async function getUserProfile(UID, client) {
  const db = client.db("nextjs-mongodb-demo");
  const options = {
    // Include only the `display_name` and `id` fields in the returned document
    projection: { _id: 0, display_name: 1, id: 1 },
  };
  const curUser = await db.collection("users").findOne({ id: UID }, options);
  return curUser;
}
