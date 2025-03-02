import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SearchBox from './SearchBox'
import { baseCharacter } from '../../../../tests/characterMocks'
import styles from './SearchBox.module.css'

describe('<SearchBox>', () => {
  it('debería renderizar correctamente', () => {
    render(<SearchBox doSearch={() => []} list={[]} />)
    expect(screen.getByLabelText('Search...')).toBeInTheDocument()
  })

  test('debería llamar a doSearch cuando se ingresa un término', async () => {
    const mockDoSearch = jest.fn()
    render(<SearchBox doSearch={mockDoSearch} list={[]} />)

    const input = screen.getByPlaceholderText('Search...')

    fireEvent.change(input, { target: { value: 'Goku' } })

    await waitFor(() => expect(mockDoSearch).toHaveBeenCalledWith('Goku'), {
      timeout: 500,
    })
  })

  it('debería mostrar la cantidad correcta de resultados', () => {
    const mockList = [
      baseCharacter,
      { ...baseCharacter, id: 2, name: 'Vegeta' },
    ]
    render(<SearchBox doSearch={() => mockList} list={mockList} />)

    expect(screen.getByText('2 RESULTS')).toBeInTheDocument()
  })

  test('Mock de estilos funciona correctamente', () => {
    console.log('🧪 Verificando estilos:', styles)
    expect(styles).toBeDefined()
  })
})
