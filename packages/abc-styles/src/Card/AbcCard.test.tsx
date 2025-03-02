import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import AbcCard from './AbcCard'

describe('<AbcCard />', () => {
  const mockOnClick = jest.fn()

  it('debería renderizar con el label', () => {
    render(<AbcCard label="Goku" />)

    const card = screen.getByRole('region', { name: 'Goku' })
    expect(card).toBeInTheDocument()
  })

  it('debería renderizar los children correctamente', () => {
    render(
      <AbcCard label="Goku">
        <p>Super Saiyan</p>
      </AbcCard>
    )

    const childElement = screen.getByText('Super Saiyan')
    expect(childElement).toBeInTheDocument()
  })

  it('debería mostrar el icono de favorito cuando es favorito', () => {
    render(<AbcCard label="Goku" isFavorite />)

    const favoriteIcon = screen.getByRole('img', { hidden: true }) // El SVG de favorito
    expect(favoriteIcon).toBeInTheDocument()

    const pathElement = favoriteIcon.querySelector('path') // Buscar el <path> dentro del SVG
    expect(pathElement).toHaveAttribute('fill', 'currentColor') // Validar el atributo en el <path>
  })

  it('debería mostrar el icono de no favorito cuando no es favorito', () => {
    render(<AbcCard label="Goku" isFavorite={false} />)

    const favoriteIcon = screen.getByRole('img', { hidden: true }) // El SVG de no favorito
    expect(favoriteIcon).toBeInTheDocument()

    const pathElement = favoriteIcon.querySelector('path') // Buscar el <path> dentro del SVG
    expect(pathElement).toHaveAttribute('fill', 'white') // Validar el color correcto
  })

  it('debería cambiar `isHovered` cuando el mouse entra y sale', () => {
    render(<AbcCard label="Goku" />)

    const card = screen.getByRole('region', { name: 'Goku' })

    fireEvent.mouseEnter(card)
    expect(card.classList.contains('isHovered')).toBe(true) // Verificar si la clase está presente

    fireEvent.mouseLeave(card)
    expect(card.classList.contains('isHovered')).toBe(false) // Verificar si la clase se eliminó
  })

  it('debería llamar a `onClick` cuando se hace clic', () => {
    render(<AbcCard label="Goku" onClick={mockOnClick} />)

    const card = screen.getByRole('region', { name: 'Goku' })

    fireEvent.click(card)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('debería tener `role="region"` y `aria-label` correctamente', () => {
    render(<AbcCard label="Goku" />)

    const card = screen.getByRole('region', { name: 'Goku' })
    expect(card).toBeInTheDocument()
  })
})
