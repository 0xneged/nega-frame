import axios from 'axios'
import env from '@/env'

const { BACKEND_URL } = env

export async function addUser(address: string) {
  try {
    await axios.post(BACKEND_URL + '/frame', { address })
  } catch (e) {
    console.error(e)
  }
}

export function shareOnWarpCast() {
  return `https://warpcast.com/~/compose?text=I just claimed 1000 HATs from @neged!&embeds[]=${env.SITE_URL}`
}
