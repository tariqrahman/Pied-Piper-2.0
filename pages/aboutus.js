import { useRouter } from "next/router";
import { useState } from "react";
import { getProviders } from "next-auth/react";
import Layout from "@/components/layout";
import { getSession } from "next-auth/react";
import clientPromise from "@/lib/mongodb";
import Footer from '@/components/footer';

function Aboutus({ providers, currentUser }) {
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
        <div className='min-h-screen py-12 bg-gradient-to-r
          from-blue-500
          via-blue-700
          to-blue-900
          background-animate'>
          <div className='flex mx-auto flex-col w-8/12 align-middle gap-3'>
            <div className='relative px-2 lg:px-8'>
              <div className='mx-auto max-w-2xl py-11 '>
                <h1 className='font-bold text-center tracking-tight text-zinc-900 sm:text-5xl'>
                  About Us
                </h1>
                <p className='mt-6 mb-6 text-lg text-center leading-8 text-zinc-300'>
                  Pied Piper 2.0 is here to provide a platform to connect with others
                  based on their music preferences.
                </p>
                <h1 className='font-bold tracking-tight text-zinc-900 sm:text-3xl'>
                  How it works
                </h1>
                <p className='mt-2 mb-6 text-lg leading-8 text-zinc-300'>
                  Simply log into your Spotify account and let us take care of
                  the rest. Audiolink is here to form a common ground between
                  people to begin conversations and possibly lead to
                  friendships.
                </p>
                <h1 className='font-bold tracking-tight text-zinc-900 sm:text-3xl'>
                  What is that common ground?
                </h1>
                <p className='mt-2 text-lg leading-8 text-zinc-300'>
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

async function getUserProfile(UID, client) {
  const db = client.db(process.env.MONGODB_NAME);
  const options = {
    // Include only the `display_name` and `id` fields in the returned document
    projection: { _id: 0, display_name: 1, id: 1 },
  };
  const curUser = await db.collection("users").findOne({ id: UID }, options);
  return curUser;
}

export default Aboutus;
