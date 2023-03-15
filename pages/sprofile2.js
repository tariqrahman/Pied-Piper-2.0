import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import speakers from "../public/speakerIcon.svg";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { getProviders, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import spotify_logo from "../public/spotify-icons-logos/logos/01_RGB/02_PNG/Spotify_Logo_RGB_Green.png";
import logo from "../public/logo.png";
import clientPromise from "@/lib/mongodb";

import Layout from "@/components/layout";

function homePage({ providers }) {
  //userid should be used to get data related to user to display on page
  const router = useRouter();
  const userId = router.query.userId;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
}

export default function MyPage({
  profileData,
  topTrackData,
  topArtistData,
  likedTrackData,
  idLikedTrackData,
  followerTable,
  providers,
  currentUser,
}) {
  var userData = profileData;
  //console.log(spotifyData)
  return (
    <div>
      <Layout providers={providers} currentUser={currentUser}>
        {/* body */}
        <div className="min-h-screen bg-black pb-5">
          <div className="flex mx-auto flex-col w-8/12 align-middle gap-3">
            <div className="relative px-6 lg:px-8">
              <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-42">
                <div className="text-center">
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                    <Image className="flex" src={speakers} alt="speaker_icon" />
                  </h1>
                  <p className="mt-6 text-3xl company-text text-white">
                    Nothing to Recommend
                  </p>
                  <div className="mt-10 flex items-center justify-center gap-x-6">
                    <button
                      className="rounded-md bg-sky-500 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() =>
                        generateData(
                          profileData,
                          topTrackData,
                          topArtistData,
                          likedTrackData,
                          idLikedTrackData,
                          followerTable,
                        )
                      }
                    >
                      get started
                    </button>
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
  const SPOTIFY_PROFILE_ENDPOINT = "https://api.spotify.com/v1/me";
  const SPOTIFY_TOP_TRACK_ENDPOINT =
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5&offset=0";
  const SPOTIFY_TOP_ARTIST_ENDPOINT =
    "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5&offset=0";
  const SPOTIFY_LIKED_TRACK_ENDPOINT =
    "https://api.spotify.com/v1/me/tracks?limit=10&offset=0";
  const access_token = session.user.accessToken;
  //current user data
  const userId = session.user.username;
  //console.log(current_user);
  const client = await clientPromise;
  const db = client.db("nextjs-mongodb-demo");
  const options = {
    // Include only the `display_name` and `id` fields in the returned document
    projection: { _id: 0, display_name: 1, id: 1 },
  };
  const curUser = await db.collection("users").findOne({ id: userId }, options);

  //profile data
  const response1 = await fetch(SPOTIFY_PROFILE_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  console.log(response1);
  //top tracks data
  const response2 = await fetch(SPOTIFY_TOP_TRACK_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  console.log(response2);
  //top artists data
  const response3 = await fetch(SPOTIFY_TOP_ARTIST_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  console.log(response3);
  // liked tracks data
  const response4 = await fetch(SPOTIFY_LIKED_TRACK_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  console.log(response4);
  const profileData = await response1.json();
  const topTrackData = await response2.json();
  const topArtistData = await response3.json();
  const likedTrackData = await response4.json();
  const emptyTable = {
    id: userId,
    follower: [],
    following: []
  };
  const followerTable = JSON.stringify(emptyTable);
//   const result = await client.db("nextjs-mongodb-demo")
//                  .collection('user-followed-users')
//                  .insertOne({
//                      id: userId,
//                      followers: [],
//                      followed_users: []
//                  });
    
        
  //append user id for later identification
  const idLikedTrackData = { likedTrackData, id: userId };
  return {
    props: {
      profileData,
      topTrackData,
      topArtistData,
      likedTrackData,
      idLikedTrackData,
      followerTable,
      currentUser: JSON.parse(JSON.stringify(curUser)),
      providers,
    },
  };
}

//button handler
export async function generateData(
  profileData,
  topTrackData,
  topArtistData,
  likedTrackData,
  idLikedTrackData,
  followerTable,
) {
  postUserData(profileData);
  //postUserTopTracks(topTrackData);
  //postUserTopArtists(topArtistData);
  //postLikedTracks(likedTrackData);
  postLikedTracks(idLikedTrackData);
  postInitialFollowTable(followerTable);
}

export async function postUserData(SpotifyData) {
  console.log(SpotifyData);
  console.log("in post request func");
  const response = await fetch("/api/postUser", {
    method: "POST",
    body: JSON.stringify(SpotifyData),
    //body: enteredData,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const respData = await response;
}

export async function postUserTopTracks(SpotifyData) {
  console.log(SpotifyData);
  console.log("in post request func");
  const response = await fetch("/api/postTrack", {
    method: "POST",
    body: JSON.stringify(SpotifyData),
    //body: enteredData,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const respData = await response;
}
export async function postUserTopArtists(SpotifyData) {
  console.log(SpotifyData);
  console.log("in post request func");
  const response = await fetch("/api/postArtist", {
    method: "POST",
    body: JSON.stringify(SpotifyData),
    //body: enteredData,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const respData = await response;
}
export async function postLikedTracks(SpotifyData) {
  console.log(SpotifyData);
  console.log("in post request func");
  const response = await fetch("/api/postLiked", {
    method: "POST",
    body: JSON.stringify(SpotifyData),
    //body: enteredData,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const respData = await response;
}
export async function postInitialFollowTable(emptyTable) {
  console.log(emptyTable);
  console.log("in post request func");
  const response = await fetch("/api/postFollowTable/", {
    method: "POST",
    body: emptyTable,
    //body: enteredData,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const respData = await response;
}
