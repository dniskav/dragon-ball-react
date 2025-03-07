import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AbcSearch from './AbcSearch'

describe('<AbcSearch>', () => {
  it('debería renderizar correctamente con el placeholder por defecto', () => {
    render(<AbcSearch id="search" onSearch={() => {}} />)

    const input = screen.getByPlaceholderText('Search...')
    expect(input).toBeInTheDocument()
  })

  it('debería renderizar correctamente con un placeholder personalizado', () => {
    render(
      <AbcSearch id="search" placeholder="Buscar..." onSearch={() => {}} />
    )

    const input = screen.getByPlaceholderText('Buscar...')
    expect(input).toBeInTheDocument()
  })

  it('debería ejecutar onSearch cuando el usuario escribe un término válido', async () => {
    const mockOnSearch = jest.fn()
    render(<AbcSearch id="search" onSearch={mockOnSearch} debounceTime={200} />)

    const input = screen.getByPlaceholderText('Search...')

    fireEvent.change(input, { target: { value: 'Goku' } })

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledTimes(1)
      expect(mockOnSearch).toHaveBeenCalledWith('Goku')
    })
  })

  it('no debería ejecutar onSearch si el término es menor al threshold', async () => {
    const mockOnSearch = jest.fn()
    render(
      <AbcSearch
        id="search"
        onSearch={mockOnSearch}
        threshold={5}
        debounceTime={200}
      />
    )

    const input = screen.getByPlaceholderText('Search...')

    fireEvent.change(input, { target: { value: 'Go' } })

    await waitFor(() => {
      expect(mockOnSearch).not.toHaveBeenCalled()
    })
  })

  it('debería ejecutar onSearch cuando el usuario borra el término', async () => {
    const mockOnSearch = jest.fn()

    render(<AbcSearch id="search" onSearch={mockOnSearch} />)

    const input = screen.getByRole('textbox', { name: 'Search...' })

    fireEvent.change(input, { target: { value: 'Goku' } })

    await waitFor(() => expect(mockOnSearch).toHaveBeenCalledWith('Goku'))

    fireEvent.change(input, { target: { value: '' } })

    await waitFor(() => expect(mockOnSearch).toHaveBeenCalledWith(''))
  })

  it('debería renderizar el icono de búsqueda', () => {
    render(<AbcSearch id="search" onSearch={() => {}} />)

    const icon = screen.getByRole('img')
    expect(icon).toBeInTheDocument()
  })
})
