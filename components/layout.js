import { Bars3Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/logo.png';
import { useSession, getSession, signIn, signOut } from 'next-auth/react';
import handleAlert from '@/lib/helpers';

//has props provider, curUser
export default function Layout({ ...props }) {
  const { data: session, status } = useSession();
  const navigation = [
    { name: 'about us', href: '/aboutus' },
    { name: 'users', href: '/users' },
    { name: 'dashboard', href: '/dashboard' },

  ];
  if(session){
  const username = Object.entries(props.currentUser)[1][1];
  const test = Object.entries(props.currentUser).map(user => user.id);
  console.log('test output' + test)
    console.log(username);
    navigation.push({ name: 'profile', href: `/users/${username}/profile` });
  }else{
    navigation.push({ name: 'profile', href: `/users/notlogged/profile` });
  }
  return (
    <>
      {/** header */}
      
      <div className='isolate bg-black border-b border-zinc-800 text-white'>
        {/*navbar container*/}
        <div className=''>
          {/* navbar header */}
          <nav
            className='flex items-center justify-between py-3 px-10'
            aria-label='Global'
          >
            <div className='flex lg:flex-1'>
              <Link href='/' className=' -m-1.5 p-1.5'>
                <div className='flex flex-row items-center gap-2.5'>
                  <Image className='flex' src={logo} alt='company logo' />
                  <div className='flex text-xl company-text'>AudioLink</div>
                </div>
              </Link>
            </div>
            <div className='flex lg:hidden'>
              <button
                type='button'
                className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-300'
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className='sr-only'>Open main menu</span>
                <Bars3Icon className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>
            {/* navbar is here */}
            <div className='hidden lg:flex lg:gap-x-12'>
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className='text-sm font-semibold leading-6 text-zinc-300'
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
              {Object.values(props.providers).map((provider) => (
                <div key={provider.name}>
                  {session && (
                    <>
                      <button
                        className='text-sm font-semibold leading-6 text-zinc-300'
                        onClick={() => {
                          signOut(provider.id, { callbackUrl: '/' });
                          handleAlert();
                        }}
                      >
                        {' '}
                        log out <span aria-hidden='true'>&rarr;</span>
                      </button>
                    </>
                  )}
                  {/* Allow sign-in functionality when the user is logged out */}
                  {!session && (
                    <>
                      <button
                        className='text-sm font-semibold leading-6 text-zinc-300'
                        onClick={() => {
                          signIn(provider.id, { callbackUrl: '/' });
                        }}
                      >
                        {' '}
                        log in <span aria-hidden='true'>&rarr;</span>
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>
      </div>
      <main>{props.children}</main>
    </>
  );
}

// export async function getServerSideProps({req}){
//   try {
//   const session = await getSession({req});
//   const current_user = session.user.username;
//   console.log(current_user);

//     const client = await clientPromise;
//     const db = client.db("nextjs-mongodb-demo");
//     const userData = await db
//       .collections("users")
//       .find({})
//       .toArray();
//     res.json(userData);
//     console.log(res);
//   }catch(e) {
//     console.error(e);
//   }

//   return {
//     props: {
      
//       userData,
//     }
//   }
// }

