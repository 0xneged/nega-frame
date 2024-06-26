import { base } from 'viem/chains';
import { FrameImageMetadata, getFrameMetadata } from '@coinbase/onchainkit/frame';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export const CHAIN = base;
export const CONTRACT_ADDRESS = '0x4229c271c19ca5f319fb67b4bc8a40761a6d6299';

const imageData: FrameImageMetadata = {
	src: `https://gateway.lighthouse.storage/ipfs/bafybeibx2afoamzspuelag4tbczahvymba7vcha2smpkf2xmezm7f2eepa/general.jpg`,
	aspectRatio: '1:1' // или '1.91:1'
};

export const FRAME_METADATA = getFrameMetadata({
  buttons: [{
		label: 'Eligibility Checker',
	},],
  image: imageData,
  post_url: `${SITE_URL}/api/frame`,
});
