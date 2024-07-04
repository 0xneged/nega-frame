import { FRAME_METADATA, getImage } from '@/config'
import env from '@/env'
import ResponseType from '@/types/ResponseType'
import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(env.SITE_URL),
  title: 'negeD Claim Frame',
  other: FRAME_METADATA,
  openGraph: {
    type: 'website',
    title: 'negeD Claim Frame',
    images: [{ url: getImage(ResponseType.GENERAL) }],
  },
}

export default function Home() {
  return (
    <div style={{ minHeight: '100dvh', display: 'flex' }}>
      <a
        href={`https://warpcast.com/~/channel/neged`}
        style={{ color: 'inherit' }}
      >
        Claim your HATs
      </a>
    </div>
  )
}
