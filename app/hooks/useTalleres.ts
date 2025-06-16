import useSWR from 'swr'
import { fetchTallerByUserId } from '../lib/actions'

export function useTalleres(userId: string | undefined) {
  return useSWR(
    userId ? [userId] : null,
    ([id]) => fetchTallerByUserId(id),
    { refreshInterval: 5000 }
  )
}
