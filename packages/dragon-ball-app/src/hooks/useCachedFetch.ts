import { useState, useEffect } from 'react'

export const useCachedFetch = <T>(
  key: string,
  fetchFunction: () => Promise<T>,
  cacheTime = 1440
) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [fromCache, setFromCache] = useState(false)

  useEffect(() => {
    const cachedItem = localStorage.getItem(key)

    if (cachedItem) {
      const { data, timestamp } = JSON.parse(cachedItem)
      const now = new Date().getTime()
      const cacheExpiration = cacheTime * 60 * 1000

      if (now - timestamp < cacheExpiration) {
        setData(data)
        setLoading(false)
        setFromCache(true)
        return
      }
    }

    fetchFunction()
      .then((response) => {
        setData(response)
        setFromCache(false)
        localStorage.setItem(
          key,
          JSON.stringify({ data: response, timestamp: new Date().getTime() })
        )
      })
      .catch(setError)
      .finally(() => setLoading(false))
  }, [key, fetchFunction, cacheTime])

  return { data, loading, error, fromCache }
}
