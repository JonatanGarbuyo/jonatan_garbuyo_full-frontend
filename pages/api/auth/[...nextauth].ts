import { refreshAccessToken } from 'lib/spotify'
import NextAuth from 'next-auth'

import SpotifyProvider from 'next-auth/providers/spotify'

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID || '',
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
      authorization: {
        url: 'https://accounts.spotify.com/authorize?',
        params: {
          scope: 'user-read-email user-library-modify user-library-read',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        const expires = account.expires_at || 1
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + expires * 1000,
          refreshToken: account.refresh_token,
          user,
        }
      }
      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token
      }
      // Access token has expired, try to update it
      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.user = token.user
      session.accessToken = token.accessToken
      session.error = token.error

      return session
    },
  },
})
