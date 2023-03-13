import { getSession } from "next-auth/react";
export default function MyPage({ data }) {
    return (
      <div>
        <h1>{data.display_name}'s Spotify Account</h1>
        <p>Followers: {data.followers.total}</p>
        <p>Product: {data.product}</p>
      </div>
    );
  }

export async function getServerSideProps({req}) {
    const session = await getSession({req});
    const SPOTIFY_API_ENDPOINT = 'https://api.spotify.com/v1/me';
    const access_token = session.user.accessToken;
  
    const response = await fetch(SPOTIFY_API_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(response)
    const data = await response.json();
    console.log(data)
    return {
      props: {
        data,
      },
    };
  }