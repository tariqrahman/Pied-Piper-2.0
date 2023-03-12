import { Bars3Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/logo.png';
import { useSession, signIn, signOut } from 'next-auth/react';
import handleAlert from '@/lib/helpers';

const navigation = [
  { name: 'about us', href: '/aboutus' },
  { name: 'users', href: '/users' },
  { name: 'dashboard', href: '/dashboard' },
  { name: 'profile', href: '/users/1234/profile' },
];

export default function Layout({ ...props }) {
  const { data: session, status } = useSession();
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
