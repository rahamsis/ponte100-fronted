import useSWR from 'swr'
import { fetchTallerByUserId } from '../lib/actions'

export function useTalleres(userId: string | undefined) {
  return useSWR(
    userId ? ['talleres', userId] : null,
    ([id]) => fetchTallerByUserId(id),
    { refreshInterval: 10000 }
  )
}
