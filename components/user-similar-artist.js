import { useSession, signIn, signOut } from "next-auth/react";

// Note: props to pass include username, user profile picture, artist that is shared
export default function UserSimilarArtist({ ...props }) {
  return (
    <>
      <div className="flex flex-row align-middle rounded-lg p-2 gap-2 grow">
        <img
          className="h-20 bg-cover w-20 rounded-full "
          src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt="logo"
        ></img>

        <div className="flex flex-col">
          <div className="flex text-lg">Username</div>
          {/* Link to spotify page for __*/}
          <div className="flex text-md text-zinc-500">Artist placeholder</div>
        </div>
      </div>
    </>
  );
}
