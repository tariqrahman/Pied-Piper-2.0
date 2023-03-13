import { getSession } from "next-auth/react";
export default function MyPage({ profileData },{ topTrackData }) {
    var userData = profileData;
    //console.log(spotifyData)
    return (
      <div>
        {/* <h1>{data.display_name}'s Spotify Account</h1>
        <p>Followers: {data.followers.total}</p>
        <p>Product: {data.product}</p> */}

        <button onClick={() =>generateData(profileData,topTrackData)}>LOAD DATA</button>
      </div>
    );
  }

export async function getServerSideProps({req}) {
    const session = await getSession({req});
    const SPOTIFY_PROFILE_ENDPOINT = 'https://api.spotify.com/v1/me';
    const SPOTIFY_TOP_TRACK_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50&offset=0';
    // const SPOTIFY_TOP_TRACK_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks';
    const SPOTIFY_TOP_ARTIST_ENDPOINT = "";
    const access_token = session.user.accessToken;
  
    //profile data
    const response1 = await fetch(SPOTIFY_PROFILE_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(response1)
    //top tracks data
    const response2 = await fetch(SPOTIFY_TOP_TRACK_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
            limit: 5,
            total: 5,
            

        }
      });
      console.log(response2)
    const profileData = await response1.json();
    const topTrackData = await response2.json();

    return {
      props: {
        profileData,
        topTrackData,
      },
    };
  }

  export async function generateData(profileData,topTrackData){
    postUserData(profileData);
    postUserTopTracks(topTrackData);
  }
  
  export async function postUserData(SpotifyData){
    console.log(SpotifyData)
    console.log("in post request func")
    const response = await 
    fetch("/api/postUser", {
      method: "POST",
      body: JSON.stringify(SpotifyData),
      //body: enteredData,
      headers: 
      {
        "Content-Type": 
        "application/json",
      },
    });
    const respData = await response;
  }

  export async function postUserTopTracks(SpotifyData){
    console.log(SpotifyData)
    console.log("in post request func")
    const response = await 
    fetch("/api/postTrack", {
      method: "POST",
      body: JSON.stringify(SpotifyData),
      //body: enteredData,
      headers: 
      {
        "Content-Type": 
        "application/json",
      },
      collection: "user-top-tracks",
    });
    const respData = await response;
  }