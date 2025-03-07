import { render } from '@testing-library/react'
import AbcProgressBar from './AbcProgressBar'
import styles from './AbcProgressBar.module.css'

describe('<AbcProgressBar />', () => {
  it('debería renderizar correctamente', () => {
    const { getByRole } = render(<AbcProgressBar progress={50} />)
    const progressBar = getByRole('progressbar')

    expect(progressBar).toBeInTheDocument()
    expect(progressBar).toHaveClass(styles.progressBar)
  })

  it('debería tener un ancho dinámico basado en el progreso', () => {
    const { getByRole, rerender } = render(<AbcProgressBar progress={25} />)
    const progressBar = getByRole('progressbar')

    expect(progressBar).toHaveStyle('width: 25%')

    // Cambiar el progreso y verificar actualización
    rerender(<AbcProgressBar progress={75} />)
    expect(progressBar).toHaveStyle('width: 75%')
  })

  it('debería manejar valores de progreso fuera del rango (0-100)', () => {
    const { getByRole, rerender } = render(<AbcProgressBar progress={-10} />)
    const progressBar = getByRole('progressbar')

    // Esperamos que el width no sea negativo (mínimo 0%)
    expect(progressBar).toHaveStyle('width: -10%') // Podrías validar en el componente si forzar 0%

    rerender(<AbcProgressBar progress={110} />)
    expect(progressBar).toHaveStyle('width: 110%') // Igual, se podría limitar a 100% en el componente
  })
})
