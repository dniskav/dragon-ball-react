import { render, screen, fireEvent } from '@testing-library/react'
import FavoritesBtn from './FavoritesBtn'

describe('<FavoritesBtn>', () => {
  const mockOnClick = jest.fn()

  it('debería renderizar el botón correctamente', () => {
    render(<FavoritesBtn onClick={mockOnClick} />)

    const button = screen.getByRole('img')
    expect(button).toBeInTheDocument()
  })

  it('debería mostrar el total de favoritos cuando es mayor a 0', () => {
    render(<FavoritesBtn onClick={mockOnClick} total={5} />)

    const totalElement = screen.getByText('5')
    expect(totalElement).toBeInTheDocument()
  })

  it('no debería mostrar el total si es 0', () => {
    render(<FavoritesBtn onClick={mockOnClick} total={0} />)

    const totalElement = screen.queryByText('0')
    expect(totalElement).not.toBeInTheDocument()
  })

  it('debería llamar a `onClick` cuando se hace clic', () => {
    render(<FavoritesBtn onClick={mockOnClick} />)

    const button = screen.getByRole('img')
    fireEvent.click(button)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
})
