import { setUserClaimed, shareOnWarpCast } from '@/app/backend'
import { getImage } from '@/config'
import { NextRequest, NextResponse } from 'next/server'
import { Address } from 'viem'
import ResponseType from '@/types/ResponseType'
import env from '@/env'
import RequestBody from '@/types/RequestBody'

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body: RequestBody = await req.json()
    const status = await validateFrameRequest(body.trustedData?.messageBytes)

    if (!status?.valid) {
      console.error('Error validating frame')
      console.error(status)
      return getResponse(ResponseType.ERROR)
    }

    const userFid = status?.action?.interactor?.fid
      ? JSON.stringify(status.action.interactor.fid)
      : null

    if (!userFid) {
      console.error('No user fid')
      return getResponse(ResponseType.ERROR)
    }

    const context = status?.action?.cast?.viewer_context
    const hasLikedAndRecasted = !!context?.liked && !!context?.recasted

    if (!hasLikedAndRecasted) return getResponse(ResponseType.RECAST)

    const userAddress: Address | undefined =
      status?.action?.interactor?.verifications?.[0] ||
      status?.action?.interactor?.custody_address

    if (!userAddress) return getResponse(ResponseType.NO_ADDRESS)

    const success = await setUserClaimed(userAddress)
    if (!success) return getResponse(ResponseType.ERROR)

    return getResponse(ResponseType.SUCCESS)
  } catch (e) {
    console.error(e)
    return getResponse(ResponseType.ERROR)
  }
}

// <meta name="fc:frame:button:3" content="usrs: ${success.totalUsers}" />

function getResponse(type: ResponseType) {
  const image = getImage(type)
  const shouldRetry =
    type === ResponseType.ERROR || type === ResponseType.RECAST
  const isSuccess =
    type === ResponseType.SUCCESS || type === ResponseType.ALREADY_MINTED

  return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${image}" />
    <meta property="fc:frame:image:aspect_ratio" content="1:1" />
    <meta property="fc:frame:post_url" content="${env.SITE_URL}/api/frame" />
    
    ${
      isSuccess
        ? `<meta name="fc:frame:button:1" content="Share 🔄" />
        <meta name="fc:frame:button:1:action" content="link" />
        <meta name="fc:frame:button:1:target" content="${shareOnWarpCast()}" />
        <meta name="fc:frame:button:2:action" content="link" />
        		<meta name="fc:frame:button:2:target" content=${env.SOCIAL_PAGE} />
            
        `
        : shouldRetry
          ? `
          <meta name="fc:frame:button:1" content="Try again" />
          <meta name="fc:frame:post_url" content="${env.SITE_URL}"
				`
          : `
        <meta name="fc:frame:button:1" content="Check" />
        <meta name="fc:frame:button:1:action" content="post" />
        <meta name="fc:frame:button:1:target" content="${env.SITE_URL}/api/frame/" />
      `
    }
  </head></html>`)
}

async function validateFrameRequest(data: string | undefined) {
  if (!data) throw new Error('No data provided')

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      api_key: env.NEYNAR_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ message_bytes_in_hex: data }),
  }

  return await fetch(
    'https://api.neynar.com/v2/farcaster/frame/validate',
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err))
}
