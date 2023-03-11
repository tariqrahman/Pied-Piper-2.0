import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { getProviders, signIn, signOut } from "next-auth/react";
import Link from "next/link"
import logo from "../public/logo.png"
import Image from "next/image"

const navigation = [
    { name: 'about us', href: '#' },
    { name: 'users', href: '/users' },
    { name: 'old home page', href: '/oldhomepage'},
    { name: 'dashboard', href: '/dashboard'},
    { name: 'profile', href: '/users/1234/profile'}
  ]

function Dashboard({ providers }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
        <div className="">
            <div className="isolate bg-black border-b border-zinc-800 text-white">
                {/*navbar container*/}
                <div className="">
                    {/* navbar header */}
                    <nav className="flex items-center justify-between py-3 px-10" aria-label="Global">
                        <div className="flex lg:flex-1">
                            <Link href="/" className=" -m-1.5 p-1.5">
                                <div className="flex flex-row items-center gap-2.5">
                                    <Image className="flex" src={logo} alt="" />
                                    <div className="flex text-xl company-text" >AudioLink</div>
                                </div>
                            </Link>
                        </div>
                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-300"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        {/* navbar is here */}
                        <div className="hidden lg:flex lg:gap-x-12">
                            {navigation.map((item) => (
                                <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-zinc-300">
                                    {item.name}
                                </a>
                            ))}
                        </div>
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                            {Object.values(providers).map((provider) => (
                                <div key={provider.name}>
                                    <button className="text-sm font-semibold leading-6 text-zinc-300"
                                        onClick={() => signIn(provider.id, { callbackUrl: "/" })}> log in  <span aria-hidden="true">&rarr;</span></button>
                                </div>
                            ))}
                        </div>
                    </nav>
                    {/* navbar menu  */}
                    <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                        <Dialog.Panel focus="true" className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
                            <div className="flex items-center justify-between">
                                <a href="#" className="-m-1.5 p-1.5">
                                    <span className="sr-only">Your Company</span>
                                    <img className="h-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                                </a>
                                <button
                                    type="button"
                                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10">
                                    <div className="space-y-2 py-6">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                    <div className="py-6">
                                        <a
                                            href="#"
                                            className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                                        >
                                            Log in
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Dialog>
                </div>
            </div>

            {/* body */}
            <div className="min-h-screen dark:bg-[#000000]">
                <div className="flex mx-auto flex-col container align-middle gap-3">
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