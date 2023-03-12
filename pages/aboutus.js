import { useRouter } from "next/router";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { getProviders, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import spotify_logo from "../public/spotify-icons-logos/logos/01_RGB/02_PNG/Spotify_Logo_RGB_Green.png";
import logo from "../public/logo.png";

const navigation = [
  { name: "about us", href: "/aboutus" },
  { name: "users", href: "/users" },
  { name: "dashboard", href: "/dashboard" },
  { name: "profile", href: "/users/1234/profile" },
];

function Aboutus({ providers }) {
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
      {/** header */}
      <div className="isolate bg-black border-b border-zinc-800 text-white">
        {/*navbar container*/}
        <div className="">
          {/* navbar header */}
          <nav
            className="flex items-center justify-between py-3 px-10"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <Link href="/" className=" -m-1.5 p-1.5">
                <div className="flex flex-row items-center gap-2.5">
                  <Image className="flex" src={logo} alt="company logo" />
                  <div className="flex text-xl company-text">AudioLink</div>
                </div>
              </Link>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-300"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            {/* navbar is here */}
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold leading-6 text-zinc-300"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <button
                    className="text-sm font-semibold leading-6 text-zinc-300"
                    onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                  >
                    {" "}
                    log in <span aria-hidden="true">&rarr;</span>
                  </button>
                </div>
              ))}
            </div>
          </nav>
          {/* navbar menu  */}
          <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <Dialog.Panel
              focus="true"
              className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden"
            >
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                    >
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </div>
      </div>
      {/* body */}
      <div className="min-h-screen bg-black pb-5">
        <div className="flex mx-auto flex-col w-8/12 align-middle gap-3">
          <div className="relative px-2 lg:px-8">
            <div className="mx-auto max-w-2xl py-11 ">
              
                <h1 className="font-bold text-center tracking-tight text-white sm:text-5xl">
                  About Us
                </h1>
                <p className="mt-6 mb-6 text-lg text-center leading-8 text-cyan-400">
                  Audiolink is here to provide a platform to connect with others
                  based on their music preferences.
                </p>
                <h1 className="font-bold tracking-tight text-white sm:text-3xl">
                  How it works
                </h1>
                <p className="mt-2 mb-6 text-lg leading-8 text-cyan-400">
                  Simply log into your Spotify account and let us take care of
                  the rest. Audiolink is here to form a common ground between
                  people to begin conversations and possibly lead to
                  friendships.
                </p>
                <h1 className="font-bold tracking-tight text-white sm:text-3xl">
                  What is that common ground?
                </h1>
                <p className="mt-2 text-lg leading-8 text-cyan-400">
                  Users you match with on Audiolink share similar top artists to
                  you. From there, you can access their Spotify profiles and
                  take it from there. Start exchanging playlists, songs, and
                  even introduce new artists. Immerse yourself into new worlds
                  of music.
                </p>
            </div>
          </div>
        </div>
      </div>
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

export default Aboutus;