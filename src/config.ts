import {
  FrameImageMetadata,
  getFrameMetadata,
} from '@coinbase/onchainkit/frame'
import env from '@/env'
import ResponseType from '@/types/ResponseType'

const picFolderUrl = env.SITE_URL

export const getImage = (imageType: ResponseType) => {
  return {
    [ResponseType.SUCCESS]: picFolderUrl + '/claimed.jpg',
    [ResponseType.ALREADY_MINTED]: picFolderUrl + '/claimed.jpg',
    [ResponseType.RECAST]: picFolderUrl + '/recast.jpg',
    [ResponseType.NO_ADDRESS]: picFolderUrl + '/no-address.png',
    [ResponseType.ERROR]: picFolderUrl + '/error.png',
    [ResponseType.GENERAL]: picFolderUrl + '/general.jpg',
  }[imageType]
}

const imageData: FrameImageMetadata = {
  src: getImage(ResponseType.GENERAL),
  aspectRatio: '1:1',
}

export const FRAME_METADATA = getFrameMetadata({
  buttons: [{ label: 'Check' }],
  image: imageData,
  postUrl: `${env.SITE_URL}/api/frame`,
})
