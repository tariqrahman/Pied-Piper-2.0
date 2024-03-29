import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { getProviders } from "next-auth/react";
import UserList from "@/pages/users/index";
import Layout from "@/components/layout";

export default function UserOnUsers({ ...props }) {
  const followUser = () => {
    console.log("followed user(#" + { userId } + ")");
  };

  return (
    <>
      <div className="p-1 divide-y divide-solid gap-2 font-semibold">
        <div className="flex flex-row text-zinc-300 justify-left text-md rounded-full py-2 divide-x divide-solid divide-cyan-400">
          {/** left user profile image*/}
          <div className="flex items-center w-2/12 shrink-0 text-3xl pt-2 pb-2">
            <div className="flex justify-center h-fit">
              <div className="w-auto h-auto">
                <img
                  className=" flex shrink-0 bg-cover lg:h-32 lg:w-32 sm:h-24 sm:w-24 rounded-full"
                  src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  alt="logo"
                ></img>
              </div>
            </div>
          </div>
          {/** right col */}
          <div className="flex shrink flex-col w-10/12 rounded-lg">
            <div className="flex-col py-1">
              {/** header with username and follow button */}
              <div className="flex flex-row justify-between items-center flex-wrap ml-1">
                {/** left */}
                <div className="lg:text-3xl md:text-3xl sm:text-3xl break-words pl-1">
                  DISPLAY_NAME
                </div>
                {/** right */}
                <button
                  className="'border-white border-2 px-3.5 py-1.5 rounded-2xl text-base font-semibold leading-7 text-white"
                  onClick={followUser}
                >
                  Follow +
                </button>
              </div>

              {/** tracks pertaining to user */}
              <div className="ml-2 p-1 pb-2">
                <div className="flex container flex-row text-zinc-300 justify-between mb-3 text-md">
                  <div className="flex">Top Three Songs</div>
                  <div className="flex text-blue-400 "></div>
                </div>
                {/** dynamically pull top 3 songs from spotify based on user */}
                {/* list of top 3 most listened tracks */}
                <div className=" flex flex-col text-zinc-300 justify-left gap-2 px-2 divide-y divide-solid divide-zinc-900">
                  <div className="flex flex-row items-center gap-2 h-fit shrink-0 pt-0.5">
                    <img
                      className="h-8 w-8"
                      src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                      alt="logo"
                    ></img>
                    <div className="flex container flex-row justify-between">
                      <div className="">Song_name</div>
                      <div className="">Artist | Album</div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-2 h-fit shrink-0 pt-0.5">
                    <img
                      className="h-8 w-8"
                      src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                      alt="logo"
                    ></img>
                    <div className="flex container flex-row justify-between">
                      <div className="">Song_name</div>
                      <div className="">Artist | Album</div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-2 h-fit shrink-0 pt-0.5">
                    <img
                      className="h-8 w-8"
                      src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                      alt="logo"
                    ></img>
                    <div className="flex container flex-row justify-between">
                      <div className="">Song_name</div>
                      <div className="">Artist | Album</div>
                    </div>
                  </div>
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
