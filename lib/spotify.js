import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
    'user-top-read',
    'user-read-recently-played',
    'user-library-read',
].join(",");

// Programatically append scopes to end of params url associated with auth
const params = {
    scope: scopes,
};

const queryParamString = new URLSearchParams(params).toString();

const LOGIN_URL = "https://accounts.spotify.com/authorize?" + queryParamString;

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret:process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default spotifyApi;
export { LOGIN_URL };