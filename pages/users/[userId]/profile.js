import { useRouter } from 'next/router';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { getProviders, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import spotify_logo from '../../../public/spotify-icons-logos/logos/01_RGB/02_PNG/Spotify_Logo_RGB_Green.png';
import logo from '../../../public/logo.png';
import Layout from '@/components/layout';

const navigation = [
  { name: 'about us', href: '/aboutus' },
  { name: 'users', href: '/users' },
  { name: 'dashboard', href: '/dashboard' },
  { name: 'profile', href: '/users/1234/profile' },
];

function Profile({ providers }) {
  //userid should be used to get data related to user to display on page
  const router = useRouter();
  const userId = router.query.userId;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  //add some call to add stuff to mongodb database
  const followUser = () => {
    console.log('followed user(#' + { userId } + ')');
  };

  return (
    <div>
      <Layout providers={providers}>
        {/* body */}
        <div className='min-h-screen bg-black pb-5'>
          <div className='flex mx-auto flex-col w-8/12 align-middle gap-3'>
            {/* profile header */}
            <div className=''>
              <div className='flex container flex-row text-white justify-between px-2 pt-3 text-md'>
                {/** left */}
                <div className='text-3xl'>PROFILE(user #{userId})</div>
                {/** right */}
                <div className='flex h-auto w-32'>
                  <Image className='' src={spotify_logo} alt='spotify logo' />
                </div>
              </div>
            </div>
            {/** profile image, username/details, follow button*/}
            <div className=''>
              <div className='flex container flex-row text-white justify-left pt-3 text-md'>
                {/** left */}
                <div className='flex w-4/12 text-3xl pl-2 pt-2 pb-2'>
                  <div className='w-auto h-auto'>
                    <img
                      className='flex shrink bg-cover lg:h-52 lg:w-52 md:h-36 md:w-36 rounded-full'
                      src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                      alt='logo'
                    ></img>
                  </div>
                </div>
                {/** right */}
                <div className='flex shrink flex-col w-9/12'>
                  <div className='lg:text-6xl md:text-4xl pt-4 break-words'>
                    DISPLAY_NAME
                  </div>
                  <button
                    className='ml-1 mt-3 border-solid border-2 w-32 h-8'
                    onClick={followUser}
                  >
                    Follow +
                  </button>
                </div>
              </div>
            </div>
            {/** list of top 5 most listened tracks of the user */}
            <div className='lg:ml-12 md:ml-6 w-11/12'>
              <div className='flex container flex-row text-white justify-between px-2 pt-2 pb-2 text-md'>
                <div className='flex'>Most Listened Tracks</div>
                <div className='flex text-blue-400 '>Show More</div>
              </div>
              {/* follwed users carousel/scroll */}
              <div className='flex flex-col gap-3 snap-x snap-proximity'>
                {/* list elements should be dynamically created later */}
                <div className='flex flex-row text-white justify-left gap-2 px-2 snap-center scroll-smooth overflow-x-auto'>
                  <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                    <img
                      className='h-32 w-32 '
                      src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                      alt='logo'
                    ></img>
                    <div className='text-left'>Track1</div>
                  </div>
                  <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                    <img
                      className='h-32 w-32 '
                      src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                      alt='logo'
                    ></img>
                    <div className='text-left'>Track2</div>
                  </div>
                  <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                    <img
                      className='h-32 w-32 '
                      src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                      alt='logo'
                    ></img>
                    <div className='text-left'>Track3</div>
                  </div>
                  <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                    <img
                      className='h-32 w-32 '
                      src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                      alt='logo'
                    ></img>
                    <div className='text-left'>Track4</div>
                  </div>
                  <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                    <img
                      className='h-32 w-32 '
                      src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                      alt='logo'
                    ></img>
                    <div className='text-left'>Track5</div>
                  </div>
                </div>
              </div>
            </div>
            {/* followed list */}
            <div>
              <div className='flex container flex-row text-white justify-between px-2 pt-2 pb-2 text-md'>
                <div className='flex'>Followed Users</div>
                <div className='flex text-blue-400 '>Show More</div>
              </div>
              {/* follwed users carousel/scroll */}
              <div className='flex flex-col gap-3 snap-x snap-proximity'>
                {/* list elements should be dynamically created later */}
                <div className='flex flex-row text-white justify-left gap-2 px-2 snap-center scroll-smooth overflow-x-auto'>
                  <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                    <img
                      className='h-32 w-32 rounded-full'
                      src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                      alt='logo'
                    ></img>
                    <div className='text-center p-1'>User1</div>
                  </div>
                  <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                    <img
                      className='h-32 w-32 rounded-full'
                      src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                      alt='logo'
                    ></img>
                    <div className='text-center p-1'>User2</div>
                  </div>
                  <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                    <img
                      className='h-32 w-32 rounded-full'
                      src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                      alt='logo'
                    ></img>
                    <div className='text-center p-1'>User3</div>
                  </div>
                  <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                    <img
                      className='h-32 w-32 rounded-full'
                      src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                      alt='logo'
                    ></img>
                    <div className='text-center p-1'>User4</div>
                  </div>
                  <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                    <img
                      className='h-32 w-32 rounded-full'
                      src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                      alt='logo'
                    ></img>
                    <div className='text-center p-1'>User5</div>
                  </div>
                  <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                    <img
                      className='h-32 w-32 rounded-full'
                      src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                      alt='logo'
                    ></img>
                    <div className='text-center p-1'>User6</div>
                  </div>
                  <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                    <img
                      className='h-32 w-32 rounded-full'
                      src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                      alt='logo'
                    ></img>
                    <div className='text-center p-1'>User7</div>
                  </div>
                  <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                    <img
                      className='h-32 w-32 rounded-full'
                      src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                      alt='logo'
                    ></img>
                    <div className='text-center p-1'>User8</div>
                  </div>
                </div>
              </div>
            </div>
            {/* followers list */}
            <div>
              <div className='flex container flex-row text-white justify-between px-2 pt-2 pb-2 text-md'>
                <div className='flex'>Followers</div>
                <div className='flex text-blue-400 '>Show More</div>
              </div>
              {/* section 2 elements */}
              <div className='flex flex-col gap-3 snap-x snap-proximity'>
                {/* list elements should be dynamically created later */}
                <div className='flex flex-row text-white justify-left gap-2 px-2 snap-center scroll-smooth overflow-x-auto'>
                  <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                    <img
                      className='h-32 w-32 rounded-full'
                      src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                      alt='logo'
                    ></img>
                    <div className='text-center p-1'>User1</div>
                  </div>
                  <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                    <img
                      className='h-32 w-32 rounded-full'
                      src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                      alt='logo'
                    ></img>
                    <div className='text-center p-1'>User2</div>
                  </div>
                  <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                    <img
                      className='h-32 w-32 rounded-full'
                      src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                      alt='logo'
                    ></img>
                    <div className='text-center p-1'>User3</div>
                  </div>
                  <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                    <img
                      className='h-32 w-32 rounded-full'
                      src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                      alt='logo'
                    ></img>
                    <div className='text-center p-1'>User4</div>
                  </div>
                  <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                    <img
                      className='h-32 w-32 rounded-full'
                      src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                      alt='logo'
                    ></img>
                    <div className='text-center p-1'>User5</div>
                  </div>
                  <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                    <img
                      className='h-32 w-32 rounded-full'
                      src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                      alt='logo'
                    ></img>
                    <div className='text-center p-1'>User6</div>
                  </div>
                  <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                    <img
                      className='h-32 w-32 rounded-full'
                      src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                      alt='logo'
                    ></img>
                    <div className='text-center p-1'>User7</div>
                  </div>
                  <div className='flex flex-col w-32 align-middle rounded-lg gap-2 min-w-min  h-fit shrink-0'>
                    <img
                      className='h-32 w-32 rounded-full'
                      src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                      alt='logo'
                    ></img>
                    <div className='text-center p-1'>User8</div>
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

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default Profile;
