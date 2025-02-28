import { useEffect, useState } from 'react'

export const useHttpInterceptor = () => {
  const [progress, setProgress] = useState<number>(0)
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>(
    'idle'
  )

  useEffect(() => {
    const originalFetch = window.fetch

    window.fetch = async (
      input: RequestInfo | URL,
      init?: RequestInit
    ): Promise<Response> => {
      setStatus('loading')
      setProgress(0)

      const response = await originalFetch(input, init)
      const contentLength = response.headers.get('content-length')

      if (!response.body || !contentLength) {
        console.warn('⚠️ No se puede calcular el progreso.')
        setStatus('done')
        return response
      }

      const total = parseInt(contentLength, 10)
      let loaded = 0

      const reader = response.body.getReader()
      const stream = new ReadableStream({
        async start(controller) {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            loaded += value.length
            const progressPercentage = Math.round((loaded / total) * 100)
            setProgress(progressPercentage)
            controller.enqueue(value)
          }
          controller.close()
        },
      })

      setStatus('done')

      return new Response(stream, {
        headers: response.headers,
        status: response.status,
        statusText: response.statusText,
      })
    }

    return () => {
      window.fetch = originalFetch
    }
  }, [])

  return [progress, status] as const
}
