import { useRouter } from "next/router";
import { getProviders } from "next-auth/react";
import Image from "next/image";
import spotify_logo from "../../../public/spotify-icons-logos/logos/01_RGB/02_PNG/Spotify_Logo_RGB_Green.png";
import Layout from "@/components/layout";
import SongOnProfile from "@/components/song-onprofile";
import UserOnProfile from "@/components/other-user-onprofile";
import clientPromise from "@/lib/mongodb";
import { getSession } from "next-auth/react";
import { list } from "postcss";
import { useState } from "react";

function Profile({
  providers,
  currentUser,
  userLikedTracks,
  profileContent,
  followData,
  listFollowers,
  listFollowings,
}) {
  console.log(currentUser);
  console.log(profileContent);
  console.log(followData);
  //userid should be used to get data related to user to display on page
  const router = useRouter();
  const userId = router.query.userId;
  //console.log(curUserId);
  //adds user to curUsers follow list
  //adds curUser to other users follower list

  //set up variables for profile ----------
  console.log(profileContent);

  const userData = profileContent[0];
  const display_name = userData.display_name;
  const userLink = userData.href;
  //hold image meta data ------------------
  const imageData = userData.images[0];
  const imgSrc = imageData.url;
  //organize follower data ----------------
  console.log(followData);
  const followArr = Object.entries(followData);
  const followDataMap = followArr[0][1];
  console.log(followDataMap.id);
  //cur is session user
  const curFollowers = followDataMap.follower;
  const curFollowings = followDataMap.following;
  var followed = false;
  var ownProfile = false;
  //check if current profile is followed by session user
  if (followDataMap.id == userId) {
    ownProfile = true; //override when looking at own profile
  } else {
    for (var i = 0; i < curFollowings.length; i++) {
      console.log("in loop for following");
      if (curFollowings[i] == userId) {
        console.log("already followed this person");
        followed = true;
        break;
      }
    }
  }
  
  const [followStatus, setFollowStatus] = useState(followed ? "Follow":"Unfollow");
  const handleClick = () => {
    if(followStatus == "Follow"){
      followed = !followed;
      setFollowStatus("Unfollow");
    }
    if(followStatus == "Unfollow"){
      followed = !followed;
      setFollowStatus("Follow")
    }
  };
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
                  <div className="company-text lg:text-4xl md:text-4xl sm:text-3xl text-2xl pt-4 pb-2 break-words">
                    {display_name}
                  </div>
                  
                  {ownProfile ? (<></>): followed ? (
                    <button
                      className="ml-1 mt-3 items-center border-solid border-2 w-28 h-7 border-sky-300 text-sky-300 hover:border-cyan-400 hover:text-cyan-100 hover:bg-sky-700"
                      onClick={() => {unfollowUser(userId, currentUser); handleClick()}}
                    >
                      {followStatus}
                    </button>
                  ) : (
                    <button
                      className="ml-1 mt-3 items-center border-solid border-2 w-28 h-7 hover:border-cyan-400 hover:text-cyan-100"
                      onClick={() => {followUser(userId, currentUser); handleClick()}}
                    >
                      {followStatus}
                    </button>
                  )}
                </div>
              </div>
            </div>
            {/** list of top 5 most listened tracks of the user */}
            <div>
              <div className="flex justify-between items-center container flex-row text-white px-2 pt-2 pb-2 text-xl">
                <div className="flex company-text">
                  <b>Liked Tracks</b>
                </div>
                <div className="flex h-auto w-28 mb-1">
                  <Image className="" src={spotify_logo} alt="spotify logo" />
                </div>
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
                </div>
              </div>
            </div>
            {/* followed list */}
            <div>
              <div className="flex items-center container flex-row text-white justify-between company-text px-2 pt-2 pb-5 text-xl">
                <div className="flex bolder">Following</div>
                <div className="flex text-blue-400 text-sm">Show More</div>
              </div>
              {/* follwed users carousel/scroll */}
              <div className="flex flex-col gap-3 snap-x snap-proximity">
                {/* list elements should be dynamically created later */}
                {/* props to pass: username, profile picture */}
                <div className="flex flex-row text-white justify-left gap-10 px-2 snap-center scroll-smooth overflow-x-auto h-42">
                  <UserOnProfile providers={providers} userlist={listFollowings}></UserOnProfile>
                </div>
              </div>
            </div>
            {/* followers list */}
            <div>
            <div className="flex items-center container flex-row text-white justify-between company-text px-2 pt-2 pb-5 text-xl">
                <div className="flex bolder">Followers</div>
                <div className="flex text-blue-400 text-sm">Show More</div>
              </div>
              <div className="flex flex-col gap-3 snap-x snap-proximity">
                {/* list elements should be dynamically created later */}
                <div className="flex flex-row text-white justify-left gap-10 px-2 snap-center scroll-smooth overflow-x-auto h-42">
                  <UserOnProfile providers={providers} userlist={listFollowers}></UserOnProfile>
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
  console.log(userId);
  const providers = await getProviders();
  const client = await clientPromise;
  const req = context.req;
  const session = await getSession({ req });
  const UID = session.user.username;
  //get requests
  const curUser = await getMyProfile(UID, client);
  const curLikedTracks = await getUserLikedSongs(userId, client);
  const userContent = await getProfileOthers(userId, client);
  const followData = await getFollowData(UID, client);
  //list of followers to display on profile
  const listFollowers = await getFollowerUserProfiles(userId);
  const listFollowings = await getFollowingUserProfiles(userId);
  // const followerProfiles = await getUsersByIds(profileFollowers);
  // const followingProfiles = await getUsersByIds(profileFollowings);

  return {
    props: {
      providers: providers,
      currentUser: JSON.parse(JSON.stringify(curUser)),
      // userLikedTracks: JSON.parse(JSON.stringify(curLikedTracks)),
      userLikedTracks: JSON.parse(JSON.stringify(curLikedTracks)),
      profileContent: JSON.parse(JSON.stringify(userContent)),
      followData: JSON.parse(JSON.stringify(followData)),
      listFollowers: (listFollowers == null) ? null:JSON.parse(JSON.stringify(listFollowers)),
      listFollowings: (listFollowings == null) ? null:JSON.parse(JSON.stringify(listFollowings)),
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
async function getProfileOthers(UID, client) {
  /*
   * Requires the MongoDB Node.js Driver
   * https://mongodb.github.io/node-mongodb-native
   */

  const agg = [
    {
      $match: {
        id: UID,
      },
    },
    {
      $project: {
        _id: 0,
        display_name: 1,
        href: 1,
        id: 1,
        images: 1,
      },
    },
  ];

  // const client = await clientPromise;
  const coll = client.db("nextjs-mongodb-demo").collection("users");
  const cursor = coll.aggregate(agg);
  const result = await cursor.toArray();
  return result;
}

// should have image, song name, artist, maybe album
async function getUserLikedSongs(UID, client) {
  const db = client.db("nextjs-mongodb-demo");
  const pipeline = [
    {
      $match: {
        id: UID,
      },
    },
    {
      $replaceRoot: {
        newRoot: "$likedTrackData",
      },
    },
    {
      $project: {
        items: {
          track: {
            name: 1,
            album: {
              name: 1,
              href: 1,
              images: 1,
            },
            artists: {
              href: 1,
              name: 1,
            },
          },
        },
      },
    },
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

export async function followUser(userId, currentUser) {
  //post the user to the correspond session users id
  const curUserId = Object.values(currentUser)[1];
  console.log(curUserId);
  console.log(userId);
  console.log("followed user(#" + { userId } + ")");
  //then need to do corresponding follow operations
  //add current user to other users followers
  const idfollowingid = {
    userId,
    curUserId,
  };
  const response1 = await fetch("/api/addFollower", {
    method: "POST",
    body: JSON.stringify(idfollowingid),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const id1followid2 = {
    curUserId,
    userId,
  };
  const response2 = await fetch("/api/startFollowing", {
    method: "POST",
    body: JSON.stringify(id1followid2),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function unfollowUser(userId, currentUser) {
  //post the user to the correspond session users id
  const curUserId = Object.values(currentUser)[1];
  console.log(curUserId);
  console.log(userId);
  console.log("followed user(#" + { userId } + ")");
  //then need to do corresponding follow operations
  //add current user to other users followers
  const idfollowingid = {
    userId,
    curUserId,
  };
  const response1 = await fetch("/api/removeFollower", {
    method: "POST",
    body: JSON.stringify(idfollowingid),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const id1followid2 = {
    curUserId,
    userId,
  };
  const response2 = await fetch("/api/stopFollowing", {
    method: "POST",
    body: JSON.stringify(id1followid2),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function getFollowData(UID, client) {
  const db = client.db("nextjs-mongodb-demo");
  const pipeline = [
    {
      $match: {
        id: UID,
      },
    },
    {
      $project: {
        _id: 0,
        id: 1,
        follower: 1,
        following: 1,
      },
    },
  ];

  const coll = client
    .db("nextjs-mongodb-demo")
    .collection("user-followed-users");
  const cursor = coll.aggregate(pipeline);
  const result = await cursor.toArray();

  return result;
}

async function getUsersByIds(userIds, client) {
  try {
    const database = client.db("nextjs-mongodb-demo");
    const users = await database
      .collection("users")
      .find({ id: { $in: userIds } })
      .toArray();
    return users;
  } catch (error) {
    console.error(error);
  }
}
async function getFollowerUserProfiles(userId) {
  /*
   * Requires the MongoDB Node.js Driver
   * https://mongodb.github.io/node-mongodb-native
   */

  const client = await clientPromise;

  const pipeline = [
    {
      $lookup: {
        from: "users",
        localField: "follower",
        foreignField: "id",
        as: "follow_display",
      },
    },
    {
      $match: {
        id: userId,
      },
    },
    {
      $project: {
        _id: 0,
        follow_display: 1,
      },
    },
  ];
  const coll = client
    .db("nextjs-mongodb-demo")
    .collection("user-followed-users");
  const cursor = coll.aggregate(pipeline);
  const result = await cursor.toArray();
  return result;
}
async function getFollowingUserProfiles(userId) {
  /*
   * Requires the MongoDB Node.js Driver
   * https://mongodb.github.io/node-mongodb-native
   */

  const client = await clientPromise;

  const pipeline = [
    {
      '$lookup': {
        'from': 'users', 
        'localField': 'following', 
        'foreignField': 'id', 
        'as': 'follow_display'
      }
    }, {
      '$match': {
        'id': userId,
      }
    }, {
      '$project': {
        '_id': 0, 
        'follow_display': 1
      }
    }
  ];
  const coll = client
    .db("nextjs-mongodb-demo")
    .collection("user-followed-users");
  const cursor = coll.aggregate(pipeline);
  const result = await cursor.toArray();
  console.log(result);
  return result;
}
