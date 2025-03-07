import { render, screen } from '@testing-library/react'
import AbcFavIcon from './AbcFavIcon'

describe('<AbcFavIcon>', () => {
  it('debería renderizar el ícono de favorito cuando isFavorite es true', () => {
    render(<AbcFavIcon isFavorite={true} />)

    const favoriteIcon = screen.getByRole('img', { hidden: true }) // SVG del corazón
    expect(favoriteIcon).toBeInTheDocument()
    expect(favoriteIcon).toHaveAttribute('aria-label', 'favorite')
  })

  it('debería renderizar el ícono de no favorito cuando isFavorite es false', () => {
    render(<AbcFavIcon isFavorite={false} />)

    const favoriteIcon = screen.getByRole('img', { hidden: true })
    expect(favoriteIcon).toBeInTheDocument()
    expect(favoriteIcon).toHaveAttribute('aria-label', 'favorite') // Se mantiene el mismo aria-label
  })

  it('debería agregar la clase `isHovered` cuando isHovered es true', () => {
    const { container } = render(
      <AbcFavIcon isFavorite={true} isHovered={true} />
    )

    expect(container.firstChild).toHaveClass('isHovered') // Verifica que la clase se agregue
  })

  it('no debería tener la clase `isHovered` cuando isHovered es false', () => {
    const { container } = render(
      <AbcFavIcon isFavorite={true} isHovered={false} />
    )

    expect(container.firstChild).not.toHaveClass('isHovered') // Verifica que la clase no esté presente
  })
})
