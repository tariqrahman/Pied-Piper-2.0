import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { getProviders, signIn, signOut } from "next-auth/react";
import { getSession } from 'next-auth/react';
import clientPromise from '@/lib/mongodb';
import Layout from '@/components/layout';
import UserSimilarArtist from '@/components/user-similar-artist';

function Dashboard({ providers ,currentUser }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
        <div className="">
            <Layout providers={providers} currentUser={currentUser}>
                {/* body */}
                <div className="min-h-screen dark:bg-[#000000]">
                    <div className="flex mx-auto flex-col w-8/12 align-middle gap-3">
                        {/* section 1 title*/}
                        <div className="flex container flex-row text-white justify-between px-2 pt-5 pb-3 text-lg">
                            <div className='flex'>
                                Users with similar interest
                            </div>
                            <div className='flex text-blue-400 '>
                                Show More
                            </div>
                        </div>
                        {/* section 1 elements */}
                        <div className='flex flex-col gap-3'>
                            {/* list elements should be dynamically created later */}
                            <div className="flex flex-row flex-wrap text-white justify-between  gap-2.5 ">
                            <UserSimilarArtist providers={providers}></UserSimilarArtist>
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex mx-auto flex-col w-8/12 align-middle gap-3"> */}
                        {/* section 2 title*/}
                        {/* <div className="flex container flex-row text-white justify-between px-2 pt-2 text-md">
                            <div className='flex'>
                                Users with similar music
                            </div>
                            <div className='flex text-blue-400 '>
                                Show More
                            </div>
                        </div> */}
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
        </div>
    )
}

export async function getServerSideProps({req}) {
    const providers = await getProviders();
    const session = await getSession({req});
    const userId = session.user.username;
    //console.log(current_user);
        const client = await clientPromise;
        const db = client.db("nextjs-mongodb-demo");
        const options = {
          // Include only the `display_name` and `id` fields in the returned document
          projection: { _id: 0, display_name: 1, id: 1 },
        };
        const curUser = await db
          .collection("users")
          .findOne({id:userId},options);
    return {
      props: {
        providers: providers,
        currentUser: JSON.parse(JSON.stringify(curUser)) ,
      },
    };
  }

export default Dashboard