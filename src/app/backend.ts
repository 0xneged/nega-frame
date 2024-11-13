import axios from 'axios'
import env from '@/env'

const { BACKEND_URL } = env
const negaFrame = BACKEND_URL + '/nega-frame'

export async function setUserClaimed(address: string) {
  try {
    const { data } = await axios.post<{ success: boolean }>(negaFrame, {
      address,
    })
    return data.success
  } catch (e) {
    console.error('Err on setting user claimed')
    console.error(e)
  }
}

export function shareOnWarpCast() {
  return encodeURI(
    `https://warpcast.com/~/compose?text=Make NEged Great Again! [$NEGA]&embeds[]=${env.SITE_URL}`
  )
}
