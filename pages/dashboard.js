import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { getProviders, signIn, signOut } from "next-auth/react";
import Layout from '@/components/layout';

function Dashboard({ providers }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
        <div className="">
            <Layout providers={providers}>
                {/* body */}
                <div className="min-h-screen dark:bg-[#000000]">
                    <div className="flex mx-auto flex-col w-8/12 align-middle gap-3">
                        {/* section 1 title*/}
                        <div className="flex container flex-row text-white justify-between px-2 pt-2 text-md">
                            <div className='flex'>
                                Song Recommendations
                            </div>
                            <div className='flex text-blue-400 '>
                                Show More
                            </div>
                        </div>
                        {/* section 1 elements */}
                        <div className='flex flex-col gap-3'>
                            {/* list elements should be dynamically created later */}
                            <div className="flex container flex-row flex-wrap text-white justify-between  gap-2.5 ">
                                <div className='flex flex-row align-middle rounded-lg bg-zinc-800 p-2 gap-2 grow'>
                                    <img className="h-20 bg-cover w-20 rounded-lg" src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="logo"></img>

                                    <div className='flex flex-col'>
                                        <div className='flex text-lg'>
                                            Title
                                        </div>
                                        {/* Link to spotify page for __*/}
                                        <div className='flex text-sm text-zinc-500'>
                                            Album placeholder
                                        </div>
                                        <div className='flex text-sm text-zinc-500'>
                                            Artist placeholder
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-row align-middle rounded-lg bg-zinc-800 p-2 gap-2 grow'>
                                    <img className="h-20 bg-cover w-20 rounded-lg" src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="logo"></img>

                                    <div className='flex flex-col'>
                                        <div className='flex text-lg'>
                                            Title
                                        </div>
                                        {/* Link to spotify page for __*/}
                                        <div className='flex text-sm text-zinc-500'>
                                            Album placeholder
                                        </div>
                                        <div className='flex text-sm text-zinc-500'>
                                            Artist placeholder
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            {/* list elements should be dynamically created later */}
                            <div className="flex container flex-row flex-wrap text-white justify-between  gap-2.5 ">
                                <div className='flex flex-row align-middle rounded-lg bg-zinc-800 p-2 gap-2 grow'>
                                    <img className="h-20 bg-cover w-20 rounded-lg" src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="logo"></img>

                                    <div className='flex flex-col'>
                                        <div className='flex text-lg'>
                                            Title
                                        </div>
                                        {/* Link to spotify page for __*/}
                                        <div className='flex text-sm text-zinc-500'>
                                            Album placeholder
                                        </div>
                                        <div className='flex text-sm text-zinc-500'>
                                            Artist placeholder
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-row align-middle rounded-lg bg-zinc-800 p-2 gap-2 grow'>
                                    <img className="h-20 bg-cover w-20 rounded-lg" src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="logo"></img>

                                    <div className='flex flex-col'>
                                        <div className='flex text-lg'>
                                            Title
                                        </div>
                                        {/* Link to spotify page for __*/}
                                        <div className='flex text-sm text-zinc-500'>
                                            Album placeholder
                                        </div>
                                        <div className='flex text-sm text-zinc-500'>
                                            Artist placeholder
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            {/* list elements should be dynamically created later */}
                            <div className="flex container flex-row flex-wrap text-white justify-between  gap-2.5 ">
                                <div className='flex flex-row align-middle rounded-lg bg-zinc-800 p-2 gap-2 grow'>
                                    <img className="h-20 bg-cover w-20 rounded-lg" src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="logo"></img>

                                    <div className='flex flex-col'>
                                        <div className='flex text-lg'>
                                            Title
                                        </div>
                                        {/* Link to spotify page for __*/}
                                        <div className='flex text-sm text-zinc-500'>
                                            Album placeholder
                                        </div>
                                        <div className='flex text-sm text-zinc-500'>
                                            Artist placeholder
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-row align-middle rounded-lg bg-zinc-800 p-2 gap-2 grow'>
                                    <img className="h-20 bg-cover w-20 rounded-lg" src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="logo"></img>

                                    <div className='flex flex-col'>
                                        <div className='flex text-lg'>
                                            Title
                                        </div>
                                        {/* Link to spotify page for __*/}
                                        <div className='flex text-sm text-zinc-500'>
                                            Album placeholder
                                        </div>
                                        <div className='flex text-sm text-zinc-500'>
                                            Artist placeholder
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="flex mx-auto flex-col w-8/12 align-middle gap-3">
                        {/* section 2 title*/}
                        <div className="flex container flex-row text-white justify-between px-2 pt-2 text-md">
                            <div className='flex'>
                                Users with similar music
                            </div>
                            <div className='flex text-blue-400 '>
                                Show More
                            </div>
                        </div>
                        {/* section 2 elements */}
                        <div className='flex flex-col gap-3 snap-x snap-proximity'>
                            {/* list elements should be dynamically created later */}
                            <div className="flex flex-row text-white justify-left gap-2 px-2 snap-center scroll-smooth overflow-x-auto">
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
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    }
}

export default Dashboard