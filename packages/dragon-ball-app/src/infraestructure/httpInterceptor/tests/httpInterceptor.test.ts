import { renderHook, act } from '@testing-library/react-hooks'
import { useHttpInterceptor } from '../httpInterceptor'

// Restore the original fetch before each test
beforeEach(() => {
  jest.restoreAllMocks()
})

describe('useHttpInterceptor', () => {
  it('should initialize with status "idle" and progress 0', () => {
    const { result } = renderHook(() => useHttpInterceptor())

    expect(result.current[0]).toBe(0) // Initial progress should be 0
    expect(result.current[1]).toBe('idle') // Initial status should be "idle"
  })

  it('should update status to "loading" when a request starts', async () => {
    const { result } = renderHook(() => useHttpInterceptor())

    global.fetch = jest.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify({ success: true }), {
          headers: { 'content-length': '100' }, // Mock content length
        })
      )
    ) as jest.Mock

    act(() => {
      fetch('/test-url')
    })

    expect(result.current[1]).toBe('loading') // Status should be "loading"
  })

  it('should update progress and set status to "done" when request completes', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useHttpInterceptor())

    const mockResponse = new Response(
      new ReadableStream({
        start(controller) {
          controller.enqueue(new Uint8Array([1, 2, 3, 4, 5])) // Mock data stream
          controller.close()
        },
      }),
      { headers: { 'content-length': '5' } }
    ) // Mock total content length

    global.fetch = jest.fn(() => Promise.resolve(mockResponse)) as jest.Mock

    act(() => {
      fetch('/test-url')
    })

    await waitForNextUpdate()

    expect(result.current[0]).toBeGreaterThan(0) // Progress should be greater than 0
    expect(result.current[1]).toBe('done') // Status should be "done"
  })

  it('should handle responses without a body correctly', async () => {
    const { result } = renderHook(() => useHttpInterceptor())

    global.fetch = jest.fn(() =>
      Promise.resolve(new Response(null))
    ) as jest.Mock

    act(() => {
      fetch('/test-url')
    })

    expect(result.current[1]).toBe('done') // Status should be "done"
  })

  it('should restore the original fetch when unmounted', () => {
    const originalFetch = global.fetch
    const { unmount } = renderHook(() => useHttpInterceptor())

    unmount()

    expect(global.fetch).toBe(originalFetch) // Fetch should be restored
  })
})
