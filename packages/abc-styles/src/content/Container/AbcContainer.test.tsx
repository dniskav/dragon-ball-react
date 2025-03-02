import { render, screen } from '@testing-library/react'
import AbcContainer from './AbcContainer'
import styles from './AbcContainer.module.css'

describe('<AbcContainer />', () => {
  it('debería renderizar los children correctamente', () => {
    render(
      <AbcContainer>
        <p>Contenido de prueba</p>
      </AbcContainer>
    )

    expect(screen.getByText('Contenido de prueba')).toBeInTheDocument()
  })

  it("debería aplicar la clase 'col' por defecto", () => {
    const { container } = render(<AbcContainer />)
    expect(container.firstChild).toHaveClass(styles.col)
  })

  it("debería aplicar la clase 'row' si se pasa la prop row", () => {
    const { container } = render(<AbcContainer row />)
    expect(container.firstChild).toHaveClass(styles.row)
  })

  it("debería aplicar la clase 'primary' por defecto", () => {
    const { container } = render(<AbcContainer />)
    expect(container.firstChild).toHaveClass(styles.primary)
  })

  it("debería aplicar la clase 'secondary' si se pasa la prop secondary", () => {
    const { container } = render(<AbcContainer secondary />)
    expect(container.firstChild).toHaveClass(styles.secondary)
  })

  it("debería aplicar la clase 'header' si se pasa la prop header", () => {
    const { container } = render(<AbcContainer header />)
    expect(container.firstChild).toHaveClass(styles.header)
  })

  it('debería aplicar correctamente múltiples clases', () => {
    const { container } = render(<AbcContainer row secondary header />)
    expect(container.firstChild).toHaveClass(styles.row)
    expect(container.firstChild).toHaveClass(styles.secondary)
    expect(container.firstChild).toHaveClass(styles.header)
  })
})
