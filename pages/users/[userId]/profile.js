import { useRouter } from "next/router";
import { getProviders } from "next-auth/react";
import Image from "next/image";
import spotify_logo from "../../../public/spotify-icons-logos/logos/01_RGB/02_PNG/Spotify_Logo_RGB_Green.png";
import Layout from "@/components/layout";
import SongOnProfile from "@/components/song-onprofile";
import UserOnProfile from "@/components/other-user-onprofile";
import clientPromise from "@/lib/mongodb";
import { getSession } from "next-auth/react";

function Profile({ providers, currentUser }) {
  console.log(currentUser);
  //userid should be used to get data related to user to display on page
  const router = useRouter();
  const userId = router.query.userId;

  //add some call to add stuff to mongodb database
  const followUser = () => {
    console.log("followed user(#" + { userId } + ")");
  };

  return (
    <div>
      <Layout providers={providers} currentUser={currentUser}>
        {/* body */}
        <div className="max-w-screen bg-black pb-5">
          <div className="flex mx-auto flex-col w-8/12 align-middle gap-3">
            {/** profile image, username/details, follow button*/}
            <div className="">
              <div className="flex container flex-row text-white justify-left pt-3 text-md">
                {/** left */}
                <div className="flex w-4/12 text-3xl pl-2 pt-2 pb-2">
                  <div className="w-auto h-auto">
                    <img
                      className="flex shrink bg-cover lg:h-52 lg:w-52 md:h-36 md:w-36 rounded-full"
                      src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                      alt="logo"
                    ></img>
                  </div>
                </div>
                {/** right */}
                <div className="flex shrink flex-col w-9/12">
                  <div className="lg:text-6xl md:text-4xl pt-4 pb-2 break-words">
                    ({userId})
                  </div>
                  <button
                    className="ml-1 mt-3 items-center border-solid border-2 w-32 h-8"
                    onClick={followUser}
                  >
                    Follow
                  </button>
                </div>
              </div>
            </div>
            {/** list of top 5 most listened tracks of the user */}
            <div>
              <div className="flex container flex-row text-white px-2 pt-2 pb-5 text-2xl">
                <div className="flex">Top Five Tracks</div>
              </div>
              {/* follwed users carousel/scroll */}
              <div className="flex flex-col gap-3 snap-x snap-proximity">
                {/* list elements should be dynamically created later */}
                {/* props to pass: album cover for song, song title, artist name */}
                <div className="flex flex-row text-white justify-between">
                  <SongOnProfile providers={providers}></SongOnProfile>
                  <SongOnProfile providers={providers}></SongOnProfile>
                  <SongOnProfile providers={providers}></SongOnProfile>
                  <SongOnProfile providers={providers}></SongOnProfile>
                  <SongOnProfile providers={providers}></SongOnProfile>
                </div>
              </div>
            </div>
            {/* followed list */}
            <div>
              <div className="flex container flex-row text-white justify-between px-2 pt-2 pb-5 text-2xl">
                <div className="flex">Following</div>
                <div className="flex text-blue-400 ">Show More</div>
              </div>
              {/* follwed users carousel/scroll */}
              <div className="flex flex-col gap-3 snap-x snap-proximity">
                {/* list elements should be dynamically created later */}
                {/* props to pass: username, profile picture */}
                <div className="flex flex-row text-white justify-left gap-10 px-2 snap-center scroll-smooth overflow-x-auto">
                  <UserOnProfile providers={providers} onClick></UserOnProfile>
                  <UserOnProfile providers={providers}></UserOnProfile>
                  <UserOnProfile providers={providers}></UserOnProfile>
                  <UserOnProfile providers={providers}></UserOnProfile>
                  <UserOnProfile providers={providers}></UserOnProfile>
                  <UserOnProfile providers={providers}></UserOnProfile>
                </div>
              </div>
            </div>
            {/* followers list */}
            <div>
              <div className="flex container flex-row text-white justify-between px-2 pt-2 pb-5 text-2xl">
                <div className="flex">Followers</div>
                <div className="flex text-blue-400 ">Show More</div>
              </div>
              <div className="flex flex-col gap-3 snap-x snap-proximity">
                {/* list elements should be dynamically created later */}
                <div className="flex flex-row text-white justify-left gap-10 px-2 snap-center scroll-smooth overflow-x-auto">
                  <UserOnProfile providers={providers}></UserOnProfile>
                  <UserOnProfile providers={providers}></UserOnProfile>
                  <UserOnProfile providers={providers}></UserOnProfile>
                  <UserOnProfile providers={providers}></UserOnProfile>
                  <UserOnProfile providers={providers}></UserOnProfile>
                  <UserOnProfile providers={providers}></UserOnProfile>
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

async function getUserProfile(UID, client) {
  const db = client.db("nextjs-mongodb-demo");
  const options = {
    // Include only the `display_name` and `id` fields in the returned document
    projection: { _id: 0, display_name: 1, id: 1 },
  };
  const curUser = await db.collection("users").findOne({ id: UID }, options);
  return curUser;
}

export default Profile;
