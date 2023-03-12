import { useRouter } from 'next/router';
import { useState } from 'react';
import { getProviders } from 'next-auth/react';
import Image from 'next/image';
import spotify_logo from '../../public/spotify-icons-logos/logos/01_RGB/02_PNG/Spotify_Logo_RGB_Green.png';
import Layout from '@/components/layout';

function UserList({ providers }) {
  //userid should be used to get data related to user to display on page
  const router = useRouter();
  const userId = router.query.userId;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  //add some call to add stuff to mongodb database
  const followUser = () => {
    console.log('followed user(#' + { userId } + ')');
  };

  return (
    <div className='min-h-screen dark:bg-[#000000]'>
      <Layout providers={providers}>
        <div className='h-max bg-black pb-5'>
          <div className='flex mx-auto flex-col w-8/12 align-middle gap-3'>
            {/* profile header */}
            <div className=''>
              <div className='flex container flex-row text-white justify-between px-2 pt-3 text-md'>
                {/** left */}
                <div className='text-3xl'>List of Active Users</div>
                {/** right */}
                <div className='flex h-auto w-32'>
                  <Image className='' src={spotify_logo} alt='spotify logo' />
                </div>
              </div>
            </div>
            {/** profile image, username/details, follow button*/}
            <div className='p-1 divide-y divide-solid gap-2'>
              <div className='flex flex-row text-white justify-left text-md rounded-full py-2 divide-x divide-solid divide-cyan-400'>
                {/** left user profile image*/}
                <div className='flex items-center w-2/12 shrink-0 text-3xl pt-2 pb-2'>
                  <div className='flex justify-center h-fit'>
                    <div className='w-auto h-auto'>
                      <img
                        className=' flex shrink-0 bg-cover lg:h-32 lg:w-32 sm:h-24 sm:w-24 rounded-full'
                        src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                        alt='logo'
                      ></img>
                    </div>
                  </div>
                </div>
                {/** right col */}
                <div className='flex shrink flex-col w-10/12 rounded-lg'>
                  <div className='flex-col py-1'>
                    {/** header with username and follow button */}
                    <div className='flex flex-row justify-between items-center flex-wrap ml-1'>
                      {/** left */}
                      <div className='lg:text-3xl md:text-3xl sm:text-3xl break-words pl-1'>
                        DISPLAY_NAME
                      </div>
                      {/** right */}
                      <button
                        className='border-solid border-2 w-28 h-7 border-cyan-500'
                        onClick={followUser}
                      >
                        Follow +
                      </button>
                    </div>

                    {/** tracks pertaining to user */}
                    <div className='ml-2 p-1 pb-2 divide-y divide-solid divide-zinc-700 '>
                      <div className='flex container flex-row text-white justify-between mb-1 text-md'>
                        <div className='flex'>Most Listened Tracks</div>
                        <div className='flex text-blue-400 '></div>
                      </div>
                      {/** dynamically pull top 3 songs from spotify based on user */}
                      {/* list of top 3 most listened tracks */}
                      <div className=' flex flex-col text-white justify-left gap-2 px-2 divide-y divide-solid divide-zinc-900'>
                        <div className='flex flex-row items-center gap-2 h-fit shrink-0 pt-0.5'>
                          <img
                            className='h-8 w-8'
                            src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                            alt='logo'
                          ></img>
                          <div className='flex container flex-row justify-between'>
                            <div className=''>Song_name</div>
                            <div className=''>Artist | Album</div>
                          </div>
                        </div>
                        <div className='flex flex-row items-center gap-2 h-fit shrink-0 pt-0.5'>
                          <img
                            className='h-8 w-8'
                            src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                            alt='logo'
                          ></img>
                          <div className='flex container flex-row justify-between'>
                            <div className=''>Song_name</div>
                            <div className=''>Artist | Album</div>
                          </div>
                        </div>
                        <div className='flex flex-row items-center gap-2 h-fit shrink-0 pt-0.5'>
                          <img
                            className='h-8 w-8'
                            src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                            alt='logo'
                          ></img>
                          <div className='flex container flex-row justify-between'>
                            <div className=''>Song_name</div>
                            <div className=''>Artist | Album</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='p-1 divide-y divide-solid gap-2'>
              <div className='flex flex-row text-white justify-left text-md rounded-full py-2 divide-x divide-solid divide-cyan-400'>
                {/** left user profile image*/}
                <div className='flex items-center w-2/12 shrink-0 text-3xl pt-2 pb-2'>
                  <div className='flex justify-center h-fit'>
                    <div className='w-auto h-auto'>
                      <img
                        className=' flex shrink-0 bg-cover lg:h-32 lg:w-32 sm:h-24 sm:w-24 rounded-full'
                        src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                        alt='logo'
                      ></img>
                    </div>
                  </div>
                </div>
                {/** right col */}
                <div className='flex shrink flex-col w-10/12 rounded-lg'>
                  <div className='flex-col py-1'>
                    {/** header with username and follow button */}
                    <div className='flex flex-row justify-between items-center flex-wrap ml-1'>
                      {/** left */}
                      <div className='lg:text-3xl md:text-3xl sm:text-3xl break-words pl-1'>
                        DISPLAY_NAME
                      </div>
                      {/** right */}
                      <button
                        className='border-solid border-2 w-28 h-7 border-cyan-500'
                        onClick={followUser}
                      >
                        Follow +
                      </button>
                    </div>

                    {/** tracks pertaining to user */}
                    <div className='ml-2 p-1 pb-2 divide-y divide-solid divide-zinc-700 '>
                      <div className='flex container flex-row text-white justify-between mb-1 text-md'>
                        <div className='flex'>Most Listened Tracks</div>
                        <div className='flex text-blue-400 '></div>
                      </div>
                      {/** dynamically pull top 3 songs from spotify based on user */}
                      {/* list of top 3 most listened tracks */}
                      <div className=' flex flex-col text-white justify-left gap-2 px-2 divide-y divide-solid divide-zinc-900'>
                        <div className='flex flex-row items-center gap-2 h-fit shrink-0 pt-0.5'>
                          <img
                            className='h-8 w-8'
                            src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                            alt='logo'
                          ></img>
                          <div className='flex container flex-row justify-between'>
                            <div className=''>Song_name</div>
                            <div className=''>Artist | Album</div>
                          </div>
                        </div>
                        <div className='flex flex-row items-center gap-2 h-fit shrink-0 pt-0.5'>
                          <img
                            className='h-8 w-8'
                            src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                            alt='logo'
                          ></img>
                          <div className='flex container flex-row justify-between'>
                            <div className=''>Song_name</div>
                            <div className=''>Artist | Album</div>
                          </div>
                        </div>
                        <div className='flex flex-row items-center gap-2 h-fit shrink-0 pt-0.5'>
                          <img
                            className='h-8 w-8'
                            src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                            alt='logo'
                          ></img>
                          <div className='flex container flex-row justify-between'>
                            <div className=''>Song_name</div>
                            <div className=''>Artist | Album</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='p-1 divide-y divide-solid gap-2'>
              <div className='flex flex-row text-white justify-left text-md rounded-full py-2 divide-x divide-solid divide-cyan-400'>
                {/** left user profile image*/}
                <div className='flex items-center w-2/12 shrink-0 text-3xl pt-2 pb-2'>
                  <div className='flex justify-center h-fit'>
                    <div className='w-auto h-auto'>
                      <img
                        className=' flex shrink-0 bg-cover lg:h-32 lg:w-32 sm:h-24 sm:w-24 rounded-full'
                        src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                        alt='logo'
                      ></img>
                    </div>
                  </div>
                </div>
                {/** right col */}
                <div className='flex shrink flex-col w-10/12 rounded-lg'>
                  <div className='flex-col py-1'>
                    {/** header with username and follow button */}
                    <div className='flex flex-row justify-between items-center flex-wrap ml-1'>
                      {/** left */}
                      <div className='lg:text-3xl md:text-3xl sm:text-3xl break-words pl-1'>
                        DISPLAY_NAME
                      </div>
                      {/** right */}
                      <button
                        className='border-solid border-2 w-28 h-7 border-cyan-500'
                        onClick={followUser}
                      >
                        Follow +
                      </button>
                    </div>

                    {/** tracks pertaining to user */}
                    <div className='ml-2 p-1 pb-2 divide-y divide-solid divide-zinc-700 '>
                      <div className='flex container flex-row text-white justify-between mb-1 text-md'>
                        <div className='flex'>Most Listened Tracks</div>
                        <div className='flex text-blue-400 '></div>
                      </div>
                      {/** dynamically pull top 3 songs from spotify based on user */}
                      {/* list of top 3 most listened tracks */}
                      <div className=' flex flex-col text-white justify-left gap-2 px-2 divide-y divide-solid divide-zinc-900'>
                        <div className='flex flex-row items-center gap-2 h-fit shrink-0 pt-0.5'>
                          <img
                            className='h-8 w-8'
                            src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                            alt='logo'
                          ></img>
                          <div className='flex container flex-row justify-between'>
                            <div className=''>Song_name</div>
                            <div className=''>Artist | Album</div>
                          </div>
                        </div>
                        <div className='flex flex-row items-center gap-2 h-fit shrink-0 pt-0.5'>
                          <img
                            className='h-8 w-8'
                            src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                            alt='logo'
                          ></img>
                          <div className='flex container flex-row justify-between'>
                            <div className=''>Song_name</div>
                            <div className=''>Artist | Album</div>
                          </div>
                        </div>
                        <div className='flex flex-row items-center gap-2 h-fit shrink-0 pt-0.5'>
                          <img
                            className='h-8 w-8'
                            src='https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                            alt='logo'
                          ></img>
                          <div className='flex container flex-row justify-between'>
                            <div className=''>Song_name</div>
                            <div className=''>Artist | Album</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      {/** header */}

      {/* body */}
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

export default UserList;

//use 0 as no id inputted and do something else to handle this case
//external websites links will use normal html anchor tag
//use Link for internal links, else you would reset any client state you are currently maintaining
// function userList({userId = 0}){
//     return(
//         <div className="container">
//             <Link href='/'>
//                 <div>
//                 <a>homepage</a>
//                 </div>
//             </Link>
//             <Link href={`/users/${userId}`}>
//                 <div>
//                 <a>user 1</a>
//                 </div>
//             </Link>
//             <Link href={`/users/${userId}`}>
//                 <div>
//                     <a>user {userId}</a>
//                 </div>
//             </Link>
//         </div>
//     )
// }

// export default userList
