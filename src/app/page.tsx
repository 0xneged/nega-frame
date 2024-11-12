import { FRAME_METADATA, getImage } from '@/config'
import env from '@/env'
import ResponseType from '@/types/ResponseType'
import { Metadata } from 'next'
import Home from './components/Home'

export const metadata: Metadata = {
  metadataBase: new URL(env.SITE_URL),
  title: 'negeD',
  icons: '/favicon.png',
  applicationName: 'negeD',
  description: '🔄🎩',
  other: FRAME_METADATA,
  openGraph: {
    type: 'website',
    title: 'negeD',
    images: [{ url: getImage(ResponseType.GENERAL) }],
  },
}

export default function Page() {
  return (
    <div
      style={{
        minHeight: '97.75dvh',
        overflow: 'hidden',
        display: 'flex',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: 'sans-serif',
      }}
    >
      <Home />
    </div>
  )
}
