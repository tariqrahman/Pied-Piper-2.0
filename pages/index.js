import { useRouter } from 'next/router';
import { useState } from 'react';
import Footer from '@/components/footer';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { getProviders, signIn, signOut } from 'next-auth/react';
import {
  ArrowPathIcon,
  HeartIcon,
  ChatBubbleBottomCenterIcon,
  HashtagIcon,
  LockClosedIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';
import Lottie from 'react-lottie';
import animationData from '../lotties/music.json';
import Link from 'next/link';
import Image from 'next/image';
import spotify_logo from '../public/spotify-icons-logos/logos/01_RGB/02_PNG/Spotify_Logo_RGB_Green.png';
import logo from '../public/logo.png';
//import LinearGradient from 'react-native-linear-gradient';
import Layout from '@/components/layout';
import { getSession } from "next-auth/react";
import clientPromise from "@/lib/mongodb";

function homePage({ providers, currentUser }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  //userid should be used to get data related to user to display on page
  const router = useRouter();
  const userId = router.query.userId;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  //add some call to add stuff to mongodb database
  const followUser = () => {
    console.log('followed user(#' + { userId } + ')');
  };

  const scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
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
      name: 'in-depth analysis',
      description:
        "By utilzing the Spotify API, data is drawn directly from a user's account. This ensures that a user's reccomendations of other users with similar taste are accurate and up-to-date!",
      icon: ChatBubbleBottomCenterIcon,
    },
    {
      name: 'database',
      description:
        'Once a user logs into our application, their profile data and listening habits are posted to our database. Using MongoDB, we are able to match existing users based on their listening habits.',
      icon: HashtagIcon,
    },
    {
      name: 'community',
      description:
        "Connect with other Bruins with similar and different music taste than you! you can explore all users via the 'user' tab and similar users via the dashboard.",
      icon: HeartIcon,
    },
  ];

  return (
    <div>
      <Layout providers={providers} currentUser={currentUser}>
        {/* body */}
        {/* <div className="min-h-screen bg-zinc-900 pb-5"> */}
        <div
          className='min-h-screen pb-5 bg-gradient-to-r
          from-blue-500
          via-blue-700
          to-blue-900
          background-animate'
        >
          {/* <LinearGradient colors = {['#2980B9'], ['#6DD5FA']} style = {styles.body}> */}
          <div className='flex mx-auto flex-col w-8/12 align-middle gap-3'>
            <div className='relative px-6 lg:px-8'>
              <div className='mx-auto h-screen max-w-2xl py-32 sm:py-48 lg:py-56'>
                <div className='text-center'>
                  <h1 className='text-4xl font-bold tracking-tight text-zinc-300 sm:text-6xl'>
                    pied piper 2.0
                  </h1>
                  <p className='mt-6 text-lg leading-8 text-zinc-300'>
                    A social networking platform based on your music taste
                  </p>
                  <div className='mt-10 flex items-center justify-center gap-x-6'>
                    <a
                      href='#features'
                      className='border-zinc-300 border-2 px-3.5 py-1.5 rounded-2xl text-base font-semibold leading-7 text-zinc-300'
                    >
                      Learn more <span aria-hidden='true'>↓</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id='features' className='sm:py-15'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8 py-16'>
            <div className='mx-auto max-w-2xl lg:text-center'>
              <p className='mt-2 pb-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl'>
                features
              </p>
              <Lottie options={defaultOptions} height={40} width={150} />
              <p className='mt-6 text-lg leading-8 text-zinc-900'>
                Learn about our web application and the implemented features
                designed to make for a pleasant music discovery experience
              </p>
            </div>
            <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl'>
              <dl className='grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16'>
                {features.map((feature) => (
                  <div key={feature.name} className='relative pl-16'>
                    <dt className='text-base font-semibold leading-7 text-zinc-900'>
                      <div
                        className='absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r
          from-blue-500
          via-blue-700
          to-blue-900
          background-animate'
                      >
                        <feature.icon
                          className='h-6 w-6 text-zinc-300'
                          aria-hidden='true'
                        />
                      </div>
                      {feature.name}
                    </dt>
                    <dd className='mt-2 text-base leading-7 text-zinc-900'>
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Layout>
      <Footer />
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
  const db = client.db(process.env.MONGODB_NAME);
  const options = {
    // Include only the `display_name` and `id` fields in the returned document
    projection: { _id: 0, display_name: 1, id: 1 },
  };
  const curUser = await db.collection("users").findOne({ id: UID }, options);
  return curUser;
}
