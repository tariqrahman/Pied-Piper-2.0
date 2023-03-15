import { useRouter } from "next/router";
import { useState } from "react";
import { getProviders } from "next-auth/react";
import Image from "next/image";
import spotify_logo from "../../public/spotify-icons-logos/logos/01_RGB/02_PNG/Spotify_Logo_RGB_Green.png";
import Layout from "@/components/layout";
import Footer from "@/components/footer";
import UserOnUsers from "../../components/userinfo-users";

function UserList({ providers }) {
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
      <Layout providers={providers}>
        <div className="h-max bg-zinc-900 pb-5">
          <div className="flex mx-auto flex-col w-8/12 align-middle gap-3">
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
            <UserOnUsers></UserOnUsers>
            <UserOnUsers></UserOnUsers>
            <UserOnUsers></UserOnUsers>
          </div>
        </div>
      </Layout>
      <Footer></Footer>
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
