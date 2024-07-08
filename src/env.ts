import { cleanEnv, str } from 'envalid'

export default cleanEnv(process.env, {
  BACKEND_URL: str({ default: 'http://localhost:1337' }),
  NEYNAR_API_KEY: str(),
  SITE_URL: str({
    default: process.env.NEXT_PUBLIC_SITE_URL,
    devDefault: 'http://localhost:3000/',
  }),
})
