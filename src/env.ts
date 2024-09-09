import { cleanEnv, str } from 'envalid'

export default cleanEnv(process.env, {
  BACKEND_URL: str({ default: 'http://localhost:1337' }),
  NEYNAR_API_KEY: str(),
  SOCIAL_PAGE: str({ default: 'https://warpcast.com/justnothing' }),
  SITE_URL: str({
    default: process.env.NEXT_PUBLIC_SITE_URL,
  }),
})
