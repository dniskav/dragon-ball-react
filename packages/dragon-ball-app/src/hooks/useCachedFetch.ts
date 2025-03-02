import { useState, useEffect } from 'react'

interface CacheData<T> {
  timestamp: number
  data: T
}

const DEFAULT_EXPIRATION = 24 * 60 // 24 horas en minutos

export const useCachedFetch = <T>(
  key: string,
  fetchFunction: () => Promise<T>,
  expirationMinutes: number = DEFAULT_EXPIRATION
) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const cached = localStorage.getItem(key)
        if (cached) {
          const parsedCache: CacheData<T> = JSON.parse(cached)
          const now = Date.now()
          const expirationTime =
            parsedCache.timestamp + expirationMinutes * 60 * 1000

          if (now < expirationTime) {
            setData(parsedCache.data)
            setLoading(false)
            return
          }
        }

        const result = await fetchFunction()

        localStorage.setItem(
          key,
          JSON.stringify({
            timestamp: Date.now(),
            data: result,
          })
        )

        setData(result)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [key, fetchFunction, expirationMinutes])

  return { data, loading, error }
}
