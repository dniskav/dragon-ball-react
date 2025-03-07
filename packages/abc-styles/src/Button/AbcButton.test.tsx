import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import AbcButton from './AbcButton'

describe('<AbcButton>', () => {
  it('debería renderizar con el texto correcto', () => {
    render(<AbcButton label="Haz clic" onClick={() => {}} />)

    const buttonElement = screen.getByRole('button', { name: 'Haz clic' })
    expect(buttonElement).toBeInTheDocument()
  })

  it('debería llamar a onClick cuando se hace clic', () => {
    const handleClick = jest.fn()
    render(<AbcButton label="Haz clic" onClick={handleClick} />)

    const buttonElement = screen.getByRole('button', { name: 'Haz clic' })
    fireEvent.click(buttonElement)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
