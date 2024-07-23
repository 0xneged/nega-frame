import axios from 'axios'
import env from '@/env'

const { BACKEND_URL } = env

export async function addUser(address: string) {
  try {
    const { data } = await axios.post<{ success: boolean }>(
      BACKEND_URL + '/frame',
      { address }
    )
    return data.success
  } catch (e) {
    console.error(e)
  }
}

export function shareOnWarpCast() {
  return `https://warpcast.com/~/compose?text=I just claimed some HATs from @neged!&embeds[]=${env.SITE_URL}`
}
