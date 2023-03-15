import { useRouter } from "next/router";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { getProviders, signIn, signOut } from "next-auth/react";
import {
  ArrowPathIcon,
  HeartIcon,
  ChatBubbleBottomCenterIcon,
  HashtagIcon,
  LockClosedIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';
import Link from "next/link";
import Image from "next/image";
import spotify_logo from "../public/spotify-icons-logos/logos/01_RGB/02_PNG/Spotify_Logo_RGB_Green.png";
import logo from "../public/logo.png";
//import LinearGradient from 'react-native-linear-gradient';

import Layout from "@/components/layout";

function homePage({ providers }) {
  //userid should be used to get data related to user to display on page
  const router = useRouter();
  const userId = router.query.userId;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  //add some call to add stuff to mongodb database
  const followUser = () => {
    console.log("followed user(#" + { userId } + ")");
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    });
  };
  
  const features = [
    {
      name: 'NextAuth authentication',
      description:
        'Configured Spotify as a provider to authenticate users, retrieving user information, and managing user sessions. User session tokens are generated when a user logs in certain pages can only be accessed with a valid token.',
      icon: LockClosedIcon,
    },
    {
      name: 'In-depth analysis',
      description:
        'By utilzing the Spotify API, data is drawn directly from a user\'s account. This ensures that a user\'s reccomendations of other users with similar taste are accurate and up-to-date!',
      icon: ChatBubbleBottomCenterIcon,
    },
    {
      name: 'Database',
      description:
        'Once a user logs into our application, their profile data and listening habits are posted to our database. Using MongoDB, we are able to match existing users based on their listening habits.',
      icon: HashtagIcon,
    },
    {
      name: 'Community',
      description:
        'Connect with other Bruins with similar and different music taste than you! You can explore all users via the \'user\' tab and similar users via the \'dashboard.',
      icon: HeartIcon,
    },
  ];

  return (
    <div>
      <Layout providers={providers}>
        {/* body */}
        {/* <div className="min-h-screen bg-black pb-5"> */}
        <div
          className="min-h-screen bg-black pb-5 bg-gradient-to-r
          from-blue-500
          via-blue-700
          to-blue-900
          background-animate"
        >
          {/* <LinearGradient colors = {['#2980B9'], ['#6DD5FA']} style = {styles.body}> */}
          <div className="flex mx-auto flex-col w-8/12 align-middle gap-3">
            <div className="relative px-6 lg:px-8">
              <div className="mx-auto h-screen max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className="text-center">
                  <h1 className="text-4xl font-bold tracking-tight text-zinc-300 sm:text-6xl">
                    pied piper 2.0
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-white">
                    a social networking platform based on your music taste
                  </p>
                  <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a
                      onClick={scrollToBottom}
                      className="border-white border-2 px-3.5 py-1.5 rounded-2xl text-base font-semibold leading-7 text-white"
                    >
                      learn more <span aria-hidden="true">↓</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:py-15">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:text-center">
                <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-300 sm:text-4xl">
                  Implementation Spec
                </p>
                <p className="mt-6 text-lg leading-8 text-white">
                  Learn about our web application and the implemented features designed to make for a pleasant music discovery experience
                </p>
              </div>
              <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                <dl className="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-16">
                      <dt className="text-base font-semibold leading-7 text-black">
                        <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-black">
                          <feature.icon
                            className="h-6 w-6 text-zinc-300"
                            aria-hidden="true"
                          />
                        </div>
                        {feature.name}
                      </dt>
                      <dd className="mt-2 text-base leading-7 text-black">
                        {feature.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default homePage;
