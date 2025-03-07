import { act, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Dispatch } from 'react'
import { AppProvider, useAppContext } from '../AppContext'
import { AppAction } from '../AppReducer'

describe('AppContext', () => {
  it('should provide the initial state', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    )

    expect(screen.getByText('Favorites Off')).toBeInTheDocument()
  })

  it('should update the state when dispatching an action', async () => {
    let dispatchSnapshot: Dispatch<AppAction> | undefined

    const TestComponent = () => {
      const { state, dispatch } = useAppContext()
      dispatchSnapshot = dispatch
      return <div>{state.favoritesOnly ? 'Favorites On' : 'Favorites Off'}</div>
    }

    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    )

    await act(async () => {
      dispatchSnapshot!({ type: 'SHOW_FAVORITES_ONLY', payload: true })
    })

    // 🔹 Verifica el cambio en la UI
    expect(await screen.findByText('Favorites On')).toBeInTheDocument()
  })

  it('should throw an error if useAppContext is used outside of a provider', () => {
    const TestComponent = () => {
      useAppContext()
      return <div>Should not render</div>
    }

    expect(() => render(<TestComponent />)).toThrow(
      'useAppContext debe usarse dentro de un AppProvider'
    )
  })
})

// 🔹 Componente auxiliar para probar el contexto
const TestComponent = () => {
  const { state } = useAppContext()
  return <div>{state.favoritesOnly ? 'Favorites On' : 'Favorites Off'}</div>
}
