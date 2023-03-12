import '@/styles/globals.css'
import '@/styles/styles.css'
import { SessionProvider } from 'next-auth/react';



export default function App({ Component, pageProps }) {
  // pass higher order component by wrapping the rest of the app, meaning we can persist the login state while navigating app
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
