// import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'

// declare module 'next-auth' {
/**
 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
 */
// interface Session {
//   token: any
//   user: {
//     name?: string
//     email?: string
//     image?: string
//   } //& DefaultSession['user']
// }

// /**
//  * The shape of the user object returned in the OAuth providers' `profile` callback,
//  * or the second parameter of the `session` callback, when using a database.
//  */
// interface User {}
// /**
//  * Usually contains information about the provider being used
//  * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
//  */
// interface Account {}
// /** The OAuth profile returned from your provider */
// interface Profile {}
// }

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessTokenExpires: number
    accessToken: string
    refreshToken: string
    token: {
      name: string
      email: string
      picture?: string
      sub: string
    }
    user: {
      id: string
      name: string
      email: string
      image?: string
    }
    iat: number
    exp: number
    jti: string
    // account: {
    //   provider: string
    //   type: string
    //   providerAccountId: string
    //   access_token: string
    //   token_type: 'Bearer'
    //   expires_at: number
    //   refresh_token: string
    //   scope: string
    // }
    // profile: {
    //   display_name: string
    //   email: string
    //   external_urls?: {
    //     spotify?: string
    //   }
    //   followers: {
    //     href?: string
    //     total: number
    //   }
    //   href: string
    //   id: string
    //   images: string[]
    //   type: string
    //   uri: string
    // }
    // isNewUser?: boolean
  }
}
