import axios from 'axios'
import env from '@/env'
import BackendResponse from '@/types/Backend'
import formatUSA from './helpers/formatUSA'

const { BACKEND_URL } = env

export async function setUserClaimed(address: string) {
  try {
    const { data } = await axios.post<{ success: boolean }>(
      BACKEND_URL + '/nothingFrame',
      { address }
    )
    return data.success
  } catch (e) {
    console.error('Err on setting user claimed')
    console.error(e)
  }
}

export async function getStep2(address: string) {
  try {
    const { data } = await axios.get<BackendResponse>(
      BACKEND_URL + '/nothingFrame',
      { params: { address } }
    )
    return data
  } catch (e) {
    console.error('Err on step2')
    console.error(e)
  }
}

export function shareOnWarpCast(data: BackendResponse) {
  return encodeURI(
    `https://warpcast.com/~/compose?text=I got ${formatUSA(data.points)} Nothing\n10/09/24 ???\n@justnothing&embeds[]=${env.SITE_URL}`
  )
}
