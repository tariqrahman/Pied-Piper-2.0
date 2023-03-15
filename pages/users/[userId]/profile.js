import { useRouter } from "next/router";
import { getProviders } from "next-auth/react";
import Image from "next/image";
import spotify_logo from "../../../public/spotify-icons-logos/logos/01_RGB/02_PNG/Spotify_Logo_RGB_Green.png";
import Layout from "@/components/layout";
import SongOnProfile from "@/components/song-onprofile";
import UserOnProfile from "@/components/other-user-onprofile";
import clientPromise from "@/lib/mongodb";
import { getSession } from "next-auth/react";


function Profile({ providers, currentUser, userLikedTracks, profileContent}) {
  console.log(currentUser);
  console.log(profileContent);
  //userid should be used to get data related to user to display on page
  const router = useRouter();
  const userId = router.query.userId;

  //add some call to add stuff to mongodb database
  const followUser = () => {
    console.log("followed user(#" + { userId } + ")");
  };

  //set up variables for profile
  console.log(profileContent)
  const userData = profileContent[0];
  const display_name = userData.display_name;
  const userLink = userData.href;
  //hold image meta data 
  const imageData = userData.images[0];
  const imgSrc = imageData.url;

  return (
    <div>
      <Layout providers={providers} currentUser={currentUser}>
        {/* body */}
        <div className="max-w-screen bg-black pb-5">
          <div className="flex mx-auto flex-col w-8/12 align-middle gap-3">
            {/** profile image, username/details, follow button*/}
            <div className="">
              <div className="flex container flex-row text-white justify-left pt-9 text-md">
                {/** left */}
                <div className="flex w-4/12 text-3xl pl-2 pt-2 pb-2">
                  <div className="w-auto h-auto">
                    <img
                      className="flex shrink:0 bg-cover lg:h-52 lg:w-52 md:h-36 md:w-36 sm:h-36 sm:w-36 rounded-full"
                      src={imgSrc}
                      alt="user profile image"
                    ></img>
                  </div>
                </div>
                {/** right */}
                <div className="flex shrink flex-col w-9/12">
                  <div className="company-text lg:text-4xl md:text-4xl sm:text-3xl pt-4 pb-2 break-words">
                    {display_name}
                  </div>
                  <button
                    className="ml-1 mt-3 items-center border-solid border-2 w-28 h-7 hover:border-cyan-400 hover:text-cyan-100"
                    onClick={followUser}
                  >
                    Follow
                  </button>
                </div>
              </div>
            </div>
            {/** list of top 5 most listened tracks of the user */}
            <div>
              <div className="flex container flex-row text-white px-2 pt-2 pb-2 text-xl">
                <div className="flex company-text"><b>Liked Tracks</b></div>
              </div>
              {/* follwed users carousel/scroll */}
              <div className="flex flex-col gap-3 snap-x snap-proximity">
                {/* list elements should be dynamically created later */}
                {/* props to pass: album cover for song, song title, artist name */}
                <div className="flex flex-row text-white justify-left gap-3 px-2 snap-center scroll-smooth overflow-x-auto h-56">
                  <SongOnProfile
                    providers={providers}
                    userLikedTracks={userLikedTracks}
                  ></SongOnProfile>
                  {/* <SongOnProfile providers={providers}></SongOnProfile>
                  <SongOnProfile providers={providers}></SongOnProfile>
                  <SongOnProfile providers={providers}></SongOnProfile>
                  <SongOnProfile providers={providers}></SongOnProfile> */}
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

export async function getServerSideProps(context) {
  const userId = context.params.userId;
  console.log(userId)
  const providers = await getProviders();
  const client = await clientPromise;
  const req = context.req;
  const session = await getSession( {req} );
  const UID = session.user.username;
  //get requests
  const curUser = await getMyProfile(UID, client);
  const curLikedTracks = await getUserLikedSongs(userId, client);
  const userContent = await getProfileOthers(userId, client);
  return {
    props: {
      providers: providers,
      currentUser: JSON.parse(JSON.stringify(curUser)),
      // userLikedTracks: JSON.parse(JSON.stringify(curLikedTracks)),
      userLikedTracks: JSON.parse(JSON.stringify(curLikedTracks)),
      profileContent: JSON.parse(JSON.stringify(userContent)),
    },
  };
}
export default Profile;

//get requests
async function getMyProfile(UID, client) {
  const db = client.db("nextjs-mongodb-demo");
  const options = {
    // Include only the `display_name` and `id` fields in the returned document
    projection: { _id: 0, display_name: 1, id: 1 },
  };
  const curUser = await db.collection("users").findOne({ id: UID }, options);
  return curUser;
}

//for generating profile for other users
async function getProfileOthers(UID,client ){
  /*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$match': {
      'id': UID,
    }
  }, {
    '$project': {
      '_id': 0, 
      'display_name': 1, 
      'href': 1, 
      'id': 1, 
      'images': 1
    }
  }
];

// const client = await clientPromise;
const coll = client.db('nextjs-mongodb-demo').collection('users');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
return result;
}

// should have image, song name, artist, maybe album
async function getUserLikedSongs(UID, client) {
  const db = client.db("nextjs-mongodb-demo");
  const pipeline = [
    {
        '$match': {
            'id': UID,
        }
    }, {
        '$replaceRoot': {
            'newRoot': '$likedTrackData'
        }
    }, {
        '$project': {
            'items': {
                'track': {
                    'name': 1, 
                    'album': {
                        'name': 1, 
                        'href': 1, 
                        'images': 1
                    }, 
                    'artists': {
                        'href': 1, 
                        'name': 1
                    }
                }
            }
        }
    }
];

  const coll = client.db("nextjs-mongodb-demo").collection("user-liked-tracks");
  const cursor = coll.aggregate(pipeline);
  const result = await cursor.toArray();

  return result;
}


//profile has follow button
// make onClick where, it adds route(other users id) to current session UID in database
// summary
//  make a post request on follow button click that stores id in followers: array or something
