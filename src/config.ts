import {
  FrameImageMetadata,
  getFrameMetadata,
} from '@coinbase/onchainkit/frame'
import env from '@/env'
import ResponseType from '@/types/ResponseType'

const picFolderUrl = env.SITE_URL

export const getImage = (imageType: ResponseType) => {
  return {
    [ResponseType.SUCCESS]: picFolderUrl + '/claimed.png',
    [ResponseType.ALREADY_MINTED]: picFolderUrl + '/claimed.png',
    [ResponseType.RECAST]: picFolderUrl + '/recast.png',
    [ResponseType.NO_ADDRESS]: picFolderUrl + '/no-address.png',
    [ResponseType.ERROR]: picFolderUrl + '/error.png',
    [ResponseType.GENERAL]: picFolderUrl + '/general.png',
  }[imageType]
}

const imageData: FrameImageMetadata = {
  src: getImage(ResponseType.GENERAL),
  aspectRatio: '1:1',
}

export const FRAME_METADATA = getFrameMetadata({
  buttons: [{ label: 'Receive Nothing' }],
  image: imageData,
  postUrl: `${env.SITE_URL}/api/frame`,
})
