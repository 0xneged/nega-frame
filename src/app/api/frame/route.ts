import { SITE_URL } from '@/config';
import { NextRequest, NextResponse } from 'next/server';
import { getUser, addUser } from './types';
import { Address } from 'viem';

const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY;

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body: { trustedData?: { messageBytes?: string } } = await req.json();

    // Check if frame request is valid
    const status = await validateFrameRequest(body.trustedData?.messageBytes);

    if (!status?.valid) {
      console.error(status);
      throw new Error('Invalid frame request');
    }

    const fid_new = status?.action?.interactor?.fid ? JSON.stringify(status.action.interactor.fid) : null;

    // Check if user has liked and recasted
    const hasLikedAndRecasted =
      !!status?.action?.cast?.viewer_context?.liked &&
      !!status?.action?.cast?.viewer_context?.recasted;

    if (!hasLikedAndRecasted) {
      return getResponse(ResponseType.RECAST);
    }

    // Check if user has liked and recasted
    const userFollow = await userInfo(Number(fid_new));
    let subs;

    if (!userFollow?.users) {
      console.error('not follow');
      throw new Error('Invalid frame request');
    } else {
      subs = userFollow?.users[0].viewer_context?.following;
      console.warn('followed');
      if (!subs) {
        return getResponse(ResponseType.RECAST);
      }
    }

    const address1: Address | undefined =
        status?.action?.interactor?.verifications?.[0];

    if (!address1) {
      return getResponse(ResponseType.NO_ADDRESS);
    }
    
    let recieveDrop: boolean = false;
		const username_new = status?.action?.interactor?.username ? JSON.stringify(status.action.interactor.username) : null;
		const wallet = status?.action?.interactor?.verifications?.[0] ? status.action.interactor.verifications?.[0] : null;

		const User = await getUser(fid_new);

		if (!User) {
			await addUser(fid_new, username_new, wallet);
		} else {
      recieveDrop = User.recievedrop;
		}

    if (recieveDrop) {
        return getResponse(ResponseType.ALREADY_MINTED);
    }

    return getResponse(ResponseType.SUCCESS);
  } catch (error) {
    console.error(error);
    return getResponse(ResponseType.ERROR);
  }
}

enum ResponseType {
  SUCCESS,
  RECAST,
  ALREADY_MINTED,
  NO_ADDRESS,
  ERROR
}

function getResponse(type: ResponseType) {
  const IMAGE = {
    [ResponseType.SUCCESS]: 'https://gateway.lighthouse.storage/ipfs/bafybeibx2afoamzspuelag4tbczahvymba7vcha2smpkf2xmezm7f2eepa/press.jpg',
    [ResponseType.RECAST]: 'https://gateway.lighthouse.storage/ipfs/bafybeibx2afoamzspuelag4tbczahvymba7vcha2smpkf2xmezm7f2eepa/recast.jpg',
    [ResponseType.ALREADY_MINTED]: 'https://gateway.lighthouse.storage/ipfs/bafybeibx2afoamzspuelag4tbczahvymba7vcha2smpkf2xmezm7f2eepa/claimed.jpg',
    [ResponseType.NO_ADDRESS]: 'https://gateway.lighthouse.storage/ipfs/bafybeibx2afoamzspuelag4tbczahvymba7vcha2smpkf2xmezm7f2eepa/no-address.png',
    [ResponseType.ERROR]: 'https://gateway.lighthouse.storage/ipfs/bafybeibx2afoamzspuelag4tbczahvymba7vcha2smpkf2xmezm7f2eepa/error.png',
  }[type];
  const shouldRetry =
    type === ResponseType.ERROR || type === ResponseType.RECAST || type === ResponseType.ALREADY_MINTED;
  return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${IMAGE}" />
    <meta property="fc:frame:image:aspect_ratio" content="1:1" />
    <meta property="fc:frame:post_url" content="${SITE_URL}/api/frame" />
    
    ${
      shouldRetry
        ? `<meta property="fc:frame:button:1" content="Try again" />
				    <meta name="fc:frame:button:2" content="Follow Neged" />
        		<meta name="fc:frame:button:2:action" content="link" />
        		<meta name="fc:frame:button:2:target" content="https://warpcast.com/neged" />
				`
			: 
      `
        <meta name="fc:frame:button:1" content="Claim 100 Neged" />
        <meta name="fc:frame:button:1:action" content="post" />
        <meta name="fc:frame:button:1:target" content="${SITE_URL}/api/frame/mint/" />
      `
    }
  </head></html>`);
}

async function validateFrameRequest(data: string | undefined) {
  if (!NEYNAR_API_KEY) throw new Error('NEYNAR_API_KEY is not set');
  if (!data) throw new Error('No data provided');

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      api_key: NEYNAR_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ message_bytes_in_hex: data }),
  };

  return await fetch(
    'https://api.neynar.com/v2/farcaster/frame/validate',
    options,
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

async function userInfo(data: number | null) {
  if (!NEYNAR_API_KEY) throw new Error('NEYNAR_API_KEY is not set');
  if (!data) throw new Error('No data provided');

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      api_key: NEYNAR_API_KEY,
    },
  };

  return await fetch(
    'https://api.neynar.com/v2/farcaster/user/bulk?fids=398355&viewer_fid='+ data,
    options,
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
}
