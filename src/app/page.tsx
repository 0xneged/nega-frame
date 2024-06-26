import {
  CHAIN,
  CONTRACT_ADDRESS,
  FRAME_METADATA,
  SITE_URL,
} from '@/config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: SITE_URL ? new URL(SITE_URL) : undefined,
  title: 'Neged Claim Frame',
  other: FRAME_METADATA,
  openGraph: {
       type: "website",
       title: "Neged Claim Frame",
       images: [{
         url: "https://gateway.lighthouse.storage/ipfs/bafybeibx2afoamzspuelag4tbczahvymba7vcha2smpkf2xmezm7f2eepa/general.jpg",
       }],
     }
};

export default function Home() {
  return (
    <div style={{ minHeight: '100dvh', display: 'flex' }}>
        <a
          href={`https://warpcast.com/~/channel/neged`}
          style={{ color: 'inherit' }}
        >
          Claim your airdrop
        </a>
    </div>
  );
}
