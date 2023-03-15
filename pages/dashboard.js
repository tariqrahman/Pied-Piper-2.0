import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { getProviders, signIn, signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import clientPromise from "@/lib/mongodb";
import Layout from "@/components/layout";
import UserSimilarArtist from "@/components/user-similar-artist";

import Footer from "@/components/footer";
import SongsFromFollow from "@/components/dashboard-element";
import spotify_logo from "../public/spotify-icons-logos/logos/01_RGB/02_PNG/Spotify_Logo_RGB_Green.png";
import Image from "next/image";
function Dashboard({
  providers,
  currentUser,
  allFollowerTracks,
  allFollowingTracks,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="">
      <Layout providers={providers} currentUser={currentUser}>
        {/* body */}
        <div className="min-h-screen dark:bg-[#000000]">
          <div className="flex mx-auto flex-col w-8/12 align-middle gap-3 divide-y divide-solid divide-cyan-400">
            <div className="flex flex-row justify-between text-3xl pt-2 pl-2 pr-2 items-center">
                <div className="text-white company-text ">
                    DASHBOARD
                </div>
                <div className="flex h-auto w-32">
                  <Image className="" src={spotify_logo} alt="spotify logo" />
                </div>
            </div>
            <div>
              <div className="flex items-center container flex-row text-white justify-between company-text px-2 pt-2 pb-5 text-xl">
                <div className="flex bolder">Tracks From Followed Users</div>
                <div className="flex text-blue-400 text-sm">Show More</div>
              </div>
              {/* follwed users carousel/scroll */}
              <div className="flex flex-col gap-3 snap-x snap-proximity">
                {/* list elements should be dynamically created later */}
                {/* props to pass: username, profile picture */}
                <div className="flex flex-row text-white justify-left gap-2 px-2 snap-center flex-wrap h-42">
                  <SongsFromFollow
                    followTrackList={allFollowingTracks}
                  ></SongsFromFollow>
                </div>
              </div>
            </div>
            {/* followers list */}
            <div>
              <div className="flex items-center container flex-row text-white justify-between company-text px-2 pt-2 pb-5 text-xl mb-52">
                <div className="flex bolder">Tracks From Your Followers</div>
                <div className="flex text-blue-400 text-sm">Show More</div>
              </div>
              <div className="flex flex-col gap-3 snap-x snap-proximity">
                {/* list elements should be dynamically created later */}
                <div className="flex flex-row text-white justify-left gap-2 px-2 snap-center flex-wrap h-42">
                  <SongsFromFollow
                    followTrackList={allFollowerTracks}
                  ></SongsFromFollow>
                </div>
              </div>
            </div>
            {/* section 1 title
            <div className="flex container flex-row text-white justify-between px-2 pt-5 pb-3 text-lg">

              <div className="flex">Users with similar interest</div>
              <div className="flex text-blue-400 ">Show More</div>
            </div> */}
            {/* section 1 elements */}

            {/* <div className="flex flex-col gap-3"> */}
            {/* list elements should be dynamically created later */}
            {/* <div className="flex flex-row flex-wrap text-white justify-between  gap-2.5 ">

                <UserSimilarArtist providers={providers}></UserSimilarArtist>
              </div>
            </div>
          </div> */}
            {/* <div className="flex mx-auto flex-col w-8/12 align-middle gap-3"> */}
            {/* section 2 title*/}
            {/* <div className="flex container flex-row text-white justify-between px-2 pt-2 text-md">
                            <div className='flex'>
                                Users with similar music
                            </div>
                            <div className='flex text-blue-400 '>
                                Show More
        </div>*/}
          </div>
          {/* section 2 elements */}
          {/* <div className='flex flex-col gap-3 snap-x snap-proximity'> */}
          {/* list elements should be dynamically created later */}
          {/* <div className="flex flex-row text-white justify-left gap-2 px-2 snap-center scroll-smooth overflow-x-auto">
                                <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                                    <img className="h-32 w-32 rounded-lg" src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="logo"></img>
                                    <div className='p-1'>song name</div>
                                </div>
                                <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                                    <img className="h-32 w-32 rounded-lg" src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="logo"></img>
                                    <div className='p-1'>song name</div>
                                </div>
                                <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                                    <img className="h-32 w-32 rounded-lg" src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="logo"></img>
                                    <div className='p-1'>song name</div>
                                </div>
                                <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                                    <img className="h-32 w-32 rounded-lg" src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="logo"></img>
                                    <div className='p-1'>song name</div>
                                </div>
                                <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                                    <img className="h-32 w-32 rounded-lg" src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="logo"></img>
                                    <div className='p-1'>song name</div>
                                </div>
                                <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                                    <img className="h-32 w-32 rounded-lg" src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="logo"></img>
                                    <div className='p-1'>song name</div>
                                </div>
                                <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                                    <img className="h-32 w-32 rounded-lg" src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="logo"></img>
                                    <div className='p-1'>song name</div>
                                </div>
                                <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                                    <img className="h-32 w-32 rounded-lg" src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="logo"></img>
                                    <div className='p-1'>song name</div>
                                </div>
                            </div>
                        </div>
                    </div> */}
        </div>
      </Layout>
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const providers = await getProviders();
  const client = await clientPromise;
  const session = await getSession({ req });
  const userId = session.user.username;
  //get requests
  const curUser = await getUserProfile(userId, client);
  const eachFollowerTracks = await getFollowerTracks(userId);
  const eachFollowingTracks = await getFollowingTracks(userId);
  return {
    props: {
      providers: providers,
      currentUser: JSON.parse(JSON.stringify(curUser)),
      allFollowerTracks: JSON.parse(JSON.stringify(eachFollowerTracks)),
      allFollowingTracks: JSON.parse(JSON.stringify(eachFollowingTracks)),
    },
  };
}

export default Dashboard;
async function getUserProfile(UID, client) {
  const db = client.db("nextjs-mongodb-demo");
  const options = {
    // Include only the `display_name` and `id` fields in the returned document
    projection: { _id: 0, display_name: 1, id: 1 },
  };
  const curUser = await db.collection("users").findOne({ id: UID }, options);
  return curUser;
}
async function getFollowerTracks(UID) {
  /*
   * Requires the MongoDB Node.js Driver
   * https://mongodb.github.io/node-mongodb-native
   */

  const client = await clientPromise;
  const pipeline = [
    {
      $match: {
        id: UID,
      },
    },
    {
      $lookup: {
        from: "user-liked-tracks",
        localField: "follower",
        foreignField: "id",
        as: "tracklist",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "follower",
        foreignField: "id",
        as: "namelist",
      },
    },
    {
      $project: {
        _id: 0,
        tracklist: 1,
        namelist: 1,
      },
    },
  ];
  const coll = client
    .db("nextjs-mongodb-demo")
    .collection("user-followed-users");
  const cursor = coll.aggregate(pipeline);
  const result = await cursor.toArray();
  console.log(result);
  return result;
}

async function getFollowingTracks(UID) {
  /*
   * Requires the MongoDB Node.js Driver
   * https://mongodb.github.io/node-mongodb-native
   */

  const client = await clientPromise;
  const pipeline = [
    {
      $match: {
        id: UID,
      },
    },
    {
      $lookup: {
        from: "user-liked-tracks",
        localField: "following",
        foreignField: "id",
        as: "tracklist",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "following",
        foreignField: "id",
        as: "namelist",
      },
    },
    {
      $project: {
        _id: 0,
        tracklist: 1,
        namelist: 1,
      },
    },
  ];
  const coll = client
    .db("nextjs-mongodb-demo")
    .collection("user-followed-users");
  const cursor = coll.aggregate(pipeline);
  const result = await cursor.toArray();
  console.log(result);
  return result;
}
