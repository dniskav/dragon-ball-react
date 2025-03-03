import { useEffect, useState, useRef } from 'react'

export const useHttpInterceptor = () => {
  const [progress, setProgress] = useState<number>(0)
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>(
    'idle'
  )
  const abortController = useRef<AbortController | null>(null)

  useEffect(() => {
    const originalFetch = window.fetch

    window.fetch = async (
      input: RequestInfo | URL,
      init?: RequestInit
    ): Promise<Response> => {
      setStatus('loading')
      setProgress(0)

      if (abortController.current) {
        abortController.current.abort()
      }
      abortController.current = new AbortController()

      try {
        const response = await originalFetch(input, {
          ...init,
          signal: abortController.current.signal,
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const contentLength = response.headers.get('content-length')

        if (!response.body || !contentLength || !window.ReadableStream) {
          console.warn(
            '⚠️ No se puede calcular el progreso. Retornando respuesta original.'
          )
          setProgress(100)
          setStatus('done')
          return response.clone()
        }

        const total = parseInt(contentLength, 10)
        let loaded = 0

        const reader = response.body.getReader()
        const stream = new ReadableStream({
          async start(controller) {
            try {
              while (true) {
                const { done, value } = await reader.read()
                if (done) break
                loaded += value.length
                setProgress(Math.round((loaded / total) * 100))
                controller.enqueue(value)
              }
              controller.close()
              setStatus('done')
            } catch (error) {
              if ((error as Error).name === 'AbortError') {
                console.warn('⏹️ Fetch request aborted.')
              } else {
                console.error('❌ Error leyendo el stream:', error)
                setStatus('error')
              }
            }
          },
        })

        return new Response(stream, {
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
        })
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          console.warn('⏹️ Fetch request aborted.')
        } else {
          console.error('❌ Fetch error:', error)
          setStatus('error')
        }
        setProgress(100)
        throw error
      }
    }

    return () => {
      window.fetch = originalFetch
      abortController.current?.abort()
    }
  }, [])

  return [progress, status] as const
}
