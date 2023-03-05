import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { LOGIN_URL } from "@/lib/spotify";
import spotifyApi from "@/lib/spotify";


async function refreshAccessToken(token) {
    try {
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);

        const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
        
        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now + refreshedToken.expires_in * 1000,

            refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
        };

    } catch (error) {
        console.log(error);

        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/index'
  },
  callbacks: {
    async jwt({ token, account, user }) {
        // initial sign in
        if (account && user) {
            return {
                ...token,
                accessToken: account.access_token,
                refreshToken: account.refresh_token,
                username: account.providerAccountId,
                // convert to ms, 1 hour from time of initial token generation
                accessTokenExpires: account.expires_at * 1000,
            }
        }
        // check if token at current time hasn't expired, return token if valid
        if (Date.now() < token.accessTokenExpires) {
            console.log("Existing token valid");
            return token;
        }

        console.log("Access token expired, refreshing...");
        return await refreshAccessToken(token);

    },

    async session({ session, token }) {
        // stuff the client needs to know
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.username = token.username;

        return session;
    }


  }
}

export default NextAuth(authOptions)