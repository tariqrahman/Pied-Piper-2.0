import { useRouter } from "next/router";
import { useState } from "react";
import { getProviders } from "next-auth/react";
import Image from "next/image";
import spotify_logo from "../../public/spotify-icons-logos/logos/01_RGB/02_PNG/Spotify_Logo_RGB_Green.png";
import Layout from "@/components/layout";
import { getSession } from "next-auth/react";
import Footer from "@/components/footer";
import UserOnUsers from "../../components/userinfo-users";
import UserDisplay from "@/components/list-active-users";
import clientPromise from "@/lib/mongodb";

function UserList({ providers, currentUser, allInfo }) {
  //userid should be used to get data related to user to display on page
  const router = useRouter();
  const userId = router.query.userId;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  //add some call to add stuff to mongodb database
  const followUser = () => {
    console.log("followed user(#" + { userId } + ")");
  };
  return (
    <div className="min-h-screen dark:bg-[#000000] font-semibold">
      <Layout providers={providers} currentUser={currentUser}>
        <div className="h-max bg-zinc-900 pb-5">
          <div className="flex mx-auto flex-col w-9/12 align-middle gap-3">
            {/* profile header */}
            <div className="">
              <div className="flex container flex-row text-zinc-300 justify-between px-2 pt-6 text-md">
                {/** left */}
                <div className="text-3xl">List of Active Users</div>
                {/** right */}
                <div className="flex h-auto w-32">
                  <Image className="" src={spotify_logo} alt="spotify logo" />
                </div>
              </div>
            </div>
            {/** profile image, username/details, follow button*/}
            {
              allInfo.map((user, idx) => {
                return (
                  <UserDisplay followHandler={followUser} data={user} key={idx}/>
                )
              })
            }
          </div>
        </div>
      </Layout>
      <Footer></Footer>
      {/** header */}

      {/* body */}
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const providers = await getProviders();
  const client = await clientPromise;
  const session = await getSession({ req });
  const userId = session.user.username;
  //get requests
  const allData = await populate(userId, client);
  const [curUser, _] = await getData(userId, client);
  return {
    props: {
      providers: providers,
      currentUser: JSON.parse(JSON.stringify(curUser)),
      allInfo: JSON.parse(JSON.stringify(allData)),
    },
  };
}

async function getData(UID, client) {
  const db = client.db(process.env.MONGODB_NAME);
  const options = {
    // Include only the `display_name` and `id` fields in the returned document
    projection: { _id: 0, display_name: 1, id: 1, images: 1},
  };
  
  const curUser = await db.collection("users").findOne({ id: UID }, options);
  const allUsers = await db.collection("users").find({}, options).toArray();
  return [curUser, allUsers];
}

// should have image, song name, artist, maybe album
async function getUserLikedSongs(UID, client, displayName, userImage) {
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
                    },
                    'popularity': 1,
                }
            }
        }
    }
];
  const coll = client.db(process.env.MONGODB_NAME).collection("user-liked-tracks");
  const cursor = coll.aggregate(pipeline);
  const result = await cursor.toArray();
  const likedTracks = {};
  likedTracks['display_name'] = displayName;
  likedTracks['user_img_url'] = userImage;
  likedTracks['userid'] = UID;
  likedTracks['tracks'] = result[0].items;
  return likedTracks;
}

async function populate(userId, client) {
  const [_, allUsers] = await getData(userId, client);
  const promises = allUsers.map(async user => {
    const entry = await getUserLikedSongs(user['id'], client, user['display_name'], user['images'][0]['url']);
    console.log(entry);
    return entry;
  })
  const allData = await Promise.all(promises);
  return allData;
}

export default UserList;

// follow button stuff
async function getFollowData(UID, client) {
  const db = client.db(process.env.MONGODB_NAME);
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
    .db(process.env.MONGODB_NAME)
    .collection("user-followed-users");
  const cursor = coll.aggregate(pipeline);
  const result = await cursor.toArray();

  return result;
}
//given a list of ids get all ids in list
async function getUsersByIds(userIds, client) {
  try {
    const database = client.db(process.env.MONGODB_NAME);
    const users = await database
      .collection("users")
      .find({ id: { $in: userIds } })
      .toArray();
    return users;
  } catch (error) {
    console.error(error);
  }
}
