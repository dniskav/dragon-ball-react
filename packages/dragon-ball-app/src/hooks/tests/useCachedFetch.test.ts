import { renderHook, act, waitFor } from '@testing-library/react'
import { useCachedFetch } from '../useCachedFetch'

jest.useFakeTimers()

describe('useCachedFetch', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('debería devolver datos desde la API si no hay caché', async () => {
    const mockFetch = jest.fn().mockResolvedValue([{ id: 1, name: 'Goku' }])

    const { result } = renderHook(() =>
      useCachedFetch('characters', mockFetch, 60)
    )

    // Inicialmente debe estar en estado de carga
    expect(result.current.data).toBeNull()
    expect(result.current.loading).toBe(true)

    // Esperamos hasta que se obtengan los datos
    await waitFor(() => expect(result.current.data).not.toBeNull())

    expect(result.current.data).toEqual([{ id: 1, name: 'Goku' }])
    expect(result.current.loading).toBe(false)
    expect(mockFetch).toHaveBeenCalledTimes(1)
  })

  it('debería devolver datos desde el caché si está disponible y no expiró', async () => {
    const cachedData = {
      data: [{ id: 2, name: 'Vegeta' }],
      timestamp: new Date().getTime(),
    }
    localStorage.setItem('characters', JSON.stringify(cachedData))

    const mockFetch = jest.fn()

    const { result } = renderHook(() =>
      useCachedFetch('characters', mockFetch, 60)
    )

    await waitFor(() =>
      expect(result.current.data).toEqual([{ id: 2, name: 'Vegeta' }])
    )

    expect(result.current.loading).toBe(false)
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('debería hacer fetch si los datos en caché han expirado', async () => {
    const oldTimestamp = new Date().getTime() - 2 * 60 * 1000 // 2 minutos atrás
    const cachedData = {
      data: [{ id: 3, name: 'Piccolo' }],
      timestamp: oldTimestamp,
    }
    localStorage.setItem('characters', JSON.stringify(cachedData))

    const mockFetch = jest.fn().mockResolvedValue([{ id: 4, name: 'Frieza' }])

    const { result } = renderHook(() =>
      useCachedFetch('characters', mockFetch, 1)
    ) // 1 min de caché

    expect(result.current.data).toBeNull()
    expect(result.current.loading).toBe(true)

    await waitFor(() =>
      expect(result.current.data).toEqual([{ id: 4, name: 'Frieza' }])
    )

    expect(mockFetch).toHaveBeenCalledTimes(1)
  })

  it('debería manejar errores correctamente', async () => {
    const mockFetch = jest.fn().mockRejectedValue(new Error('Network Error'))

    const { result } = renderHook(() =>
      useCachedFetch('characters', mockFetch, 60)
    )

    await waitFor(() => expect(result.current.error).toBeInstanceOf(Error))

    expect(result.current.error?.message).toBe('Network Error')
    expect(result.current.loading).toBe(false)
  })
})
