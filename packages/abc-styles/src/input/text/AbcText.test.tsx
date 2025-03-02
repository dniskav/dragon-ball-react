import { render, screen, fireEvent } from '@testing-library/react'
import AbcText from './AbcText'

describe('<AbcText>', () => {
  it('debería renderizar el input con el label correcto', () => {
    render(<AbcText label="Nombre" id="nombre" onChange={() => {}} />)

    const input = screen.getByLabelText('Nombre')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
  })

  it('debería mostrar el valor inicial cuando se proporciona un value', () => {
    render(
      <AbcText label="Nombre" id="nombre" value="Goku" onChange={() => {}} />
    )

    const input = screen.getByLabelText('Nombre') as HTMLInputElement
    expect(input.value).toBe('Goku')
  })

  it('debería mostrar el valor inicial cuando se proporciona un defaultValue', () => {
    render(
      <AbcText
        label="Nombre"
        id="nombre"
        defaultValue="Vegeta"
        onChange={() => {}}
      />
    )

    const input = screen.getByLabelText('Nombre') as HTMLInputElement
    expect(input.value).toBe('Vegeta')
  })

  it('debería llamar a `onChange` cuando se ingresa un nuevo valor', () => {
    const mockOnChange = jest.fn()
    render(<AbcText label="Nombre" id="nombre" onChange={mockOnChange} />)

    const input = screen.getByLabelText('Nombre')
    fireEvent.change(input, { target: { value: 'Gohan' } })

    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(mockOnChange).toHaveBeenCalledWith('Gohan')
  })

  it('debería renderizar el icono si se proporciona', () => {
    render(
      <AbcText
        label="Nombre"
        id="nombre"
        onChange={() => {}}
        icon={<span data-testid="icon">🔍</span>}
      />
    )

    const icon = screen.getByTestId('icon')
    expect(icon).toBeInTheDocument()
  })
})
